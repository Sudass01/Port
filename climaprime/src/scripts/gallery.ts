/** Galeria: filtro por categoria + lightbox (<dialog> nativo) com teclado e swipe. */
function initGallery(root: HTMLElement) {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-gallery-item]'));
  const filters = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const dialog = root.querySelector<HTMLDialogElement>('[data-lightbox]');
  const status = root.querySelector<HTMLElement>('[data-gallery-status]');

  filters.forEach((btn) =>
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter!;
      filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let count = 0;
      items.forEach((item) => {
        const show = f === 'all' || item.dataset.category === f;
        item.hidden = !show;
        if (show) count++;
      });
      if (status) status.textContent = `${count} ${count === 1 ? 'trabalho exibido' : 'trabalhos exibidos'}`;
    }),
  );

  if (!dialog || typeof dialog.showModal !== 'function') return;
  const img = dialog.querySelector<HTMLImageElement>('[data-lb-image]')!;
  const title = dialog.querySelector<HTMLElement>('[data-lb-title]')!;
  const meta = dialog.querySelector<HTMLElement>('[data-lb-meta]')!;
  const desc = dialog.querySelector<HTMLElement>('[data-lb-desc]')!;
  const counter = dialog.querySelector<HTMLElement>('[data-lb-counter]')!;
  let index = 0;
  let opener: HTMLElement | null = null;

  const visible = () => items.filter((i) => !i.hidden);

  const show = (i: number) => {
    const list = visible();
    if (!list.length) return;
    index = (i + list.length) % list.length;
    const d = list[index].dataset;
    img.classList.remove('is-loaded');
    img.onload = () => img.classList.add('is-loaded');
    img.src = d.src!;
    img.alt = d.alt || '';
    title.textContent = d.title || '';
    meta.textContent = [d.categoryLabel, d.location].filter(Boolean).join(' · ');
    desc.textContent = d.description || '';
    counter.textContent = `${index + 1} / ${list.length}`;
    if (img.complete) img.classList.add('is-loaded');
  };

  items.forEach((item) =>
    item.querySelector('button')?.addEventListener('click', (e) => {
      opener = e.currentTarget as HTMLElement;
      show(visible().indexOf(item));
      dialog.showModal();
      document.documentElement.classList.add('dialog-open');
    }),
  );

  dialog.querySelector('[data-lb-prev]')?.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-lb-next]')?.addEventListener('click', () => show(index + 1));
  dialog.querySelector('[data-lb-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close(); // clique no fundo
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('dialog-open');
    opener?.focus();
  });

  // Swipe no celular.
  let startX = 0;
  let startY = 0;
  dialog.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  dialog.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
  }, { passive: true });
}

document.querySelectorAll<HTMLElement>('[data-gallery]').forEach(initGallery);
