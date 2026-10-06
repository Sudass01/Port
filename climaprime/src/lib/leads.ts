/**
 * Gravação de leads no Firebase (Firestore Lite — versão leve do SDK).
 * Este módulo só é baixado pelo navegador quando o Firebase está configurado
 * em integrations.ts. Falhas aqui NUNCA impedem o WhatsApp de abrir.
 */
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { integrations } from '../config/integrations';

let app: FirebaseApp | undefined;

function getApp(): FirebaseApp {
  if (app) return app;
  const { leadsCollection: _ignored, ...config } = integrations.firebase;
  app = getApps()[0] ?? initializeApp(config);
  return app;
}

export type LeadInput = {
  service: string;
  serviceId: string;
  quantity: string;
  place: string;
  location: string;
  name: string;
  origin: string;
  attribution: Record<string, string>;
  page: string;
  message: string;
};

export async function saveLead(lead: LeadInput): Promise<void> {
  const db = getFirestore(getApp());
  await addDoc(collection(db, integrations.firebase.leadsCollection), {
    ...lead,
    status: 'novo',
    createdAt: serverTimestamp(),
    userAgent: navigator.userAgent.slice(0, 200),
  });
}
