import { authService } from '../services/auth';
import { dbService } from '../services/db';

export const EmployeeSidebar = async () => {
    const user = authService.getCurrentUser();
    let showVenda = false;
    let showAgendamento = false;
    let showVendaCatalogo = false;

    if (user && user.companyId) {
        try {
            const companyDoc = await dbService.get('companies', user.companyId);
            const company = companyDoc as any;
            const modulos = company?.modulos_ativos || ['venda'];
            if (modulos.includes('venda')) showVenda = true;
            if (modulos.includes('agendamento')) showAgendamento = true;
            if (modulos.includes('catalogo')) showVendaCatalogo = true;
        } catch (error) {
            console.error('Error fetching company for employee sidebar:', error);
        }
    }

    return `
        <div class="sidebar" id="main-sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel Equipe</span>
                <button class="sidebar-toggle" id="sidebar-toggle" title="Recolher menu">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
            </div>

            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item" data-label="Dashboard">
                    <span class="nav-icon"><i class="fa-solid fa-chart-pie"></i></span>
                    <span class="nav-label">Dashboard</span>
                </a>

                ${showVenda || showVendaCatalogo ? `
                <a href="/orders" class="nav-item" data-label="Pedidos">
                    <span class="nav-icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span class="nav-label">Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item" data-label="Produtos">
                    <span class="nav-icon"><i class="fa-solid fa-box"></i></span>
                    <span class="nav-label">Produtos</span>
                </a>
                ` : ''}

                ${showAgendamento ? `
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
                </a>
                ` : ''}

                <a href="/leads" class="nav-item" data-label="Leads">
                    <span class="nav-icon"><i class="fa-solid fa-user-group"></i></span>
                    <span class="nav-label">Leads</span>
                </a>
            </nav>

            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">EQ</div>
                    <div class="user-info">
                        <span class="name">Colaborador</span>
                        <span class="role">Staff</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};
