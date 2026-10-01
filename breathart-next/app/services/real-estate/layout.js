import { BreadcrumbSchema, WebPageSchema, ServiceSchema } from '../../schema';

export const metadata = {
  title: 'Real Estate & Architectural Photography Dubai — BreathArt',
  description: 'High-end wide-angle and HDR architectural photography for commercial spaces, luxury properties, and real estate in Dubai.',
  alternates: {
    canonical: '/services/real-estate',
  },
  openGraph: {
    title: 'Real Estate & Architectural Photography Dubai — BreathArt',
    description: 'High-end wide-angle and HDR architectural photography for commercial spaces, luxury properties, and real estate in Dubai.',
    url: 'https://breathart.ae/services/real-estate',
    images: [
      {
        url: '/assets/gallery/corporate/compagnons-Uhfb85y_B-U-unsplash.jpg',
        width: 1200,
        height: 630,
        alt: 'BreathArt Real Estate Photography Dubai',
      },
    ],
  },
  twitter: {
    title: 'Real Estate & Architectural Photography Dubai — BreathArt',
    description: 'High-end wide-angle and HDR architectural photography for commercial spaces, luxury properties, and real estate in Dubai.',
    images: ['/assets/gallery/corporate/compagnons-Uhfb85y_B-U-unsplash.jpg'],
  },
};

export default function RealEstateLayout({ children }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Real Estate Showcase', url: '/services/real-estate' },
        ]}
      />
      <ServiceSchema
        services={[
          { name: 'Real Estate Photography Dubai', description: 'High-end wide-angle and HDR architectural photography for spaces and premium properties.', url: '/services/real-estate' },
        ]}
      />
      <WebPageSchema
        name="Real Estate Photography Dubai"
        description="Explore BreathArt's real estate, architectural, and spatial photography in Dubai."
        url="/services/real-estate"
      />
      {children}
    </>
  );
}
