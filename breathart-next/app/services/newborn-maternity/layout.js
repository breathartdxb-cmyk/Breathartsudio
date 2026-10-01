import { BreadcrumbSchema, WebPageSchema, ServiceSchema } from '../../schema';
import Script from 'next/script';

export const metadata = {
  title: 'Newborn & Maternity Photography in Dubai — BreathArt',
  description: 'Capture life\'s most precious moments with professional maternity and newborn photography in Dubai.',
  alternates: {
    canonical: '/services/newborn-maternity',
  },
  openGraph: {
    title: 'Newborn & Maternity Photography in Dubai — BreathArt',
    description: 'Capture life\'s most precious moments with professional maternity and newborn photography in Dubai.',
    url: 'https://breathart.ae/services/newborn-maternity',
    images: [
      {
        url: '/assets/gallery/newborn/BK-108_LORRIE_890_.jpg.webp',
        width: 1200,
        height: 630,
        alt: 'BreathArt Newborn & Maternity Photography Dubai',
      },
    ],
  },
  twitter: {
    title: 'Newborn & Maternity Photography in Dubai — BreathArt',
    description: 'Capture life\'s most precious moments with professional maternity and newborn photography in Dubai.',
    images: ['/assets/gallery/newborn/BK-108_LORRIE_890_.jpg.webp'],
  },
};

export default function NewbornMaternityLayout({ children }) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm-newborn" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PJ7Q6MX4');
        `}
      </Script>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-PJ7Q6MX4"
          height="0" 
          width="0" 
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Newborn & Maternity', url: '/services/newborn-maternity' },
        ]}
      />
      <ServiceSchema
        services={[
          { name: 'Newborn Photography Dubai', description: 'Safety-certified cozy studio sessions capturing the pure innocence of your baby\'s first days with luxury props.', url: '/services/newborn-maternity' },
          { name: 'Maternity Photography Dubai', description: 'Elegant pregnancy portraiture celebrating the raw beauty, glow, and strength of motherhood.', url: '/services/newborn-maternity' },
        ]}
      />
      <WebPageSchema
        name="Newborn & Maternity Photography in Dubai"
        description="Capture life's most precious moments with professional maternity and newborn photography in Dubai."
        url="/services/newborn-maternity"
      />
      {children}
    </>
  );
}
