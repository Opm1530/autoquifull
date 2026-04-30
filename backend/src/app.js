import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Ativa captura de logs em memória (antes de qualquer import que logueje)
import './utils/logStore.js';

import webhookRouter from './routes/webhook.js';
import calendarRouter from './routes/calendar.js';
import plansRouter from './routes/plans.js';
import ordersRouter from './routes/orders.js';
import adminRouter from './routes/admin.js';
import mpConnectRouter from './routes/mp-connect.js';
import ecommerceRouter from './routes/ecommerce.js';

import { webhookLimiter, publicLimiter, apiLimiter } from './middlewares/rateLimit.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_PATH = join(__dirname, '../../app/dist');

// ── Segurança HTTP ────────────────────────────────────────────
app.use(helmet({
  // Permite carregar o frontend Vite que usa scripts inline
  contentSecurityPolicy: false,
}));

// ── CORS ──────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],
}));

// ── Body parsers ──────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Request logger (apenas API — ignora assets estáticos) ─────
app.use((req, _res, next) => {
  if (!req.path.startsWith('/webhook') && !req.path.startsWith('/health') && !req.path.match(/\.\w+$/)) {
    console.log(`→ ${req.method} ${req.path}`);
  }
  next();
});

// ── Health (sem rate limit) ───────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', version: '1.0.0', timestamp: new Date().toISOString(), uptime: Math.floor(process.uptime()) });
});

// ── API Routes ────────────────────────────────────────────────

// Webhook da Evolution API — rate limit tolerante
app.use('/webhook', webhookLimiter, webhookRouter);

// Catálogo público — rate limit moderado
app.use('/orders',  publicLimiter,  ordersRouter);
app.use('/plans',   publicLimiter,  plansRouter);

// Rotas autenticadas — rate limit padrão
app.use('/calendar', apiLimiter, calendarRouter);
app.use('/admin',    apiLimiter, adminRouter);
app.use('/mp',        apiLimiter,    mpConnectRouter);
app.use('/ecommerce', publicLimiter, ecommerceRouter); // webhook sem auth + API com apiLimiter interno

// ── Frontend estático ─────────────────────────────────────────
app.use(express.static(DIST_PATH));

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(join(DIST_PATH, 'index.html'));
});

// ── Erro global ───────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[App] Erro não tratado:', err.message);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

export default app;
