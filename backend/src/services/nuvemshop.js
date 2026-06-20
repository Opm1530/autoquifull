/**
 * NuvemShop API Service
 *
 * Wrapper para a API REST da NuvemShop (Tiendanube).
 * Docs: https://tiendanube.github.io/api-documentation/
 *
 * Auth: header "Authentication: bearer {token}"
 * Base: https://api.nuvemshop.com.br/v1/{store_id}/
 */

import { log } from '../utils/logger.js';

const BASE_URL  = 'https://api.nuvemshop.com.br/v1';
const USER_AGENT = 'EcoQui/1.0 (suporte@ecoqui.com.br)';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function headers(accessToken) {
  return {
    'Content-Type': 'application/json',
    Authentication: `bearer ${accessToken}`,
    'User-Agent': USER_AGENT,
  };
}

async function request(method, storeId, accessToken, path, body) {
  const url = `${BASE_URL}/${storeId}${path}`;
  try {
    const res = await fetch(url, {
      method,
      headers: headers(accessToken),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      log.warn('NuvemShop', `${method} ${path} → HTTP ${res.status}: ${text.slice(0, 200)}`);
      return { ok: false, status: res.status, error: text };
    }

    if (res.status === 204) return { ok: true, data: null };

    const data = await res.json().catch(() => null);
    return { ok: true, data };
  } catch (err) {
    log.error('NuvemShop', `${method} ${path} → ${err.message}`);
    return { ok: false, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────────────────────

/**
 * Busca informações da loja — usado para validar a conexão.
 */
export async function getStoreInfo(storeId, accessToken) {
  const res = await request('GET', storeId, accessToken, '/');
  if (!res.ok) return null;
  return res.data;
}

// ─────────────────────────────────────────────────────────────
// Webhooks
// ─────────────────────────────────────────────────────────────

const WEBHOOK_EVENTS = [
  'order/created',
  'order/updated',
  'order/paid',
  'order/packed',
  'order/fulfilled',
  'order/cancelled',
];

/**
 * Registra todos os webhooks necessários.
 * Idempotente: checa antes de registrar.
 */
export async function registerWebhooks(storeId, accessToken, callbackUrl) {
  // Lista webhooks existentes
  const listRes = await request('GET', storeId, accessToken, '/webhooks');
  const existing = listRes.ok ? (listRes.data || []) : [];

  const registered = [];

  for (const event of WEBHOOK_EVENTS) {
    const alreadyExists = existing.some(
      (w) => w.event === event && w.url === callbackUrl
    );

    if (alreadyExists) {
      registered.push({ event, status: 'already_exists' });
      continue;
    }

    const res = await request('POST', storeId, accessToken, '/webhooks', {
      event,
      url: callbackUrl,
    });

    registered.push({ event, status: res.ok ? 'created' : 'error', detail: res.error });
  }

  log.ok('NuvemShop', `Webhooks registrados para loja ${storeId}: ${registered.map((r) => `${r.event}(${r.status})`).join(', ')}`);
  return registered;
}

/**
 * Remove todos os webhooks registrados pela EcoQui.
 */
export async function removeWebhooks(storeId, accessToken, callbackUrl) {
  const listRes = await request('GET', storeId, accessToken, '/webhooks');
  if (!listRes.ok) return;

  const mine = (listRes.data || []).filter((w) => w.url === callbackUrl);
  for (const wh of mine) {
    await request('DELETE', storeId, accessToken, `/webhooks/${wh.id}`);
  }
  log.ok('NuvemShop', `${mine.length} webhook(s) removido(s) para loja ${storeId}`);
}

// ─────────────────────────────────────────────────────────────
// Coupons (roleta de desconto)
// ─────────────────────────────────────────────────────────────

/**
 * Cria um cupom na loja.
 * coupon: { code, type: 'percentage'|'absolute'|'shipping', value, max_uses,
 *           min_price, start_date, end_date, combines_with_other_discounts }
 * Retorna o objeto do cupom criado ou null.
 */
export async function createCoupon(storeId, accessToken, coupon) {
  const res = await request('POST', storeId, accessToken, '/coupons', coupon);
  if (!res.ok) {
    log.warn('NuvemShop', `createCoupon falhou: ${res.status || ''} ${(res.error || '').slice(0, 300)}`);
    return { ok: false, status: res.status, error: res.error };
  }
  return { ok: true, data: res.data };
}

// ─────────────────────────────────────────────────────────────
// Products (seletor de produtos para vídeos shoppable)
// ─────────────────────────────────────────────────────────────

/**
 * Lista produtos da loja já normalizados para o seletor do painel.
 * Retorna [{ id, name, price, image, url }].
 */
export async function listProducts(storeId, accessToken, { q = '', perPage = 40 } = {}) {
  const params = new URLSearchParams({ per_page: String(perPage), published: 'true' });
  if (q) params.set('q', q);

  const res = await request('GET', storeId, accessToken, `/products?${params}`);
  if (!res.ok) return [];

  return (res.data || []).map((p) => {
    const nameRaw = p.name;
    const name = nameRaw && typeof nameRaw === 'object' ? (nameRaw.pt || Object.values(nameRaw)[0] || 'Produto') : (nameRaw || 'Produto');
    const price = p.variants && p.variants[0] ? p.variants[0].price : '';
    const image = p.images && p.images[0] ? p.images[0].src : '';
    const url   = p.canonical_url || '';
    return { id: String(p.id), name, price, image, url };
  });
}

// ─────────────────────────────────────────────────────────────
// Orders
// ─────────────────────────────────────────────────────────────

export async function getOrder(storeId, accessToken, orderId) {
  const res = await request('GET', storeId, accessToken, `/orders/${orderId}`);
  return res.ok ? res.data : null;
}

/**
 * Pedidos por cliente (para reengajamento).
 */
export async function getOrdersByCustomer(storeId, accessToken, customerId) {
  const res = await request('GET', storeId, accessToken, `/orders?customer_id=${customerId}&per_page=5&sort_by=created_at&sort_direction=desc`);
  return res.ok ? (res.data || []) : [];
}

/**
 * Busca pedidos paginados desde uma data (para o Analytics).
 * Retorna o array bruto de pedidos (campos enxutos).
 */
export async function listOrders(storeId, accessToken, { sinceISO, maxPages = 12, perPage = 200 } = {}) {
  const all = [];
  for (let page = 1; page <= maxPages; page++) {
    const params = new URLSearchParams({
      per_page: String(perPage),
      page: String(page),
      fields: 'id,total,customer,created_at,payment_status,status,products',
    });
    if (sinceISO) params.set('created_at_min', sinceISO);

    const res = await request('GET', storeId, accessToken, `/orders?${params}`);
    if (!res.ok || !Array.isArray(res.data) || !res.data.length) break;
    all.push(...res.data);
    if (res.data.length < perPage) break;
  }
  return all;
}

// ─────────────────────────────────────────────────────────────
// Abandoned Checkouts (Carrinho Abandonado)
// ─────────────────────────────────────────────────────────────

/**
 * Busca checkouts abandonados em uma janela de tempo.
 * createdAtMin / createdAtMax: strings ISO 8601.
 */
export async function getAbandonedCheckouts(storeId, accessToken, createdAtMin, createdAtMax) {
  const params = new URLSearchParams({
    status: 'open',
    per_page: '50',
    ...(createdAtMin && { created_at_min: createdAtMin }),
    ...(createdAtMax && { created_at_max: createdAtMax }),
  });

  const res = await request('GET', storeId, accessToken, `/checkouts?${params}`);
  return res.ok ? (res.data || []) : [];
}

// ─────────────────────────────────────────────────────────────
// Helpers de payload
// ─────────────────────────────────────────────────────────────

/**
 * Extrai o telefone de um pedido/checkout NuvemShop e normaliza.
 * Retorna apenas os dígitos, sem 55 (o sendText do evolution já adiciona).
 */
export function extractPhone(order) {
  const raw =
    order?.customer?.phone ||
    order?.contact_phone ||
    order?.billing_address?.phone ||
    order?.shipping_address?.phone ||
    '';

  // Remove tudo que não for dígito
  let digits = raw.replace(/\D/g, '');

  // Remove código do país 55 se vier junto
  if (digits.startsWith('55') && digits.length > 11) digits = digits.slice(2);

  return digits || null;
}

/**
 * Extrai nome do cliente.
 */
export function extractName(order) {
  return (
    order?.customer?.name ||
    order?.customer?.first_name ||
    order?.contact_name ||
    'Cliente'
  );
}

/**
 * Formata total em R$.
 */
export function formatTotal(value) {
  const num = parseFloat(value || '0');
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
}

/**
 * Extrai lista de produtos como texto.
 */
export function extractProducts(order) {
  const products = order?.products || order?.items || [];
  if (!products.length) return '';
  return products
    .map((p) => `• ${p.name || p.product_name || 'Produto'} (x${p.quantity || 1})`)
    .join('\n');
}
