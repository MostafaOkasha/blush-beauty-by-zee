import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Desktop only (loaded on demand by home-motion.ts): the hero photo drifts slower than the page. */
export function initHeroParallax() {
  gsap.registerPlugin(ScrollTrigger);
  const hero = document.querySelector('[data-hero]');
  const img = hero?.querySelector('.hero__media');
  if (!hero || !img) return;
  gsap.to(img, {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
}
