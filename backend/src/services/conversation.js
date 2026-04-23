/**
 * Conversation Service — histórico de conversa no Firestore
 *
 * Cada conversa é identificada por `${companyId}_${phone}`.
 * Mantém um histórico rolante com no máximo MAX_HISTORY_MESSAGES mensagens.
 *
 * Schema da coleção `conversations`:
 * {
 *   companyId, storeId, phone,
 *   messages: [{ role, content, timestamp }],
 *   stage: string,         // estado atual da conversa
 *   humanMode: boolean,    // se true, bot para de responder
 *   updatedAt: Timestamp,
 *   createdAt: Timestamp,
 * }
 */

import { getDb } from '../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { ENV } from '../config/env.js';

function convId(companyId, phone) {
  return `${companyId}_${phone}`;
}

// ─────────────────────────────────────────────────────────────
// Leitura
// ─────────────────────────────────────────────────────────────

/**
 * Carrega a conversa do Firestore.
 * Retorna o documento ou um objeto default se não existir.
 */
export async function getConversation(companyId, phone) {
  const db = getDb();
  const doc = await db.collection('conversations').doc(convId(companyId, phone)).get();

  if (!doc.exists) {
    return {
      companyId,
      phone,
      messages: [],
      stage: 'novo',
      humanMode: false,
    };
  }

  return { id: doc.id, ...doc.data() };
}

/**
 * Verifica se o modo humano está ativo para um telefone.
 */
export async function isHumanMode(companyId, phone) {
  const conv = await getConversation(companyId, phone);
  return conv.humanMode === true;
}

// ─────────────────────────────────────────────────────────────
// Escrita
// ─────────────────────────────────────────────────────────────

/**
 * Adiciona mensagens do usuário e da IA ao histórico.
 * Trunca o histórico se ultrapassar MAX_HISTORY_MESSAGES.
 */
export async function saveMessages(companyId, storeId, phone, userText, assistantText, stage) {
  const db = getDb();
  const id = convId(companyId, phone);
  const ref = db.collection('conversations').doc(id);

  const existing = await ref.get();
  let messages = existing.exists ? (existing.data().messages || []) : [];

  // Adiciona a mensagem do usuário
  messages.push({ role: 'user', content: userText, timestamp: new Date().toISOString() });

  // Adiciona a resposta da IA
  if (assistantText) {
    messages.push({ role: 'assistant', content: assistantText, timestamp: new Date().toISOString() });
  }

  // Trunca ao limite
  const limit = ENV.MAX_HISTORY_MESSAGES;
  if (messages.length > limit) {
    messages = messages.slice(messages.length - limit);
  }

  const payload = {
    companyId,
    storeId: storeId || null,
    phone,
    messages,
    stage: stage || 'ativo',
    humanMode: existing.exists ? (existing.data().humanMode || false) : false,
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (!existing.exists) {
    payload.createdAt = FieldValue.serverTimestamp();
  }

  await ref.set(payload, { merge: true });
}

/**
 * Define ou remove o modo humano para uma conversa.
 */
export async function setHumanMode(companyId, phone, enabled) {
  const db = getDb();
  const ref = db.collection('conversations').doc(convId(companyId, phone));
  await ref.set(
    {
      humanMode: enabled,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Atualiza o stage da conversa (ex: 'coletando_dados', 'confirmando', etc.)
 */
export async function updateStage(companyId, phone, stage) {
  const db = getDb();
  const ref = db.collection('conversations').doc(convId(companyId, phone));
  await ref.set(
    { stage, updatedAt: FieldValue.serverTimestamp() },
    { merge: true }
  );
}

/**
 * Deleta (reseta) uma conversa — útil para o dashboard.
 */
export async function resetConversation(companyId, phone) {
  const db = getDb();
  await db.collection('conversations').doc(convId(companyId, phone)).delete();
}

/**
 * Retorna o histórico formatado para envio ao OpenAI.
 * Formato: [{ role: 'user' | 'assistant', content: string }]
 */
export function buildOpenAIHistory(messages) {
  return messages.map((m) => ({ role: m.role, content: m.content }));
}
