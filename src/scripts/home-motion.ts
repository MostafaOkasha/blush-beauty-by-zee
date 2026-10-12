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
  initCompare();
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

/** Before / healed slider and its filter pills. Works on touch and keyboard. */
function initCompare() {
  const compare = document.querySelector<HTMLElement>('[data-compare]');
  const range = compare?.querySelector<HTMLInputElement>('[data-compare-range]');
  const caption = compare?.querySelector<HTMLElement>('[data-compare-caption]');
  if (!compare || !range) return;

  const set = () => compare.style.setProperty('--pos', `${range.value}%`);
  range.addEventListener('input', set);
  set();

  const pills = qa<HTMLButtonElement>('[data-filter]');
  for (const pill of pills) {
    pill.setAttribute('aria-pressed', String(pill.classList.contains('is-active')));
    pill.addEventListener('click', () => {
      for (const p of pills) {
        p.classList.toggle('is-active', p === pill);
        p.setAttribute('aria-pressed', String(p === pill));
      }
      if (caption) caption.textContent = `${pill.dataset.filter}`;
    });
  }
}
