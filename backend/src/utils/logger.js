/**
 * Logger — saída estruturada e colorida para o terminal
 *
 * Formato:
 *   HH:MM:SS.mmm  LEVEL  [TAG]  mensagem
 *
 * Níveis:
 *   info  → operações normais (verde)
 *   warn  → algo inesperado mas não fatal (amarelo)
 *   error → erro — requer atenção (vermelho)
 *   debug → detalhe extra para desenvolvimento (cinza)
 *
 * Logs especiais (com ícone):
 *   recv  ← mensagem recebida (azul)
 *   send  → mensagem enviada (magenta)
 *   ai    🤖 chamada ao OpenAI (ciano)
 *   tool  🔧 execução de ferramenta (amarelo)
 *   ok    ✓ ação bem-sucedida (verde brilhante)
 *   time  ⏱ medição de tempo (depende da duração)
 */

const USE_COLOR = process.env.NO_COLOR !== '1' && process.stdout.isTTY !== false;

const C = USE_COLOR
  ? {
      reset:   '\x1b[0m',
      bright:  '\x1b[1m',
      dim:     '\x1b[2m',
      gray:    '\x1b[90m',
      red:     '\x1b[31m',
      green:   '\x1b[32m',
      yellow:  '\x1b[33m',
      blue:    '\x1b[34m',
      magenta: '\x1b[35m',
      cyan:    '\x1b[36m',
      white:   '\x1b[97m',
    }
  : Object.fromEntries(['reset','bright','dim','gray','red','green','yellow','blue','magenta','cyan','white'].map(k => [k, '']));

// ─────────────────────────────────────────────────────────────
// Helpers internos
// ─────────────────────────────────────────────────────────────

function ts() {
  const d = new Date();
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');
  return `${h}:${m}:${s}.${ms}`;
}

function print(levelStr, levelColor, icon, tag, msg, extra) {
  const time  = `${C.dim}${ts()}${C.reset}`;
  const level = `${levelColor}${levelStr}${C.reset}`;
  const t     = `${C.cyan}[${tag}]${C.reset}`;
  const ic    = icon ? `${icon} ` : '';
  const line  = `${time}  ${level}  ${t}  ${ic}${msg}`;

  if (extra !== undefined && extra !== null) {
    if (typeof extra === 'object') {
      try { console.log(line, JSON.stringify(extra).slice(0, 300)); } catch { console.log(line, extra); }
    } else {
      console.log(line, extra);
    }
  } else {
    console.log(line);
  }
}

// ─────────────────────────────────────────────────────────────
// API pública
// ─────────────────────────────────────────────────────────────

export const log = {
  /** Operação normal */
  info(tag, msg, extra) {
    print(`${C.bright}INFO ${C.reset}`, C.green, null, tag, msg, extra);
  },

  /** Alerta — algo inesperado mas não crítico */
  warn(tag, msg, extra) {
    print(`${C.bright}WARN ${C.reset}`, C.yellow, '⚠', tag, `${C.yellow}${msg}${C.reset}`, extra);
  },

  /** Erro que requer atenção */
  error(tag, msg, extra) {
    print(`${C.bright}ERROR${C.reset}`, C.red, '✗', tag, `${C.red}${msg}${C.reset}`, extra);
  },

  /** Detalhe extra — só aparece quando LOG_LEVEL=debug */
  debug(tag, msg, extra) {
    if (process.env.LOG_LEVEL !== 'debug') return;
    print(`${C.dim}DEBUG${C.reset}`, C.gray, null, tag, `${C.gray}${msg}${C.reset}`, extra);
  },

  /** Mensagem RECEBIDA via WhatsApp */
  recv(tag, msg, extra) {
    print(`${C.blue}${C.bright}← RECV${C.reset}`, C.blue, null, tag, msg, extra);
  },

  /** Mensagem ENVIADA via WhatsApp */
  send(tag, msg, extra) {
    print(`${C.magenta}${C.bright}→ SEND${C.reset}`, C.magenta, null, tag, msg, extra);
  },

  /** Chamada ao modelo OpenAI */
  ai(tag, msg, extra) {
    print(`${C.cyan}${C.bright}🤖 AI  ${C.reset}`, C.cyan, null, tag, msg, extra);
  },

  /** Execução de ferramenta (tool call) */
  tool(tag, msg, extra) {
    print(`${C.yellow}🔧 TOOL${C.reset}`, C.yellow, null, tag, msg, extra);
  },

  /** Ação concluída com sucesso */
  ok(tag, msg, extra) {
    print(`${C.green}${C.bright}✓ OK  ${C.reset}`, C.green, null, tag, msg, extra);
  },
};

// ─────────────────────────────────────────────────────────────
// Timer utilitário
// ─────────────────────────────────────────────────────────────

/**
 * Cria um timer.  Use:
 *
 *   const t = timer();
 *   // ... faz algo ...
 *   t.end('MeuModulo', 'Operação concluída');  // loga o tempo
 *   t.ms()  // retorna os ms decorridos (sem logar)
 */
export function timer() {
  const start = Date.now();

  return {
    ms() { return Date.now() - start; },

    end(tag, msg) {
      const elapsed = Date.now() - start;
      let color;
      if (elapsed > 8000)      color = C.red;
      else if (elapsed > 3000) color = C.yellow;
      else                     color = C.green;

      const timeStr = `${color}${elapsed}ms${C.reset}`;
      print(`${C.dim}⏱ TIME${C.reset}`, C.dim, null, tag, `${msg} ${timeStr}`, undefined);
    },
  };
}

/**
 * Retorna um trecho curto de texto para pré-visualização em logs.
 */
export function preview(text, len = 80) {
  if (!text) return '(vazio)';
  const str = typeof text === 'string' ? text : JSON.stringify(text);
  return str.length > len ? str.slice(0, len) + '…' : str;
}
