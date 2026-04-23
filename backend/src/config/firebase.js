import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let db;

export function initFirebase() {
  if (getApps().length > 0) {
    db = getFirestore();
    return db;
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
    throw new Error(
      '[Firebase] Variáveis de ambiente ausentes: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY'
    );
  }

  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });

  db = getFirestore();

  // Configuração de timestamp
  db.settings({ ignoreUndefinedProperties: true });

  console.log('[Firebase] Conectado ao projeto:', process.env.FIREBASE_PROJECT_ID);
  return db;
}

export function getDb() {
  if (!db) throw new Error('[Firebase] SDK não inicializado. Chame initFirebase() primeiro.');
  return db;
}
