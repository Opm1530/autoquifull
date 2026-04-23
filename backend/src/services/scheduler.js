/**
 * Scheduler Service — disponibilidade e booking de agendamentos
 *
 * Responsável por:
 * 1. Calcular horários disponíveis de um dia (respeitando horários da loja e agendamentos existentes)
 * 2. Criar agendamentos no Firestore
 * 3. Sincronizar com Trinks (se configurado na empresa)
 * 4. Cancelar agendamentos
 */

import {
  getAgendamentosForDate,
  createAgendamento,
  cancelAgendamento,
  getLojaConfig,
  getServices,
  getClienteByPhone,
  createCliente,
  getCompany,
} from './firestore.js';
import { createCalendarEvent, deleteCalendarEvent } from './google-calendar.js';
import { getDb } from '../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { log } from '../utils/logger.js';

// ─────────────────────────────────────────────────────────────
// Disponibilidade
// ─────────────────────────────────────────────────────────────

/**
 * Calcula os horários disponíveis para um dia, serviço e loja.
 *
 * @param {string} companyId
 * @param {string} storeId
 * @param {string} date - YYYY-MM-DD
 * @param {number} duration - Duração do serviço em minutos
 * @returns {string[]} Array de horários disponíveis no formato HH:MM
 */
export async function getAvailableSlots(companyId, storeId, date, duration = 60) {
  const config = await getLojaConfig(companyId, storeId);
  const horarios = config?.horarios || null;

  // Determina o range de funcionamento
  const { openTime, closeTime, isOpen } = getDayHours(horarios, date);

  if (!isOpen) {
    log.info('Scheduler', `${date} — loja fechada (${companyId})`);
    return [];
  }

  // Busca agendamentos existentes para o dia
  const existingAppts = await getAgendamentosForDate(companyId, storeId, date);

  // Gera todos os slots possíveis (intervalos de 30 minutos)
  const allSlots = generateSlots(openTime, closeTime, 30);

  // Filtra slots que conflitam com agendamentos existentes
  const available = allSlots.filter((slot) => {
    const slotStart = timeToMinutes(slot);
    const slotEnd = slotStart + duration;

    // Verifica conflito com cada agendamento existente
    for (const appt of existingAppts) {
      const apptStart = timeToMinutes(appt.time);
      const apptEnd = apptStart + (appt.duration || 60);
      const buffer = 10; // minutos de buffer entre atendimentos

      // Há conflito se os períodos se sobrepõem
      if (slotStart < apptEnd + buffer && slotEnd > apptStart - buffer) {
        return false;
      }
    }

    // Verifica se o serviço termina antes do fechamento
    if (slotEnd > timeToMinutes(closeTime)) return false;

    // Não permite horários no passado para o dia de hoje
    if (date === getTodayStr()) {
      const nowMinutes = getNowMinutes();
      if (slotStart <= nowMinutes + 30) return false; // 30 min de margem mínima
    }

    return true;
  });

  log.info('Scheduler', `${date} — ${available.length}/${allSlots.length} slots disponíveis (${existingAppts.length} agendamento(s) existente(s), duração ${duration}min)`);
  return available;
}

/**
 * Retorna todos os horários ocupados de um dia (para contexto da IA).
 */
export async function getOccupiedSlots(companyId, storeId, date) {
  const appts = await getAgendamentosForDate(companyId, storeId, date);
  return appts.map((a) => ({
    time: a.time,
    duration: a.duration || 60,
    service: a.serviceName,
  }));
}

// ─────────────────────────────────────────────────────────────
// Booking
// ─────────────────────────────────────────────────────────────

/**
 * Cria ou atualiza um cliente e cria o agendamento.
 * Opcionalmente sincroniza com Trinks.
 *
 * @returns {{ agendamento, cliente, trinksId? }}
 */
export async function bookAppointment(companyId, storeId, params) {
  const {
    clientPhone,
    clientName,
    email,
    dataNascimento,
    serviceId,
    serviceName,
    servicePrice,
    date,
    time,
    duration,
    notes,
  } = params;

  // 1. Garante que o cliente existe na coleção `clientes`
  let cliente = await getClienteByPhone(companyId, clientPhone);
  if (!cliente) {
    cliente = await createCliente(companyId, storeId, {
      nome: clientName,
      telefone: clientPhone,
      email: email || '',
      dataNascimento: dataNascimento || '',
    });
    log.ok('Scheduler', `Novo cliente criado: ${clientName} (${clientPhone})`);
  }

  // 2. Cria o agendamento no Firestore
  const agendamento = await createAgendamento(companyId, storeId, {
    clienteId: cliente.id,
    clientName: cliente.nome,
    clientPhone,
    serviceId,
    serviceName,
    servicePrice,
    date,
    time,
    duration,
    notes,
  });

  log.ok('Scheduler', `Agendamento criado: ${agendamento.id} — ${clientName} — ${date} ${time}`);

  // 3. Sincroniza com Trinks (se configurado)
  let trinksId = null;
  try {
    trinksId = await syncWithTrinks(companyId, agendamento, cliente);
  } catch (err) {
    log.warn('Scheduler', `Falha ao sincronizar com Trinks (não crítico): ${err.message}`);
  }

  // 4. Cria evento no Google Calendar (se a empresa tiver token)
  try {
    await createCalendarEvent(companyId, agendamento);
  } catch (err) {
    log.warn('Scheduler', `Falha ao criar evento no Google Calendar (não crítico): ${err.message}`);
  }

  return { agendamento, cliente, trinksId };
}

/**
 * Cancela um agendamento, remove do Trinks e Google Calendar se necessário.
 */
export async function cancelBooking(companyId, agendamentoId, trinksId) {
  // Busca o agendamento para obter googleCalendarEventId antes de cancelar
  let googleCalendarEventId = null;
  try {
    const db = getDb();
    const doc = await db.collection('agendamentos').doc(agendamentoId).get();
    if (doc.exists) {
      googleCalendarEventId = doc.data().googleCalendarEventId || null;
    }
  } catch { /* ignora */ }

  await cancelAgendamento(agendamentoId);

  // Cancela no Trinks se houver ID
  if (trinksId) {
    try {
      await cancelInTrinks(companyId, trinksId);
    } catch (err) {
      log.warn('Scheduler', `Falha ao cancelar no Trinks: ${err.message}`);
    }
  }

  // Remove do Google Calendar se houver evento
  if (googleCalendarEventId) {
    try {
      await deleteCalendarEvent(companyId, googleCalendarEventId);
    } catch (err) {
      log.warn('Scheduler', `Falha ao remover evento do Google Calendar: ${err.message}`);
    }
  }

  log.ok('Scheduler', `Agendamento ${agendamentoId} cancelado`);
}

// ─────────────────────────────────────────────────────────────
// Integração Trinks
// ─────────────────────────────────────────────────────────────

/**
 * Sincroniza um agendamento criado no Firestore com o Trinks.
 * Retorna o trinksId ou null se Trinks não estiver configurado.
 */
async function syncWithTrinks(companyId, agendamento, cliente) {
  const company = await getCompany(companyId);
  const trinks = company?.trinks;

  if (!trinks?.enabled || !trinks?.apiKey || !trinks?.estabelecimentoId) {
    return null;
  }

  const trinksClient = await getTrinksClient(trinks, agendamento.clientPhone, cliente);
  if (!trinksClient) {
    console.warn('[Trinks] Não foi possível obter/criar cliente no Trinks');
    return null;
  }

  // Mapeia serviceId local → ID do serviço no Trinks
  const trinksServiceId = trinks.serviceMapping?.[agendamento.serviceId];
  if (!trinksServiceId) {
    console.warn('[Trinks] Serviço não mapeado:', agendamento.serviceId);
    return null;
  }

  // Monta data/hora no formato esperado pelo Trinks
  const startAt = `${agendamento.date}T${agendamento.time}:00`;

  const body = {
    estabelecimentoId: trinks.estabelecimentoId,
    clienteId: trinksClient.id,
    servicoId: trinksServiceId,
    profissionalId: trinks.defaultProfissionalId || undefined,
    dataHoraInicio: startAt,
    observacao: agendamento.notes || '',
  };

  const res = await trinksRequest(trinks.apiKey, 'POST', '/v1/agendamentos', body);

  if (!res?.id) {
    console.warn('[Trinks] Falha ao criar agendamento:', JSON.stringify(res));
    return null;
  }

  // Salva o ID do Trinks no documento Firestore
  await getDb()
    .collection('agendamentos')
    .doc(agendamento.id)
    .update({ trinksAppointmentId: res.id, updatedAt: FieldValue.serverTimestamp() });

  log.ok('Scheduler', `Agendamento espelhado no Trinks: id=${res.id}`);
  return res.id;
}

/**
 * Busca ou cria um cliente no Trinks.
 */
async function getTrinksClient(trinks, phone, localCliente) {
  // Busca pelo telefone
  const found = await trinksRequest(
    trinks.apiKey,
    'GET',
    `/v1/clientes?whatsapp=55${phone.replace(/\D/g, '')}`
  );

  if (found?.data?.[0]) return found.data[0];
  if (found?.id) return found;

  // Cria no Trinks
  const created = await trinksRequest(trinks.apiKey, 'POST', '/v1/clientes', {
    nome: localCliente.nome,
    whatsapp: '55' + phone.replace(/\D/g, ''),
    email: localCliente.email || '',
    dataNascimento: localCliente.dataNascimento || '',
  });

  return created?.id ? created : null;
}

/**
 * Cancela um agendamento no Trinks.
 */
async function cancelInTrinks(companyId, trinksId) {
  const company = await getCompany(companyId);
  const trinks = company?.trinks;

  if (!trinks?.enabled || !trinks?.apiKey) return;

  await trinksRequest(
    trinks.apiKey,
    'PATCH',
    `/v1/agendamentos/${trinksId}/status/cancelado`
  );
}

/**
 * Helper para chamadas à API do Trinks.
 */
async function trinksRequest(apiKey, method, path, body) {
  const BASE = 'https://api.trinks.com';
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Trinks ${method} ${path} → ${res.status}: ${text.slice(0, 200)}`);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Helpers de horário
// ─────────────────────────────────────────────────────────────

/**
 * Retorna os horários de abertura/fechamento para um dia da semana.
 * Usa o formato do loja_config: horarios = { seg: { open: '09:00', close: '18:00', active: true }, ... }
 */
function getDayHours(horarios, dateStr) {
  const dayNames = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  const d = new Date(dateStr + 'T12:00:00');
  const dayKey = dayNames[d.getDay()];

  // Padrão se não houver configuração
  if (!horarios) {
    return { openTime: '09:00', closeTime: '18:00', isOpen: d.getDay() !== 0 };
  }

  const dayConfig = horarios[dayKey];
  if (!dayConfig || dayConfig.active === false || dayConfig.fechado === true) {
    return { openTime: '09:00', closeTime: '18:00', isOpen: false };
  }

  const openTime = dayConfig.open || dayConfig.abertura || '09:00';
  const closeTime = dayConfig.close || dayConfig.fechamento || '18:00';

  return { openTime, closeTime, isOpen: true };
}

/**
 * Gera slots de horário de `start` até `end` com intervalos de `interval` minutos.
 */
function generateSlots(startTime, endTime, intervalMinutes = 30) {
  const slots = [];
  let current = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  while (current < end) {
    slots.push(minutesToTime(current));
    current += intervalMinutes;
  }

  return slots;
}

function timeToMinutes(time) {
  if (!time) return 0;
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function getTodayStr() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
}

function getNowMinutes() {
  const now = new Date();
  const h = parseInt(
    now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', hour12: false })
  );
  const m = parseInt(
    now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', minute: '2-digit' })
  );
  return h * 60 + m;
}
