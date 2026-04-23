/**
 * Deduplicação de mensagens por messageId.
 *
 * O Evolution API pode disparar o webhook mais de uma vez para a mesma mensagem.
 * Guardamos os IDs processados em memória por 1 hora para evitar duplicatas.
 */

const seen = new Set();
const TTL_MS = 60 * 60 * 1000; // 1 hora

/**
 * Verifica se o messageId já foi processado.
 * Se não foi, marca como visto e retorna false.
 * Se já foi, retorna true.
 */
export function isDuplicate(messageId) {
  if (!messageId) return false;
  if (seen.has(messageId)) return true;
  seen.add(messageId);
  // Remove após TTL para não crescer indefinidamente
  setTimeout(() => seen.delete(messageId), TTL_MS);
  return false;
}
