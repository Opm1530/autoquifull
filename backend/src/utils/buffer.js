import { ENV } from '../config/env.js';
import { log } from './logger.js';

/**
 * Buffer de mensagens com debounce por telefone.
 *
 * Quando o cliente manda várias mensagens rapidamente (ex: "Oi", "Quero agendar"),
 * o buffer espera o tempo configurado (padrão: 13s) antes de processar.
 * Cada nova mensagem reinicia o timer e acumula o texto.
 *
 * Ao disparar, chama o callback com TODAS as mensagens concatenadas por \n.
 */

// Map<phone, { timer, messages[], isAudio }>
const buffers = new Map();

/**
 * Adiciona uma mensagem ao buffer do telefone e (re)inicia o debounce.
 *
 * @param {string} phone - Número normalizado
 * @param {string} text - Texto da mensagem
 * @param {boolean} isAudio - Se a mensagem é áudio transcrito
 * @param {Function} callback - fn(phone, combinedText, isAudio) chamada ao disparar
 */
export function bufferMessage(phone, text, isAudio, callback) {
  const debounceMs = ENV.MESSAGE_DEBOUNCE_MS;

  // Limpa timer anterior se existir
  if (buffers.has(phone)) {
    const prev = buffers.get(phone);
    clearTimeout(prev.timer);
    prev.messages.push(text);
    prev.isAudio = prev.isAudio || isAudio;

    log.debug('Buffer', `${phone} acumulou ${prev.messages.length} msgs — reiniciando debounce de ${debounceMs}ms`);

    const t = setTimeout(() => {
      const data = buffers.get(phone);
      if (!data) return;
      buffers.delete(phone);
      const combined = data.messages.join('\n');
      log.info('Buffer', `${phone} disparou — ${data.messages.length} msg(s) combinadas (${combined.length} chars)`);
      callback(phone, combined, data.isAudio);
    }, debounceMs);

    prev.timer = t;
  } else {
    // Primeira mensagem deste telefone
    log.debug('Buffer', `${phone} entrou no buffer — debounce de ${debounceMs}ms`);

    const t = setTimeout(() => {
      const data = buffers.get(phone);
      if (!data) return;
      buffers.delete(phone);
      const combined = data.messages.join('\n');
      log.info('Buffer', `${phone} disparou — 1 msg (${combined.length} chars)`);
      callback(phone, combined, data.isAudio);
    }, debounceMs);

    buffers.set(phone, { timer: t, messages: [text], isAudio });
  }
}

/**
 * Cancela o buffer de um telefone (ex: quando human_mode é ativado)
 */
export function clearBuffer(phone) {
  if (buffers.has(phone)) {
    const data = buffers.get(phone);
    clearTimeout(data.timer);
    buffers.delete(phone);
    log.info('Buffer', `Buffer de ${phone} cancelado (${data.messages.length} msg(s) descartadas)`);
  }
}

/**
 * Retorna se há mensagem pendente no buffer para este telefone.
 * Usado para evitar enviar resposta que já ficou obsoleta.
 */
export function hasPendingBuffer(phone) {
  return buffers.has(phone);
}

/**
 * Retorna quantas mensagens estão pendentes no buffer (debug)
 */
export function getBufferSize() {
  return buffers.size;
}
