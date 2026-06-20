import { authService } from '../services/auth';

// ─────────────────────────────────────────────────────────────
// Analytics — métricas de retenção/recompra/LTV (dados NuvemShop)
// ─────────────────────────────────────────────────────────────

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(n) || 0);

export const Analytics = async (): Promise<string> => {
  return `
    <div style="max-width:1000px;margin:0 auto;">
      <div class="page-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem;">
        <div>
          <h2 style="font-size:1.5rem;font-weight:800;color:var(--text-main);">Analytics</h2>
          <p style="color:var(--text-dim);font-size:.9rem;margin-top:4px;">Retenção, recompra e LTV da sua loja NuvemShop.</p>
        </div>
        <div id="an-periods" style="display:flex;gap:4px;background:var(--surface-hover);border-radius:var(--radius-lg);padding:4px;">
          ${[30, 90, 180, 365].map((d) => `
            <button class="an-period ec-btn" data-days="${d}" onclick="window.anSetPeriod(${d})"
              style="padding:.5rem 1rem;border:0;border-radius:var(--radius-md);background:none;color:var(--text-muted);font-weight:600;font-size:.85rem;cursor:pointer;">
              ${d}d
            </button>`).join('')}
        </div>
      </div>
      <div id="an-root">
        <div style="text-align:center;padding:4rem;color:var(--text-dim);"><i class="fa-solid fa-spinner fa-spin fa-2x"></i></div>
      </div>
    </div>`;
};

export function initAnalytics() {
  const user = authService.getCurrentUser() as any;
  if (!user?.companyId) return;
  let days = 90;

  (window as any).anSetPeriod = (d: number) => { days = d; load(); };

  async function load() {
    const root = document.getElementById('an-root');
    if (!root) return;
    // destaca o período ativo
    document.querySelectorAll('.an-period').forEach((b) => {
      const active = parseInt((b as HTMLElement).dataset.days || '0') === days;
      (b as HTMLElement).style.background = active ? 'var(--surface-color)' : 'none';
      (b as HTMLElement).style.color = active ? 'var(--text-main)' : 'var(--text-muted)';
      (b as HTMLElement).style.boxShadow = active ? '0 1px 4px rgba(0,0,0,.08)' : 'none';
    });
    root.innerHTML = `<div style="text-align:center;padding:4rem;color:var(--text-dim);"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><p style="margin-top:1rem;">Calculando métricas...</p></div>`;

    let data: any;
    try {
      data = await fetch(`/ecommerce/analytics/${user.companyId}?days=${days}`).then((r) => r.json());
    } catch {
      root.innerHTML = emptyState('fa-triangle-exclamation', 'Erro ao carregar', 'Tente novamente em instantes.');
      return;
    }

    if (data.connected === false) {
      root.innerHTML = emptyState('fa-plug', 'Loja não conectada', 'Conecte sua loja NuvemShop na aba E-commerce para ver as métricas.');
      return;
    }
    if (!data.orderCount) {
      root.innerHTML = emptyState('fa-chart-line', 'Sem pedidos no período', 'Quando houver vendas pagas neste período, as métricas aparecem aqui.');
      return;
    }
    root.innerHTML = render(data);
  }

  load();
}

function kpi(label: string, value: string, icon: string, color: string, hint = '') {
  return `
    <div style="background:var(--surface-color);border:1px solid var(--border-color);border-radius:var(--radius-xl);padding:1.25rem;box-shadow:var(--shadow-sm);">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:.6rem;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:${color}1a;color:${color};"><i class="fa-solid ${icon}"></i></div>
        <span style="font-size:.78rem;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;">${label}</span>
      </div>
      <div style="font-size:1.5rem;font-weight:800;color:var(--text-main);">${value}</div>
      ${hint ? `<div style="font-size:.78rem;color:var(--text-dim);margin-top:2px;">${hint}</div>` : ''}
    </div>`;
}

function render(d: any) {
  const maxRev = Math.max(...d.months.map((m: any) => m.revenue), 1);
  const monthLabel = (m: string) => {
    const [y, mo] = m.split('-');
    return ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'][parseInt(mo) - 1] + '/' + y.slice(2);
  };

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:1.5rem;">
      ${kpi('Faturamento', brl(d.revenue), 'fa-sack-dollar', '#10b981')}
      ${kpi('Pedidos', String(d.orderCount), 'fa-clipboard-list', '#3b82f6')}
      ${kpi('Ticket médio', brl(d.avgTicket), 'fa-receipt', '#6366f1')}
      ${kpi('Clientes', String(d.customers), 'fa-users', '#8b5cf6')}
      ${kpi('Taxa de recompra', d.repurchaseRate.toFixed(1) + '%', 'fa-rotate', '#f59e0b', `${d.recurring} recorrentes`)}
      ${kpi('LTV médio', brl(d.ltv), 'fa-gem', '#ec4899', 'faturamento / cliente')}
    </div>

    <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:1.25rem;align-items:start;">
      <div style="background:var(--surface-color);border:1px solid var(--border-color);border-radius:var(--radius-xl);padding:1.5rem;box-shadow:var(--shadow-sm);">
        <h3 style="font-size:1rem;font-weight:700;color:var(--text-main);margin:0 0 1.25rem;">Faturamento por mês</h3>
        <div style="display:flex;align-items:flex-end;gap:10px;height:180px;">
          ${d.months.map((m: any) => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end;" title="${brl(m.revenue)} · ${m.count} pedidos">
              <span style="font-size:.7rem;color:var(--text-dim);">${brl(m.revenue).replace('R$', '').trim()}</span>
              <div style="width:100%;max-width:46px;height:${Math.max(4, (m.revenue / maxRev) * 140)}px;background:linear-gradient(180deg,var(--primary),var(--primary-hover,#4f46e5));border-radius:6px 6px 0 0;"></div>
              <span style="font-size:.72rem;color:var(--text-muted);">${monthLabel(m.month)}</span>
            </div>`).join('')}
        </div>
      </div>

      <div style="background:var(--surface-color);border:1px solid var(--border-color);border-radius:var(--radius-xl);padding:1.5rem;box-shadow:var(--shadow-sm);">
        <h3 style="font-size:1rem;font-weight:700;color:var(--text-main);margin:0 0 1rem;">Novos vs Recorrentes</h3>
        <div style="display:flex;height:14px;border-radius:8px;overflow:hidden;margin-bottom:.75rem;background:var(--surface-hover);">
          <div style="width:${d.customers ? (d.newCustomers / d.customers) * 100 : 0}%;background:#3b82f6;"></div>
          <div style="width:${d.customers ? (d.recurring / d.customers) * 100 : 0}%;background:#10b981;"></div>
        </div>
        <div style="font-size:.85rem;color:var(--text-muted);display:flex;flex-direction:column;gap:6px;">
          <span><i class="fa-solid fa-circle" style="color:#3b82f6;font-size:.6rem;"></i> ${d.newCustomers} novos</span>
          <span><i class="fa-solid fa-circle" style="color:#10b981;font-size:.6rem;"></i> ${d.recurring} recorrentes</span>
        </div>

        <h3 style="font-size:1rem;font-weight:700;color:var(--text-main);margin:1.5rem 0 .75rem;">Top produtos</h3>
        <div style="display:flex;flex-direction:column;gap:.6rem;">
          ${d.topProducts.length ? d.topProducts.map((p: any, i: number) => `
            <div style="display:flex;align-items:center;gap:8px;font-size:.85rem;">
              <span style="width:18px;color:var(--text-dim);font-weight:700;">${i + 1}</span>
              <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--text-main);">${(p.name || '').replace(/</g, '&lt;')}</span>
              <span style="color:var(--text-dim);">${brl(p.revenue)}</span>
            </div>`).join('') : '<span style="color:var(--text-dim);font-size:.85rem;">Sem dados.</span>'}
        </div>
      </div>
    </div>

    <p style="font-size:.75rem;color:var(--text-dim);margin-top:1rem;text-align:center;">
      Considera pedidos <strong>pagos</strong> no período. "Recorrente" = cliente com 2+ compras na janela. Dados em cache por 30 min.
    </p>`;
}

function emptyState(icon: string, title: string, text: string) {
  return `
    <div style="text-align:center;padding:4rem 2rem;color:var(--text-dim);">
      <i class="fa-solid ${icon}" style="font-size:2.5rem;opacity:.3;display:block;margin-bottom:1rem;"></i>
      <h3 style="font-size:1.1rem;color:var(--text-muted);margin-bottom:.5rem;">${title}</h3>
      <p>${text}</p>
    </div>`;
}
