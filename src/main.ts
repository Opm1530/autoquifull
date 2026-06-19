import './style.css';
import { AdminSidebar } from './components/AdminSidebar';
import { OwnerSidebar } from './components/OwnerSidebar';
import { Topbar, initTheme } from './components/Topbar';

/** Inicializa o menu lateral recolhível */
function initSidebar() {
  const sidebar = document.getElementById('main-sidebar');
  const toggle  = document.getElementById('sidebar-toggle');
  if (!sidebar || !toggle) return;

  // Restaura estado salvo
  const collapsed = localStorage.getItem('aq-sidebar') === 'collapsed';
  if (collapsed) sidebar.classList.add('collapsed');

  toggle.addEventListener('click', () => {
    const isNowCollapsed = sidebar.classList.toggle('collapsed');
    localStorage.setItem('aq-sidebar', isNowCollapsed ? 'collapsed' : 'expanded');
  });
}
import { Dashboard } from './pages/Dashboard';
import { AdminUsers } from './pages/AdminUsers';
import { OwnerUsers } from './pages/OwnerUsers';
import { Login } from './pages/Login';
import { Companies } from './pages/Companies';
import { Instances } from './pages/Instances';
import { Configuration } from './pages/Configuration';
import { authService } from './services/auth';
import { toast } from './services/toast';
import type { UserRole } from './services/auth';
import { Webhooks } from './pages/Webhooks';
import { Ecommerce, initEcommerce } from './pages/Ecommerce';
import { QRPage } from './pages/QRPage';
import { LandingPage } from './pages/LandingPage';
import { BackendLogs } from './pages/BackendLogs';
import { Subscription } from './pages/Subscription';

// ─────────────────────────────────────────────────────────────
// Gate de assinatura Kiwify
// Enquanto a Kiwify não estiver configurada, mantenha DESLIGADO.
// Ligue para `true` quando o webhook/credenciais estiverem prontos.
// ─────────────────────────────────────────────────────────────
const KIWIFY_ENFORCE = false;

async function hasActiveSubscription(user: any): Promise<boolean> {
  if (!user?.companyId) return false;
  try {
    const { dbService } = await import('./services/db');
    const company = await dbService.get('companies', user.companyId) as any;
    return company?.assinaturaStatus === 'active';
  } catch {
    return true; // fail-open: nunca trava o app por erro de leitura
  }
}

// Core Application Logic
class App {
  private appElement: HTMLElement;

  constructor() {
    this.appElement = document.getElementById('app')!;
    this.init();
  }

  private init() {
    authService.subscribe(() => {
      this.render();
    });
    this.handleRouting();

    // Global listener to re-render without reload
    window.addEventListener('render-app', () => this.render());
  }

  private handleRouting() {
    window.addEventListener('popstate', () => this.render());

    // Intercept link clicks for SPA routing
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const url = link.getAttribute('href')!;
        // Prevent pushing same state
        if (window.location.pathname !== url) {
          history.pushState(null, '', url);
          this.render();
        }
      }
    });

    // Handle Login Form Submit
    document.addEventListener('submit', async (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'login-form') {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        try {
          await authService.login(email, password);
          // Redirect will happen automatically due to auth subscription
        } catch (error) {
          toast.error('Erro ao fazer login: ' + error);
        }
      }
    });

    // Handle Logout
    document.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('#logout-btn')) {
        history.replaceState(null, '', '/');
        await authService.logout();
      }
    });
  }

  private async render() {
    const path = window.location.pathname;
    const user = authService.getCurrentUser();

    // 1. Landing Page (Root)
    if (path === '/') {
      this.appElement.innerHTML = LandingPage();
      const loginBtn = this.appElement.querySelector('.lp-btn-login') || this.appElement.querySelector('.lp-btn-primary');
      if (user && loginBtn) {
        loginBtn.textContent = 'Dashboard';
        loginBtn.setAttribute('href', user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
      }
      return;
    }

    // 2. Unauthenticated -> Login or Public Route
    if (!user) {
      if (path.startsWith('/qr/')) {
        const instanceName = path.split('/').pop() || '';
        this.appElement.innerHTML = await QRPage(instanceName);
        return;
      }

      if (path !== '/login') {
        history.replaceState(null, '', '/login');
      }
      this.appElement.innerHTML = `<div id="page-content" class="login-page-container">${Login()}</div>`;
      return;
    }

    // 3. Authenticated but on Login page -> Redirect to Dashboard
    if (path === '/login') {
      const dashboardPath = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      history.replaceState(null, '', dashboardPath);
      this.render();
      return;
    }

    if (path.startsWith('/qr/')) {
      const instanceName = path.split('/').pop() || '';
      this.appElement.innerHTML = await QRPage(instanceName);
      return;
    }

    // 4. Role-Based Access Control
    if (!this.isRouteAllowed(path, user.role)) {
      this.appElement.innerHTML = `<h1>403 Forbidden</h1><p>Você não tem permissão para acessar esta página.</p>`;
      return;
    }

    // 5. Gate de assinatura — bloqueia owners/employees sem assinatura ativa
    let effectivePath = path;
    if (KIWIFY_ENFORCE && user.role !== 'admin' && path !== '/subscription') {
      const active = await hasActiveSubscription(user);
      if (!active) effectivePath = '/subscription';
    }

    const pageTitle = await this.getPageTitle(effectivePath);
    const SidebarComponent: () => Promise<string> | string =
      user.role === 'admin' ? AdminSidebar : OwnerSidebar;

    // Layout structure: Render a loading state first
    const sidebarHtml = await SidebarComponent();

    this.appElement.innerHTML = `
            <div class="app-container">
                ${sidebarHtml}
                <main class="main-content">
                    ${Topbar(pageTitle)}
                    <!-- initTheme é chamado abaixo via setTimeout -->
                    <div id="page-content" class="page-container">
                        <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 50vh; flex-direction: column; gap: 1rem;">
                            <i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--primary);"></i>
                            <span style="color: var(--text-muted);">Carregando página...</span>
                        </div>
                    </div>
                </main>
            </div>
        `;

    // Inicializa tema e sidebar após o DOM estar pronto
    setTimeout(() => {
      initTheme();
      initSidebar();
    }, 0);

    try {
        const content = await this.getPageContent(effectivePath);
        const pageContainer = document.getElementById('page-content');
        if (pageContainer) {
            pageContainer.innerHTML = content;
        }
        // Run page-specific init after DOM is set
        if (effectivePath === '/ecommerce') initEcommerce();
    } catch (e) {
        console.error('Error loading page content:', e);
        const pageContainer = document.getElementById('page-content');
        if (pageContainer) {
            pageContainer.innerHTML = `
                <div style="padding: 2rem; text-align: center;">
                    <i class="fa-solid fa-triangle-exclamation fa-2x" style="color: var(--danger);"></i>
                    <h3 style="margin-top: 1rem; color: var(--text-main);">Falha ao carregar</h3>
                    <p style="color: var(--text-muted); margin-top: 0.5rem;">Não foi possível carregar o conteúdo da página.</p>
                </div>
            `;
        }
    }

    this.updateActiveLinks();
  }

  private isRouteAllowed(path: string, role: UserRole): boolean {
    if (role === 'admin') {
      return path.startsWith('/admin');
    } else {
      // Owner routes (not starting with /admin)
      return !path.startsWith('/admin');
    }
  }

  private async getPageTitle(path: string): Promise<string> {
    switch (path) {
      case '/':
      case '/dashboard':
      case '/admin/dashboard': return 'Dashboard';
      case '/users':
      case '/admin/users': return 'Usuários';
      case '/companies':
      case '/admin/companies': return 'Gestão de Clientes';
      case '/instances': return 'Instâncias';
      case '/configuration': return 'Configurações';
      case '/subscription': return 'Assinatura';
      case '/admin/webhooks': return 'Configuração do Backend';
      case '/admin/subscriptions': return 'Assinaturas';
      case '/admin/logs': return 'Logs do Servidor';
      case '/ecommerce': return 'E-commerce';
      default: return 'Página não encontrada';
    }
  }

  private async getPageContent(path: string): Promise<string> {
    switch (path) {
      case '/':
      case '/dashboard':
      case '/admin/dashboard':
        return Dashboard();
      case '/users': {
        const user = authService.getCurrentUser();
        return user?.role === 'admin' ? AdminUsers() : OwnerUsers();
      }
      case '/admin/users':
        return AdminUsers();
      case '/companies':
      case '/admin/companies':
        return await Companies();
      case '/instances':
        return Instances();
      case '/configuration':
        return Configuration();
      case '/subscription':
        return await Subscription();
      case '/admin/subscriptions':
        return await Subscription();
      case '/admin/webhooks':
        return await Webhooks();
      case '/admin/logs':
        return await BackendLogs();
      case '/ecommerce':
        return await Ecommerce();
      default:
        return `<h1>404</h1><p>Página não encontrada.</p>`;
    }
  }

  private updateActiveLinks() {
    const path = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === path) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}

// Initialize the app
new App();
