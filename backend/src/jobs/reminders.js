/**
 * Job de Lembretes de Agendamento
 *
 * Roda a cada 30 minutos via node-cron.
 * Busca agendamentos com reminder não enviado que ocorrem
 * nas próximas REMINDER_HOURS_BEFORE horas e envia lembrete por WhatsApp.
 *
 * Formato do lembrete:
 * "Olá {nome}! Lembrando que você tem {serviço} agendado para amanhã, {data} às {hora}.
 *  Qualquer dúvida é só falar! 😊"
 */

import cron from 'node-cron';
import {
  getAgendamentosForReminder,
  markReminderSent,
} from '../services/firestore.js';
import { sendText } from '../services/evolution.js';
import { getDb } from '../config/firebase.js';
import { ENV } from '../config/env.js';
import { log } from '../utils/logger.js';

/**
 * Inicia o cron job de lembretes.
 * Executa a cada 30 minutos.
 */
export function startReminderJob() {
  // Executa a cada 30 minutos
  cron.schedule('*/30 * * * *', async () => {
    log.info('Reminder', 'Verificando agendamentos para lembrete...');
    await sendReminders().catch((err) => {
      log.error('Reminder', `Erro no job de lembretes: ${err.message}`);
    });
  });

  log.info('Reminder', 'Job de lembretes iniciado (a cada 30 minutos)');

  // Executa uma vez na inicialização para não perder lembretes durante reinicializações
  sendReminders().catch(() => {});
}

async function sendReminders() {
  const agendamentos = await getAgendamentosForReminder(ENV.REMINDER_HOURS_BEFORE);

  if (agendamentos.length === 0) {
    log.debug('Reminder', 'Nenhum agendamento para lembrar agora.');
    return;
  }

  log.info('Reminder', `Enviando ${agendamentos.length} lembrete(s)...`);

  for (const agendamento of agendamentos) {
    try {
      await sendReminderForAppointment(agendamento);
      await markReminderSent(agendamento.id);
      log.ok('Reminder', `Lembrete enviado para ${agendamento.clientPhone} — ${agendamento.date} ${agendamento.time}`);
    } catch (err) {
      log.error('Reminder', `Erro ao enviar lembrete para ${agendamento.clientPhone}: ${err.message}`);
    }

    // Pequeno delay entre envios
    await sleep(500);
  }
}

async function sendReminderForAppointment(agendamento) {
  const { companyId, storeId, clientPhone, clientName, serviceName, date, time } = agendamento;

  // Encontra a instância WhatsApp da empresa/loja
  const instanceName = await findInstanceForCompany(companyId, storeId);
  if (!instanceName) {
    log.warn('Reminder', `Nenhuma instância encontrada para empresa ${companyId}`);
    return;
  }

  // Formata a data para exibição
  const dateDisplay = formatDateDisplay(date);
  const firstName = (clientName || 'Cliente').split(' ')[0];

  // Verifica se é amanhã ou hoje
  const isToday = date === getTodayStr();
  const isTomorrow = date === getTomorrowStr();
  const dayWord = isToday ? 'hoje' : isTomorrow ? 'amanhã' : `em ${dateDisplay}`;

  const message =
    `Olá, ${firstName}! 😊\n\n` +
    `Lembrando que você tem *${serviceName}* agendado ${dayWord}, ` +
    `*${dateDisplay}* às *${time}*.\n\n` +
    `Caso precise remarcar ou cancelar, é só falar comigo aqui! 📅`;

  await sendText(instanceName, clientPhone, message);
}

/**
 * Encontra o nome da instância Evolution API de uma empresa/loja.
 */
async function findInstanceForCompany(companyId, storeId) {
  const db = getDb();

  // Tenta encontrar instância vinculada à loja específica
  if (storeId) {
    const snap = await db
      .collection('instancias')
      .where('empresaId', '==', companyId)
      .where('lojaId', '==', storeId)
      .where('funcao', '==', 'agendamento')
      .limit(1)
      .get();

    if (!snap.empty) return snap.docs[0].data().nome;
  }

  // Fallback: qualquer instância de agendamento da empresa
  const snap = await db
    .collection('instancias')
    .where('empresaId', '==', companyId)
    .where('funcao', '==', 'agendamento')
    .limit(1)
    .get();

  if (!snap.empty) return snap.docs[0].data().nome;
  return null;
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function formatDateDisplay(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
  });
}

function getTodayStr() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
}

function getTomorrowStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
