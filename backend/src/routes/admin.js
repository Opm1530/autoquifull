/**
 * Admin Routes — operações exclusivas do administrador da plataforma
 *
 * GET    /admin/logs               → Últimas linhas de log do servidor
 * DELETE /admin/company/:companyId → Apaga empresa e todos os dados vinculados
 */

import { Router } from 'express';
import { getDb } from '../config/firebase.js';
import { log } from '../utils/logger.js';
import { requireAuth } from '../middlewares/auth.js';
import { getRecentLogs } from '../utils/logStore.js';

const router = Router();

// ── Utilitário: apaga todos os docs de uma query em lotes ────

async function deleteCollection(db, query) {
  let total = 0;
  let snap = await query.limit(400).get();

  while (!snap.empty) {
    const batch = db.batch();
    snap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    total += snap.docs.length;
    if (snap.docs.length < 400) break;
    snap = await query.limit(400).get();
  }

  return total;
}

// ── GET /admin/logs ───────────────────────────────────────────

router.get('/logs', requireAuth, (req, res) => {
  const n = Math.min(parseInt(req.query.lines || '200', 10), 500);
  res.json({ logs: getRecentLogs(n) });
});

// ── DELETE /admin/company/:companyId ─────────────────────────

/**
 * Apaga uma empresa e TODOS os dados vinculados a ela.
 *
 * Coleções limpas:
 *   companies, users, leads, messages, pedidos, products,
 *   categories, instancias, loja_config, empresa_config,
 *   subscriptions, agendamentos, appointments, reminders
 */
router.delete('/company/:companyId', requireAuth, async (req, res) => {
  const { companyId } = req.params;

  if (!companyId) {
    return res.status(400).json({ error: 'companyId obrigatório' });
  }

  const db = getDb();
  const t = log.timer ? log.timer() : { ms: () => 0 };
  log.warn('Admin', `Iniciando exclusão da empresa ${companyId}...`);

  try {
    // Confirma que a empresa existe
    const companyDoc = await db.collection('companies').doc(companyId).get();
    if (!companyDoc.exists) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }
    const companyName = companyDoc.data()?.name || companyId;

    const results = {};

    // 1. Leads
    results.leads = await deleteCollection(db,
      db.collection('leads').where('empresaId', '==', companyId));

    // 2. Mensagens
    results.messages = await deleteCollection(db,
      db.collection('messages').where('empresaId', '==', companyId));

    // 3. Pedidos
    results.pedidos = await deleteCollection(db,
      db.collection('pedidos').where('empresaId', '==', companyId));

    // 4. Produtos
    results.products = await deleteCollection(db,
      db.collection('products').where('companyId', '==', companyId));

    // 5. Categorias
    results.categories = await deleteCollection(db,
      db.collection('categories').where('companyId', '==', companyId));

    // 6. Instâncias WhatsApp
    results.instancias = await deleteCollection(db,
      db.collection('instancias').where('empresaId', '==', companyId));

    // 7. Config da loja
    results.loja_config = await deleteCollection(db,
      db.collection('loja_config').where('empresaId', '==', companyId));

    // 8. Config da empresa
    results.empresa_config = await deleteCollection(db,
      db.collection('empresa_config').where('empresaId', '==', companyId));

    // 9. Agendamentos
    results.agendamentos = await deleteCollection(db,
      db.collection('agendamentos').where('empresaId', '==', companyId));

    // 10. Appointments (alias)
    results.appointments = await deleteCollection(db,
      db.collection('appointments').where('companyId', '==', companyId));

    // 11. Lembretes
    results.reminders = await deleteCollection(db,
      db.collection('reminders').where('companyId', '==', companyId));

    // 12. Campanhas
    results.campaigns = await deleteCollection(db,
      db.collection('campaigns').where('companyId', '==', companyId));

    // 13. Usuários da empresa (Firestore — não deleta do Firebase Auth)
    const usersSnap = await db.collection('users')
      .where('companyId', '==', companyId)
      .get();
    const userBatch = db.batch();
    usersSnap.docs.forEach((doc) => userBatch.delete(doc.ref));
    if (!usersSnap.empty) await userBatch.commit();
    results.users = usersSnap.size;

    // 14. Assinatura
    const subDoc = await db.collection('subscriptions').doc(companyId).get();
    if (subDoc.exists) {
      await subDoc.ref.delete();
      results.subscription = 1;
    }

    // 15. Empresa (por último)
    await db.collection('companies').doc(companyId).delete();

    const total = Object.values(results).reduce((s, v) => s + (v || 0), 0);
    log.ok('Admin', `Empresa "${companyName}" (${companyId}) apagada — ${total} documentos removidos`, results);

    res.json({
      ok: true,
      companyId,
      companyName,
      deleted: results,
      total,
    });

  } catch (err) {
    log.error('Admin', `Erro ao apagar empresa ${companyId}`, err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
