import Script from 'next/script';
import { BreadcrumbSchema, WebPageSchema, ServiceSchema } from '../schema';

const TITLE = 'Newborn Photography Dubai — Safe, Gentle Studio & Home Sessions | BreathArt';
const DESCRIPTION =
  'Book a newborn photoshoot in Dubai with BreathArt. Female team, trained newborn photographers, props & outfits included, studio or at-home sessions. Packages from AED 499.';
const OG_IMAGE = '/assets/services/newborn/newborn-and-maternity/8th.jpeg';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/newborn-photography-dubai' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/newborn-photography-dubai',
    images: [{ url: OG_IMAGE, width: 1600, height: 1066, alt: 'Newborn photography in Dubai by BreathArt' }],
  },
  twitter: { title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function NewbornLandingLayout({ children }) {
  return (
    <>
      {/* Google Tag Manager — same container as the main Newborn & Maternity page */}
      <Script id="gtm-newborn-landing" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PJ7Q6MX4');
        `}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PJ7Q6MX4"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Newborn Photography Dubai', url: '/newborn-photography-dubai' },
        ]}
      />
      <ServiceSchema
        services={[
          {
            name: 'Newborn Photography Dubai',
            description: 'Gentle, baby-safe newborn photoshoots in our Dubai studio or at your home, with props and outfits included.',
            url: '/newborn-photography-dubai',
          },
        ]}
      />
      <WebPageSchema name="Newborn Photography in Dubai" description={DESCRIPTION} url="/newborn-photography-dubai" />
      {children}
    </>
  );
}
