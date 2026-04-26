/**
 * Orders Routes
 *
 * POST /orders/create  → Cria pedido do catálogo + notifica dono via WhatsApp
 * PATCH /orders/status → Atualiza status do pedido (aceitar / recusar / avançar)
 */

import { Router } from 'express';
import {
  createOrder,
  notifyOwner,
  notifyCustomer,
} from '../services/orders.js';
import { getDb } from '../config/firebase.js';
import { log } from '../utils/logger.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

// ── Criar pedido (catálogo) ──────────────────────────────────

/**
 * Cria um pedido novo vindo do catálogo público.
 * Servidor cria o pedido e notifica o dono da loja via WhatsApp.
 *
 * Body:
 *   companyId, storeId, clientName, clientPhone,
 *   items: [{ id, name, qty, price, observation }],
 *   total, deliveryType, address, paymentMethod,
 *   comprovanteUrl (opcional — PIX manual)
 */
router.post('/create', async (req, res) => {
  const {
    companyId, storeId, leadId,
    clientName, clientPhone,
    items, total,
    deliveryType, address,
    paymentMethod,
    comprovanteUrl,
    bairro, taxaEntrega,
    cupom, desconto,
    paymentSubMethod, troco,
  } = req.body;

  if (!companyId || !clientName || !Array.isArray(items) || items.length === 0 || total == null) {
    return res.status(400).json({
      error: 'Campos obrigatórios: companyId, clientName, items (array), total',
    });
  }

  try {
    const order = await createOrder(companyId, storeId || null, {
      clientName,
      clientPhone: clientPhone || '',
      leadId: leadId || null,
      items,
      total,
      deliveryType: deliveryType || 'retirada',
      address: address || '',
      paymentMethod: paymentMethod || 'na_entrega',
      // Campos extras do catálogo
      comprovanteUrl: comprovanteUrl || null,
      bairro: bairro || '',
      taxaEntrega: taxaEntrega || 0,
      cupom: cupom || null,
      desconto: desconto || 0,
      paymentSubMethod: paymentSubMethod || null,
      troco: troco || null,
      source: 'catalog',
    });

    // Notifica o DONO da loja via WhatsApp (best-effort — não bloqueia resposta)
    notifyOwner(companyId, storeId, order).catch((err) =>
      log.warn('Orders', 'Falha ao notificar dono (não crítico)', err.message)
    );

    // Envia confirmação ao CLIENTE (se template configurado)
    notifyCustomer(companyId, storeId, order, 'pedido_recebido').catch((err) =>
      log.warn('Orders', 'Falha ao notificar cliente (não crítico)', err.message)
    );

    res.json({ ok: true, orderId: order.id, numeroPedido: order.numeroPedido });
  } catch (err) {
    log.error('Orders', 'Erro ao criar pedido via catálogo', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Atualizar status do pedido ───────────────────────────────

/**
 * Atualiza o status de um pedido e notifica o cliente.
 * Usado pelo painel do operador (aceitar, recusar, avançar na fila).
 *
 * Body: { orderId, companyId, status, reason? }
 */
router.patch('/status', requireAuth, async (req, res) => {
  const { orderId, companyId, status, reason } = req.body;

  if (!orderId || !companyId || !status) {
    return res.status(400).json({ error: 'orderId, companyId e status são obrigatórios' });
  }

  const VALID = ['em_montagem', 'aguardando_pagamento', 'em_preparo', 'pedido_pronto', 'saiu_para_entrega', 'finalizado', 'cancelado'];
  if (!VALID.includes(status)) {
    return res.status(400).json({ error: `Status inválido. Use: ${VALID.join(', ')}` });
  }

  try {
    const db = getDb();
    const orderDoc = await db.collection('pedidos').doc(orderId).get();
    if (!orderDoc.exists) return res.status(404).json({ error: 'Pedido não encontrado' });

    const order = { id: orderId, ...orderDoc.data() };

    // Atualiza no Firestore
    await db.collection('pedidos').doc(orderId).update({
      status,
      ...(reason ? { rejectionReason: reason } : {}),
      updatedAt: new Date(),
    });

    // Notifica cliente
    const msgKey = {
      em_preparo: 'pagamento_confirmado',
      pedido_pronto: 'pedido_pronto',
      saiu_para_entrega: 'saiu_para_entrega',
      finalizado: 'pedido_entregue',
      cancelado: 'pedido_cancelado',
    }[status];

    if (msgKey) {
      notifyCustomer(companyId, order.lojaId || order.storeId, { ...order, status }, msgKey, reason).catch(() => {});
    }

    log.ok('Orders', `Pedido ${orderId} → ${status}`);
    res.json({ ok: true });
  } catch (err) {
    log.error('Orders', `Erro ao atualizar status do pedido ${orderId}`, err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
