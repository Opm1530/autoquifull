/**
 * Calendar Routes
 *
 * GET  /calendar/google/auth-url?companyId=xxx  → URL de autorização OAuth2
 * GET  /calendar/google/callback?code=&state=   → Callback OAuth2 (redirect do Google)
 * POST /calendar/google/sync/:appointmentId     → Sincroniza agendamento com GCal
 * DELETE /calendar/google/event/:appointmentId  → Remove evento do GCal
 * POST /calendar/trinks/test                    → Testa credenciais Trinks
 */

import { Router } from 'express';
import {
  getAuthUrl,
  handleOAuthCallback,
  createCalendarEvent,
  deleteCalendarEvent,
  isConnected,
} from '../services/google-calendar.js';
import { getDb } from '../config/firebase.js';

const router = Router();

// ── Google Calendar OAuth2 ───────────────────────────────────

/**
 * Retorna a URL de autorização do Google para o dono clicar.
 */
router.get('/google/auth-url', (req, res) => {
  const { companyId } = req.query;
  if (!companyId) return res.status(400).json({ error: 'companyId obrigatório' });

  const authUrl = getAuthUrl(companyId);
  res.json({ authUrl });
});

/**
 * Callback do Google OAuth2.
 * Recebe o code, troca por tokens e redireciona de volta para o dashboard.
 */
router.get('/google/callback', async (req, res) => {
  const { code, state, error } = req.query;

  // Usuário cancelou
  if (error) {
    return res.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:5173'}/configuration?gcal=cancelled`
    );
  }

  if (!code || !state) {
    return res.status(400).send('Parâmetros inválidos.');
  }

  try {
    const companyId = Buffer.from(String(state), 'base64').toString('utf8');
    await handleOAuthCallback(String(code), companyId);

    // Redireciona para o dashboard com sucesso
    res.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:5173'}/configuration?gcal=connected`
    );
  } catch (err) {
    console.error('[Calendar] Erro no callback OAuth:', err.message);
    res.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:5173'}/configuration?gcal=error`
    );
  }
});

/**
 * Sincroniza um agendamento com o Google Calendar.
 * Cria ou atualiza o evento.
 */
router.post('/google/sync/:appointmentId', async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const db = getDb();
    const doc = await db.collection('agendamentos').doc(appointmentId).get();
    if (!doc.exists) return res.status(404).json({ error: 'Agendamento não encontrado' });

    const agendamento = { id: doc.id, ...doc.data() };
    const companyId = agendamento.companyId;

    if (!(await isConnected(companyId))) {
      return res.status(400).json({ error: 'Google Calendar não conectado para esta empresa' });
    }

    const eventId = await createCalendarEvent(companyId, agendamento);
    res.json({ ok: true, eventId });
  } catch (err) {
    console.error('[Calendar] Erro ao sincronizar:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Remove um evento do Google Calendar.
 */
router.delete('/google/event/:appointmentId', async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const db = getDb();
    const doc = await db.collection('agendamentos').doc(appointmentId).get();
    if (!doc.exists) return res.status(404).json({ error: 'Agendamento não encontrado' });

    const agendamento = doc.data();
    const eventId = agendamento.googleCalendarEventId;

    if (!eventId) return res.json({ ok: true, message: 'Sem evento para remover' });

    await deleteCalendarEvent(agendamento.companyId, eventId);
    res.json({ ok: true });
  } catch (err) {
    console.error('[Calendar] Erro ao deletar evento:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Trinks ───────────────────────────────────────────────────

/**
 * Testa as credenciais do Trinks de uma empresa.
 */
router.post('/trinks/test', async (req, res) => {
  const { apiKey, estabelecimentoId } = req.body;

  if (!apiKey || !estabelecimentoId) {
    return res.status(400).json({ error: 'apiKey e estabelecimentoId são obrigatórios' });
  }

  try {
    const response = await fetch(
      `https://api.trinks.com/v1/profissionais?estabelecimentoId=${estabelecimentoId}`,
      {
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return res.json({ ok: false, error: `Trinks retornou ${response.status}: ${text.slice(0, 100)}` });
    }

    const data = await response.json();
    const profCount = Array.isArray(data?.data) ? data.data.length : (Array.isArray(data) ? data.length : 0);

    res.json({ ok: true, message: `Conexão OK! ${profCount} profissional(is) encontrado(s).` });
  } catch (err) {
    res.json({ ok: false, error: `Falha ao conectar ao Trinks: ${err.message}` });
  }
});

export default router;
