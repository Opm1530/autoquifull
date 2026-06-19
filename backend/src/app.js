import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Ativa captura de logs em memória (antes de qualquer import que logueje)
import './utils/logStore.js';

import adminRouter from './routes/admin.js';
import ecommerceRouter from './routes/ecommerce.js';
import kiwifyRouter from './routes/kiwify.js';
import storefrontRouter from './routes/storefront.js';

import { publicLimiter, apiLimiter } from './middlewares/rateLimit.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_PATH = join(__dirname, '../../app/dist');

// ── Trust proxy (nginx na frente) ────────────────────────────
app.set('trust proxy', 1);

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

// Rotas autenticadas — rate limit padrão
app.use('/admin',    apiLimiter, adminRouter);

// E-commerce (NuvemShop) — webhook sem auth + API com apiLimiter interno
app.use('/ecommerce', publicLimiter, ecommerceRouter);

// Assinatura Kiwify — webhook público protegido por token + status
app.use('/kiwify', publicLimiter, kiwifyRouter);

// Storefront — loader JS + config + roleta (rodam na loja NuvemShop do cliente)
app.use('/storefront', publicLimiter, storefrontRouter);

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
