/**
 * Storefront Routes — features que rodam DENTRO da loja NuvemShop do cliente.
 *
 * GET  /storefront/ecoqui.js          — loader JS injetado na loja (vitrine + checkout)
 * GET  /storefront/config/:storeId    — config pública das features (sem dados sensíveis)
 * POST /storefront/roulette/claim     — sorteia prêmio, cria cupom real e captura o lead
 *
 * O mapeamento storeId → empresa/token sai da coleção `ecommerce_integrations`.
 * O accessToken NUNCA é exposto ao browser: o cupom é criado server-side.
 */

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getDb } from '../config/firebase.js';
import { log } from '../utils/logger.js';
import { createCoupon } from '../services/nuvemshop.js';
import { upsertLead } from '../services/firestore.js';

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

// As features rodam dentro da loja do cliente (domínio NuvemShop). Liberamos o
// carregamento cross-origin do script e o fetch da config/claim de qualquer loja.
// (sobrescreve o Cross-Origin-Resource-Policy: same-origin que o helmet aplica no app.js)
router.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

async function getIntegrationByStore(storeId) {
  const db = getDb();
  const snap = await db.collection('ecommerce_integrations')
    .where('storeId', '==', String(storeId))
    .where('active', '==', true)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

async function getStorefrontConfig(companyId) {
  const db = getDb();
  const doc = await db.collection('ecommerce_storefront').doc(companyId).get();
  return doc.exists ? doc.data() : null;
}

function randomCode(prefix = 'GIRA') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${s}`;
}

// Sorteia um prêmio respeitando os pesos (weight). Default weight = 1.
function pickPrize(prizes) {
  const list = (prizes || []).filter((p) => p && (p.type === 'shipping' || Number(p.value) > 0 || p.type === 'none'));
  if (!list.length) return null;
  const total = list.reduce((s, p) => s + (Number(p.weight) > 0 ? Number(p.weight) : 1), 0);
  let r = Math.random() * total;
  for (const p of list) {
    r -= (Number(p.weight) > 0 ? Number(p.weight) : 1);
    if (r <= 0) return p;
  }
  return list[list.length - 1];
}

// ─────────────────────────────────────────────────────────────
// GET /storefront/ecoqui.js  — loader injetado pela NuvemShop
// ─────────────────────────────────────────────────────────────
router.get('/ecoqui.js', (_req, res) => {
  res.type('application/javascript');
  res.set('Cache-Control', 'public, max-age=300'); // 5 min
  res.sendFile(join(__dirname, '../public/ecoqui.js'));
});

// ─────────────────────────────────────────────────────────────
// GET /storefront/config/:storeId  — config pública por loja
// ─────────────────────────────────────────────────────────────
router.get('/config/:storeId', async (req, res) => {
  // CORS liberado no app.js; resposta enxuta e sem segredos
  try {
    const integration = await getIntegrationByStore(req.params.storeId);
    if (!integration) return res.json({ roulette: { enabled: false }, videos: { enabled: false }, checkout: { enabled: false } });

    const cfg = await getStorefrontConfig(integration.companyId) || {};
    const roulette = cfg.roulette || { enabled: false };

    res.json({
      storeName: integration.storeName || '',
      roulette: {
        enabled: !!roulette.enabled,
        title:   roulette.title || 'Gire e ganhe um desconto!',
        theme:   roulette.theme || '#6366f1',
        capture: roulette.capture || ['email'],
        // Só os rótulos para desenhar a roda — sem pesos (não revela as chances)
        slices:  (roulette.prizes || []).map((p) => ({ label: p.label || '' })),
      },
      videos:    cfg.videos    || { enabled: false, items: [] },
      shoppable: cfg.shoppable || { enabled: false, items: [] },
      checkout:  cfg.checkout  || { enabled: false },
    });
  } catch (err) {
    log.error('Storefront', `GET config: ${err.message}`);
    res.status(500).json({ error: 'erro' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /storefront/roulette/claim
// body: { storeId, email, phone, name }
// ─────────────────────────────────────────────────────────────
router.post('/roulette/claim', async (req, res) => {
  const { storeId, email, phone, name } = req.body || {};
  if (!storeId || (!email && !phone)) {
    return res.status(400).json({ error: 'storeId e (email ou telefone) são obrigatórios' });
  }

  try {
    const integration = await getIntegrationByStore(storeId);
    if (!integration) return res.status(404).json({ error: 'Loja não encontrada' });

    const cfg = await getStorefrontConfig(integration.companyId) || {};
    const roulette = cfg.roulette || {};
    if (!roulette.enabled) return res.status(403).json({ error: 'Roleta indisponível' });

    const db = getDb();
    const contactKey = (email || phone).toString().trim().toLowerCase();
    const claimId = `${integration.companyId}_${contactKey}`;

    // Anti-abuso: 1 giro por contato a cada 30 dias
    const prev = await db.collection('ecommerce_roulette_claims').doc(claimId).get();
    if (prev.exists) {
      const last = prev.data().createdAt?.toMillis?.() || 0;
      if (Date.now() - last < 30 * 24 * 3600 * 1000) {
        return res.status(429).json({ error: 'Você já participou recentemente.' });
      }
    }

    const prize = pickPrize(roulette.prizes);
    if (!prize) return res.status(409).json({ error: 'Nenhum prêmio configurado' });

    // Prêmio "none" = não ganhou (slice de "tente de novo")
    if (prize.type === 'none') {
      await db.collection('ecommerce_roulette_claims').doc(claimId).set({
        companyId: integration.companyId, email: email || '', phone: phone || '',
        prizeLabel: prize.label || 'Não foi dessa vez', code: null, createdAt: new Date(),
      });
      return res.json({ won: false, prizeLabel: prize.label || 'Não foi dessa vez' });
    }

    // Monta o cupom
    const validityDays = Number(roulette.couponValidityDays) > 0 ? Number(roulette.couponValidityDays) : 7;
    const endDate = new Date(Date.now() + validityDays * 24 * 3600 * 1000);
    const code = randomCode();
    const coupon = {
      code,
      type:  prize.type, // 'percentage' | 'absolute' | 'shipping'
      value: prize.type === 'shipping' ? undefined : String(prize.value),
      max_uses: Number(roulette.maxUses) > 0 ? Number(roulette.maxUses) : 1,
      min_price: Number(roulette.minPrice) > 0 ? Number(roulette.minPrice) : undefined,
      start_date: new Date().toISOString().slice(0, 10),
      end_date:   endDate.toISOString().slice(0, 10),
      includes_shipping: prize.type === 'shipping',
    };

    const created = await createCoupon(integration.storeId, integration.accessToken, coupon);
    if (!created.ok) {
      return res.status(502).json({
        error: 'Falha ao gerar o cupom na loja',
        status: created.status,
        detail: (created.error || '').slice(0, 300),
      });
    }

    // Captura o lead (reusa o pipeline existente)
    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone) {
      upsertLead(integration.companyId, null, cleanPhone, {
        nome: name || 'Cliente', email: email || '',
        statusLead: 'lead', origem: 'roleta', cupomRoleta: code,
      }).catch((e) => log.warn('Storefront', `upsertLead: ${e.message}`));
    }

    await db.collection('ecommerce_roulette_claims').doc(claimId).set({
      companyId: integration.companyId,
      email: email || '', phone: phone || '', name: name || '',
      prizeLabel: prize.label || code, code, couponType: prize.type, couponValue: prize.value || '',
      createdAt: new Date(),
    });

    log.ok('Storefront', `Roleta: ${contactKey} ganhou ${code} (${prize.label || prize.type})`);
    res.json({ won: true, code, prizeLabel: prize.label || code, expiresAt: endDate.toISOString() });
  } catch (err) {
    log.error('Storefront', `roulette/claim: ${err.message}`);
    res.status(500).json({ error: 'erro' });
  }
});

export default router;
