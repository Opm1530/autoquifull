/**
 * Job de Disparo de Campanhas
 *
 * Roda a cada minuto via node-cron.
 * Busca campanhas com status='agendada' onde data_agendamento <= agora,
 * processa o envio para cada lead e atualiza os contadores.
 *
 * Fluxo:
 *  1. Query campanhas agendadas e com data <= now
 *  2. Para cada campanha:
 *     a. Marca status='processando', data_inicio=now
 *     b. Busca instância WhatsApp pelo instancia_id
 *     c. Para cada lead_id:
 *        - Lê o telefone do lead
 *        - Substitui variáveis na mensagem (aleatoriza entre as variações)
 *        - Envia via Evolution API
 *        - Incrementa enviados ou falhas
 *        - Aguarda delay configurável entre envios
 *     d. Marca status='finalizada'
 */

import cron from 'node-cron';
import { getDb } from '../config/firebase.js';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { sendText } from '../services/evolution.js';
import { log } from '../utils/logger.js';

// Evita que duas execuções do cron processem a mesma campanha simultâneamente
const processing = new Set();

/**
 * Inicia o cron job de campanhas.
 * Executa a cada minuto.
 */
export function startCampaignJob() {
  cron.schedule('* * * * *', async () => {
    await processPendingCampaigns().catch((err) => {
      log.error('Campaign', `Erro no job de campanhas: ${err.message}`);
    });
  });

  log.info('Campaign', 'Job de campanhas iniciado (a cada minuto)');
}

// ─────────────────────────────────────────────────────────────
// Core
// ─────────────────────────────────────────────────────────────

async function processPendingCampaigns() {
  const db = getDb();
  const now = Timestamp.now();

  // Busca campanhas prontas para disparar
  const snap = await db
    .collection('campanhas')
    .where('status', '==', 'agendada')
    .where('data_agendamento', '<=', now)
    .get();

  if (snap.empty) return;

  log.info('Campaign', `${snap.size} campanha(s) para processar`);

  for (const doc of snap.docs) {
    const campaignId = doc.id;

    // Evita processamento duplicado se o cron disparar novamente antes de terminar
    if (processing.has(campaignId)) continue;
    processing.add(campaignId);

    try {
      await processCampaign(db, doc);
    } catch (err) {
      log.error('Campaign', `Erro ao processar campanha ${campaignId}: ${err.message}`);
      // Marca como com erro para não ficar presa em loop
      await db.collection('campanhas').doc(campaignId).update({
        status: 'erro',
        erro: err.message,
      }).catch(() => {});
    } finally {
      processing.delete(campaignId);
    }
  }
}

async function processCampaign(db, doc) {
  const campaignId = doc.id;
  const campaign = doc.data();

  log.info('Campaign', `Iniciando campanha "${campaign.nome}" (${campaignId})`);

  // 1. Marca como processando
  await db.collection('campanhas').doc(campaignId).update({
    status: 'processando',
    data_inicio: FieldValue.serverTimestamp(),
  });

  // 2. Resolve o nome da instância Evolution a partir do instancia_id
  const instanceName = await resolveInstanceName(db, campaign.instancia_id);
  if (!instanceName) {
    log.warn('Campaign', `Instância não encontrada para id=${campaign.instancia_id}`);
    await db.collection('campanhas').doc(campaignId).update({
      status: 'erro',
      erro: `Instância WhatsApp não encontrada (id=${campaign.instancia_id})`,
    });
    return;
  }

  // 3. Configs de delay entre envios (em ms)
  const delayMin = ((campaign.config?.delay_min) || 20) * 1000;
  const delayMax = ((campaign.config?.delay_max) || 60) * 1000;

  // 4. Mensagens (variações)
  const mensagens = campaign.mensagens?.length ? campaign.mensagens : (campaign.mensagem ? [campaign.mensagem] : []);
  if (mensagens.length === 0) {
    log.warn('Campaign', `Campanha ${campaignId} sem mensagens`);
    await db.collection('campanhas').doc(campaignId).update({ status: 'erro', erro: 'Sem mensagens configuradas' });
    return;
  }

  const leadIds = campaign.lead_ids || [];
  let enviados = 0;
  let falhas = 0;

  // 5. Processa cada lead
  for (const leadId of leadIds) {
    try {
      // Lê o lead
      const leadDoc = await db.collection('leads').doc(leadId).get();
      if (!leadDoc.exists) {
        log.warn('Campaign', `Lead ${leadId} não encontrado — pulando`);
        falhas++;
        continue;
      }

      const lead = leadDoc.data();
      const rawPhone = lead.telefone || '';

      // Limpa o telefone (remove @s.whatsapp.net e qualquer não-dígito)
      const phone = rawPhone.replace('@s.whatsapp.net', '').replace(/\D/g, '');

      if (!phone) {
        log.warn('Campaign', `Lead ${leadId} sem telefone — pulando`);
        falhas++;
        continue;
      }

      // Seleciona mensagem aleatória entre as variações
      const msg = mensagens[Math.floor(Math.random() * mensagens.length)];

      // Substitui variáveis na mensagem
      const finalMsg = interpolate(msg, lead);

      // Envia via Evolution
      const ok = await sendText(instanceName, phone, finalMsg);

      if (ok) {
        enviados++;
      } else {
        falhas++;
      }

      // Atualiza contadores no Firestore a cada envio
      await db.collection('campanhas').doc(campaignId).update({
        enviados,
        falhas,
      }).catch(() => {});

    } catch (err) {
      log.error('Campaign', `Erro ao enviar para lead ${leadId}: ${err.message}`);
      falhas++;
    }

    // Aguarda delay aleatório entre min e max (não aguarda após o último)
    if (leadIds.indexOf(leadId) < leadIds.length - 1) {
      const delay = delayMin + Math.random() * (delayMax - delayMin);
      await sleep(delay);
    }
  }

  // 6. Finaliza campanha
  await db.collection('campanhas').doc(campaignId).update({
    status: 'finalizada',
    enviados,
    falhas,
    data_fim: FieldValue.serverTimestamp(),
  });

  log.ok('Campaign', `Campanha "${campaign.nome}" finalizada — ${enviados} enviados, ${falhas} falhas`);
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/**
 * Busca o nome da instância Evolution (campo `nome`) pelo documento id em `instancias`.
 */
async function resolveInstanceName(db, instanciaId) {
  if (!instanciaId) return null;
  const doc = await db.collection('instancias').doc(instanciaId).get();
  if (!doc.exists) return null;
  return doc.data()?.nome || null;
}

/**
 * Substitui variáveis {{nome}}, {{telefone}}, {{email}} etc. com dados do lead.
 */
function interpolate(msg, lead) {
  return msg
    .replace(/\{\{nome\}\}/gi, lead.nome || '')
    .replace(/\{\{telefone\}\}/gi, (lead.telefone || '').replace('@s.whatsapp.net', '').replace(/\D/g, ''))
    .replace(/\{\{email\}\}/gi, lead.email || '')
    .replace(/\{\{cidade\}\}/gi, lead.cidade || '')
    .replace(/\{\{bairro\}\}/gi, lead.bairro || '')
    .replace(/\{\{loja\}\}/gi, lead.lojaId || '');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
