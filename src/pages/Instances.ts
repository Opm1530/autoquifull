import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { evolutionApi } from '../services/evolutionApi';
import { confirm } from '../services/confirm';

interface Instance {
    id: string;
    empresaId: string;
    lojaId?: string;
    nome: string;
    numero?: string;
    status: 'conectado' | 'desconectado';
    funcao?: string;
    webhookUrl?: string;
    upsert: boolean;
    createdAt: any;
}

export const Instances = async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.companyId) {
        return `<p>Acesso negado.</p>`;
    }

    const companyDoc = await dbService.get('companies', currentUser.companyId);
    const company = companyDoc as any;
    const limit = company.limite_instancias || 1;

    let instances = await dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: currentUser.companyId }) as Instance[];

    // Verify statuses against API in background
    const verifyStatuses = async () => {
        let changed = false;
        for (const inst of instances) {
            try {
                const apiStatus = await evolutionApi.getInstanceStatus(inst.nome);
                const currentStatus = apiStatus.connected ? 'conectado' : 'desconectado';

                if (currentStatus !== inst.status) {
                    await dbService.update('instancias', inst.id, { status: currentStatus });
                    inst.status = currentStatus as any;
                    changed = true;
                }
            } catch (e) {
                console.error('Error verifying status for', inst.nome, e);
            }
        }
        if (changed) {
            refreshTable();
        }
    };

    setTimeout(verifyStatuses, 500);

    const renderRows = () => {
        if (instances.length === 0) {
            return `<tr><td colspan="7" style="text-align:center">Nenhuma instância criada.</td></tr>`;
        }
        return instances.map((inst: Instance) => `
            <tr>
                <td>${inst.nome}</td>
                <td>${inst.numero ? inst.numero.split('@')[0] : '-'}</td>
                <td>
                    <span class="badge ${getStatusBadge(inst.status)}">
                        ${getStatusLabel(inst.status)}
                    </span>
                </td>
                <td><span class="badge info">${company.stores?.find((s: any) => s.id === inst.lojaId)?.name || 'Global'}</span></td>
                <td>
                    <span class="badge ${getFuncaoBadge(inst.funcao)}" style="cursor:pointer;" onclick="window.editInstance('${inst.id}', '${inst.funcao || ''}', '${inst.lojaId || ''}')" title="Clique para editar">
                        ${getFuncaoLabel(inst.funcao)} <i class="fa-solid fa-pen" style="font-size:0.6rem; opacity:0.7; margin-left:4px;"></i>
                    </span>
                </td>
                <td>${inst.createdAt?.toDate ? inst.createdAt.toDate().toLocaleDateString() : 'N/A'}</td>
                <td>
                    <div class="actions">
                        ${inst.status === 'desconectado' ?
                `<button class="action-btn" onclick="window.connectInstance('${inst.nome}')" title="Conectar"><i class="fa-solid fa-qrcode"></i></button>` :
                ''
            }
                        <button class="action-btn" onclick="window.shareQR('${inst.nome}')" title="Compartilhar Link QR" style="background-color: #6366f1; border-color: #6366f1; color: white;"><i class="fa-solid fa-share-nodes"></i></button>
                        <button class="action-btn" onclick="window.editInstance('${inst.id}', '${inst.funcao || ''}', '${inst.lojaId || ''}')" title="Configurar" style="background-color: #0ea5e9; border-color: #0ea5e9; color: white;"><i class="fa-solid fa-sliders"></i></button>
                        ${inst.status === 'conectado' ?
                `<button class="action-btn" onclick="window.logoutInstance('${inst.id}', '${inst.nome}')" title="Desconectar" style="background-color: var(--warning); border-color: var(--warning); color: white;"><i class="fa-solid fa-right-from-bracket"></i></button>` :
                ''
            }
                        <button class="action-btn" onclick="window.deleteInstance('${inst.id}', '${inst.nome}')" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'conectado': return 'success';
            case 'desconectado': return 'danger';
            default: return 'secondary';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'conectado': return 'Conectado';
            case 'desconectado': return 'Desconectado';
            default: return status;
        }
    };

    const getFuncaoBadge = (funcao?: string) => {
        switch (funcao) {
            case 'agendamento': return 'primary';
            case 'venda': return 'success';
            case 'catalogo': return 'info';
            default: return 'secondary';
        }
    };

    const getFuncaoLabel = (funcao?: string) => {
        switch (funcao) {
            case 'agendamento': return '📅 Agendamento';
            case 'venda': return '🛍️ Vendas';
            case 'catalogo': return '🏪 Catálogo';
            default: return 'Sem função';
        }
    };

    const modalHtml = `
        <div id="new-instance-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal" id="close-new-modal">&times;</span>
                <h2>Nova Instância</h2>
                <form id="create-instance-form">
                    <div class="form-group">
                        <label>Identificador da Instância (Uso Interno)</label>
                        <input type="text" id="instance-name" required placeholder="Ex: Matriz 01, Vendas Norte...">
                    </div>
                    <button type="submit" class="btn-primary full-width" style="margin-top: 1rem;">Criar e Gerar QR Code</button>
                </form>
            </div>
        </div>

        <div id="qrcode-modal" class="modal hidden">
            <div class="modal-content glass" style="text-align: center;">
                <span class="close-modal" id="close-qr-modal">&times;</span>
                <h2>Conectar WhatsApp</h2>
                <p>Escaneie o QR Code abaixo com o seu WhatsApp.</p>
                <div id="qrcode-container" style="margin: 20px auto; width: 250px; height: 250px; background: #eee; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                </div>
                <button id="btn-done-qrcode" class="btn-primary full-width">Concluir</button>
            </div>
        </div>

        <div id="edit-instance-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 420px;">
                <span class="close-modal" id="close-edit-modal">&times;</span>
                <h2><i class="fa-solid fa-sliders"></i> Configurar Instância</h2>
                <input type="hidden" id="edit-instance-id">
                <div class="form-group" style="margin-top: 1.2rem;">
                    <label>Função da IA</label>
                    <select id="edit-funcao" class="form-control">
                        <option value="">— Sem função —</option>
                        <option value="venda">🛍️ IA Vendas (WhatsApp)</option>
                        <option value="agendamento">📅 IA Agendamento</option>
                        <option value="catalogo">🏪 Catálogo</option>
                    </select>
                    <small style="color: var(--text-dim); margin-top: 0.4rem; display: block;">
                        Determina qual IA responde às mensagens desta instância.
                    </small>
                </div>
                <div class="form-group">
                    <label>Loja vinculada</label>
                    <select id="edit-loja" class="form-control">
                        <option value="">— Global (todas as lojas) —</option>
                        ${(company.stores || []).map((s: any) => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                </div>
                <button id="btn-save-instance-config" class="btn-primary full-width" style="margin-top: 1rem;">
                    <i class="fa-solid fa-floppy-disk"></i> Salvar Configuração
                </button>
            </div>
        </div>
    `;

    const refreshTable = () => {
        const tbody = document.querySelector('.data-table tbody');
        if (tbody) {
            tbody.innerHTML = renderRows();
        }
    };

    let qrInterval: any = null;
    let statusInterval: any = null;

    const stopPolling = () => {
        if (qrInterval) clearInterval(qrInterval);
        if (statusInterval) clearInterval(statusInterval);
        qrInterval = null;
        statusInterval = null;
    };

    // Global Functions
    (window as any).refreshApp = () => {
        window.location.reload();
    };

    (window as any).shareQR = (instanceName: string) => {
        const url = `${window.location.origin}/qr/${instanceName}`;
        navigator.clipboard.writeText(url);
        toast.success('Link de conexão copiado para a área de transferência!');
    };

    (window as any).editInstance = (id: string, currentFuncao: string, currentLojaId: string) => {
        const editModal = document.getElementById('edit-instance-modal');
        if (!editModal) return;

        (document.getElementById('edit-instance-id') as HTMLInputElement).value = id;

        const funcaoSelect = document.getElementById('edit-funcao') as HTMLSelectElement;
        funcaoSelect.value = currentFuncao || '';

        const lojaSelect = document.getElementById('edit-loja') as HTMLSelectElement;
        lojaSelect.value = currentLojaId || '';

        editModal.classList.remove('hidden');
    };

    (window as any).deleteInstance = async (id: string, name: string) => {
        const confirmed = await confirm.danger(
            'Excluir Instância',
            `Tem certeza que deseja excluir a instância "${name}"? Isso irá desconectar o WhatsApp.`
        );

        if (confirmed) {
            try {
                await evolutionApi.deleteInstance(name);
                await dbService.delete('instancias', id);
                instances = instances.filter(i => i.id !== id);
                refreshTable();
                toast.success('Instância excluída com sucesso.');
            } catch (error) {
                toast.error('Erro ao excluir instância: ' + error);
            }
        }
    };

    (window as any).logoutInstance = async (id: string, name: string) => {
        const confirmed = await confirm.warning(
            'Desconectar WhatsApp',
            `Deseja realmente desconectar o WhatsApp da instância "${name}"?`
        );

        if (confirmed) {
            try {
                toast.info('Desconectando...');
                const success = await evolutionApi.logoutInstance(name);
                if (success) {
                    await dbService.update('instancias', id, { status: 'desconectado' });
                    const inst = instances.find(i => i.id === id);
                    if (inst) inst.status = 'desconectado';
                    refreshTable();
                    toast.success('Desconectado com sucesso.');
                } else {
                    toast.error('Não foi possível desconectar pela API. Verifique se a instância está ativa.');
                }
            } catch (error) {
                toast.error('Erro ao desconectar: ' + error);
            }
        }
    };

    (window as any).connectInstance = async (instanceName: string) => {
        const qrModal = document.getElementById('qrcode-modal');
        const qrContainer = document.getElementById('qrcode-container');
        if (qrModal && qrContainer) {
            qrModal.classList.remove('hidden');
            qrContainer.innerHTML = '<i class="fa-solid fa-spinner fa-spin fa-2x"></i>';

            const fetchQR = async () => {
                try {
                    const result = await evolutionApi.getQRCode(instanceName);
                    if (result && result.base64) {
                        qrContainer.innerHTML = `<img src="${result.base64}" style="width: 100%; height: 100%; object-fit: contain;">`;
                    } else {
                        const status = await evolutionApi.getInstanceStatus(instanceName);
                        if (status.connected) {
                            handleConnected();
                        } else {
                            qrContainer.innerHTML = '<p>Erro ao obter QR Code. Verifique se a instância está ativa.</p>';
                        }
                    }
                } catch (e) {
                    console.error('Error fetching QR:', e);
                }
            };

            const checkStatus = async () => {
                try {
                    const status = await evolutionApi.getInstanceStatus(instanceName);
                    if (status.connected) {
                        handleConnected();
                    }
                } catch (e) {
                    console.error('Error checking status:', e);
                }
            };

            const handleConnected = async () => {
                stopPolling();
                toast.success('WhatsApp conectado com sucesso!');
                qrModal.classList.add('hidden');

                const inst = instances.find(i => i.nome === instanceName);
                if (inst) {
                    await dbService.update('instancias', inst.id, { status: 'conectado' });
                    inst.status = 'conectado';
                    refreshTable();
                }
            };

            await fetchQR();
            qrInterval = setInterval(fetchQR, 40000);
            statusInterval = setInterval(checkStatus, 3000);
        }
    };

    setTimeout(() => {
        setupListeners(company.id, limit);
    }, 100);

    function setupListeners(companyId: string, limitCount: number) {
        const btnNew = document.getElementById('btn-new-instance');
        const newModal = document.getElementById('new-instance-modal');
        const closeNew = document.getElementById('close-new-modal');
        const formNew = document.getElementById('create-instance-form');

        const qrModal = document.getElementById('qrcode-modal');
        const closeQr = document.getElementById('close-qr-modal');
        const btnDoneQr = document.getElementById('btn-done-qrcode');

        if (btnNew) {
            btnNew.onclick = () => {
                if (instances.length >= limitCount) {
                    toast.error('Limite de instâncias atingido.');
                    return;
                }
                newModal?.classList.remove('hidden');
            };
        }

        if (closeNew && newModal) {
            closeNew.onclick = () => newModal.classList.add('hidden');
        }

        if (formNew) {
            formNew.onsubmit = async (e) => {
                e.preventDefault();
                const nameInput = document.getElementById('instance-name') as HTMLInputElement;
                let name = nameInput.value.trim();

                name = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                const uniqueName = `${name}_${companyId.substring(0, 5)}`;

                try {
                    const exists = await evolutionApi.instanceExists(uniqueName);
                    if (exists) {
                        toast.warning('Já existe uma instância com esse nome. Tente outro.');
                        return;
                    }

                    toast.info('Criando instância, aguarde...');
                    await evolutionApi.createInstance(uniqueName);

                    const newInstance = {
                        empresaId: companyId,
                        lojaId: null,
                        nome: uniqueName,
                        numero: null,
                        status: 'desconectado' as const,
                        funcao: null,
                        webhookUrl: null,
                        upsert: false
                    };

                    const id = await dbService.create('instancias', newInstance);
                    instances.push({ id, ...newInstance, createdAt: { toDate: () => new Date() } } as any);

                    toast.success('Instância criada! Agora vincule-a a uma loja nas configurações.');
                    newModal?.classList.add('hidden');
                    refreshTable();
                    (window as any).connectInstance(uniqueName);
                } catch (error) {
                    toast.error('Erro ao criar instância: ' + error);
                }
            };
        }

        if (closeQr && qrModal) {
            closeQr.onclick = () => {
                stopPolling();
                qrModal.classList.add('hidden');
            };
        }

        if (btnDoneQr && qrModal) {
            btnDoneQr.onclick = async () => {
                stopPolling();
                qrModal.classList.add('hidden');
                window.location.reload();
            };
        }

        // ── Modal de edição (função + loja) ──────────────────────
        const editModal = document.getElementById('edit-instance-modal');
        const closeEdit = document.getElementById('close-edit-modal');
        const btnSaveConfig = document.getElementById('btn-save-instance-config');

        if (closeEdit && editModal) {
            closeEdit.onclick = () => editModal.classList.add('hidden');
        }

        if (btnSaveConfig) {
            btnSaveConfig.onclick = async () => {
                const id = (document.getElementById('edit-instance-id') as HTMLInputElement).value;
                const funcao = (document.getElementById('edit-funcao') as HTMLSelectElement).value;
                const lojaId = (document.getElementById('edit-loja') as HTMLSelectElement).value;

                if (!id) return;

                btnSaveConfig.setAttribute('disabled', 'true');
                const originalText = btnSaveConfig.innerHTML;
                btnSaveConfig.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';

                try {
                    await dbService.update('instancias', id, {
                        funcao: funcao || null,
                        lojaId: lojaId || null,
                    });

                    // Atualiza localmente
                    const inst = instances.find(i => i.id === id);
                    if (inst) {
                        inst.funcao = funcao as any;
                        inst.lojaId = lojaId;
                        refreshTable();
                    }

                    editModal?.classList.add('hidden');
                    toast.success('Configuração salva com sucesso!');
                } catch (error) {
                    toast.error('Erro ao salvar: ' + error);
                } finally {
                    btnSaveConfig.removeAttribute('disabled');
                    btnSaveConfig.innerHTML = originalText;
                }
            };
        }
    }

    return `
        <div class="page-header">
            <h2 class="page-title">Gerenciar Instâncias</h2>
            <button id="btn-new-instance" class="btn-primary" ${instances.length >= limit ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <i class="fa-solid fa-plus"></i> Nova Instância
            </button>
        </div>
        
        <div class="card">
            <div class="stats-row" style="margin-bottom: 20px; display: flex; gap: 20px;">
                <div class="stat-item">
                    <strong>Limite:</strong> ${limit}
                </div>
                <div class="stat-item">
                    <strong>Utilizadas:</strong> ${instances.length}
                </div>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Identificador</th>
                            <th>Número</th>
                            <th>Status</th>
                            <th>Loja</th>
                            <th>Função</th>
                            <th>Criado Em</th>
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
};
