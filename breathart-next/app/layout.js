import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundLayers from '@/components/BackgroundLayers';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PaymentFloat from '@/components/PaymentFloat';

import ScrollTopButton from '@/components/ScrollTopButton';
import PopupForm from '@/components/PopupForm';
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema } from './schema';

export const viewport = {
  themeColor: '#0d1b2e',
};

export const metadata = {
  metadataBase: new URL('https://www.breathartstudio.com'),
  title: {
    default: 'BreathArt Photography Studio Dubai | Premium Photography & Videography',
    template: '%s | BreathArt Photography Studio Dubai',
  },
  description: 'Dubai\'s premier luxury photography studio specializing in newborn, wedding, corporate, and event photography. Cinematic visual storytelling with 12+ years of expertise. Book your session today.',
  keywords: ['photography studio Dubai', 'wedding photography Dubai', 'newborn photography Dubai', 'corporate photography UAE', 'event photography', 'videography Dubai', 'BreathArt', 'luxury photography', 'portrait studio', 'maternity photography'],
  authors: [{ name: 'BreathArt Photography Studio' }],
  creator: 'BreathArt Photography Studio',
  publisher: 'BreathArt Photography Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.breathartstudio.com/',
    languages: {
      'en-IN': 'https://www.breathartstudio.com/',
      'x-default': 'https://www.breathartstudio.com/',
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    yahoo: 'YOUR_YAHOO_VERIFICATION_CODE',
    other: {
      'msvalidate.01': ['YOUR_BING_VERIFICATION_CODE'],
    },
  },
  openGraph: {
    title: 'BreathArt Photography Studio Dubai | Premium Photography & Videography',
    description: 'Dubai\'s premier luxury photography studio specializing in newborn, wedding, corporate, and event photography. Cinematic visual storytelling with 12+ years of expertise.',
    url: 'https://www.breathartstudio.com/',
    siteName: 'BreathArt Photography Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/hero/hero_nature.png',
        width: 1200,
        height: 630,
        alt: 'BreathArt Photography Studio Dubai — Premium Photography & Videography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BreathArt Photography Studio Dubai | Premium Photography & Videography',
    description: 'Dubai\'s premier luxury photography studio specializing in newborn, wedding, corporate, and event photography with cinematic elegance.',
    images: ['/assets/hero/hero_nature.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/assets/logo/photography-logo.webp' },
      { url: '/app/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/app/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/app/institute.png',
    apple: '/app/apple-touch-icon.png',
  },
  manifest: '/app/site.webmanifest',
  other: {
    'msapplication-TileColor': '#0d1b2e',
    'msapplication-TileImage': '/app/mstile-150x150.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo/photography-logo.webp" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Great+Vibes&family=Indie+Flower&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome */}
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Global Structured Data */}
        <OrganizationSchema />
        <WebSiteSchema />
        <LocalBusinessSchema />
      </head>
      <body className="fade-in active">
        <BackgroundLayers />
        <Navbar />
        {children}
        <Footer />
        <PopupForm repeatDelay={90000} />
        <WhatsAppFloat />
        <PaymentFloat />
        <ScrollTopButton />
      </body>
    </html>
  );
}
