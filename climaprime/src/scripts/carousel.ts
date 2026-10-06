/** Carrossel leve com scroll-snap nativo (swipe no celular) + setas e indicadores. */
function initCarousel(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>('[data-carousel-track]')!;
  const slides = Array.from(track.children) as HTMLElement[];
  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
  const dotsWrap = root.querySelector<HTMLElement>('[data-carousel-dots]');
  if (!slides.length) return;

  const perView = () => {
    const w = slides[0].getBoundingClientRect().width;
    return Math.max(1, Math.round(track.clientWidth / (w || 1)));
  };
  const pages = () => Math.max(1, slides.length - perView() + 1);
  const currentIndex = () => {
    const left = track.scrollLeft;
    let best = 0;
    slides.forEach((s, i) => {
      if (Math.abs(s.offsetLeft - track.offsetLeft - left) < Math.abs(slides[best].offsetLeft - track.offsetLeft - left)) best = i;
    });
    return best;
  };
  const goTo = (i: number) => {
    const target = slides[Math.max(0, Math.min(pages() - 1, i))];
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  let dots: HTMLButtonElement[] = [];
  const buildDots = () => {
    if (!dotsWrap) return;
    const n = pages();
    dotsWrap.replaceChildren();
    dots = Array.from({ length: n }, (_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'carousel__dot';
      b.setAttribute('aria-label', `Ir para a avaliação ${i + 1}`);
      b.addEventListener('click', () => goTo(i));
      dotsWrap.append(b);
      return b;
    });
    dotsWrap.hidden = n <= 1;
  };

  const sync = () => {
    const i = currentIndex();
    const max = pages() - 1;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    dots.forEach((d, k) => d.setAttribute('aria-current', String(k === Math.min(i, max) || (atEnd && k === max))));
    if (prev) prev.disabled = track.scrollLeft <= 4;
    if (next) next.disabled = atEnd;
  };

  prev?.addEventListener('click', () => goTo(currentIndex() - 1));
  next?.addEventListener('click', () => goTo(currentIndex() + 1));
  let raf = 0;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(sync);
  }, { passive: true });
  let lastPages = 0;
  new ResizeObserver(() => {
    if (pages() !== lastPages) {
      lastPages = pages();
      buildDots();
    }
    sync();
  }).observe(track);
}

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(initCarousel);
