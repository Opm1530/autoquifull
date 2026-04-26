/**
 * Middlewares de autenticação
 *
 * requireAuth     — exige Firebase ID Token válido no header Authorization
 * requireEvolution — exige a apikey da Evolution API no header apikey
 */

import { getAuth } from 'firebase-admin/auth';
import { log } from '../utils/logger.js';

// ─────────────────────────────────────────────────────────────
// Firebase token — usado nas rotas autenticadas (owner / admin)
// ─────────────────────────────────────────────────────────────

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) {
    log.warn('Auth', `${req.method} ${req.path} — token ausente`);
    return res.status(401).json({ error: 'Não autorizado — token ausente' });
  }

  const token = header.slice(7);

  try {
    const decoded = await getAuth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    log.warn('Auth', `${req.method} ${req.path} — token inválido: ${err.code || err.message}`);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

// ─────────────────────────────────────────────────────────────
// Evolution API key — valida que o webhook vem da nossa Evolution
// ─────────────────────────────────────────────────────────────

export function requireEvolutionKey(req, res, next) {
  const expectedKey = process.env.EVOLUTION_API_KEY;
  if (!expectedKey) return next(); // sem chave configurada → ignora validação

  const receivedKey = req.headers['apikey'] || req.headers['x-api-key'] || '';

  if (receivedKey !== expectedKey) {
    log.warn('Auth', `Webhook com apikey inválida de ${req.ip}`);
    return res.status(403).json({ error: 'Proibido' });
  }

  next();
}
