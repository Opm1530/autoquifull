/**
 * Backend Config — Configuração do servidor backend (Admin only)
 *
 * Substitui a página antiga de webhooks n8n.
 * Agora o admin configura a URL base do backend e o sistema
 * auto-gera os webhooks por instância no formato:
 *   {backendUrl}/webhook/evolution/{instanceName}
 */

import { dbService } from '../services/db';
import { toast } from '../services/toast';
import { evolutionApi } from '../services/evolutionApi';

interface BackendSettings {
    url: string;
    updatedAt?: any;
}

interface Instance {
    id: string;
    nome: string;
    empresaId: string;
    lojaId?: string;
    funcao?: string;
    status?: string;
    webhookUrl?: string;
    numero?: string;
}

export const Webhooks = async () => {
    // Carrega config atual do backend
    let settings: BackendSettings = { url: '' };
    let instances: Instance[] = [];

    try {
        const data = await dbService.get('settings', 'backend') as any;
        if (data) settings = { ...settings, ...data };
    } catch {}

    try {
        instances = await dbService.getAll('instancias') as Instance[];
        instances.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
    } catch {}

    const backendUrl = settings.url || '';

    const funcaoLabels: Record<string, { label: string; color: string; icon: string }> = {
        agendamento: { label: 'IA Agendamento', color: '#6366f1', icon: 'fa-calendar-alt' },
        venda:       { label: 'IA Vendas',       color: '#10b981', icon: 'fa-cart-shopping' },
        atendimento: { label: 'IA Atendimento',  color: '#f59e0b', icon: 'fa-comments' },
        disparo:     { label: 'Disparo',          color: '#64748b', icon: 'fa-paper-plane' },
    };

    const renderInstances = () => {
        if (instances.length === 0) {
            return `<div class="bk-empty">
                <i class="fa-solid fa-server"></i>
                <p>Nenhuma instância cadastrada ainda.</p>
            </div>`;
        }

        return instances.map(inst => {
            const funcao = inst.funcao || '';
            const cfg = funcaoLabels[funcao] || { label: funcao || '—', color: '#64748b', icon: 'fa-link' };
            const webhookGenerated = backendUrl && inst.nome
                ? `${backendUrl}/webhook/evolution/${inst.nome}`
                : '';
            const isSynced = inst.webhookUrl && webhookGenerated && inst.webhookUrl === webhookGenerated;

            return `
            <div class="bk-instance-row" id="inst-row-${inst.id}">
                <div class="bk-inst-info">
                    <div class="bk-inst-name">
                        <i class="fa-brands fa-whatsapp" style="color:#25d366;"></i>
                        <strong>${inst.nome}</strong>
                        ${inst.numero ? `<span class="bk-inst-num">${inst.numero.replace('@s.whatsapp.net', '')}</span>` : ''}
                    </div>
                    <div class="bk-inst-meta">
                        ${funcao ? `<span class="bk-badge" style="background:${cfg.color}22;color:${cfg.color};border-color:${cfg.color}44;">
                            <i class="fa-solid ${cfg.icon}"></i> ${cfg.label}
                        </span>` : `<span class="bk-badge" style="color:var(--text-dim);border-color:var(--border-color);">
                            <i class="fa-solid fa-circle-question"></i> Sem módulo
                        </span>`}
                        ${isSynced
                            ? `<span class="bk-badge" style="background:#10b98122;color:#10b981;border-color:#10b98144;"><i class="fa-solid fa-circle-check"></i> Webhook configurado</span>`
                            : `<span class="bk-badge" style="background:#f59e0b22;color:#f59e0b;border-color:#f59e0b44;"><i class="fa-solid fa-triangle-exclamation"></i> Webhook pendente</span>`
                        }
                    </div>
                    ${webhookGenerated ? `<div class="bk-webhook-url" title="${webhookGenerated}">
                        <i class="fa-solid fa-link" style="font-size:0.75rem;opacity:0.5;"></i>
                        <code>${webhookGenerated}</code>
                    </div>` : ''}
                </div>
                <div class="bk-inst-actions">
                    ${webhookGenerated && funcao ? `
                    <button class="bk-sync-btn" onclick="window.syncInstanceWebhook('${inst.id}', '${inst.nome}', '${webhookGenerated}')"
                        title="Configurar webhook na Evolution API">
                        <i class="fa-solid fa-rotate"></i> Sincronizar
                    </button>` : `
                    <span style="font-size:0.8rem;color:var(--text-dim);">Configure o módulo nas Instâncias</span>
                    `}
                </div>
            </div>`;
        }).join('');
    };

    setTimeout(() => setupListeners(instances, backendUrl), 100);

    return `
    <style>
        .bk-section { margin-bottom: 2rem; }
        .bk-section-title {
            font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
            letter-spacing: 1px; color: var(--text-dim); margin-bottom: 1rem;
            display: flex; align-items: center; gap: 8px;
        }
        .bk-url-row {
            display: flex; gap: 0.75rem; align-items: flex-end;
        }
        .bk-url-row .form-group { flex: 1; margin-bottom: 0; }
        .bk-url-row .form-input { font-family: monospace; font-size: 0.9rem; }

        .bk-status-bar {
            display: flex; align-items: center; gap: 0.75rem;
            background: var(--surface-hover); border: 1px solid var(--border-color);
            border-radius: 10px; padding: 0.75rem 1rem; margin-top: 1rem;
            font-size: 0.88rem;
        }
        .bk-status-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .bk-status-dot.online  { background: #10b981; box-shadow: 0 0 6px #10b98166; }
        .bk-status-dot.offline { background: #ef4444; box-shadow: 0 0 6px #ef444466; }
        .bk-status-dot.pending { background: #f59e0b; animation: bk-pulse 1.5s infinite; }
        @keyframes bk-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        .bk-instance-row {
            display: flex; align-items: center; gap: 1rem;
            background: var(--surface-hover); border: 1px solid var(--border-color);
            border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 0.5rem;
            transition: border-color 0.2s;
        }
        .bk-instance-row:hover { border-color: rgba(99,102,241,0.3); }
        .bk-inst-info { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .bk-inst-name { display: flex; align-items: center; gap: 8px; }
        .bk-inst-num { font-size: 0.82rem; color: var(--text-dim); background: rgba(255,255,255,0.05); padding: 1px 8px; border-radius: 20px; }
        .bk-inst-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .bk-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 0.75rem; font-weight: 600; padding: 2px 10px; border-radius: 20px; border: 1px solid; }
        .bk-webhook-url { display: flex; align-items: center; gap: 6px; }
        .bk-webhook-url code { font-size: 0.75rem; color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 400px; }
        .bk-inst-actions { flex-shrink: 0; }
        .bk-sync-btn {
            display: flex; align-items: center; gap: 6px;
            background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3);
            color: var(--primary); border-radius: 8px; padding: 6px 14px;
            font-size: 0.85rem; font-weight: 600; transition: all 0.2s; cursor: pointer;
        }
        .bk-sync-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }
        .bk-sync-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .bk-empty { text-align: center; padding: 2.5rem; color: var(--text-dim); }
        .bk-empty i { font-size: 2.5rem; opacity: 0.3; margin-bottom: 0.75rem; display: block; }

        .bk-info-box {
            background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.2);
            border-radius: 10px; padding: 1rem 1.25rem; font-size: 0.88rem;
            color: var(--text-muted); display: flex; gap: 10px; align-items: flex-start;
            margin-bottom: 1.5rem;
        }
        .bk-info-box i { color: var(--primary); margin-top: 2px; flex-shrink: 0; }
    </style>

    <div class="page-header" style="margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-server" style="color:var(--primary);margin-right:10px;"></i>Configuração do Backend
            </h2>
            <p style="color:var(--text-muted);font-size:0.9rem;">Conecte o backend de IA e configure os webhooks de cada instância.</p>
        </div>
    </div>

    <div class="bk-info-box">
        <i class="fa-solid fa-circle-info"></i>
        <div>
            <strong>Como funciona:</strong> Configure a URL do backend abaixo e clique em <em>Sincronizar</em> em cada instância para registrar o webhook automaticamente na Evolution API.
            O backend roteia as mensagens para o módulo correto (Agendamento, Vendas, etc.) com base na configuração da instância.
        </div>
    </div>

    <!-- URL do Backend -->
    <div class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
        <div class="bk-section-title"><i class="fa-solid fa-globe"></i> URL do Backend</div>
        <div class="bk-url-row">
            <div class="form-group">
                <label class="form-label">Endereço do servidor</label>
                <input type="url" id="backend-url" class="form-input bk-url-row .form-input"
                    placeholder="https://api.seudominio.com"
                    value="${backendUrl}"
                    style="font-family:monospace;">
            </div>
            <button id="btn-test-connection" class="btn-secondary" style="height:42px;padding:0 1.25rem;flex-shrink:0;">
                <i class="fa-solid fa-plug"></i> Testar
            </button>
            <button id="btn-save-backend" class="btn-primary" style="height:42px;padding:0 1.25rem;flex-shrink:0;">
                <i class="fa-solid fa-save"></i> Salvar
            </button>
        </div>
        <div id="connection-status" class="bk-status-bar" style="display:none;">
            <div class="bk-status-dot pending" id="status-dot"></div>
            <span id="status-text">Verificando conexão...</span>
        </div>
    </div>

    <!-- Instâncias -->
    <div class="card" style="padding:1.5rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
            <div class="bk-section-title" style="margin-bottom:0;"><i class="fa-solid fa-plug"></i> Instâncias (${instances.length})</div>
            <button id="btn-sync-all" class="btn-secondary" style="font-size:0.85rem;padding:6px 14px;" ${!backendUrl ? 'disabled' : ''}>
                <i class="fa-solid fa-rotate"></i> Sincronizar Todas
            </button>
        </div>
        <div id="instances-list">
            ${renderInstances()}
        </div>
    </div>`;
};

function setupListeners(instances: Instance[], initialBackendUrl: string) {
    let currentBackendUrl = initialBackendUrl;

    // Salvar URL do backend
    document.getElementById('btn-save-backend')?.addEventListener('click', async () => {
        const url = (document.getElementById('backend-url') as HTMLInputElement).value.trim().replace(/\/$/, '');
        if (!url) { toast.warning('Informe a URL do backend.'); return; }

        const btn = document.getElementById('btn-save-backend') as HTMLButtonElement;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';

        try {
            await dbService.set('settings', 'backend', { url, updatedAt: new Date() });
            currentBackendUrl = url;
            toast.success('URL do backend salva! Agora sincronize as instâncias.');

            // Habilita o botão de sincronizar todas
            const syncAll = document.getElementById('btn-sync-all') as HTMLButtonElement;
            if (syncAll) syncAll.disabled = false;
        } catch {
            toast.error('Erro ao salvar configurações.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-save"></i> Salvar';
        }
    });

    // Testar conexão
    document.getElementById('btn-test-connection')?.addEventListener('click', async () => {
        const url = (document.getElementById('backend-url') as HTMLInputElement).value.trim().replace(/\/$/, '');
        if (!url) { toast.warning('Informe a URL do backend primeiro.'); return; }

        const bar = document.getElementById('connection-status')!;
        const dot = document.getElementById('status-dot')!;
        const text = document.getElementById('status-text')!;

        bar.style.display = 'flex';
        dot.className = 'bk-status-dot pending';
        text.textContent = 'Verificando conexão...';

        try {
            const res = await fetch(`${url}/health`, { signal: AbortSignal.timeout(5000) });
            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                dot.className = 'bk-status-dot online';
                text.innerHTML = `<strong style="color:#10b981;">Online</strong> — Backend respondendo normalmente. Uptime: ${Math.floor((data.uptime || 0) / 60)} min`;
            } else {
                dot.className = 'bk-status-dot offline';
                text.innerHTML = `<strong style="color:#ef4444;">Erro ${res.status}</strong> — Backend retornou erro.`;
            }
        } catch (err: any) {
            dot.className = 'bk-status-dot offline';
            text.innerHTML = `<strong style="color:#ef4444;">Offline</strong> — Não foi possível conectar. Verifique se o backend está rodando.`;
        }
    });

    // Sincronizar instância individual
    (window as any).syncInstanceWebhook = async (id: string, nome: string, webhookUrl: string) => {
        const btn = document.querySelector(`#inst-row-${id} .bk-sync-btn`) as HTMLButtonElement;
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sincronizando...';
        }

        try {
            const ok = await evolutionApi.setWebhook(nome, webhookUrl, true);
            if (ok) {
                await dbService.update('instancias', id, { webhookUrl, updatedAt: new Date() });
                toast.success(`Webhook de "${nome}" configurado com sucesso!`);
                if (btn) {
                    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Sincronizado';
                    btn.style.cssText = 'background:#10b98122;border-color:#10b98144;color:#10b981;';
                }
            } else {
                toast.error(`Falha ao configurar webhook de "${nome}". Verifique se a instância existe na Evolution API.`);
                if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Sincronizar'; }
            }
        } catch (err: any) {
            toast.error('Erro: ' + err.message);
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Sincronizar'; }
        }
    };

    // Sincronizar todas
    document.getElementById('btn-sync-all')?.addEventListener('click', async () => {
        const url = currentBackendUrl || (document.getElementById('backend-url') as HTMLInputElement)?.value.trim().replace(/\/$/, '');
        if (!url) { toast.warning('Salve a URL do backend primeiro.'); return; }

        const eligible = instances.filter(i => i.funcao && i.nome);
        if (eligible.length === 0) { toast.warning('Nenhuma instância com módulo configurado.'); return; }

        const btn = document.getElementById('btn-sync-all') as HTMLButtonElement;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sincronizando...';

        let success = 0;
        for (const inst of eligible) {
            const webhookUrl = `${url}/webhook/evolution/${inst.nome}`;
            try {
                const ok = await evolutionApi.setWebhook(inst.nome, webhookUrl, true);
                if (ok) {
                    await dbService.update('instancias', inst.id, { webhookUrl });
                    success++;
                }
            } catch {}
        }

        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Sincronizar Todas';
        toast.success(`${success}/${eligible.length} instâncias sincronizadas com sucesso!`);
    });
}
