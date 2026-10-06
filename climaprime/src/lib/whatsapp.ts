import { company } from '../config/company';

/** Monta o link do WhatsApp com a mensagem já codificada. Usado no servidor e no navegador. */
export function whatsappUrl(message: string = company.whatsappMessages.default, phone: string = company.contact.whatsapp): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
