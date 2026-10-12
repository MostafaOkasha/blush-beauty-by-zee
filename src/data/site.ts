// Single source for links and service data used on the homepage.
// Prices are a dated snapshot from Square screenshots (manuscript §5) and must
// be checked against live Square before launch.

export const SQUARE_BOOKING_URL =
  'https://book.squareup.com/appointments/lp3vdeg9qujfqs/location/LSSND4XM2G5RK/services';
export const INSTAGRAM_URL = 'https://www.instagram.com/blushbeautybyzee/';

export interface Service {
  name: string;
  blurb: string;
  price: string;
  href: string;
}

export const lipServices: Service[] = [
  {
    name: 'Lip Blush',
    blurb: 'A soft-looking enhancement to natural lip color and definition.',
    price: '$350',
    href: '/services/lip-blush',
  },
  {
    name: 'Lip Neutralization',
    blurb: 'A specialized pigment approach for selected darker or uneven lip tones.',
    price: '$350',
    href: '/services/lip-neutralization',
  },
  {
    name: 'Lip Ombré',
    blurb: 'A graduated color effect for added dimension.',
    price: '$450',
    href: '/services/lip-ombre',
  },
];

export const skinServices: Service[] = [
  {
    name: 'Stretch Mark Revision',
    blurb: 'Inkless treatments intended to improve the appearance or texture of stretch marks.',
    price: 'From $200',
    href: '/services/stretch-mark-revision',
  },
  {
    name: 'Scar Camouflage',
    blurb: 'Hypopigmented, hyperpigmented and post-surgical scar services.',
    price: 'From $200',
    href: '/services/scar-camouflage',
  },
  {
    name: 'Vitiligo Camouflage',
    blurb: 'Camouflage tattooing for selected stable areas. It does not treat or cure vitiligo.',
    price: 'From $200',
    href: '/services/vitiligo-camouflage',
  },
  {
    name: 'Radiation Marker Camouflage',
    blurb: 'Discreet camouflage for small radiation tattoo markers.',
    price: '$200',
    href: '/services/radiation-marker-camouflage',
  },
];

export const featured = [...lipServices, ...skinServices];

// Answers from manuscript §25. Items marked verify still need Zheen's sign-off.
export const faqs = [
  {
    q: 'Which lip treatment should I explore?',
    a: 'Neutralization focuses on particular darker or uneven lip tones and may require a different pigment strategy and treatment plan. Lip blush generally focuses on color enhancement. We can help explain which approach is worth considering for your goals.',
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
    a: 'Lip treatments include a complimentary touch-up 6 to 8 weeks after your first session, once the colour has settled. Touch-ups booked after that window are $150.',
  },
  {
    q: 'Where are appointments held?',
    a: 'Blush Beauty by Zee is based in Orléans, Ottawa. Follow the location information in your booking confirmation and contact us if you need clarification.',
  },
];

// MOCK: demo values to show Zheen the finished layout. Every item here must be
// confirmed or replaced with her real details before launch (manuscript §77).
export const policy = {
  deposit: '$50 deposit to reserve your appointment, applied to your treatment total.',
  touchUp: 'Complimentary touch-up 6 to 8 weeks after your first lip session. Later touch-ups are $150.',
  consultation: '$25 for 30 minutes, applied to your treatment if you book within 30 days.',
  patchTest: '$35 for 15 minutes, recommended for sensitive skin or a history of reactions.',
  hours: 'By appointment, Tuesday to Saturday',
  email: 'blushbeautybyzee@gmail.com',
};

// MOCK: sample client quotes for the demo. Replace with real, approved reviews.
export const reviews = [
  {
    quote:
      "I'd been self-conscious about my darker lips for years. She explained every step, and the healed colour looks completely natural on me.",
    name: 'Amira K.',
    service: 'Lip Neutralization',
  },
  {
    quote:
      'She matched the colour so carefully. My scar is far less noticeable and I finally feel comfortable wearing tank tops again.',
    name: 'Danielle R.',
    service: 'Scar Camouflage',
  },
  {
    quote: 'Calm, spotless studio and zero pressure. My lip blush healed into exactly the soft rosy shade we planned.',
    name: 'Sophie L.',
    service: 'Lip Blush',
  },
];
