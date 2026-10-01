'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Sun, Heart, Star, Camera, Check, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import dynamic from 'next/dynamic';

const HomeLightbox = dynamic(() => import('../../(home)/components/HomeLightbox'));
const Lightbox = dynamic(() => import('../../(home)/components/Lightbox'));
const ContactForm = dynamic(() => import('../../../components/ContactForm'));
const HeroSlider = dynamic(() => import('../../(home)/components/HeroSlider'));
const TestimonialsSlider = dynamic(() => import('../../../components/TestimonialsSlider'));

const ServiceAutoSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Image
            src={images[index]}
            alt="Events gallery preview"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const eventSlides = [
  {
    id: 1,
    image: '/assets/gallery/event/pexels-caleboquendo-11329860.webp',
    tag: 'grand productions',
    title1: 'EVENT',
    title2: 'PHOTOGRAPHY',
    desc1: 'Premium Event Coverage in Dubai',
    desc2: 'Documenting luxury birthday celebrations, private dinner galas, and corporate meetups with cinematic brilliance.',
    link: '#contact-section',
    align: 'left',
    objectPosition: 'center 35%'
  },
  {
    id: 2,
    image: '/assets/gallery/event/pexels-panditwiguna-2788487.webp',
    tag: 'celebrations',
    title1: 'SOCIAL & PRIVATE',
    title2: 'GATHERINGS',
    desc1: 'Creating unforgettable event memories',
    desc2: 'From stage set designs to candid crowd capture, we handle all visual productions.',
    link: '#contact-section',
    align: 'left'
  }
];

const testimonials = [
  {
    id: 1,
    text: "BreathArt photographed our annual corporate gala dinner. The photos were delivered rapidly and captured the key branding moments, VIP guests, and overall atmosphere beautifully.",
    author: "Marketing Director",
    location: "Corporate Gala Dubai"
  },
  {
    id: 2,
    text: "The absolute best event team in the UAE. They documented my daughter's luxury birthday celebration with great detail. The video highlights were shared widely on our socials!",
    author: "Fatima A.",
    location: "Jumeirah Golf Estates"
  }
];

export default function EventsPage() {
  const [activeReview, setActiveReview] = useState(0);
  const footerFormRef = useRef(null);

  const scrollToForm = (e) => {
    e.preventDefault();
    footerFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* 1. Hero Slider + Form */}
      <div style={{ position: 'relative' }}>
        <HeroSlider 
          showContactForm={true} 
          leftAlignOnly={true} 
          slides={eventSlides}
          buttonText="Book Your Session"
          showServiceField={false}
          showPackageField={false}
          initialService="event"
        />
      </div>

      {/* Trust Bar */}
      <div style={{
        background: 'var(--color-shade-2)',
        borderBottom: '1px solid rgba(158, 112, 96, 0.15)',
        padding: '1.5rem 5%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '1.5rem',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(158, 112, 96, 0.12)',
          border: '1px solid rgba(158, 112, 96, 0.3)',
          padding: '0.45rem 1.1rem',
          borderRadius: '50px',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={13} fill="var(--color-gold)" color="var(--color-gold)" />
            ))}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-white)', letterSpacing: '1.5px', fontWeight: '600', textTransform: 'uppercase' }}>
            5-Star Google Reviews
          </span>
        </div>
        <div style={{ width: '1px', height: '24px', background: 'rgba(158,112,96,0.25)', flexShrink: 0 }} className="trust-bar-divider" />
        {[
          { text: 'Dynamic Video Highlights', icon: 'fas fa-film' },
          { text: 'Multi-Camera Coverage', icon: 'fas fa-camera' },
          { text: 'Rapid Digital Delivery', icon: 'fas fa-shipping-fast' },
          { text: 'Expert Crowd Posing', icon: 'fas fa-users' }
        ].map((tp, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--color-white)',
            fontSize: '0.75rem',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap'
          }}>
            <i className={tp.icon} style={{ color: 'var(--color-gold)', fontSize: '0.8rem' }}></i>
            <span>{tp.text}</span>
          </div>
        ))}
      </div>

      {/* 2. Events Content */}
      <section className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--color-black)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4rem',
            alignItems: 'center'
          }} className="services-alternate-row">
            {/* Left Content Column */}
            <div style={{ flex: '1 1 450px' }}>
              <span className="cinematic-title" style={{ color: 'var(--color-gold)', fontSize: '0.75rem', letterSpacing: '3px' }}>
                Event Dynamics
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                color: 'var(--color-white)',
                marginTop: '0.5rem',
                marginBottom: '1.5rem',
                textTransform: 'lowercase',
                lineHeight: 1.1
              }}>
                Events &amp; celebrations
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Every event tells a unique brand or family story. We document luxury birthdays, anniversaries, gala dinners, conferences, and seminars across the UAE. We capture the key speakers, crowd interactions, culinary displays, and setups with absolute visual precision.
              </p>
              
              <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Camera size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Private Dinners</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Intimate celebrations & culinary layouts</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Heart size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Birthdays &amp; Galas</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Luxury private parties & milestone celebrations</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Sparkles size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Conferences</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Corporate meetups, brand keynotes & panels</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Sun size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Social Reels</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Quick-turnaround mobile optimized event videos</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#contact-section" onClick={scrollToForm} className="btn btn-gold" style={{ padding: '1rem 2.5rem', letterSpacing: '2px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  Inquire Event Dates &rarr;
                </a>
                <Link href="/services/events-by-breathart" className="btn btn-outline" style={{ padding: '1rem 2rem', letterSpacing: '2px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  View Full Event Management
                </Link>
              </div>
            </div>

            {/* Right Slider Column */}
            <div style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: '550px',
                height: '550px',
                position: 'relative',
                border: '1px solid rgba(158, 112, 96, 0.25)',
                overflow: 'hidden'
              }} className="service-image-box-astudio">
                <ServiceAutoSlider images={[
                  '/assets/gallery/event/pexels-b_s-media-production-568838161-34171711.webp',
                  '/assets/gallery/event/pexels-caleboquendo-11329860.webp',
                  '/assets/gallery/event/pexels-cherubs-22669860.webp',
                  '/assets/gallery/event/pexels-miriam-salgado-157461221-10733219_1.webp',
                  '/assets/gallery/event/pexels-miriam-salgado-157461221-10733602_1.webp',
                  '/assets/gallery/event/pexels-panditwiguna-2788487.webp'
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Gallery */}
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="section-header animate-reveal active">
            <span className="cinematic-title">Event Stories</span>
            <h2 className="section-title">Events Gallery</h2>
            <div className="accent-divider"></div>
          </div>
          <HomeLightbox
            sectionId="events-gallery-separate"
            gridCols="repeat(3, 1fr)"
            hideText={true}
            items={[
              { src: '/assets/gallery/event/pexels-b_s-media-production-568838161-34171711.webp', alt: 'Event 1', title: 'Grand Setup' },
              { src: '/assets/gallery/event/pexels-caleboquendo-11329860.webp', alt: 'Event 2', title: 'Gala Interaction' },
              { src: '/assets/gallery/event/pexels-cherubs-22669860.webp', alt: 'Event 3', title: 'Birthday Smiles' },
              { src: '/assets/gallery/event/pexels-miriam-salgado-157461221-10733219_1.webp', alt: 'Event 4', title: 'Intimate Banquet' },
              { src: '/assets/gallery/event/pexels-miriam-salgado-157461221-10733602_1.webp', alt: 'Event 5', title: 'Social Gathering' },
              { src: '/assets/gallery/event/pexels-panditwiguna-2788487.webp', alt: 'Event 6', title: 'Celebratory Cheer' }
            ]}
          />
        </div>
      </section>

      {/* 4. Testimonial Slider */}
      <TestimonialsSlider 
        theme="dark" 
        reviews={testimonials.map(t => ({ ...t, rating: 5 }))} 
        title="Client Praise" 
        subtitle="Appreciation Reels" 
      />

      {/* 5. Footer Enquiry Section */}
      <section ref={footerFormRef} id="contact-section" className="section" style={{
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
                Book Your Event Coverage
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Fill out the form to request custom packages or schedule availability. Our coordinator will follow up to review coverage timings, camera setups, and quick-turnaround social reel options.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
                <a href="tel:+971526400679" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-white)', fontWeight: '600', textDecoration: 'none' }}>
                  <Phone size={16} style={{ color: 'var(--color-gold)' }} />
                  +971 52 640 0679
                </a>
                <a href="https://wa.me/971526400679" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-white)', fontWeight: '600', textDecoration: 'none' }}>
                  <MessageSquare size={16} style={{ color: 'var(--color-gold)' }} />
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
                Inquiry Details
              </h3>
              <ContactForm 
                theme="cinematic"
                buttonText="Book Your Session"
                showServiceField={false}
                showPackageField={false}
                initialService="event"
                initialMessage="I am inquiring about Event Photography & videography packages."
              />
            </div>
          </div>
        </div>
      </section>

      <Lightbox />
    </>
  );
}
