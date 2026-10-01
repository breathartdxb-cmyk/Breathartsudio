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
            alt="Wedding gallery preview"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const weddingSlides = [
  {
    id: 1,
    image: '/assets/gallery/wedding/pexels-habib-hosseini-3673463.webp',
    tag: 'eternal love',
    title1: 'WEDDING &',
    title2: 'ROMANCE STORIES',
    desc1: 'Luxury Wedding Photography in Dubai',
    desc2: 'Documenting your sacred promises, raw emotions, and pure celebrations in cinematic elegance.',
    link: '#contact-section',
    align: 'left',
    objectPosition: 'center 35%'
  },
  {
    id: 2,
    image: '/assets/gallery/wedding/pexels-photography-maghradze-ph-1659410-31953101.webp',
    tag: 'candid emotion',
    title1: 'PRE-WEDDING &',
    title2: 'ENGAGEMENTS',
    desc1: 'Romantic portraits in breathtaking locations',
    desc2: 'We capture the excitement and chemistry of your journey together.',
    link: '#contact-section',
    align: 'left'
  }
];

const testimonials = [
  {
    id: 1,
    text: "Deciding on BreathArt for our wedding was the best decision we made! The images look like they belong in a high-end luxury magazine. They captured every single emotional moment perfectly.",
    author: "Elena & Marcus",
    location: "One&Only Royal Mirage"
  },
  {
    id: 2,
    text: "We did our pre-wedding shoot in the dunes and our wedding in Downtown. The team is incredibly professional and tireless. The handcrafted leather album is a true masterpiece!",
    author: "Tariq & Yasmin",
    location: "Armani Hotel Dubai"
  }
];

export default function WeddingPage() {
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
          slides={weddingSlides}
          buttonText="Book Your Session"
          showServiceField={false}
          showPackageField={false}
          initialService="wedding"
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
          { text: 'Double Principle Cameras', icon: 'fas fa-camera' },
          { text: 'Signature Warm Edit', icon: 'fas fa-sliders-h' },
          { text: 'Premium Albums included', icon: 'fas fa-book-open' },
          { text: 'Cinematic High-Def Reels', icon: 'fas fa-film' }
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

      {/* 2. Wedding Photography & Pre/Post Wedding Details */}
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
                Enduring Legacies
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
                Wedding day &amp; pre-wedding
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                We believe a wedding is a sacred visual narrative. Our style blends high-fashion editorial styling with raw, candid photojournalism. We map out double perspective coverage, ensuring no glance, tear, or dance step goes undocumented.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Camera size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Wedding Day</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Full-day, multi-camera fine art capture</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Heart size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Pre-Wedding</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Cinematic romance trailers & shoots</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Sparkles size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Post-Wedding</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Creative, relaxed fine-art portrait sessions</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Sun size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', marginBottom: '0.25rem' }}>Couture Albums</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Handcrafted leather & layflat display books</p>
                  </div>
                </div>
              </div>

              <a href="#contact-section" onClick={scrollToForm} className="btn btn-gold" style={{ padding: '1rem 2.5rem', letterSpacing: '2px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Consult Wedding Date &rarr;
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
                  '/assets/gallery/wedding/pexels-abdallah-mahmoud-2153337567-32671354.webp',
                  '/assets/gallery/wedding/pexels-abdallah-naser-2156661580-34317944.webp',
                  '/assets/gallery/wedding/pexels-ahmetcotur-29560843.webp',
                  '/assets/gallery/wedding/pexels-braiki-dhia-eddine-2159140624-35819262.webp',
                  '/assets/gallery/wedding/pexels-habib-hosseini-3673463.webp',
                  '/assets/gallery/wedding/pexels-photography-maghradze-ph-1659410-31953101.webp'
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Gallery (Existing Wedding designs) */}
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="section-header animate-reveal active">
            <span className="cinematic-title">Exquisite Frames</span>
            <h2 className="section-title">Wedding Showcase Gallery</h2>
            <div className="accent-divider"></div>
          </div>
          <HomeLightbox
            sectionId="wedding-gallery-separate"
            gridCols="repeat(3, 1fr)"
            hideText={true}
            items={[
              { src: '/assets/gallery/wedding/pexels-abdallah-mahmoud-2153337567-32671354.webp', alt: 'Wedding Detail 1', title: 'The Vow' },
              { src: '/assets/gallery/wedding/pexels-ahmetcotur-29560843.webp', alt: 'Wedding Detail 2', title: 'Golden Hour' },
              { src: '/assets/gallery/wedding/pexels-braiki-dhia-eddine-2159140624-35819262.webp', alt: 'Wedding Detail 3', title: 'Sacred Bond' },
              { src: '/assets/gallery/wedding/pexels-habib-hosseini-3673463.webp', alt: 'Wedding Detail 4', title: 'Together' },
              { src: '/assets/gallery/wedding/pexels-photography-maghradze-ph-1659410-31953101.webp', alt: 'Wedding Detail 5', title: 'Candid Romance' },
              { src: '/assets/gallery/wedding/pexels-sumeyye-acar-1402897839-32954759.webp', alt: 'Wedding Detail 6', title: 'Eternal Flame' }
            ]}
          />
        </div>
      </section>

      {/* 4. Testimonial Slider */}
      <TestimonialsSlider 
        theme="dark" 
        reviews={testimonials.map(t => ({ ...t, rating: 5 }))} 
        title="Couple Testimonials" 
        subtitle="Vows of Appreciation" 
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
                Let's Capture Your Wedding Story
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Fill out the form to reserve your date or request a consultation. Our wedding coordinator will follow up to discuss locations, setup timelines, and customized album options.
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
                Consultation Inquiry
              </h3>
              <ContactForm 
                theme="cinematic"
                buttonText="Book Your Session"
                showServiceField={false}
                showPackageField={false}
                initialService="wedding"
                initialMessage="I am inquiring about Wedding & Romance photography packages."
              />
            </div>
          </div>
        </div>
      </section>

      <Lightbox />
    </>
  );
}
