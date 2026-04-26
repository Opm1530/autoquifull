/**
 * Rate limiters por tipo de rota
 *
 * - webhookLimiter  : Evolution API → 120 req/min (mensagens + retries)
 * - publicLimiter   : catálogo público → 30 req/min por IP
 * - apiLimiter      : rotas autenticadas → 60 req/min por IP
 */

import rateLimit from 'express-rate-limit';

const handler = (req, res) => {
  res.status(429).json({ error: 'Muitas requisições. Tente novamente em breve.' });
};

/** POST /webhook/evolution/* — tolerante pois Evolution pode reenviar */
export const webhookLimiter = rateLimit({
  windowMs: 60_000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

/** /orders/create, /plans/pix-order — catálogo sem login */
export const publicLimiter = rateLimit({
  windowMs: 60_000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

/** Todas as outras rotas autenticadas */
export const apiLimiter = rateLimit({
  windowMs: 60_000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});
