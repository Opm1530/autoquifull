/**
 * Plans — Gestão de Planos e Assinaturas (Admin only)
 *
 * Permite ao admin:
 * - Ver os planos disponíveis (Starter, Pro, Business)
 * - Atribuir/alterar o plano de uma empresa
 * - Ver status de assinatura de cada empresa
 * - Cobrar taxa de implementação única
 */

import { dbService } from '../services/db';
import { toast } from '../services/toast';
import { backendApi } from '../services/backendApi';

// ── Definição dos Planos ──────────────────────────────────────
const PLANS = [
    {
        id: 'starter',
        name: 'Starter',
        price: 197,
        implFee: 497,
        color: '#64748b',
        icon: 'fa-rocket',
        description: 'Catálogo digital com vitrine pública e recebimento de pedidos.',
        modules: ['venda_catalogo'],
        maxInstances: 1,
        maxStores: 1,
        features: ['Catálogo público', 'Pedidos pelo WhatsApp', '1 instância', '1 loja'],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 397,
        implFee: 797,
        color: '#6366f1',
        icon: 'fa-star',
        description: 'IA de atendimento e vendas completa via WhatsApp.',
        modules: ['venda_catalogo', 'atendimento', 'venda'],
        maxInstances: 3,
        maxStores: 3,
        features: ['Tudo do Starter', 'IA de Atendimento', 'IA de Vendas WPP', '3 instâncias', '3 lojas'],
        recommended: true,
    },
    {
        id: 'business',
        name: 'Business',
        price: 697,
        implFee: 1497,
        color: '#f59e0b',
        icon: 'fa-building',
        description: 'Plataforma completa com agendamento e disparos em massa.',
        modules: ['venda_catalogo', 'atendimento', 'venda', 'agendamento', 'disparo'],
        maxInstances: 10,
        maxStores: 10,
        features: ['Tudo do Pro', 'IA de Agendamento', 'Disparos em Massa', '10 instâncias', '10 lojas'],
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
        implementationFeePaid?: boolean;
    };
}

const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const Plans = async () => {
    let companies: Company[] = [];
    try {
        companies = await dbService.getAll('companies') as Company[];
        companies.sort((a, b) => a.name.localeCompare(b.name));
    } catch {}

    const getPlanForCompany = (company: Company) => {
        if (company.subscription?.planId) {
            return PLANS.find(p => p.id === company.subscription!.planId);
        }
        // Infere pelo módulos ativos
        if ((company.modulos_ativos || []).includes('agendamento')) return PLANS[2];
        if ((company.modulos_ativos || []).includes('venda') || (company.modulos_ativos || []).includes('atendimento')) return PLANS[1];
        return PLANS[0];
    };

    const getSubStatus = (company: Company) => {
        const sub = company.subscription;
        if (!sub) return { label: 'Manual', color: '#64748b', icon: 'fa-hand' };
        switch (sub.status) {
            case 'active':    return { label: 'Ativa', color: '#10b981', icon: 'fa-circle-check' };
            case 'pending':   return { label: 'Pendente', color: '#f59e0b', icon: 'fa-clock' };
            case 'paused':    return { label: 'Pausada', color: '#f59e0b', icon: 'fa-pause' };
            case 'cancelled': return { label: 'Cancelada', color: '#ef4444', icon: 'fa-ban' };
            default:          return { label: sub.status, color: '#64748b', icon: 'fa-circle' };
        }
    };

    const renderCompanyRows = () => {
        if (companies.length === 0) {
            return `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-dim);">Nenhum cliente cadastrado.</td></tr>`;
        }
        return companies.map(c => {
            const plan = getPlanForCompany(c);
            const sub = getSubStatus(c);
            const nextBilling = c.subscription?.nextBillingDate
                ? new Date(c.subscription.nextBillingDate).toLocaleDateString('pt-BR')
                : '—';
            const implPaid = c.subscription?.implementationFeePaid;

            return `<tr>
                <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <div style="width:8px;height:8px;border-radius:50%;background:${c.status==='active'?'#10b981':'#ef4444'};flex-shrink:0;"></div>
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
                    ${implPaid === true
                        ? `<span style="font-size:0.8rem;color:#10b981;"><i class="fa-solid fa-check"></i> Paga</span>`
                        : implPaid === false
                        ? `<span style="font-size:0.8rem;color:#ef4444;"><i class="fa-solid fa-clock"></i> Pendente</span>`
                        : `<span style="font-size:0.8rem;color:var(--text-dim);">—</span>`
                    }
                </td>
                <td>
                    <div style="display:flex;gap:6px;">
                        <button class="action-btn" onclick="window.openAssignPlan('${c.id}')" title="Atribuir Plano">
                            <i style="color:#6366f1;" class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="action-btn" onclick="window.openGenerateLink('${c.id}')" title="Gerar Link de Pagamento">
                            <i style="color:#10b981;" class="fa-solid fa-link"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');
    };

    // ── Modal: Atribuir plano ──────────────────────────────────
    const assignModalHtml = `
    <div id="assign-plan-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:520px;width:95%;">
            <span class="close-modal" onclick="document.getElementById('assign-plan-modal').classList.add('hidden')">&times;</span>
            <h2 style="margin-bottom:0.25rem;">Atribuir Plano</h2>
            <p class="text-muted" style="font-size:0.88rem;margin-bottom:1.5rem;" id="assign-company-name">Selecione o plano para o cliente.</p>
            <input type="hidden" id="assign-company-id">

            <div id="plan-cards" style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;">
                ${PLANS.map(p => `
                <label class="plan-card-option" data-plan-id="${p.id}" style="cursor:pointer;">
                    <input type="radio" name="selected-plan" value="${p.id}" style="display:none;">
                    <div class="plan-card-inner" style="
                        background:var(--surface-hover); border:2px solid var(--border-color);
                        border-radius:12px; padding:1rem 1.25rem;
                        display:flex; align-items:center; gap:1rem; transition:all 0.2s;">
                        <div style="width:42px;height:42px;border-radius:10px;background:${p.color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                            <i class="fa-solid ${p.icon}" style="color:${p.color};font-size:1.1rem;"></i>
                        </div>
                        <div style="flex:1;">
                            <div style="display:flex;align-items:center;gap:8px;">
                                <strong style="color:var(--text-main);">${p.name}</strong>
                                ${p.recommended ? `<span style="font-size:0.7rem;font-weight:700;background:${p.color}22;color:${p.color};padding:1px 8px;border-radius:20px;border:1px solid ${p.color}44;">RECOMENDADO</span>` : ''}
                            </div>
                            <div style="font-size:0.82rem;color:var(--text-muted);margin-top:2px;">${p.description}</div>
                        </div>
                        <div style="text-align:right;flex-shrink:0;">
                            <div style="font-size:1.1rem;font-weight:800;color:${p.color};">${fmt(p.price)}<span style="font-size:0.75rem;font-weight:400;color:var(--text-dim);">/mês</span></div>
                            <div style="font-size:0.78rem;color:var(--text-dim);">Impl: ${fmt(p.implFee)}</div>
                        </div>
                    </div>
                </label>`).join('')}
            </div>

            <div style="display:flex;gap:0.75rem;justify-content:flex-end;padding-top:1rem;border-top:1px solid var(--border-color);">
                <button class="btn-secondary" onclick="document.getElementById('assign-plan-modal').classList.add('hidden')">Cancelar</button>
                <button class="btn-primary" id="btn-confirm-plan" style="min-width:140px;">
                    <i class="fa-solid fa-check"></i> Confirmar Plano
                </button>
            </div>
        </div>
    </div>`;

    // ── Modal: Gerar Link de Pagamento ─────────────────────────
    const linkModalHtml = `
    <div id="link-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:480px;width:95%;">
            <span class="close-modal" onclick="document.getElementById('link-modal').classList.add('hidden')">&times;</span>
            <h2 style="margin-bottom:0.25rem;">Gerar Link de Pagamento</h2>
            <p class="text-muted" id="link-company-label" style="font-size:0.88rem;margin-bottom:1.5rem;"></p>
            <input type="hidden" id="link-company-id">

            <div style="display:flex;flex-direction:column;gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Tipo de cobrança</label>
                    <select id="link-type" class="form-input">
                        <option value="implementation">Taxa de Implementação (pagamento único)</option>
                        <option value="subscription">Assinatura Mensal (recorrente)</option>
                        <option value="custom">Valor personalizado</option>
                    </select>
                </div>
                <div id="link-plan-row" class="form-group">
                    <label class="form-label">Plano</label>
                    <select id="link-plan" class="form-input">
                        ${PLANS.map(p => `<option value="${p.id}">${p.name} — ${fmt(p.price)}/mês (impl: ${fmt(p.implFee)})</option>`).join('')}
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
                    <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('link-result-url').value);window.toastSuccess('Link copiado!')" style="flex-shrink:0;padding:0 12px;">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                </div>
            </div>

            <div style="display:flex;gap:0.75rem;justify-content:flex-end;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border-color);">
                <button class="btn-secondary" onclick="document.getElementById('link-modal').classList.add('hidden')">Fechar</button>
                <button class="btn-primary" id="btn-generate-link" style="min-width:160px;">
                    <i class="fa-solid fa-link"></i> Gerar Link
                </button>
            </div>
        </div>
    </div>`;

    setTimeout(() => setupPlansListeners(companies, PLANS), 100);

    return `
    <style>
        .plan-card-option input[type=radio]:checked + .plan-card-inner {
            border-color: var(--primary) !important;
            background: rgba(99,102,241,0.05) !important;
        }
        .plan-card-option:hover .plan-card-inner { border-color: rgba(99,102,241,0.4) !important; }
    </style>

    <div class="page-header" style="justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-layer-group" style="color:var(--primary);margin-right:10px;"></i>Planos e Assinaturas
            </h2>
            <p style="color:var(--text-muted);font-size:0.9rem;">Gerencie os planos e cobranças dos clientes.</p>
        </div>
    </div>

    <!-- Cards dos planos -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-bottom:2rem;">
        ${PLANS.map(p => `
        <div class="card" style="padding:1.5rem;border-top:3px solid ${p.color};position:relative;">
            ${p.recommended ? `<div style="position:absolute;top:1rem;right:1rem;font-size:0.7rem;font-weight:700;background:${p.color};color:#fff;padding:2px 10px;border-radius:20px;">RECOMENDADO</div>` : ''}
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:1rem;">
                <div style="width:40px;height:40px;border-radius:10px;background:${p.color}22;display:flex;align-items:center;justify-content:center;">
                    <i class="fa-solid ${p.icon}" style="color:${p.color};font-size:1.1rem;"></i>
                </div>
                <div>
                    <div style="font-weight:800;font-size:1rem;color:var(--text-main);">${p.name}</div>
                    <div style="font-size:0.78rem;color:var(--text-dim);">
                        ${companies.filter(c => {
                            const cp = PLANS.find(pl => pl.id === (c.subscription?.planId ||
                                ((c.modulos_ativos||[]).includes('agendamento') ? 'business' :
                                 (c.modulos_ativos||[]).includes('venda') ? 'pro' : 'starter')));
                            return cp?.id === p.id;
                        }).length} clientes
                    </div>
                </div>
            </div>
            <div style="font-size:1.8rem;font-weight:900;color:${p.color};line-height:1;">${fmt(p.price)}<span style="font-size:0.9rem;font-weight:400;color:var(--text-dim);">/mês</span></div>
            <div style="font-size:0.82rem;color:var(--text-dim);margin-bottom:1rem;">Implementação: ${fmt(p.implFee)}</div>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:4px;">
                ${p.features.map(f => `<li style="font-size:0.82rem;color:var(--text-muted);display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-check" style="color:${p.color};font-size:0.7rem;"></i>${f}</li>`).join('')}
            </ul>
        </div>`).join('')}
    </div>

    <!-- Tabela de clientes -->
    <div class="card">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color);display:flex;align-items:center;justify-content:space-between;">
            <span style="font-weight:700;">Clientes (${companies.length})</span>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Plano</th>
                        <th>Assinatura</th>
                        <th>Próx. Cobrança</th>
                        <th>Implementação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="plans-table-body">
                    ${renderCompanyRows()}
                </tbody>
            </table>
        </div>
    </div>

    ${assignModalHtml}
    ${linkModalHtml}`;
};

function setupPlansListeners(companies: Company[], plans: typeof PLANS) {
    // Abre modal de atribuir plano
    (window as any).openAssignPlan = (companyId: string) => {
        const company = companies.find(c => c.id === companyId);
        if (!company) return;

        (document.getElementById('assign-company-id') as HTMLInputElement).value = companyId;
        (document.getElementById('assign-company-name') as HTMLElement).textContent = company.name;

        // Pré-seleciona o plano atual
        const currentPlan = company.subscription?.planId || 'starter';
        const radio = document.querySelector(`input[name="selected-plan"][value="${currentPlan}"]`) as HTMLInputElement;
        if (radio) radio.checked = true;

        document.getElementById('assign-plan-modal')!.classList.remove('hidden');
    };

    // Destaca card do plano selecionado
    document.querySelectorAll('.plan-card-option').forEach(card => {
        card.addEventListener('click', () => {
            const radio = card.querySelector('input[type=radio]') as HTMLInputElement;
            if (radio) radio.checked = true;
        });
    });

    // Confirmar plano
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
            // Atualiza módulos e plano da empresa
            await dbService.update('companies', companyId, {
                modulos_ativos: plan.modules,
                limite_instancias: plan.maxInstances,
                plan: planId,
            });

            // Atualiza/cria subscription doc
            const existing = await dbService.get('subscriptions', companyId) as any;
            await dbService.set('subscriptions', companyId, {
                companyId,
                planId,
                status: existing?.status || 'pending',
                implementationFeePaid: existing?.implementationFeePaid || false,
                updatedAt: new Date(),
                ...(existing ? {} : { createdAt: new Date() }),
            });

            toast.success(`Plano ${plan.name} atribuído com sucesso!`);
            document.getElementById('assign-plan-modal')!.classList.add('hidden');

            // Atualiza referência local
            const company = companies.find(c => c.id === companyId);
            if (company) {
                company.modulos_ativos = plan.modules;
                company.plan = planId;
                if (!company.subscription) company.subscription = { status: 'pending', planId };
                else company.subscription.planId = planId;
            }

            // Re-renderiza tabela
            const tbody = document.getElementById('plans-table-body');
            if (tbody) {
                // Reload page content to reflect changes
                setTimeout(() => window.dispatchEvent(new Event('render-app')), 500);
            }
        } catch (err: any) {
            toast.error('Erro: ' + err.message);
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Confirmar Plano';
        }
    });

    // Abre modal de gerar link
    (window as any).openGenerateLink = (companyId: string) => {
        const company = companies.find(c => c.id === companyId);
        if (!company) return;

        (document.getElementById('link-company-id') as HTMLInputElement).value = companyId;
        (document.getElementById('link-company-label') as HTMLElement).textContent = `Cliente: ${company.name}`;
        document.getElementById('link-result')!.style.display = 'none';
        document.getElementById('link-modal')!.classList.remove('hidden');
    };

    // Alterna campos do modal de link
    document.getElementById('link-type')?.addEventListener('change', (e) => {
        const type = (e.target as HTMLSelectElement).value;
        (document.getElementById('link-plan-row') as HTMLElement).style.display = type === 'custom' ? 'none' : '';
        (document.getElementById('link-custom-row') as HTMLElement).style.display = type === 'custom' ? '' : 'none';
    });

    // Gerar link — chama o backend
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

    // Expõe toast para uso inline nos botões
    (window as any).toastSuccess = (msg: string) => toast.success(msg);
}
