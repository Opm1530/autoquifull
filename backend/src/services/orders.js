/**
 * Orders Service — gerencia pedidos no Firestore
 *
 * Coleção: `pedidos`
 * Schema compatível com o frontend existente (Orders.ts / orderService.ts).
 *
 * campos-chave:
 *   empresaId, lojaId, leadId
 *   nome / clientName, clientPhone / telefone
 *   itens / items  → [{ id, name, price, qty, observation }]
 *   value / total
 *   entrega: 'entrega' | 'retirada'
 *   endereco / clientAddress
 *   formaPagamento / pagamento: 'link' | 'na_entrega' | 'pagamento_no_pix'
 *   status: 'em_montagem' | 'aguardando_pagamento' | 'em_preparo' | 'finalizado' | 'cancelado'
 *   source: 'bot_venda'
 */

import { getDb } from '../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { log } from '../utils/logger.js';
import { sendText } from './evolution.js';

// ─────────────────────────────────────────────────────────────
// Criação de pedido
// ─────────────────────────────────────────────────────────────

/**
 * Cria um novo pedido no Firestore.
 *
 * @param {string} companyId
 * @param {string|null} storeId
 * @param {object} data
 * @param {string} data.clientName
 * @param {string} data.clientPhone
 * @param {string} [data.leadId]
 * @param {Array}  data.items         → [{ id, name, price, qty, observation }]
 * @param {number} data.total
 * @param {string} data.deliveryType  → 'entrega' | 'retirada'
 * @param {string} [data.address]     → obrigatório se deliveryType === 'entrega'
 * @param {string} data.paymentMethod → 'link' | 'na_entrega' | 'pagamento_no_pix'
 *
 * @returns {{ id: string, numeroPedido: number, ...fields }}
 */
export async function createOrder(companyId, storeId, data) {
  const db = getDb();

  // Número sequencial legível (6 dígitos aleatórios — suficiente para uso operacional)
  const numeroPedido = Math.floor(100000 + Math.random() * 900000);

  // Normaliza items para o formato que o frontend espera
  const itens = (data.items || []).map((item) => ({
    id: item.id || '',
    item: item.name,           // campo legado usado pelo frontend
    name: item.name,
    quantidade: item.qty || 1, // legado
    qty: item.qty || 1,
    preco: item.price || 0,    // legado
    price: item.price || 0,
    observation: item.observation || '',
  }));

  const payload = {
    empresaId: companyId,
    lojaId: storeId || null,
    leadId: data.leadId || null,

    // Nome e telefone do cliente (campos duplicados para compatibilidade)
    nome: data.clientName,
    clientName: data.clientName,
    clientPhone: data.clientPhone,
    telefone: data.clientPhone,

    // Produtos
    itens,
    items: itens,

    // Valor
    value: data.total,
    total: data.total,

    // Entrega
    entrega: data.deliveryType || 'retirada',
    endereco: data.address || '',
    clientAddress: data.address || '',

    // Pagamento
    formaPagamento: data.paymentMethod || 'na_entrega',
    pagamento: data.paymentMethod || 'na_entrega',
    paymentSubMethod: data.paymentSubMethod || null,
    troco: data.troco || null,

    // Status inicial:
    // na_entrega / dinheiro / maquininha → em_montagem (operador aceita e já prepara)
    // qualquer PIX ou link de pagamento  → aguardando_pagamento (aguarda confirmação)
    status: ['na_entrega', 'dinheiro', 'maquininha'].includes(data.paymentMethod)
      ? 'em_montagem'
      : 'aguardando_pagamento',

    // Campos extras do catálogo
    bairro: data.bairro || '',
    taxaEntrega: data.taxaEntrega || 0,
    taxaAplicada: data.taxaEntrega || 0,
    cupom: data.cupom || null,
    desconto: data.desconto || 0,
    comprovanteUrl: data.comprovanteUrl || null,

    numeroPedido,
    source: data.source || 'bot_venda',
    arquivado: false,

    criadoEm: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const ref = await db.collection('pedidos').add(payload);
  log.ok('Orders', `Pedido criado: ${ref.id} (nº ${numeroPedido}) para ${data.clientPhone} | total R$${data.total} | ${data.paymentMethod}`);

  return { id: ref.id, numeroPedido, ...payload };
}

// ─────────────────────────────────────────────────────────────
// Atualização de status
// ─────────────────────────────────────────────────────────────

export async function updateOrderStatus(orderId, status, extra = {}) {
  const db = getDb();
  await db.collection('pedidos').doc(orderId).update({
    status,
    ...extra,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

// ─────────────────────────────────────────────────────────────
// Leitura
// ─────────────────────────────────────────────────────────────

export async function getOrderById(orderId) {
  const db = getDb();
  const doc = await db.collection('pedidos').doc(orderId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

/**
 * Busca pedidos ativos (não finalizados nem cancelados) de um cliente.
 */
export async function getActiveOrdersByPhone(companyId, phone) {
  const db = getDb();
  const snap = await db
    .collection('pedidos')
    .where('empresaId', '==', companyId)
    .where('clientPhone', '==', phone)
    .where('status', 'not-in', ['finalizado', 'cancelado'])
    .orderBy('status')
    .orderBy('criadoEm', 'desc')
    .limit(5)
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─────────────────────────────────────────────────────────────
// Link de pagamento (MercadoPago — credenciais da empresa)
// ─────────────────────────────────────────────────────────────

/**
 * Gera um link de pagamento MercadoPago usando as credenciais da empresa (não da plataforma).
 * Usa o token em `companies/{companyId}.mercadoPagoToken`.
 *
 * @param {object} params
 * @param {string} params.accessToken  → token MP da empresa
 * @param {string} params.orderId
 * @param {number} params.numeroPedido
 * @param {Array}  params.items
 * @param {number} params.total
 * @param {string} params.companyName
 * @param {string} params.backendUrl
 * @param {string} params.frontendUrl
 *
 * @returns {{ preferenceId: string, checkoutUrl: string }}
 */
export async function generateMPPaymentLink(params) {
  const {
    accessToken,
    orderId,
    numeroPedido,
    items,
    total,
    companyName,
    backendUrl,
    frontendUrl,
  } = params;

  if (!accessToken) {
    throw new Error('Empresa sem MercadoPago configurado. Configure em Configurações → MercadoPago.');
  }

  const mpItems = items.map((item) => ({
    id: item.id || String(item.name).toLowerCase().replace(/\s/g, '_'),
    title: `${item.qty}x ${item.name}`,
    quantity: 1,
    currency_id: 'BRL',
    unit_price: parseFloat(((item.price || 0) * (item.qty || 1)).toFixed(2)),
  }));

  // Garante que o total bate (adiciona item de ajuste se necessário)
  const itemsTotal = mpItems.reduce((s, i) => s + i.unit_price, 0);
  const diff = parseFloat((total - itemsTotal).toFixed(2));
  if (Math.abs(diff) > 0.01) {
    mpItems.push({
      id: 'ajuste',
      title: diff > 0 ? 'Taxa de entrega' : 'Desconto',
      quantity: 1,
      currency_id: 'BRL',
      unit_price: diff,
    });
  }

  const body = {
    items: mpItems,
    external_reference: JSON.stringify({ type: 'venda', orderId }),
    notification_url: `${backendUrl}/plans/webhook`,
    back_urls: {
      success: `${frontendUrl}/pedido/${orderId}?payment=success`,
      failure: `${frontendUrl}/pedido/${orderId}?payment=failure`,
      pending: `${frontendUrl}/pedido/${orderId}?payment=pending`,
    },
    auto_return: 'approved',
    metadata: { orderId, companyName, numeroPedido },
  };

  const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`MercadoPago error ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
  }

  return {
    preferenceId: data.id,
    checkoutUrl: data.init_point,
  };
}

// ─────────────────────────────────────────────────────────────
// Formatação
// ─────────────────────────────────────────────────────────────

export function formatOrderSummary(order) {
  const items = (order.itens || order.items || [])
    .map((i) => `• ${i.quantidade || i.qty}x ${i.item || i.name} — R$ ${((i.preco || i.price || 0) * (i.quantidade || i.qty || 1)).toFixed(2).replace('.', ',')}`)
    .join('\n');

  return [
    `📋 *Pedido #${order.numeroPedido}*`,
    items,
    `\n💰 *Total: R$ ${(order.value || order.total || 0).toFixed(2).replace('.', ',')}*`,
    `🚚 ${order.entrega === 'entrega' ? `Entrega em: ${order.endereco}` : 'Retirada no local'}`,
  ].join('\n');
}

// ─────────────────────────────────────────────────────────────
// Notificação ao DONO da loja
// ─────────────────────────────────────────────────────────────

/**
 * Resolve o nome da instância WhatsApp de uma loja.
 * Ordem: loja_config → company.stores → company.whatsappInstance
 */
async function resolveInstanceName(db, companyId, storeId, companyData) {
  let instanceName = null;

  if (storeId) {
    // 1. Tenta loja_config
    const lojaSnap = await db.collection('loja_config')
      .where('empresaId', '==', companyId)
      .where('lojaId', '==', storeId)
      .limit(1)
      .get();
    const lojaConf = lojaSnap.docs[0]?.data();
    let instId = lojaConf?.instancia_id;

    // 2. Tenta array company.stores
    if (!instId && companyData?.stores) {
      const storeInfo = companyData.stores.find((s) => s.id === storeId);
      instId = storeInfo?.instancia_id;
    }

    if (instId) {
      const instDoc = await db.collection('instancias').doc(instId).get();
      instanceName = instDoc.data()?.nome || null;
    }
  }

  // 3. Fallback — instância global da empresa
  if (!instanceName) {
    instanceName = companyData?.whatsappInstance?.instanceName || null;
  }

  return instanceName;
}

/**
 * Envia mensagem WhatsApp ao DONO da loja quando chega um novo pedido.
 *
 * Requer que `companies/{companyId}` tenha o campo `ownerPhone` (ou `notificationPhone`).
 * Se não estiver configurado, não faz nada (a notificação visual no painel já funciona).
 */
export async function notifyOwner(companyId, storeId, order) {
  const db = getDb();
  const companyDoc = await db.collection('companies').doc(companyId).get();
  if (!companyDoc.exists) return;
  const company = companyDoc.data();

  // Telefone do dono (campo configurável)
  const ownerPhone = company.ownerPhone || company.notificationPhone || company.telefone;
  if (!ownerPhone) {
    log.debug('Orders', `notifyOwner: empresa ${companyId} sem ownerPhone — pulando`);
    return;
  }

  const instanceName = await resolveInstanceName(db, companyId, storeId, company);
  if (!instanceName) {
    log.warn('Orders', `notifyOwner: sem instância para empresa ${companyId}`);
    return;
  }

  // Suporte a mensagem direta (ex: confirmação de pagamento)
  let msg;
  if (order._ownerMsg) {
    msg = order._ownerMsg;
  } else {
    // Formata a mensagem de novo pedido para o dono
    const itens = (order.itens || [])
      .map((i) => `  • ${i.quantidade}x ${i.item} — R$ ${((i.preco || 0) * (i.quantidade || 1)).toFixed(2)}`)
      .join('\n');

    const entrega = order.entrega === 'entrega'
      ? `🚚 Entrega${order.bairro ? ` — ${order.bairro}` : ''}: ${order.endereco || 'não informado'}`
      : '🏪 Retirada no local';

    const pagamento = {
      na_entrega: `🤝 Na Entrega${order.paymentSubMethod ? ` (${order.paymentSubMethod})` : ''}`,
      pagamento_no_pix: '⚡ PIX',
      pix_manual: '⚡ PIX Manual',
      pix_mercadopago: '💳 PIX Mercado Pago',
      link: '🔗 Link MP',
    }[order.formaPagamento] || order.formaPagamento || 'Não informado';

    const phone = (order.clientPhone || '').replace(/\D/g, '').replace(/^55/, '');

    msg = [
      `🔔 *Novo Pedido #${order.numeroPedido}!*`,
      ``,
      `👤 *Cliente:* ${order.clientName}`,
      phone ? `📞 *Telefone:* ${phone}` : null,
      ``,
      `📋 *Itens:*`,
      itens || '  (sem itens)',
      ``,
      `💰 *Total: R$ ${Number(order.total || 0).toFixed(2)}*`,
      `${entrega}`,
      `💳 *Pagamento:* ${pagamento}`,
      order.comprovanteUrl ? `\n✅ Comprovante PIX anexado` : null,
    ].filter(Boolean).join('\n');
  }

  await sendText(instanceName, ownerPhone, msg);
  log.ok('Orders', `Dono notificado: pedido #${order.numeroPedido} → ${ownerPhone}`);
}

// ─────────────────────────────────────────────────────────────
// Notificação ao CLIENTE
// ─────────────────────────────────────────────────────────────

const DEFAULT_CUSTOMER_MESSAGES = {
  pedido_recebido: '✅ Pedido recebido! Em breve confirmaremos.',
  pagamento_confirmado: '💳 Pagamento confirmado! Seu pedido está sendo preparado.',
  pedido_pronto: '📦 Seu pedido está pronto para retirada!',
  saiu_para_entrega: '🚚 Seu pedido saiu para entrega!',
  pedido_entregue: '🏁 Pedido entregue. Obrigado pela preferência!',
  pedido_cancelado: '❌ Seu pedido foi cancelado.',
};

/**
 * Envia mensagem WhatsApp ao CLIENTE em uma mudança de status.
 * Usa template de `loja_config.mensagens_automaticas` se existir.
 */
export async function notifyCustomer(companyId, storeId, order, msgKey, reason) {
  if (!order.clientPhone) return;

  const db = getDb();
  const companyDoc = await db.collection('companies').doc(companyId).get();
  if (!companyDoc.exists) return;
  const company = companyDoc.data();

  const instanceName = await resolveInstanceName(db, companyId, storeId, company);
  if (!instanceName) return;

  // Busca template personalizado
  let template = null;
  if (storeId) {
    const snap = await db.collection('loja_config')
      .where('empresaId', '==', companyId)
      .where('lojaId', '==', storeId)
      .limit(1)
      .get();
    template = snap.docs[0]?.data()?.mensagens_automaticas?.[msgKey] || null;
  }
  if (!template) {
    const cfgSnap = await db.collection('empresa_config')
      .where('empresaId', '==', companyId)
      .limit(1)
      .get();
    template = cfgSnap.docs[0]?.data()?.mensagens_automaticas?.[msgKey] || null;
  }

  // Sem template e sem default → não envia
  const message = template || DEFAULT_CUSTOMER_MESSAGES[msgKey] || null;
  if (!message) return;

  // Substituição de variáveis simples
  const numeroPedido = String(order.numeroPedido || order.id?.slice(-6).toUpperCase() || '');
  const total = Number(order.total || order.value || 0).toFixed(2);
  const final = message
    .replace(/\{\{nome_lead\}\}/g, order.clientName || 'Cliente')
    .replace(/\{\{numero_pedido\}\}/g, numeroPedido)
    .replace(/\{\{valor_total\}\}/g, total)
    + (reason ? `\nMotivo: ${reason}` : '');

  await sendText(instanceName, order.clientPhone, final);
  log.ok('Orders', `Cliente notificado [${msgKey}]: ${order.clientPhone}`);
}
