/**
 * Fila de processamento por telefone.
 *
 * Garante que nunca processamos duas mensagens do mesmo cliente simultaneamente.
 * Cada telefone tem sua própria Promise chain — o próximo processamento
 * só começa após o atual terminar.
 *
 * Sem fila: se o cliente manda msg A e B rapidamente, o OpenAI pode processar
 * ambas em paralelo e gerar respostas inconsistentes.
 */

import { log, timer } from './logger.js';

// Map<phone, Promise>
const queues = new Map();

/**
 * Enfileira uma tarefa assíncrona para um telefone específico.
 * Retorna uma Promise que resolve quando a tarefa for executada.
 *
 * @param {string} phone
 * @param {Function} task - async () => any
 */
export function enqueue(phone, task) {
  const alreadyQueued = queues.has(phone);
  const current = queues.get(phone) ?? Promise.resolve();

  if (alreadyQueued) {
    log.warn('Queue', `${phone} — já há processamento em andamento, aguardando na fila`);
  }

  const next = current.then(async () => {
    const t = timer();
    log.info('Queue', `${phone} → iniciando processamento`);
    try {
      const result = await task();
      t.end('Queue', `${phone} → concluído`);
      return result;
    } catch (err) {
      log.error('Queue', `${phone} → erro na tarefa: ${err.message}`);
    }
  });

  queues.set(phone, next);

  // Limpeza automática quando a fila deste telefone estiver vazia
  next.finally(() => {
    if (queues.get(phone) === next) {
      queues.delete(phone);
    }
  });

  return next;
}

/**
 * Verifica se há processamento em andamento para um telefone (debug)
 */
export function isProcessing(phone) {
  return queues.has(phone);
}

/**
 * Tamanho total da fila (debug)
 */
export function getQueueSize() {
  return queues.size;
}
