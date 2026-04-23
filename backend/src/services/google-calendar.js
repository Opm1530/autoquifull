/**
 * Google Calendar Service
 *
 * OAuth2 + CRUD de eventos no Google Calendar.
 * Tokens ficam em Firestore `calendar_tokens/{companyId}` (criptografados).
 */

import { google } from 'googleapis';
import { getDb } from '../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { log } from '../utils/logger.js';

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || randomBytes(32).toString('hex').slice(0, 32);

// ─────────────────────────────────────────────────────────────
// OAuth2 Client factory
// ─────────────────────────────────────────────────────────────

function createOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

/**
 * Gera a URL de autorização para o usuário conceder acesso.
 * O state carrega o companyId para recuperar no callback.
 */
export function getAuthUrl(companyId) {
  const client = createOAuth2Client();
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    state: Buffer.from(companyId).toString('base64'),
  });
}

/**
 * Troca o código de autorização por tokens e salva no Firestore.
 */
export async function handleOAuthCallback(code, companyId) {
  const client = createOAuth2Client();
  const { tokens } = await client.getToken(code);

  if (!tokens.refresh_token) {
    throw new Error('Google não retornou refresh_token. Tente desconectar e reconectar.');
  }

  const encryptedToken = encrypt(tokens.refresh_token);

  const db = getDb();
  await db.collection('calendar_tokens').doc(companyId).set({
    companyId,
    provider: 'google',
    encryptedRefreshToken: encryptedToken,
    accessToken: tokens.access_token,
    expiryDate: tokens.expiry_date,
    calendarId: 'primary',
    connectedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  // Marca empresa como conectada
  await db.collection('companies').doc(companyId).update({
    'googleCalendar.connected': true,
    'googleCalendar.calendarId': 'primary',
    updatedAt: FieldValue.serverTimestamp(),
  });

  log.ok('GCal', `OAuth concluído para empresa ${companyId}`);
  return true;
}

/**
 * Carrega um cliente OAuth2 autenticado para uma empresa.
 * Renova o access_token automaticamente se expirado.
 */
async function getAuthenticatedClient(companyId) {
  const db = getDb();
  const tokenDoc = await db.collection('calendar_tokens').doc(companyId).get();

  if (!tokenDoc.exists) {
    throw new Error(`Google Calendar não conectado para empresa ${companyId}`);
  }

  const data = tokenDoc.data();
  const refreshToken = decrypt(data.encryptedRefreshToken);

  const client = createOAuth2Client();
  client.setCredentials({
    refresh_token: refreshToken,
    access_token: data.accessToken,
    expiry_date: data.expiryDate,
  });

  // Renova se o access_token estiver expirado (com 60s de margem)
  const now = Date.now();
  if (!data.expiryDate || data.expiryDate < now + 60_000) {
    const { credentials } = await client.refreshAccessToken();
    client.setCredentials(credentials);

    // Salva novos tokens
    await db.collection('calendar_tokens').doc(companyId).update({
      accessToken: credentials.access_token,
      expiryDate: credentials.expiry_date,
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  return client;
}

// ─────────────────────────────────────────────────────────────
// CRUD de Eventos
// ─────────────────────────────────────────────────────────────

/**
 * Cria um evento no Google Calendar para um agendamento.
 * Retorna o eventId do Google Calendar ou null se falhar.
 */
export async function createCalendarEvent(companyId, agendamento) {
  try {
    const client = await getAuthenticatedClient(companyId);
    const calendar = google.calendar({ version: 'v3', auth: client });

    const startDateTime = `${agendamento.date}T${agendamento.time}:00`;
    const endDateTime = addMinutes(startDateTime, agendamento.duration || 60);

    const event = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: `${agendamento.serviceName} — ${agendamento.clientName}`,
        description: [
          `Cliente: ${agendamento.clientName}`,
          `Telefone: ${agendamento.clientPhone}`,
          `Serviço: ${agendamento.serviceName}`,
          `Valor: R$ ${(agendamento.servicePrice || 0).toFixed(2).replace('.', ',')}`,
          agendamento.notes ? `Obs: ${agendamento.notes}` : '',
        ].filter(Boolean).join('\n'),
        start: { dateTime: startDateTime, timeZone: 'America/Sao_Paulo' },
        end: { dateTime: endDateTime, timeZone: 'America/Sao_Paulo' },
        reminders: {
          useDefault: false,
          overrides: [{ method: 'popup', minutes: 60 }],
        },
      },
    });

    const eventId = event.data.id;
    log.ok('GCal', `Evento criado: ${eventId}`);

    // Salva o eventId no documento de agendamento
    const db = getDb();
    await db.collection('agendamentos').doc(agendamento.id).update({
      googleCalendarEventId: eventId,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return eventId;
  } catch (err) {
    log.error('GCal', `Erro ao criar evento: ${err.message}`);
    return null;
  }
}

/**
 * Atualiza um evento existente no Google Calendar.
 */
export async function updateCalendarEvent(companyId, eventId, agendamento) {
  try {
    const client = await getAuthenticatedClient(companyId);
    const calendar = google.calendar({ version: 'v3', auth: client });

    const startDateTime = `${agendamento.date}T${agendamento.time}:00`;
    const endDateTime = addMinutes(startDateTime, agendamento.duration || 60);

    await calendar.events.patch({
      calendarId: 'primary',
      eventId,
      requestBody: {
        summary: `${agendamento.serviceName} — ${agendamento.clientName}`,
        start: { dateTime: startDateTime, timeZone: 'America/Sao_Paulo' },
        end: { dateTime: endDateTime, timeZone: 'America/Sao_Paulo' },
      },
    });

    log.ok('GCal', `Evento atualizado: ${eventId}`);
    return true;
  } catch (err) {
    log.error('GCal', `Erro ao atualizar evento: ${err.message}`);
    return false;
  }
}

/**
 * Cancela (deleta) um evento no Google Calendar.
 */
export async function deleteCalendarEvent(companyId, eventId) {
  try {
    const client = await getAuthenticatedClient(companyId);
    const calendar = google.calendar({ version: 'v3', auth: client });

    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });

    log.ok('GCal', `Evento deletado: ${eventId}`);
    return true;
  } catch (err) {
    log.error('GCal', `Erro ao deletar evento: ${err.message}`);
    return false;
  }
}

/**
 * Verifica se uma empresa tem o Google Calendar conectado.
 */
export async function isConnected(companyId) {
  const db = getDb();
  const doc = await db.collection('calendar_tokens').doc(companyId).get();
  return doc.exists;
}

// ─────────────────────────────────────────────────────────────
// Helpers de criptografia
// ─────────────────────────────────────────────────────────────

function encrypt(text) {
  const iv = randomBytes(16);
  const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32));
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const [ivHex, encHex] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32));
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encHex, 'hex')), decipher.final()]);
  return decrypted.toString('utf8');
}

// ─────────────────────────────────────────────────────────────
// Helpers de data/hora
// ─────────────────────────────────────────────────────────────

function addMinutes(dateTimeStr, minutes) {
  const d = new Date(dateTimeStr);
  d.setMinutes(d.getMinutes() + minutes);
  return d.toISOString().slice(0, 19);
}
