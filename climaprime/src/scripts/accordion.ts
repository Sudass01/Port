/** Accordion acessível (botão + painel) com abertura suave via CSS grid-template-rows. */
document.querySelectorAll<HTMLElement>('[data-accordion]').forEach((root) => {
  const single = root.dataset.accordion === 'single';
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]'));
  const panel = (btn: HTMLButtonElement) => document.getElementById(btn.getAttribute('aria-controls') || '');

  const set = (btn: HTMLButtonElement, open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    // Painel fechado sai da árvore de acessibilidade (não é lido nem focável).
    panel(btn)?.toggleAttribute('inert', !open);
  };

  buttons.forEach((btn) => {
    set(btn, btn.getAttribute('aria-expanded') === 'true');
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      if (single && open) buttons.forEach((b) => b !== btn && set(b, false));
      set(btn, open);
    });
  });
});
