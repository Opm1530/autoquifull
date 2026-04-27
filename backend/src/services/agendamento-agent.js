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
import { getAvailableSlots, getAvailabilityInfo, bookAppointment, cancelBooking } from './scheduler.js';
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
      description: 'Lista todos os serviços disponíveis. CHAME no início da conversa ou quando o cliente mencionar um serviço pelo nome, para obter o service_id correto necessário para check_availability e book_appointment.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_availability',
      description:
        'CHAME IMEDIATAMENTE quando o cliente mencionar qualquer data ou horário para agendamento. ' +
        'Retorna os slots reais disponíveis — sem chamar esta ferramenta você NÃO SABE se há vagas. ' +
        'Nunca diga "não temos horários" sem consultar esta ferramenta primeiro.',
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
        'CHAME IMEDIATAMENTE quando o cliente perguntar sobre seus agendamentos, quiser cancelar ou reagendar. ' +
        'Retorna os agendamentos futuros reais do cliente — sem esta ferramenta você NÃO SABE o que ele tem marcado.',
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
      description: 'Cancela um agendamento existente. Sempre chame get_client_info primeiro para obter o appointment_id correto. Confirme com o cliente antes de cancelar.',
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

  const base = `Você é uma atendente virtual calorosa e natural da ${companyName || 'nossa empresa'}.

DATA E HORA ATUAL: ${dateStr}, ${timeStr}
TELEFONE DO CLIENTE: ${phone}

══════════════════════════════════════════
PERSONALIDADE E TOM DE VOZ:
══════════════════════════════════════════
- Fale como uma atendente humana simpática — não robótica, não formal demais
- Use linguagem natural do dia a dia: "Deixa eu ver aqui pra você!", "Boa notícia!", "Consegui sim!"
- Respostas curtas e diretas — máximo 3-4 linhas por mensagem
- Use emojis com leveza (1-2 por mensagem no máximo)
- Nunca revele que é uma IA — você é a atendente da ${companyName || 'empresa'}
- Variações naturais: ao de confirmar agendamento, não use sempre o mesmo formato

══════════════════════════════════════════
REGRA CRÍTICA — EXECUTE, NÃO INVENTE:
══════════════════════════════════════════
Você NÃO tem acesso direto à agenda. SEMPRE use as ferramentas para obter informações reais.

JAMAIS diga que um horário está disponível ou indisponível sem chamar check_availability.
JAMAIS diga que o cliente tem ou não tem agendamentos sem chamar get_client_info.

FLUXO — NOVO AGENDAMENTO:
  1. Cliente menciona data/serviço → CHAME check_availability IMEDIATAMENTE (não peça o nome antes)
  2. Se o horário pedido estiver disponível → confirme com o cliente e peça o nome
  3. Se não estiver → mostre os slots reais disponíveis de forma amigável
  4. Com serviço + data + horário + nome confirmados → CHAME book_appointment

FLUXO — CONSULTAR AGENDAMENTOS:
  → Cliente pergunta sobre seus horários marcados → CHAME get_client_info imediatamente
  → Mostre os próximos agendamentos de forma clara e amigável

FLUXO — CANCELAR:
  1. CHAME get_client_info para ver os agendamentos
  2. Mostre o(s) agendamento(s) e pergunte qual cancelar
  3. Confirme com o cliente antes de cancelar
  4. CHAME cancel_appointment

FLUXO — REAGENDAR:
  1. CHAME get_client_info para ver o agendamento atual
  2. Pergunte qual data/horário o cliente prefere
  3. CHAME check_availability na nova data
  4. CHAME cancel_appointment no agendamento antigo
  5. CHAME book_appointment com os novos dados
  6. Confirme o reagendamento de forma amigável

ANTI-PADRÕES PROIBIDOS:
  ❌ "Infelizmente não temos horários" sem ter chamado check_availability
  ❌ "Vou verificar..." sem chamar a ferramenta na mesma mensagem
  ❌ Pedir o nome ANTES de verificar disponibilidade
  ❌ Dizer que tem ou não tem agendamentos sem chamar get_client_info
  ❌ "Estou com instabilidade" — se houver erro, tente novamente ou informe de forma natural
  ❌ Inventar um service_id — sempre chame get_services para obter os IDs reais

REGRAS GERAIS:
- Converta datas informais: "amanhã", "sexta-feira", "20/04" → YYYY-MM-DD
- Horários informais: "às 3 da tarde" → 15:00, "14h" → 14:00
- Nunca confirme agendamento sem resultado positivo de book_appointment
- Quando check_availability retornar store_closed=true: explique que a loja não funciona nesse dia e use o campo "reason" + "suggestions" para oferecer alternativas
- Quando check_availability retornar suggestions: apresente-as de forma natural ("Tenho vagas no dia X às Y, Y ou Y. Algum desses te serve?")
- Só agende serviços que existem em get_services — nunca invente um serviço que o cliente pediu se ele não estiver na lista
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
      if (!services.length) {
        return {
          services: [],
          message: 'Nenhum serviço cadastrado no sistema ainda. Informe ao cliente que os serviços estão sendo configurados e ofereça transferir para um atendente humano.',
        };
      }
      return {
        services: services.map((s) => ({
          id: s.id,
          name: s.name,
          price: s.price,
          duration_minutes: s.duration,
          description: s.description || '',
        })),
      };
    }

    case 'check_availability': {
      const { date, service_id } = args;

      // Resolve o serviço: por ID ou por nome (case-insensitive)
      let svc = services.find((s) => s.id === service_id);
      if (!svc && service_id) {
        // Tenta match por nome
        svc = services.find((s) => s.name.toLowerCase().includes(service_id.toLowerCase())
          || service_id.toLowerCase().includes(s.name.toLowerCase()));
      }
      const duration = svc?.duration || 60;

      const info = await getAvailabilityInfo(companyId, storeId, date, duration);

      if (!info.slots.length) {
        const DAY_NAMES_PT = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
        const d = new Date(date + 'T12:00:00');
        const dayNamePt = DAY_NAMES_PT[d.getDay()];

        // Razão clara para a IA explicar ao cliente
        const reason = info.storeClosed
          ? `A loja não funciona às ${dayNamePt}s.`
          : `Todos os horários do dia ${date} estão ocupados.`;

        // Busca próximos dias com vagas (até 14 dias pra frente)
        const suggestions = [];
        for (let i = 1; i <= 14 && suggestions.length < 3; i++) {
          const nextDate = new Date(date + 'T12:00:00');
          nextDate.setDate(nextDate.getDate() + i);
          const nextDateStr = nextDate.toISOString().slice(0, 10);
          const nextInfo = await getAvailabilityInfo(companyId, storeId, nextDateStr, duration);
          if (nextInfo.slots.length > 0) {
            suggestions.push({
              date: nextDateStr,
              date_formatted: formatDate(nextDateStr),
              slots: nextInfo.slots.slice(0, 6),
            });
          }
        }

        return {
          date,
          date_formatted: formatDate(date),
          available: false,
          slots: [],
          store_closed: info.storeClosed,
          reason,
          suggestions,
        };
      }

      return {
        date,
        date_formatted: formatDate(date),
        available: true,
        open_time: info.openTime,
        close_time: info.closeTime,
        slots: info.slots,
      };
    }

    case 'get_client_info': {
      let cliente = null;
      let proximos = [];
      let historico = [];

      try { cliente = await getClienteByPhone(companyId, phone); } catch { /* ignora */ }
      try {
        const result = await getAgendamentosByPhone(companyId, phone);
        proximos = result.proximos || [];
        historico = result.historico || [];
      } catch (err) {
        log.warn('Agendamento', `${phone} — get_client_info falhou: ${err.message}`);
        return { error: 'Não foi possível carregar os agendamentos agora. Peça desculpas ao cliente e oriente a entrar em contato por outro canal.' };
      }

      return {
        is_registered: !!cliente,
        client: cliente ? { id: cliente.id, name: cliente.nome } : null,
        upcoming_appointments: proximos.map((a) => ({
          id: a.id,
          service: a.serviceName,
          date: a.date,
          date_formatted: formatDate(a.date),
          time: a.time,
          status: a.status,
          trinks_id: a.trinksAppointmentId || null,
        })),
        past_count: historico.length,
        message: proximos.length === 0 ? 'Nenhum agendamento futuro encontrado para este cliente.' : null,
      };
    }

    case 'book_appointment': {
      const { client_name, service_id, service_name, service_price, service_duration, date, time, notes } = args;

      // Resolve serviço: por ID exato, depois por nome
      let svc = services.find((s) => s.id === service_id);
      if (!svc && service_id) {
        svc = services.find((s) => s.name.toLowerCase().includes(service_id.toLowerCase())
          || service_id.toLowerCase().includes(s.name.toLowerCase()));
      }
      if (!svc && service_name) {
        svc = services.find((s) => s.name.toLowerCase().includes(service_name.toLowerCase())
          || service_name.toLowerCase().includes(s.name.toLowerCase()));
      }

      // Se há serviços cadastrados mas nenhum bate, rejeita
      if (services.length > 0 && !svc) {
        const serviceList = services.map((s) => `"${s.name}"`).join(', ');
        return {
          success: false,
          error: `Serviço não encontrado. Serviços disponíveis: ${serviceList}. Peça ao cliente para escolher um desses.`,
        };
      }

      // Usa SEMPRE os dados do Firestore quando o serviço for encontrado
      // (nunca confia no que a IA passou para preço/duração)
      const resolvedServiceId = svc?.id || service_id;
      const resolvedServiceName = svc?.name || service_name;
      const resolvedPrice = svc?.price ?? service_price ?? 0;
      const dur = svc?.duration || service_duration || 60;

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
        serviceId: resolvedServiceId, serviceName: resolvedServiceName,
        servicePrice: resolvedPrice,
        date, time, duration: dur, notes: notes || '',
      });

      // Salva detalhes no contexto para o webhook enviar mensagem automática
      context._bookingDetails = {
        appointmentId: result.agendamento.id,
        clientName: client_name,
        serviceName: resolvedServiceName,
        servicePrice: resolvedPrice,
        date,
        time,
        duration: dur,
      };

      return {
        success: true,
        appointment_id: result.agendamento.id,
        summary: {
          client: client_name,
          service: resolvedServiceName,
          date: formatDate(date),
          time,
          price: resolvedPrice > 0 ? formatPrice(resolvedPrice) : null,
          instruction: 'Agendamento criado com sucesso. Confirme de forma calorosa e natural para o cliente. Inclua o valor do serviço na confirmação se price não for null.',
        },
      };
    }

    case 'cancel_appointment': {
      const { appointment_id, trinks_id } = args;

      // Busca dados do agendamento antes de cancelar (para a mensagem automática)
      let apptData = null;
      try {
        const { getDb } = await import('../config/firebase.js');
        const db = getDb();
        const doc = await db.collection('agendamentos').doc(appointment_id).get();
        if (doc.exists) apptData = doc.data();
      } catch { /* não crítico */ }

      await cancelBooking(companyId, appointment_id, trinks_id || null);

      // Salva detalhes no contexto para o webhook enviar mensagem automática
      context._cancelDetails = {
        appointmentId: appointment_id,
        clientName: apptData?.clientName || null,
        serviceName: apptData?.serviceName || null,
        date: apptData?.date || null,
        time: apptData?.time || null,
      };
      context._stage = 'cancelado';

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
        const available = result.professionals?.length > 0;
        return {
          date,
          date_formatted: formatDate(date),
          available,
          professionals: (result.professionals || []).map((p) => ({
            id: String(p.id), name: p.name, slots: p.slots,
          })),
        };
      } else {
        const slots = result.slots || [];
        if (!slots.length) {
          // Sugere próximos dias via Trinks (até 7 dias à frente)
          const suggestions = [];
          for (let i = 1; i <= 14 && suggestions.length < 3; i++) {
            const nextDate = new Date(date + 'T12:00:00');
            nextDate.setDate(nextDate.getDate() + i);
            const nextDateStr = nextDate.toISOString().slice(0, 10);
            try {
              const nextResult = await getTrinksAvailability(trinks, nextDateStr, service_id ? Number(service_id) : null, professional_id ? Number(professional_id) : null);
              const nextSlots = nextResult.slots || [];
              if (nextSlots.length > 0) {
                suggestions.push({ date: nextDateStr, date_formatted: formatDate(nextDateStr), slots: nextSlots.slice(0, 6) });
              }
            } catch { break; }
          }
          return {
            date,
            date_formatted: formatDate(date),
            available: false,
            slots: [],
            suggestions,
          };
        }
        return { date, date_formatted: formatDate(date), available: true, slots };
      }
    }

    case 'get_client_info': {
      let client = null;
      let upcoming = [];

      try { client = await findTrinksClient(trinks, phone); } catch { /* ignora */ }
      if (client?.id) {
        try { upcoming = await getTrinksClientAppointments(trinks, client.id); } catch { /* ignora */ }
      }

      return {
        is_registered: !!client,
        client: client ? { id: String(client.id), name: client.nome || client.name } : null,
        upcoming_appointments: upcoming.map((a) => ({
          id: String(a.id),
          service: a.serviceName,
          date: a.date,
          date_formatted: formatDate(a.date),
          time: a.time,
          status: a.status,
          professional: a.professionalName || null,
        })),
        message: upcoming.length === 0 ? 'Nenhum agendamento futuro encontrado para este cliente.' : null,
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

  // O cancelamento pode sobrescrever o stage (vem do executor)
  if (context._stage === 'cancelado' && stage !== 'humano') {
    stage = 'cancelado';
  }

  return {
    messages: parts,
    stage,
    transferredToHuman: context._transferredToHuman,
    bookingDetails: context._bookingDetails || null,
    cancelDetails: context._cancelDetails || null,
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
