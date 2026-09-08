import Link from 'next/link';
import dynamic from 'next/dynamic';
import ServiceCard from './components/ServiceCard';
import { BreadcrumbSchema, WebPageSchema, ServiceSchema } from '../schema';

const ContactForm = dynamic(() => import('../../components/ContactForm'));

export const metadata = {
  title: 'Photography & Videography Services Dubai — Newborn, Wedding, Corporate, Events',
  description: 'Explore BreathArt\'s premium photography and videography services in Dubai. Newborn fine-art, wedding, family, corporate, real estate photography, and full event management.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Photography & Videography Services — BreathArt Studio Dubai',
    description: 'Premium photography services in Dubai: newborn, wedding, family, corporate, real estate, and event management.',
    url: 'https://breathart.ae/services',
    images: [
      {
        url: '/assets/gallery/newborn/BK-108_LORRIE_890_.jpg.webp',
        width: 1200,
        height: 630,
        alt: 'BreathArt Photography Services Dubai',
      },
    ],
  },
  twitter: {
    title: 'Photography & Videography Services — BreathArt Studio Dubai',
    description: 'Premium photography services in Dubai: newborn, wedding, family, corporate, and event photography.',
    images: ['/assets/gallery/newborn/BK-108_LORRIE_890_.jpg.webp'],
  },
};

const services = [
  {
    id: 'service-newborn',
    number: '01 / Innocence',
    title: 'Newborn Fine-Art',
    image: '/assets/gallery/newborn/BK-108_LORRIE_890_.jpg.webp',
    alt: 'Newborn Photography',
    backTitle: 'Pure Beginnings',
    description: 'Capturing the tender innocence of newborn days and early baby milestones with a cozy, safe, and highly artistic approach.',
    details: [
      { icon: 'fas fa-baby', text: '3-Hour Cozy Studio Session' },
      { icon: 'fas fa-female', text: 'Dedicated Caretaker Lady Staff Assistance' },
      { icon: 'fas fa-magic', text: 'Painterly Skin Retouching' },
      { icon: 'fas fa-box', text: 'Premium Linen Print Box' },
    ],
    ctaText: 'Book Newborn',
    ctaHref: '/services/newborn-maternity',
    delay: 0,
  },
  {
    id: 'service-wedding',
    number: '02 / Devotion',
    title: 'Wedding Fine-Art',
    image: '/assets/gallery/wedding/pexels-habib-hosseini-3673463.webp',
    alt: 'Wedding Photography',
    backTitle: 'Eternal Romance',
    description: 'An enduring fine-art legacy of your love story and grand celebrations, documented with profound depth and cinematic vision.',
    details: [
      { icon: 'fas fa-ring', text: 'Full Day Comprehensive Wedding Coverage' },
      { icon: 'fas fa-user-friends', text: 'Double Principle Photographers' },
      { icon: 'fas fa-book-open', text: 'Premium Handcrafted Leather Album' },
      { icon: 'fas fa-film', text: 'Cinematic High-Definition Highlights' },
    ],
    ctaText: 'Consultation',
    ctaHref: '/services/wedding',
    delay: 0.1,
  },
  {
    id: 'service-event',
    number: '03 / Production',
    title: 'Events By BreathArt',
    image: '/assets/gallery/event/pexels-panditwiguna-2788487.webp',
    alt: 'Events By BreathArt',
    backTitle: 'Grand Productions',
    description: 'Creating unforgettable UAE events through innovative stage planning, celebrity collaborations, activations, and professional execution.',
    details: [
      { icon: 'fas fa-star', text: 'Stage Shows & Outdoor Events' },
      { icon: 'fas fa-users', text: 'Celebrity & Entertainment Curation' },
      { icon: 'fas fa-building', text: 'Corporate & Brand Activations' },
      { icon: 'fas fa-handshake', text: 'Strategic Channel Partnerships' },
    ],
    ctaText: 'Explore Events',
    ctaHref: '/services/events',
    delay: 0.2,
  },
  {
    id: 'service-pre-wedding',
    number: '04 / Familyhood',
    title: 'Family Fine-Art',
    image: '/assets/gallery/family/bk-279-suhad.webp',
    alt: 'Family Photography',
    backTitle: 'First Chapter',
    description: 'Artistic family sessions that capture your unique warmth and family bonding in beautiful lifestyle settings.',
    details: [
      { icon: 'fas fa-users', text: 'Elegant Family Styling Assistance' },
      { icon: 'fas fa-sun', text: 'Sunset Outdoor Session' },
      { icon: 'fas fa-images', text: '30 Fully Edited Visual Masterplates' },
      { icon: 'fas fa-frame', text: 'Fine-Art Wall Frame Included' },
    ],
    ctaText: 'Book Session',
    ctaHref: '/services/family-couple',
    delay: 0.3,
  },
  {
    id: 'service-corporate',
    number: '05 / Enterprise',
    title: 'Corporate Vision',
    image: '/assets/services/corporate/vitaly-gariev-grbDcbyo9nU-unsplash.jpg',
    objectPosition: 'top',
    alt: 'Corporate Photography',
    backTitle: 'Brand Legacy',
    description: 'Authoritative branding and executive documentation that elevates your professional identity to a cinematic level.',
    details: [
      { icon: 'fas fa-briefcase', text: 'Executive Headshots' },
      { icon: 'fas fa-building', text: 'Architecture & Space' },
      { icon: 'fas fa-users', text: 'Team Documentation' },
      { icon: 'fas fa-video', text: 'B-Roll Video Content' },
    ],
    ctaText: 'Book Session',
    ctaHref: '/services/corporate-realestate',
    delay: 0.4,
  },
  {
    id: 'service-couple',
    number: '06 / Lifestyle',
    title: 'Real Estate Fine-Art',
    image: '/assets/gallery/real-estate/0014.webp',
    alt: 'Real Estate Photography',
    backTitle: 'Spatial Design',
    description: 'High-end spatial documentation capturing architectural brilliance and real estate layout aesthetics.',
    details: [
      { icon: 'fas fa-camera', text: 'Wide-Angle Architectural Framing' },
      { icon: 'fas fa-lightbulb', text: 'HDR Lighting & Exposure Bracketing' },
      { icon: 'fas fa-image', text: 'Premium Interior & Exterior Digital Plates' },
      { icon: 'fas fa-home', text: 'Twilight Session Availability' },
    ],
    ctaText: 'Inquire Quote',
    ctaHref: '/services/corporate-realestate',
    delay: 0.5,
  },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />
      <ServiceSchema
        services={[
          { name: 'Maternity & Newborn Fine-Art Photography', description: 'Award-winning maternity portraits and luxury newborn photography in Dubai.', url: '/services/newborn-maternity' },
          { name: 'Wedding & Romance Films', description: 'Cinematic visual storytelling and comprehensive photography for luxury weddings.', url: '/services/wedding' },
          { name: 'Corporate Branding & Headshots', description: 'Premium corporate photography and professional headshots for businesses.', url: '/services/corporate-realestate' },
          { name: 'Event Management By BreathArt', description: 'End-to-end event planning, stage production, and brand activations.', url: '/services/events' },
        ]}
      />
      <WebPageSchema
        name="Photography & Videography Services Dubai"
        description="Premium photography and videography services. Maternity, newborn, wedding, corporate, and grand events."
        url="/services"
      />
      <header className="page-header">
        <div className="container container-narrow animate-reveal">
          <span className="cinematic-title" style={{ color: 'var(--color-gold)' }}>The Artistry</span>
          <h1 style={{ color: 'var(--color-white)', fontSize: '4.5rem' }}>Visual Offerings</h1>
          <p style={{ marginTop: '1.5rem', opacity: 0.7, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Curated photography catalogs designed to document your life's most precious milestones with ultimate refinement.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0, paddingBottom: '0.5rem' }}>
        <div className="container">
          <div className="services-grid-redesign">
            {services.map((service, idx) => (
              <ServiceCard key={service.id} {...service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact-section" className="section" style={{
        borderTop: '1px solid rgba(158, 112, 96, 0.15)',
        paddingTop: '6rem',
        paddingBottom: '8rem',
        background: 'var(--color-black)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4rem',
            alignItems: 'start'
          }} className="services-alternate-row">

            {/* Left Column CTA */}
            <div style={{ flex: '1 1 350px' }}>
              <span className="cinematic-title" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '0.5rem' }}>
                Secure Your Date
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                color: 'var(--color-white)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                lineHeight: '1.2',
                marginBottom: '1.5rem'
              }}>
                Book Your Session
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Fill out the form to reserve your preferred date. Our team will contact you within a few hours to discuss package options, concepts, and calendar availability.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
                <a href="tel:+971526400679" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-white)', fontWeight: '600', textDecoration: 'none' }}>
                  <i className="fas fa-phone" style={{ color: 'var(--color-gold)', fontSize: '0.9rem' }}></i>
                  +971 52 640 0679
                </a>
                <a href="https://wa.me/971526400679" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-white)', fontWeight: '600', textDecoration: 'none' }}>
                  <i className="fab fa-whatsapp" style={{ color: 'var(--color-gold)', fontSize: '0.9rem' }}></i>
                  WhatsApp Support
                </a>
              </div>
            </div>

            {/* Right Column Form */}
            <div style={{
              flex: '1 1 450px',
              background: 'var(--color-shade-2)',
              padding: '3.5rem',
              borderRadius: '0px',
              border: '1px solid rgba(158, 112, 96, 0.15)',
              boxShadow: '0 20px 40px rgba(43, 27, 20, 0.05)'
            }} className="connect-inner-mobile">
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                color: 'var(--color-white)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                Session Inquiry
              </h3>
              <ContactForm
                theme="cinematic"
                buttonText="Book Your Session"
                showServiceField={true}
                showPackageField={false}
                showDetailsField={false}
                initialMessage="I am interested in your photography and videography services."
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
