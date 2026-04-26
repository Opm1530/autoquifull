/**
 * MercadoPago Connect — valida token e busca dados da conta
 *
 * POST /mp/connect
 * Body: { accessToken, companyId }
 *
 * 1. Chama MP /users/me com o token para validar e buscar userId
 * 2. Salva mercadoPagoToken + mercadoPagoUserId na empresa no Firestore
 * 3. Retorna os dados da conta
 */

import { Router } from 'express';
import { getDb } from '../config/firebase.js';
import { log } from '../utils/logger.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

const MP_BASE = 'https://api.mercadopago.com';

router.post('/connect', requireAuth, async (req, res) => {
  const { accessToken, companyId } = req.body;

  if (!accessToken || !companyId) {
    return res.status(400).json({ error: 'accessToken e companyId são obrigatórios' });
  }

  try {
    // 1. Valida token chamando /users/me na API do MercadoPago
    const mpRes = await fetch(`${MP_BASE}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!mpRes.ok) {
      const err = await mpRes.json().catch(() => ({}));
      const msg = err?.message || `Erro ${mpRes.status} ao validar token`;
      log.warn('MP-Connect', `Token inválido para empresa ${companyId}: ${msg}`);
      return res.status(400).json({ error: `Token inválido: ${msg}` });
    }

    const mpUser = await mpRes.json();

    const userId    = mpUser.id;
    const email     = mpUser.email || '';
    const firstName = mpUser.first_name || '';
    const lastName  = mpUser.last_name || '';
    const siteId    = mpUser.site_id || 'MLB'; // MLB = Brasil

    log.ok('MP-Connect', `Token válido → MP user ${userId} (${email}) para empresa ${companyId}`);

    // 2. Salva no Firestore
    const db = getDb();
    await db.collection('companies').doc(companyId).update({
      mercadoPagoToken:    accessToken,
      mercadoPagoUserId:   String(userId),
      mercadoPagoEmail:    email,
      mercadoPagoNome:     `${firstName} ${lastName}`.trim(),
      mercadoPagoSiteId:   siteId,
      mercadoPagoConectadoEm: new Date().toISOString(),
    });

    // 3. Retorna dados da conta
    res.json({
      ok: true,
      userId,
      email,
      nome: `${firstName} ${lastName}`.trim(),
      siteId,
    });

  } catch (err) {
    log.error('MP-Connect', `Erro ao conectar MercadoPago: ${err.message}`);
    res.status(500).json({ error: `Erro interno: ${err.message}` });
  }
});

export default router;
