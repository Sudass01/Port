/**
 * Formulário de orçamento em etapas.
 * 100% no navegador: monta a mensagem e abre o WhatsApp da empresa.
 * Com Firebase ligado (integrations.ts), também salva o pedido como lead.
 */
import { track } from './analytics';
import { getAttribution, originLabel } from './attribution';
import { buildQuoteMessage } from '../lib/quote-message';
import { whatsappUrl } from '../lib/whatsapp';
import { quote } from '../config/quote';
import { firebaseEnabled } from '../config/integrations';

type StepName = 'service' | 'quantity' | 'place' | 'location' | 'name';
const ORDER: StepName[] = ['service', 'quantity', 'place', 'location', 'name'];
const CHOICE_STEPS = new Set<StepName>(['service', 'quantity', 'place']);

const ERRORS: Record<StepName, string> = {
  service: 'Escolha o serviço para continuar.',
  quantity: 'Escolha a quantidade de aparelhos.',
  place: 'Escolha o tipo do local.',
  location: 'Informe sua cidade ou bairro (pelo menos 2 letras).',
  name: 'Informe seu nome (pelo menos 2 letras).',
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function optionText(step: 'service' | 'quantity' | 'place', id: string): string {
  const opt = quote.steps[step].options.find((o) => o.id === id);
  return opt ? opt.messageLabel || opt.label : id;
}

function initWizard(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>('form')!;
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
  const stage = root.querySelector<HTMLElement>('[data-stage]')!;
  const progressText = root.querySelector<HTMLElement>('[data-progress-text]')!;
  const progressBar = root.querySelector<HTMLElement>('[data-progress-bar]')!;
  const progress = root.querySelector<HTMLElement>('[role="progressbar"]')!;
  const errorBox = root.querySelector<HTMLElement>('[data-error]')!;
  const back = root.querySelector<HTMLButtonElement>('[data-back]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-next]')!;
  const submit = root.querySelector<HTMLButtonElement>('[data-submit]')!;
  const nav = root.querySelector<HTMLElement>('[data-nav]')!;
  const success = root.querySelector<HTMLElement>('[data-success]')!;
  const summary = root.querySelector<HTMLElement>('[data-summary]')!;
  const openLink = root.querySelector<HTMLAnchorElement>('[data-open-whatsapp]')!;
  const restart = root.querySelector<HTMLButtonElement>('[data-restart]')!;
  const fallback = root.querySelector<HTMLElement>('[data-fallback]')!;
  const privacyNote = root.querySelector<HTMLElement>('[data-privacy]');

  let current = 0;
  let started = false;
  let serviceDetail = ''; // nome exato do serviço quando vem de um card ("Carga de gás e diagnóstico")
  let lastPointer = 0;

  const value = (name: StepName): string => {
    const field = form.elements.namedItem(name);
    if (field instanceof RadioNodeList) return field.value;
    if (field instanceof HTMLInputElement) return field.value.trim();
    return '';
  };

  const isValid = (name: StepName) => (CHOICE_STEPS.has(name) ? value(name) !== '' : value(name).length >= 2);

  const markStarted = () => {
    if (started) return;
    started = true;
    track('quote_started', { location: root.dataset.trackLabel || 'quote' });
  };

  const showError = (msg: string) => {
    errorBox.textContent = msg;
    errorBox.hidden = !msg;
    const input = steps[current].querySelector<HTMLInputElement>('input[type="text"]');
    if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  const render = (direction: 1 | -1 = 1, focus = true) => {
    steps.forEach((step, i) => {
      const active = i === current;
      step.hidden = !active;
      step.classList.remove('is-entering-forward', 'is-entering-back');
      if (active && !reduceMotion) {
        void step.offsetWidth; // reinicia a animação
        step.classList.add(direction === 1 ? 'is-entering-forward' : 'is-entering-back');
      }
    });
    const n = current + 1;
    progressText.textContent = `${n} de ${ORDER.length}`;
    progress.setAttribute('aria-valuenow', String(n));
    progressBar.style.setProperty('--progress', `${(n / ORDER.length) * 100}%`);
    back.hidden = current === 0;
    const last = current === ORDER.length - 1;
    next.hidden = last;
    submit.hidden = !last;
    showError('');

    if (focus) {
      const step = steps[current];
      const input = step.querySelector<HTMLInputElement>('input[type="text"]');
      const heading = step.querySelector<HTMLElement>('[data-step-title]');
      // No celular, não abre o teclado sozinho: foca o título (leitores de tela) e mantém o card visível.
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      (input && !coarse ? input : heading)?.focus({ preventScroll: true });
      const top = root.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.5) {
        root.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    }
  };

  const goTo = (index: number) => {
    const dir: 1 | -1 = index > current ? 1 : -1;
    current = Math.max(0, Math.min(ORDER.length - 1, index));
    render(dir);
    track('quote_step', { step: current + 1 });
    if (current >= 2 && firebaseEnabled) void import('../lib/leads'); // pré-carrega para o envio ser instantâneo
  };

  const tryNext = () => {
    const name = ORDER[current];
    if (!isValid(name)) {
      showError(ERRORS[name]);
      steps[current].querySelector<HTMLElement>('input')?.focus();
      return;
    }
    goTo(current + 1);
  };

  // Seleção de opções: marca visualmente e avança sozinho quando foi um toque/clique.
  root.addEventListener('pointerdown', () => (lastPointer = Date.now()));
  form.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    if (input.type !== 'radio') return;
    markStarted();
    if (input.name === 'service') serviceDetail = '';
    showError('');
    const fromPointer = Date.now() - lastPointer < 800;
    if (fromPointer && ORDER[current] === input.name) {
      window.setTimeout(() => {
        if (ORDER[current] === input.name) goTo(current + 1);
      }, reduceMotion ? 0 : 260);
    }
  });
  form.addEventListener('input', (e) => {
    markStarted();
    if ((e.target as HTMLElement).matches('input[type="text"]')) showError('');
  });

  // Atalhos de cidade/bairro.
  root.querySelectorAll<HTMLButtonElement>('[data-pick]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = form.elements.namedItem('location') as HTMLInputElement;
      input.value = btn.dataset.pick || '';
      markStarted();
      showError('');
      root.querySelectorAll('[data-pick]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    });
  });

  back.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', tryNext);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (current < ORDER.length - 1) {
      tryNext();
      return;
    }
    if (!isValid('name')) {
      showError(ERRORS.name);
      (form.elements.namedItem('name') as HTMLInputElement).focus();
      return;
    }

    const serviceId = value('service');
    const answers = {
      service: serviceDetail || optionText('service', serviceId),
      quantity: optionText('quantity', value('quantity')),
      place: optionText('place', value('place')),
      location: value('location'),
      name: value('name'),
      origin: quote.includeOriginInMessage ? originLabel() : '',
    };
    const message = buildQuoteMessage(answers);
    const url = whatsappUrl(message);

    // Abre o WhatsApp imediatamente (precisa ser no mesmo clique para o navegador não bloquear).
    const win = window.open(url, '_blank');
    if (win) win.opener = null;

    openLink.href = url;
    fallback.hidden = Boolean(win);
    summary.replaceChildren(
      ...([
        [quote.message.labels.service, answers.service],
        [quote.message.labels.quantity, answers.quantity],
        [quote.message.labels.place, answers.place],
        [quote.message.labels.location, answers.location],
        [quote.message.labels.name, answers.name],
      ] as const).map(([k, v]) => {
        const row = document.createElement('div');
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = k;
        dd.textContent = v;
        row.append(dt, dd);
        return row;
      }),
    );
    stage.hidden = true;
    nav.hidden = true;
    if (privacyNote) privacyNote.hidden = true;
    success.hidden = false;
    success.querySelector<HTMLElement>('[data-success-title]')?.focus({ preventScroll: true });

    track('quote_completed', { service: answers.service, quantity: answers.quantity, place: answers.place });
    track('whatsapp_click', { location: 'quote_form' });

    if (firebaseEnabled) {
      import('../lib/leads')
        .then(({ saveLead }) =>
          saveLead({
            ...answers,
            serviceId,
            origin: answers.origin,
            attribution: getAttribution() as Record<string, string>,
            page: window.location.pathname,
            message,
          }),
        )
        .catch((err) => console.warn('[leads] Não foi possível salvar o lead:', err));
    }
  });

  openLink.addEventListener('click', () => track('whatsapp_click', { location: 'quote_success' }));

  restart.addEventListener('click', () => {
    form.reset();
    serviceDetail = '';
    root.querySelectorAll('[data-pick]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    success.hidden = true;
    stage.hidden = false;
    nav.hidden = false;
    if (privacyNote) privacyNote.hidden = false;
    current = 0;
    render(-1);
  });

  // Vindo de um card de serviço / CTA: pré-seleciona e pula para a etapa 2.
  document.addEventListener('quote:preselect', (e) => {
    const { service, label } = (e as CustomEvent<{ service: string; label: string }>).detail;
    const radio = form.querySelector<HTMLInputElement>(`input[name="service"][value="${CSS.escape(service)}"]`);
    if (!radio) return;
    if (!success.hidden) restart.click();
    radio.checked = true;
    serviceDetail = label;
    markStarted();
    current = 1;
    render(1, false);
  });

  render(1, false);
}

document.querySelectorAll<HTMLElement>('[data-quote]').forEach(initWizard);
