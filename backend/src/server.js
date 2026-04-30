/**
 * Autoqui Backend — Entry Point
 *
 * Inicializa em ordem:
 * 1. Variáveis de ambiente
 * 2. Firebase Admin SDK
 * 3. Express app
 * 4. Servidor HTTP
 * 5. Jobs (lembretes de agendamento)
 */

import { validateEnv, ENV } from './config/env.js';
import { initFirebase } from './config/firebase.js';
import app from './app.js';
import { startReminderJob } from './jobs/reminders.js';
import { startCampaignJob } from './jobs/campaigns.js';
import { startEcommerceJobs } from './jobs/ecommerce.js';

async function bootstrap() {
  try {
    console.log('🚀 Iniciando Autoqui Backend...');

    // 1. Valida variáveis de ambiente
    validateEnv();

    // 2. Inicializa Firebase Admin
    initFirebase();

    // 3. Inicia o servidor HTTP
    const server = app.listen(ENV.PORT, '0.0.0.0', () => {
      console.log(`✅ Servidor rodando na porta ${ENV.PORT}`);
      console.log(`   Modo: ${ENV.NODE_ENV}`);
      console.log(`   Health: http://localhost:${ENV.PORT}/health`);
      console.log(`   Webhook: http://localhost:${ENV.PORT}/webhook/evolution/:instanceName`);
    });

    // 4. Inicia os jobs (crons)
    startReminderJob();
    startCampaignJob();
    startEcommerceJobs();

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('[Server] SIGTERM recebido. Encerrando...');
      server.close(() => {
        console.log('[Server] Servidor encerrado.');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('[Server] SIGINT recebido. Encerrando...');
      server.close(() => {
        console.log('[Server] Servidor encerrado.');
        process.exit(0);
      });
    });

    // Captura erros não tratados para não derrubar o processo
    process.on('unhandledRejection', (reason) => {
      console.error('[Server] UnhandledRejection:', reason);
    });

    process.on('uncaughtException', (err) => {
      console.error('[Server] UncaughtException:', err.message);
    });
  } catch (err) {
    console.error('❌ Falha ao iniciar o servidor:', err.message);
    process.exit(1);
  }
}

bootstrap();
