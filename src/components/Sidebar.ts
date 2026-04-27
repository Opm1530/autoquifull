export const Sidebar = () => {
    return `
        <div class="sidebar" id="main-sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img src="/logo.png" alt="Logo"></div>
                <span class="logo-text">AutoQui</span>
                <button class="sidebar-toggle" id="sidebar-toggle" title="Recolher menu">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
            </div>

            <nav class="sidebar-nav">
                <a href="/admin/dashboard" class="nav-item" data-label="Dashboard">
                    <span class="nav-icon"><i class="fa-solid fa-chart-pie"></i></span>
                    <span class="nav-label">Dashboard</span>
                </a>
                <a href="/admin/companies" class="nav-item" data-label="Clientes">
                    <span class="nav-icon"><i class="fa-solid fa-buildings"></i></span>
                    <span class="nav-label">Clientes</span>
                </a>
                <a href="/admin/users" class="nav-item" data-label="Usuários">
                    <span class="nav-icon"><i class="fa-solid fa-users"></i></span>
                    <span class="nav-label">Usuários</span>
                </a>

                <div class="nav-divider"></div>
                <span class="nav-section-label">Sistema</span>

                <a href="/admin/plans" class="nav-item" data-label="Planos">
                    <span class="nav-icon"><i class="fa-solid fa-layer-group"></i></span>
                    <span class="nav-label">Planos</span>
                </a>
                <a href="/admin/webhooks" class="nav-item" data-label="Webhooks">
                    <span class="nav-icon"><i class="fa-solid fa-webhook"></i></span>
                    <span class="nav-label">Webhooks</span>
                </a>
                <a href="/admin/logs" class="nav-item" data-label="Logs">
                    <span class="nav-icon"><i class="fa-solid fa-terminal"></i></span>
                    <span class="nav-label">Logs</span>
                </a>
                <a href="/admin/migration" class="nav-item" data-label="Migração">
                    <span class="nav-icon"><i class="fa-solid fa-database"></i></span>
                    <span class="nav-label">Migração</span>
                </a>
            </nav>

            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">AD</div>
                    <div class="user-info">
                        <span class="name">Admin Global</span>
                        <span class="role">Super Admin</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};
