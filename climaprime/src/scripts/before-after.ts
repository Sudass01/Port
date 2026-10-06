/** Slider antes/depois: arrastar com mouse ou dedo, clicar na posição ou usar as setas do teclado. */
function initCompare(root: HTMLElement) {
  const handle = root.querySelector<HTMLElement>('[data-compare-handle]')!;
  let value = 50;
  let dragging = false;

  const set = (v: number) => {
    value = Math.max(0, Math.min(100, v));
    root.style.setProperty('--pos', `${value}%`);
    handle.setAttribute('aria-valuenow', String(Math.round(value)));
    handle.setAttribute('aria-valuetext', `${Math.round(value)}% mostrando o antes`);
  };

  const fromEvent = (e: PointerEvent) => {
    const rect = root.getBoundingClientRect();
    set(((e.clientX - rect.left) / rect.width) * 100);
  };

  root.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true;
    root.setPointerCapture(e.pointerId);
    root.classList.add('is-dragging');
    fromEvent(e);
  });
  root.addEventListener('pointermove', (e) => dragging && fromEvent(e));
  const stop = () => {
    dragging = false;
    root.classList.remove('is-dragging');
  };
  root.addEventListener('pointerup', stop);
  root.addEventListener('pointercancel', stop);

  handle.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 10 : 5;
    const map: Record<string, number> = { ArrowLeft: value - step, ArrowRight: value + step, Home: 0, End: 100 };
    if (e.key in map) {
      e.preventDefault();
      set(map[e.key]);
    }
  });
  set(50);
}

document.querySelectorAll<HTMLElement>('[data-compare]').forEach(initCompare);
