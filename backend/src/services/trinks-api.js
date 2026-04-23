/**
 * Trinks API Client
 *
 * Comunicação direta com a API do Trinks quando o estabelecimento
 * usa o Trinks como sistema primário de agendamento.
 *
 * Neste modo o Trinks é a fonte da verdade para:
 *   - Serviços (com duração e preço)
 *   - Disponibilidade (horários livres por profissional)
 *   - Clientes
 *   - Agendamentos
 *
 * O Firestore do Autoqui armazena apenas o histórico de conversa do bot.
 *
 * Config esperada em companies/{companyId}.trinks:
 * {
 *   enabled: true,
 *   apiKey: string,
 *   estabelecimentoId: string,
 *   defaultProfissionalId: string | null,
 *   escolherProfissional: boolean,
 *   intervalos: 15 | 30 | 45 | 60,
 *   mostrarPrecos: boolean,
 *   mostrarProfissionalConfirmacao: boolean,
 *   confirmarAutomaticamente: boolean,
 * }
 */

import { log } from '../utils/logger.js';

const TRINKS_BASE = 'https://api.trinks.com';

// ─────────────────────────────────────────────────────────────
// HTTP helper
// ─────────────────────────────────────────────────────────────

async function trinksRequest(apiKey, estabelecimentoId, method, path, body = null) {
  const url = `${TRINKS_BASE}${path}`;
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
      'estabelecimentoId': String(estabelecimentoId),
    },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);

  // Tenta parsear JSON mesmo em erros para capturar mensagem
  let data;
  try { data = await res.json(); } catch { data = null; }

  if (!res.ok) {
    const msg = data?.message || data?.error || JSON.stringify(data)?.slice(0, 200) || res.statusText;
    log.error('Trinks', `${method} ${path} → HTTP ${res.status}: ${msg}`);
    throw new Error(`Trinks ${method} ${path} → ${res.status}: ${msg}`);
  }

  return data;
}

// ─────────────────────────────────────────────────────────────
// Serviços
// ─────────────────────────────────────────────────────────────

/**
 * Lista todos os serviços do estabelecimento.
 * Retorna array normalizado: [{ id, name, duration, price, category }]
 */
export async function getTrinksServices(trinks) {
  const { apiKey, estabelecimentoId, mostrarPrecos = true } = trinks;

  const data = await trinksRequest(
    apiKey, estabelecimentoId, 'GET',
    '/v1/servicos?pageSize=100&somenteVisiveisCliente=true'
  );

  // A API pode retornar { data: [...] } ou diretamente um array
  const items = Array.isArray(data) ? data : (data?.data || data?.items || []);

  const result = items.map((s) => ({
    id: s.id,
    name: s.nome || s.name,
    duration: s.duracaoEmMinutos || s.duracao || 60,
    price: mostrarPrecos ? (s.valor || s.preco || s.price || 0) : null,
    category: s.categoria?.nome || s.categoria || s.categoryName || '',
    description: s.descricao || s.description || '',
  }));
  log.info('Trinks', `${result.length} serviço(s) carregados do estabelecimento ${estabelecimentoId}`);
  return result;
}

// ─────────────────────────────────────────────────────────────
// Profissionais
// ─────────────────────────────────────────────────────────────

/**
 * Lista profissionais do estabelecimento.
 * Retorna [{ id, name }]
 */
export async function getTrinksProfessionals(trinks) {
  const { apiKey, estabelecimentoId } = trinks;

  const data = await trinksRequest(
    apiKey, estabelecimentoId, 'GET',
    '/v1/profissionais?pageSize=50'
  );

  const items = Array.isArray(data) ? data : (data?.data || data?.items || []);
  return items.map((p) => ({ id: p.id, name: p.nome || p.name }));
}

// ─────────────────────────────────────────────────────────────
// Disponibilidade
// ─────────────────────────────────────────────────────────────

/**
 * Busca horários disponíveis para uma data e serviço.
 *
 * Quando escolherProfissional=true → retorna por profissional.
 * Quando escolherProfissional=false → retorna lista unificada de slots livres.
 *
 * @param {object} trinks - Config Trinks da empresa
 * @param {string} date   - YYYY-MM-DD
 * @param {number} servicoId
 * @param {number} [profissionalId] - Filtro opcional
 *
 * @returns {{ byProfessional: boolean, slots: string[], professionals?: Array }}
 */
export async function getTrinksAvailability(trinks, date, servicoId, profissionalId = null) {
  const {
    apiKey,
    estabelecimentoId,
    escolherProfissional = false,
    intervalos = 30,
    defaultProfissionalId = null,
  } = trinks;

  // Resolve profissional: parâmetro explícito > padrão da config
  const profId = profissionalId || defaultProfissionalId || null;

  let qs = `?intervalos=${intervalos}`;
  if (servicoId) qs += `&servicoId=${servicoId}`;
  if (profId)    qs += `&profissionalId=${profId}`;

  const data = await trinksRequest(
    apiKey, estabelecimentoId, 'GET',
    `/v1/agendamentos/profissionais/${date}${qs}`
  );

  const items = Array.isArray(data) ? data : (data?.data || data?.items || []);

  if (escolherProfissional) {
    // Retorna dados por profissional para a IA oferecer escolha
    const professionals = items.map((prof) => ({
      id: prof.profissionalId || prof.id,
      name: prof.nome || prof.name || prof.profissionalNome,
      slots: extractSlots(prof),
    })).filter((p) => p.slots.length > 0);

    return { byProfessional: true, professionals };
  } else {
    // Une todos os slots disponíveis (qualquer profissional)
    const allSlots = new Set();
    for (const prof of items) {
      for (const slot of extractSlots(prof)) {
        allSlots.add(slot);
      }
    }
    return { byProfessional: false, slots: [...allSlots].sort() };
  }
}

/**
 * Extrai slots de horário de um objeto profissional da resposta do Trinks.
 * Tenta múltiplos formatos possíveis da API.
 */
function extractSlots(profData) {
  // Tenta vários campos possíveis
  const candidates = [
    profData.horariosDisponiveis,
    profData.horarios,
    profData.slots,
    profData.disponibilidade,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;

    if (Array.isArray(candidate)) {
      // Pode ser [{ horario: '09:00' }] ou ['09:00', '09:30']
      return candidate.map((s) => {
        if (typeof s === 'string') return s.slice(0, 5); // HH:MM
        return (s.horario || s.hora || s.time || '').slice(0, 5);
      }).filter(Boolean);
    }
  }
  return [];
}

// ─────────────────────────────────────────────────────────────
// Clientes
// ─────────────────────────────────────────────────────────────

/**
 * Busca um cliente no Trinks pelo telefone.
 * Retorna o cliente ou null se não encontrado.
 */
export async function findTrinksClient(trinks, phone) {
  const { apiKey, estabelecimentoId } = trinks;

  // Normaliza: remove tudo que não é dígito e garante código de país
  const normalized = phone.replace(/\D/g, '');
  const withCountry = normalized.startsWith('55') ? normalized : `55${normalized}`;

  try {
    const data = await trinksRequest(
      apiKey, estabelecimentoId, 'GET',
      `/v1/clientes?whatsapp=${withCountry}&pageSize=1`
    );
    const items = Array.isArray(data) ? data : (data?.data || data?.items || []);
    return items[0] || null;
  } catch {
    return null;
  }
}

/**
 * Cria um novo cliente no Trinks.
 */
export async function createTrinksClient(trinks, data) {
  const { apiKey, estabelecimentoId } = trinks;

  const phone = data.phone.replace(/\D/g, '');
  const withCountry = phone.startsWith('55') ? phone : `55${phone}`;

  const body = {
    nome: data.name,
    whatsapp: withCountry,
    email: data.email || '',
    dataNascimento: data.birthDate || null,
    observacoes: data.notes || '',
  };

  return trinksRequest(apiKey, estabelecimentoId, 'POST', '/v1/clientes', body);
}

/**
 * Busca ou cria um cliente no Trinks.
 * Retorna o cliente Trinks (com id numérico).
 */
export async function findOrCreateTrinksClient(trinks, phone, name) {
  let client = await findTrinksClient(trinks, phone);

  if (!client) {
    log.info('Trinks', `Criando novo cliente: ${name} (${phone})`);
    client = await createTrinksClient(trinks, { phone, name });
    log.ok('Trinks', `Cliente criado no Trinks: id=${client?.id} nome=${name}`);
  } else {
    log.debug('Trinks', `Cliente encontrado no Trinks: id=${client.id} nome=${client.nome || client.name}`);
  }

  return client;
}

// ─────────────────────────────────────────────────────────────
// Agendamentos
// ─────────────────────────────────────────────────────────────

/**
 * Cria um agendamento no Trinks.
 *
 * @param {object} trinks - Config Trinks
 * @param {object} data
 * @param {number} data.servicoId
 * @param {number} data.clienteId
 * @param {string} data.date          - YYYY-MM-DD
 * @param {string} data.time          - HH:MM
 * @param {number} data.duration      - minutos
 * @param {number} data.price         - valor
 * @param {number} [data.profissionalId]
 * @param {string} [data.notes]
 *
 * @returns {{ id: number, ...campos do Trinks }}
 */
export async function createTrinksAppointment(trinks, data) {
  const { apiKey, estabelecimentoId, confirmarAutomaticamente = false } = trinks;

  const body = {
    servicoId: data.servicoId,
    clienteId: data.clienteId,
    dataHoraInicio: `${data.date}T${data.time}:00`,
    duracaoEmMinutos: data.duration,
    valor: data.price || 0,
    profissionalId: data.profissionalId || null,
    observacoes: data.notes || '',
    confirmado: confirmarAutomaticamente,
  };

  const result = await trinksRequest(apiKey, estabelecimentoId, 'POST', '/v1/agendamentos', body);
  log.ok('Trinks', `Agendamento criado: id=${result.id} | ${data.date} ${data.time} | cliente=${data.clienteId}`);
  return result;
}

/**
 * Cancela um agendamento no Trinks.
 */
export async function cancelTrinksAppointment(trinks, appointmentId) {
  const { apiKey, estabelecimentoId } = trinks;
  return trinksRequest(
    apiKey, estabelecimentoId,
    'PATCH', `/v1/agendamentos/${appointmentId}/status/cancelado`
  );
}

/**
 * Lista agendamentos futuros de um cliente no Trinks.
 */
export async function getTrinksClientAppointments(trinks, clienteId) {
  const { apiKey, estabelecimentoId } = trinks;

  const today = new Date().toISOString().split('T')[0];
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 3);
  const future = futureDate.toISOString().split('T')[0];

  try {
    const data = await trinksRequest(
      apiKey, estabelecimentoId, 'GET',
      `/v1/agendamentos?clienteId=${clienteId}&dataInicio=${today}T00:00:00&dataFim=${future}T23:59:59&pageSize=10`
    );
    const items = Array.isArray(data) ? data : (data?.data || data?.items || []);
    return items.map(normalizeTrinksAppointment);
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Normalização
// ─────────────────────────────────────────────────────────────

function normalizeTrinksAppointment(a) {
  const start = a.dataHoraInicio || a.dataInicio || '';
  const [date, timePart] = start.split('T');
  const time = (timePart || '').slice(0, 5);

  return {
    id: a.id,
    date,
    time,
    duration: a.duracaoEmMinutos || a.duracao || 60,
    status: a.status || 'agendado',
    serviceName: a.servico?.nome || a.servicoNome || '',
    serviceId: a.servico?.id || a.servicoId,
    professionalName: a.profissional?.nome || a.profissionalNome || '',
    professionalId: a.profissional?.id || a.profissionalId,
  };
}
