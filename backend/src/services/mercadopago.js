/**
 * MercadoPago Service
 *
 * Gerencia dois fluxos distintos:
 * 1. Pagamentos únicos (taxa de implementação, cobranças avulsas) → Preference API
 * 2. Assinaturas recorrentes (mensalidade SaaS) → Preapproval API
 *
 * Usa as credenciais da plataforma (do admin do Autoqui3), não as dos clientes.
 * As credenciais dos clientes são usadas apenas para cobranças do catálogo (módulo venda).
 */

import { log, timer } from '../utils/logger.js';
import { getDb } from '../config/firebase.js';

const MP_BASE = 'https://api.mercadopago.com';

function platformHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
  };
}

async function mpRequest(method, path, body) {
  const url = `${MP_BASE}${path}`;
  const opts = { method, headers: platformHeaders() };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(`MercadoPago ${method} ${path} → ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return data;
}

// ─────────────────────────────────────────────────────────────
// Definição de planos — fallback hardcoded, sobrescrito pelo Firestore
// ─────────────────────────────────────────────────────────────

export const DEFAULT_PLANS = {
  starter:  { id: 'starter',  name: 'Starter',  price: 197 },
  pro:      { id: 'pro',      name: 'Pro',       price: 397 },
  business: { id: 'business', name: 'Business',  price: 697 },
};

/**
 * Carrega planos do Firestore (settings/plans) com fallback para DEFAULT_PLANS.
 */
export async function getPlans() {
  try {
    const db = getDb();
    const doc = await db.collection('settings').doc('plans').get();
    if (doc.exists) {
      const data = doc.data();
      // Mescla com defaults para garantir campos obrigatórios
      const merged = {};
      for (const key of Object.keys(DEFAULT_PLANS)) {
        merged[key] = { ...DEFAULT_PLANS[key], ...(data[key] || {}) };
      }
      return merged;
    }
  } catch { /* fallback abaixo */ }
  return { ...DEFAULT_PLANS };
}

// ─────────────────────────────────────────────────────────────
// Assinatura Recorrente
// ─────────────────────────────────────────────────────────────

/**
 * Cria uma assinatura mensal recorrente via Preapproval.
 * Retorna { subscriptionId, checkoutUrl }.
 */
export async function createSubscription(companyId, planId, companyName, payerEmail) {
  const plans = await getPlans();
  const plan = plans[planId];
  if (!plan) throw new Error(`Plano inválido: ${planId}`);

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  const subscription = await mpRequest('POST', '/preapproval', {
    reason: `Autoqui — Plano ${plan.name} (${companyName})`,
    payer_email: payerEmail || `empresa_${companyId}@autoqui.com`,
    external_reference: JSON.stringify({ type: 'subscription', companyId, planId }),
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      transaction_amount: plan.price,
      currency_id: 'BRL',
    },
    notification_url: `${backendUrl}/plans/webhook`,
    back_url: `${frontendUrl}/admin/plans?subscription=created`,
  });

  return {
    subscriptionId: subscription.id,
    checkoutUrl: subscription.init_point,
    status: subscription.status,
  };
}

/**
 * Cancela uma assinatura no MercadoPago.
 */
export async function cancelSubscription(subscriptionId) {
  return mpRequest('PUT', `/preapproval/${subscriptionId}`, { status: 'cancelled' });
}

/**
 * Consulta o status de uma assinatura.
 */
export async function getSubscriptionStatus(subscriptionId) {
  return mpRequest('GET', `/preapproval/${subscriptionId}`);
}

// ─────────────────────────────────────────────────────────────
// Link personalizado (valor avulso)
// ─────────────────────────────────────────────────────────────

export async function createCustomLink(companyId, amount, description) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  const preference = await mpRequest('POST', '/checkout/preferences', {
    items: [
      {
        id: `custom_${companyId}_${Date.now()}`,
        title: description || 'Cobrança Autoqui',
        quantity: 1,
        currency_id: 'BRL',
        unit_price: parseFloat(amount),
      },
    ],
    payment_methods: {
      excluded_payment_types: [], // Permite todos: cartão, PIX, boleto
    },
    external_reference: JSON.stringify({ type: 'custom', companyId }),
    notification_url: `${backendUrl}/plans/webhook`,
    back_urls: {
      success: `${frontendUrl}/admin/plans?payment=success`,
      failure: `${frontendUrl}/admin/plans?payment=failure`,
      pending: `${frontendUrl}/admin/plans?payment=pending`,
    },
    auto_return: 'approved',
  });

  return {
    preferenceId: preference.id,
    checkoutUrl: preference.init_point,
  };
}

// ─────────────────────────────────────────────────────────────
// Webhook handler (processa IPN do MercadoPago)
// ─────────────────────────────────────────────────────────────

/**
 * Processa uma notificação do MercadoPago (IPN / Webhook).
 * Retorna { handled: true } ou { handled: false }.
 */
export async function processWebhook(body) {
  const { type, action, data } = body;

  log.info('MP', `Webhook recebido — type: ${type || '?'} action: ${action || '?'} data: ${JSON.stringify(data).slice(0, 120)}`);

  // Pagamento único (taxa de implementação ou avulso)
  if (type === 'payment' || action === 'payment.updated') {
    const paymentId = data?.id;
    if (!paymentId) return { handled: false };

    const payment = await mpRequest('GET', `/v1/payments/${paymentId}`);
    const externalRef = safeParseJSON(payment.external_reference);

    if (!externalRef?.companyId) return { handled: false };

    const { companyId, planId, type: payType } = externalRef;

    if (payment.status === 'approved') {
      await handlePaymentApproved(companyId, planId, payType, payment);
    }

    return { handled: true };
  }

  // Assinatura recorrente
  if (type === 'subscription_preapproval' || action?.startsWith('subscription_preapproval')) {
    const subscriptionId = data?.id;
    if (!subscriptionId) return { handled: false };

    const subscription = await mpRequest('GET', `/preapproval/${subscriptionId}`);
    const externalRef = safeParseJSON(subscription.external_reference);

    if (!externalRef?.companyId) return { handled: false };

    await handleSubscriptionUpdate(externalRef.companyId, subscription);
    return { handled: true };
  }

  return { handled: false };
}

async function handlePaymentApproved(companyId, planId, payType, payment) {
  const { getDb } = await import('../config/firebase.js');
  const { FieldValue } = await import('firebase-admin/firestore');
  const db = getDb();

  if (payType === 'implementation') {
    // Marca implementação como paga e ativa o plano
    await db.collection('subscriptions').doc(companyId).set({
      companyId,
      planId: planId || 'starter',
      status: 'active',
      implementationFeePaid: true,
      implementationMpPaymentId: payment.id,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    // Ativa os módulos do plano
    const plan = PLANS[planId];
    if (plan) {
      const { PLAN_MODULES } = await import('./plans-config.js');
      const modules = PLAN_MODULES[planId] || [];
      await db.collection('companies').doc(companyId).update({
        modulos_ativos: modules,
        status: 'active',
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    // Registra evento de cobrança
    await db.collection('billing_events').add({
      companyId,
      type: 'implementation_fee',
      planId: planId || 'unknown',
      amount: payment.transaction_amount,
      currency: 'BRL',
      mpPaymentId: String(payment.id),
      status: 'approved',
      createdAt: FieldValue.serverTimestamp(),
    });

    log.ok('MP', `Taxa de implementação paga: empresa ${companyId}, plano ${planId}`);
  }
}

async function handleSubscriptionUpdate(companyId, subscription) {
  const { getDb } = await import('../config/firebase.js');
  const { FieldValue } = await import('firebase-admin/firestore');
  const db = getDb();

  const statusMap = {
    authorized: 'active',
    paused: 'paused',
    cancelled: 'cancelled',
    pending: 'pending',
  };

  const newStatus = statusMap[subscription.status] || subscription.status;
  const externalRef = safeParseJSON(subscription.external_reference);
  const planId = externalRef?.planId || 'starter';

  await db.collection('subscriptions').doc(companyId).set({
    companyId,
    planId,
    status: newStatus,
    mpSubscriptionId: subscription.id,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });

  // Se cancelado/pausado: desativa módulos
  if (newStatus === 'cancelled' || newStatus === 'paused') {
    await db.collection('companies').doc(companyId).update({
      modulos_ativos: [],
      updatedAt: FieldValue.serverTimestamp(),
    });
    log.ok('MP', `Assinatura ${newStatus}: módulos desativados para empresa ${companyId}`);
  }

  // Se reativada: restaura módulos do plano
  if (newStatus === 'active') {
    const { PLAN_MODULES } = await import('./plans-config.js');
    const modules = PLAN_MODULES[planId] || [];
    await db.collection('companies').doc(companyId).update({
      modulos_ativos: modules,
      updatedAt: FieldValue.serverTimestamp(),
    });
    log.ok('MP', `Assinatura reativada: módulos restaurados para empresa ${companyId}`);
  }
}

// ─────────────────────────────────────────────────────────────
// PIX para pedidos do catálogo (módulo venda)
// Usa o token MP da empresa (não da plataforma)
// ─────────────────────────────────────────────────────────────

/**
 * Gera um pagamento PIX para um pedido do catálogo usando o token MP da empresa.
 * Retorna { paymentId, qrCodeBase64, qrCodeText, status }.
 */
export async function generateOrderPix({ companyId, orderId, items = [], total, clientName }) {
  const { getDb } = await import('../config/firebase.js');
  const db = getDb();

  const companyDoc = await db.collection('companies').doc(companyId).get();
  const accessToken = companyDoc.data()?.mercadoPagoToken;
  if (!accessToken) throw new Error('Token MercadoPago não configurado para esta empresa');

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  const description = items.map((i) => `${i.qty || 1}x ${i.name}`).join(', ').slice(0, 250) || 'Pedido Autoqui';

  const res = await fetch(`${MP_BASE}/v1/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      transaction_amount: parseFloat(total),
      description,
      payment_method_id: 'pix',
      payer: {
        email: `pedido_${orderId.slice(-8)}@autoqui.app`,
        first_name: clientName || 'Cliente',
      },
      external_reference: JSON.stringify({ type: 'venda', orderId, companyId }),
      notification_url: `${backendUrl}/plans/venda-webhook?companyId=${companyId}`,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`MP PIX ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
  }

  const qrData = data.point_of_interaction?.transaction_data || {};
  log.ok('MP', `PIX gerado para pedido ${orderId}: paymentId=${data.id} status=${data.status}`);

  return {
    paymentId: data.id,
    qrCodeBase64: qrData.qr_code_base64 || null,
    qrCodeText: qrData.qr_code || null,
    status: data.status,
  };
}

/**
 * Processa webhook de pagamento de pedido do catálogo (token da empresa).
 * Chamado por POST /plans/venda-webhook?companyId=xxx
 */
export async function processVendaWebhook(companyId, body) {
  const { type, action, data } = body;

  if (type !== 'payment' && action !== 'payment.updated') return { handled: false };

  const paymentId = data?.id;
  if (!paymentId) return { handled: false };

  const { getDb } = await import('../config/firebase.js');
  const { FieldValue } = await import('firebase-admin/firestore');
  const db = getDb();

  // Busca token da empresa
  const companyDoc = await db.collection('companies').doc(companyId).get();
  const accessToken = companyDoc.data()?.mercadoPagoToken;
  if (!accessToken) {
    log.warn('MP', `Venda webhook — token não encontrado para empresa ${companyId}`);
    return { handled: false };
  }

  // Busca detalhes do pagamento com o token da empresa
  const res = await fetch(`${MP_BASE}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const payment = await res.json().catch(() => ({}));

  log.info('MP', `Venda webhook — pagamento ${paymentId} status: ${payment.status}`);

  if (payment.status !== 'approved') return { handled: true };

  const externalRef = safeParseJSON(payment.external_reference);
  const orderId = externalRef?.orderId;
  if (!orderId) {
    log.warn('MP', `Venda webhook — external_reference sem orderId (paymentId: ${paymentId})`);
    return { handled: false };
  }

  await db.collection('pedidos').doc(orderId).update({
    status: 'em_preparo',
    mpPaymentId: String(paymentId),
    paidAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  log.ok('MP', `Pagamento venda aprovado → pedido ${orderId} → em_preparo`);

  // Notifica dono e cliente após confirmação do pagamento
  try {
    const orderDoc = await db.collection('pedidos').doc(orderId).get();
    if (orderDoc.exists) {
      const order = { id: orderId, ...orderDoc.data(), status: 'em_preparo' };
      const { notifyOwner, notifyCustomer } = await import('./orders.js');

      // Dono: avisa que pagamento foi confirmado
      await notifyOwner(companyId, order.lojaId, {
        ...order,
        // Mensagem diferenciada: usa 💰 em vez de 🔔
        _ownerMsg: `💰 *Pagamento PIX confirmado!*\nPedido #${order.numeroPedido} de ${order.clientName} — R$ ${Number(order.total || 0).toFixed(2)}\n✅ Status → Em Preparo`,
      }).catch(() => {});

      // Cliente: confirma pagamento
      await notifyCustomer(companyId, order.lojaId, order, 'pagamento_confirmado').catch(() => {});
    }
  } catch (err) {
    log.warn('MP', 'Falha ao notificar após pagamento venda', err.message);
  }

  return { handled: true };
}

function safeParseJSON(str) {
  try { return JSON.parse(str); } catch { return null; }
}
