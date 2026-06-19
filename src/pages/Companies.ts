import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';
import { MultiSelect } from '../components/MultiSelect';
import { backendApi } from '../services/backendApi';


interface Company {
    id: string;
    name: string;
    whatsapp?: string;
    status: string;
    limite_instancias?: number;
    ownerId?: string;
    whatsappInstance?: any;
    stores?: any[];
    metrics?: any;
    modulos_ativos?: string[];
}

export const Companies = async () => {
    let companies = await dbService.getAll('companies') as Company[];
    let modulesMS: MultiSelect | null = null;

    // Módulos disponíveis — nova estrutura
    // Regras: venda e agendamento são mutuamente exclusivos
    // catalogo pode ser combinado com venda OU agendamento
    // disparo pode ser combinado com qualquer módulo
    const moduleOptions = [
        { value: 'ecommerce',   label: '🛒 E-commerce' },
    ];

    const renderRows = () => {
        if (companies.length === 0) {
            return `<tr><td colspan="5" style="text-align:center">Nenhum cliente cadastrado.</td></tr>`;
        }
        return companies.map((c: Company) => `
            <tr data-company-id="${c.id}">
                <td>${c.name}</td>
                <td><span class="badge ${c.status === 'active' ? 'success' : 'danger'}">${c.status === 'active' ? 'Ativo' : 'Inativo'}</span></td>
                <td><div style="display:flex; gap:4px; flex-wrap:wrap;">${(c.modulos_ativos || []).map(m => `<span class="badge info" style="font-size:0.7rem;">${m}</span>`).join('')}</div></td>
                <td>${c.stores ? c.stores.length : 0}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editCompany('${c.id}')" title="Editar"><i style="color: #fff" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleCompanyStatus('${c.id}', '${c.status}')" title="${c.status === 'active' ? 'Desativar' : 'Ativar'}">${c.status === 'active' ? '<i style="color: #ef4444;" class="fa-solid fa-toggle-off"></i>' : '<i style="color: #22c55e;" class="fa-solid fa-toggle-on"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteCompany('${c.id}', '${c.name.replace(/'/g, "\\'")}')" title="Excluir empresa"><i style="color: #ef4444;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    };

    const modalHtml = `
        <div id="company-modal" class="modal hidden">
            <div class="modal-content glass big-modal">
                <span class="close-modal">&times;</span>
                <h2 id="company-modal-title">Novo Cliente</h2>
                <form id="create-company-form">
                    <input type="hidden" id="company-id">
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Nome do Cliente</label>
                            <input type="text" id="company-name" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Limite de Instâncias</label>
                            <input type="number" id="company-instances-limit" min="1" value="1" required>
                        </div>
                    </div>

                    <div id="owner-section">
                        <h3>Dono do Cliente</h3>
                        <div class="form-row">
                            <div class="form-group half">
                                <label>Email</label>
                                <input type="email" id="owner-email">
                            </div>
                            <div class="form-group half">
                                <label>Senha</label>
                                <input type="password" id="owner-password">
                            </div>
                        </div>
                        <p style="font-size: 0.8em; color: #888; margin-top: -10px; margin-bottom: 10px;">Preencha apenas se for criar um novo usuário dono.</p>
                    </div>

                    <h3>Lojas / Unidades <span style="color: #ef4444;">*</span></h3>
                    <p style="font-size: 0.85em; color: #999; margin-top: -8px; margin-bottom: 12px;">Mínimo de 1 loja obrigatória</p>
                    <div class="stores-section">
                        <div id="stores-list">
                            <!-- Store inputs will be added here -->
                        </div>
                        <button type="button" id="btn-add-store" class="btn-secondary small"><i class="fa-solid fa-plus"></i> Adicionar Loja</button>
                    </div>

                    <h3>Módulos Ativos</h3>
                    <div class="form-row">
                        <div id="modules-select-container"></div>
                    </div>

                    <button type="submit" class="btn-primary full-width" style="margin-top:1rem;">Salvar Cliente</button>
                </form>
            </div>
        </div>
    `;

    const refreshTable = () => {
        const tbody = document.querySelector('.data-table tbody');
        if (tbody) {
            tbody.innerHTML = renderRows();
        }
    };

    // Global functions
    (window as any).editCompany = (id: string) => {
        const company = companies.find((c: any) => c.id === id);
        if (company) {
            (document.getElementById('company-id') as HTMLInputElement).value = company.id;
            (document.getElementById('company-name') as HTMLInputElement).value = company.name;
            (document.getElementById('company-instances-limit') as HTMLInputElement).value = (company.limite_instancias || '1').toString();

            // Set multi-select values
            if (modulesMS) {
                const modulos = company.modulos_ativos || ['ecommerce'];
                modulesMS.setValues(modulos);
            }

            document.getElementById('owner-section')!.style.display = 'none';
            (document.getElementById('owner-email') as HTMLInputElement).required = false;
            (document.getElementById('owner-password') as HTMLInputElement).required = false;

            const storesList = document.getElementById('stores-list')!;
            storesList.innerHTML = '';
            if (company.stores && company.stores.length > 0) {
                company.stores.forEach((s: any) => {
                    addStoreRow(s);
                });
            } else {
                addStoreRow();
            }

            document.getElementById('company-modal-title')!.innerText = 'Editar Cliente';
            document.getElementById('company-modal')!.classList.remove('hidden');
        }
    };

    (window as any).deleteCompany = async (id: string, name: string) => {
        // Modal de confirmação com digitação do nome
        const overlay = document.createElement('div');
        overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;`;
        overlay.innerHTML = `
            <div style="background:#1e1e2e;border:1px solid #ef4444;border-radius:16px;padding:2rem;max-width:440px;width:90%;box-shadow:0 0 40px rgba(239,68,68,0.3);">
                <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.25rem;">
                    <div style="width:44px;height:44px;background:rgba(239,68,68,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;font-size:1.2rem;"></i>
                    </div>
                    <h3 style="margin:0;color:#ef4444;font-size:1.1rem;">Excluir Empresa</h3>
                </div>
                <p style="color:#cbd5e1;margin-bottom:0.5rem;line-height:1.6;">
                    Esta ação é <strong style="color:white;">irreversível</strong>. Serão apagados permanentemente:
                </p>
                <ul style="color:#94a3b8;font-size:0.85rem;margin:0.5rem 0 1.25rem 1rem;line-height:2;">
                    <li>Todos os leads e mensagens</li>
                    <li>Todos os pedidos</li>
                    <li>Todos os produtos e categorias</li>
                    <li>Instâncias WhatsApp e configurações</li>
                    <li>Usuários, assinatura e histórico</li>
                </ul>
                <p style="color:#e2e8f0;margin-bottom:0.5rem;font-size:0.9rem;">
                    Digite <strong style="color:#ef4444;">${name}</strong> para confirmar:
                </p>
                <input id="delete-confirm-input" type="text" placeholder="Nome da empresa..."
                    style="width:100%;padding:0.75rem;background:#0f172a;border:1px solid #334155;border-radius:8px;color:white;font-size:0.95rem;margin-bottom:1rem;box-sizing:border-box;outline:none;">
                <div style="display:flex;gap:0.75rem;">
                    <button id="delete-cancel-btn" style="flex:1;padding:0.75rem;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid #334155;color:#94a3b8;cursor:pointer;font-size:0.9rem;">Cancelar</button>
                    <button id="delete-confirm-btn" disabled style="flex:1;padding:0.75rem;border-radius:8px;background:#ef4444;border:none;color:white;cursor:pointer;font-size:0.9rem;font-weight:700;opacity:0.4;transition:opacity 0.2s;">
                        <i class="fa-solid fa-trash" style="margin-right:6px;"></i>Excluir Tudo
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const input = overlay.querySelector('#delete-confirm-input') as HTMLInputElement;
        const confirmBtn = overlay.querySelector('#delete-confirm-btn') as HTMLButtonElement;
        const cancelBtn = overlay.querySelector('#delete-cancel-btn') as HTMLButtonElement;

        input.addEventListener('input', () => {
            const match = input.value.trim() === name;
            confirmBtn.disabled = !match;
            confirmBtn.style.opacity = match ? '1' : '0.4';
        });

        cancelBtn.addEventListener('click', () => overlay.remove());

        confirmBtn.addEventListener('click', async () => {
            confirmBtn.disabled = true;
            confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Excluindo...';

            try {
                const data = await backendApi.delete(`/admin/company/${id}`);

                overlay.remove();
                companies = companies.filter((c: any) => c.id !== id);
                refreshTable();
                toast.success(`Empresa "${name}" excluída — ${data.total} registros removidos.`);
            } catch (err: any) {
                overlay.remove();
                toast.error('Erro ao excluir: ' + err.message);
            }
        });

        setTimeout(() => input.focus(), 100);
    };

    (window as any).toggleCompanyStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        const action = newStatus === 'inactive' ? 'desativar' : 'ativar';

        let message = `Deseja ${action} este cliente?`;
        if (newStatus === 'inactive') {
            message += '\n\n⚠️ ATENÇÃO: Todos os usuários (dono e funcionários) serão BLOQUEADOS de fazer login!';
        }

        const confirmed = await confirm.warning(
            `${action.charAt(0).toUpperCase() + action.slice(1)} Cliente`,
            message
        );

        if (confirmed) {
            try {
                await dbService.update('companies', id, { status: newStatus });

                const company = companies.find((c: any) => c.id === id);
                if (company) company.status = newStatus;

                refreshTable();
                toast.success(`Cliente ${newStatus === 'inactive' ? 'desativado' : 'ativado'} com sucesso!`);
            } catch (error) {
                toast.error('Erro ao atualizar status: ' + error);
            }
        }
    };

    const addStoreRow = (store: any = null) => {
        const storesList = document.getElementById('stores-list');
        if (!storesList) return;

        const row = document.createElement('div');
        row.className = 'store-row';
        // Store existing data in data attributes to preserve them during edit
        if (store) {
            row.dataset.id = store.id;
            row.dataset.active = store.active !== undefined ? store.active : 'true';
            row.dataset.freteAtivo = store.frete_ativo !== undefined ? store.frete_ativo : 'true';
            row.dataset.instanciaId = store.instancia_id || '';
        }

        row.innerHTML = `
            <input type="text" placeholder="Nome da Loja" class="store-name" value="${store?.name || ''}" required>
            <input type="text" placeholder="Endereço Completo" class="store-address" value="${store?.address || ''}" required>
            <button type="button" class="btn-remove-store" title="Remover">✕</button>
        `;

        row.querySelector('.btn-remove-store')!.addEventListener('click', () => {
            row.remove();
        });

        storesList.appendChild(row);
    };

    const html = `
        <div class="page-header">
            <h2 class="page-title">Gestão de Clientes</h2>
            <button id="btn-new-company" class="btn-primary"><i class="fa-solid fa-plus"></i> Novo Cliente</button>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Módulos Ativos</th>
                            <th>Lojas</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderRows()}
                    </tbody>
                </table>
            </div>
        </div>
        ${modalHtml}
    `;

    function setupCompanyListeners(addStoreRow: Function) {
        const modal = document.getElementById('company-modal');
        const btn = document.getElementById('btn-new-company');
        const span = document.querySelector('.close-modal');
        const form = document.getElementById('create-company-form');
        const btnAddStore = document.getElementById('btn-add-store');
        const storesList = document.getElementById('stores-list');

        modulesMS = new MultiSelect(
            'modules-select-container',
            moduleOptions,
            ['ecommerce'],
            () => {},
            'Selecione os módulos...'
        );

        if (btn && modal) {
            btn.onclick = () => {
                (document.getElementById('company-id') as HTMLInputElement).value = '';
                (document.getElementById('create-company-form') as HTMLFormElement).reset();
                document.getElementById('owner-section')!.style.display = 'block';
                (document.getElementById('owner-email') as HTMLInputElement).required = true;
                (document.getElementById('owner-password') as HTMLInputElement).required = true;
                document.getElementById('company-modal-title')!.innerText = 'Novo Cliente';

                (document.getElementById('owner-password') as HTMLInputElement).required = true;
                document.getElementById('company-modal-title')!.innerText = 'Novo Cliente';

                if (modulesMS) {
                    modulesMS.setValues(['ecommerce']);
                }

                if (storesList) {
                    storesList.innerHTML = '';
                    addStoreRow();
                }

                modal.classList.remove('hidden');
            };
        }

        if (span && modal) {
            (span as HTMLElement).onclick = () => modal.classList.add('hidden');
        }

        if (btnAddStore) {
            btnAddStore.onclick = () => addStoreRow();
        }

        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                const id = (document.getElementById('company-id') as HTMLInputElement).value;
                const name = (document.getElementById('company-name') as HTMLInputElement).value;
                const email = (document.getElementById('owner-email') as HTMLInputElement).value;
                const password = (document.getElementById('owner-password') as HTMLInputElement).value;
                const instancesLimit = parseInt((document.getElementById('company-instances-limit') as HTMLInputElement).value) || 1;

                const modulos_ativos = modulesMS && modulesMS.getValues().length
                    ? modulesMS.getValues()
                    : ['ecommerce'];

                const storeRows = document.querySelectorAll('.store-row');
                const stores: any[] = [];
                storeRows.forEach((row: any, index) => {
                    const storeName = (row.querySelector('.store-name') as HTMLInputElement).value;
                    const storeAddress = (row.querySelector('.store-address') as HTMLInputElement).value;

                    if (storeName && storeAddress) {
                        const existingId = row.dataset.id;
                        const existingActive = row.dataset.active === 'false' ? false : true;
                        const existingFreteAtivo = row.dataset.freteAtivo === 'false' ? false : true;
                        const existingInstanciaId = row.dataset.instanciaId || null;

                        stores.push({
                            id: existingId || `store_${Date.now()}_${index}`,
                            name: storeName,
                            address: storeAddress,
                            active: existingActive,
                            frete_ativo: existingFreteAtivo,
                            instancia_id: existingInstanciaId
                        });
                    }
                });

                if (stores.length === 0) {
                    toast.warning('É necessário cadastrar pelo menos 1 loja!');
                    return;
                }

                try {
                    if (id) {
                        await dbService.update('companies', id, {
                            name,
                            stores,
                            limite_instancias: instancesLimit,
                            modulos_ativos
                        });

                        const company = companies.find((c: any) => c.id === id);
                        if (company) {
                            company.name = name;
                            company.stores = stores;
                            company.modulos_ativos = modulos_ativos;
                        }

                        toast.success('Cliente atualizado com sucesso!');
                    } else {
                        const ownerUid = await authService.registerUser(email, password);

                        // Note: Instance creation is now done by the client in the Instances page.

                        const companyId = await dbService.create('companies', {
                            name,
                            stores,
                            limite_instancias: instancesLimit,
                            status: 'active',
                            ownerId: ownerUid,
                            modulos_ativos,
                            metrics: { totalMessages: 0, totalPayments: 0 }
                        });
                        await dbService.set('users', ownerUid, {
                            uid: ownerUid,
                            email,
                            role: 'owner',
                            companyId: companyId
                        });

                        companies.push({
                            id: companyId,
                            name,
                            stores,
                            status: 'active',
                            ownerId: ownerUid,
                            modulos_ativos,
                            metrics: { totalMessages: 0, totalPayments: 0 }
                        } as Company);

                        toast.success('Cliente criado com sucesso!');
                    }

                    if (modal) modal.classList.add('hidden');
                    refreshTable();

                } catch (error) {
                    console.error(error);
                    toast.error('Erro: ' + error);
                }
            };
        }
    }

    setTimeout(() => {
        setupCompanyListeners(addStoreRow);
    }, 100);

    return html;
};
