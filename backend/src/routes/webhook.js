/**
 * Webhook Router — ponto de entrada da Evolution API
 *
 * POST /webhook/evolution/:instanceName
 *
 * Fluxo:
 * 1. Responde 200 imediatamente (Evolution API não pode esperar)
 * 2. Parseia a mensagem recebida
 * 3. Busca a instância no Firestore → identifica empresa/loja
 * 4. Deduplica por messageId
 * 5. Marca como lida (check azul)
 * 6. Verifica modo humano → ignora se ativo
 * 7. Transcreve áudio se necessário (Whisper)
 * 8. Adiciona ao buffer (debounce 13s)
 * 9. Ao disparar o buffer → enfileira processamento da IA
 */

import { Router } from 'express';
import { parseIncomingMessage, markAsRead, sendMessages, sendPresence, downloadMedia } from '../services/evolution.js';
import { getInstanceByName, getCompany, getLojaConfig, upsertLead } from '../services/firestore.js';
import { getConversation, isHumanMode, saveMessages, buildOpenAIHistory } from '../services/conversation.js';
import { processAgendamentoMessage } from '../services/agendamento-agent.js';
import { processVendaMessage, saveCartState, loadCartState } from '../services/venda-agent.js';
import { transcribeAudio } from '../services/whisper.js';
import { bufferMessage, hasPendingBuffer } from '../utils/buffer.js';
import { enqueue } from '../utils/queue.js';
import { isDuplicate } from '../utils/dedup.js';
import { normalizePhone } from '../utils/phone.js';
import { log, timer, preview } from '../utils/logger.js';

const router = Router();

// ─────────────────────────────────────────────────────────────
// POST /webhook/evolution/:instanceName
// ─────────────────────────────────────────────────────────────

router.post('/evolution/:instanceName', async (req, res) => {
  // Responde imediatamente — Evolution API tem timeout curto
  res.status(200).json({ status: 'ok' });

  // Processa de forma assíncrona (não bloqueia a resposta HTTP)
  processWebhook(req.params.instanceName, req.body).catch((err) => {
    console.error('[Webhook] Erro não tratado no processamento:', err.message);
  });
});

// ─────────────────────────────────────────────────────────────
// Processamento principal (assíncrono)
// ─────────────────────────────────────────────────────────────

async function processWebhook(instanceNameParam, body) {
  // 1. Parseia a mensagem
  const msg = parseIncomingMessage({ ...body, instanceName: instanceNameParam });
  if (!msg) return; // Mensagem inválida, grupo, fromMe, etc.

  const { instanceName, remoteJid, phone: rawPhone, messageId, text, isAudio, rawMessage } = msg;
  const instName = instanceName || instanceNameParam;
  const phone = normalizePhone(rawPhone);

  if (!phone) {
    log.warn('Webhook', `Telefone inválido ignorado: ${rawPhone}`);
    return;
  }

  log.recv('Webhook', `${phone} via [${instName}] — ${isAudio ? '🎤 ÁUDIO' : `"${preview(text, 70)}"`}`);

  // 2. Busca a instância no Firestore → empresa/loja
  const instancia = await getInstanceByName(instName);
  if (!instancia) {
    log.warn('Webhook', `Instância desconhecida: ${instName}`);
    return;
  }

  const companyId = instancia.empresaId;
  const storeId = instancia.lojaId || null;
  const funcao = instancia.funcao || 'agendamento';

  log.debug('Webhook', `Instância resolvida → empresa=${companyId} loja=${storeId || 'global'} funcao=${funcao}`);

  // Funções suportadas: agendamento, venda e catalogo
  if (!['agendamento', 'venda', 'catalogo'].includes(funcao)) {
    log.warn('Webhook', `Função '${funcao}' não suportada — ignorando`);
    return;
  }

  // 3. Verifica se a empresa tem o módulo ativo
  const company = await getCompany(companyId);
  if (!company) {
    log.error('Webhook', `Empresa não encontrada: ${companyId}`);
    return;
  }

  const modulos = company.modulos_ativos || [];
  // catalogo pode rodar com módulo 'catalogo', 'venda' ou 'agendamento'
  let moduloRequerido;
  if (funcao === 'venda') moduloRequerido = 'venda';
  else if (funcao === 'agendamento') moduloRequerido = 'agendamento';
  else moduloRequerido = null; // catalogo — verifica abaixo

  if (moduloRequerido && !modulos.includes(moduloRequerido)) {
    log.warn('Webhook', `Módulo '${moduloRequerido}' inativo para empresa ${companyId} — ignorando`);
    return;
  }

  // Para funcao='catalogo', exige pelo menos catalogo, venda ou agendamento
  if (funcao === 'catalogo' && !modulos.some(m => ['catalogo', 'venda', 'agendamento'].includes(m))) {
    log.warn('Webhook', `Nenhum módulo compatível com catálogo ativo para empresa ${companyId} — ignorando`);
    return;
  }

  // 4. Deduplicação
  if (isDuplicate(messageId)) {
    log.debug('Webhook', `Mensagem duplicada ignorada: ${messageId}`);
    return;
  }

  // 5. Marca como lida (check azul) — feedback imediato para o cliente
  await markAsRead(instName, remoteJid, messageId).catch(() => {});

  // 6. Verifica modo humano
  const humanMode = await isHumanMode(companyId, phone);
  if (humanMode) {
    log.info('Webhook', `${phone} em modo humano — mensagem ignorada pelo bot`);
    return;
  }

  // 7. Transcrição de áudio (se necessário)
  let finalText = text;
  if (isAudio) {
    const tAudio = timer();
    log.info('Webhook', `${phone} — transcrevendo áudio via Whisper...`);
    try {
      const media = await downloadMedia(instName, rawMessage.message);
      if (media?.base64) {
        const transcribed = await transcribeAudio(media.base64, media.mimetype);
        finalText = transcribed || '[Não foi possível transcrever o áudio]';
        tAudio.end('Webhook', `${phone} — áudio transcrito: "${preview(finalText, 80)}"`);
      } else {
        finalText = '[Áudio não disponível]';
        log.warn('Webhook', `${phone} — download do áudio falhou`);
      }
    } catch (err) {
      log.error('Webhook', `${phone} — erro ao transcrever áudio: ${err.message}`);
      finalText = '[Erro ao processar áudio]';
    }
  }

  // 8. Buffer com debounce — acumula mensagens por 13s antes de processar
  bufferMessage(phone, finalText, isAudio, async (ph, combinedText) => {
    log.info('Webhook', `${ph} — buffer disparado, enfileirando (${funcao})`);
    // 9. Enfileira processamento para este telefone (garante ordem)
    enqueue(ph, async () => {
      await handleMessage(companyId, storeId, instName, ph, combinedText, funcao);
    });
  });
}

// ─────────────────────────────────────────────────────────────
// Processamento da IA
// ─────────────────────────────────────────────────────────────

async function handleMessage(companyId, storeId, instanceName, phone, userMessage, funcao = 'agendamento') {
  const tTotal = timer();
  log.info('Handler', `${phone} [${funcao}] — iniciando | msg: "${preview(userMessage, 70)}"`);

  try {
    // Carrega dados necessários em paralelo
    const [conv, config, company] = await Promise.all([
      getConversation(companyId, phone),
      getLojaConfig(companyId, storeId),
      getCompany(companyId),
    ]);

    // Verifica horário de funcionamento
    const closedMessage = getClosedMessage(config);
    if (closedMessage) {
      log.info('Handler', `${phone} — loja fechada, enviando mensagem de horário`);
      await sendMessages(instanceName, phone, [closedMessage]);
      return;
    }

    // Garante/atualiza o lead no Firestore
    await upsertLead(companyId, storeId, phone, { statusAtendimento: 'bot' });

    // Histórico para o OpenAI (rolling window)
    const history = buildOpenAIHistory(conv.messages || []);
    log.debug('Handler', `${phone} — histórico carregado: ${history.length} mensagens`);

    // Envia indicador de digitação enquanto a IA processa
    await sendPresence(instanceName, phone).catch(() => {});

    let responseMessages;
    let stage;
    let transferredToHuman = false;

    // ── Roteamento por função da instância ──────────────────
    if (funcao === 'venda') {
      // Carrega estado do carrinho da conversa
      const { cart, delivery } = await loadCartState(companyId, phone);
      log.debug('Handler', `${phone} — carrinho carregado: ${cart.length} item(s)`);

      const result = await processVendaMessage({
        companyId,
        storeId,
        phone,
        userMessage,
        history,
        cart,
        delivery,
        customPrompt: config?.prompt_ia || '',
        companyName: company?.name || 'nosso estabelecimento',
        company,
        lojaConfig: config,
      });

      responseMessages = result.messages;
      stage = result.stage;
      transferredToHuman = result.transferredToHuman;

      // Persiste o carrinho atualizado
      await saveCartState(companyId, phone, result.cart, result.delivery);
      log.debug('Handler', `${phone} — carrinho salvo: ${result.cart.length} item(s)`);

    } else {
      // ── Agendamento (default) ─────────────────────────────
      const result = await processAgendamentoMessage({
        companyId,
        storeId,
        phone,
        userMessage,
        history,
        customPrompt: config?.prompt_ia || '',
        companyName: company?.name || 'nosso estabelecimento',
        company,
      });

      responseMessages = result.messages;
      stage = result.stage;
      transferredToHuman = result.transferredToHuman;

      // ── Mensagem automática de confirmação de agendamento ──
      if (stage === 'agendado' && result.bookingDetails) {
        const bd = result.bookingDetails;
        const tplKey = 'agendamento_confirmado';
        const defaultTpl = '✅ *Agendamento Confirmado!*\n\n🔸 Serviço: {{servico}}\n📅 Data: {{data}}\n⏰ Horário: {{horario}}\n💰 Valor: R$ {{valor}}';
        const tpl = config?.mensagens_automaticas?.[tplKey] || defaultTpl;

        const dataFormatada = new Date(bd.date + 'T12:00:00').toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo', weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric',
        });

        const confirmMsg = tpl
          .replace(/\{\{nome_lead\}\}/g, bd.clientName || '')
          .replace(/\{\{servico\}\}/g, bd.serviceName || '')
          .replace(/\{\{data\}\}/g, dataFormatada)
          .replace(/\{\{horario\}\}/g, bd.time || '')
          .replace(/\{\{valor\}\}/g, bd.servicePrice > 0
            ? (bd.servicePrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : 'a combinar');

        // Adiciona a mensagem de confirmação estruturada APÓS a resposta da IA
        responseMessages.push(confirmMsg);
        log.ok('Handler', `${phone} — mensagem automática de confirmação adicionada`);
      }

      // ── Mensagem automática de cancelamento ───────────────
      if (stage === 'cancelado' && result.cancelDetails) {
        const cd = result.cancelDetails;
        const tplKey = 'agendamento_cancelado';
        const defaultTpl = '❌ *Agendamento Cancelado*\n\n🔸 Serviço: {{servico}}\n📅 Data: {{data}}\n⏰ Horário: {{horario}}\n\nQualquer dúvida, é só chamar! 😊';
        const tpl = config?.mensagens_automaticas?.[tplKey] || defaultTpl;

        const dataFormatada = cd.date ? new Date(cd.date + 'T12:00:00').toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo', weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric',
        }) : '';

        const cancelMsg = tpl
          .replace(/\{\{nome_lead\}\}/g, cd.clientName || '')
          .replace(/\{\{servico\}\}/g, cd.serviceName || '')
          .replace(/\{\{data\}\}/g, dataFormatada)
          .replace(/\{\{horario\}\}/g, cd.time || '');

        responseMessages.push(cancelMsg);
        log.ok('Handler', `${phone} — mensagem automática de cancelamento adicionada`);
      }
    }

    // Salva o histórico da conversa
    const responseText = responseMessages.join('\n\n');
    await saveMessages(companyId, storeId, phone, userMessage, responseText, stage);

    // Atualiza lead se transferido para humano
    if (transferredToHuman) {
      await upsertLead(companyId, storeId, phone, { statusAtendimento: 'em_atendimento_humano' });
      log.ok('Handler', `${phone} — transferido para atendimento humano`);
    }

    // Verifica se o cliente mandou nova mensagem enquanto a IA processava
    // Se sim, descarta a resposta — o próximo ciclo da fila terá contexto completo
    if (hasPendingBuffer(phone)) {
      log.warn('Handler', `${phone} — nova mensagem chegou durante processamento, descartando resposta atual`);
      return;
    }

    // Envia as respostas via WhatsApp
    log.send('Handler', `${phone} — enviando ${responseMessages.length} msg(s) | stage: ${stage}`);
    for (let i = 0; i < responseMessages.length; i++) {
      log.send('Handler', `  [${i + 1}/${responseMessages.length}] "${preview(responseMessages[i], 90)}"`);
    }
    await sendMessages(instanceName, phone, responseMessages);

    tTotal.end('Handler', `${phone} — pipeline completo`);

  } catch (err) {
    log.error('Handler', `${phone} — erro não tratado: ${err.message}`, err.stack?.split('\n')[1]);

    await sendMessages(instanceName, phone, [
      'Desculpe, estou com uma instabilidade no momento. Por favor, tente novamente em alguns instantes. 🙏',
    ]).catch(() => {});
  }
}

// ─────────────────────────────────────────────────────────────
// Verificação de horário de funcionamento
// ─────────────────────────────────────────────────────────────

/**
 * Verifica se a loja está fechada agora.
 * Retorna mensagem de fechado ou null se estiver aberta.
 */
function getClosedMessage(config) {
  if (!config?.horarios) return null; // Sem configuração → não bloqueia

  const now = new Date();
  const dayNames = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  const dayKey = dayNames[now.getDay()];
  const dayConfig = config.horarios[dayKey];

  if (!dayConfig || dayConfig.active === false || dayConfig.fechado === true) {
    return '😴 Olá! Estamos fechados no momento. Assim que reabrirmos, responderei sua mensagem. Até logo!';
  }

  const nowH = now.getHours();
  const nowM = now.getMinutes();
  const nowMinutes = nowH * 60 + nowM;

  const [openH, openM] = (dayConfig.open || dayConfig.abertura || '09:00').split(':').map(Number);
  const [closeH, closeM] = (dayConfig.close || dayConfig.fechamento || '18:00').split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (nowMinutes < openMinutes || nowMinutes >= closeMinutes) {
    const openStr = dayConfig.open || dayConfig.abertura || '09:00';
    const closeStr = dayConfig.close || dayConfig.fechamento || '18:00';
    return `😴 Olá! Nosso horário de atendimento é das ${openStr} às ${closeStr}. Retornarei assim que abrirmos! 😊`;
  }

  return null;
}

export default router;
