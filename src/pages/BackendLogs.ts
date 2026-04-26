/**
 * BackendLogs — visualização dos logs do servidor em tempo real
 * Acessível em /admin/logs (admin only)
 */

import { backendApi } from '../services/backendApi';
import { toast } from '../services/toast';

interface LogLine {
    ts: string;
    level: 'info' | 'warn' | 'error';
    text: string;
}

export const BackendLogs = async (): Promise<string> => {
    // Carrega logs iniciais
    let logs: LogLine[] = [];
    try {
        const data = await backendApi.get('/admin/logs?lines=300');
        logs = data.logs || [];
    } catch (err: any) {
        return `<div style="padding:2rem;color:var(--danger);">
            <i class="fa-solid fa-triangle-exclamation"></i>
            Erro ao carregar logs: ${err.message}
        </div>`;
    }

    const renderLines = (lines: LogLine[]) => lines.map(l => {
        const time = new Date(l.ts).toLocaleTimeString('pt-BR', { hour12: false });
        const color =
            l.level === 'error' ? 'var(--danger)' :
            l.level === 'warn'  ? '#f59e0b' : 'var(--text-main)';

        // Destaca palavras chave
        const text = l.text
            .replace(/← RECV/g, '<span style="color:#60a5fa;font-weight:700;">← RECV</span>')
            .replace(/→ SEND/g, '<span style="color:#c084fc;font-weight:700;">→ SEND</span>')
            .replace(/✓ OK/g,   '<span style="color:#34d399;font-weight:700;">✓ OK</span>')
            .replace(/✗/g,      '<span style="color:var(--danger);font-weight:700;">✗</span>')
            .replace(/⚠/g,      '<span style="color:#f59e0b;">⚠</span>')
            .replace(/🤖/g,      '<span>🤖</span>')
            .replace(/🔧/g,      '<span>🔧</span>');

        return `<div class="log-line" style="color:${color};">
            <span class="log-ts">${time}</span>
            <span class="log-text">${text}</span>
        </div>`;
    }).join('');

    setTimeout(() => setupLogListeners(), 100);

    return `
    <style>
        .log-container {
            background: #0d1117; border-radius: 12px; border: 1px solid var(--border-color);
            font-family: 'Courier New', monospace; font-size: 0.78rem; line-height: 1.6;
            overflow: hidden; display: flex; flex-direction: column;
            height: calc(100vh - 220px); min-height: 400px;
        }
        .log-toolbar {
            display: flex; align-items: center; gap: 0.75rem;
            padding: 0.75rem 1rem; background: #161b22;
            border-bottom: 1px solid #30363d; flex-shrink: 0;
        }
        .log-toolbar input {
            flex: 1; background: #0d1117; border: 1px solid #30363d;
            border-radius: 6px; padding: 4px 10px; color: #e6edf3;
            font-family: monospace; font-size: 0.78rem;
        }
        .log-toolbar input:focus { outline: none; border-color: #58a6ff; }
        .log-body {
            flex: 1; overflow-y: auto; padding: 0.5rem 0;
            scroll-behavior: smooth;
        }
        .log-line {
            display: flex; gap: 0.75rem; padding: 1px 1rem;
            white-space: pre-wrap; word-break: break-all;
        }
        .log-line:hover { background: rgba(255,255,255,0.03); }
        .log-ts { color: #484f58; flex-shrink: 0; }
        .log-text { flex: 1; }
        .log-badge {
            display: inline-flex; align-items: center; gap: 5px;
            font-size: 0.7rem; font-weight: 700; padding: 2px 8px;
            border-radius: 4px; border: 1px solid;
        }
        .log-auto-badge {
            font-size: 0.72rem; color: #484f58;
        }
    </style>

    <div class="page-header" style="margin-bottom:1.25rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-terminal" style="color:var(--primary);margin-right:10px;"></i>Logs do Servidor
            </h2>
            <p style="color:var(--text-muted);font-size:0.88rem;">Logs em tempo real do backend de IA.</p>
        </div>
        <div style="display:flex;gap:0.75rem;align-items:center;">
            <span id="log-auto-label" class="log-auto-badge">auto-refresh: <strong id="log-auto-state">ON</strong></span>
            <button id="btn-toggle-auto" class="btn-secondary" style="font-size:0.82rem;padding:6px 12px;">
                <i class="fa-solid fa-pause"></i> Pausar
            </button>
            <button id="btn-refresh-logs" class="btn-secondary" style="font-size:0.82rem;padding:6px 12px;">
                <i class="fa-solid fa-rotate"></i> Atualizar
            </button>
            <button id="btn-scroll-bottom" class="btn-primary" style="font-size:0.82rem;padding:6px 12px;">
                <i class="fa-solid fa-arrow-down"></i> Final
            </button>
        </div>
    </div>

    <div class="log-container">
        <div class="log-toolbar">
            <i class="fa-solid fa-magnifying-glass" style="color:#484f58;"></i>
            <input type="text" id="log-filter" placeholder="Filtrar logs... (ex: RECV, ERROR, phone number)">
            <span id="log-count" style="color:#484f58;font-size:0.72rem;flex-shrink:0;">${logs.length} linhas</span>
        </div>
        <div class="log-body" id="log-body">
            ${renderLines(logs)}
        </div>
    </div>`;
};

function setupLogListeners() {
    const body      = document.getElementById('log-body');
    const filterEl  = document.getElementById('log-filter') as HTMLInputElement;
    const countEl   = document.getElementById('log-count');
    const autoState = document.getElementById('log-auto-state');
    const toggleBtn = document.getElementById('btn-toggle-auto') as HTMLButtonElement;
    const refreshBtn = document.getElementById('btn-refresh-logs') as HTMLButtonElement;
    const scrollBtn = document.getElementById('btn-scroll-bottom') as HTMLButtonElement;

    let allLogs: any[] = [];
    let autoRefresh = true;
    let interval: any;

    const scrollToBottom = () => {
        if (body) body.scrollTop = body.scrollHeight;
    };

    const renderLines = (lines: LogLine[]) => lines.map(l => {
        const time = new Date(l.ts).toLocaleTimeString('pt-BR', { hour12: false });
        const color =
            l.level === 'error' ? 'var(--danger)' :
            l.level === 'warn'  ? '#f59e0b' : '#e6edf3';

        const text = l.text
            .replace(/← RECV/g, '<span style="color:#60a5fa;font-weight:700;">← RECV</span>')
            .replace(/→ SEND/g, '<span style="color:#c084fc;font-weight:700;">→ SEND</span>')
            .replace(/✓ OK/g,   '<span style="color:#34d399;font-weight:700;">✓ OK</span>')
            .replace(/✗/g,      '<span style="color:#f85149;font-weight:700;">✗</span>')
            .replace(/⚠/g,      '<span style="color:#f59e0b;">⚠</span>');

        return `<div class="log-line" style="color:${color};">
            <span class="log-ts">${time}</span>
            <span class="log-text">${text}</span>
        </div>`;
    }).join('');

    const applyFilter = () => {
        if (!body) return;
        const q = filterEl?.value.toLowerCase() || '';
        const filtered = q ? allLogs.filter(l => l.text.toLowerCase().includes(q)) : allLogs;
        body.innerHTML = renderLines(filtered);
        if (countEl) countEl.textContent = `${filtered.length}/${allLogs.length} linhas`;
    };

    const fetchLogs = async () => {
        try {
            const data = await backendApi.get('/admin/logs?lines=300');
            allLogs = data.logs || [];
            const wasAtBottom = body ? (body.scrollHeight - body.scrollTop - body.clientHeight < 60) : true;
            applyFilter();
            if (wasAtBottom) scrollToBottom();
        } catch {
            // silencioso — não interrompe o auto-refresh
        }
    };

    const startAuto = () => {
        interval = setInterval(fetchLogs, 5000);
    };
    const stopAuto = () => clearInterval(interval);

    // Inicializa dados já carregados na renderização inicial
    backendApi.get('/admin/logs?lines=300').then(d => {
        allLogs = d.logs || [];
        applyFilter();
        scrollToBottom();
    }).catch(() => {});

    startAuto();
    scrollToBottom();

    filterEl?.addEventListener('input', applyFilter);

    refreshBtn?.addEventListener('click', async () => {
        refreshBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
        await fetchLogs();
        refreshBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Atualizar';
        toast.info('Logs atualizados');
    });

    scrollBtn?.addEventListener('click', scrollToBottom);

    toggleBtn?.addEventListener('click', () => {
        autoRefresh = !autoRefresh;
        if (autoRefresh) {
            startAuto();
            toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar';
            if (autoState) autoState.textContent = 'ON';
        } else {
            stopAuto();
            toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Retomar';
            if (autoState) autoState.textContent = 'OFF';
        }
    });

    // Limpa o interval quando sai da página
    window.addEventListener('popstate', () => clearInterval(interval), { once: true });
    window.addEventListener('render-app', () => clearInterval(interval), { once: true });
}
