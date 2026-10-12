// Treatment-page content, from manuscript §8–§15. Prices and durations are the
// Square snapshot (§5); anything marked MOCK is a demo value for Zheen to confirm.
import type { ImageMetadata } from 'astro';
import blushHero from '../assets/chat_gpt_images/H05-lip-portrait.png';
import neutralHero from '../assets/chat_gpt_images/L03-deep-skin-lips.png';
import ombreHero from '../assets/chat_gpt_images/H01-lip-macro.png';
import stretchHero from '../assets/chat_gpt_images/S02-stretch-marks-arm.png';
import scarHero from '../assets/chat_gpt_images/S06-scar-arm.png';
import vitiligoHero from '../assets/chat_gpt_images/S08-vitiligo-hand.png';
import radiationHero from '../assets/chat_gpt_images/H13-shoulder-skin.png';
import blushBefore from '../assets/chat_gpt_images/R11-blush-before.png';
import blushHealed from '../assets/chat_gpt_images/R11-blush-healed.png';
import neutralBefore from '../assets/chat_gpt_images/R12-neutralization-before.png';
import neutralHealed from '../assets/chat_gpt_images/R12-neutralization-healed.png';
import ombreBefore from '../assets/chat_gpt_images/R13-ombre-before.png';
import ombreHealed from '../assets/chat_gpt_images/R13-ombre-healed.png';
import scarBefore from '../assets/chat_gpt_images/R18-scar-before.png';
import scarHealed from '../assets/chat_gpt_images/R18-scar-healed.png';
import { policy } from './site';

export interface ComparePair {
  key: string;
  brief: string;
  before: ImageMetadata;
  after: ImageMetadata;
  /** MOCK case details shown under the slider. */
  sessions: string;
  stage: string;
}

export const pairs = {
  blush: { key: 'Lip Blush', brief: 'R11', before: blushBefore, after: blushHealed, sessions: '1 session + touch-up', stage: 'Healed, 8 weeks' },
  neutral: { key: 'Lip Neutralization', brief: 'R12', before: neutralBefore, after: neutralHealed, sessions: '2 sessions', stage: 'Healed, 10 weeks' },
  ombre: { key: 'Lip Ombré', brief: 'R13', before: ombreBefore, after: ombreHealed, sessions: '1 session + touch-up', stage: 'Healed, 8 weeks' },
  scar: { key: 'Scar Camouflage', brief: 'R18', before: scarBefore, after: scarHealed, sessions: '2 sessions', stage: 'Healed, 12 weeks' },
} satisfies Record<string, ComparePair>;

export interface ServicePage {
  slug: string;
  name: string;
  category: 'Lip Artistry' | 'Skin Revision & Camouflage';
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  h1em: string;
  lead: string;
  price: string;
  duration: string;
  hero: ImageMetadata;
  sections: { heading: string; body: string }[];
  pricing?: { label: string; price: string; note: string }[];
  questions?: string[];
  pair?: ComparePair;
  faqs: { q: string; a: string }[];
  related: string[];
}

const lipProcess = 'lip';

export const steps: Record<string, { title: string; text: string }[]> = {
  [lipProcess]: [
    { title: 'Consultation', text: 'Talk through your natural lip tone, goals and any health considerations.' },
    { title: 'Shade & shape', text: 'We map the shape and test pigment options against your skin.' },
    { title: 'Treatment', text: 'Numbing, then careful layering of pigment over about three hours.' },
    { title: 'Healing', text: 'Colour looks bolder at first, then softens over 4 to 6 weeks.' },
    { title: 'Touch-up', text: 'A follow-up at 6 to 8 weeks refines colour and evens any light spots.' },
  ],
  skin: [
    { title: 'Consultation', text: 'We assess the area, its history and whether it has fully matured.' },
    { title: 'Patch test', text: 'A small test area checks how your skin responds before treating.' },
    { title: 'Treatment', text: 'Precise work on the marked area, at a pace that suits your skin.' },
    { title: 'Healing', text: 'The area settles over several weeks; follow the aftercare closely.' },
    { title: 'Review', text: 'A follow-up decides whether another session would help.' },
  ],
};

const touchUp = { label: 'Touch-up', price: 'Included', note: policy.touchUp };
const deposit = { label: 'Deposit', price: '$50', note: policy.deposit };

export const services: ServicePage[] = [
  {
    slug: 'lip-blush',
    name: 'Lip Blush',
    category: 'Lip Artistry',
    title: 'Lip Blush in Ottawa | Blush Beauty by Zee',
    description:
      'Explore lip blush in Orléans, Ottawa. Learn about the technique, pricing, healing considerations, documented results and booking.',
    eyebrow: 'Lip artistry',
    h1: 'Lip blush,',
    h1em: 'thoughtfully done.',
    lead: 'A cosmetic tattoo treatment intended to enhance the appearance of natural lip color and definition with carefully selected pigment.',
    price: '$350',
    duration: 'About 3 hours',
    hero: blushHero,
    pair: pairs.blush,
    sections: [
      {
        heading: 'What is lip blush?',
        body: 'Lip blush is a form of cosmetic lip pigmentation. Rather than applying lipstick to the surface, a trained artist uses a cosmetic tattoo technique to create a lasting change in the appearance of lip color. The result, healing and longevity vary from person to person.',
      },
      {
        heading: 'Designed for a personal result.',
        body: 'Your existing lip tone, skin characteristics and color preferences shape the conversation. A photograph or digital swatch can help communicate a preference, but cannot guarantee how a pigment will heal.',
      },
    ],
    pricing: [{ label: 'Lip Blush', price: '$350', note: 'About 3 hours, including shape mapping and numbing.' }, touchUp, deposit],
    faqs: [
      {
        q: 'How is lip blush different from lipstick?',
        a: 'Lipstick sits on the surface and wipes off. Lip blush places pigment in the skin, so a soft tint stays for roughly two to three years before it fades.',
      },
      {
        q: 'What should I expect as it heals?',
        a: 'The colour looks brighter for the first week, may flake, then can look patchy before it settles. The final shade usually shows at around 4 to 6 weeks.',
      },
      {
        q: 'When might another session be needed?',
        a: 'Most clients use the complimentary touch-up at 6 to 8 weeks. A colour refresh is typically considered every one to two years.',
      },
    ],
    related: ['lip-neutralization', 'lip-ombre'],
  },
  {
    slug: 'lip-neutralization',
    name: 'Lip Neutralization',
    category: 'Lip Artistry',
    title: 'Dark Lip Neutralization in Ottawa | Blush Beauty by Zee',
    description:
      'Dark lip neutralization in Orléans, Ottawa: how it differs from lip blush, what to expect over time, pricing and booking.',
    eyebrow: 'Lip artistry',
    h1: 'A considered approach to',
    h1em: 'uneven lip tones.',
    lead: 'Lip neutralization is a specialized cosmetic pigmentation technique used for selected darker or uneven lip tones. Treatment planning, the number of sessions and the healed appearance vary.',
    price: '$350',
    duration: 'About 3 hours',
    hero: neutralHero,
    pair: pairs.neutral,
    sections: [
      {
        heading: 'What does lip neutralization mean?',
        body: 'Neutralization uses carefully selected cosmetic pigments and technique to address the appearance of certain natural lip pigment differences. It is not a promise that every lip tone can or should be made pink, and more than one stage may be planned.',
      },
      {
        heading: 'Lip blush and neutralization are not interchangeable.',
        body: "Lip blush is generally a color-enhancement technique. Neutralization pays additional attention to the lip's existing pigmentation and how colors may behave during healing. A consultation helps decide which fits your goals.",
      },
      {
        heading: 'Understanding darker lip tones.',
        body: 'Darker natural lip tones are normal. Wanting to change their appearance is a cosmetic preference, not a condition that needs treatment. We will talk through the look you want and the limits of cosmetic pigments.',
      },
    ],
    pricing: [
      { label: 'Lip Neutralization', price: '$350', note: 'About 3 hours per session.' },
      { label: 'Double Combo', price: '$500', note: 'Neutralization followed by lip blush or ombré, planned at consultation.' },
      touchUp,
    ],
    faqs: [
      {
        q: 'How many sessions will I need?',
        a: 'Many darker lips need two sessions: one to neutralize, and one to add the final colour. We will suggest a plan after seeing your lips.',
      },
      {
        q: 'Will my lips turn pink?',
        a: 'The goal is a more even, softer tone that suits your skin, not a bright pink. Healed colour depends on your natural pigment.',
      },
      {
        q: 'Is it suitable for very dark lips?',
        a: 'Often, yes. Neutralization is designed for deeper lip tones, but suitability is checked individually at consultation.',
      },
    ],
    related: ['lip-blush', 'lip-ombre'],
  },
  {
    slug: 'lip-ombre',
    name: 'Lip Ombré',
    category: 'Lip Artistry',
    title: 'Lip Ombré in Ottawa | Blush Beauty by Zee',
    description: 'Lip ombré in Orléans, Ottawa: a graduated, dimensional lip colour. Pricing, healing and booking.',
    eyebrow: 'Lip artistry',
    h1: 'Dimension',
    h1em: 'through color.',
    lead: 'Lip ombré is a cosmetic tattoo style that uses changes in pigment intensity to create a graduated, dimensional look.',
    price: '$450',
    duration: 'About 3 hours',
    hero: ombreHero,
    pair: pairs.ombre,
    sections: [
      {
        heading: 'What makes ombré different?',
        body: 'Unlike a more uniform wash of color, an ombré effect intentionally uses a gradient: deeper at the edges, softer toward the centre. The appearance depends on the technique, natural lip tone and healing.',
      },
      {
        heading: 'Explore the finish.',
        body: "See our healed work before choosing. Illustrative swatches are visual references only; they are not promises of the final pigment color.",
      },
    ],
    pricing: [{ label: 'Lip Ombré', price: '$450', note: 'About 3 hours, including shape mapping and numbing.' }, touchUp, deposit],
    faqs: [
      {
        q: 'Is ombré more noticeable than lip blush?',
        a: 'It gives more definition at the lip line, so it reads a little more like a soft lip liner. The centre stays light and natural.',
      },
      {
        q: 'How long does ombré last?',
        a: 'Usually two to three years, depending on your skin, sun exposure and aftercare.',
      },
    ],
    related: ['lip-blush', 'lip-neutralization'],
  },
  {
    slug: 'stretch-mark-revision',
    name: 'Stretch Mark Revision',
    category: 'Skin Revision & Camouflage',
    title: 'Inkless Stretch Mark Revision in Ottawa | Blush Beauty by Zee',
    description:
      'Inkless stretch mark revision in Orléans, Ottawa. Area pricing, what to expect and how to book a consultation.',
    eyebrow: 'Skin revision',
    h1: 'Understand your',
    h1em: 'stretch mark options.',
    lead: 'Inkless stretch mark revision is a non-pigment treatment intended to improve the appearance or texture of stretch marks. Suitability, technique and results are discussed individually.',
    price: 'From $200',
    duration: '30 minutes to 4 hours',
    hero: stretchHero,
    sections: [
      {
        heading: 'What are stretch marks?',
        body: 'Stretch marks are changes in the appearance and structure of skin that can develop as the skin stretches. They vary in color, texture, age and location. No cosmetic treatment should be presented as certain to erase them.',
      },
      {
        heading: "What does 'inkless' mean here?",
        body: 'Inkless means the treatment does not use tattoo pigment. It works on the texture of the mark rather than covering it with colour.',
      },
      {
        heading: 'What can influence results?',
        body: 'Skin characteristics, the treatment area and how long ago the marks developed all matter. Most people need a series of sessions spaced several weeks apart.',
      },
    ],
    pricing: [
      { label: 'Small area', price: '$200', note: '30 minutes' },
      { label: 'Medium area', price: '$450', note: '2 hours' },
      { label: 'Large area', price: '$700', note: '4 hours' },
    ],
    faqs: [
      {
        q: 'Can a cosmetic treatment completely remove stretch marks?',
        a: 'No outcome should be guaranteed. Improvement in appearance is different from complete removal, and a consultation should cover realistic expectations.',
      },
      {
        q: 'How many sessions will I need?',
        a: 'Most areas benefit from three to five sessions, about six to eight weeks apart.',
      },
    ],
    related: ['scar-camouflage', 'vitiligo-camouflage'],
  },
  {
    slug: 'scar-camouflage',
    name: 'Scar Camouflage',
    category: 'Skin Revision & Camouflage',
    title: 'Scar Camouflage & Revision in Ottawa | Blush Beauty by Zee',
    description:
      'Scar camouflage in Orléans, Ottawa: hypopigmented, hyperpigmented and post-surgical scars. Pricing and consultation.',
    eyebrow: 'Scar-related services',
    h1: 'Different scars.',
    h1em: 'Different considerations.',
    lead: 'Scars vary in color, texture, age, location and history. Explore the scar-related services we offer and the questions to discuss before booking.',
    price: 'From $200',
    duration: '30 minutes to 2 hours',
    hero: scarHero,
    pair: pairs.scar,
    sections: [
      {
        heading: 'Camouflage is not the same as removing a scar.',
        body: 'Camouflage describes techniques intended to change how a mark appears. Revision approaches have different techniques and goals. Neither should be taken as a promise that scar tissue will disappear.',
      },
      {
        heading: 'When should you book a consultation?',
        body: "If you're unsure which service applies, or your scar has a complex history, start with a consultation rather than choosing a treatment from a photograph alone.",
      },
    ],
    pricing: [
      { label: 'Lighter scars (hypopigmented)', price: '$200', note: '30 minutes' },
      { label: 'Darker scars (hyperpigmented)', price: '$200', note: '1 hour 15 minutes' },
      { label: 'Post-surgical scars', price: '$200', note: '30 minutes' },
      { label: 'Radiation markers', price: '$200', note: '2 hours' },
    ],
    faqs: [
      {
        q: 'How old does a scar need to be?',
        a: 'Most scars should be fully matured, usually at least 12 months old, flat and no longer pink or red.',
      },
      {
        q: 'Will the scar disappear?',
        a: 'Camouflage aims to make a scar much less noticeable by matching colour. Texture may still be visible up close.',
      },
    ],
    related: ['radiation-marker-camouflage', 'stretch-mark-revision'],
  },
  {
    slug: 'vitiligo-camouflage',
    name: 'Vitiligo Camouflage',
    category: 'Skin Revision & Camouflage',
    title: 'Vitiligo Camouflage Tattoo in Ottawa | Blush Beauty by Zee',
    description:
      'Vitiligo camouflage tattooing in Orléans, Ottawa, for selected stable areas. Suitability, pricing and consultation.',
    eyebrow: 'Specialized camouflage',
    h1: 'Vitiligo camouflage,',
    h1em: 'with careful consideration.',
    lead: 'Pigment camouflage may be considered for selected stable areas of depigmentation. Suitability, color matching and long-term appearance need individual assessment.',
    price: 'From $200',
    duration: 'About 1 hour 30 minutes',
    hero: vitiligoHero,
    sections: [
      {
        heading: 'What the service aims to do.',
        body: 'Cosmetic camouflage uses pigment to reduce visible contrast between selected depigmented areas and the surrounding skin. It is not a treatment or cure for vitiligo.',
      },
      {
        heading: 'Why stability matters.',
        body: 'Vitiligo can change over time, while tattooed pigment does not change the same way as surrounding skin. Tanning and other skin-tone changes can affect the match, so the area should be stable before treatment.',
      },
    ],
    questions: [
      'Has the area remained stable for at least a year?',
      'Are there medical considerations to review first?',
      'How will pigment matching be tested?',
      'How might seasonal tanning affect the match?',
    ],
    pricing: [{ label: 'Vitiligo Camouflage', price: 'From $200', note: 'About 1 hour 30 minutes; final price depends on area size.' }, deposit],
    faqs: [
      {
        q: 'Does camouflage treat vitiligo?',
        a: 'No. It changes how selected areas look; it does not affect the condition itself.',
      },
      {
        q: 'Is every area suitable?',
        a: 'No. Areas that are still spreading or changing are usually not treated. A patch test and consultation come first.',
      },
    ],
    related: ['scar-camouflage', 'stretch-mark-revision'],
  },
  {
    slug: 'radiation-marker-camouflage',
    name: 'Radiation Marker Camouflage',
    category: 'Skin Revision & Camouflage',
    title: 'Radiation Marker Camouflage in Ottawa | Blush Beauty by Zee',
    description: 'Discreet camouflage for small radiation tattoo markers in Orléans, Ottawa.',
    eyebrow: 'Specialized camouflage',
    h1: 'A quiet step,',
    h1em: 'after treatment.',
    lead: 'A specialized cosmetic tattoo option for selected radiation-treatment markings. It does not reverse radiation treatment or change medical outcomes.',
    price: '$200',
    duration: 'About 2 hours',
    hero: radiationHero,
    sections: [
      {
        heading: 'What are radiation markers?',
        body: 'Small permanent dots are often tattooed during radiation therapy to line up treatment. Years later, many people would rather not see them every day.',
      },
      {
        heading: 'How camouflage helps.',
        body: 'Pigment is matched to your skin tone so each dot blends in. Medical clearance may be needed first, and eligibility is confirmed at consultation.',
      },
    ],
    pricing: [{ label: 'Radiation Marker Camouflage', price: '$200', note: 'About 2 hours, for all markers in one session.' }, deposit],
    faqs: [
      {
        q: 'Do I need my doctor’s approval?',
        a: 'If you are still in treatment or follow-up, check with your care team first. We may ask for medical clearance.',
      },
      {
        q: 'Will the dots be completely hidden?',
        a: 'Most blend in closely. Some may still be visible up close, especially on very fair or very deep skin.',
      },
    ],
    related: ['scar-camouflage', 'vitiligo-camouflage'],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
