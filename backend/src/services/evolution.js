/**
 * Evolution API Service
 *
 * Wrapper para a Evolution API v2.
 * Roda no servidor — usa a API Key diretamente (nunca exposta ao frontend).
 */

import { ENV } from '../config/env.js';
import { log } from '../utils/logger.js';

const BASE_URL = ENV.EVOLUTION_API_URL;
const API_KEY = ENV.EVOLUTION_API_KEY;

function headers() {
  return {
    'Content-Type': 'application/json',
    apikey: API_KEY,
  };
}

async function request(method, path, body) {
  const url = `${BASE_URL}${path}`;
  const opts = {
    method,
    headers: headers(),
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    log.error('Evolution', `${method} ${path} → HTTP ${res.status}: ${text.slice(0, 200)}`);
    return null;
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Versão detalhada do request — retorna { data, error } em vez de null.
 * Usada onde precisamos capturar o motivo exato da falha (ex: campanhas).
 */
async function requestDetailed(method, path, body) {
  const url = `${BASE_URL}${path}`;
  const opts = { method, headers: headers() };
  if (body) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(url, opts);
    const raw = await res.text().catch(() => '');

    if (!res.ok) {
      // Tenta extrair mensagem legível do JSON de erro da Evolution API
      let errorMsg = `HTTP ${res.status}`;
      try {
        const json = JSON.parse(raw);
        errorMsg = json?.message || json?.error || json?.response?.message || errorMsg;
        if (Array.isArray(errorMsg)) errorMsg = errorMsg.join(', ');
      } catch { errorMsg = `HTTP ${res.status}: ${raw.slice(0, 120)}`; }
      return { data: null, error: errorMsg };
    }

    try { return { data: JSON.parse(raw), error: null }; }
    catch { return { data: null, error: 'Resposta inválida da API' }; }
  } catch (err) {
    return { data: null, error: `Falha de rede: ${err.message}` };
  }
}

// ─────────────────────────────────────────────────────────────
// Mensagens recebidas — parse do webhook MESSAGES_UPSERT
// ─────────────────────────────────────────────────────────────

/**
 * Extrai dados relevantes do payload do webhook da Evolution API.
 * Retorna null se a mensagem deve ser ignorada (grupo, fromMe, sem texto).
 */
export function parseIncomingMessage(body) {
  try {
    const data = body?.data || body;

    // Ignora eventos que não são de mensagem nova
    if (body?.event !== 'messages.upsert' && body?.event !== 'MESSAGES_UPSERT') {
      return null;
    }

    const msg = Array.isArray(data) ? data[0] : data;
    if (!msg) return null;

    const key = msg.key || {};
    const remoteJid = key.remoteJid || '';
    const fromMe = key.fromMe || false;
    const messageId = key.id || '';
    // Prioridade: URL param (instanceName) > body.instance > instanceId (UUID interno da Evolution)
    const instanceName = body?.instanceName || body?.instance || msg.instanceId || '';

    // Ignora mensagens enviadas pelo próprio bot
    if (fromMe) return null;

    // Ignora grupos e broadcasts
    if (remoteJid.includes('@g.us') || remoteJid.includes('@broadcast')) return null;

    const msgContent = msg.message || {};

    // Detecta áudio
    const isAudio =
      !!msgContent.audioMessage ||
      !!msgContent.pttMessage ||
      msg.messageType === 'audioMessage' ||
      msg.messageType === 'pttMessage';

    // Extrai texto
    let text =
      msgContent.conversation ||
      msgContent.extendedTextMessage?.text ||
      msgContent.imageMessage?.caption ||
      msgContent.videoMessage?.caption ||
      '';

    // Para áudio, o texto será preenchido após transcrição
    if (isAudio) text = '[AUDIO]';

    if (!text && !isAudio) return null;

    return {
      instanceName,
      remoteJid,
      phone: remoteJid.replace(/@.*$/, '').replace(/\D/g, ''),
      messageId,
      text,
      isAudio,
      rawMessage: msg,
    };
  } catch (err) {
    console.error('[Evolution] Erro ao parsear mensagem:', err.message);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Envio de mensagens
// ─────────────────────────────────────────────────────────────

/**
 * Envia uma mensagem de texto simples.
 */
export async function sendText(instanceName, phone, text) {
  const cleanPhone = phone.replace(/\D/g, '');
  const number = cleanPhone.length <= 11 && !cleanPhone.startsWith('55')
    ? '55' + cleanPhone
    : cleanPhone;

  const result = await request('POST', `/message/sendText/${instanceName}`, {
    number,
    text,
    delay: 1200,
    linkPreview: false,
  });

  if (result) {
    log.send('Evolution', `${phone} via [${instanceName}] — enviado (${text.length} chars)`);
  } else {
    log.warn('Evolution', `${phone} via [${instanceName}] — falha ao enviar mensagem`);
  }

  return !!result;
}

/**
 * Versão detalhada do sendText — retorna { ok, error } com o motivo exato da falha.
 * Usada no job de campanhas para popular o relatório de erros.
 */
export async function sendTextDetailed(instanceName, phone, text) {
  const cleanPhone = phone.replace(/\D/g, '');
  const number = cleanPhone.length <= 11 && !cleanPhone.startsWith('55')
    ? '55' + cleanPhone
    : cleanPhone;

  const { data, error } = await requestDetailed('POST', `/message/sendText/${instanceName}`, {
    number,
    text,
    delay: 1200,
    linkPreview: false,
  });

  if (data) {
    log.send('Evolution', `${phone} via [${instanceName}] — enviado (${text.length} chars)`);
    return { ok: true, error: null };
  } else {
    log.warn('Evolution', `${phone} via [${instanceName}] — falha: ${error}`);
    return { ok: false, error };
  }
}

/**
 * Envia um array de mensagens com delay de 1.2s entre elas.
 * Ideal para respostas em múltiplas "bolhas" como um humano faria.
 */
export async function sendMessages(instanceName, phone, messages) {
  for (let i = 0; i < messages.length; i++) {
    const text = messages[i];
    if (!text?.trim()) continue;

    await sendText(instanceName, phone, text);

    // Aguarda entre mensagens (exceto após a última)
    if (i < messages.length - 1) {
      await sleep(1200);
    }
  }
}

/**
 * Envia indicador de digitação (typing) para simular presença humana.
 */
export async function sendPresence(instanceName, phone) {
  const cleanPhone = phone.replace(/\D/g, '');
  const number = cleanPhone.length <= 11 && !cleanPhone.startsWith('55')
    ? '55' + cleanPhone
    : cleanPhone;

  await request('POST', `/chat/sendPresence/${instanceName}`, {
    number,
    presence: 'composing',
    delay: 3000,
  }).catch(() => {}); // Ignora erros de presence — não é crítico
}

// ─────────────────────────────────────────────────────────────
// Confirmação de leitura
// ─────────────────────────────────────────────────────────────

/**
 * Marca uma mensagem como lida (check azul).
 */
export async function markAsRead(instanceName, remoteJid, messageId) {
  await request('POST', `/chat/markMessageAsRead/${instanceName}`, {
    readMessages: [{ remoteJid, fromMe: false, id: messageId }],
  });
}

// ─────────────────────────────────────────────────────────────
// Download de mídia (para transcrição de áudio)
// ─────────────────────────────────────────────────────────────

/**
 * Baixa uma mensagem de áudio como base64.
 * Retorna { base64, mimetype } ou null.
 */
export async function downloadMedia(instanceName, message) {
  const result = await request(
    'POST',
    `/chat/getBase64FromMediaMessage/${instanceName}`,
    { message, convertToMp4: false }
  );

  if (!result?.base64) return null;
  return { base64: result.base64, mimetype: result.mimetype || 'audio/ogg' };
}

// ─────────────────────────────────────────────────────────────
// Status da instância
// ─────────────────────────────────────────────────────────────

export async function getConnectionState(instanceName) {
  const result = await request('GET', `/instance/connectionState/${instanceName}`);
  const state = result?.state || result?.instance?.state || 'close';
  return { state, connected: state === 'open' };
}

// ─────────────────────────────────────────────────────────────
// Util
// ─────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
