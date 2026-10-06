/**
 * ============================================================================
 *  INTEGRAÇÕES — Analytics, Tag Manager, Meta Pixel e Firebase
 * ============================================================================
 *  Tudo DESLIGADO por padrão: com os campos vazios, nenhum script externo é
 *  carregado e o site continua 100% funcional.
 *
 *  Os valores podem ser escritos aqui OU definidos como variáveis de ambiente
 *  no Netlify (Site configuration → Environment variables). A variável de
 *  ambiente tem prioridade. Nomes das variáveis entre parênteses.
 * ============================================================================
 */

const env = import.meta.env;
const pick = (fromEnv: string | undefined, fallback: string) => (fromEnv && fromEnv.trim()) || fallback;

export const integrations = {
  analytics: {
    /** Google Analytics 4 — ex.: 'G-XXXXXXXXXX' (PUBLIC_GA_ID) */
    ga4Id: pick(env.PUBLIC_GA_ID, ''),
    /** Google Tag Manager — ex.: 'GTM-XXXXXXX' (PUBLIC_GTM_ID)
     *  Se usar GTM, configure o GA4 e o Pixel DENTRO do GTM e deixe os outros vazios. */
    gtmId: pick(env.PUBLIC_GTM_ID, ''),
    /** Meta Pixel (Facebook/Instagram Ads) — só números (PUBLIC_META_PIXEL_ID) */
    metaPixelId: pick(env.PUBLIC_META_PIXEL_ID, ''),
    /** Mostra no console do navegador cada evento disparado (útil para testar). */
    debug: pick(env.PUBLIC_ANALYTICS_DEBUG, '') === 'true',
  },

  /**
   * FIREBASE (opcional) — salva cada pedido de orçamento como lead no Firestore
   * e libera o painel /admin para a empresa acompanhar os pedidos.
   * O WhatsApp abre normalmente mesmo se o Firebase falhar ou estiver desligado.
   *
   * Firebase Console → Configurações do projeto → Seus apps → Web (</>).
   * Esses valores são públicos por natureza (a segurança fica nas regras do
   * firestore.rules), então podem ficar no código sem problema.
   */
  firebase: {
    apiKey: pick(env.PUBLIC_FIREBASE_API_KEY, ''),
    authDomain: pick(env.PUBLIC_FIREBASE_AUTH_DOMAIN, ''),
    projectId: pick(env.PUBLIC_FIREBASE_PROJECT_ID, ''),
    storageBucket: pick(env.PUBLIC_FIREBASE_STORAGE_BUCKET, ''),
    messagingSenderId: pick(env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID, ''),
    appId: pick(env.PUBLIC_FIREBASE_APP_ID, ''),
    /** Coleção onde os pedidos são gravados. */
    leadsCollection: 'leads',
  },
};

export const firebaseEnabled = Boolean(
  integrations.firebase.apiKey && integrations.firebase.projectId && integrations.firebase.appId,
);
