import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector(sel) as T | null;
const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll(sel)) as T[];

/**
 * Homepage motion (manuscript C01 + H02). Everything here is enhancement:
 * the page is complete without it, and nothing runs with reduced motion.
 */
export function initHomeMotion() {
  const header = q('[data-header]');
  const intro = q('[data-intro]');
  const mm = gsap.matchMedia();

  // Header sits over the dark hero, then becomes the solid ivory bar.
  const setHeader = (over: boolean) => header?.classList.toggle('is-over-hero', over);

  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      reduce: '(prefers-reduced-motion: reduce)',
      desktop: '(min-width: 760px)',
    },
    (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };

      if (!motion || !intro) {
        document.documentElement.classList.remove('motion');
        const hero = q('[data-hero]');
        const st = ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: () => `bottom top+=${header?.offsetHeight ?? 64}`,
          onToggle: (self) => setHeader(self.isActive),
        });
        setHeader(st.isActive || window.scrollY < 10);
        return;
      }

      document.documentElement.classList.add('motion');
      introScene(intro, desktop, setHeader);
      sectionMotion();
    },
  );
}

function introScene(intro: HTMLElement, desktop: boolean, setHeader: (over: boolean) => void) {
  const zoom = q('[data-hero-zoom]', intro);
  const halfL = q('[data-hero-half="l"]', intro);
  const halfR = q('[data-hero-half="r"]', intro);
  const veil = q('.hero__veil', intro);
  const accent = q<SVGPathElement>('[data-hero-accent] path', intro);
  const copy = q('[data-hero-copy]', intro);
  const note = q('[data-hero-copy-note]', intro);
  const scrollHint = q('[data-hero-scroll]', intro);
  const lines = qa('.hero__title .line > span', intro);
  const head = q('.practice__head', intro);
  const lip = q('[data-portal="lip"]', intro);
  const skin = q('[data-portal="skin"]', intro);
  const bodies = qa('.portal__body', intro);

  // Short opening: the headline rises line by line. Booking stays clickable throughout.
  gsap.from(lines, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: 0.1 });
  gsap.from([q('.hero__lead', intro), q('.hero__copy .cta-row', intro)], {
    autoAlpha: 0,
    y: 16,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.08,
    delay: 0.45,
  });

  // The two portals start pressed together as one composition, then separate.
  const gap = desktop ? 12 : 8;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: intro,
      start: 'top top',
      end: desktop ? '+=220%' : '+=170%',
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => setHeader(self.progress < 0.5),
      onLeaveBack: () => setHeader(true),
    },
  });
  setHeader(true);

  tl.set(accent, { strokeDasharray: 1, strokeDashoffset: 1 }, 0)
    .set(head, { autoAlpha: 0, y: 30 }, 0)
    .set(bodies, { autoAlpha: 0, y: 20 }, 0)
    .set(lip, desktop ? { x: gap, scale: 0.88 } : { y: gap, scale: 0.92 }, 0)
    .set(skin, desktop ? { x: -gap, scale: 0.88 } : { y: -gap, scale: 0.92 }, 0)

    // Phase 1–2: camera dolly backward from the macro detail.
    .fromTo(zoom, { scale: desktop ? 1.55 : 1.4 }, { scale: 1, duration: 4, ease: 'power1.out' }, 0)
    .to(accent, { strokeDashoffset: 0, duration: 4 }, 0)
    .to(scrollHint, { autoAlpha: 0, duration: 0.6 }, 0)

    // Copy leaves only after it has had time to be read.
    .to([copy, note, accent], { autoAlpha: 0, y: -40, duration: 1.4, ease: 'power2.in' }, 4)

    // Phase 3: the composition splits into two planes that travel sideways.
    .to(veil, { autoAlpha: 0, duration: 1 }, 5)
    .to(halfL, { xPercent: -52, duration: 3, ease: 'power2.inOut' }, 5.2)
    .to(halfR, { xPercent: 52, duration: 3, ease: 'power2.inOut' }, 5.2)

    // Phase 4: the planes resolve into the two specialty portals.
    .to(head, { autoAlpha: 1, y: 0, duration: 1.6, ease: 'power2.out' }, 6.6)
    .to([lip, skin], { x: 0, y: 0, scale: 1, duration: 2.4, ease: 'power2.inOut' }, 6.6)
    .to(bodies, { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.3, ease: 'power2.out' }, 7.8)
    .to({}, { duration: 1 }); // short hold so the cards settle before the page moves on
}

function sectionMotion() {
  // H03: kinetic statement, words come into focus and then stay still.
  const words = qa('[data-kinetic] .word');
  if (words.length) {
    gsap.fromTo(
      words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: '[data-kinetic]', start: 'top 85%', end: 'bottom 55%', scrub: true },
      },
    );
  }

  // Quiet reveals for lists and cards.
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) =>
      gsap.from(els, { autoAlpha: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });

  // H09: the editorial line grows from step to step.
  const line = q('[data-journey-line]');
  if (line) {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.journey__track', start: 'top 70%', end: 'bottom 70%', scrub: true },
      },
    );
  }
}
