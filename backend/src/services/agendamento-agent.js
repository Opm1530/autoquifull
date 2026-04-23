/**
 * Agendamento AI Agent
 *
 * Agente de IA baseado em tool calling do OpenAI.
 * Suporta dois modos de operação detectados automaticamente:
 *
 * ── Modo Trinks (company.trinks.enabled = true) ──────────────
 *   Tudo via API do Trinks: serviços, disponibilidade, clientes,
 *   agendamentos. O Firestore guarda apenas o histórico do bot.
 *
 * ── Modo Local (sem Trinks) ───────────────────────────────────
 *   Serviços no Firestore, disponibilidade calculada localmente,
 *   agendamentos no Firestore + espelho no Google Calendar.
 *
 * Ferramentas disponíveis (mesma interface nos dois modos):
 *  - get_services          → lista serviços
 *  - check_availability    → slots livres de um dia
 *  - get_client_info       → dados do cliente + próximos agendamentos
 *  - book_appointment      → cria agendamento
 *  - cancel_appointment    → cancela agendamento
 *  - transfer_to_human     → passa atendimento para humano
 *
 * Ferramentas exclusivas do modo Trinks (quando escolherProfissional=true):
 *  - list_professionals    → lista profissionais disponíveis no dia
 */

import { OpenAI } from 'openai';
import { ENV } from '../config/env.js';
import { getServices, getAgendamentosByPhone, getClienteByPhone } from './firestore.js';
import { getAvailableSlots, bookAppointment, cancelBooking } from './scheduler.js';
import { setHumanMode } from './conversation.js';
import {
  getTrinksServices,
  getTrinksProfessionals,
  getTrinksAvailability,
  findOrCreateTrinksClient,
  findTrinksClient,
  createTrinksAppointment,
  cancelTrinksAppointment,
  getTrinksClientAppointments,
} from './trinks-api.js';
import { getDb } from '../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { log, timer, preview } from '../utils/logger.js';

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

// ─────────────────────────────────────────────────────────────
// Definição das ferramentas
// ─────────────────────────────────────────────────────────────

const BASE_TOOLS = [
  {
    type: 'function',
    function: {
      name: 'get_services',
      description: 'Lista todos os serviços disponíveis para agendamento, com nome, preço e duração.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_availability',
      description:
        'Verifica os horários disponíveis para agendamento em uma data específica. ' +
        'Use quando o cliente quiser saber horários disponíveis ou quiser agendar.',
      parameters: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description: 'Data no formato YYYY-MM-DD. Converta datas informais: "amanhã", "sexta" → YYYY-MM-DD.',
          },
          service_id: {
            type: 'string',
            description: 'ID do serviço. Necessário para calcular duração e disponibilidade correta.',
          },
          professional_id: {
            type: 'string',
            description: 'ID do profissional (opcional). Use quando o cliente tiver escolhido um.',
          },
        },
        required: ['date'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_client_info',
      description:
        'Busca dados do cliente e seus próximos agendamentos. Use no início da conversa para personalizar o atendimento.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'book_appointment',
      description:
        'Cria um agendamento confirmado. Use SOMENTE após confirmar com o cliente: serviço, data, horário e nome. Nunca agende sem confirmação explícita.',
      parameters: {
        type: 'object',
        properties: {
          client_name:      { type: 'string', description: 'Nome completo do cliente.' },
          service_id:       { type: 'string', description: 'ID do serviço.' },
          service_name:     { type: 'string', description: 'Nome do serviço.' },
          service_price:    { type: 'number', description: 'Preço do serviço.' },
          service_duration: { type: 'number', description: 'Duração em minutos.' },
          date:             { type: 'string', description: 'Data no formato YYYY-MM-DD.' },
          time:             { type: 'string', description: 'Horário no formato HH:MM.' },
          professional_id:  { type: 'string', description: 'ID do profissional (opcional).' },
          professional_name:{ type: 'string', description: 'Nome do profissional (para confirmação).' },
          notes:            { type: 'string', description: 'Observações opcionais.' },
        },
        required: ['client_name', 'service_id', 'service_name', 'date', 'time'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'cancel_appointment',
      description: 'Cancela um agendamento existente do cliente.',
      parameters: {
        type: 'object',
        properties: {
          appointment_id: { type: 'string', description: 'ID do agendamento a cancelar.' },
          trinks_id:      { type: 'string', description: 'ID no Trinks (se houver).' },
        },
        required: ['appointment_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'transfer_to_human',
      description:
        'Transfere o atendimento para um humano. Use quando o cliente pedir, houver reclamação grave, ou após 3 tentativas sem resolver.',
      parameters: {
        type: 'object',
        properties: {
          reason: { type: 'string', description: 'Motivo da transferência.' },
        },
        required: ['reason'],
      },
    },
  },
];

// Ferramenta exclusiva do modo Trinks com escolha de profissional
const TRINKS_PROFESSIONAL_TOOL = {
  type: 'function',
  function: {
    name: 'list_professionals',
    description:
      'Lista os profissionais disponíveis numa data para um serviço específico, com seus horários livres. ' +
      'Use quando o cliente quiser escolher o profissional.',
    parameters: {
      type: 'object',
      properties: {
        date:       { type: 'string', description: 'Data no formato YYYY-MM-DD.' },
        service_id: { type: 'string', description: 'ID do serviço.' },
      },
      required: ['date', 'service_id'],
    },
  },
};

// ─────────────────────────────────────────────────────────────
// System Prompt
// ─────────────────────────────────────────────────────────────

function buildSystemPrompt({ customPrompt, companyName, phone, useTrinks, trinksConfig }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit',
  });

  const profRule = useTrinks && trinksConfig?.escolherProfissional
    ? '11. Sempre pergunte ao cliente qual profissional prefere antes de verificar disponibilidade (use list_professionals).'
    : useTrinks && trinksConfig?.defaultProfissionalId
    ? '11. Não pergunte sobre profissional — o estabelecimento já tem um profissional padrão configurado.'
    : '11. Não pergunte sobre profissional — o sistema escolhe automaticamente o disponível.';

  const base = `Você é um assistente virtual especializado em agendamentos para ${companyName || 'nosso estabelecimento'}.

DATA E HORA ATUAL: ${dateStr}, ${timeStr}
TELEFONE DO CLIENTE: ${phone}

REGRAS FUNDAMENTAIS:
1. Nunca revele que é uma IA ou bot — atue sempre como atendente humano.
2. Seja cordial, objetivo e profissional.
3. Antes de criar qualquer agendamento, confirme: serviço, data, horário e nome completo.
4. Nunca afirme que o agendamento foi criado — aguarde o resultado de book_appointment.
5. Se um horário não estiver disponível, ofereça alternativas do mesmo dia ou seguinte.
6. Converta datas informais: "amanhã", "sexta-feira", "20/04" → YYYY-MM-DD.
7. Horários informais: "às 3 da tarde" → 15:00, "14h" → 14:00.
8. Se o cliente não informar o nome, pergunte antes de agendar.
9. Mensagens curtas e naturais — máximo 3 parágrafos por resposta.
10. Use emojis com moderação.
${profRule}`;

  return customPrompt?.trim()
    ? `${base}\n\nINSTRUÇÕES ADICIONAIS DO ESTABELECIMENTO:\n${customPrompt}`
    : base;
}

// ─────────────────────────────────────────────────────────────
// Executores de ferramentas — Modo Local (Firestore + GCal)
// ─────────────────────────────────────────────────────────────

async function executeLocalTool(toolName, args, context) {
  const { companyId, storeId, phone, services } = context;

  switch (toolName) {
    case 'get_services': {
      if (!services.length) return { services: [], message: 'Nenhum serviço cadastrado.' };
      return {
        services: services.map((s) => ({
          id: s.id, name: s.name, price: s.price,
          duration_minutes: s.duration, description: s.description,
        })),
      };
    }

    case 'check_availability': {
      const { date, service_id } = args;
      const svc = services.find((s) => s.id === service_id);
      const duration = svc?.duration || 60;
      const slots = await getAvailableSlots(companyId, storeId, date, duration);
      if (!slots.length) return { date, available: false, slots: [], message: 'Sem horários disponíveis nesta data.' };
      return { date, available: true, slots };
    }

    case 'get_client_info': {
      const cliente = await getClienteByPhone(companyId, phone);
      const { proximos, historico } = await getAgendamentosByPhone(companyId, phone);
      return {
        is_registered: !!cliente,
        client: cliente ? { id: cliente.id, name: cliente.nome } : null,
        upcoming_appointments: proximos.map((a) => ({
          id: a.id, service: a.serviceName,
          date: a.date, time: a.time, status: a.status,
          trinks_id: a.trinksAppointmentId || null,
        })),
        past_count: historico.length,
      };
    }

    case 'book_appointment': {
      const { client_name, service_id, service_name, service_price, service_duration, date, time, notes } = args;
      const svc = services.find((s) => s.id === service_id);
      const dur = service_duration || svc?.duration || 60;

      // Valida disponibilidade antes de criar
      const slots = await getAvailableSlots(companyId, storeId, date, dur);
      if (!slots.includes(time)) {
        return {
          success: false,
          error: `Horário ${time} indisponível. Disponíveis: ${slots.slice(0, 5).join(', ')}`,
        };
      }

      const result = await bookAppointment(companyId, storeId, {
        clientPhone: phone, clientName: client_name,
        serviceId: service_id, serviceName: service_name,
        servicePrice: service_price || svc?.price || 0,
        date, time, duration: dur, notes: notes || '',
      });

      return {
        success: true,
        appointment_id: result.agendamento.id,
        summary: {
          client: client_name, service: service_name,
          date: formatDate(date), time,
          price: formatPrice(result.agendamento.servicePrice),
        },
      };
    }

    case 'cancel_appointment': {
      const { appointment_id, trinks_id } = args;
      await cancelBooking(companyId, appointment_id, trinks_id || null);
      return { success: true, appointment_id };
    }

    case 'transfer_to_human': {
      await setHumanMode(companyId, phone, true);
      context._transferredToHuman = true;
      return { success: true, reason: args.reason };
    }

    default:
      return { error: `Ferramenta desconhecida: ${toolName}` };
  }
}

// ─────────────────────────────────────────────────────────────
// Executores de ferramentas — Modo Trinks (primário)
// ─────────────────────────────────────────────────────────────

async function executeTrinksTool(toolName, args, context) {
  const { companyId, phone, trinks } = context;
  const { mostrarPrecos = true, mostrarProfissionalConfirmacao = true } = trinks;

  switch (toolName) {
    case 'get_services': {
      const services = await getTrinksServices(trinks);
      if (!services.length) return { services: [], message: 'Nenhum serviço disponível.' };
      return {
        services: services.map((s) => ({
          id: String(s.id),
          name: s.name,
          duration_minutes: s.duration,
          price: mostrarPrecos ? s.price : undefined,
          category: s.category,
          description: s.description,
        })),
      };
    }

    case 'list_professionals': {
      const { date, service_id } = args;
      const result = await getTrinksAvailability(trinks, date, Number(service_id));
      if (!result.professionals?.length) {
        return { date, available: false, message: 'Nenhum profissional disponível nesta data.' };
      }
      return {
        date,
        available: true,
        professionals: result.professionals.map((p) => ({
          id: String(p.id), name: p.name, available_slots: p.slots,
        })),
      };
    }

    case 'check_availability': {
      const { date, service_id, professional_id } = args;
      const result = await getTrinksAvailability(
        trinks, date,
        service_id ? Number(service_id) : null,
        professional_id ? Number(professional_id) : null
      );

      if (result.byProfessional) {
        // Modo escolha de profissional — retorna por profissional
        const available = result.professionals?.length > 0;
        return {
          date, available,
          professionals: (result.professionals || []).map((p) => ({
            id: String(p.id), name: p.name, slots: p.slots,
          })),
        };
      } else {
        // Modo sem escolha — retorna slots unificados
        const slots = result.slots || [];
        return { date, available: slots.length > 0, slots };
      }
    }

    case 'get_client_info': {
      const client = await findTrinksClient(trinks, phone);
      let upcoming = [];
      if (client?.id) {
        upcoming = await getTrinksClientAppointments(trinks, client.id);
      }
      return {
        is_registered: !!client,
        client: client ? { id: String(client.id), name: client.nome || client.name } : null,
        upcoming_appointments: upcoming.map((a) => ({
          id: String(a.id),
          service: a.serviceName,
          date: a.date,
          time: a.time,
          status: a.status,
          professional: a.professionalName || null,
        })),
      };
    }

    case 'book_appointment': {
      const {
        client_name, service_id, service_name, service_price,
        service_duration, date, time, professional_id, professional_name, notes,
      } = args;

      // 1. Garante que o cliente existe no Trinks
      const trinksClient = await findOrCreateTrinksClient(trinks, phone, client_name);
      if (!trinksClient?.id) {
        return { success: false, error: 'Não foi possível registrar o cliente no sistema.' };
      }

      // 2. Resolve profissional
      const profId = professional_id
        ? Number(professional_id)
        : (trinks.defaultProfissionalId ? Number(trinks.defaultProfissionalId) : null);

      // 3. Cria no Trinks
      const trinksAppt = await createTrinksAppointment(trinks, {
        servicoId: Number(service_id),
        clienteId: trinksClient.id,
        date, time,
        duration: service_duration || 60,
        price: service_price || 0,
        profissionalId: profId,
        notes: notes || '',
      });

      if (!trinksAppt?.id) {
        return { success: false, error: 'Erro ao criar agendamento no sistema.' };
      }

      // 4. Espelha no Firestore (só para histórico do bot e lembretes)
      const db = getDb();
      await db.collection('agendamentos').add({
        companyId,
        clientPhone: phone,
        clientName: client_name,
        serviceId: service_id,
        serviceName: service_name,
        servicePrice: service_price || 0,
        date, time,
        duration: service_duration || 60,
        status: 'agendado',
        source: 'trinks',
        trinksAppointmentId: trinksAppt.id,
        professionalId: String(profId || ''),
        professionalName: professional_name || '',
        notes: notes || '',
        reminderSent: false,
        reminderSentAt: null,
        googleCalendarEventId: null,
        criadoEm: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      const summary = {
        client: client_name,
        service: service_name,
        date: formatDate(date),
        time,
      };
      if (mostrarProfissionalConfirmacao && professional_name) {
        summary.professional = professional_name;
      }
      if (service_price) {
        summary.price = formatPrice(service_price);
      }

      return { success: true, trinks_id: String(trinksAppt.id), summary };
    }

    case 'cancel_appointment': {
      const { appointment_id, trinks_id } = args;

      // Cancela no Trinks (usando trinks_id ou appointment_id como fallback)
      const idToCancel = trinks_id || appointment_id;
      await cancelTrinksAppointment(trinks, idToCancel);

      // Atualiza espelho no Firestore
      try {
        const db = getDb();
        const snap = await db
          .collection('agendamentos')
          .where('trinksAppointmentId', '==', String(idToCancel))
          .limit(1).get();
        if (!snap.empty) {
          await snap.docs[0].ref.update({
            status: 'cancelado',
            updatedAt: FieldValue.serverTimestamp(),
          });
        }
      } catch { /* não crítico */ }

      return { success: true, trinks_id: idToCancel };
    }

    case 'transfer_to_human': {
      await setHumanMode(companyId, phone, true);
      context._transferredToHuman = true;
      return { success: true, reason: args.reason };
    }

    default:
      return { error: `Ferramenta desconhecida: ${toolName}` };
  }
}

// ─────────────────────────────────────────────────────────────
// Loop principal do agente
// ─────────────────────────────────────────────────────────────

/**
 * Processa a mensagem do cliente e retorna as mensagens de resposta.
 *
 * @param {object} params
 * @param {string} params.companyId
 * @param {string} params.storeId
 * @param {string} params.phone
 * @param {string} params.userMessage
 * @param {Array}  params.history
 * @param {string} params.customPrompt
 * @param {string} params.companyName
 * @param {object} params.company       - Documento completo da empresa (inclui .trinks)
 *
 * @returns {{ messages: string[], stage: string, transferredToHuman: boolean }}
 */
export async function processAgendamentoMessage(params) {
  const { companyId, storeId, phone, userMessage, history, customPrompt, companyName, company } = params;

  const tAgent = timer();

  // ── Detecta o modo ───────────────────────────────────────────
  const trinksConfig = company?.trinks;
  const useTrinks = !!(trinksConfig?.enabled && trinksConfig?.apiKey && trinksConfig?.estabelecimentoId);

  log.ai('Agendamento', `${phone} — modo: ${useTrinks ? 'Trinks' : 'Local'} | modelo: ${ENV.OPENAI_MODEL}`);

  // ── Carrega dados dependentes do modo ────────────────────────
  const services = useTrinks ? [] : await getServices(companyId, storeId);
  if (!useTrinks) {
    log.debug('Agendamento', `${phone} — ${services.length} serviço(s) carregados do Firestore`);
  }

  // ── Contexto do executor ─────────────────────────────────────
  const context = {
    companyId, storeId, phone,
    services,
    trinks: useTrinks ? trinksConfig : null,
    _transferredToHuman: false,
  };

  // ── Ferramentas disponíveis ──────────────────────────────────
  const tools = [...BASE_TOOLS];
  if (useTrinks && trinksConfig.escolherProfissional) {
    tools.push(TRINKS_PROFESSIONAL_TOOL);
  }
  log.debug('Agendamento', `${phone} — ${tools.length} ferramenta(s) disponíveis`);

  // ── System prompt ────────────────────────────────────────────
  const systemPrompt = buildSystemPrompt({
    customPrompt, companyName, phone, useTrinks, trinksConfig,
  });

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: '(contexto interno: início de conversa)' },
    { role: 'assistant', content: 'Olá! Como posso ajudar com seu agendamento hoje? 😊' },
    ...history,
    { role: 'user', content: userMessage },
  ];

  let finalText = '';
  let stage = 'ativo';
  let turns = 0;

  // ── Loop de tool calling ─────────────────────────────────────
  while (turns < ENV.MAX_TOOL_TURNS) {
    turns++;
    const tTurn = timer();
    log.ai('Agendamento', `${phone} — turno ${turns}/${ENV.MAX_TOOL_TURNS} → chamando ${ENV.OPENAI_MODEL}...`);

    const response = await openai.chat.completions.create({
      model: ENV.OPENAI_MODEL,
      messages,
      tools,
      tool_choice: 'auto',
      temperature: ENV.OPENAI_TEMPERATURE,
      max_tokens: ENV.OPENAI_MAX_TOKENS,
    });

    const choice = response.choices[0];
    const assistantMsg = choice.message;
    messages.push(assistantMsg);
    tTurn.end('Agendamento', `${phone} — turno ${turns} concluído`);

    if (!assistantMsg.tool_calls?.length) {
      finalText = assistantMsg.content || '';
      log.ai('Agendamento', `${phone} — resposta final no turno ${turns}: "${preview(finalText, 100)}"`);
      break;
    }

    log.ai('Agendamento', `${phone} — ${assistantMsg.tool_calls.length} ferramenta(s) solicitada(s)`);

    for (const toolCall of assistantMsg.tool_calls) {
      let args = {};
      try { args = JSON.parse(toolCall.function.arguments); } catch { args = {}; }

      const tTool = timer();
      log.tool('Agendamento', `${phone} — ${toolCall.function.name}(${preview(JSON.stringify(args), 120)})`);

      // Roteia para o executor correto
      const result = useTrinks
        ? await executeTrinksTool(toolCall.function.name, args, context)
        : await executeLocalTool(toolCall.function.name, args, context);

      tTool.end('Agendamento', `${phone} — ${toolCall.function.name} → ${preview(JSON.stringify(result), 120)}`);

      // Atualiza stage
      if (toolCall.function.name === 'book_appointment' && result.success) {
        stage = 'agendado';
        log.ok('Agendamento', `${phone} — agendamento criado! ${result.summary ? JSON.stringify(result.summary) : ''}`);
      }
      if (toolCall.function.name === 'transfer_to_human') {
        stage = 'humano';
        log.ok('Agendamento', `${phone} — transferido para humano: ${args.reason}`);
      }

      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
  }

  if (!finalText) {
    finalText = 'Desculpe, tive um problema ao processar. Pode repetir?';
    log.warn('Agendamento', `${phone} — MAX_TOOL_TURNS (${ENV.MAX_TOOL_TURNS}) atingido sem resposta final`);
  }

  const parts = splitMessages(finalText);
  tAgent.end('Agendamento', `${phone} — agente concluído | ${parts.length} msg(s) | ${turns} turno(s) | stage: ${stage}`);

  return {
    messages: parts,
    stage,
    transferredToHuman: context._transferredToHuman,
  };
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

function formatPrice(value) {
  return (value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function splitMessages(text) {
  if (text.includes('---')) {
    return text.split('---').map((s) => s.trim()).filter(Boolean);
  }
  if (text.length > 600) {
    const parts = text.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
    if (parts.length > 1) return parts;
  }
  return [text.trim()];
}
