// Menu lateral do dono da empresa — produto focado em E-commerce (EcoQui).
export const OwnerSidebar = () => {
    return `
        <div class="sidebar" id="main-sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img src="/logo.png" alt="Logo"></div>
                <span class="logo-text">EcoQui</span>
                <button class="sidebar-toggle" id="sidebar-toggle" title="Recolher menu">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item" data-label="Dashboard">
                    <span class="nav-icon"><i class="fa-solid fa-chart-pie"></i></span>
                    <span class="nav-label">Dashboard</span>
                </a>
                <a href="/ecommerce" class="nav-item" data-label="E-commerce">
                    <span class="nav-icon"><i class="fa-solid fa-shop"></i></span>
                    <span class="nav-label">E-commerce</span>
                </a>
                <a href="/analytics" class="nav-item" data-label="Analytics">
                    <span class="nav-icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span class="nav-label">Analytics</span>
                </a>
                <a href="/crm" class="nav-item" data-label="CRM">
                    <span class="nav-icon"><i class="fa-solid fa-address-book"></i></span>
                    <span class="nav-label">CRM</span>
                </a>

                <div class="nav-divider"></div>
                <span class="nav-section-label">Configurações</span>

                <a href="/instances" class="nav-item" data-label="WhatsApp">
                    <span class="nav-icon"><i class="fa-brands fa-whatsapp"></i></span>
                    <span class="nav-label">WhatsApp</span>
                </a>
                <a href="/users" class="nav-item" data-label="Equipe">
                    <span class="nav-icon"><i class="fa-solid fa-users"></i></span>
                    <span class="nav-label">Equipe</span>
                </a>
                <a href="/configuration" class="nav-item" data-label="Configurações">
                    <span class="nav-icon"><i class="fa-solid fa-gear"></i></span>
                    <span class="nav-label">Configurações</span>
                </a>
                <a href="/subscription" class="nav-item" data-label="Assinatura">
                    <span class="nav-icon"><i class="fa-solid fa-crown"></i></span>
                    <span class="nav-label">Assinatura</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">DO</div>
                    <div class="user-info">
                        <span class="name">Dono da Empresa</span>
                        <span class="role">Owner</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};
