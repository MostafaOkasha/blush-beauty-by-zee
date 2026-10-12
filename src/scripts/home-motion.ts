/**
 * Homepage motion. Everything here is enhancement: the page is complete
 * without it, and reduced-motion users get the static page.
 *
 * Phones get no scroll-linked animation at all: no pinning, no scrubbing,
 * nothing that fights native momentum scrolling or the collapsing URL bar.
 * Reveals use IntersectionObserver and CSS transitions (opacity/transform
 * only). GSAP is loaded only on wide screens, for a light hero parallax.
 */
const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll(sel)) as T[];

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initHomeMotion() {
  initHeader();
  qa('[data-compare]').forEach(initCompare);
  if (!reduceMotion()) initReveals();
  if (!reduceMotion() && matchMedia('(min-width: 980px) and (pointer: fine)').matches) {
    import('./hero-parallax')
      .then((m) => m.initHeroParallax())
      .catch(() => {}); // parallax is optional polish
  }
}

/** Header is transparent over the hero and solid once the hero has scrolled past. */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!header || !hero) return;
  const io = new IntersectionObserver(
    ([entry]) => header.classList.toggle('is-over-hero', entry.isIntersecting),
    { rootMargin: `-${header.offsetHeight}px 0px 0px 0px` },
  );
  io.observe(hero);
}

/** Fade-up for content as it enters. Elements already on screen are left alone. */
function initReveals() {
  const items = qa('[data-reveal]');
  const fold = window.innerHeight;
  const below = items.filter((el) => el.getBoundingClientRect().top > fold * 0.92);

  // Stagger siblings that share a parent (card rows, tiles).
  for (const el of below) {
    const siblings = el.parentElement ? qa(':scope > [data-reveal]', el.parentElement) : [];
    const i = siblings.indexOf(el);
    if (i > 0) el.style.setProperty('--d', `${Math.min(i, 4) * 0.08}s`);
    el.classList.add('pre');
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  below.forEach((el) => io.observe(el));
}

/**
 * Before / healed slider and its filter pills. Works on touch and keyboard.
 * Filters crossfade between image pairs (CSS) and glide the handle back to the
 * middle; the first time the slider scrolls into view it sweeps once to show
 * it can be dragged. Any drag cancels the animation immediately.
 */
function initCompare(compare: HTMLElement) {
  const range = compare.querySelector<HTMLInputElement>('[data-compare-range]');
  const caption = compare.querySelector<HTMLElement>('[data-compare-caption]');
  if (!range) return;

  let pos = Number(range.value);
  let frame = 0;
  const render = (v: number) => {
    pos = v;
    range.value = String(Math.round(v));
    compare.style.setProperty('--pos', `${v}%`);
  };
  const stop = () => cancelAnimationFrame(frame);
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /** Animate the handle through the given stops, in percent. */
  const glide = (stops: number[], ms: number) => {
    stop();
    if (reduceMotion()) return render(stops[stops.length - 1]);
    const path = [pos, ...stops];
    const seg = ms / (path.length - 1);
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / seg, path.length - 1);
      const i = Math.min(Math.floor(t), path.length - 2);
      render(path[i] + (path[i + 1] - path[i]) * ease(t - i));
      if (t < path.length - 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  };

  range.addEventListener('input', () => {
    stop();
    render(Number(range.value));
  });
  range.addEventListener('pointerdown', stop);
  render(pos);

  // One sweep the first time the slider is mostly on screen.
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      setTimeout(() => glide([28, 72, 50], 2200), 350);
    },
    { threshold: 0.6 },
  );
  io.observe(compare);

  const sets = qa('[data-compare-set]', compare);
  const pills = qa<HTMLButtonElement>('[data-filter]', compare.closest('[data-compare-group]') ?? compare);
  for (const pill of pills) {
    pill.setAttribute('aria-pressed', String(pill.classList.contains('is-active')));
    pill.addEventListener('click', () => {
      for (const p of pills) {
        p.classList.toggle('is-active', p === pill);
        p.setAttribute('aria-pressed', String(p === pill));
      }
      const key = pill.dataset.filter;
      for (const set of sets) set.classList.toggle('is-active', set.dataset.compareSet === key);
      if (caption) caption.textContent = `${key}`;
      glide([50], 600);
    });
  }
}
