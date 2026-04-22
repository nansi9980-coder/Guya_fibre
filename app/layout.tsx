import type { Metadata } from 'next'
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/i18n/context'
import { ThemeCustomProvider } from '@/lib/theme-custom'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://guyafibre.com'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'GUYA FIBRE | Entreprise de référence en fibre optique en Guyane française (FTTH / FTTO)',
    template: '%s | GUYA FIBRE - Réseaux fibre optique en Guyane',
  },
  description:
    'Entreprise de référence en Guyane française, GUYA FIBRE conçoit, déploie et maintient des réseaux fibre optique FTTH/FTTO à haute performance. De Cayenne aux zones les plus isolées, nos équipes assurent une connectivité durable pour particuliers, entreprises et collectivités.',
  keywords: [
    'fibre optique Guyane',
    'FTTH Guyane',
    'FTTO Guyane',
    'raccordement fibre',
    'maintenance réseau fibre',
    'déploiement fibre optique',
    'ingénierie télécom Guyane',
    'Saint-Laurent-du-Maroni',
    'Cayenne',
  ],
  authors: [{ name: 'GUYA FIBRE', url: 'https://guyafibre.com' }],
  creator: 'GUYA FIBRE',
  publisher: 'GUYA FIBRE',
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/icon', sizes: 'any' }],
    apple: [{ url: '/apple-icon', sizes: '180x180' }],
    shortcut: ['/icon'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'GUYA FIBRE',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: 'GUYA FIBRE | Fibre optique en Guyane (FTTH / FTTO)',
    description:
      'GUYA FIBRE, entreprise guyanaise experte, déploie et maintient des réseaux fibre optique FTTH/FTTO robustes et évolutifs, de Cayenne aux zones rurales, fluviales et forestières.',
    url: '/',
    siteName: 'GUYA FIBRE',
    images: [
      {
        url: `${siteUrl}/images/hero-bg.jpg`,
        width: 1200,
        height: 630,
        alt: 'GUYA FIBRE - Technicien en intervention fibre optique',
      },
      {
        url: `${siteUrl}/images/logo.jpg`,
        width: 1200,
        height: 630,
        alt: 'GUYA FIBRE Logo',
      },
    ],
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GUYA FIBRE | Fibre optique en Guyane',
    description:
      'GUYA FIBRE accompagne toute la Guyane française avec des solutions FTTH/FTTO premium : ingénierie, déploiement, raccordement et maintenance.',
    images: ['/images/hero-bg.jpg'],
    creator: '@guyafibre',
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon" />
        <link rel="shortcut icon" href="/icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'GUYA FIBRE',
              description:
                'Entreprise guyanaise experte en ingénierie et déploiement fibre optique, GUYA FIBRE accompagne durablement les particuliers, entreprises et collectivités, de Cayenne aux zones isolées de l’intérieur.',
              url: siteUrl,
              telephone: '+594 694435484',
              email: 'contact@guyafibre.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '12 Rue des Palmiers',
                addressLocality: 'Saint-Laurent-du-Maroni',
                postalCode: '97320',
                addressCountry: 'GF',
                addressRegion: 'Guyane française',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 5.5026,
                longitude: -54.0333,
              },
              openingHours: 'Mo-Fr 08:00-18:00, Sa 08:00-12:00',
              areaServed: 'Guyane française',
              sameAs: ['https://wa.me/594694435484'],
              image: `${siteUrl}/images/logo.jpg`,
              logo: `${siteUrl}/images/logo.jpg`,
              priceRange: '$$',
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeCustomProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ThemeCustomProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Toaster />
      </body>
    </html>
  )
}
