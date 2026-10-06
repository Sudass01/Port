/**
 * Eventos de conversão.
 * `track()` envia o mesmo evento para tudo que estiver ligado em
 * integrations.ts: dataLayer (GTM), gtag (GA4) e fbq (Meta Pixel).
 * Sem nenhuma integração configurada, não faz nada (e não quebra nada).
 *
 * Eventos usados no site:
 *   whatsapp_click         — qualquer botão/link de WhatsApp
 *   quote_started          — primeira interação no formulário de orçamento
 *   quote_step             — avanço de etapa (step: 1..5)
 *   quote_completed        — clique final "Solicitar orçamento no WhatsApp"
 *   service_click          — CTA de um card de serviço
 *   commercial_quote_click — CTA "Solicitar proposta comercial"
 *   phone_click            — link de telefone
 *   instagram_click        — link do Instagram
 *   quote_cta_click        — botões "Solicitar orçamento" que levam ao formulário
 */
import { getAttribution } from './attribution';
import { integrations } from '../config/integrations';

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Eventos do Meta Pixel: os de conversão usam eventos padrão; os demais, customizados. */
const META_STANDARD: Record<string, string> = {
  whatsapp_click: 'Contact',
  quote_completed: 'Lead',
  commercial_quote_click: 'Contact',
};

export function track(event: string, params: Params = {}): void {
  const a = getAttribution();
  const payload: Params = {
    ...params,
    page_path: window.location.pathname,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
  };
  for (const k of Object.keys(payload)) if (payload[k] === undefined || payload[k] === '') delete payload[k];

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
    if (typeof window.gtag === 'function' && integrations.analytics.ga4Id) window.gtag('event', event, payload);
    if (typeof window.fbq === 'function') {
      const std = META_STANDARD[event];
      if (std) window.fbq('track', std, payload);
      else window.fbq('trackCustom', event, payload);
    }
  } catch {
    /* analytics nunca pode quebrar o site */
  }
  if (integrations.analytics.debug) console.info('[track]', event, payload);
}
