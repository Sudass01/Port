/** Mapa sob demanda: o iframe do Google Maps só carrega quando a pessoa pede (melhor para velocidade). */
document.querySelectorAll<HTMLElement>('[data-map]').forEach((root) => {
  const btn = root.querySelector<HTMLButtonElement>('[data-map-load]');
  btn?.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = root.dataset.src!;
    iframe.title = root.dataset.title || 'Mapa';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    iframe.className = 'map__iframe';
    root.append(iframe);
    root.classList.add('is-loaded');
    btn.remove();
  });
});
