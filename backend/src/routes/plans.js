/**
 * Plans Routes
 *
 * POST /plans/payment-link   → Gera link de pagamento (impl. fee, assinatura, avulso)
 * POST /plans/webhook        → IPN do MercadoPago (assinaturas e pagamentos únicos)
 * GET  /plans/:companyId     → Status da assinatura de uma empresa
 * POST /plans/cancel         → Cancela assinatura
 */

import { Router } from 'express';
import {
  createSubscription,
  createCustomLink,
  cancelSubscription,
  getSubscriptionStatus,
  processWebhook,
  generateOrderPix,
  processVendaWebhook,
  getPlans,
} from '../services/mercadopago.js';
import { getDb } from '../config/firebase.js';

const router = Router();

// ── Gerar link de pagamento ──────────────────────────────────

/**
 * Gera um link de pagamento baseado no tipo:
 *   - implementation: taxa de implementação (pagamento único)
 *   - subscription: assinatura mensal recorrente
 *   - custom: valor personalizado
 */
router.post('/payment-link', async (req, res) => {
  const { companyId, type, planId, amount, description, payerEmail } = req.body;

  if (!companyId || !type) {
    return res.status(400).json({ error: 'companyId e type são obrigatórios' });
  }

  try {
    // Busca nome da empresa para usar no título do pagamento
    const db = getDb();
    const companyDoc = await db.collection('companies').doc(companyId).get();
    const companyName = companyDoc.exists ? companyDoc.data().name : companyId;

    let result;

    switch (type) {
      case 'subscription':
        if (!planId) return res.status(400).json({ error: 'planId obrigatório para subscription' });
        result = await createSubscription(companyId, planId, companyName, payerEmail);
        break;

      case 'custom':
        if (!amount || amount <= 0) return res.status(400).json({ error: 'amount válido obrigatório para custom' });
        result = await createCustomLink(companyId, amount, description);
        break;

      default:
        return res.status(400).json({ error: `Tipo inválido: ${type}. Use: subscription, custom` });
    }

    res.json({ ok: true, ...result });
  } catch (err) {
    console.error('[Plans] Erro ao gerar link:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Webhook MercadoPago (IPN) ────────────────────────────────

/**
 * Recebe notificações do MercadoPago para pagamentos e assinaturas.
 * Responde 200 imediatamente para evitar retentativas.
 */
router.post('/webhook', async (req, res) => {
  res.status(200).json({ received: true });

  try {
    await processWebhook(req.body);
  } catch (err) {
    console.error('[Plans Webhook] Erro:', err.message);
  }
});

// ── Status da assinatura ─────────────────────────────────────

router.get('/:companyId', async (req, res) => {
  const { companyId } = req.params;

  try {
    const db = getDb();
    const subDoc = await db.collection('subscriptions').doc(companyId).get();

    if (!subDoc.exists) {
      return res.json({ companyId, status: 'none', plan: null });
    }

    const sub = subDoc.data();

    // Consulta status atualizado no MercadoPago se houver subscription ID
    let mpStatus = null;
    if (sub.mpSubscriptionId) {
      try {
        const mpSub = await getSubscriptionStatus(sub.mpSubscriptionId);
        mpStatus = mpSub.status;
      } catch {}
    }

    res.json({
      companyId,
      planId: sub.planId,
      status: mpStatus || sub.status,
      implementationFeePaid: sub.implementationFeePaid || false,
      mpSubscriptionId: sub.mpSubscriptionId || null,
      currentPeriodEnd: sub.currentPeriodEnd || null,
    });
  } catch (err) {
    console.error('[Plans] Erro ao buscar status:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Cancelar assinatura ──────────────────────────────────────

router.post('/cancel', async (req, res) => {
  const { companyId } = req.body;
  if (!companyId) return res.status(400).json({ error: 'companyId obrigatório' });

  try {
    const db = getDb();
    const subDoc = await db.collection('subscriptions').doc(companyId).get();

    if (!subDoc.exists || !subDoc.data().mpSubscriptionId) {
      return res.status(404).json({ error: 'Assinatura não encontrada' });
    }

    await cancelSubscription(subDoc.data().mpSubscriptionId);
    res.json({ ok: true, message: 'Assinatura cancelada' });
  } catch (err) {
    console.error('[Plans] Erro ao cancelar:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Configuração pública dos planos ─────────────────────────

/**
 * GET /plans/config — retorna planos (público, usado pela landing page e admin).
 */
router.get('/config', async (req, res) => {
  try {
    const plans = await getPlans();
    res.json({ ok: true, plans });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /plans/config — salva configurações dos planos no Firestore (admin only).
 */
router.post('/config', async (req, res) => {
  const { plans } = req.body;
  if (!plans || typeof plans !== 'object') {
    return res.status(400).json({ error: 'Campo plans obrigatório' });
  }
  try {
    const db = getDb();
    await db.collection('settings').doc('plans').set(plans, { merge: true });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PIX para pedidos do catálogo (módulo venda) ──────────────

/**
 * Gera um QR code PIX via MercadoPago usando o token da empresa.
 * POST /plans/pix-order
 * Body: { orderId, companyId, storeId, items, total, clientName }
 */
router.post('/pix-order', async (req, res) => {
  const { orderId, companyId, items, total, clientName } = req.body;

  if (!orderId || !companyId || total == null) {
    return res.status(400).json({ error: 'orderId, companyId e total são obrigatórios' });
  }

  try {
    const pixData = await generateOrderPix({ companyId, orderId, items: items || [], total, clientName });

    // Salva o mpPaymentId no pedido e muda status para aguardando_pagamento
    const db = getDb();
    await db.collection('pedidos').doc(orderId).update({
      mpPaymentId: String(pixData.paymentId),
      status: 'aguardando_pagamento',
    });

    res.json({ ok: true, ...pixData });
  } catch (err) {
    console.error('[Plans] Erro ao gerar PIX de pedido:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Webhook do MercadoPago para pagamentos de pedidos do catálogo.
 * POST /plans/venda-webhook?companyId=xxx
 * O companyId é passado na notification_url ao criar o pagamento PIX.
 */
router.post('/venda-webhook', async (req, res) => {
  // Responde imediatamente para evitar retentativas do MP
  res.status(200).json({ received: true });

  const companyId = req.query.companyId;
  if (!companyId) {
    console.warn('[Venda Webhook] companyId ausente na query');
    return;
  }

  try {
    await processVendaWebhook(companyId, req.body);
  } catch (err) {
    console.error('[Venda Webhook] Erro:', err.message);
  }
});

export default router;
