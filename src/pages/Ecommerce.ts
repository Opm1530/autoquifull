import { authService } from '../services/auth';

// ─────────────────────────────────────────────────────────────
// Definição das automações disponíveis
// ─────────────────────────────────────────────────────────────
const TRIGGERS = [
  {
    id: 'carrinho_abandonado',
    label: 'Carrinho Abandonado',
    icon: 'fa-cart-shopping',
    color: '#f59e0b',
    badge: 'Polling 30min',
    desc: 'Cliente adicionou produtos ao carrinho mas não finalizou a compra.',
    vars: ['{{nome}}', '{{produtos}}', '{{total}}', '{{link_carrinho}}', '{{loja}}'],
    defaultDelay: 60,
    defaultMsg:
      'Olá, {{nome}}! 🛒\n\nVocê deixou alguns itens no carrinho na *{{loja}}*!\n\n{{produtos}}\n\n💰 Total: *{{total}}*\n\n👉 Finalize seu pedido aqui: {{link_carrinho}}\n\nQualquer dúvida, é só chamar! 😊',
  },
  {
    id: 'pagamento_aprovado',
    label: 'Pagamento Aprovado',
    icon: 'fa-circle-check',
    color: '#10b981',
    badge: 'Webhook',
    desc: 'Enviado assim que o pagamento é confirmado na plataforma.',
    vars: ['{{nome}}', '{{numero_pedido}}', '{{total}}', '{{loja}}'],
    defaultDelay: 0,
    defaultMsg:
      'Olá, {{nome}}! ✅\n\nSeu pagamento foi *aprovado* com sucesso!\n\n📦 Pedido *#{{numero_pedido}}* — {{total}}\n\nEstamos separando tudo para você. Em breve seu pedido será despachado! 🚀\n\nObrigado por comprar na *{{loja}}*!',
  },
  {
    id: 'pedido_enviado',
    label: 'Pedido Enviado + Rastreio',
    icon: 'fa-truck',
    color: '#3b82f6',
    badge: 'Webhook',
    desc: 'Enviado quando o pedido é despachado. Inclui o código de rastreamento.',
    vars: ['{{nome}}', '{{numero_pedido}}', '{{rastreio}}', '{{url_rastreio}}', '{{loja}}'],
    defaultDelay: 0,
    defaultMsg:
      'Oba, {{nome}}! 📦 Seu pedido *#{{numero_pedido}}* saiu para entrega!\n\n🔍 Código de rastreio: *{{rastreio}}*\n📍 Acompanhe aqui: {{url_rastreio}}\n\nQualquer dúvida estamos aqui! 😊 — *{{loja}}*',
  },
  {
    id: 'avaliacao_pos_compra',
    label: 'Avaliação Pós-Compra',
    icon: 'fa-star',
    color: '#8b5cf6',
    badge: '2 dias após entrega',
    desc: 'Solicita avaliação 2 dias depois de o pedido ser marcado como enviado.',
    vars: ['{{nome}}', '{{numero_pedido}}', '{{loja}}'],
    defaultDelay: 2880,
    defaultMsg:
      'Olá, {{nome}}! ⭐\n\nEsperamos que tenha adorado seu pedido *#{{numero_pedido}}*!\n\nNossa missão é te deixar cada vez mais satisfeito.\n\nVocê pode deixar uma avaliação? Leva menos de 1 minuto e nos ajuda muito! 🙏\n\n— *{{loja}}*',
  },
  {
    id: 'boleto_lembrete',
    label: 'Lembrete de Boleto / PIX',
    icon: 'fa-barcode',
    color: '#ef4444',
    badge: 'A cada hora',
    desc: 'Lembra o cliente de pagar o boleto ou PIX pendente após X horas.',
    vars: ['{{nome}}', '{{numero_pedido}}', '{{total}}', '{{tipo_pagamento}}', '{{chave_pix}}', '{{link_pagamento}}', '{{loja}}'],
    defaultDelay: 10,
    defaultMsg:
      'Oi, {{nome}}! 📄\n\nNotamos que o {{tipo_pagamento}} do seu pedido *#{{numero_pedido}}* ainda não foi pago.\n\n💰 Valor: *{{total}}*\n\n{{chave_pix}}{{link_pagamento}}\n\nQualquer dúvida estamos aqui! 😊 — *{{loja}}*',
  },
  {
    id: 'reengajamento',
    label: 'Reengajamento de Clientes',
    icon: 'fa-rotate',
    color: '#6366f1',
    badge: 'Diário 09h',
    desc: 'Envia mensagem para clientes que não compram há X dias.',
    vars: ['{{nome}}', '{{dias_sem_comprar}}', '{{loja}}'],
    defaultDelay: 43200,
    defaultMsg:
      'Olá, {{nome}}! 💜\n\nFaz *{{dias_sem_comprar}} dias* que você não visita a *{{loja}}* e sentimos sua falta!\n\nTemos novidades esperando por você. Que tal dar uma olhada? 👇\n\nQualquer dúvida, é só chamar! 😊',
  },
];

// ─────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────

export const Ecommerce = async (): Promise<string> => {
  return `
    <style>
      .ec-wrap { max-width: 960px; margin: 0 auto; }

      /* ── Plataformas ── */
      .ec-platforms { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
      .ec-platform-card {
        display: flex; align-items: center; gap: 14px;
        padding: 1.1rem 1.5rem;
        background: var(--surface-color);
        border: 2px solid var(--border-color);
        border-radius: var(--radius-xl);
        cursor: pointer; transition: all 0.2s; flex: 1; min-width: 200px;
        box-shadow: var(--shadow-sm);
      }
      .ec-platform-card:hover { border-color: var(--primary); transform: translateY(-2px); }
      .ec-platform-card.active { border-color: var(--primary); background: rgba(99,102,241,0.05); }
      .ec-platform-logo { width: 40px; height: 40px; border-radius: 10px; object-fit: contain; background: #f8f9fa; padding: 6px; }
      .ec-platform-info strong { display: block; font-size: 0.95rem; font-weight: 700; }
      .ec-platform-info span { font-size: 0.8rem; color: var(--text-dim); }
      .ec-platform-coming {
        display: flex; align-items: center; gap: 14px;
        padding: 1.1rem 1.5rem;
        background: var(--surface-hover);
        border: 2px dashed var(--border-color);
        border-radius: var(--radius-xl);
        flex: 1; min-width: 200px; opacity: 0.6;
      }
      .ec-platform-coming .ec-platform-logo { opacity: 0.5; }

      /* ── Connection card ── */
      .ec-connect-card {
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: var(--shadow-sm);
      }
      .ec-connect-header { display: flex; align-items: center; gap: 14px; margin-bottom: 1.5rem; }
      .ec-connect-icon {
        width: 48px; height: 48px; border-radius: 14px;
        background: rgba(99,102,241,0.1);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.4rem; color: var(--primary);
      }
      .ec-connect-status-dot {
        width: 10px; height: 10px; border-radius: 50%;
        background: var(--danger); display: inline-block; margin-right: 6px;
      }
      .ec-connect-status-dot.connected { background: var(--success); }
      .ec-connect-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
      @media(max-width:640px){ .ec-connect-form { grid-template-columns: 1fr; } }
      .ec-field { display: flex; flex-direction: column; gap: 6px; }
      .ec-field label { font-size: 0.78rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; }
      .ec-field input {
        background: var(--surface-hover); border: 1px solid var(--border-color);
        border-radius: var(--radius-md); padding: 0.65rem 0.9rem;
        color: var(--text-main); font-size: 0.9rem; font-family: inherit;
        transition: border-color 0.2s;
      }
      .ec-field input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-glow); }
      .ec-connect-actions { display: flex; gap: 0.75rem; margin-top: 1.25rem; flex-wrap: wrap; }

      /* ── Buttons ── */
      .ec-btn {
        padding: 0.65rem 1.3rem; border-radius: var(--radius-lg); font-weight: 600;
        font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 8px;
        transition: all 0.2s;
      }
      .ec-btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 12px var(--primary-glow); }
      .ec-btn-primary:hover { background: var(--primary-hover); transform: translateY(-1px); }
      .ec-btn-secondary { background: var(--surface-hover); color: var(--text-main); border: 1px solid var(--border-color); }
      .ec-btn-secondary:hover { background: var(--surface-light); }
      .ec-btn-danger { background: rgba(239,68,68,0.1); color: var(--danger); border: 1px solid rgba(239,68,68,0.2); }
      .ec-btn-danger:hover { background: var(--danger); color: white; }
      .ec-btn-success { background: rgba(16,185,129,0.1); color: var(--success); border: 1px solid rgba(16,185,129,0.2); }
      .ec-btn-success:hover { background: var(--success); color: white; }
      .ec-btn[disabled] { opacity: 0.5; cursor: not-allowed; transform: none !important; }

      /* ── Connected info ── */
      .ec-store-info {
        display: flex; align-items: center; gap: 1rem;
        background: rgba(16,185,129,0.06);
        border: 1px solid rgba(16,185,129,0.2);
        border-radius: var(--radius-lg); padding: 1rem 1.25rem;
        margin-bottom: 1.5rem;
      }
      .ec-store-info i { font-size: 1.5rem; color: var(--success); }
      .ec-store-info strong { display: block; font-size: 0.95rem; }
      .ec-store-info span { font-size: 0.82rem; color: var(--text-dim); }

      /* ── Tabs ── */
      .ec-tabs { display: flex; gap: 4px; background: var(--surface-hover); border-radius: var(--radius-lg); padding: 4px; margin-bottom: 1.75rem; width: fit-content; }
      .ec-tab {
        padding: 0.5rem 1.2rem; border-radius: var(--radius-md); font-size: 0.875rem; font-weight: 600;
        color: var(--text-muted); cursor: pointer; transition: all 0.2s; border: none; background: none;
        display: flex; align-items: center; gap: 7px;
      }
      .ec-tab.active { background: var(--surface-color); color: var(--text-main); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
      .ec-tab:hover:not(.active) { color: var(--text-main); }

      /* ── Automação card ── */
      .ec-automations { display: flex; flex-direction: column; gap: 1rem; }
      .ec-auto-card {
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
        transition: box-shadow 0.2s;
      }
      .ec-auto-card:hover { box-shadow: var(--shadow-md); }
      .ec-auto-card.enabled { border-left: 4px solid var(--color); }
      .ec-auto-header {
        display: flex; align-items: center; gap: 14px;
        padding: 1.1rem 1.5rem; cursor: pointer;
      }
      .ec-auto-icon {
        width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
      }
      .ec-auto-info { flex: 1; min-width: 0; }
      .ec-auto-info strong { display: block; font-size: 0.92rem; font-weight: 700; }
      .ec-auto-info span { font-size: 0.8rem; color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; }
      .ec-auto-badge {
        font-size: 0.68rem; font-weight: 700; padding: 3px 9px; border-radius: 99px;
        background: var(--surface-hover); color: var(--text-dim); white-space: nowrap; flex-shrink: 0;
      }
      .ec-auto-toggle-area { display: flex; align-items: center; gap: 10px; }

      /* Toggle switch */
      .ec-toggle { position: relative; width: 42px; height: 22px; flex-shrink: 0; }
      .ec-toggle input { opacity: 0; width: 0; height: 0; }
      .ec-toggle-slider {
        position: absolute; inset: 0; background: var(--surface-light);
        border-radius: 22px; cursor: pointer; transition: 0.3s;
      }
      .ec-toggle-slider:before {
        content: ''; position: absolute;
        width: 16px; height: 16px; left: 3px; top: 3px;
        background: white; border-radius: 50%; transition: 0.3s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      }
      .ec-toggle input:checked + .ec-toggle-slider { background: var(--success); }
      .ec-toggle input:checked + .ec-toggle-slider:before { transform: translateX(20px); }

      .ec-auto-body { padding: 0 1.5rem 1.5rem; display: none; border-top: 1px solid var(--border-color); }
      .ec-auto-card.open .ec-auto-body { display: block; padding-top: 1.25rem; }
      .ec-auto-card.open .ec-auto-chevron { transform: rotate(180deg); }
      .ec-auto-chevron { transition: transform 0.2s; color: var(--text-dim); font-size: 0.8rem; }

      .ec-auto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
      @media(max-width:640px){ .ec-auto-grid { grid-template-columns: 1fr; } }

      .ec-template-area { margin-bottom: 1rem; }
      .ec-template-area label { font-size: 0.78rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; display: block; }
      .ec-template-area textarea {
        width: 100%; min-height: 130px; resize: vertical;
        background: var(--surface-hover); border: 1px solid var(--border-color);
        border-radius: var(--radius-md); padding: 0.75rem; color: var(--text-main);
        font-size: 0.875rem; font-family: inherit; line-height: 1.6;
        transition: border-color 0.2s;
      }
      .ec-template-area textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-glow); }

      .ec-vars { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1rem; }
      .ec-var-chip {
        font-size: 0.72rem; padding: 3px 8px; border-radius: 6px; cursor: pointer;
        background: rgba(99,102,241,0.1); color: var(--primary); font-family: monospace;
        border: 1px solid rgba(99,102,241,0.2); transition: all 0.15s; font-weight: 600;
      }
      .ec-var-chip:hover { background: var(--primary); color: white; }

      .ec-auto-footer { display: flex; justify-content: space-between; align-items: center; }

      /* ── Histórico ── */
      .ec-history-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
      .ec-history-table th { text-align: left; padding: 0.75rem 1rem; background: var(--surface-hover); color: var(--text-dim); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-color); }
      .ec-history-table td { padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-color); color: var(--text-main); }
      .ec-history-table tr:last-child td { border-bottom: none; }
      .ec-history-table tr:hover td { background: var(--surface-hover); }

      /* ── States ── */
      .ec-empty { text-align: center; padding: 4rem 2rem; color: var(--text-dim); }
      .ec-empty i { font-size: 3rem; margin-bottom: 1rem; opacity: 0.3; display: block; }
      .ec-empty h3 { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 0.5rem; }

      .ec-alert { padding: 0.85rem 1.1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem; font-size: 0.875rem; display: flex; align-items: flex-start; gap: 10px; }
      .ec-alert.info { background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2); color: #3b82f6; }
      .ec-alert.warning { background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.2); color: #f59e0b; }

      .ec-select {
        background: var(--surface-hover); border: 1px solid var(--border-color);
        border-radius: var(--radius-md); padding: 0.65rem 0.9rem;
        color: var(--text-main); font-size: 0.875rem; font-family: inherit; width: 100%;
      }
      .ec-select:focus { outline: none; border-color: var(--primary); }

      .ec-delay-row { display: flex; align-items: center; gap: 8px; }
      .ec-delay-row input[type="number"] {
        width: 90px; background: var(--surface-hover); border: 1px solid var(--border-color);
        border-radius: var(--radius-md); padding: 0.65rem 0.75rem; color: var(--text-main);
        font-size: 0.875rem; text-align: center;
      }
      .ec-delay-row input[type="number"]:focus { outline: none; border-color: var(--primary); }
      .ec-delay-label { font-size: 0.8rem; color: var(--text-dim); }
    </style>

    <div class="ec-wrap" id="ecommerce-page">
      <!-- Header -->
      <div class="page-header" style="justify-content: space-between; align-items: flex-start; flex-direction: column; gap: 0.5rem; margin-bottom: 1.75rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main);">E-commerce</h2>
          <p style="color: var(--text-dim); font-size: 0.9rem; margin-top: 4px;">Conecte sua loja e dispare mensagens automáticas no WhatsApp.</p>
        </div>
      </div>

      <!-- Plataformas -->
      <div class="ec-platforms">
        <div class="ec-platform-card active" id="btn-plat-nuvemshop" onclick="window.ecSelectPlatform('nuvemshop')">
          <img class="ec-platform-logo" src="https://www.nuvemshop.com.br/favicon.ico" onerror="this.src='https://via.placeholder.com/40'" alt="NuvemShop">
          <div class="ec-platform-info">
            <strong>NuvemShop</strong>
            <span>Nuvemshop.com.br</span>
          </div>
          <i class="fa-solid fa-circle-check" style="color: var(--primary); margin-left: auto;"></i>
        </div>
        <div class="ec-platform-coming">
          <img class="ec-platform-logo" src="https://www.shopify.com/favicon.ico" alt="Shopify">
          <div class="ec-platform-info">
            <strong>Shopify</strong>
            <span>Em breve</span>
          </div>
        </div>
        <div class="ec-platform-coming">
          <img class="ec-platform-logo" src="https://www.woocommerce.com/favicon.ico" alt="WooCommerce">
          <div class="ec-platform-info">
            <strong>WooCommerce</strong>
            <span>Em breve</span>
          </div>
        </div>
      </div>

      <!-- Área dinâmica -->
      <div id="ec-main-area">
        <div style="text-align:center;padding:3rem;color:var(--text-dim);">
          <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
        </div>
      </div>
    </div>
  `;
};

// ─────────────────────────────────────────────────────────────
// Inicialização
// ─────────────────────────────────────────────────────────────

export function initEcommerce() {
  const user = authService.getCurrentUser();
  if (!user?.companyId) return;

  // Verifica retorno do OAuth
  const params = new URLSearchParams(window.location.search);
  const oauthStatus = params.get('oauth');
  if (oauthStatus) {
    // Limpa o query string da URL sem recarregar
    history.replaceState(null, '', '/ecommerce');
  }

  loadEcommercePage(user.companyId, oauthStatus ?? '', params.get('msg') ?? '');

  (window as any).ecSelectPlatform = (platform: string) => {
    if (platform !== 'nuvemshop') return;
  };
}

async function loadEcommercePage(companyId: string, oauthStatus = '', oauthMsg = '') {
  const area = document.getElementById('ec-main-area');
  if (!area) return;

  try {
    const [intResp, instances] = await Promise.all([
      fetch(`/ecommerce/integration/${companyId}`).then((r) => r.json()),
      fetch(`/ecommerce/instances/${companyId}`).then((r) => r.json()).catch(() => []),
    ]);

    if (intResp.connected) {
      renderConnected(companyId, intResp, instances, oauthStatus === 'success');
    } else {
      renderConnectForm(companyId, oauthStatus === 'error' ? oauthMsg : '');
    }
  } catch {
    area.innerHTML = `<div class="ec-empty"><i class="fa-solid fa-triangle-exclamation"></i><h3>Erro ao carregar</h3></div>`;
  }
}

// ─────────────────────────────────────────────────────────────
// Render: formulário de conexão
// ─────────────────────────────────────────────────────────────

function renderConnectForm(companyId: string, errorMsg = '') {
  const area = document.getElementById('ec-main-area')!;

  area.innerHTML = `
    <div class="ec-connect-card" style="max-width:520px;margin:0 auto;">

      ${errorMsg ? `
      <div class="ec-alert warning" style="margin-bottom:1.5rem;">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <div>${errorMsg || 'Ocorreu um erro durante a conexão. Tente novamente.'}</div>
      </div>` : ''}

      <!-- Logo + título -->
      <div style="text-align:center;padding:2rem 0 1.5rem;">
        <div style="width:72px;height:72px;background:linear-gradient(135deg,#1e3a5f,#2d6cb8);border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">
          <i class="fa-solid fa-shop" style="font-size:2rem;color:#fff;"></i>
        </div>
        <h2 style="font-size:1.3rem;font-weight:800;margin:0 0 0.4rem;">Conectar NuvemShop</h2>
        <p style="font-size:0.875rem;color:var(--text-dim);margin:0;">
          Autorize o EcoQui a acessar sua loja em apenas 1 clique.
        </p>
      </div>

      <!-- O que acontece -->
      <div style="background:var(--surface-hover);border-radius:var(--radius-lg);padding:1.2rem 1.4rem;margin-bottom:1.75rem;">
        <p style="font-size:0.8rem;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:.06em;margin:0 0 .8rem;">O que será autorizado</p>
        <div style="display:flex;flex-direction:column;gap:.55rem;">
          ${[
            ['fa-bag-shopping',   'Ler pedidos e carrinhos abandonados'],
            ['fa-users',          'Ler dados de clientes para reengajamento'],
            ['fa-box-open',       'Ler produtos para incluir nos templates'],
            ['fa-webhook',        'Registrar webhooks de eventos automáticos'],
          ].map(([icon, label]) => `
            <div style="display:flex;align-items:center;gap:.65rem;font-size:0.85rem;">
              <i class="fa-solid ${icon}" style="width:18px;text-align:center;color:var(--primary);"></i>
              <span>${label}</span>
            </div>`).join('')}
        </div>
      </div>

      <!-- Botão OAuth -->
      <button id="ec-btn-oauth"
        style="width:100%;display:flex;align-items:center;justify-content:center;gap:.75rem;
               padding:1rem;border-radius:var(--radius-lg);border:none;cursor:pointer;
               background:linear-gradient(135deg,#1e3a5f,#2d6cb8);color:#fff;
               font-size:1rem;font-weight:700;transition:opacity .2s;">
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
        Autorizar com NuvemShop
      </button>

      <p style="text-align:center;font-size:0.75rem;color:var(--text-dim);margin-top:1rem;">
        Você será redirecionado para o painel da NuvemShop para autorizar o acesso.
      </p>
    </div>
  `;

  document.getElementById('ec-btn-oauth')?.addEventListener('click', () => {
    const btn = document.getElementById('ec-btn-oauth') as HTMLButtonElement;
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Redirecionando...`;
    window.location.href = `/ecommerce/oauth/authorize?companyId=${encodeURIComponent(companyId)}`;
  });
}

// ─────────────────────────────────────────────────────────────
// Render: painel conectado
// ─────────────────────────────────────────────────────────────

function renderConnected(companyId: string, integration: any, instances: any[], justConnected = false) {
  const area = document.getElementById('ec-main-area')!;

  area.innerHTML = `
    ${justConnected ? `
    <div class="ec-alert" style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--radius-lg);padding:1rem 1.2rem;display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;color:var(--success);">
      <i class="fa-solid fa-circle-check fa-lg"></i>
      <div>
        <strong>NuvemShop conectada com sucesso!</strong>
        <span style="display:block;font-size:0.82rem;opacity:.8;">Webhooks registrados. Configure suas automações abaixo.</span>
      </div>
    </div>` : ''}

    <!-- Store info -->
    <div class="ec-store-info">
      <i class="fa-solid fa-circle-check"></i>
      <div style="flex:1;">
        <strong>${integration.storeName || 'Loja NuvemShop'}</strong>
        <span>ID: ${integration.storeId} ${integration.storeUrl ? `· ${integration.storeUrl}` : ''}</span>
      </div>
      <div style="display:flex;gap:.5rem;flex-shrink:0;">
        <button class="ec-btn ec-btn-secondary" id="ec-btn-reregister" title="Re-registrar webhooks na NuvemShop">
          <i class="fa-solid fa-rotate"></i> Webhooks
        </button>
        <button class="ec-btn ec-btn-danger" id="ec-btn-disconnect">
          <i class="fa-solid fa-link-slash"></i> Desconectar
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="ec-tabs" style="flex-wrap:wrap;">
      <button class="ec-tab active" data-tab="automations" onclick="window.ecSwitchTab('automations')">
        <i class="fa-solid fa-bolt"></i> Automações
      </button>
      <button class="ec-tab" data-tab="roulette" onclick="window.ecSwitchTab('roulette')">
        <i class="fa-solid fa-dharmachakra"></i> Roleta
      </button>
      <button class="ec-tab" data-tab="videos" onclick="window.ecSwitchTab('videos')">
        <i class="fa-solid fa-video"></i> Vídeos
      </button>
      <button class="ec-tab" data-tab="shoppable" onclick="window.ecSwitchTab('shoppable')">
        <i class="fa-solid fa-clapperboard"></i> Shoppable
      </button>
      <button class="ec-tab" data-tab="reward" onclick="window.ecSwitchTab('reward')">
        <i class="fa-solid fa-gift"></i> Brinde
      </button>
      <button class="ec-tab" data-tab="checkout" onclick="window.ecSwitchTab('checkout')">
        <i class="fa-solid fa-cart-shopping"></i> Checkout
      </button>
      <button class="ec-tab" data-tab="history" onclick="window.ecSwitchTab('history')">
        <i class="fa-solid fa-clock-rotate-left"></i> Histórico
      </button>
    </div>

    <div class="ec-alert info" style="margin-bottom:1.25rem;">
      <i class="fa-solid fa-circle-info"></i>
      <div>As features <strong>Roleta</strong>, <strong>Vídeos</strong> e <strong>Checkout</strong> rodam dentro da sua loja NuvemShop via script. Após ativar, <strong>reconecte a loja</strong> uma vez para autorizar o script.</div>
    </div>

    <div id="ec-tab-automations"></div>
    <div id="ec-tab-roulette" style="display:none;"></div>
    <div id="ec-tab-videos" style="display:none;"></div>
    <div id="ec-tab-shoppable" style="display:none;"></div>
    <div id="ec-tab-reward" style="display:none;"></div>
    <div id="ec-tab-checkout" style="display:none;"></div>
    <div id="ec-tab-history" style="display:none;"></div>
  `;

  document.getElementById('ec-btn-disconnect')?.addEventListener('click', () => disconnectStore(companyId));
  document.getElementById('ec-btn-reregister')?.addEventListener('click', () => reregisterWebhooks(companyId));

  (window as any).ecSwitchTab = (tab: string) => {
    document.querySelectorAll('.ec-tab').forEach((el) => el.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
    ['automations', 'roulette', 'videos', 'shoppable', 'reward', 'checkout', 'history'].forEach((t) => {
      const el = document.getElementById(`ec-tab-${t}`);
      if (el) el.style.display = t === tab ? '' : 'none';
    });
    if (tab === 'history') loadHistory(companyId);
  };

  loadAutomations(companyId, instances);
  loadStorefront(companyId);
}

async function disconnectStore(companyId: string) {
  if (!confirm('Tem certeza que deseja desconectar a loja? Os webhooks serão removidos.')) return;
  await fetch(`/ecommerce/integration/${companyId}`, { method: 'DELETE' });
  loadEcommercePage(companyId);
}

async function reregisterWebhooks(companyId: string) {
  const btn = document.getElementById('ec-btn-reregister') as HTMLButtonElement;
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Registrando...`;

  try {
    const res = await fetch(`/ecommerce/integration/${companyId}/reregister-webhooks`, { method: 'POST' });
    const data = await res.json();

    if (data.ok) {
      const ok    = data.webhooks.filter((w: any) => w.status !== 'error').length;
      const total = data.webhooks.length;
      alert(`Webhooks registrados: ${ok}/${total}\n\n${data.webhooks.map((w: any) => `${w.event}: ${w.status}`).join('\n')}`);
    } else {
      alert('Erro: ' + (data.error || 'Falha ao registrar webhooks'));
    }
  } catch {
    alert('Erro de comunicação com o servidor.');
  }

  btn.disabled = false;
  btn.innerHTML = `<i class="fa-solid fa-rotate"></i> Webhooks`;
}

// ─────────────────────────────────────────────────────────────
// Automações
// ─────────────────────────────────────────────────────────────

async function loadAutomations(companyId: string, instances: any[]) {
  const container = document.getElementById('ec-tab-automations')!;
  container.innerHTML = `<div style="text-align:center;padding:2rem;"><i class="fa-solid fa-spinner fa-spin"></i></div>`;

  const saved = await fetch(`/ecommerce/automations/${companyId}`).then((r) => r.json()).catch(() => []);
  const byTrigger: Record<string, any> = {};
  saved.forEach((a: any) => { byTrigger[a.trigger] = a; });

  const instanceOptions = instances.length
    ? instances.map((i: any) => `<option value="${i.nome}">${i.nome}</option>`).join('')
    : `<option value="">Nenhuma instância conectada</option>`;

  container.innerHTML = `
    <div class="ec-alert info">
      <i class="fa-solid fa-circle-info"></i>
      <div>Configure cada automação com o <strong>template da mensagem</strong> e a <strong>instância WhatsApp</strong> que irá disparar. Use as variáveis disponíveis clicando nos chips.</div>
    </div>
    <div class="ec-automations" id="ec-auto-list"></div>
  `;

  const list = document.getElementById('ec-auto-list')!;

  TRIGGERS.forEach((trigger) => {
    const config     = byTrigger[trigger.id] || {};
    const enabled    = config.enabled !== false && !!config.messageTemplate;
    const template   = config.messageTemplate || trigger.defaultMsg;
    const delay      = config.delayMinutes ?? trigger.defaultDelay;
    const instance   = config.whatsappInstance || '';

    const card = document.createElement('div');
    card.className = `ec-auto-card${enabled ? ' enabled' : ''}`;
    card.style.setProperty('--color', trigger.color);
    card.dataset.triggerId = trigger.id;

    card.innerHTML = `
      <div class="ec-auto-header" onclick="window.ecToggleCard('${trigger.id}')">
        <div class="ec-auto-icon" style="background:${trigger.color}22;color:${trigger.color};">
          <i class="fa-solid ${trigger.icon}"></i>
        </div>
        <div class="ec-auto-info">
          <strong>${trigger.label}</strong>
          <span>${trigger.desc}</span>
        </div>
        <span class="ec-auto-badge">${trigger.badge}</span>
        <div class="ec-auto-toggle-area" onclick="event.stopPropagation()">
          <label class="ec-toggle">
            <input type="checkbox" id="ec-toggle-${trigger.id}" ${enabled ? 'checked' : ''} onchange="window.ecToggleEnabled('${trigger.id}', this.checked)">
            <span class="ec-toggle-slider"></span>
          </label>
        </div>
        <i class="fa-solid fa-chevron-down ec-auto-chevron" style="margin-left:4px;"></i>
      </div>

      <div class="ec-auto-body">
        <div class="ec-auto-grid">
          <div class="ec-field">
            <label>Instância WhatsApp</label>
            <select class="ec-select" id="ec-inst-${trigger.id}">
              ${instanceOptions}
            </select>
          </div>
          <div class="ec-field">
            <label>Delay de envio</label>
            <div class="ec-delay-row">
              <input type="number" id="ec-delay-${trigger.id}" value="${delay}" min="0" step="1">
              <span class="ec-delay-label">minutos após o evento</span>
            </div>
          </div>
        </div>

        <div class="ec-template-area">
          <label>Mensagem</label>
          <div class="ec-vars">
            ${trigger.vars.map((v) => `<span class="ec-var-chip" onclick="window.ecInsertVar('ec-msg-${trigger.id}', '${v}')">${v}</span>`).join('')}
          </div>
          <textarea id="ec-msg-${trigger.id}" rows="5">${template}</textarea>
        </div>

        <div class="ec-auto-footer">
          <span style="font-size:0.78rem;color:var(--text-dim);">
            <i class="fa-solid fa-circle-info"></i> Clique nas variáveis para inserir no texto.
          </span>
          <button class="ec-btn ec-btn-primary" onclick="window.ecSaveAutomation('${trigger.id}', '${companyId}')">
            <i class="fa-solid fa-floppy-disk"></i> Salvar
          </button>
        </div>
      </div>
    `;

    list.appendChild(card);

    // Seta a instância salva no select
    setTimeout(() => {
      const sel = document.getElementById(`ec-inst-${trigger.id}`) as HTMLSelectElement;
      if (sel && instance) sel.value = instance;
    }, 50);
  });

  // Globals
  (window as any).ecToggleCard = (triggerId: string) => {
    const card = document.querySelector(`[data-trigger-id="${triggerId}"]`);
    card?.classList.toggle('open');
  };

  (window as any).ecToggleEnabled = (triggerId: string, checked: boolean) => {
    const card = document.querySelector(`[data-trigger-id="${triggerId}"]`) as HTMLElement;
    if (card) {
      card.classList.toggle('enabled', checked);
      (card.style as any).setProperty('--color', TRIGGERS.find((t) => t.id === triggerId)?.color || '#6366f1');
    }
  };

  (window as any).ecInsertVar = (fieldId: string, variable: string) => {
    const el = document.getElementById(fieldId) as HTMLTextAreaElement;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const end   = el.selectionEnd ?? el.value.length;
    el.value = el.value.slice(0, start) + variable + el.value.slice(end);
    el.focus();
    el.setSelectionRange(start + variable.length, start + variable.length);
  };

  (window as any).ecSaveAutomation = async (triggerId: string, cId: string) => {
    const enabled  = (document.getElementById(`ec-toggle-${triggerId}`) as HTMLInputElement)?.checked;
    const template = (document.getElementById(`ec-msg-${triggerId}`) as HTMLTextAreaElement)?.value?.trim();
    const instance = (document.getElementById(`ec-inst-${triggerId}`) as HTMLSelectElement)?.value;
    const delay    = parseInt((document.getElementById(`ec-delay-${triggerId}`) as HTMLInputElement)?.value || '0');

    if (!template || !instance) {
      alert('Preencha o template e selecione a instância WhatsApp.');
      return;
    }

    const btn = document.querySelector(`[data-trigger-id="${triggerId}"] .ec-btn-primary`) as HTMLButtonElement;
    if (btn) { btn.disabled = true; btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`; }

    try {
      const res = await fetch(`/ecommerce/automations/${cId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger: triggerId, enabled, delayMinutes: delay, messageTemplate: template, whatsappInstance: instance }),
      });
      const data = await res.json();

      if (data.ok) {
        if (btn) { btn.innerHTML = `<i class="fa-solid fa-check"></i> Salvo!`; }
        setTimeout(() => { if (btn) { btn.disabled = false; btn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Salvar`; } }, 2000);
      }
    } catch {
      if (btn) { btn.disabled = false; btn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Salvar`; }
    }
  };
}

// ─────────────────────────────────────────────────────────────
// Histórico
// ─────────────────────────────────────────────────────────────

async function loadHistory(companyId: string) {
  const container = document.getElementById('ec-tab-history')!;
  container.innerHTML = `<div style="text-align:center;padding:2rem;"><i class="fa-solid fa-spinner fa-spin"></i></div>`;

  const history = await fetch(`/ecommerce/history/${companyId}`).then((r) => r.json()).catch(() => []);

  if (!history.length) {
    container.innerHTML = `
      <div class="ec-empty">
        <i class="fa-solid fa-clock-rotate-left"></i>
        <h3>Nenhuma mensagem enviada ainda</h3>
        <p>As mensagens enviadas pelas automações aparecerão aqui.</p>
      </div>`;
    return;
  }

  const TRIGGER_LABELS: Record<string, string> = {
    carrinho_abandonado: 'Carrinho Abandonado',
    pagamento_aprovado:  'Pagamento Aprovado',
    pedido_enviado:      'Pedido Enviado',
    avaliacao_pos_compra:'Avaliação Pós-Compra',
    boleto_lembrete:     'Lembrete de Boleto',
    reengajamento:       'Reengajamento',
  };

  container.innerHTML = `
    <div class="card" style="padding:0;overflow:hidden;">
      <table class="ec-history-table">
        <thead>
          <tr>
            <th>Automação</th>
            <th>Pedido / Entidade</th>
            <th>Telefone</th>
            <th>Enviado em</th>
          </tr>
        </thead>
        <tbody>
          ${history.map((h: any) => `
            <tr>
              <td>
                <span style="display:inline-flex;align-items:center;gap:6px;font-weight:600;">
                  <i class="fa-solid ${TRIGGERS.find((t) => t.id === h.trigger)?.icon || 'fa-bolt'}"
                     style="color:${TRIGGERS.find((t) => t.id === h.trigger)?.color || '#6366f1'};"></i>
                  ${TRIGGER_LABELS[h.trigger] || h.trigger}
                </span>
              </td>
              <td style="color:var(--text-muted);">#${h.orderId || '—'}</td>
              <td style="font-family:monospace;">${h.phone || '—'}</td>
              <td style="color:var(--text-dim);">${formatDate(h.sentAt)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// Storefront: Roleta, Vídeos, Checkout
// ─────────────────────────────────────────────────────────────

let sfCompanyId = '';

async function loadStorefront(companyId: string) {
  sfCompanyId = companyId;
  const cfg = await fetch(`/ecommerce/storefront/${companyId}`).then((r) => r.json()).catch(() => ({}));
  renderRoulette(companyId, cfg.roulette || {});
  renderVideos(companyId, cfg.videos || {});
  renderShoppable(companyId, cfg.shoppable || {});
  renderReward(companyId, cfg.reward || {});
  renderCheckout(companyId, cfg.checkout || {});

  (window as any).ecSaveStorefront = async (section: string) => {
    const btn = document.getElementById(`ec-sf-save-${section}`) as HTMLButtonElement;
    if (btn) { btn.disabled = true; btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`; }
    const body: any = {};
    if (section === 'roulette')  body.roulette  = collectRoulette();
    if (section === 'videos')    body.videos    = collectVideos();
    if (section === 'shoppable') body.shoppable = collectShoppable();
    if (section === 'reward')    body.reward    = collectReward();
    if (section === 'checkout')  body.checkout  = collectCheckout();
    try {
      await fetch(`/ecommerce/storefront/${companyId}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (btn) { btn.innerHTML = `<i class="fa-solid fa-check"></i> Salvo!`; setTimeout(() => { btn.disabled = false; btn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Salvar`; }, 1800); }
    } catch {
      if (btn) { btn.disabled = false; btn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Salvar`; }
    }
  };

  (window as any).ecAddPrize = () => addPrizeRow();
  (window as any).ecAddVideo = () => addVideoRow();
  (window as any).ecAddShoppable = () => addShoppableRow();
  (window as any).ecShoppablePick = (btn: HTMLElement) => openProductPicker(btn.closest('.ec-shop-row') as HTMLElement);
}

function field(label: string, inner: string) {
  return `<div class="ec-field"><label>${label}</label>${inner}</div>`;
}
function saveBtn(section: string) {
  return `<button class="ec-btn ec-btn-primary" id="ec-sf-save-${section}" onclick="window.ecSaveStorefront('${section}')"><i class="fa-solid fa-floppy-disk"></i> Salvar</button>`;
}

// ── Roleta ──
function renderRoulette(_companyId: string, r: any) {
  const c = document.getElementById('ec-tab-roulette');
  if (!c) return;
  const cap = r.capture || ['email'];
  c.innerHTML = `
    <div class="ec-connect-card">
      <div class="ec-auto-grid">
        ${field('Ativar roleta', `<label class="ec-toggle"><input type="checkbox" id="ec-rl-enabled" ${r.enabled ? 'checked' : ''}><span class="ec-toggle-slider"></span></label>`)}
        ${field('Cor do tema', `<input class="ec-select" type="color" id="ec-rl-theme" value="${r.theme || '#6366f1'}">`)}
      </div>
      ${field('Título do popup', `<input class="ec-select" id="ec-rl-title" value="${(r.title || 'Gire e ganhe um desconto!').replace(/"/g, '&quot;')}">`)}
      <div class="ec-auto-grid" style="margin-top:1rem;">
        ${field('Validade do cupom (dias)', `<input class="ec-select" type="number" min="1" id="ec-rl-validity" value="${r.couponValidityDays || 7}">`)}
        ${field('Valor mínimo do pedido (R$)', `<input class="ec-select" type="number" min="0" id="ec-rl-minprice" value="${r.minPrice || 0}">`)}
        ${field('Usos por cupom', `<input class="ec-select" type="number" min="1" id="ec-rl-maxuses" value="${r.maxUses || 1}">`)}
        ${field('Capturar', `<div style="display:flex;gap:14px;align-items:center;padding-top:8px;">
          <label style="display:flex;gap:6px;align-items:center;font-size:.85rem;"><input type="checkbox" id="ec-rl-cap-email" ${cap.includes('email') ? 'checked' : ''}> E-mail</label>
          <label style="display:flex;gap:6px;align-items:center;font-size:.85rem;"><input type="checkbox" id="ec-rl-cap-phone" ${cap.includes('phone') ? 'checked' : ''}> WhatsApp</label>
        </div>`)}
      </div>

      <label style="font-size:0.78rem;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em;margin:1.25rem 0 .5rem;display:block;">Prêmios da roleta</label>
      <div id="ec-rl-prizes"></div>
      <button class="ec-btn ec-btn-secondary" onclick="window.ecAddPrize()" style="margin-top:.5rem;"><i class="fa-solid fa-plus"></i> Adicionar prêmio</button>
      <p style="font-size:.75rem;color:var(--text-dim);margin-top:.5rem;">Tipo "Nenhum" = fatia "tente de novo". Peso define a chance relativa de cada fatia.</p>

      <div style="margin-top:1.25rem;">${saveBtn('roulette')}</div>
    </div>`;

  const prizes = (r.prizes && r.prizes.length) ? r.prizes : [
    { label: '10% OFF', type: 'percentage', value: 10, weight: 3 },
    { label: 'Frete grátis', type: 'shipping', value: '', weight: 2 },
    { label: 'Tente de novo', type: 'none', value: '', weight: 4 },
  ];
  prizes.forEach((p: any) => addPrizeRow(p));
}

function addPrizeRow(p: any = {}) {
  const host = document.getElementById('ec-rl-prizes');
  if (!host) return;
  const row = document.createElement('div');
  row.className = 'ec-prize-row';
  row.style.cssText = 'display:grid;grid-template-columns:1fr 130px 90px 80px 36px;gap:8px;margin-bottom:8px;align-items:center;';
  const t = p.type || 'percentage';
  row.innerHTML = `
    <input class="ec-select ec-pz-label" placeholder="Rótulo (ex: 10% OFF)" value="${(p.label || '').replace(/"/g, '&quot;')}">
    <select class="ec-select ec-pz-type">
      <option value="percentage" ${t === 'percentage' ? 'selected' : ''}>% desconto</option>
      <option value="absolute" ${t === 'absolute' ? 'selected' : ''}>R$ desconto</option>
      <option value="shipping" ${t === 'shipping' ? 'selected' : ''}>Frete grátis</option>
      <option value="none" ${t === 'none' ? 'selected' : ''}>Nenhum</option>
    </select>
    <input class="ec-select ec-pz-value" type="number" placeholder="valor" value="${p.value ?? ''}">
    <input class="ec-select ec-pz-weight" type="number" placeholder="peso" value="${p.weight ?? 1}">
    <button class="ec-btn ec-btn-danger" style="padding:.5rem;" onclick="this.closest('.ec-prize-row').remove()"><i class="fa-solid fa-trash"></i></button>`;
  host.appendChild(row);
}

function collectRoulette() {
  const prizes: any[] = [];
  document.querySelectorAll('#ec-rl-prizes .ec-prize-row').forEach((row) => {
    const label = (row.querySelector('.ec-pz-label') as HTMLInputElement)?.value?.trim();
    const type  = (row.querySelector('.ec-pz-type') as HTMLSelectElement)?.value;
    const value = (row.querySelector('.ec-pz-value') as HTMLInputElement)?.value;
    const weight = parseInt((row.querySelector('.ec-pz-weight') as HTMLInputElement)?.value || '1');
    if (label) prizes.push({ label, type, value: type === 'shipping' || type === 'none' ? '' : Number(value || 0), weight: weight || 1 });
  });
  const cap: string[] = [];
  if ((document.getElementById('ec-rl-cap-email') as HTMLInputElement)?.checked) cap.push('email');
  if ((document.getElementById('ec-rl-cap-phone') as HTMLInputElement)?.checked) cap.push('phone');
  return {
    enabled: (document.getElementById('ec-rl-enabled') as HTMLInputElement)?.checked || false,
    theme: (document.getElementById('ec-rl-theme') as HTMLInputElement)?.value || '#6366f1',
    title: (document.getElementById('ec-rl-title') as HTMLInputElement)?.value || '',
    couponValidityDays: parseInt((document.getElementById('ec-rl-validity') as HTMLInputElement)?.value || '7'),
    minPrice: parseFloat((document.getElementById('ec-rl-minprice') as HTMLInputElement)?.value || '0'),
    maxUses: parseInt((document.getElementById('ec-rl-maxuses') as HTMLInputElement)?.value || '1'),
    capture: cap.length ? cap : ['email'],
    prizes,
  };
}

// ── Vídeos ──
function renderVideos(_companyId: string, v: any) {
  const c = document.getElementById('ec-tab-videos');
  if (!c) return;
  c.innerHTML = `
    <div class="ec-connect-card">
      ${field('Ativar vídeos na loja', `<label class="ec-toggle"><input type="checkbox" id="ec-vd-enabled" ${v.enabled ? 'checked' : ''}><span class="ec-toggle-slider"></span></label>`)}
      <label style="font-size:0.78rem;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em;margin:1.25rem 0 .5rem;display:block;">Vídeos</label>
      <div id="ec-vd-list"></div>
      <button class="ec-btn ec-btn-secondary" onclick="window.ecAddVideo()" style="margin-top:.5rem;"><i class="fa-solid fa-plus"></i> Adicionar vídeo</button>
      <p style="font-size:.75rem;color:var(--text-dim);margin-top:.5rem;">Aceita link do YouTube ou arquivo .mp4/.webm.</p>
      <div style="margin-top:1.25rem;">${saveBtn('videos')}</div>
    </div>`;
  (v.items || []).forEach((it: any) => addVideoRow(it));
}

function addVideoRow(it: any = {}) {
  const host = document.getElementById('ec-vd-list');
  if (!host) return;
  const row = document.createElement('div');
  row.className = 'ec-video-row';
  row.style.cssText = 'display:grid;grid-template-columns:1fr 150px 130px 36px;gap:8px;margin-bottom:8px;align-items:center;';
  const pos = it.position || 'flutuante';
  row.innerHTML = `
    <input class="ec-select ec-vd-url" placeholder="URL do vídeo" value="${(it.url || '').replace(/"/g, '&quot;')}">
    <input class="ec-select ec-vd-title" placeholder="Título (opcional)" value="${(it.title || '').replace(/"/g, '&quot;')}">
    <select class="ec-select ec-vd-pos">
      <option value="flutuante" ${pos === 'flutuante' ? 'selected' : ''}>Flutuante</option>
      <option value="produto" ${pos === 'produto' ? 'selected' : ''}>Página produto</option>
      <option value="home" ${pos === 'home' ? 'selected' : ''}>Home</option>
    </select>
    <button class="ec-btn ec-btn-danger" style="padding:.5rem;" onclick="this.closest('.ec-video-row').remove()"><i class="fa-solid fa-trash"></i></button>`;
  host.appendChild(row);
}

function collectVideos() {
  const items: any[] = [];
  document.querySelectorAll('#ec-vd-list .ec-video-row').forEach((row) => {
    const url = (row.querySelector('.ec-vd-url') as HTMLInputElement)?.value?.trim();
    const title = (row.querySelector('.ec-vd-title') as HTMLInputElement)?.value?.trim();
    const position = (row.querySelector('.ec-vd-pos') as HTMLSelectElement)?.value;
    if (url) items.push({ url, title, position });
  });
  return { enabled: (document.getElementById('ec-vd-enabled') as HTMLInputElement)?.checked || false, items };
}

// ── Vídeos Shoppable (carrossel + bolha por produto) ──
function renderShoppable(_companyId: string, sh: any) {
  const c = document.getElementById('ec-tab-shoppable');
  if (!c) return;
  c.innerHTML = `
    <div class="ec-connect-card">
      ${field('Ativar vídeos shoppable', `<label class="ec-toggle"><input type="checkbox" id="ec-sh-enabled" ${sh.enabled ? 'checked' : ''}><span class="ec-toggle-slider"></span></label>`)}
      <p style="font-size:.8rem;color:var(--text-dim);margin:.5rem 0 1rem;">
        <strong>Carrossel</strong>: fileira de vídeos com o produto marcado embaixo. &nbsp;·&nbsp;
        <strong>Flutuante</strong>: bolha de vídeo que aparece só na página do produto escolhido.
      </p>
      <div id="ec-sh-list"></div>
      <button class="ec-btn ec-btn-secondary" onclick="window.ecAddShoppable()" style="margin-top:.5rem;"><i class="fa-solid fa-plus"></i> Adicionar vídeo</button>
      <p style="font-size:.75rem;color:var(--text-dim);margin-top:.5rem;">Link do vídeo: YouTube ou arquivo .mp4 (de preferência vertical, 9:16).</p>
      <div style="margin-top:1.25rem;">${saveBtn('shoppable')}</div>
    </div>`;
  (sh.items || []).forEach((it: any) => addShoppableRow(it));
}

function addShoppableRow(it: any = {}) {
  const host = document.getElementById('ec-sh-list');
  if (!host) return;
  const row = document.createElement('div');
  row.className = 'ec-shop-row';
  row.style.cssText = 'border:1px solid var(--border-color);border-radius:var(--radius-md);padding:12px;margin-bottom:10px;display:grid;grid-template-columns:1fr 130px auto 36px;gap:10px;align-items:center;';
  // dados do produto guardados no dataset
  row.dataset.productId    = it.productId || '';
  row.dataset.productName  = it.productName || '';
  row.dataset.productPrice = it.productPrice || '';
  row.dataset.productImage = it.productImage || '';
  row.dataset.productUrl   = it.productUrl || '';
  const mode = it.mode || 'carousel';
  row.innerHTML = `
    <input class="ec-select ec-sh-url" placeholder="URL do vídeo (.mp4 ou YouTube)" value="${(it.url || '').replace(/"/g, '&quot;')}">
    <select class="ec-select ec-sh-mode">
      <option value="carousel" ${mode === 'carousel' ? 'selected' : ''}>Carrossel</option>
      <option value="floating" ${mode === 'floating' ? 'selected' : ''}>Flutuante</option>
    </select>
    <div class="ec-sh-prod" style="display:flex;align-items:center;gap:8px;min-width:200px;">
      ${productChip(it)}
      <button class="ec-btn ec-btn-secondary" style="padding:.5rem .7rem;white-space:nowrap;" onclick="window.ecShoppablePick(this)"><i class="fa-solid fa-tag"></i> Produto</button>
    </div>
    <button class="ec-btn ec-btn-danger" style="padding:.5rem;" onclick="this.closest('.ec-shop-row').remove()"><i class="fa-solid fa-trash"></i></button>`;
  host.appendChild(row);
}

function productChip(it: any) {
  if (!it.productId) return `<span class="ec-sh-prod-label" style="font-size:.78rem;color:var(--text-dim);">Nenhum produto</span>`;
  return `<span class="ec-sh-prod-label" style="display:inline-flex;align-items:center;gap:6px;font-size:.8rem;">
      ${it.productImage ? `<img src="${it.productImage}" style="width:22px;height:22px;border-radius:4px;object-fit:cover;">` : ''}
      <span style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${(it.productName || '').replace(/</g, '&lt;')}</span>
    </span>`;
}

function collectShoppable() {
  const items: any[] = [];
  document.querySelectorAll('#ec-sh-list .ec-shop-row').forEach((row) => {
    const r = row as HTMLElement;
    const url = (r.querySelector('.ec-sh-url') as HTMLInputElement)?.value?.trim();
    const mode = (r.querySelector('.ec-sh-mode') as HTMLSelectElement)?.value;
    if (!url) return;
    items.push({
      url, mode,
      productId:    r.dataset.productId || '',
      productName:  r.dataset.productName || '',
      productPrice: r.dataset.productPrice || '',
      productImage: r.dataset.productImage || '',
      productUrl:   r.dataset.productUrl || '',
    });
  });
  return { enabled: (document.getElementById('ec-sh-enabled') as HTMLInputElement)?.checked || false, items };
}

// Seletor de produtos com busca na API da NuvemShop
function openProductPicker(row: HTMLElement) {
  if (!row) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99999;display:flex;align-items:flex-start;justify-content:center;padding-top:8vh;';
  overlay.innerHTML = `
    <div style="background:var(--surface-color);border:1px solid var(--border-color);border-radius:var(--radius-lg);width:92%;max-width:480px;max-height:70vh;display:flex;flex-direction:column;overflow:hidden;">
      <div style="padding:14px;border-bottom:1px solid var(--border-color);display:flex;gap:8px;">
        <input id="ec-pp-search" class="ec-select" placeholder="Buscar produto..." style="flex:1;" autofocus>
        <button class="ec-btn ec-btn-secondary" id="ec-pp-close" style="padding:.5rem .8rem;">Fechar</button>
      </div>
      <div id="ec-pp-results" style="overflow:auto;padding:8px;">
        <div style="text-align:center;color:var(--text-dim);padding:1rem;"><i class="fa-solid fa-spinner fa-spin"></i></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#ec-pp-close')!.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  const results = overlay.querySelector('#ec-pp-results') as HTMLElement;
  const search = overlay.querySelector('#ec-pp-search') as HTMLInputElement;

  const doSearch = async (q: string) => {
    results.innerHTML = `<div style="text-align:center;color:var(--text-dim);padding:1rem;"><i class="fa-solid fa-spinner fa-spin"></i></div>`;
    const list = await fetch(`/ecommerce/products/${sfCompanyId}?q=${encodeURIComponent(q)}`).then((r) => r.json()).catch(() => []);
    if (!Array.isArray(list) || !list.length) {
      results.innerHTML = `<div style="text-align:center;color:var(--text-dim);padding:1rem;">Nenhum produto encontrado.</div>`;
      return;
    }
    results.innerHTML = list.map((p: any) => `
      <div class="ec-pp-item" data-id="${p.id}" data-name="${(p.name || '').replace(/"/g, '&quot;')}" data-price="${p.price || ''}" data-image="${p.image || ''}" data-url="${p.url || ''}"
           style="display:flex;align-items:center;gap:10px;padding:8px;border-radius:8px;cursor:pointer;">
        ${p.image ? `<img src="${p.image}" style="width:40px;height:40px;border-radius:6px;object-fit:cover;">` : '<div style="width:40px;height:40px;border-radius:6px;background:var(--surface-hover);"></div>'}
        <div style="flex:1;min-width:0;">
          <div style="font-size:.88rem;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${(p.name || '').replace(/</g, '&lt;')}</div>
          <div style="font-size:.78rem;color:var(--text-dim);">R$ ${p.price || '—'}</div>
        </div>
      </div>`).join('');
    results.querySelectorAll('.ec-pp-item').forEach((item) => {
      (item as HTMLElement).addEventListener('mouseenter', () => (item as HTMLElement).style.background = 'var(--surface-hover)');
      (item as HTMLElement).addEventListener('mouseleave', () => (item as HTMLElement).style.background = '');
      item.addEventListener('click', () => {
        const d = (item as HTMLElement).dataset;
        row.dataset.productId = d.id || '';
        row.dataset.productName = d.name || '';
        row.dataset.productPrice = d.price || '';
        row.dataset.productImage = d.image || '';
        row.dataset.productUrl = d.url || '';
        const label = row.querySelector('.ec-sh-prod-label');
        if (label) label.outerHTML = productChip({ productId: d.id, productName: d.name, productImage: d.image });
        overlay.remove();
      });
    });
  };

  let t: any;
  search.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => doSearch(search.value.trim()), 350); });
  doSearch('');
}

// ── Brinde / Barra de recompensa no carrinho ──
function renderReward(_companyId: string, r: any) {
  const c = document.getElementById('ec-tab-reward');
  if (!c) return;
  c.innerHTML = `
    <div class="ec-connect-card">
      ${field('Ativar barra de recompensa', `<label class="ec-toggle"><input type="checkbox" id="ec-rw-enabled" ${r.enabled ? 'checked' : ''}><span class="ec-toggle-slider"></span></label>`)}
      <div class="ec-auto-grid" style="margin-top:1rem;">
        ${field('Valor do carrinho para ganhar (R$)', `<input class="ec-select" type="number" min="0" step="0.01" id="ec-rw-threshold" value="${r.threshold || 0}">`)}
        ${field('Nome da recompensa', `<input class="ec-select" id="ec-rw-label" value="${(r.rewardLabel || 'Frete grátis').replace(/"/g, '&quot;')}">`)}
        ${field('Cupom revelado ao atingir (opcional)', `<input class="ec-select" id="ec-rw-coupon" placeholder="Ex: FRETEGRATIS" value="${(r.couponCode || '').replace(/"/g, '&quot;')}">`)}
        ${field('Cor da barra', `<input class="ec-select" type="color" id="ec-rw-color" value="${r.color || '#10b981'}">`)}
        ${field('Posição', `<select class="ec-select" id="ec-rw-position">
          <option value="top" ${(r.position || 'top') === 'top' ? 'selected' : ''}>Topo</option>
          <option value="bottom" ${r.position === 'bottom' ? 'selected' : ''}>Rodapé</option>
        </select>`)}
      </div>
      ${field('Mensagem (faltando)', `<input class="ec-select" id="ec-rw-before" value="${(r.msgBefore || 'Faltam {{falta}} para ganhar {{recompensa}}! 🎁').replace(/"/g, '&quot;')}">`)}
      ${field('Mensagem (atingiu)', `<input class="ec-select" id="ec-rw-reached" value="${(r.msgReached || '🎉 Você desbloqueou {{recompensa}}!').replace(/"/g, '&quot;')}">`)}
      <p style="font-size:.75rem;color:var(--text-dim);margin-top:.5rem;">Use <code>{{falta}}</code> (valor que falta) e <code>{{recompensa}}</code> (nome da recompensa) nas mensagens. Crie o cupom na NuvemShop e coloque o código aqui para ser revelado.</p>
      <div style="margin-top:1.25rem;">${saveBtn('reward')}</div>
    </div>`;
}

function collectReward() {
  return {
    enabled: (document.getElementById('ec-rw-enabled') as HTMLInputElement)?.checked || false,
    threshold: parseFloat((document.getElementById('ec-rw-threshold') as HTMLInputElement)?.value || '0'),
    rewardLabel: (document.getElementById('ec-rw-label') as HTMLInputElement)?.value || 'Frete grátis',
    couponCode: (document.getElementById('ec-rw-coupon') as HTMLInputElement)?.value?.trim() || '',
    color: (document.getElementById('ec-rw-color') as HTMLInputElement)?.value || '#10b981',
    position: (document.getElementById('ec-rw-position') as HTMLSelectElement)?.value || 'top',
    msgBefore: (document.getElementById('ec-rw-before') as HTMLInputElement)?.value || '',
    msgReached: (document.getElementById('ec-rw-reached') as HTMLInputElement)?.value || '',
  };
}

// ── Checkout ──
function renderCheckout(_companyId: string, ck: any) {
  const c = document.getElementById('ec-tab-checkout');
  if (!c) return;
  c.innerHTML = `
    <div class="ec-connect-card">
      ${field('Ativar ajustes no checkout', `<label class="ec-toggle"><input type="checkbox" id="ec-ck-enabled" ${ck.enabled ? 'checked' : ''}><span class="ec-toggle-slider"></span></label>`)}
      <div class="ec-auto-grid" style="margin-top:1rem;">
        ${field('Timer de urgência (min, 0 = off)', `<input class="ec-select" type="number" min="0" id="ec-ck-timer" value="${ck.timerMinutes || 0}">`)}
        ${field('Esconder pagamentos (IDs, separados por vírgula)', `<input class="ec-select" id="ec-ck-hide" value="${(ck.hidePayments || []).join(', ')}">`)}
      </div>
      ${field('Banner no topo do checkout', `<input class="ec-select" id="ec-ck-banner" value="${(ck.banner || '').replace(/"/g, '&quot;')}">`)}
      <div class="ec-alert warning" style="margin-top:1rem;">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <div>O checkout da NuvemShop é fechado: timer e banner são garantidos; esconder pagamentos depende do que o Checkout SDK expõe na loja.</div>
      </div>
      <div style="margin-top:1.25rem;">${saveBtn('checkout')}</div>
    </div>`;
}

function collectCheckout() {
  const hide = ((document.getElementById('ec-ck-hide') as HTMLInputElement)?.value || '')
    .split(',').map((s) => s.trim()).filter(Boolean);
  return {
    enabled: (document.getElementById('ec-ck-enabled') as HTMLInputElement)?.checked || false,
    timerMinutes: parseInt((document.getElementById('ec-ck-timer') as HTMLInputElement)?.value || '0'),
    banner: (document.getElementById('ec-ck-banner') as HTMLInputElement)?.value || '',
    hidePayments: hide,
  };
}

function formatDate(ts: any) {
  if (!ts) return '—';
  const d = ts._seconds ? new Date(ts._seconds * 1000) : new Date(ts);
  return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

// Export dummy para não quebrar import
export const TRIGGER_DEFS = TRIGGERS;
