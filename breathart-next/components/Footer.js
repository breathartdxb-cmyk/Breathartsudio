import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Philosophy */}
          <div className="footer-col brand-col">
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Image src="/assets/logo/BreathArt Photography new Logo.png" alt="BreathArt Photography Logo" width={182} height={45} style={{ height: '45px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p className="footer-desc">
              Dubai&apos;s luxury photography studio specializing in cinematic visual legacies. We turn fleeting moments into timeless fine-art treasures.
            </p>
            <div className="payment-acceptance">
              <span>We accept</span>
              <Image src="/assets/logo/tabby-logo.svg" alt="Tabby Logo" width={120} height={40} className="payment-logo" />
              <Image src="/assets/logo/tamara-logo.webp" alt="Tamara Logo" width={120} height={40} className="payment-logo" />
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="/services#service-newborn">Newborn Portraiture</Link>
              </li>
              <li>
                <Link href="/services#service-wedding">Wedding Stories</Link>
              </li>
              <li>
                <Link href="/services/corporate">Corporate Branding</Link>
              </li>
              <li>
                <Link href="/services/real-estate">Real Estate Showcase</Link>
              </li>
              <li>
                <Link href="/services#service-event">Event Photography</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio */}
          <div className="footer-col studio-col">
            <h4>Studio</h4>
            <ul>
              <li>
                <Link href="/about">Our Philosophy</Link>
              </li>
              <li>
                <Link href="/offers">Special Catalogs</Link>
              </li>
              <li>
                <Link href="/contact">Book Session</Link>
              </li>
              <li>
                <Link href="/contact">Inquiries</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="footer-col contact-col">
            <h4>Initiate Story</h4>

            <div className="footer-contact-item" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <i className="fas fa-envelope" style={{ marginTop: '0.2rem', flexShrink: 0 }} aria-hidden="true"></i>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <a href="mailto:info@breathartstudio.com">info@breathartstudio.com</a>
                <a href="mailto:Breathartdxb@gmail.com">Breathartdxb@gmail.com</a>
              </div>
            </div>

            <div className="footer-contact-item" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <i className="fas fa-phone" style={{ marginTop: '0.2rem', flexShrink: 0 }} aria-hidden="true"></i>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <a href="tel:+971526400679">+971 52 640 0679</a>
                <a href="tel:+971522150837">+971 52 215 0837</a>
              </div>
            </div>
            <div className="footer-social-links">
              <a href="https://wa.me/971526400679" target="_blank" rel="noopener noreferrer" className="whatsapp" aria-label="WhatsApp">
                <i className="fab fa-whatsapp" aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/breathart.photography" target="_blank" rel="noopener noreferrer" className="instagram" aria-label="Instagram">
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="https://www.facebook.com/share/193V3fhepb/" target="_blank" rel="noopener noreferrer" className="facebook" aria-label="Facebook">
                <i className="fab fa-facebook-f" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-group-companies">
          <div className="group-company-wrapper">
            <span className="group-label">BreathArt Group:</span>
            <div className="group-logos">
              <a href="https://www.breathartinstitute.in/" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/logo/institute_logo.png" alt="BreathArt Academy Logo" width={63} height={35} className="group-logo institute-logo" />
              </a>
              <Image src="/assets/logo/marketing_logo.webp" alt="BreathArt Marketing Logo" width={30} height={30} className="group-logo marketing-logo" />
              <a href="https://breathartstudio.com" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/logo/photography-logo.webp" alt="BreathArt Photography Logo" width={30} height={30} className="group-logo" />
              </a>
            </div>
          </div>
          <Link href="/landing" className="btn-group-landing">View Studio Landing Page</Link>
        </div>

        <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <p>&copy; {new Date().getFullYear()} BreathArt Creative Studio. Crafted for Cinematic Elegance.</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Developed by{' '}
            <a 
              href="https://www.instagram.com/intellex.web" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--color-gold)', fontWeight: '600', transition: 'color 0.35s ease' }}
              className="developer-link"
            >
              Intellex
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
