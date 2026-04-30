import { authService } from '../services/auth';
import { dbService } from '../services/db';

export const OwnerSidebar = async () => {
    const user = authService.getCurrentUser();
    let showVenda = false;
    let showAgendamento = false;
    let showDisparo = false;
    let showVendaCatalogo = false;

    if (user && user.companyId) {
        try {
            const companyDoc = await dbService.get('companies', user.companyId);
            const company = companyDoc as any;
            const modulos = company?.modulos_ativos || ['venda'];
            if (modulos.includes('venda')) showVenda = true;
            if (modulos.includes('agendamento')) showAgendamento = true;
            if (modulos.includes('disparo')) showDisparo = true;
            if (modulos.includes('catalogo')) showVendaCatalogo = true;
        } catch (error) {
            console.error('Error fetching company for sidebar:', error);
        }
    }

    // ── Sidebar para venda_catalogo ──
    if (showVendaCatalogo) {
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
                <a href="/dashboard" class="nav-item" data-label="Dashboard">
                    <span class="nav-icon"><i class="fa-solid fa-chart-pie"></i></span>
                    <span class="nav-label">Dashboard</span>
                </a>
                <a href="/orders" class="nav-item" data-label="Pedidos">
                    <span class="nav-icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span class="nav-label">Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item" data-label="Produtos">
                    <span class="nav-icon"><i class="fa-solid fa-box-open"></i></span>
                    <span class="nav-label">Produtos</span>
                </a>
                <a href="/leads" class="nav-item" data-label="Leads">
                    <span class="nav-icon"><i class="fa-solid fa-user-group"></i></span>
                    <span class="nav-label">Leads</span>
                </a>

                ${showDisparo ? `
                <a href="/campaigns" class="nav-item" data-label="Campanhas">
                    <span class="nav-icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span class="nav-label">Campanhas</span>
                </a>` : ''}

                <a href="/ecommerce" class="nav-item" data-label="E-commerce">
                    <span class="nav-icon"><i class="fa-solid fa-shop"></i></span>
                    <span class="nav-label">E-commerce</span>
                </a>

                <div class="nav-divider"></div>
                <span class="nav-section-label">Gestão</span>

                <a href="/stores" class="nav-item" data-label="Lojas">
                    <span class="nav-icon"><i class="fa-solid fa-store"></i></span>
                    <span class="nav-label">Lojas</span>
                </a>
                <a href="/users" class="nav-item" data-label="Equipe">
                    <span class="nav-icon"><i class="fa-solid fa-users"></i></span>
                    <span class="nav-label">Equipe</span>
                </a>
                <a href="/instances" class="nav-item" data-label="WhatsApp">
                    <span class="nav-icon"><i class="fa-brands fa-whatsapp"></i></span>
                    <span class="nav-label">WhatsApp</span>
                </a>
                <a href="/catalog-settings" class="nav-item" data-label="Configuração">
                    <span class="nav-icon"><i class="fa-solid fa-sliders"></i></span>
                    <span class="nav-label">Configuração</span>
                </a>
                <a href="/mercado-pago" class="nav-item" data-label="Pagamentos">
                    <span class="nav-icon"><i class="fa-solid fa-credit-card"></i></span>
                    <span class="nav-label">Pagamentos</span>
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
    }

    // ── Sidebar padrão (atendimento / venda / agendamento) ──
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
                <a href="/dashboard" class="nav-item" data-label="Dashboard">
                    <span class="nav-icon"><i class="fa-solid fa-chart-pie"></i></span>
                    <span class="nav-label">Dashboard</span>
                </a>

                ${showVenda ? `
                <a href="/orders" class="nav-item" data-label="Pedidos">
                    <span class="nav-icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span class="nav-label">Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item" data-label="Produtos">
                    <span class="nav-icon"><i class="fa-solid fa-box-open"></i></span>
                    <span class="nav-label">Produtos</span>
                </a>` : ''}

                <a href="/leads" class="nav-item" data-label="Leads">
                    <span class="nav-icon"><i class="fa-solid fa-user-group"></i></span>
                    <span class="nav-label">Leads</span>
                </a>
                <a href="/stores" class="nav-item" data-label="Lojas">
                    <span class="nav-icon"><i class="fa-solid fa-store"></i></span>
                    <span class="nav-label">Lojas</span>
                </a>

                ${showAgendamento ? `
                <div class="nav-divider"></div>
                <span class="nav-section-label">Agendamento</span>
                <a href="/products" class="nav-item" data-label="Serviços">
                    <span class="nav-icon"><i class="fa-solid fa-list-check"></i></span>
                    <span class="nav-label">Serviços</span>
                </a>
                <a href="/schedule-clients" class="nav-item" data-label="Clientes">
                    <span class="nav-icon"><i class="fa-solid fa-address-book"></i></span>
                    <span class="nav-label">Clientes</span>
                </a>
                <a href="/schedule" class="nav-item" data-label="Agenda">
                    <span class="nav-icon"><i class="fa-solid fa-calendar-days"></i></span>
                    <span class="nav-label">Agenda</span>
                </a>` : ''}

                ${showDisparo ? `
                <a href="/campaigns" class="nav-item" data-label="Campanhas">
                    <span class="nav-icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span class="nav-label">Campanhas</span>
                </a>` : ''}

                <a href="/ecommerce" class="nav-item" data-label="E-commerce">
                    <span class="nav-icon"><i class="fa-solid fa-shop"></i></span>
                    <span class="nav-label">E-commerce</span>
                </a>

                <div class="nav-divider"></div>
                <span class="nav-section-label">Configurações</span>

                <a href="/users" class="nav-item" data-label="Equipe">
                    <span class="nav-icon"><i class="fa-solid fa-users"></i></span>
                    <span class="nav-label">Equipe</span>
                </a>
                <a href="/instances" class="nav-item" data-label="WhatsApp">
                    <span class="nav-icon"><i class="fa-brands fa-whatsapp"></i></span>
                    <span class="nav-label">WhatsApp</span>
                </a>
                <a href="/configuration" class="nav-item" data-label="Configurações">
                    <span class="nav-icon"><i class="fa-solid fa-gear"></i></span>
                    <span class="nav-label">Configurações</span>
                </a>
                <a href="/mercado-pago" class="nav-item" data-label="Pagamentos">
                    <span class="nav-icon"><i class="fa-solid fa-credit-card"></i></span>
                    <span class="nav-label">Pagamentos</span>
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
