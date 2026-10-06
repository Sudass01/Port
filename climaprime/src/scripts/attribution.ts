/**
 * Origem da visita (UTM).
 * Ao chegar com ?utm_source=instagram&utm_campaign=verao, os parâmetros ficam
 * guardados durante a sessão (sessionStorage) mesmo navegando entre páginas.
 * São usados na mensagem do orçamento ("Origem: Instagram"), nos eventos de
 * analytics e no lead salvo no Firebase.
 */
const KEY = 'site_attribution';
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>> & {
  referrer?: string;
  landing_page?: string;
};

const SOURCE_LABELS: Record<string, string> = {
  ig: 'Instagram',
  instagram: 'Instagram',
  fb: 'Facebook',
  facebook: 'Facebook',
  meta: 'Meta Ads',
  google: 'Google',
  gmb: 'Google Meu Negócio',
  gbp: 'Google Meu Negócio',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  whatsapp: 'WhatsApp',
  email: 'E-mail',
};

function read(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Captura os parâmetros da URL atual. Chamado uma vez em cada página. */
export function captureAttribution(): void {
  try {
    const url = new URL(window.location.href);
    const found: Attribution = {};
    for (const p of PARAMS) {
      const v = url.searchParams.get(p);
      if (v) found[p] = v.slice(0, 120);
    }
    if (Object.keys(found).length > 0) {
      found.landing_page = url.pathname;
      if (document.referrer) found.referrer = document.referrer.slice(0, 200);
      sessionStorage.setItem(KEY, JSON.stringify(found));
    } else if (!read() && document.referrer && !document.referrer.startsWith(window.location.origin)) {
      // Sem UTM: guarda ao menos o site de origem (ex.: google.com).
      sessionStorage.setItem(KEY, JSON.stringify({ referrer: document.referrer.slice(0, 200), landing_page: url.pathname }));
    }
  } catch {
    /* navegação privada sem storage: ignora */
  }
}

export function getAttribution(): Attribution {
  return read() ?? {};
}

/** Texto amigável da origem, ex.: "Instagram (campanha: verao)". Vazio se não houver UTM. */
export function originLabel(a: Attribution = getAttribution()): string {
  const src = a.utm_source?.trim();
  if (!src) {
    if (a.gclid) return 'Google Ads';
    if (a.fbclid) return 'Facebook/Instagram';
    return '';
  }
  const key = src.toLowerCase();
  const label = SOURCE_LABELS[key] ?? src.charAt(0).toUpperCase() + src.slice(1);
  const parts = [label];
  if (a.utm_medium && !['social', 'organic', 'referral'].includes(a.utm_medium.toLowerCase())) parts.push(a.utm_medium);
  const base = parts.join(' / ');
  return a.utm_campaign ? `${base} (campanha: ${a.utm_campaign})` : base;
}
