import { BreadcrumbSchema, WebPageSchema, ServiceSchema } from '../../schema';

export const metadata = {
  title: 'Luxury Wedding & Pre-Wedding Photography Dubai — BreathArt',
  description: 'Capturing your romantic milestones, grand wedding day promises, and pre-wedding romance with high-end, cinematic fine-art storytelling in Dubai.',
  alternates: {
    canonical: '/services/wedding',
  },
  openGraph: {
    title: 'Luxury Wedding & Pre-Wedding Photography Dubai — BreathArt',
    description: 'Capturing your romantic milestones, grand wedding day promises, and pre-wedding romance with high-end, cinematic fine-art storytelling in Dubai.',
    url: 'https://breathart.ae/services/wedding',
    images: [
      {
        url: '/assets/gallery/wedding/pexels-habib-hosseini-3673463.webp',
        width: 1200,
        height: 630,
        alt: 'BreathArt Wedding Photography Dubai',
      },
    ],
  },
  twitter: {
    title: 'Luxury Wedding & Pre-Wedding Photography Dubai — BreathArt',
    description: 'Capturing your romantic milestones, grand wedding day promises, and pre-wedding romance with high-end, cinematic fine-art storytelling in Dubai.',
    images: ['/assets/gallery/wedding/pexels-habib-hosseini-3673463.webp'],
  },
};

export default function WeddingLayout({ children }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Wedding & Romance', url: '/services/wedding' },
        ]}
      />
      <ServiceSchema
        services={[
          { name: 'Wedding Photography Dubai', description: 'Full-day comprehensive coverage of your luxury vows, candid emotion, and grand receptions.', url: '/services/wedding' },
          { name: 'Pre-Wedding Photography Dubai', description: 'Creative romantic engagement sessions set in breathtaking, iconic locations.', url: '/services/wedding' },
        ]}
      />
      <WebPageSchema
        name="Luxury Wedding & Pre-Wedding Photography Dubai"
        description="Explore BreathArt's fine-art wedding and pre-wedding photography in Dubai."
        url="/services/wedding"
      />
      {children}
    </>
  );
}
