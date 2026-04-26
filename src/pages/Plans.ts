/**
 * Plans — Gestão de Planos e Assinaturas (Admin only)
 */

import { dbService } from '../services/db';
import { toast } from '../services/toast';
import { backendApi } from '../services/backendApi';

// ── Planos padrão (fallback se Firestore estiver vazio) ───────
const DEFAULT_PLANS = [
    {
        id: 'starter',
        name: 'Starter',
        price: 197,
        color: '#64748b',
        icon: 'fa-rocket',
        description: 'Catálogo digital com vitrine pública e recebimento de pedidos.',
        modules: ['catalogo'],
        maxInstances: 1,
        maxStores: 1,
        features: ['Catálogo público', 'Pedidos pelo WhatsApp', '1 instância', '1 loja'],
        active: true,
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 397,
        color: '#6366f1',
        icon: 'fa-star',
        description: 'IA de atendimento e vendas completa via WhatsApp.',
        modules: ['catalogo', 'venda'],
        maxInstances: 3,
        maxStores: 3,
        features: ['Tudo do Starter', 'IA de Vendas WPP', '3 instâncias', '3 lojas'],
        recommended: true,
        active: true,
    },
    {
        id: 'business',
        name: 'Business',
        price: 697,
        color: '#f59e0b',
        icon: 'fa-building',
        description: 'Plataforma completa com agendamento e disparos em massa.',
        modules: ['catalogo', 'venda', 'agendamento'],
        maxInstances: 10,
        maxStores: 10,
        features: ['Tudo do Pro', 'IA de Agendamento', 'Disparos em Massa', '10 instâncias', '10 lojas'],
        active: true,
    },
];

interface Company {
    id: string;
    name: string;
    status: string;
    modulos_ativos?: string[];
    plan?: string;
    subscription?: {
        status: string;
        planId: string;
        nextBillingDate?: string;
        mpSubscriptionId?: string;
    };
}

const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const Plans = async () => {
    let companies: Company[] = [];
    let plans = [...DEFAULT_PLANS];

    try {
        [companies] = await Promise.all([
            dbService.getAll('companies') as Promise<Company[]>,
        ]);
        companies.sort((a, b) => a.name.localeCompare(b.name));
    } catch {}

    // Carrega planos customizados do backend
    try {
        const res = await backendApi.get('/plans/config');
        if (res.plans) {
            plans = DEFAULT_PLANS.map(def => ({
                ...def,
                ...(res.plans[def.id] || {}),
            }));
        }
    } catch {}

    const getPlanForCompany = (company: Company) => {
        if (company.subscription?.planId) return plans.find(p => p.id === company.subscription!.planId);
        if ((company.modulos_ativos || []).includes('agendamento')) return plans[2];
        if ((company.modulos_ativos || []).includes('venda'))       return plans[1];
        return plans[0];
    };

    const getSubStatus = (company: Company) => {
        const sub = company.subscription;
        if (!sub) return { label: 'Manual', color: '#64748b', icon: 'fa-hand' };
        switch (sub.status) {
            case 'active':    return { label: 'Ativa',     color: '#10b981', icon: 'fa-circle-check' };
            case 'pending':   return { label: 'Pendente',  color: '#f59e0b', icon: 'fa-clock' };
            case 'paused':    return { label: 'Pausada',   color: '#f59e0b', icon: 'fa-pause' };
            case 'cancelled': return { label: 'Cancelada', color: '#ef4444', icon: 'fa-ban' };
            default:          return { label: sub.status,  color: '#64748b', icon: 'fa-circle' };
        }
    };

    const renderCompanyRows = () => {
        if (companies.length === 0) {
            return `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-dim);">Nenhum cliente cadastrado.</td></tr>`;
        }
        return companies.map(c => {
            const plan = getPlanForCompany(c);
            const sub = getSubStatus(c);
            const nextBilling = c.subscription?.nextBillingDate
                ? new Date(c.subscription.nextBillingDate).toLocaleDateString('pt-BR')
                : '—';
            return `<tr>
                <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <div style="width:8px;height:8px;border-radius:50%;background:${c.status === 'active' ? '#10b981' : '#ef4444'};flex-shrink:0;"></div>
                        <strong>${c.name}</strong>
                    </div>
                </td>
                <td>
                    ${plan ? `<span style="display:inline-flex;align-items:center;gap:6px;font-size:0.85rem;font-weight:700;color:${plan.color};">
                        <i class="fa-solid ${plan.icon}"></i> ${plan.name}
                    </span>` : '—'}
                </td>
                <td>
                    <span style="display:inline-flex;align-items:center;gap:5px;font-size:0.8rem;font-weight:600;color:${sub.color};">
                        <i class="fa-solid ${sub.icon}"></i> ${sub.label}
                    </span>
                </td>
                <td style="font-size:0.85rem;color:var(--text-muted);">${nextBilling}</td>
                <td>
                    <div style="display:flex;gap:6px;">
                        <button class="action-btn assign-plan-btn" data-id="${c.id}" title="Atribuir Plano">
                            <i style="color:#6366f1;" class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="action-btn gen-link-btn" data-id="${c.id}" title="Gerar Link de Pagamento">
                            <i style="color:#10b981;" class="fa-solid fa-link"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');
    };

    setTimeout(() => setupPlansListeners(companies, plans), 100);

    return `
    <style>
        .plan-card-option input[type=radio]:checked + .plan-card-inner {
            border-color: var(--primary) !important;
            background: rgba(99,102,241,0.05) !important;
        }
        .plan-card-option:hover .plan-card-inner { border-color: rgba(99,102,241,0.4) !important; }
        .plan-editor-card { background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem; }
        .plan-editor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .plan-feat-tag { display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.25);border-radius:20px;padding:3px 10px;font-size:0.78rem;color:var(--primary); }
        .plan-feat-tag button { background:none;border:none;cursor:pointer;color:#ef4444;padding:0;line-height:1;font-size:0.8rem; }
        .tab-btn { padding:0.5rem 1.25rem;border-radius:8px;border:1px solid var(--border-color);background:transparent;color:var(--text-muted);cursor:pointer;font-size:0.88rem;transition:all 0.2s; }
        .tab-btn.active { background:var(--primary);color:#fff;border-color:var(--primary); }
    </style>

    <div class="page-header" style="justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-layer-group" style="color:var(--primary);margin-right:10px;"></i>Planos e Assinaturas
            </h2>
            <p style="color:var(--text-muted);font-size:0.9rem;">Gerencie os planos e cobranças dos clientes.</p>
        </div>
        <div style="display:flex;gap:0.5rem;">
            <button class="tab-btn active" data-tab="clientes">Clientes</button>
            <button class="tab-btn" data-tab="editor">Editar Planos</button>
        </div>
    </div>

    <!-- ── ABA: CLIENTES ── -->
    <div id="tab-clientes">
        <!-- Cards dos planos -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin-bottom:2rem;">
            ${plans.map(p => `
            <div class="card" style="padding:1.5rem;border-top:3px solid ${p.color};position:relative;">
                ${(p as any).recommended ? `<div style="position:absolute;top:1rem;right:1rem;font-size:0.7rem;font-weight:700;background:${p.color};color:#fff;padding:2px 10px;border-radius:20px;">RECOMENDADO</div>` : ''}
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:1rem;">
                    <div style="width:40px;height:40px;border-radius:10px;background:${p.color}22;display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid ${p.icon}" style="color:${p.color};font-size:1.1rem;"></i>
                    </div>
                    <div>
                        <div style="font-weight:800;font-size:1rem;">${p.name}</div>
                        <div style="font-size:0.78rem;color:var(--text-dim);">${companies.filter(c => getPlanForCompany(c)?.id === p.id).length} clientes</div>
                    </div>
                </div>
                <div style="font-size:1.8rem;font-weight:900;color:${p.color};line-height:1;">${fmt(p.price)}<span style="font-size:0.85rem;font-weight:400;color:var(--text-dim);">/mês</span></div>
                <ul style="list-style:none;padding:0;margin:0.75rem 0 0;display:flex;flex-direction:column;gap:4px;">
                    ${p.features.map(f => `<li style="font-size:0.82rem;color:var(--text-muted);display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-check" style="color:${p.color};font-size:0.7rem;"></i>${f}</li>`).join('')}
                </ul>
            </div>`).join('')}
        </div>

        <!-- Tabela de clientes -->
        <div class="card">
            <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color);">
                <span style="font-weight:700;">Clientes (${companies.length})</span>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr><th>Cliente</th><th>Plano</th><th>Assinatura</th><th>Próx. Cobrança</th><th>Ações</th></tr>
                    </thead>
                    <tbody id="plans-table-body">${renderCompanyRows()}</tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- ── ABA: EDITOR DE PLANOS ── -->
    <div id="tab-editor" style="display:none;">
        <div class="card" style="padding:1.5rem;margin-bottom:1rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                <div>
                    <h3 style="margin:0 0 4px;">Personalizar Planos</h3>
                    <p style="color:var(--text-muted);font-size:0.85rem;margin:0;">Edite nome, preço e recursos de cada plano. Aparecerá na landing page e no painel.</p>
                </div>
                <button class="btn-primary" id="btn-save-plans" style="min-width:140px;">
                    <i class="fa-solid fa-floppy-disk"></i> Salvar Planos
                </button>
            </div>

            <div style="display:flex;flex-direction:column;gap:1.5rem;" id="plan-editors">
                ${plans.map((p, idx) => `
                <div class="plan-editor-card" data-plan-idx="${idx}" data-plan-id="${p.id}">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:1rem;">
                        <div style="width:32px;height:32px;border-radius:8px;background:${p.color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                            <i class="fa-solid ${p.icon}" style="color:${p.color};"></i>
                        </div>
                        <strong style="font-size:1rem;">${p.id.charAt(0).toUpperCase() + p.id.slice(1)}</strong>
                        <label style="margin-left:auto;display:flex;align-items:center;gap:6px;font-size:0.82rem;color:var(--text-muted);">
                            <input type="checkbox" class="plan-active-toggle" ${(p as any).active !== false ? 'checked' : ''}> Ativo
                        </label>
                    </div>
                    <div class="plan-editor-grid">
                        <div class="form-group" style="margin:0;">
                            <label class="form-label" style="font-size:0.78rem;">Nome do Plano</label>
                            <input type="text" class="form-input plan-name-input" value="${p.name}" placeholder="Ex: Starter">
                        </div>
                        <div class="form-group" style="margin:0;">
                            <label class="form-label" style="font-size:0.78rem;">Preço Mensal (R$)</label>
                            <input type="number" class="form-input plan-price-input" value="${p.price}" min="1" step="0.01">
                        </div>
                        <div class="form-group" style="margin:0;grid-column:1/-1;">
                            <label class="form-label" style="font-size:0.78rem;">Descrição (aparece na landing page)</label>
                            <input type="text" class="form-input plan-desc-input" value="${p.description}" placeholder="Descreva o plano brevemente">
                        </div>
                    </div>
                    <div style="margin-top:1rem;">
                        <label class="form-label" style="font-size:0.78rem;">Recursos do plano (aparece na landing page)</label>
                        <div class="plan-features-tags" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
                            ${p.features.map(f => `
                            <span class="plan-feat-tag">
                                ${f}
                                <button class="remove-feat-btn" data-feat="${f}">×</button>
                            </span>`).join('')}
                        </div>
                        <div style="display:flex;gap:6px;">
                            <input type="text" class="form-input plan-feat-new" placeholder="Novo recurso..." style="flex:1;">
                            <button class="btn-secondary add-feat-btn" style="padding:0 14px;white-space:nowrap;">+ Adicionar</button>
                        </div>
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </div>

    <!-- Modal: Atribuir plano -->
    <div id="assign-plan-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:520px;width:95%;">
            <span class="close-modal" id="close-assign-modal">&times;</span>
            <h2 style="margin-bottom:0.25rem;">Atribuir Plano</h2>
            <p class="text-muted" style="font-size:0.88rem;margin-bottom:1.5rem;" id="assign-company-name"></p>
            <input type="hidden" id="assign-company-id">
            <div id="plan-cards" style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;">
                ${plans.map(p => `
                <label class="plan-card-option" style="cursor:pointer;">
                    <input type="radio" name="selected-plan" value="${p.id}" style="display:none;">
                    <div class="plan-card-inner" style="background:var(--surface-hover);border:2px solid var(--border-color);border-radius:12px;padding:1rem 1.25rem;display:flex;align-items:center;gap:1rem;transition:all 0.2s;">
                        <div style="width:42px;height:42px;border-radius:10px;background:${p.color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                            <i class="fa-solid ${p.icon}" style="color:${p.color};font-size:1.1rem;"></i>
                        </div>
                        <div style="flex:1;">
                            <div style="display:flex;align-items:center;gap:8px;">
                                <strong>${p.name}</strong>
                                ${(p as any).recommended ? `<span style="font-size:0.7rem;font-weight:700;background:${p.color}22;color:${p.color};padding:1px 8px;border-radius:20px;border:1px solid ${p.color}44;">RECOMENDADO</span>` : ''}
                            </div>
                            <div style="font-size:0.82rem;color:var(--text-muted);margin-top:2px;">${p.description}</div>
                        </div>
                        <div style="font-size:1.1rem;font-weight:800;color:${p.color};">${fmt(p.price)}<span style="font-size:0.75rem;font-weight:400;color:var(--text-dim);">/mês</span></div>
                    </div>
                </label>`).join('')}
            </div>
            <div style="display:flex;gap:0.75rem;justify-content:flex-end;padding-top:1rem;border-top:1px solid var(--border-color);">
                <button class="btn-secondary" id="cancel-assign-modal">Cancelar</button>
                <button class="btn-primary" id="btn-confirm-plan" style="min-width:140px;">
                    <i class="fa-solid fa-check"></i> Confirmar Plano
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: Gerar Link -->
    <div id="link-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:460px;width:95%;">
            <span class="close-modal" id="close-link-modal">&times;</span>
            <h2 style="margin-bottom:0.25rem;">Gerar Link de Pagamento</h2>
            <p class="text-muted" id="link-company-label" style="font-size:0.88rem;margin-bottom:1.5rem;"></p>
            <input type="hidden" id="link-company-id">

            <div style="display:flex;flex-direction:column;gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Tipo de cobrança</label>
                    <select id="link-type" class="form-input">
                        <option value="subscription">Assinatura Mensal (recorrente)</option>
                        <option value="custom">Valor personalizado</option>
                    </select>
                </div>
                <div id="link-plan-row" class="form-group">
                    <label class="form-label">Plano</label>
                    <select id="link-plan" class="form-input">
                        ${plans.map(p => `<option value="${p.id}">${p.name} — ${fmt(p.price)}/mês</option>`).join('')}
                    </select>
                </div>
                <div id="link-custom-row" class="form-group" style="display:none;">
                    <label class="form-label">Valor (R$)</label>
                    <input type="number" id="link-custom-value" class="form-input" placeholder="500.00" min="1" step="0.01">
                    <input type="text" id="link-custom-desc" class="form-input" placeholder="Descrição do pagamento" style="margin-top:0.5rem;">
                </div>
            </div>

            <div id="link-result" style="display:none;margin-top:1rem;">
                <label class="form-label">Link gerado</label>
                <div style="display:flex;gap:0.5rem;">
                    <input type="text" id="link-result-url" class="form-input" readonly style="font-family:monospace;font-size:0.82rem;">
                    <button class="btn-secondary" id="btn-copy-link" style="flex-shrink:0;padding:0 12px;"><i class="fa-solid fa-copy"></i></button>
                </div>
            </div>

            <div style="display:flex;gap:0.75rem;justify-content:flex-end;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border-color);">
                <button class="btn-secondary" id="cancel-link-modal">Fechar</button>
                <button class="btn-primary" id="btn-generate-link" style="min-width:160px;">
                    <i class="fa-solid fa-link"></i> Gerar Link
                </button>
            </div>
        </div>
    </div>`;
};

function setupPlansListeners(companies: Company[], plans: any[]) {
    // ── Tabs ──────────────────────────────────────────────────
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = (btn as HTMLElement).dataset.tab!;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-clientes')!.style.display = tab === 'clientes' ? '' : 'none';
            document.getElementById('tab-editor')!.style.display  = tab === 'editor'   ? '' : 'none';
        });
    });

    // ── Abrir modal de atribuir plano ─────────────────────────
    document.querySelectorAll('.assign-plan-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const companyId = (btn as HTMLElement).dataset.id!;
            const company = companies.find(c => c.id === companyId);
            if (!company) return;
            (document.getElementById('assign-company-id') as HTMLInputElement).value = companyId;
            (document.getElementById('assign-company-name') as HTMLElement).textContent = company.name;
            const currentPlan = company.subscription?.planId || 'starter';
            const radio = document.querySelector(`input[name="selected-plan"][value="${currentPlan}"]`) as HTMLInputElement;
            if (radio) radio.checked = true;
            document.getElementById('assign-plan-modal')!.classList.remove('hidden');
        });
    });

    document.getElementById('close-assign-modal')?.addEventListener('click', () =>
        document.getElementById('assign-plan-modal')!.classList.add('hidden'));
    document.getElementById('cancel-assign-modal')?.addEventListener('click', () =>
        document.getElementById('assign-plan-modal')!.classList.add('hidden'));

    document.querySelectorAll('.plan-card-option').forEach(card => {
        card.addEventListener('click', () => {
            const radio = card.querySelector('input[type=radio]') as HTMLInputElement;
            if (radio) radio.checked = true;
        });
    });

    document.getElementById('btn-confirm-plan')?.addEventListener('click', async () => {
        const companyId = (document.getElementById('assign-company-id') as HTMLInputElement).value;
        const selectedRadio = document.querySelector('input[name="selected-plan"]:checked') as HTMLInputElement;
        if (!selectedRadio) { toast.warning('Selecione um plano.'); return; }

        const planId = selectedRadio.value;
        const plan = plans.find(p => p.id === planId);
        if (!plan) return;

        const btn = document.getElementById('btn-confirm-plan') as HTMLButtonElement;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...';
        try {
            await dbService.update('companies', companyId, {
                modulos_ativos: plan.modules,
                limite_instancias: plan.maxInstances,
                plan: planId,
            });
            const existing = await dbService.get('subscriptions', companyId) as any;
            await dbService.set('subscriptions', companyId, {
                companyId, planId,
                status: existing?.status || 'pending',
                updatedAt: new Date(),
                ...(existing ? {} : { createdAt: new Date() }),
            });
            toast.success(`Plano ${plan.name} atribuído!`);
            document.getElementById('assign-plan-modal')!.classList.add('hidden');
            setTimeout(() => window.dispatchEvent(new Event('render-app')), 400);
        } catch (err: any) {
            toast.error('Erro: ' + err.message);
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Confirmar Plano';
        }
    });

    // ── Abrir modal de gerar link ─────────────────────────────
    document.querySelectorAll('.gen-link-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const companyId = (btn as HTMLElement).dataset.id!;
            const company = companies.find(c => c.id === companyId);
            if (!company) return;
            (document.getElementById('link-company-id') as HTMLInputElement).value = companyId;
            (document.getElementById('link-company-label') as HTMLElement).textContent = `Cliente: ${company.name}`;
            document.getElementById('link-result')!.style.display = 'none';
            document.getElementById('link-modal')!.classList.remove('hidden');
        });
    });

    document.getElementById('close-link-modal')?.addEventListener('click', () =>
        document.getElementById('link-modal')!.classList.add('hidden'));
    document.getElementById('cancel-link-modal')?.addEventListener('click', () =>
        document.getElementById('link-modal')!.classList.add('hidden'));

    document.getElementById('link-type')?.addEventListener('change', (e) => {
        const type = (e.target as HTMLSelectElement).value;
        (document.getElementById('link-plan-row') as HTMLElement).style.display = type === 'custom' ? 'none' : '';
        (document.getElementById('link-custom-row') as HTMLElement).style.display = type === 'custom' ? '' : 'none';
    });

    document.getElementById('btn-copy-link')?.addEventListener('click', () => {
        const url = (document.getElementById('link-result-url') as HTMLInputElement).value;
        navigator.clipboard.writeText(url);
        toast.success('Link copiado!');
    });

    document.getElementById('btn-generate-link')?.addEventListener('click', async () => {
        const companyId = (document.getElementById('link-company-id') as HTMLInputElement).value;
        const type = (document.getElementById('link-type') as HTMLSelectElement).value;
        const planId = (document.getElementById('link-plan') as HTMLSelectElement).value;
        const customValue = parseFloat((document.getElementById('link-custom-value') as HTMLInputElement).value || '0');
        const customDesc = (document.getElementById('link-custom-desc') as HTMLInputElement).value;

        const btn = document.getElementById('btn-generate-link') as HTMLButtonElement;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Gerando...';
        try {
            const body: any = { companyId, type, planId };
            if (type === 'custom') { body.amount = customValue; body.description = customDesc; }
            const data = await backendApi.post('/plans/payment-link', body);
            if (data.checkoutUrl) {
                (document.getElementById('link-result-url') as HTMLInputElement).value = data.checkoutUrl;
                document.getElementById('link-result')!.style.display = '';
                toast.success('Link gerado! Copie e envie para o cliente.');
            } else {
                toast.error(data.error || 'Erro ao gerar link.');
            }
        } catch (err: any) {
            toast.error('Erro: ' + err.message);
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-link"></i> Gerar Link';
        }
    });

    // ── Editor de planos ──────────────────────────────────────
    document.querySelectorAll('.add-feat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.plan-editor-card')!;
            const input = card.querySelector('.plan-feat-new') as HTMLInputElement;
            const val = input.value.trim();
            if (!val) return;
            const tagsContainer = card.querySelector('.plan-features-tags')!;
            const tag = document.createElement('span');
            tag.className = 'plan-feat-tag';
            tag.innerHTML = `${val} <button class="remove-feat-btn" data-feat="${val}">×</button>`;
            tag.querySelector('.remove-feat-btn')?.addEventListener('click', () => tag.remove());
            tagsContainer.appendChild(tag);
            input.value = '';
        });
    });

    document.querySelectorAll('.remove-feat-btn').forEach(btn => {
        btn.addEventListener('click', () => btn.closest('.plan-feat-tag')?.remove());
    });

    document.getElementById('btn-save-plans')?.addEventListener('click', async () => {
        const btn = document.getElementById('btn-save-plans') as HTMLButtonElement;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...';

        try {
            const plansData: any = {};
            document.querySelectorAll('.plan-editor-card').forEach(card => {
                const planId = (card as HTMLElement).dataset.planId!;
                const name = (card.querySelector('.plan-name-input') as HTMLInputElement).value.trim();
                const price = parseFloat((card.querySelector('.plan-price-input') as HTMLInputElement).value) || 0;
                const description = (card.querySelector('.plan-desc-input') as HTMLInputElement).value.trim();
                const active = (card.querySelector('.plan-active-toggle') as HTMLInputElement).checked;
                const features: string[] = [];
                card.querySelectorAll('.plan-feat-tag').forEach(tag => {
                    const text = tag.textContent?.replace('×', '').trim();
                    if (text) features.push(text);
                });
                plansData[planId] = { name, price, description, active, features };
            });

            await backendApi.post('/plans/config', { plans: plansData });
            toast.success('Planos salvos! As alterações aparecem na landing page.');
        } catch (err: any) {
            toast.error('Erro ao salvar: ' + err.message);
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Planos';
        }
    });
}
