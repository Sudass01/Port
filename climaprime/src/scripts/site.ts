/**
 * Comportamentos globais (carregado em todas as páginas):
 * header ao rolar, menu mobile, animações de entrada, barra fixa do celular,
 * links de WhatsApp com origem da campanha e rastreamento de cliques.
 */
import { captureAttribution, originLabel } from './attribution';
import { track } from './analytics';
import { whatsappUrl } from '../lib/whatsapp';
import { quote } from '../config/quote';

captureAttribution();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- Header */
const header = document.querySelector<HTMLElement>('[data-header]');
if (header) {
  let ticking = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/* ----------------------------------------------------------- Menu mobile */
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.getElementById('mobile-menu');
if (menuButton && menu) {
  const focusables = () =>
    Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter((el) => el.offsetParent !== null);

  const setOpen = (open: boolean, returnFocus = true) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.toggleAttribute('data-open', open);
    document.documentElement.classList.toggle('menu-open', open);
    if (open) {
      menu.removeAttribute('inert');
      requestAnimationFrame(() => focusables()[0]?.focus());
    } else {
      menu.setAttribute('inert', '');
      if (returnFocus) menuButton.focus();
    }
  };

  menuButton.addEventListener('click', () => setOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.hasAttribute('data-menu-backdrop')) setOpen(false, false);
  });
  document.addEventListener('keydown', (e) => {
    if (menuButton.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'Tab') {
      const items = [menuButton, ...focusables()];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (mq) => {
    if (mq.matches) setOpen(false, false);
  });
}

/* ------------------------------------------------------ Animações de entrada */
const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ------------------------------------------- Barra fixa inferior (celular) */
const mobileBar = document.querySelector<HTMLElement>('[data-mobile-cta]');
if (mobileBar && 'IntersectionObserver' in window) {
  const blockers = new Set<Element>();
  let pastHero = false;
  const sync = () => mobileBar.toggleAttribute('data-visible', pastHero && blockers.size === 0);

  const hero = document.querySelector('[data-hero]');
  if (hero) {
    new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting;
      sync();
    }, { threshold: 0.15 }).observe(hero);
  } else {
    pastHero = true;
  }

  // Esconde a barra perto do rodapé e enquanto o formulário de orçamento está na tela.
  const blockIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) blockers.add(e.target);
      else blockers.delete(e.target);
    }
    sync();
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-hide-mobile-cta]').forEach((el) => blockIo.observe(el));
  sync();
}

/* ------------------------------------------------ WhatsApp + rastreamento */
document.addEventListener('click', (event) => {
  const el = (event.target as HTMLElement).closest<HTMLElement>('a, button');
  if (!el) return;

  // Links de WhatsApp: acrescenta a origem da campanha na mensagem.
  if (el instanceof HTMLAnchorElement && el.dataset.wa !== undefined) {
    const base = el.dataset.waMessage || '';
    const origin = quote.includeOriginInMessage ? originLabel() : '';
    const message = origin ? `${base}\n\n${quote.message.labels.origin}: ${origin}` : base;
    el.href = whatsappUrl(message);
    track(el.dataset.track || 'whatsapp_click', { location: el.dataset.trackLabel || 'site' });
    if (el.dataset.track && el.dataset.track !== 'whatsapp_click') {
      track('whatsapp_click', { location: el.dataset.trackLabel || 'site' });
    }
    return;
  }

  // CTA que leva ao orçamento com um serviço pré-selecionado.
  const service = el.dataset.quoteService;
  if (service) {
    document.dispatchEvent(
      new CustomEvent('quote:preselect', { detail: { service, label: el.dataset.quoteLabel || '' } }),
    );
  }

  if (el.dataset.track) {
    track(el.dataset.track, { location: el.dataset.trackLabel || 'site', service: el.dataset.quoteLabel || service });
  } else if (el instanceof HTMLAnchorElement) {
    if (el.protocol === 'tel:') track('phone_click', { location: el.dataset.trackLabel || 'site' });
    else if (el.hostname.includes('instagram.com')) track('instagram_click', { location: el.dataset.trackLabel || 'site' });
  }
});
