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
            alt="Family & Couple gallery preview"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const familyCoupleSlides = [
  {
    id: 1,
    image: '/assets/gallery/family/bk-279-suhad.webp',
    tag: 'cherished moments',
    title1: 'FAMILY &',
    title2: 'COUPLE PORTRAITS',
    desc1: 'Aesthetic Family & Couple Sessions in Dubai',
    desc2: 'Warm fine-art storytelling, document your connections, milestones, and daily laughs.',
    link: '#contact-section',
    align: 'left',
    objectPosition: 'center 35%'
  },
  {
    id: 2,
    image: '/assets/gallery/family/IMG_9773.webp',
    tag: 'sunset glow',
    title1: 'OUTDOOR LIFESTYLE',
    title2: 'SESSIONS',
    desc1: 'Capturing laughter in iconic Dubai locations',
    desc2: 'Sunset sessions designed to bring out genuine smiles and natural interactions.',
    link: '#contact-section',
    align: 'left'
  }
];

const testimonials = [
  {
    id: 1,
    text: "We had a family lifestyle session at the beach. The photographers were amazing with our children, keeping them engaged and happy. We love the warm tones in the final images!",
    author: "The Harrison Family",
    location: "Kite Beach Dubai"
  },
  {
    id: 2,
    text: "Our anniversary couple shoot was perfect. They helped us with locations and guided us naturally with posing. The pictures look incredibly romantic and artistic.",
    author: "Sanjay & Neha",
    location: "Al Qudra Desert"
  }
];

export default function FamilyCouplePage() {
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
          slides={familyCoupleSlides}
          buttonText="Book Your Session"
          showServiceField={false}
          showPackageField={false}
          initialService="family"
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
          { text: 'Warm Lifestyle Edits', icon: 'fas fa-images' },
          { text: 'Sunset Outdoor Sessions', icon: 'fas fa-sun' },
          { text: 'Styling & Wardrobe Guide', icon: 'fas fa-tshirt' },
          { text: 'Decades of Experience', icon: 'fas fa-users' }
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

      {/* 2. Family & Couple Content */}
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
                Pure Connection
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
                Family &amp; couple romance
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Preserve the warmth of your bonds. We create a relaxed environment so every smile, hug, and glance is genuine. Whether in our custom-built cozy studio or out in the beautiful scenic desert dunes or beaches of Dubai, we map out layouts that feel natural, alive, and completely yours.
              </p>
              
              <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Camera size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Family Sessions</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Generational, milestones, and cozy studio portraits</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Heart size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Couple Romance</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Engagement romance portfolios & desert connections</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Sparkles size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Kids &amp; Cake Smash</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Messy smash themes, first birthday smiles, and play</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Sun size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Linen Albums</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Premium linen print box & custom-framed wall art</p>
                  </div>
                </div>
              </div>

              <a href="#contact-section" onClick={scrollToForm} className="btn btn-gold" style={{ padding: '1rem 2.5rem', letterSpacing: '2px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Book Your Session &rarr;
              </a>
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
                  '/assets/gallery/family/bk-279-suhad.webp',
                  '/assets/gallery/family/IMG_9601.webp',
                  '/assets/gallery/family/IMG_9770.webp',
                  '/assets/gallery/family/IMG_9773.webp',
                  '/assets/gallery/family/img_1263.webp',
                  '/assets/gallery/family/photo-32.webp'
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
            <span className="cinematic-title">Cherished Stories</span>
            <h2 className="section-title">Family &amp; Couple Gallery</h2>
            <div className="accent-divider"></div>
          </div>
          <HomeLightbox
            sectionId="family-couple-gallery-separate"
            gridCols="repeat(3, 1fr)"
            hideText={true}
            items={[
              { src: '/assets/gallery/family/bk-279-suhad.webp', alt: 'Family Portrait 1', title: 'Generational Love' },
              { src: '/assets/gallery/family/IMG_9770.webp', alt: 'Family Portrait 2', title: 'Warm Embrace' },
              { src: '/assets/gallery/family/IMG_9773.webp', alt: 'Family Portrait 3', title: 'Desert Laughter' },
              { src: '/assets/gallery/family/img_1263.webp', alt: 'Couple Portrait 1', title: 'First Romance' },
              { src: '/assets/gallery/family/IMG_9601.webp', alt: 'Kids Portrait 1', title: 'Milestones' },
              { src: '/assets/gallery/family/photo-32.webp', alt: 'Family Portrait 4', title: 'Sweet Bonds' }
            ]}
          />
        </div>
      </section>

      {/* 4. Testimonial Slider */}
      <TestimonialsSlider 
        theme="dark" 
        reviews={testimonials.map(t => ({ ...t, rating: 5 }))} 
        title="Family Words" 
        subtitle="Client Appreciations" 
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
                Book Your Family or Couple Portrait
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Fill out the details to request session dates, styling advice, or desert locations. We will guide you from wardrobe suggestions to poses for the perfect result.
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
                Booking Enquiry
              </h3>
              <ContactForm 
                theme="cinematic"
                buttonText="Book Your Session"
                showServiceField={false}
                showPackageField={false}
                initialService="family"
                initialMessage="I am inquiring about Family or Couple photography packages."
              />
            </div>
          </div>
        </div>
      </section>

      <Lightbox />
    </>
  );
}
