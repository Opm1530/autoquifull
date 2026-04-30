/**
 * E-commerce Jobs
 *
 * Jobs periódicos para automações que não chegam via webhook:
 *
 *  1. Carrinho Abandonado   — roda a cada 30 min
 *     Busca checkouts abertos na NuvemShop e envia mensagem de recuperação.
 *
 *  2. Lembrete de Boleto    — roda a cada hora
 *     Busca pedidos com boleto pendente > 24h e envia lembrete.
 *
 *  3. Reengajamento         — roda 1x por dia (08:00)
 *     Clientes sem compra há X dias recebem mensagem de reativação.
 */

import cron from 'node-cron';
import { getDb } from '../config/firebase.js';
import { log } from '../utils/logger.js';
import { sendText } from '../services/evolution.js';
import {
  getAbandonedCheckouts,
  extractPhone,
  extractName,
  formatTotal,
  extractProducts,
} from '../services/nuvemshop.js';

// ─────────────────────────────────────────────────────────────
// Entry point
// ─────────────────────────────────────────────────────────────

export function startEcommerceJobs() {
  // Carrinho abandonado — a cada 30 min
  cron.schedule('*/30 * * * *', () => runAbandonedCartJob().catch(logErr));

  // Lembrete de boleto — a cada hora (minuto 5)
  cron.schedule('5 * * * *', () => runBoletoReminderJob().catch(logErr));

  // Reengajamento — todo dia às 09h
  cron.schedule('0 9 * * *', () => runReengagementJob().catch(logErr));

  log.info('Ecommerce', 'Jobs de e-commerce iniciados');

  // Roda na inicialização
  runAbandonedCartJob().catch(logErr);
}

function logErr(err) {
  log.error('Ecommerce', `Erro em job: ${err.message}`);
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

async function getAllActiveIntegrations() {
  const db = getDb();
  const snap = await db.collection('ecommerce_integrations')
    .where('active', '==', true)
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function getAutomation(companyId, trigger) {
  const db = getDb();
  const snap = await db.collection('ecommerce_automations')
    .where('companyId', '==', companyId)
    .where('trigger', '==', trigger)
    .where('enabled', '==', true)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

async function wasSent(companyId, entityId, trigger) {
  const db = getDb();
  const key = `${companyId}_${entityId}_${trigger}`;
  const doc = await db.collection('ecommerce_sent_events').doc(key).get();
  return doc.exists;
}

async function markSent(companyId, entityId, trigger, phone) {
  const db = getDb();
  const key = `${companyId}_${entityId}_${trigger}`;
  await db.collection('ecommerce_sent_events').doc(key).set({
    companyId,
    orderId: String(entityId),
    trigger,
    phone,
    sentAt: new Date(),
  });
}

function applyTemplate(template, vars) {
  return template
    .replace(/\{\{nome\}\}/gi,             vars.nome || 'Cliente')
    .replace(/\{\{produtos\}\}/gi,          vars.produtos || '')
    .replace(/\{\{total\}\}/gi,             vars.total || '')
    .replace(/\{\{link_carrinho\}\}/gi,     vars.link_carrinho || '')
    .replace(/\{\{numero_pedido\}\}/gi,     vars.numero_pedido || '')
    .replace(/\{\{loja\}\}/gi,              vars.loja || 'nossa loja')
    .replace(/\{\{dias_sem_comprar\}\}/gi,  vars.dias_sem_comprar || '');
}

async function sendMessage(automation, phone, vars) {
  const msg     = applyTemplate(automation.messageTemplate, vars);
  const cleaned = phone.replace(/\D/g, '');
  await sendText(automation.whatsappInstance, cleaned, msg);
}

// ─────────────────────────────────────────────────────────────
// Job 1: Carrinho Abandonado
// ─────────────────────────────────────────────────────────────

async function runAbandonedCartJob() {
  const integrations = await getAllActiveIntegrations();
  if (!integrations.length) return;

  for (const integration of integrations) {
    await processAbandonedCarts(integration);
    await sleep(2000);
  }
}

async function processAbandonedCarts(integration) {
  const { companyId, storeId, accessToken, storeName } = integration;

  const automation = await getAutomation(companyId, 'carrinho_abandonado');
  if (!automation) return;

  // Janela: abandonado há pelo menos delayMinutes, mas no máximo 24h
  const delayMs = (automation.delayMinutes || 60) * 60 * 1000;
  const now     = Date.now();
  const maxDate = new Date(now - delayMs);
  const minDate = new Date(now - 24 * 3600 * 1000);

  const checkouts = await getAbandonedCheckouts(
    storeId,
    accessToken,
    minDate.toISOString(),
    maxDate.toISOString()
  );

  if (!checkouts.length) return;

  log.info('Ecommerce', `[Carrinho] ${checkouts.length} carrinhos abandonados — empresa ${companyId}`);

  for (const cart of checkouts) {
    const cartId  = String(cart.id);
    const phone   = extractPhone(cart);
    if (!phone) continue;

    if (await wasSent(companyId, cartId, 'carrinho_abandonado')) continue;

    const nome     = extractName(cart).split(' ')[0];
    const produtos = extractProducts(cart);
    const total    = formatTotal(cart.total || cart.subtotal);
    const link     = cart.checkout_url || '';

    try {
      await sendMessage(automation, phone, {
        nome, produtos, total,
        link_carrinho: link,
        loja: storeName || 'nossa loja',
      });
      await markSent(companyId, cartId, 'carrinho_abandonado', phone);
      log.ok('Ecommerce', `[Carrinho] Mensagem enviada → ${phone} (cart ${cartId})`);
    } catch (err) {
      log.error('Ecommerce', `[Carrinho] Erro para ${phone}: ${err.message}`);
    }

    await sleep(800);
  }
}

// ─────────────────────────────────────────────────────────────
// Job 2: Lembrete de Boleto Pendente
// ─────────────────────────────────────────────────────────────

async function runBoletoReminderJob() {
  const integrations = await getAllActiveIntegrations();

  for (const integration of integrations) {
    const { companyId } = integration;
    const automation = await getAutomation(companyId, 'boleto_lembrete');
    if (!automation) continue;

    await processBoletoReminders(integration, automation);
    await sleep(1500);
  }
}

async function processBoletoReminders(integration, automation) {
  const { companyId, storeId, accessToken, storeName } = integration;

  const db = getDb();
  const cutoff = new Date(Date.now() - (automation.delayMinutes || 1440) * 60 * 1000);

  // Busca pedidos com boleto pendente criados antes do cutoff
  // (NuvemShop: payment_status=pending, payment_details.method contains 'boleto')
  const params = new URLSearchParams({
    payment_status: 'pending',
    created_at_max: cutoff.toISOString(),
    per_page: '50',
  });

  try {
    const res = await fetch(
      `https://api.nuvemshop.com.br/v1/${storeId}/orders?${params}`,
      {
        headers: {
          Authentication: `bearer ${accessToken}`,
          'User-Agent': 'AutoQui/1.0',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) return;
    const orders = await res.json();

    for (const order of orders) {
      const method = order.payment_details?.method || '';
      if (!method.includes('boleto') && !method.includes('pix')) continue;

      const orderId = String(order.id);
      if (await wasSent(companyId, orderId, 'boleto_lembrete')) continue;

      const phone = extractPhone(order);
      if (!phone) continue;

      const nome   = extractName(order).split(' ')[0];
      const total  = formatTotal(order.total);
      const numPed = String(order.number || orderId);

      await sendMessage(automation, phone, {
        nome, total, numero_pedido: numPed,
        loja: storeName || 'nossa loja',
      });
      await markSent(companyId, orderId, 'boleto_lembrete', phone);
      log.ok('Ecommerce', `[Boleto] Lembrete enviado → ${phone} (pedido #${numPed})`);
      await sleep(600);
    }
  } catch (err) {
    log.error('Ecommerce', `[Boleto] Erro empresa ${companyId}: ${err.message}`);
  }
}

// ─────────────────────────────────────────────────────────────
// Job 3: Reengajamento
// ─────────────────────────────────────────────────────────────

async function runReengagementJob() {
  const integrations = await getAllActiveIntegrations();

  for (const integration of integrations) {
    const { companyId } = integration;
    const automation = await getAutomation(companyId, 'reengajamento');
    if (!automation) continue;

    await processReengagement(integration, automation);
    await sleep(3000);
  }
}

async function processReengagement(integration, automation) {
  const { companyId, storeId, accessToken, storeName } = integration;

  const days   = Math.floor((automation.delayMinutes || 43200) / 1440); // delayMinutes → dias
  const cutoff = new Date(Date.now() - days * 24 * 3600 * 1000);

  // Busca clientes com último pedido antes do cutoff
  const params = new URLSearchParams({
    created_at_max: cutoff.toISOString(),
    per_page: '50',
    sort_by: 'created_at',
    sort_direction: 'desc',
  });

  try {
    const res = await fetch(
      `https://api.nuvemshop.com.br/v1/${storeId}/customers?${params}`,
      {
        headers: {
          Authentication: `bearer ${accessToken}`,
          'User-Agent': 'AutoQui/1.0',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) return;
    const customers = await res.json();

    for (const customer of customers) {
      const customerId = String(customer.id);
      if (await wasSent(companyId, customerId, 'reengajamento')) continue;

      const phone = (customer.phone || '').replace(/\D/g, '');
      if (!phone) continue;

      const nome            = (customer.first_name || customer.name || 'Cliente').split(' ')[0];
      const lastOrderDate   = customer.last_order_id ? new Date(customer.updated_at) : null;
      const diasSemComprar  = lastOrderDate
        ? Math.floor((Date.now() - lastOrderDate.getTime()) / 86400000)
        : days;

      await sendMessage(automation, phone, {
        nome,
        dias_sem_comprar: String(diasSemComprar),
        loja: storeName || 'nossa loja',
      });
      await markSent(companyId, customerId, 'reengajamento', phone);
      log.ok('Ecommerce', `[Reengajamento] → ${phone} (${diasSemComprar} dias)`);
      await sleep(800);
    }
  } catch (err) {
    log.error('Ecommerce', `[Reengajamento] Erro empresa ${companyId}: ${err.message}`);
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
