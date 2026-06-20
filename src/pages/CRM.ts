import { authService } from '../services/auth';

// ─────────────────────────────────────────────────────────────
// CRM leve — segmentação RFM + score de engajamento + risco de churn
// ─────────────────────────────────────────────────────────────

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(n) || 0);

const SEG_COLOR: Record<string, string> = {
  campeao: '#f59e0b', fiel: '#10b981', novo: '#3b82f6',
  risco: '#f97316', perdido: '#6b7280', ocasional: '#8b5cf6',
};
const RISK: Record<string, { label: string; color: string }> = {
  alto: { label: 'Alto', color: '#ef4444' },
  medio: { label: 'Médio', color: '#f59e0b' },
  baixo: { label: 'Baixo', color: '#10b981' },
};

export const CRM = async (): Promise<string> => {
  return `
    <div style="max-width:1040px;margin:0 auto;">
      <div class="page-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem;">
        <div>
          <h2 style="font-size:1.5rem;font-weight:800;color:var(--text-main);">CRM</h2>
          <p style="color:var(--text-dim);font-size:.9rem;margin-top:4px;">Segmentação, engajamento e risco de churn dos seus clientes.</p>
        </div>
        <div id="crm-periods" style="display:flex;gap:4px;background:var(--surface-hover);border-radius:var(--radius-lg);padding:4px;">
          ${[90, 180, 365].map((d) => `
            <button class="crm-period" data-days="${d}" onclick="window.crmSetPeriod(${d})"
              style="padding:.5rem 1rem;border:0;border-radius:var(--radius-md);background:none;color:var(--text-muted);font-weight:600;font-size:.85rem;cursor:pointer;">${d}d</button>`).join('')}
        </div>
      </div>
      <div id="crm-root">
        <div style="text-align:center;padding:4rem;color:var(--text-dim);"><i class="fa-solid fa-spinner fa-spin fa-2x"></i></div>
      </div>
    </div>`;
};

export function initCRM() {
  const user = authService.getCurrentUser() as any;
  if (!user?.companyId) return;
  let days = 365;
  let activeSeg = '';
  let query = '';
  let customers: any[] = [];

  (window as any).crmSetPeriod = (d: number) => { days = d; load(); };
  (window as any).crmFilterSeg = (s: string) => { activeSeg = activeSeg === s ? '' : s; renderTable(); highlightSegs(); };
  (window as any).crmSearch = (v: string) => { query = (v || '').toLowerCase(); renderTable(); };

  async function load() {
    const root = document.getElementById('crm-root');
    if (!root) return;
    document.querySelectorAll('.crm-period').forEach((b) => {
      const active = parseInt((b as HTMLElement).dataset.days || '0') === days;
      (b as HTMLElement).style.background = active ? 'var(--surface-color)' : 'none';
      (b as HTMLElement).style.color = active ? 'var(--text-main)' : 'var(--text-muted)';
      (b as HTMLElement).style.boxShadow = active ? '0 1px 4px rgba(0,0,0,.08)' : 'none';
    });
    root.innerHTML = `<div style="text-align:center;padding:4rem;color:var(--text-dim);"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><p style="margin-top:1rem;">Analisando clientes...</p></div>`;

    let data: any;
    try {
      data = await fetch(`/ecommerce/crm/${user.companyId}?days=${days}`).then((r) => r.json());
    } catch {
      root.innerHTML = empty('fa-triangle-exclamation', 'Erro ao carregar', 'Tente novamente.'); return;
    }
    if (data.connected === false) { root.innerHTML = empty('fa-plug', 'Loja não conectada', 'Conecte sua loja na aba E-commerce.'); return; }
    if (!data.totalCustomers) { root.innerHTML = empty('fa-users', 'Sem clientes no período', 'Quando houver compras pagas, os clientes aparecem aqui.'); return; }

    customers = data.customers || [];
    activeSeg = '';
    root.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.85rem;margin-bottom:1.5rem;" id="crm-segs">
        ${(data.segments || []).map((s: any) => `
          <div class="crm-seg" data-seg="${s.key}" onclick="window.crmFilterSeg('${s.key}')"
            style="background:var(--surface-color);border:2px solid var(--border-color);border-radius:var(--radius-xl);padding:1rem;cursor:pointer;transition:border-color .15s;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span style="width:10px;height:10px;border-radius:50%;background:${SEG_COLOR[s.key]};"></span>
              <span style="font-size:.82rem;font-weight:700;color:var(--text-muted);">${s.label}</span>
            </div>
            <div style="font-size:1.4rem;font-weight:800;color:var(--text-main);">${s.count}</div>
            <div style="font-size:.75rem;color:var(--text-dim);">${brl(s.revenue)}</div>
          </div>`).join('')}
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:.75rem;flex-wrap:wrap;">
        <span style="font-size:.85rem;color:var(--text-dim);" id="crm-count"></span>
        <input id="crm-search" placeholder="Buscar cliente..." oninput="window.crmSearch(this.value)"
          style="padding:.55rem .9rem;border:1px solid var(--border-color);border-radius:var(--radius-md);background:var(--surface-hover);color:var(--text-main);font-size:.85rem;min-width:200px;">
      </div>
      <div style="background:var(--surface-color);border:1px solid var(--border-color);border-radius:var(--radius-xl);overflow:auto;box-shadow:var(--shadow-sm);">
        <table style="width:100%;border-collapse:collapse;font-size:.85rem;">
          <thead>
            <tr style="text-align:left;color:var(--text-dim);font-size:.72rem;text-transform:uppercase;letter-spacing:.04em;">
              <th style="padding:.7rem 1rem;background:var(--surface-hover);">Cliente</th>
              <th style="padding:.7rem 1rem;background:var(--surface-hover);">Contato</th>
              <th style="padding:.7rem 1rem;background:var(--surface-hover);">Pedidos</th>
              <th style="padding:.7rem 1rem;background:var(--surface-hover);">Total</th>
              <th style="padding:.7rem 1rem;background:var(--surface-hover);">Última</th>
              <th style="padding:.7rem 1rem;background:var(--surface-hover);">Score</th>
              <th style="padding:.7rem 1rem;background:var(--surface-hover);">Risco</th>
              <th style="padding:.7rem 1rem;background:var(--surface-hover);">Segmento</th>
            </tr>
          </thead>
          <tbody id="crm-tbody"></tbody>
        </table>
      </div>
      <p style="font-size:.75rem;color:var(--text-dim);margin-top:1rem;text-align:center;">
        RFM (Recência/Frequência/Valor) sobre pedidos pagos. Score 0–100; "Em risco" = sem comprar há +90 dias. Cache 30 min.
      </p>`;
    renderTable();
  }

  function renderTable() {
    const tbody = document.getElementById('crm-tbody');
    const countEl = document.getElementById('crm-count');
    if (!tbody) return;
    let rows = customers;
    if (activeSeg) rows = rows.filter((c) => c.segment === activeSeg);
    if (query) rows = rows.filter((c) => (c.name + ' ' + c.email + ' ' + c.phone).toLowerCase().includes(query));
    if (countEl) countEl.textContent = `${rows.length} cliente(s)${activeSeg ? ' · ' + (SEG_COLOR[activeSeg] ? activeSeg : '') : ''}`;

    tbody.innerHTML = rows.slice(0, 300).map((c) => {
      const risk = RISK[c.risk] || RISK.baixo;
      const wa = c.phone ? `https://wa.me/${('55' + c.phone.replace(/\D/g, '')).replace(/^5555/, '55')}` : '';
      return `
        <tr style="border-top:1px solid var(--border-color);">
          <td style="padding:.7rem 1rem;"><div style="font-weight:600;color:var(--text-main);">${esc(c.name)}</div><div style="font-size:.75rem;color:var(--text-dim);">${esc(c.email)}</div></td>
          <td style="padding:.7rem 1rem;">${c.phone ? `<a href="${wa}" target="_blank" style="color:#25d366;text-decoration:none;"><i class="fa-brands fa-whatsapp"></i> ${esc(c.phone)}</a>` : '<span style="color:var(--text-dim);">—</span>'}</td>
          <td style="padding:.7rem 1rem;color:var(--text-main);">${c.orders}</td>
          <td style="padding:.7rem 1rem;color:var(--text-main);font-weight:600;">${brl(c.total)}</td>
          <td style="padding:.7rem 1rem;color:var(--text-dim);">${c.recencyDays >= 999 ? '—' : c.recencyDays + 'd'}</td>
          <td style="padding:.7rem 1rem;"><span style="display:inline-block;min-width:34px;text-align:center;font-weight:700;color:#fff;background:${scoreColor(c.score)};border-radius:6px;padding:2px 6px;font-size:.78rem;">${c.score}</span></td>
          <td style="padding:.7rem 1rem;"><span style="color:${risk.color};font-weight:700;font-size:.8rem;">${risk.label}</span></td>
          <td style="padding:.7rem 1rem;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:.8rem;"><span style="width:8px;height:8px;border-radius:50%;background:${SEG_COLOR[c.segment] || '#888'};"></span>${segLabel(c.segment)}</span></td>
        </tr>`;
    }).join('') || `<tr><td colspan="8" style="padding:2rem;text-align:center;color:var(--text-dim);">Nenhum cliente neste filtro.</td></tr>`;
  }

  function highlightSegs() {
    document.querySelectorAll('.crm-seg').forEach((el) => {
      const on = (el as HTMLElement).dataset.seg === activeSeg;
      (el as HTMLElement).style.borderColor = on ? (SEG_COLOR[(el as HTMLElement).dataset.seg || ''] || 'var(--primary)') : 'var(--border-color)';
    });
  }

  load();
}

function scoreColor(s: number) { return s >= 70 ? '#10b981' : s >= 40 ? '#f59e0b' : '#ef4444'; }
function segLabel(k: string) {
  return ({ campeao: 'Campeão', fiel: 'Fiel', novo: 'Novo', risco: 'Em risco', perdido: 'Perdido', ocasional: 'Ocasional' } as Record<string, string>)[k] || k;
}
function esc(s: string) { return String(s || '').replace(/[<>&]/g, (m) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' } as any)[m]); }
function empty(icon: string, title: string, text: string) {
  return `<div style="text-align:center;padding:4rem 2rem;color:var(--text-dim);"><i class="fa-solid ${icon}" style="font-size:2.5rem;opacity:.3;display:block;margin-bottom:1rem;"></i><h3 style="font-size:1.1rem;color:var(--text-muted);margin-bottom:.5rem;">${title}</h3><p>${text}</p></div>`;
}
