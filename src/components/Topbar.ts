export const Topbar = (title: string) => {
    return `
        <div class="topbar glass">
            <h2 class="page-title">${title}</h2>
            <div class="topbar-right">
                <div class="search-bar">
                    <span class="icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" placeholder="Buscar...">
                </div>
                <button id="theme-toggle-btn" class="theme-toggle-btn" title="Alternar tema">
                    <i class="fa-solid fa-moon" id="theme-icon"></i>
                </button>
                <button id="logout-btn" class="logout-btn" title="Sair">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
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
    const saved = localStorage.getItem('aq-theme') || 'light';
    applyTheme(saved);

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
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}
