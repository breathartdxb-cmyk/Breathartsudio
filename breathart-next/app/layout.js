import './globals.css';
import { Inter, Outfit, Playfair_Display, Great_Vibes } from 'next/font/google';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundLayers from '@/components/BackgroundLayers';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema } from './schema';

// Lazy-load non-critical layout components (code-split into separate chunks)
const PopupForm = dynamic(() => import('@/components/PopupForm'));
const ScrollTopButton = dynamic(() => import('@/components/ScrollTopButton'));
const PaymentFloat = dynamic(() => import('@/components/PaymentFloat'));

// Self-hosted Google Fonts via next/font — eliminates render-blocking external CSS
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-outfit',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-great-vibes',
});

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
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${playfairDisplay.variable} ${greatVibes.variable}`}>
      <head>
        <link rel="icon" href="/assets/logo/photography-logo.webp" />
        {/* Font Awesome — deferred async loading on idle, zero render-blocking impact */}
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function l(){var el=document.createElement('link');el.rel='stylesheet';el.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';el.crossOrigin='anonymous';document.head.appendChild(el)}if(window.requestIdleCallback){window.requestIdleCallback(l)}else if(document.readyState==='complete'){l()}else{window.addEventListener('load',l)}})();`,
          }}
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
