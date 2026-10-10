// Single source for links and service data used on the homepage.
// Prices are a dated snapshot from Square screenshots (manuscript §5) and must
// be checked against live Square before launch.

export const SQUARE_BOOKING_URL =
  'https://book.squareup.com/appointments/lp3vdeg9qujfqs/location/LSSND4XM2G5RK/services';
export const INSTAGRAM_URL = 'https://www.instagram.com/blushbeautybyzee/';

export type Family = 'lip' | 'skin';

export interface FeaturedService {
  name: string;
  family: Family;
  blurb: string;
  price: string;
  href: string;
}

export const featured: FeaturedService[] = [
  {
    name: 'Lip Blush',
    family: 'lip',
    blurb: 'A soft-looking enhancement to natural lip color and definition.',
    price: '$350',
    href: '/services/lip-blush',
  },
  {
    name: 'Lip Neutralization',
    family: 'lip',
    blurb: 'A specialized pigment approach for selected darker or uneven lip tones.',
    price: '$350',
    href: '/services/lip-neutralization',
  },
  {
    name: 'Lip Ombré',
    family: 'lip',
    blurb: 'A graduated color effect for added dimension.',
    price: '$450',
    href: '/services/lip-ombre',
  },
  {
    name: 'Inkless Stretch Mark Revision',
    family: 'skin',
    blurb: 'Explore treatments intended to improve the appearance or texture of stretch marks.',
    price: 'From $200',
    href: '/services/stretch-mark-revision',
  },
  {
    name: 'Scar Camouflage',
    family: 'skin',
    blurb: 'Specialized services for different types of visible scars and markings.',
    price: 'From $200',
    href: '/services/scar-camouflage',
  },
  {
    name: 'Vitiligo Camouflage',
    family: 'skin',
    blurb: 'Camouflage tattooing for selected stable areas. It does not treat or cure vitiligo.',
    price: 'From $200',
    href: '/services/vitiligo-camouflage',
  },
];

export const journey = [
  ['Explore', 'Review services, examples, pricing and important considerations.'],
  ['Ask', 'Have questions? Contact Zheen or book a consultation when appropriate.'],
  ['Prepare', 'Read the preparation guidance for your chosen procedure.'],
  ['Treat', 'Follow the appointment and treatment process explained by Zheen.'],
  ['Heal & Follow Up', 'Use the appropriate aftercare guidance and review the applicable touch-up arrangements.'],
] as const;

// Answers from manuscript §25. Items marked verify still need Zheen's sign-off.
export const faqs = [
  {
    q: 'Which lip treatment should I explore?',
    a: 'Neutralization focuses on particular darker or uneven lip tones and may require a different pigment strategy and treatment plan. Lip blush generally focuses on color enhancement. Zheen can help explain which approach is worth considering for your goals.',
  },
  {
    q: 'Will lip blush work on dark skin or darker lips?',
    a: 'There is no single answer for everyone. Natural lip pigmentation, skin characteristics and the particular technique matter. Dark lip neutralization may be a topic to discuss. Review real healed examples and ask about suitability, limitations and risks.',
  },
  {
    q: 'Can a cosmetic treatment completely remove stretch marks?',
    a: 'No outcome should be guaranteed. Stretch marks vary, and improvement in appearance is different from complete removal. An individual discussion should cover realistic expectations.',
  },
  {
    q: 'Is a consultation required?',
    a: 'The listed consultation appointment is $25 for 30 minutes. A photograph may help explain your concern, but it cannot establish all aspects of suitability, so consider a consultation, especially when a scar has a complex history.',
  },
  {
    q: 'How do touch-ups work?',
    a: 'Some lip services advertise a complimentary touch-up during a specific time window. The exact rules are being confirmed with Zheen and will be published here.',
    verify: true,
  },
  {
    q: 'Where are appointments held?',
    a: 'Blush Beauty by Zee is based in Orléans, Ottawa. Follow the location information in your booking confirmation and contact Zheen if you need clarification.',
  },
];
