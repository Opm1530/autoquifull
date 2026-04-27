export const Topbar = (title: string) => {
    return `
        <div class="topbar glass">
            <div class="topbar-left">
                <h2 class="page-title">${title}</h2>
            </div>
            <div class="topbar-right">
                <div class="search-bar">
                    <span class="icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" placeholder="Buscar...">
                </div>
                <button id="theme-toggle-btn" class="theme-toggle-btn" title="Alternar tema">
                    <i class="fa-solid fa-moon" id="theme-icon"></i>
                </button>
                <button id="logout-btn" class="logout-btn" title="Sair">
                    <span class="icon"><i style="color: #FFF; font-size: 1.0rem;" class="fa-solid fa-arrow-right-from-bracket"></i></span>
                </button>
            </div>
        </div>
    `;
};

/**
 * Inicializa o sistema de tema.
 * Deve ser chamado uma vez após o Topbar ser inserido no DOM.
 */
export function initTheme() {
    // Aplica tema salvo no localStorage
    const saved = localStorage.getItem('aq-theme') || 'light';
    applyTheme(saved);

    // Wira o botão quando ele aparecer no DOM
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('aq-theme', next);
        });
    }
}

function applyTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
        // Sol = modo claro ativo (clique vai para dark) | Lua = modo escuro ativo (clique vai para light)
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}
