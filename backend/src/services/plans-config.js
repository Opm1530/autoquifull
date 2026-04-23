/**
 * Configuração de planos — módulos ativos por plano
 * Fonte única de verdade compartilhada entre backend e frontend.
 */

export const PLAN_MODULES = {
  starter:  ['venda_catalogo'],
  pro:      ['venda_catalogo', 'atendimento', 'venda'],
  business: ['venda_catalogo', 'atendimento', 'venda', 'agendamento', 'disparo'],
};

export const PLAN_LIMITS = {
  starter:  { maxInstances: 1,  maxStores: 1  },
  pro:      { maxInstances: 3,  maxStores: 3  },
  business: { maxInstances: 10, maxStores: 10 },
};
