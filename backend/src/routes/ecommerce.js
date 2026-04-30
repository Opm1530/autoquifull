/**
 * E-commerce Routes
 *
 * Gerencia integrações com plataformas de e-commerce (NuvemShop).
 *
 * GET  /ecommerce/integration/:companyId     — busca integração atual
 * POST /ecommerce/integration/:companyId     — salva/atualiza integração
 * POST /ecommerce/integration/:companyId/test — testa credenciais
 * DELETE /ecommerce/integration/:companyId  — desconecta
 *
 * GET  /ecommerce/automations/:companyId        — lista automações
 * POST /ecommerce/automations/:companyId        — salva automação
 * DELETE /ecommerce/automations/:companyId/:trigger — remove
 *
 * GET  /ecommerce/history/:companyId           — histórico de envios
 *
 * POST /ecommerce/webhook/:companyId           — recebe webhook da NuvemShop
 */

import { Router } from 'express';
import { getDb } from '../config/firebase.js';
import { ENV } from '../config/env.js';
import { log } from '../utils/logger.js';
import { sendText } from '../services/evolution.js';
import { upsertLead } from '../services/firestore.js';
import {
  getStoreInfo,
  getOrder,
  registerWebhooks,
  removeWebhooks,
  extractPhone,
  extractName,
  formatTotal,
  extractProducts,
} from '../services/nuvemshop.js';

const router = Router();

// ─────────────────────────────────────────────────────────────
// Helpers internos
// ─────────────────────────────────────────────────────────────

function webhookUrl(companyId, backendUrl) {
  const base = backendUrl || process.env.BACKEND_URL || 'https://backend.autoqui.com.br';
  return `${base}/ecommerce/webhook/${companyId}`;
}

async function getIntegration(companyId) {
  const db = getDb();
  const snap = await db.collection('ecommerce_integrations')
    .where('companyId', '==', companyId)
    .where('active', '==', true)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

async function getAutomations(companyId) {
  const db = getDb();
  const snap = await db.collection('ecommerce_automations')
    .where('companyId', '==', companyId)
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function getAutomationByTrigger(companyId, trigger) {
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

async function wasSentRecently(companyId, orderId, trigger, ttlHours = 48) {
  const db = getDb();
  const key = `${companyId}_${orderId}_${trigger}`;
  const doc = await db.collection('ecommerce_sent_events').doc(key).get();
  if (!doc.exists) return false;
  const { sentAt } = doc.data();
  const hoursAgo = (Date.now() - sentAt.toMillis()) / 3600000;
  return hoursAgo < ttlHours;
}

async function markSent(companyId, orderId, trigger, phone) {
  const db = getDb();
  const key = `${companyId}_${orderId}_${trigger}`;
  await db.collection('ecommerce_sent_events').doc(key).set({
    companyId, orderId: String(orderId), trigger, phone,
    sentAt: new Date(),
  });
}

/**
 * Substitui variáveis no template de mensagem.
 */
function applyTemplate(template, vars) {
  return template
    .replace(/\{\{nome\}\}/gi,          vars.nome || 'Cliente')
    .replace(/\{\{produtos\}\}/gi,       vars.produtos || '')
    .replace(/\{\{total\}\}/gi,          vars.total || '')
    .replace(/\{\{rastreio\}\}/gi,       vars.rastreio || '')
    .replace(/\{\{url_rastreio\}\}/gi,   vars.url_rastreio || '')
    .replace(/\{\{link_carrinho\}\}/gi,  vars.link_carrinho || '')
    .replace(/\{\{numero_pedido\}\}/gi,  vars.numero_pedido || '')
    .replace(/\{\{loja\}\}/gi,           vars.loja || 'nossa loja')
    .replace(/\{\{dias_sem_comprar\}\}/gi, vars.dias_sem_comprar || '');
}

/**
 * Envia mensagem via WhatsApp usando a instância configurada na automação.
 */
async function sendAutomation(automation, phone, vars) {
  const msg = applyTemplate(automation.messageTemplate, vars);
  const formattedPhone = phone.replace(/\D/g, '');
  await sendText(automation.whatsappInstance, formattedPhone, msg);
  log.ok('Ecommerce', `[${automation.trigger}] → ${formattedPhone}`);
  return msg;
}

// ─────────────────────────────────────────────────────────────
// OAuth NuvemShop
// ─────────────────────────────────────────────────────────────

/**
 * Passo 1 — Redireciona o dono da loja para autorizar o app na NuvemShop.
 * GET /ecommerce/oauth/authorize?companyId=xxx
 */
router.get('/oauth/authorize', (req, res) => {
  const { companyId } = req.query;
  if (!companyId) return res.status(400).send('companyId é obrigatório');
  if (!ENV.NUVEMSHOP_APP_ID) return res.status(500).send('APP_ID não configurado');

  const authUrl =
    `https://www.nuvemshop.com.br/apps/${ENV.NUVEMSHOP_APP_ID}/authorize` +
    `?state=${encodeURIComponent(companyId)}`;

  log.info('Ecommerce', `OAuth: redirecionando empresa ${companyId} → NuvemShop`);
  res.redirect(authUrl);
});

/**
 * Passo 2 — NuvemShop redireciona de volta com o code.
 * GET /ecommerce/oauth/callback?code=XXX&state=companyId
 */
router.get('/oauth/callback', async (req, res) => {
  const { code, state: companyId } = req.query;

  if (!code || !companyId) {
    return res.redirect('/ecommerce?oauth=error&msg=Parâmetros+inválidos');
  }

  try {
    // Troca o code pelo access_token
    const tokenRes = await fetch('https://www.nuvemshop.com.br/apps/authorize/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id:     ENV.NUVEMSHOP_APP_ID,
        client_secret: ENV.NUVEMSHOP_APP_SECRET,
        grant_type:    'authorization_code',
        code:          String(code),
      }),
    });

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      log.error('Ecommerce', `OAuth token exchange falhou: ${tokenRes.status} — ${errBody}`);
      return res.redirect('/ecommerce?oauth=error&msg=Falha+na+autenticação+com+a+NuvemShop');
    }

    const { access_token, user_id: storeId } = await tokenRes.json();

    if (!access_token || !storeId) {
      return res.redirect('/ecommerce?oauth=error&msg=Resposta+inválida+da+NuvemShop');
    }

    // Busca dados da loja
    const storeInfo = await getStoreInfo(String(storeId), access_token).catch(() => null);
    const storeName = storeInfo?.name?.pt || storeInfo?.name || '';
    const storeUrl  = storeInfo?.main_domain || '';

    const db = getDb();

    // Desativa integração anterior se existir
    const existing = await getIntegration(String(companyId));
    if (existing) {
      await db.collection('ecommerce_integrations').doc(existing.id).update({ active: false });
      try { await removeWebhooks(existing.storeId, existing.accessToken, webhookUrl(String(companyId))); } catch { /* ignora */ }
    }

    // Registra webhooks na NuvemShop
    const whUrl    = webhookUrl(String(companyId));
    const webhooks = await registerWebhooks(String(storeId), access_token, whUrl).catch(() => []);

    // Salva no Firestore
    await db.collection('ecommerce_integrations').add({
      companyId:          String(companyId),
      platform:           'nuvemshop',
      storeId:            String(storeId),
      accessToken:        access_token,
      storeName,
      storeUrl,
      webhookUrl:         whUrl,
      webhooksRegistered: webhooks.filter((w) => w?.status !== 'error').length > 0,
      active:             true,
      connectedAt:        new Date(),
    });

    log.ok('Ecommerce', `OAuth: empresa ${companyId} conectou loja ${storeId} (${storeName})`);
    res.redirect('/ecommerce?oauth=success');

  } catch (err) {
    log.error('Ecommerce', `OAuth callback erro: ${err.message}`);
    res.redirect(`/ecommerce?oauth=error&msg=${encodeURIComponent(err.message)}`);
  }
});

// ─────────────────────────────────────────────────────────────
// CRUD — Integração
// ─────────────────────────────────────────────────────────────

router.get('/integration/:companyId', async (req, res) => {
  try {
    const integration = await getIntegration(req.params.companyId);
    if (!integration) return res.json({ connected: false });

    // Não expõe o token completo
    const { accessToken, ...safe } = integration;
    res.json({ connected: true, ...safe, hasToken: !!accessToken });
  } catch (err) {
    log.error('Ecommerce', `GET integration: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

router.post('/integration/:companyId/test', async (req, res) => {
  const { storeId, accessToken } = req.body;
  if (!storeId || !accessToken) {
    return res.status(400).json({ error: 'storeId e accessToken são obrigatórios' });
  }
  try {
    const info = await getStoreInfo(storeId, accessToken);
    if (!info) return res.status(401).json({ error: 'Credenciais inválidas ou loja não encontrada' });
    res.json({ ok: true, storeName: info.name?.pt || info.name || 'Loja sem nome', storeUrl: info.main_domain });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/integration/:companyId', async (req, res) => {
  const { companyId } = req.params;
  const { storeId, accessToken, storeName, storeUrl, platform = 'nuvemshop' } = req.body;

  if (!storeId || !accessToken) {
    return res.status(400).json({ error: 'storeId e accessToken são obrigatórios' });
  }

  try {
    const db = getDb();

    // Desativa integração anterior se existir
    const existing = await getIntegration(companyId);
    if (existing) {
      await db.collection('ecommerce_integrations').doc(existing.id).update({ active: false });
      // Remove webhooks antigos
      try {
        await removeWebhooks(existing.storeId, existing.accessToken, webhookUrl(companyId));
      } catch { /* ignora */ }
    }

    // Registra webhooks na NuvemShop
    const whUrl = webhookUrl(companyId);
    const webhooks = await registerWebhooks(storeId, accessToken, whUrl);

    const docRef = await db.collection('ecommerce_integrations').add({
      companyId,
      platform,
      storeId: String(storeId),
      accessToken,
      storeName: storeName || '',
      storeUrl: storeUrl || '',
      webhookUrl: whUrl,
      webhooksRegistered: webhooks.filter((w) => w.status !== 'error').length > 0,
      active: true,
      connectedAt: new Date(),
    });

    log.ok('Ecommerce', `Integração NuvemShop salva para empresa ${companyId} (loja ${storeId})`);
    res.json({ ok: true, id: docRef.id, webhooks });
  } catch (err) {
    log.error('Ecommerce', `POST integration: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

router.post('/integration/:companyId/reregister-webhooks', async (req, res) => {
  const { companyId } = req.params;
  try {
    const integration = await getIntegration(companyId);
    if (!integration) return res.status(404).json({ error: 'Integração não encontrada' });

    // Remove os antigos
    try { await removeWebhooks(integration.storeId, integration.accessToken, webhookUrl(companyId)); } catch { /* ignora */ }

    // Registra novamente
    const whUrl = webhookUrl(companyId);
    const webhooks = await registerWebhooks(integration.storeId, integration.accessToken, whUrl);

    const db = getDb();
    await db.collection('ecommerce_integrations').doc(integration.id).update({
      webhooksRegistered: webhooks.filter((w) => w.status !== 'error').length > 0,
      webhooksDetail: webhooks,
      updatedAt: new Date(),
    });

    log.ok('Ecommerce', `Webhooks re-registrados para empresa ${companyId}: ${JSON.stringify(webhooks)}`);
    res.json({ ok: true, webhooks });
  } catch (err) {
    log.error('Ecommerce', `reregister-webhooks: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/integration/:companyId', async (req, res) => {
  const { companyId } = req.params;
  try {
    const integration = await getIntegration(companyId);
    if (!integration) return res.json({ ok: true });

    const db = getDb();
    await db.collection('ecommerce_integrations').doc(integration.id).update({ active: false });

    try {
      await removeWebhooks(integration.storeId, integration.accessToken, webhookUrl(companyId));
    } catch { /* ignora */ }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// CRUD — Automações
// ─────────────────────────────────────────────────────────────

router.get('/automations/:companyId', async (req, res) => {
  try {
    const automations = await getAutomations(req.params.companyId);
    res.json(automations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/automations/:companyId', async (req, res) => {
  const { companyId } = req.params;
  const { trigger, enabled, delayMinutes, messageTemplate, whatsappInstance } = req.body;

  if (!trigger || !messageTemplate || !whatsappInstance) {
    return res.status(400).json({ error: 'trigger, messageTemplate e whatsappInstance são obrigatórios' });
  }

  try {
    const db = getDb();

    // Upsert por companyId + trigger
    const snap = await db.collection('ecommerce_automations')
      .where('companyId', '==', companyId)
      .where('trigger', '==', trigger)
      .limit(1)
      .get();

    const data = {
      companyId, trigger,
      enabled: enabled !== false,
      delayMinutes: delayMinutes || 0,
      messageTemplate,
      whatsappInstance,
      updatedAt: new Date(),
    };

    if (!snap.empty) {
      await snap.docs[0].ref.update(data);
      res.json({ ok: true, id: snap.docs[0].id });
    } else {
      const ref = await db.collection('ecommerce_automations').add({ ...data, createdAt: new Date() });
      res.json({ ok: true, id: ref.id });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/automations/:companyId/:trigger', async (req, res) => {
  const { companyId, trigger } = req.params;
  try {
    const db = getDb();
    const snap = await db.collection('ecommerce_automations')
      .where('companyId', '==', companyId)
      .where('trigger', '==', trigger)
      .get();
    for (const doc of snap.docs) await doc.ref.delete();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// Histórico
// ─────────────────────────────────────────────────────────────

router.get('/history/:companyId', async (req, res) => {
  try {
    const db = getDb();
    const snap = await db.collection('ecommerce_sent_events')
      .where('companyId', '==', req.params.companyId)
      .orderBy('sentAt', 'desc')
      .limit(100)
      .get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// Instâncias disponíveis (para o select da automação)
// ─────────────────────────────────────────────────────────────

router.get('/instances/:companyId', async (req, res) => {
  try {
    const db = getDb();
    const snap = await db.collection('instancias')
      .where('empresaId', '==', req.params.companyId)
      .where('status', '==', 'conectado')
      .get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// Webhook da NuvemShop — recebe eventos de pedidos
// ─────────────────────────────────────────────────────────────

router.post('/webhook/:companyId', async (req, res) => {
  res.status(200).json({ ok: true }); // Responde rápido para a NuvemShop

  const { companyId } = req.params;
  const payload = req.body;
  const event   = payload?.event
    || req.headers['x-linked-store-event']
    || req.headers['x-tiendanube-event']
    || req.headers['x-nuvemshop-event']
    || '';

  log.info('Ecommerce', `Webhook recebido — event: "${event}" | id: ${payload?.id} | store: ${payload?.store_id}`);

  if (!payload || !payload.id) return;

  processEcommerceEvent(companyId, event, payload).catch((err) => {
    log.error('Ecommerce', `Erro no processamento de webhook: ${err.message}`);
  });
});

// ─────────────────────────────────────────────────────────────
// Processamento de eventos
// ─────────────────────────────────────────────────────────────

export async function processEcommerceEvent(companyId, event, payload) {
  log.info('Ecommerce', `Evento "${event}" para empresa ${companyId} — pedido #${payload.id}`);

  const integration = await getIntegration(companyId);
  if (!integration) return;

  const orderId = String(payload.id);

  // NuvemShop envia payload resumido — busca o pedido completo na API
  let order = payload;
  const hasPhone = extractPhone(payload);
  if (!hasPhone) {
    log.info('Ecommerce', `Payload incompleto, buscando pedido ${orderId} na API...`);
    const full = await getOrder(integration.storeId, integration.accessToken, orderId);
    if (full) {
      order = full;
      log.info('Ecommerce', `Pedido ${orderId} carregado da API — cliente: ${extractName(full)}`);
    }
  }

  const phone     = extractPhone(order);
  const nome      = extractName(order).split(' ')[0];
  const total     = formatTotal(order.total || order.subtotal);
  const produtos  = extractProducts(order);
  const numPedido = String(order.number || orderId);
  const loja      = integration.storeName || 'nossa loja';

  // Registra/atualiza o cliente como lead na plataforma
  if (phone) {
    upsertLead(companyId, null, phone, {
      nome,
      statusLead:  'cliente',
      origem:      'ecommerce',
      ultimoPedido: numPedido,
      lojaNuvem:   loja,
    }).catch((err) => log.warn('Ecommerce', `upsertLead falhou: ${err.message}`));
  }

  // Mapping evento → trigger
  const eventTriggerMap = {
    'order/created':   'pedido_confirmado',
    'order/paid':      'pagamento_aprovado',
    'order/packed':    null,
    'order/fulfilled': 'pedido_enviado',
    'order/updated':   null,
    'order/cancelled': null,
  };

  const trigger = eventTriggerMap[event];
  if (!trigger) return;

  // Evita duplicatas
  if (await wasSentRecently(companyId, orderId, trigger)) {
    log.debug('Ecommerce', `Já enviado: ${companyId}_${orderId}_${trigger}`);
    return;
  }

  const automation = await getAutomationByTrigger(companyId, trigger);
  if (!automation) return;

  // Delay
  if (automation.delayMinutes > 0) {
    await sleep(automation.delayMinutes * 60 * 1000);
  }

  // Variáveis extras por evento
  let rastreio    = '';
  let url_rastreio = '';

  if (trigger === 'pedido_enviado') {
    const shipping = order.shipping_tracking_number || order.shipping?.number || '';
    rastreio       = shipping;
    url_rastreio   = shipping
      ? `https://rastreamento.correios.com.br/app/index.php?objetos=${shipping}`
      : '';
    // Se não há rastreio, ainda pode haver mensagem útil
    if (!rastreio) {
      rastreio = 'em processamento';
    }
  }

  if (!phone) {
    log.warn('Ecommerce', `Pedido #${numPedido}: telefone não encontrado`);
    return;
  }

  const vars = { nome, produtos, total, rastreio, url_rastreio, numero_pedido: numPedido, loja };

  try {
    await sendAutomation(automation, phone, vars);
    await markSent(companyId, orderId, trigger, phone);

    // Agenda avaliação pós-compra se for pedido_entregue
    if (trigger === 'pedido_enviado') {
      schedulePostDeliveryMessages(companyId, orderId, phone, nome, loja, produtos);
    }
  } catch (err) {
    log.error('Ecommerce', `Erro ao enviar ${trigger} para ${phone}: ${err.message}`);
  }
}

/**
 * Agenda mensagens pós-entrega (2 dias depois).
 * Simples: usa setTimeout — para produção, usar um job persistente.
 */
function schedulePostDeliveryMessages(companyId, orderId, phone, nome, loja, produtos) {
  const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

  setTimeout(async () => {
    try {
      if (await wasSentRecently(companyId, orderId, 'avaliacao_pos_compra', 72)) return;
      const automation = await getAutomationByTrigger(companyId, 'avaliacao_pos_compra');
      if (!automation) return;

      await sendAutomation(automation, phone, { nome, loja, produtos, numero_pedido: orderId });
      await markSent(companyId, orderId, 'avaliacao_pos_compra', phone);
    } catch (err) {
      log.error('Ecommerce', `avaliacao_pos_compra: ${err.message}`);
    }
  }, TWO_DAYS_MS);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export default router;
