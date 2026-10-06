import { quote } from '../config/quote';

export type QuoteAnswers = {
  service: string;
  quantity: string;
  place: string;
  location: string;
  name: string;
  origin?: string;
};

/** Monta a mensagem do orçamento a partir das respostas (já em texto legível). */
export function buildQuoteMessage(a: QuoteAnswers): string {
  const { labels, greeting, closing } = quote.message;
  const rows: [string, string | undefined][] = [
    [labels.service, a.service],
    [labels.quantity, a.quantity],
    [labels.place, a.place],
    [labels.location, a.location],
    [labels.name, a.name],
  ];
  const body = rows
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v!.trim()}`)
    .join('\n');
  const parts = [greeting, body, closing];
  if (a.origin) parts.push(`${labels.origin}: ${a.origin}`);
  return parts.filter(Boolean).join('\n\n');
}
