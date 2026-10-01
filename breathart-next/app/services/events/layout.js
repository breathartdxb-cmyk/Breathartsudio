import { BreadcrumbSchema, WebPageSchema, ServiceSchema } from '../../schema';

export const metadata = {
  title: 'Premium Event Photography & Management Dubai — BreathArt',
  description: 'Luxury social gatherings, private birthdays, baby showers, and grand corporate event production and photography in Dubai. Full execution and celebrity curation.',
  alternates: {
    canonical: '/services/events',
  },
  openGraph: {
    title: 'Premium Event Photography & Management Dubai — BreathArt',
    description: 'Luxury social gatherings, private birthdays, baby showers, and grand corporate event production and photography in Dubai.',
    url: 'https://breathart.ae/services/events',
    images: [
      {
        url: '/assets/gallery/event/pexels-caleboquendo-11329860.webp',
        width: 1200,
        height: 630,
        alt: 'BreathArt Event Photography Dubai',
      },
    ],
  },
  twitter: {
    title: 'Premium Event Photography & Management Dubai — BreathArt',
    description: 'Luxury social gatherings, private birthdays, baby showers, and grand corporate event production and photography in Dubai.',
    images: ['/assets/gallery/event/pexels-caleboquendo-11329860.webp'],
  },
};

export default function EventsLayout({ children }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Events By BreathArt', url: '/services/events' },
        ]}
      />
      <ServiceSchema
        services={[
          { name: 'Event Photography Dubai', description: 'Comprehensive event photography covering speakers, networking, and key milestones.', url: '/services/events' },
          { name: 'Event Management Dubai', description: 'Professional planning, stage shows, brand activations, and production for UAE events.', url: '/services/events' },
        ]}
      />
      <WebPageSchema
        name="Premium Event Photography & Management Dubai"
        description="Explore BreathArt's event photography and management solutions in Dubai."
        url="/services/events"
      />
      {children}
    </>
  );
}
