import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import webhookRouter from './routes/webhook.js';
import calendarRouter from './routes/calendar.js';
import plansRouter from './routes/plans.js';
import ordersRouter from './routes/orders.js';
import adminRouter from './routes/admin.js';
import mpConnectRouter from './routes/mp-connect.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
// Frontend build fica em /app/dist dentro do container
const DIST_PATH = join(__dirname, '../../app/dist');

// ── Middlewares ───────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── API Routes (antes dos estáticos) ─────────────────────────

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', version: '1.0.0', timestamp: new Date().toISOString(), uptime: Math.floor(process.uptime()) });
});

app.use('/webhook', webhookRouter);
app.use('/calendar', calendarRouter);
app.use('/plans', plansRouter);
app.use('/orders', ordersRouter);
app.use('/admin', adminRouter);
app.use('/mp', mpConnectRouter);

// ── Frontend estático ─────────────────────────────────────────
// Node serve os arquivos do build do Vite diretamente
app.use(express.static(DIST_PATH));

// SPA fallback — qualquer rota não encontrada serve o index.html
app.get('*', (_req, res) => {
  res.sendFile(join(DIST_PATH, 'index.html'));
});

// ── Erros globais ─────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[App] Erro não tratado:', err.message);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

export default app;
