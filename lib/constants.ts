// Company constants
export const COMPANY = {
  name: 'GUYA FIBRE',
  description: 'Expert en déploiement et maintenance de réseaux fibre optique en Guyane française',
  tagline: 'Connecter la Guyane d\'aujourd\'hui et de demain',
} as const

// Contact information
export const CONTACT = {
  phone: '+594 694435484',
  phone_display: ' +594 06 94 43 54 84',
  email: 'contact@guyafibre.com',
  address: '12 Rue des Palmiers',
  city: 'Saint-Laurent-du-Maroni',
  postal_code: '97320',
  country: 'Guyane française',
  latitude: 5.5026,
  longitude: -54.0333,
  whatsapp_url: 'https://wa.me/594694435484?text=Bonjour%2C%20je%20souhaite%20avoir%20des%20informations%20sur%20vos%20services%20GUYA%20FIBRE.',
} as const

// SEO constants
export const SEO = {
  base_url: 'https://guyafibre.com',
  title: 'GUYA FIBRE — Experts Fibre Optique en Guyane',
  description: 'Entreprise guyanaise spécialisée dans le déploiement, la maintenance et les études de réseaux fibre optique.',
  keywords: 'fibre optique, FTTH, FTTO, Guyane, déploiement fibre, maintenance réseau',
  locale: 'fr_FR',
  og_image: 'https://guyafibre.com/images/hero-bg.jpg',
} as const

// Business hours
export const BUSINESS_HOURS = {
  monday_to_friday: '08:00-18:00',
  saturday: '08:00-12:00',
  sunday: 'Fermé',
  opening_hours_schema: 'Mo-Fr 08:00-18:00, Sa 08:00-12:00',
} as const

// Brand colors (should match CSS variables)
export const BRAND_COLORS = {
  cyan: 'oklch(0.65 0.13 180)',
  cyan_dark: 'oklch(0.50 0.13 180)',
  orange: 'oklch(0.75 0.16 65)',
  dark: 'oklch(0.13 0.025 250)',
  dark_mid: 'oklch(0.18 0.025 250)',
} as const

// Links
export const LINKS = {
  home: '/',
  about: '/apropos',
  services: '/services',
  offers: '/offres',
  projects: '/projets',
  contact: '/contact',
  quote: '/devis',
  localisation: '/localisation',
  legal: '/mentions-legales',
  privacy: '/politique-confidentialite',
  terms: '/conditions-utilisation',
} as const
