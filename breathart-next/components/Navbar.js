'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

const LinkedinIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const DribbbleIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
  </svg>
);

const FigmaIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v3.5A3.5 3.5 0 0 1 8.5 16H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5A3.5 3.5 0 0 1 8.5 22H8.5A3.5 3.5 0 0 1 5 18.5z" />
  </svg>
);

const MENU_SLIDE_ANIMATION = {
  initial: { x: '100%', opacity: 0.9 },
  enter: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] /* Premium buttery smooth cubic-bezier */
    } 
  },
  exit: {
    x: '100%',
    opacity: 0.9,
    transition: { 
      duration: 0.4, 
      ease: [0.16, 1, 0.3, 1] 
    },
  },
};

// NavLink item styled with a clean layout for mobile links
function NavLink({ heading, href, index, isActive, onClose, subItems }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="curved-menu-link-wrapper">
      {subItems ? (
        <>
          <div 
            className="curved-menu-link-content" 
            style={{ padding: '1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Link 
              href={href} 
              onClick={onClose} 
              style={{ display: 'flex', alignItems: 'center', flexGrow: 1, textDecoration: 'none' }}
            >
              <span className="curved-menu-index">
                0{index}.
              </span>
              <span className="curved-menu-label" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'} onMouseLeave={(e) => e.target.style.color = 'rgba(250, 245, 240, 0.9)'}>{heading}</span>
            </Link>
            <div 
              style={{ cursor: 'pointer', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center' }} 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: 'var(--color-gold)', fontSize: '1rem', transition: 'transform 0.3s ease' }}></i>
            </div>
          </div>
          {isOpen && (
            <div style={{ paddingLeft: '2.5rem', paddingBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {subItems.map((sub) => sub.disabled ? (
                <div
                  key={sub.heading}
                  style={{ fontSize: '1.2rem', color: '#888', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', cursor: 'default' }}
                >
                  {sub.heading}
                </div>
              ) : (
                <Link 
                  key={sub.href} 
                  href={sub.href} 
                  onClick={onClose} 
                  style={{ fontSize: '1.2rem', color: 'rgba(250, 245, 240, 0.7)', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(250, 245, 240, 0.7)'}
                >
                  {sub.heading}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link href={href} onClick={onClose}>
          <div className="curved-menu-link-content">
            <span className="curved-menu-index">
              0{index}.
            </span>
            <div className="curved-menu-text-container">
              <span className="curved-menu-label">{heading}</span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 80);

      if (currentScrollY <= 80) {
        setVisible(true);
      } else {
        const diff = currentScrollY - lastScrollY;
        if (diff > 10) setVisible(false);
        else if (diff < -10) setVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Hide the navbar entirely on specific pages (like the new cinematic designs)
  if (pathname === '/services/newborn-maternity' || pathname === '/services/corporate' || pathname === '/services/real-estate' || pathname === '/newborn-photography-dubai') {
    return null;
  }

  const isActive = (path) => pathname === path;
  const transparentPages = [
    '/',
    '/services/videography',
    '/services/photography',
    '/services/events-by-breathart',
    '/services/newborn-maternity',
    '/services/wedding',
    '/services/family-couple',
    '/services/events',
    '/services/corporate',
    '/services/real-estate'
  ];
  const hasTransparentHeader = transparentPages.includes(pathname) || pathname.startsWith('/landing');

  const navClasses = [
    scrolled || !hasTransparentHeader ? 'scrolled' : '',
    !visible ? 'nav-hidden' : '',
    menuOpen ? 'nav-menu-open' : '',
  ].filter(Boolean).join(' ');

  const navItems = [
    { heading: 'Home', href: '/' },
    { 
      heading: 'Services', 
      href: '/services',
      subItems: [
        { heading: 'Newborn & Maternity', href: '/services/newborn-maternity' },
        { heading: 'Wedding & Romance', href: '/services/wedding' },
        { heading: 'Family & Couple', href: '/services/family-couple' },
        { heading: 'Events By BreathArt', href: '/services/events' },
        { heading: 'Corporate Photography', href: '/services/corporate' },
        { heading: 'Real Estate Showcase', href: '/services/real-estate' },
        { heading: 'Videography Films', href: '/services/videography' }
      ]
    },
    { heading: 'Offers', href: '/offers' },
    { heading: 'About Us', href: '/about' },
    { heading: 'Blog', href: '/blog' },
    { heading: 'Contact', href: '/contact' },
  ];

  if (pathname === '/services/newborn-maternity') {
    return null;
  }

  return (
    <>
      <nav id="navbar" className={navClasses}>
        <div className="nav-container">
          <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/assets/logo/BreathArt Photography new Logo.png" alt="BreathArt Photography Logo" width={182} height={45} style={{ height: '30px', width: 'auto', objectFit: 'contain' }} />
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links">
            <li><Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li className="dropdown">
              <Link href="/services" className={`dropdown-trigger ${isActive('/services') ? 'active' : ''}`}>
                Services <i className="fas fa-chevron-down"></i>
              </Link>
              <div className="mega-menu">
                <div className="mega-menu-container" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                  <div className="mega-menu-column" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <span className="mega-title" style={{ fontSize: '0.85rem', color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block', fontWeight: 'bold' }}>Photography</span>
                    <Link href="/services/newborn-maternity" style={{ padding: '0.25rem 0', display: 'block' }}>
                      <span className="mega-desc" style={{ color: '#000', fontSize: '0.9rem', fontWeight: '600' }}>Newborn &amp; Maternity</span>
                    </Link>
                    <Link href="/services/wedding" style={{ padding: '0.25rem 0', display: 'block' }}>
                      <span className="mega-desc" style={{ color: '#000', fontSize: '0.9rem', fontWeight: '600' }}>Wedding &amp; Romance</span>
                    </Link>
                    <Link href="/services/family-couple" style={{ padding: '0.25rem 0', display: 'block' }}>
                      <span className="mega-desc" style={{ color: '#000', fontSize: '0.9rem', fontWeight: '600' }}>Family &amp; Couple</span>
                    </Link>
                    <Link href="/services/corporate" style={{ padding: '0.25rem 0', display: 'block' }}>
                      <span className="mega-desc" style={{ color: '#000', fontSize: '0.9rem', fontWeight: '600' }}>Corporate</span>
                    </Link>
                    <Link href="/services/real-estate" style={{ padding: '0.25rem 0', display: 'block' }}>
                      <span className="mega-desc" style={{ color: '#000', fontSize: '0.9rem', fontWeight: '600' }}>Real Estate</span>
                    </Link>
                  </div>
                  <div className="mega-menu-column" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <span className="mega-title" style={{ fontSize: '0.85rem', color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block', fontWeight: 'bold' }}>Videography</span>
                    <Link href="/services/videography" style={{ padding: '0.25rem 0', display: 'block' }}>
                      <span className="mega-desc" style={{ color: '#000', fontSize: '0.9rem', fontWeight: '600' }}>Cinematic Videography</span>
                      <span className="mega-desc" style={{ display: 'block', fontSize: '0.75rem', marginTop: '0.25rem', color: '#666' }}>Wedding films &amp; brand promos</span>
                    </Link>
                  </div>
                  <div className="mega-menu-column" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <span className="mega-title" style={{ fontSize: '0.85rem', color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block', fontWeight: 'bold' }}>Event Production</span>
                    <Link href="/services/events" style={{ padding: '0.25rem 0', display: 'block' }}>
                      <span className="mega-desc" style={{ color: '#000', fontSize: '0.9rem', fontWeight: '600' }}>Events By BreathArt</span>
                      <span className="mega-desc" style={{ display: 'block', fontSize: '0.75rem', marginTop: '0.25rem', color: '#666' }}>Social celebrations &amp; planning</span>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li><Link href="/offers" className={isActive('/offers') ? 'active' : ''}>Offers</Link></li>
            <li><Link href="/about" className={isActive('/about') ? 'active' : ''}>About Us</Link></li>
            <li><Link href="/blog" className={isActive('/blog') ? 'active' : ''}>Blog</Link></li>
            <li><Link href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
          </ul>

          <Link href="/contact" className="btn-nav">Contact Us</Link>

        </div>

        {/* Hamburger button — rendered outside nav-container to escape its stacking context! */}
        <div
          className="mobile-hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <div className="mobile-hamburger-inner">
            <span
              className={`mobile-hamburger-line-span ${menuOpen ? 'open-1' : ''}`}
            ></span>
            <span
              className={`mobile-hamburger-line-span ${menuOpen ? 'open-2' : ''}`}
            ></span>
            <span
              className={`mobile-hamburger-line-span ${menuOpen ? 'open-3' : ''}`}
            ></span>
          </div>
        </div>
      </nav>

      {/* Premium Right-Side Slide-In Curved Menu (Portaled to document.body for clean layout) */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="curved-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="curved-menu-backdrop"
              onClick={() => setMenuOpen(false)}
            />
          )}
          {menuOpen && (
            <motion.div
              key="curved-menu-panel"
              variants={MENU_SLIDE_ANIMATION}
              initial="initial"
              animate="enter"
              exit="exit"
              className="curved-menu-panel"
            >
              {/* Top accent gradient line */}
              <div className="curved-menu-top-line" />

              {/* Navigation Links Body */}
              <div className="curved-menu-body">
                <div className="curved-menu-section-label">Navigation</div>
                <div className="curved-menu-links">
                  {navItems.map((item, index) => (
                    <NavLink
                      key={item.href}
                      heading={item.heading}
                      href={item.href}
                      index={index + 1}
                      isActive={isActive(item.href)}
                      onClose={() => setMenuOpen(false)}
                      subItems={item.subItems}
                    />
                  ))}
                </div>
              </div>

              {/* Footer inside Mobile Menu */}
              <div className="curved-menu-footer">
                <Link
                  href="/landing"
                  className="curved-menu-cta-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  View Studio Page
                </Link>
                <div className="curved-menu-socials">
                  <a href="https://wa.me/971526400679" target="_blank" rel="noopener noreferrer" className="curved-menu-social-icon" aria-label="WhatsApp">
                    <i className="fab fa-whatsapp" style={{ fontSize: '24px' }} aria-hidden="true"></i>
                  </a>
                  <a href="https://www.facebook.com/share/193V3fhepb/" target="_blank" rel="noopener noreferrer" className="curved-menu-social-icon" aria-label="Facebook">
                    <i className="fab fa-facebook-f" style={{ fontSize: '24px' }} aria-hidden="true"></i>
                  </a>
                  <a href="https://www.instagram.com/breathart.photography" target="_blank" rel="noopener noreferrer" className="curved-menu-social-icon" aria-label="Instagram">
                    <i className="fab fa-instagram" style={{ fontSize: '24px' }} aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

