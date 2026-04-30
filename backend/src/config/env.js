import 'dotenv/config';

export const ENV = {
  PORT: parseInt(process.env.PORT || '3001', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',

  // OpenAI
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  OPENAI_MAX_TOKENS: parseInt(process.env.OPENAI_MAX_TOKENS || '1500', 10),
  OPENAI_TEMPERATURE: parseFloat(process.env.OPENAI_TEMPERATURE || '0.3'),

  // Evolution API
  EVOLUTION_API_URL: process.env.EVOLUTION_API_URL || 'https://evolution.vps.pequi.digital',
  EVOLUTION_API_KEY: process.env.EVOLUTION_API_KEY || '',

  // Bot
  MESSAGE_DEBOUNCE_MS: parseInt(process.env.MESSAGE_DEBOUNCE_MS || '13000', 10),
  MAX_HISTORY_MESSAGES: parseInt(process.env.MAX_HISTORY_MESSAGES || '20', 10),
  MAX_TOOL_TURNS: parseInt(process.env.MAX_TOOL_TURNS || '5', 10),

  // Lembretes
  REMINDER_HOURS_BEFORE: parseInt(process.env.REMINDER_HOURS_BEFORE || '24', 10),

  // NuvemShop OAuth
  NUVEMSHOP_APP_ID:     process.env.NUVEMSHOP_APP_ID     || '',
  NUVEMSHOP_APP_SECRET: process.env.NUVEMSHOP_APP_SECRET || '',
  BACKEND_URL:          process.env.BACKEND_URL           || 'http://localhost:3001',
};

export function validateEnv() {
  const required = ['OPENAI_API_KEY', 'FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(`[ENV] Variáveis obrigatórias ausentes: ${missing.join(', ')}`);
  }
  console.log('[ENV] Configurações validadas ✓');
}
