/**
 * Firestore Service — helpers multi-tenant
 *
 * Todas as queries são isoladas por companyId.
 * Este service é o único ponto de acesso ao Firestore no backend.
 */

import { getDb } from '../config/firebase.js';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';

// ─────────────────────────────────────────────────────────────
// Instâncias (WhatsApp Evolution)
// ─────────────────────────────────────────────────────────────

/**
 * Busca uma instância pelo nome (instanceName da Evolution API).
 * Retorna { id, empresaId, lojaId, funcao, status, ... } ou null.
 */
export async function getInstanceByName(instanceName) {
  const db = getDb();
  const snap = await db
    .collection('instancias')
    .where('nome', '==', instanceName)
    .limit(1)
    .get();

  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
}

// ─────────────────────────────────────────────────────────────
// Companies
// ─────────────────────────────────────────────────────────────

export async function getCompany(companyId) {
  const db = getDb();
  const doc = await db.collection('companies').doc(companyId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

// ─────────────────────────────────────────────────────────────
// Configuração da loja (loja_config)
// ─────────────────────────────────────────────────────────────

/**
 * Retorna { prompt_ia, horarios, mensagens_automaticas, design, trinks }
 * da loja ou null.
 */
export async function getLojaConfig(companyId, storeId) {
  const db = getDb();

  // Tenta buscar config específica da loja
  if (storeId) {
    const snap = await db
      .collection('loja_config')
      .where('empresaId', '==', companyId)
      .where('lojaId', '==', storeId)
      .limit(1)
      .get();
    if (!snap.empty) return snap.docs[0].data();
  }

  // Fallback: config da empresa sem loja específica
  const snap = await db
    .collection('loja_config')
    .where('empresaId', '==', companyId)
    .limit(1)
    .get();

  if (snap.empty) return null;
  return snap.docs[0].data();
}

// ─────────────────────────────────────────────────────────────
// Serviços / Produtos (agendamento)
// ─────────────────────────────────────────────────────────────

/**
 * Lista os serviços ativos de uma empresa (produtos com active != false).
 * Para o módulo de agendamento, todos os produtos são serviços.
 */
export async function getServices(companyId, storeId) {
  const db = getDb();
  let query = db.collection('products').where('companyId', '==', companyId);

  const snap = await query.get();
  let services = snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((s) => s.active !== false);

  // Filtra por loja se especificado
  if (storeId) {
    services = services.filter(
      (s) => !s.storeIds || s.storeIds.includes(storeId)
    );
  }

  return services.map((s) => ({
    id: s.id,
    name: s.name,
    price: s.price || 0,
    duration: s.duration || 60, // minutos
    description: s.observation || s.description || '',
  }));
}

// ─────────────────────────────────────────────────────────────
// Catálogo (módulo venda)
// ─────────────────────────────────────────────────────────────

/**
 * Lista produtos do catálogo com todos os campos necessários para o agente de venda.
 * Inclui: preço promocional, categoryName, stock, observation.
 */
export async function getCatalogProducts(companyId, storeId) {
  const db = getDb();

  // Carrega produtos e categorias em paralelo
  const [productsSnap, categoriesSnap] = await Promise.all([
    db.collection('products').where('companyId', '==', companyId).get(),
    db.collection('categories').where('companyId', '==', companyId).get(),
  ]);

  // Mapa categoryId → name
  const categoryMap = {};
  categoriesSnap.docs.forEach((d) => {
    categoryMap[d.id] = d.data().name || '';
  });

  let products = productsSnap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((p) => p.active !== false);

  // Filtra por loja
  if (storeId) {
    products = products.filter((p) => !p.storeIds || p.storeIds.includes(storeId));
  }

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price || 0,
    promotionalActive: !!(p.promotionalActive),
    promotionalPrice: p.promotionalPrice || 0,
    categoryId: p.categoryId || '',
    categoryName: categoryMap[p.categoryId] || p.categoryName || '',
    stock: p.stock !== undefined ? p.stock : null,
    observation: p.observation || p.description || '',
    description: p.observation || p.description || '',
    duration: p.duration || null,
  }));
}

// ─────────────────────────────────────────────────────────────
// Leads
// ─────────────────────────────────────────────────────────────

/**
 * Busca um lead pelo telefone normalizado.
 */
export async function getLeadByPhone(companyId, phone) {
  const db = getDb();

  // Tenta o número exato
  const snap = await db
    .collection('leads')
    .where('empresaId', '==', companyId)
    .where('telefone', '==', phone)
    .limit(1)
    .get();

  if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };

  // Tenta com sufixo do WhatsApp
  const snap2 = await db
    .collection('leads')
    .where('empresaId', '==', companyId)
    .where('telefone', '==', phone + '@s.whatsapp.net')
    .limit(1)
    .get();

  if (!snap2.empty) return { id: snap2.docs[0].id, ...snap2.docs[0].data() };
  return null;
}

/**
 * Cria ou atualiza um lead.
 */
export async function upsertLead(companyId, storeId, phone, data = {}) {
  const db = getDb();
  const existing = await getLeadByPhone(companyId, phone);

  const payload = {
    empresaId: companyId,
    lojaId: storeId || null,
    telefone: phone,
    nome: data.nome || data.name || 'Cliente',
    statusAtendimento: data.statusAtendimento || 'bot',
    statusLead: data.statusLead || 'novo',
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (existing) {
    await db.collection('leads').doc(existing.id).update(payload);
    return { id: existing.id, ...existing, ...payload };
  } else {
    payload.criadoEm = FieldValue.serverTimestamp();
    const ref = await db.collection('leads').add(payload);
    return { id: ref.id, ...payload };
  }
}

/**
 * Atualiza o status de atendimento de um lead.
 * statuses: 'bot' | 'em_atendimento_humano' | 'finalizado' | 'abandonado'
 */
export async function updateLeadStatus(leadId, status) {
  const db = getDb();
  await db.collection('leads').doc(leadId).update({
    statusAtendimento: status,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

// ─────────────────────────────────────────────────────────────
// Clientes (módulo agendamento)
// ─────────────────────────────────────────────────────────────

/**
 * Busca cliente (agendamento) pelo telefone.
 */
export async function getClienteByPhone(companyId, phone) {
  const db = getDb();

  const snap = await db
    .collection('clientes')
    .where('companyId', '==', companyId)
    .where('telefone', '==', phone)
    .limit(1)
    .get();

  if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };
  return null;
}

/**
 * Cria um cliente no módulo de agendamento.
 */
export async function createCliente(companyId, storeId, data) {
  const db = getDb();
  const payload = {
    companyId,
    storeId: storeId || null,
    nome: data.nome,
    telefone: data.telefone,
    email: data.email || '',
    dataNascimento: data.dataNascimento || '',
    observacao: data.observacao || '',
    criadoEm: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  const ref = await db.collection('clientes').add(payload);
  return { id: ref.id, ...payload };
}

/**
 * Atualiza um cliente existente.
 */
export async function updateCliente(clienteId, data) {
  const db = getDb();
  await db.collection('clientes').doc(clienteId).update({
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

// ─────────────────────────────────────────────────────────────
// Agendamentos
// ─────────────────────────────────────────────────────────────

/**
 * Cria um novo agendamento.
 */
export async function createAgendamento(companyId, storeId, data) {
  const db = getDb();
  const payload = {
    companyId,
    storeId: storeId || null,
    clienteId: data.clienteId,
    clientName: data.clientName,
    clientPhone: data.clientPhone,
    serviceId: data.serviceId,
    serviceName: data.serviceName,
    servicePrice: data.servicePrice || 0,
    date: data.date,   // YYYY-MM-DD
    time: data.time,   // HH:MM
    duration: data.duration || 60,
    status: 'agendado',
    notes: data.notes || '',
    // Integrações externas (preenchidas depois se configuradas)
    googleCalendarEventId: null,
    trinksAppointmentId: null,
    reminderSent: false,
    criadoEm: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  const ref = await db.collection('agendamentos').add(payload);
  return { id: ref.id, ...payload };
}

/**
 * Cancela um agendamento.
 */
export async function cancelAgendamento(agendamentoId) {
  const db = getDb();
  await db.collection('agendamentos').doc(agendamentoId).update({
    status: 'cancelado',
    updatedAt: FieldValue.serverTimestamp(),
  });
}

/**
 * Busca agendamentos de um cliente por telefone numa empresa.
 */
export async function getAgendamentosByPhone(companyId, phone) {
  const db = getDb();

  // Pega a data de hoje no fuso de São Paulo
  const today = getTodayStr();

  const snap = await db
    .collection('agendamentos')
    .where('companyId', '==', companyId)
    .where('clientPhone', '==', phone)
    .where('status', '!=', 'cancelado')
    .get();

  const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  // Retorna próximos e passados
  return {
    proximos: docs.filter((a) => a.date >= today),
    historico: docs.filter((a) => a.date < today),
  };
}

/**
 * Busca os agendamentos de um dia específico para uma empresa/loja
 * (usado para calcular disponibilidade).
 */
export async function getAgendamentosForDate(companyId, storeId, date) {
  const db = getDb();
  let query = db
    .collection('agendamentos')
    .where('companyId', '==', companyId)
    .where('date', '==', date)
    .where('status', 'in', ['agendado', 'confirmado']);

  if (storeId) query = query.where('storeId', '==', storeId);

  const snap = await query.get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Busca agendamentos com reminder não enviado nas próximas N horas.
 */
export async function getAgendamentosForReminder(horasBefore = 24) {
  const db = getDb();
  const now = new Date();
  const target = new Date(now.getTime() + horasBefore * 60 * 60 * 1000);

  // Formata data/hora alvo em São Paulo
  const targetDate = formatDateBR(target); // YYYY-MM-DD
  const targetTime = formatTimeBR(target); // HH:MM

  const snap = await db
    .collection('agendamentos')
    .where('reminderSent', '==', false)
    .where('status', 'in', ['agendado', 'confirmado'])
    .where('date', '==', targetDate)
    .get();

  // Filtra por hora (Firestore não suporta query composta data+hora diretamente)
  const margin = 35; // minutos de margem para o cron não perder agendamentos
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((a) => {
      const [h, m] = a.time.split(':').map(Number);
      const apptMinutes = h * 60 + m;
      const [th, tm] = targetTime.split(':').map(Number);
      const targetMinutes = th * 60 + tm;
      return Math.abs(apptMinutes - targetMinutes) <= margin;
    });
}

/**
 * Marca um agendamento como tendo o lembrete enviado.
 */
export async function markReminderSent(agendamentoId) {
  const db = getDb();
  await db.collection('agendamentos').doc(agendamentoId).update({
    reminderSent: true,
    reminderSentAt: FieldValue.serverTimestamp(),
  });
}

// ─────────────────────────────────────────────────────────────
// Helpers internos
// ─────────────────────────────────────────────────────────────

function getTodayStr() {
  return formatDateBR(new Date());
}

function formatDateBR(date) {
  // YYYY-MM-DD no fuso de Brasília
  return date.toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
}

function formatTimeBR(date) {
  return date.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
