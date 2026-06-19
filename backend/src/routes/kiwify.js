/**
 * Kiwify Routes — assinatura recorrente
 *
 * O pagamento acontece fora do app (checkout da Kiwify). Aqui apenas:
 *   - recebemos o webhook da Kiwify e atualizamos o status da assinatura da empresa;
 *   - expomos o status para o frontend liberar/bloquear o acesso.
 *
 * GET  /kiwify/config                 — link de checkout + flag de enforcement (público)
 * GET  /kiwify/status/:companyId      — status atual da assinatura da empresa
 * POST /kiwify/webhook                — eventos da Kiwify (protegido por token)
 *
 * ⚠️ Scaffolding: preencha KIWIFY_WEBHOOK_TOKEN / KIWIFY_CHECKOUT_URL no .env quando a
 * Kiwify estiver pronta. Enquanto KIWIFY_WEBHOOK_TOKEN estiver vazio, o webhook não valida
 * o token (apenas loga um aviso) para facilitar os testes iniciais.
 */

import { Router } from 'express';
import { getDb } from '../config/firebase.js';
import { ENV } from '../config/env.js';
import { log } from '../utils/logger.js';

const router = Router();

// ─────────────────────────────────────────────────────────────
// Mapeamento de evento/status da Kiwify → status interno
// status interno: 'active' | 'past_due' | 'canceled' | 'none'
// ─────────────────────────────────────────────────────────────
function mapKiwifyStatus(eventType, payload) {
  const ev = String(eventType || '').toLowerCase();
  const subStatus = String(
    payload?.subscription?.status ||
    payload?.Subscription?.status ||
    payload?.order_status ||
    ''
  ).toLowerCase();

  // Cancelamento / reembolso / chargeback → bloqueia
  if (/cancel|refund|chargeback|charged_back/.test(ev) || /cancel|refund/.test(subStatus)) {
    return 'canceled';
  }
  // Atraso / pagamento pendente → past_due
  if (/late|overdue|pending|waiting/.test(ev) || /late|overdue|pending|trialing/.test(subStatus)) {
    return 'past_due';
  }
  // Aprovado / pago / renovado → ativa
  if (/paid|approved|renew|active|completed/.test(ev) || /paid|approved|active|completed/.test(subStatus)) {
    return 'active';
  }
  return 'none';
}

// Extrai o e-mail do comprador de vários formatos possíveis de payload.
function extractEmail(payload) {
  return (
    payload?.customer?.email ||
    payload?.Customer?.email ||
    payload?.buyer?.email ||
    payload?.Customer?.Email ||
    payload?.email ||
    ''
  ).toString().trim().toLowerCase();
}

function extractEventId(payload) {
  return String(
    payload?.order_id ||
    payload?.Order?.order_id ||
    payload?.id ||
    payload?.subscription?.id ||
    `${Date.now()}`
  );
}

// Acha a empresa a partir do e-mail do owner cadastrado.
async function findCompanyIdByEmail(email) {
  if (!email) return null;
  const db = getDb();
  const snap = await db.collection('users')
    .where('email', '==', email)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return snap.docs[0].data().companyId || null;
}

// ─────────────────────────────────────────────────────────────
// GET /kiwify/config — usado pelo frontend (link de checkout + enforcement)
// ─────────────────────────────────────────────────────────────
router.get('/config', (_req, res) => {
  res.json({
    checkoutUrl: ENV.KIWIFY_CHECKOUT_URL || '',
    enforce: ENV.KIWIFY_ENFORCE,
    configured: !!ENV.KIWIFY_WEBHOOK_TOKEN,
  });
});

// ─────────────────────────────────────────────────────────────
// GET /kiwify/status/:companyId
// ─────────────────────────────────────────────────────────────
router.get('/status/:companyId', async (req, res) => {
  try {
    const db = getDb();
    const doc = await db.collection('companies').doc(req.params.companyId).get();
    if (!doc.exists) return res.json({ status: 'none' });
    const c = doc.data();
    res.json({
      status:      c.assinaturaStatus || 'none',
      plano:       c.assinaturaPlano || null,
      provedor:    c.assinaturaProvedor || null,
      atualizadaEm: c.assinaturaAtualizadaEm || null,
      checkoutUrl: ENV.KIWIFY_CHECKOUT_URL || '',
      enforce:     ENV.KIWIFY_ENFORCE,
    });
  } catch (err) {
    log.error('Kiwify', `GET status: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /kiwify/webhook
// ─────────────────────────────────────────────────────────────
router.post('/webhook', async (req, res) => {
  // Responde rápido — a Kiwify reenvia em caso de timeout
  res.status(200).json({ received: true });

  try {
    // Validação do token (quando configurado)
    if (ENV.KIWIFY_WEBHOOK_TOKEN) {
      const token = req.query.token || req.headers['x-kiwify-token'] || req.body?.token;
      if (token !== ENV.KIWIFY_WEBHOOK_TOKEN) {
        log.warn('Kiwify', 'Webhook rejeitado: token inválido');
        return;
      }
    } else {
      log.warn('Kiwify', 'KIWIFY_WEBHOOK_TOKEN não configurado — webhook aceito sem validação (scaffolding)');
    }

    const payload   = req.body || {};
    const eventType = payload.webhook_event_type || payload.event || payload.order_status || '';
    const email     = extractEmail(payload);
    const eventId   = extractEventId(payload);
    const newStatus = mapKiwifyStatus(eventType, payload);

    log.info('Kiwify', `Webhook "${eventType}" | email: ${email || '—'} | status → ${newStatus}`);

    const companyId = await findCompanyIdByEmail(email);
    if (!companyId) {
      log.warn('Kiwify', `Nenhuma empresa encontrada para o e-mail "${email}"`);
      return;
    }

    const db = getDb();

    // Idempotência: ignora reprocessamento do mesmo evento
    const eventRef = db.collection('kiwify_events').doc(eventId);
    const seen = await eventRef.get();
    if (seen.exists) {
      log.debug('Kiwify', `Evento ${eventId} já processado`);
      return;
    }

    await db.collection('companies').doc(companyId).set({
      assinaturaStatus:     newStatus,
      assinaturaPlano:      payload.product_name || payload.Product?.product_name || payload.plan || null,
      assinaturaProvedor:   'kiwify',
      assinaturaKiwifyId:   eventId,
      assinaturaAtualizadaEm: new Date().toISOString(),
    }, { merge: true });

    await eventRef.set({
      companyId, email, eventType, status: newStatus,
      processedAt: new Date(),
    });

    log.ok('Kiwify', `Empresa ${companyId} → assinatura "${newStatus}"`);
  } catch (err) {
    log.error('Kiwify', `Webhook erro: ${err.message}`);
  }
});

export default router;
