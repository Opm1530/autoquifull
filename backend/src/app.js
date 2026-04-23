import express from 'express';
import cors from 'cors';
import webhookRouter from './routes/webhook.js';
import calendarRouter from './routes/calendar.js';
import plansRouter from './routes/plans.js';
import ordersRouter from './routes/orders.js';

const app = express();

// ── Middlewares ───────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],
  })
);

// Parser JSON — aumenta limite para suportar payloads de mídia em base64
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Rotas ─────────────────────────────────────────────────────

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});

// Webhooks da Evolution API (IA de agendamento)
app.use('/webhook', webhookRouter);

// Google Calendar OAuth2 + Trinks
app.use('/calendar', calendarRouter);

// Planos e assinaturas MercadoPago
app.use('/plans', plansRouter);

// Pedidos do catálogo
app.use('/orders', ordersRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento de erros globais
app.use((err, _req, res, _next) => {
  console.error('[App] Erro não tratado:', err.message);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

export default app;
