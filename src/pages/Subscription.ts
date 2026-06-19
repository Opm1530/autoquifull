import { authService } from '../services/auth';

// ─────────────────────────────────────────────────────────────
// Página de Assinatura (Kiwify)
// O pagamento é feito no checkout da Kiwify; aqui mostramos o status
// e o link para assinar/gerenciar.
// ─────────────────────────────────────────────────────────────

interface SubStatus {
  status: 'active' | 'past_due' | 'canceled' | 'none';
  plano?: string | null;
  provedor?: string | null;
  atualizadaEm?: string | null;
  checkoutUrl?: string;
  enforce?: boolean;
}

const STATUS_META: Record<string, { label: string; color: string; icon: string }> = {
  active:   { label: 'Ativa',            color: 'var(--success)', icon: 'fa-circle-check' },
  past_due: { label: 'Pagamento pendente', color: '#f59e0b',       icon: 'fa-clock' },
  canceled: { label: 'Cancelada',        color: 'var(--danger)',  icon: 'fa-circle-xmark' },
  none:     { label: 'Sem assinatura',   color: 'var(--text-dim)', icon: 'fa-circle-minus' },
};

export const Subscription = async (): Promise<string> => {
  const user = authService.getCurrentUser() as any;
  const companyId = user?.companyId;

  let data: SubStatus = { status: 'none' };
  try {
    if (companyId) {
      data = await fetch(`/kiwify/status/${companyId}`).then((r) => r.json());
    } else {
      const cfg = await fetch('/kiwify/config').then((r) => r.json());
      data = { status: 'none', checkoutUrl: cfg.checkoutUrl };
    }
  } catch {
    // mantém o padrão 'none'
  }

  const meta = STATUS_META[data.status] || STATUS_META.none;
  const checkoutUrl = data.checkoutUrl || '';
  const isActive = data.status === 'active';

  return `
    <div style="max-width:720px;margin:0 auto;">
      <div style="margin-bottom:1.5rem;">
        <h2 style="font-size:1.5rem;font-weight:800;color:var(--text-main);">Assinatura</h2>
        <p style="color:var(--text-dim);font-size:0.9rem;margin-top:4px;">
          Sua assinatura do EcoQui é processada pela Kiwify.
        </p>
      </div>

      <!-- Card de status -->
      <div style="background:var(--surface-color);border:1px solid var(--border-color);border-radius:var(--radius-xl);padding:1.75rem;box-shadow:var(--shadow-sm);margin-bottom:1.5rem;">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;background:${meta.color}1a;color:${meta.color};">
            <i class="fa-solid ${meta.icon}"></i>
          </div>
          <div style="flex:1;">
            <span style="font-size:0.78rem;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em;">Status</span>
            <strong style="display:block;font-size:1.15rem;color:${meta.color};">${meta.label}</strong>
          </div>
        </div>

        ${data.plano ? `
        <div style="margin-top:1rem;font-size:0.9rem;color:var(--text-muted);">
          <i class="fa-solid fa-box" style="margin-right:6px;color:var(--text-dim);"></i>
          Plano: <strong>${data.plano}</strong>
        </div>` : ''}
        ${data.atualizadaEm ? `
        <div style="margin-top:.4rem;font-size:0.82rem;color:var(--text-dim);">
          Atualizado em ${new Date(data.atualizadaEm).toLocaleString('pt-BR')}
        </div>` : ''}
      </div>

      <!-- CTA -->
      <div style="background:var(--surface-color);border:1px solid var(--border-color);border-radius:var(--radius-xl);padding:1.75rem;box-shadow:var(--shadow-sm);">
        ${isActive
          ? `<p style="color:var(--text-muted);font-size:0.92rem;margin:0 0 1rem;">Sua assinatura está ativa. Para gerenciar pagamento, plano ou cancelamento, acesse seu portal na Kiwify.</p>`
          : `<p style="color:var(--text-muted);font-size:0.92rem;margin:0 0 1rem;">Para liberar o acesso completo ao EcoQui, ative sua assinatura mensal pela Kiwify.</p>`
        }
        ${checkoutUrl
          ? `<a href="${checkoutUrl}" target="_blank" rel="noopener"
                style="display:inline-flex;align-items:center;gap:.6rem;padding:.85rem 1.5rem;border-radius:var(--radius-lg);
                       background:var(--primary);color:#fff;font-weight:700;text-decoration:none;box-shadow:0 4px 12px var(--primary-glow);">
                <i class="fa-solid fa-crown"></i> ${isActive ? 'Gerenciar assinatura' : 'Assinar agora'}
             </a>`
          : `<div style="padding:.85rem 1.1rem;border-radius:var(--radius-md);background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);color:#f59e0b;font-size:0.875rem;display:flex;align-items:flex-start;gap:10px;">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <div>O link de checkout da Kiwify ainda não foi configurado. Defina <code>KIWIFY_CHECKOUT_URL</code> no backend.</div>
             </div>`
        }
      </div>
    </div>
  `;
};
