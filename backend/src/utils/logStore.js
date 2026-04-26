/**
 * logStore — buffer circular de linhas de log em memória
 *
 * Intercepta console.log / console.error e armazena as últimas
 * MAX_LINES linhas para servir via GET /admin/logs.
 */

const MAX_LINES = 500;
const lines = [];

function capture(level, args) {
  const text = args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ');
  // Remove ANSI escape codes para JSON limpo
  const clean = text.replace(/\x1b\[[0-9;]*m/g, '');
  lines.push({ ts: new Date().toISOString(), level, text: clean });
  if (lines.length > MAX_LINES) lines.shift();
}

const _log   = console.log.bind(console);
const _error = console.error.bind(console);
const _warn  = console.warn.bind(console);

console.log   = (...args) => { _log(...args);   capture('info',  args); };
console.error = (...args) => { _error(...args); capture('error', args); };
console.warn  = (...args) => { _warn(...args);  capture('warn',  args); };

/** Retorna as últimas `n` linhas */
export function getRecentLogs(n = 200) {
  return lines.slice(-n);
}
