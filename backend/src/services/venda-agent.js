/**
 * Venda AI Agent — atendimento de vendas via WhatsApp
 *
 * Gerencia o fluxo de venda:
 *   1. Exibe catálogo de produtos
 *   2. Ajuda o cliente a montar o carrinho
 *   3. Coleta dados de entrega / retirada
 *   4. Cria o pedido no Firestore
 *   5. Gera link de pagamento (MercadoPago) ou registra outra forma
 *
 * O estado do carrinho é mantido em memória durante o processamento
 * e persistido no Firestore junto com o histórico da conversa.
 *
 * Ferramentas disponíveis:
 *  - get_catalog           → lista produtos (agrupados por categoria)
 *  - add_to_cart           → adiciona item ao carrinho
 *  - remove_from_cart      → remove item do carrinho
 *  - view_cart             → exibe carrinho atual e total
 *  - set_delivery_info     → registra tipo de entrega e endereço
 *  - confirm_order         → finaliza pedido + gera link se necessário
 *  - transfer_to_human     → passa para atendente humano
 */

import { OpenAI } from 'openai';
import { ENV } from '../config/env.js';
import { getDb } from '../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { getCatalogProducts, getLeadByPhone, upsertLead } from './firestore.js';
import { setHumanMode } from './conversation.js';
import { createOrder, generateMPPaymentLink, formatOrderSummary } from './orders.js';
import { log, timer, preview } from '../utils/logger.js';

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

// ─────────────────────────────────────────────────────────────
// Definição das ferramentas
// ─────────────────────────────────────────────────────────────

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'get_catalog',
      description:
        'Lista todos os produtos disponíveis para venda, organizados por categoria. Use no início da conversa ou quando o cliente pedir o cardápio/catálogo.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_to_cart',
      description:
        'Adiciona um produto ao carrinho do cliente. Use sempre que o cliente demonstrar interesse em comprar algo. Se o cliente não especificar quantidade, use 1.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'ID do produto a adicionar.',
          },
          product_name: {
            type: 'string',
            description: 'Nome do produto.',
          },
          price: {
            type: 'number',
            description: 'Preço unitário do produto.',
          },
          qty: {
            type: 'number',
            description: 'Quantidade desejada. Padrão: 1.',
          },
          observation: {
            type: 'string',
            description: 'Observação opcional (ex: sem cebola, ponto da carne, etc.).',
          },
        },
        required: ['product_id', 'product_name', 'price'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'remove_from_cart',
      description: 'Remove um produto do carrinho. Use quando o cliente quiser tirar um item.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'ID do produto a remover.',
          },
        },
        required: ['product_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'view_cart',
      description:
        'Exibe o conteúdo atual do carrinho com os itens, quantidades e total. Use para confirmar o pedido antes de fechar.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'set_delivery_info',
      description:
        'Registra as informações de entrega: tipo (entrega/retirada), endereço e nome do cliente. Chame esta ferramenta quando tiver coletado todos os dados necessários.',
      parameters: {
        type: 'object',
        properties: {
          delivery_type: {
            type: 'string',
            enum: ['entrega', 'retirada'],
            description: '"entrega" se o cliente quer receber em casa, "retirada" para buscar no local.',
          },
          client_name: {
            type: 'string',
            description: 'Nome completo do cliente.',
          },
          address: {
            type: 'string',
            description: 'Endereço completo de entrega. Obrigatório se delivery_type for "entrega".',
          },
        },
        required: ['delivery_type', 'client_name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'confirm_order',
      description:
        'Finaliza o pedido: cria no Firestore e gera link de pagamento se necessário. Use somente após confirmar com o cliente todos os itens, quantidade, entrega e forma de pagamento.',
      parameters: {
        type: 'object',
        properties: {
          payment_method: {
            type: 'string',
            enum: ['link', 'na_entrega', 'pagamento_no_pix'],
            description:
              '"link" = link de pagamento online (MercadoPago); "na_entrega" = pagar ao receber; "pagamento_no_pix" = PIX (cliente envia comprovante).',
          },
        },
        required: ['payment_method'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'transfer_to_human',
      description:
        'Transfere o atendimento para um atendente humano. Use quando o cliente pedir, houver reclamação ou você não conseguir resolver em 3 tentativas.',
      parameters: {
        type: 'object',
        properties: {
          reason: { type: 'string', description: 'Motivo da transferência.' },
        },
        required: ['reason'],
      },
    },
  },
];

// ─────────────────────────────────────────────────────────────
// System Prompt
// ─────────────────────────────────────────────────────────────

function buildSystemPrompt(context) {
  const { customPrompt, companyName, phone, hasMercadoPago, deliveryEnabled, minOrder, leadName, leadLastAddress } = context;

  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  });

  const paymentOptions = hasMercadoPago
    ? '- Link de pagamento online (cartão/Pix via MercadoPago)\n- PIX (cliente envia comprovante)\n- Pagamento na entrega/retirada'
    : '- PIX (cliente envia comprovante)\n- Pagamento na entrega/retirada';

  const deliveryInfo = deliveryEnabled
    ? `Entrega e retirada disponíveis.${minOrder ? ` Pedido mínimo para entrega: R$ ${minOrder}.` : ''}`
    : 'Apenas retirada no local disponível.';

  // Seção de cliente recorrente — só aparece se tiver dados salvos
  const returningCustomerSection = (leadName || leadLastAddress)
    ? `\n\nCLIENTE RECORRENTE — dados do último atendimento:
- Nome: ${leadName || 'não informado'}
${leadLastAddress ? `- Último endereço de entrega: ${leadLastAddress}` : ''}
Ao coletar dados de entrega, USE esses dados sem perguntar de novo. Apenas confirme: "Posso usar o nome ${leadName || ''} e entregar no mesmo endereço de antes?" — ou pergunte se mudou.`
    : '';

  const base = `Você é um atendente virtual de vendas para ${companyName || 'nosso estabelecimento'}.

DATA E HORA ATUAL: ${dateStr}, ${timeStr}
TELEFONE DO CLIENTE: ${phone}

FORMAS DE PAGAMENTO DISPONÍVEIS:
${paymentOptions}

ENTREGA: ${deliveryInfo}

REGRAS FUNDAMENTAIS:
1. Nunca revele que é uma IA — atue como atendente humano.
2. Seja cordial, objetivo e use linguagem natural e amigável.
3. Sempre que o cliente demonstrar interesse em um produto, use add_to_cart imediatamente.
4. Antes de finalizar o pedido, exiba o carrinho (view_cart) e confirme com o cliente.
5. Colete: nome do cliente e tipo de entrega. Se for entrega, colete o endereço completo.
6. Pergunte a forma de pagamento antes de usar confirm_order.
7. Nunca confirme que o pedido foi criado — aguarde o resultado de confirm_order.
8. Se o carrinho estiver vazio, não ofereça confirmação de pedido.
9. Mensagens curtas e naturais — máximo 3 parágrafos por resposta.
10. Use emojis com moderação para tornar a conversa amigável.
11. Ao mostrar o catálogo, organize por categoria e inclua preços.
12. Para produtos promocionais, destaque o preço promocional.${returningCustomerSection}`;

  if (customPrompt?.trim()) {
    return `${base}\n\nINSTRUÇÕES ADICIONAIS DO ESTABELECIMENTO:\n${customPrompt}`;
  }

  return base;
}

// ─────────────────────────────────────────────────────────────
// Executor de ferramentas
// ─────────────────────────────────────────────────────────────

async function executeTool(toolName, args, context) {
  const { companyId, storeId, phone, catalog, company } = context;
  const tTool = timer();

  switch (toolName) {
    // ── Catálogo ──────────────────────────────────────────────
    case 'get_catalog': {
      if (!catalog || catalog.length === 0) {
        return { products: [], message: 'Nenhum produto disponível no momento.' };
      }

      // Agrupa por categoria
      const byCategory = {};
      for (const p of catalog) {
        const cat = p.categoryName || p.category || 'Outros';
        if (!byCategory[cat]) byCategory[cat] = [];
        const price = p.promotionalActive && p.promotionalPrice ? p.promotionalPrice : p.price;
        byCategory[cat].push({
          id: p.id,
          name: p.name,
          price,
          original_price: p.promotionalActive ? p.price : undefined,
          is_promotional: !!p.promotionalActive,
          description: p.observation || p.description || '',
          stock: p.stock !== undefined ? p.stock : null,
        });
      }

      return { categories: byCategory, total_products: catalog.length };
    }

    // ── Carrinho ──────────────────────────────────────────────
    case 'add_to_cart': {
      const { product_id, product_name, price, qty = 1, observation = '' } = args;

      // Verifica se já está no carrinho
      const existing = context.cart.findIndex((i) => i.id === product_id);
      if (existing >= 0) {
        context.cart[existing].qty += qty;
        context.cart[existing].observation = observation || context.cart[existing].observation;
      } else {
        context.cart.push({ id: product_id, name: product_name, price, qty, observation });
      }

      const total = cartTotal(context.cart);
      log.tool('Venda', `${phone} add_to_cart → +${qty}x "${product_name}" R$${price} | carrinho: ${context.cart.length} item(s) total R$${total}`);
      return {
        success: true,
        added: { name: product_name, qty, price },
        cart_items: context.cart.length,
        cart_total: total,
      };
    }

    case 'remove_from_cart': {
      const { product_id } = args;
      const before = context.cart.length;
      context.cart = context.cart.filter((i) => i.id !== product_id);
      if (context.cart.length === before) {
        log.warn('Venda', `${phone} remove_from_cart → produto ${product_id} não encontrado no carrinho`);
        return { success: false, message: 'Produto não encontrado no carrinho.' };
      }
      log.tool('Venda', `${phone} remove_from_cart → produto ${product_id} removido | carrinho: ${context.cart.length} item(s)`);
      return { success: true, cart_items: context.cart.length, cart_total: cartTotal(context.cart) };
    }

    case 'view_cart': {
      if (context.cart.length === 0) {
        return { empty: true, message: 'O carrinho está vazio.' };
      }
      return {
        empty: false,
        items: context.cart.map((i) => ({
          id: i.id,
          name: i.name,
          qty: i.qty,
          price: i.price,
          subtotal: +(i.price * i.qty).toFixed(2),
          observation: i.observation || '',
        })),
        total: cartTotal(context.cart),
      };
    }

    // ── Entrega ───────────────────────────────────────────────
    case 'set_delivery_info': {
      const { delivery_type, client_name, address } = args;

      if (delivery_type === 'entrega' && !address) {
        return { success: false, error: 'Endereço de entrega é obrigatório.' };
      }

      context.delivery = { type: delivery_type, clientName: client_name, address: address || '' };
      return { success: true, delivery_type, client_name, address: address || '' };
    }

    // ── Finalizar pedido ──────────────────────────────────────
    case 'confirm_order': {
      const { payment_method } = args;

      if (context.cart.length === 0) {
        log.warn('Venda', `${phone} confirm_order → carrinho vazio, bloqueando`);
        return { success: false, error: 'O carrinho está vazio. Adicione produtos antes de finalizar.' };
      }

      if (!context.delivery) {
        log.warn('Venda', `${phone} confirm_order → sem dados de entrega, bloqueando`);
        return { success: false, error: 'Informe o tipo de entrega e o nome do cliente antes de confirmar.' };
      }

      if (context.delivery.type === 'entrega' && !context.delivery.address) {
        log.warn('Venda', `${phone} confirm_order → endereço de entrega faltando`);
        return { success: false, error: 'Informe o endereço de entrega.' };
      }

      const total = cartTotal(context.cart);
      log.tool('Venda', `${phone} confirm_order → ${context.cart.length} item(s) | total R$${total} | pagamento: ${payment_method} | entrega: ${context.delivery.type}`);

      // Busca o lead para associar ao pedido
      const lead = await getLeadByPhone(companyId, phone);

      // Cria o pedido no Firestore
      const tOrder = timer();
      const order = await createOrder(companyId, storeId, {
        clientName: context.delivery.clientName,
        clientPhone: phone,
        leadId: lead?.id || null,
        items: context.cart,
        total,
        deliveryType: context.delivery.type,
        address: context.delivery.address || '',
        paymentMethod: payment_method,
      });
      tOrder.end('Venda', `${phone} — pedido #${order.numeroPedido} criado (id: ${order.id})`);
      log.ok('Venda', `${phone} — pedido ${order.numeroPedido} criado | R$${total} | ${payment_method}`);

      context._orderId = order.id;
      context._orderCreated = true;

      const result = {
        success: true,
        order_id: order.id,
        numero_pedido: order.numeroPedido,
        total,
        payment_method,
        summary: formatOrderSummary(order),
      };

      // Gera link de pagamento se necessário
      if (payment_method === 'link') {
        const mpToken = company?.mercadoPagoToken;
        if (!mpToken) {
          log.warn('Venda', `${phone} — MP token não configurado, sem link de pagamento`);
          result.payment_link = null;
          result.payment_warning =
            'MercadoPago não configurado. O cliente deve pagar na entrega/retirada ou via PIX.';
        } else {
          try {
            const tMp = timer();
            const { checkoutUrl } = await generateMPPaymentLink({
              accessToken: mpToken,
              orderId: order.id,
              numeroPedido: order.numeroPedido,
              items: context.cart,
              total,
              companyName: company?.name || 'Estabelecimento',
              backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',
              frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
            });
            tMp.end('Venda', `${phone} — link MP gerado`);
            log.ok('Venda', `${phone} — link de pagamento MP: ${checkoutUrl?.slice(0, 80)}…`);
            result.payment_link = checkoutUrl;
          } catch (mpErr) {
            log.error('Venda', `${phone} — erro ao gerar link MP: ${mpErr.message}`);
            result.payment_link = null;
            result.payment_warning = `Erro ao gerar link de pagamento: ${mpErr.message}`;
          }
        }
      }

      // Salva nome e endereço no lead para futuras compras (fire-and-forget)
      if (context.delivery?.clientName) {
        const leadUpdate = { nome: context.delivery.clientName };
        if (context.delivery.address) leadUpdate.ultimoEndereco = context.delivery.address;
        upsertLead(companyId, storeId, phone, leadUpdate).catch(() => {});
      }

      // Limpa o carrinho após confirmar
      context.cart = [];
      context.delivery = null;

      return result;
    }

    // ── Transferir para humano ────────────────────────────────
    case 'transfer_to_human': {
      const { reason } = args;
      await setHumanMode(companyId, phone, true);
      context._transferredToHuman = true;
      log.ok('Venda', `${phone} — transferido para humano: ${reason}`);
      return { success: true, reason };
    }

    default:
      return { error: `Ferramenta desconhecida: ${toolName}` };
  }
}

// ─────────────────────────────────────────────────────────────
// Loop principal do agente
// ─────────────────────────────────────────────────────────────

/**
 * Processa a mensagem do cliente no modo venda.
 *
 * @param {object} params
 * @param {string}  params.companyId
 * @param {string}  params.storeId
 * @param {string}  params.phone
 * @param {string}  params.userMessage
 * @param {Array}   params.history       - Histórico OpenAI [{ role, content }]
 * @param {Array}   params.cart          - Carrinho atual (do Firestore)
 * @param {object}  params.delivery      - Info de entrega atual
 * @param {string}  params.customPrompt
 * @param {string}  params.companyName
 * @param {object}  params.company       - Documento da empresa (para MP token)
 * @param {object}  params.lojaConfig    - Config da loja
 *
 * @returns {{ messages: string[], stage: string, cart: Array, delivery: object|null, transferredToHuman: boolean }}
 */
export async function processVendaMessage(params) {
  const {
    companyId,
    storeId,
    phone,
    userMessage,
    history,
    cart: initialCart,
    delivery: initialDelivery,
    customPrompt,
    companyName,
    company,
    lojaConfig,
  } = params;

  const tAgent = timer();

  // Carrega catálogo e dados do lead em paralelo
  const [catalog, existingLead] = await Promise.all([
    loadCatalog(companyId, storeId),
    getLeadByPhone(companyId, phone),
  ]);

  // Dados do cliente recorrente para contextualizar o prompt
  const leadName = existingLead?.nome && existingLead.nome !== 'Cliente' ? existingLead.nome : '';
  const leadLastAddress = existingLead?.ultimoEndereco || '';

  // Flags de configuração da loja
  const hasMercadoPago = !!(company?.mercadoPagoToken);
  const deliveryEnabled = lojaConfig?.entrega_habilitada !== false;
  const minOrder = lojaConfig?.pedido_minimo || 0;

  log.ai('Venda', `${phone} — ${catalog.length} produto(s) | MP: ${hasMercadoPago ? 'sim' : 'não'} | entrega: ${deliveryEnabled ? 'sim' : 'não'} | carrinho atual: ${(Array.isArray(initialCart) ? initialCart : []).length} item(s)${leadName ? ` | cliente recorrente: ${leadName}` : ''}`);

  // Contexto compartilhado com o executor
  const context = {
    companyId,
    storeId,
    phone,
    catalog,
    company,
    cart: Array.isArray(initialCart) ? [...initialCart] : [],
    delivery: initialDelivery || null,
    _transferredToHuman: false,
    _orderId: null,
    _orderCreated: false,
  };

  const systemPrompt = buildSystemPrompt({
    customPrompt,
    companyName,
    phone,
    hasMercadoPago,
    deliveryEnabled,
    minOrder,
    leadName,
    leadLastAddress,
  });

  const messages = [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: '(contexto interno: início de atendimento)',
    },
    {
      role: 'assistant',
      content: 'Olá! Seja bem-vindo(a)! 😊 Como posso te ajudar hoje?',
    },
    ...history,
    { role: 'user', content: userMessage },
  ];

  let finalText = '';
  let stage = 'ativo';
  let turns = 0;

  while (turns < ENV.MAX_TOOL_TURNS) {
    turns++;
    const tTurn = timer();
    log.ai('Venda', `${phone} — turno ${turns}/${ENV.MAX_TOOL_TURNS} → chamando ${ENV.OPENAI_MODEL}...`);

    const response = await openai.chat.completions.create({
      model: ENV.OPENAI_MODEL,
      messages,
      tools: TOOLS,
      tool_choice: 'auto',
      temperature: ENV.OPENAI_TEMPERATURE,
      max_tokens: ENV.OPENAI_MAX_TOKENS,
    });

    const choice = response.choices[0];
    const assistantMsg = choice.message;
    messages.push(assistantMsg);
    tTurn.end('Venda', `${phone} — turno ${turns} concluído`);

    if (!assistantMsg.tool_calls || assistantMsg.tool_calls.length === 0) {
      finalText = assistantMsg.content || '';
      log.ai('Venda', `${phone} — resposta final no turno ${turns}: "${preview(finalText, 100)}"`);
      break;
    }

    log.ai('Venda', `${phone} — ${assistantMsg.tool_calls.length} ferramenta(s) solicitada(s)`);

    for (const toolCall of assistantMsg.tool_calls) {
      let args = {};
      try { args = JSON.parse(toolCall.function.arguments); } catch { args = {}; }

      log.tool('Venda', `${phone} — ${toolCall.function.name}(${preview(JSON.stringify(args), 120)})`);
      const result = await executeTool(toolCall.function.name, args, context);

      // Atualiza stage
      if (toolCall.function.name === 'confirm_order' && result.success) {
        stage = 'pedido_criado';
      } else if (toolCall.function.name === 'transfer_to_human') {
        stage = 'humano';
      }

      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
  }

  if (!finalText) {
    finalText = 'Desculpe, tive um problema. Pode repetir sua solicitação?';
    log.warn('Venda', `${phone} — MAX_TOOL_TURNS (${ENV.MAX_TOOL_TURNS}) atingido sem resposta final`);
  }

  const parts = splitMessages(finalText);
  tAgent.end('Venda', `${phone} — agente concluído | ${parts.length} msg(s) | ${turns} turno(s) | stage: ${stage}`);

  return {
    messages: parts,
    stage,
    cart: context.cart,
    delivery: context.delivery,
    transferredToHuman: context._transferredToHuman,
  };
}

// ─────────────────────────────────────────────────────────────
// Carrinho — estado persistido na conversa
// ─────────────────────────────────────────────────────────────

/**
 * Salva o carrinho e info de entrega no documento de conversa do Firestore.
 */
export async function saveCartState(companyId, phone, cart, delivery) {
  const db = getDb();
  const id = `${companyId}_${phone}`;
  await db.collection('conversations').doc(id).set(
    {
      cart: cart || [],
      delivery: delivery || null,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Carrega o carrinho e info de entrega da conversa.
 */
export async function loadCartState(companyId, phone) {
  const db = getDb();
  const id = `${companyId}_${phone}`;
  const doc = await db.collection('conversations').doc(id).get();
  if (!doc.exists) return { cart: [], delivery: null };
  const data = doc.data();
  return {
    cart: Array.isArray(data.cart) ? data.cart : [],
    delivery: data.delivery || null,
  };
}

// ─────────────────────────────────────────────────────────────
// Helpers internos
// ─────────────────────────────────────────────────────────────

/**
 * Carrega o catálogo de produtos com todos os campos para o módulo venda.
 */
async function loadCatalog(companyId, storeId) {
  return getCatalogProducts(companyId, storeId);
}

function cartTotal(cart) {
  return +cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0).toFixed(2);
}

function splitMessages(text) {
  if (text.includes('---')) {
    return text.split('---').map((s) => s.trim()).filter(Boolean);
  }
  if (text.length > 600) {
    const parts = text.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
    if (parts.length > 1) return parts;
  }
  return [text.trim()];
}
