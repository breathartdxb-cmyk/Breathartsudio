'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Sparkles, Sun, Heart, Star, Gift, Phone, ArrowUpRight, User, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useForm } from '@formspree/react';

const Lightbox = dynamic(() => import('../../(home)/components/Lightbox'), { ssr: false });
const ContactForm = dynamic(() => import('../../../components/ContactForm'), { ssr: false });
const TestimonialsSlider = dynamic(() => import('../../../components/TestimonialsSlider'), { ssr: false });
import SharedServiceSection from '../../../components/SharedServiceSection';

const testimonials = [
  {
    id: 1,
    text: "The most beautiful experience! They handled our 7-day-old baby with such care and patience. The lady photographers were so gentle and professional. The pictures turned out absolutely stunning!",
    author: "Sarah K.",
    location: "Dubai Marina"
  },
  {
    id: 2,
    text: "As a first-time mother, I was very nervous about my maternity shoot. The team at BreathArt made me feel so comfortable and beautiful. The private dressing rooms and custom gowns are incredible!",
    author: "Priya M.",
    location: "Downtown Dubai"
  },
  {
    id: 3,
    text: "Exceptional service and transparent pricing. No hidden fees. We got our edited photos within 24 hours as promised! Highly recommend their Maternity & Newborn combined package.",
    author: "Jessica T.",
    location: "Jumeirah"
  }
];

const allGalleryImages = [
  // Priority photos (user-specified order)
  { src: '/assets/services/newborn/newborn-and-maternity/1photo.jpeg', title: 'Newborn Portrait' },
  { src: '/assets/services/newborn/newborn-and-maternity/2 photo.jpeg', title: 'Newborn Portrait' },
  { src: '/assets/services/newborn/newborn-and-maternity/3photo.jpeg', title: 'Newborn Portrait' },
  { src: '/assets/services/newborn/newborn-and-maternity/5th photo.jpeg', title: 'Newborn Portrait' },
  { src: '/assets/services/newborn/newborn-and-maternity/6photo.jpeg', title: 'Newborn Portrait' },
  { src: '/assets/services/newborn/newborn-and-maternity/7phpto.jpeg', title: 'Newborn Portrait' },
  { src: '/assets/services/newborn/newborn-and-maternity/8th.jpeg', title: 'Newborn Portrait' },
  { src: '/assets/services/newborn/newborn-and-maternity/9th.jpeg', title: 'Newborn Portrait' },
  { src: '/assets/services/newborn/newborn-and-maternity/10photo.jpeg', title: 'Newborn Portrait' },
  { src: '/assets/services/newborn/newborn-and-maternity/14photo.jpeg', title: 'Newborn Portrait' },
  { src: '/assets/services/newborn/newborn-and-maternity/15photo.jpeg', title: 'Newborn Portrait' },

  { src: '/assets/services/newborn/newborn-and-maternity/13photo.jpeg', title: 'Newborn Portrait' },
  // Remaining unique photos (no duplicates)
  { src: '/assets/services/newborn/newborn-and-maternity/NB-432 SARAH (133) copy.jpg', title: 'Family Love' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-406 SOPHIE (92) copy.jpg', title: 'Pure Sleep' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-376 JYOTHI (83) copy.jpg', title: 'Tender Grip' },
  { src: '/assets/services/newborn/newborn-and-maternity/WhatsApp Image 2026-09-09 at 12.45.23 PM.jpeg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/new.jpeg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-427 KAJAL (317) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-414 SHIKHA (432) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-413 ARIANA (177) copy.jpg', title: 'Tender Sleep' },
  { src: '/assets/services/newborn/newborn-and-maternity/WhatsApp Image 2026-09-09 at 12.45.24 PM.jpeg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-451 DURETI (94) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-433 AFIYA (193) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-451 DURETI (101) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-453 MUTYA (134).JPG', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/IMG_0435.JPG.jpeg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-414 SHIKHA (201) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-406 SOPHIE (72) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-450 NAADIYA (44) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-453 MUTYA (24) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-453 MUTYA (158).JPG', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/_BAT3540 copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-421 ABHISHEK (175) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-445 GLADYS (115) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/NB-445 GLADYS (201) copy.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/dreaming-pregnancy-woman-sea-port.jpg', title: 'Growing Love' },
  { src: '/assets/services/newborn/newborn-and-maternity/pregnant-woman-with-protea-flowers-concept-style-pregnancy.jpg', title: 'Maternity Grace' },
  { src: '/assets/services/newborn/newborn-and-maternity/pregnant-woman-portrait-outdoor.jpg', title: 'Gallery Image' },
  { src: '/assets/services/newborn/newborn-and-maternity/IMG_0443.PNG', title: 'Gallery Image' },
];

const NewbornMaternityHero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [state, handleSubmit] = useForm('meebwbzz');

  useEffect(() => {
    if (state.succeeded) {
      window.location.href = '/thank-you';
    }
  }, [state.succeeded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Link href="/" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 9999,
        background: 'rgba(0,0,0,0.05)',
        backdropFilter: 'blur(10px)',
        padding: '10px 15px',
        borderRadius: '50px',
        color: '#222',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        border: '1px solid rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = 'var(--color-gold)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = '#222'; }}
      >
        <i className="fas fa-arrow-left" aria-hidden="true"></i> Home
      </Link>
    <section className="newborn-hero-section">
      <style dangerouslySetInnerHTML={{__html: `
        .newborn-hero-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 130px 8% 80px 8%;
          background-color: var(--color-black);
          min-height: 90vh;
          gap: 50px;
          position: relative;
          overflow: hidden;
        }
        
        .newborn-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .newborn-hero-overlay {
          display: none;
        }
        
        .newborn-hero-left {
          flex: 1.2;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          position: relative;
          z-index: 2;
        }
        
        .newborn-hero-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 3px;
          color: var(--color-gold);
          text-transform: uppercase;
          margin-bottom: 0.8rem;
          font-family: var(--font-heading);
        }
        
        .newborn-hero-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          line-height: 1.15;
          color: var(--color-white);
          font-weight: 500;
          margin-bottom: 1.2rem;
        }
        
        .newborn-hero-title span.accent {
          color: var(--color-gold);
          font-style: italic;
        }
        
        .newborn-hero-divider {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 1.8rem;
          width: 100%;
          max-width: 250px;
        }
        
        .newborn-hero-divider .line {
          flex: 1;
          height: 1px;
          background-color: rgba(158, 112, 96, 0.3);
        }
        
        .newborn-hero-divider .diamond {
          width: 6px;
          height: 6px;
          background-color: var(--color-gold);
          transform: rotate(45deg);
        }
        
        .newborn-hero-description {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--color-text-muted);
          margin-bottom: 2.2rem;
          font-family: var(--font-body);
        }
        
        .newborn-hero-explore-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-gold);
          color: #faf5f0;
          padding: 0.9rem 2.2rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          width: fit-content;
          font-family: var(--font-heading);
          box-shadow: 0 4px 12px rgba(158, 112, 96, 0.15);
        }
        
        .newborn-hero-explore-btn:hover {
          background-color: #83594b;
          transform: translateY(-2px);
        }
        
        .newborn-hero-explore-btn:active {
          transform: translateY(0);
        }
        
        .newborn-hero-right {
          flex: 1.2;
          max-width: 420px;
          display: flex;
          justify-content: flex-end;
          position: relative;
          z-index: 2;
        }
        
        .newborn-hero-card {
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(158, 112, 96, 0.2);
          border-radius: 16px;
          padding: 2.5rem;
          width: 100%;
          box-shadow: 0 25px 50px rgba(59, 35, 26, 0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .newborn-hero-card-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 1.6rem;
          color: var(--color-white);
          font-weight: 500;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        
        .newborn-hero-card-subtitle {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          letter-spacing: 1px;
          margin-bottom: 1rem;
          text-align: center;
          font-family: var(--font-heading);
        }
        
        .newborn-hero-card-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.8rem;
          width: 100%;
          max-width: 150px;
        }
        
        .newborn-hero-card-divider .line {
          flex: 1;
          height: 1px;
          background-color: rgba(158, 112, 96, 0.2);
        }
        
        .newborn-hero-card-divider .diamond {
          width: 5px;
          height: 5px;
          background-color: var(--color-gold);
          transform: rotate(45deg);
        }
        
        .newborn-hero-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        
        .newborn-hero-input-wrapper {
          position: relative;
          width: 100%;
        }
        
        .newborn-hero-input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-muted);
          opacity: 0.7;
          pointer-events: none;
          display: flex;
          align-items: center;
        }
        
        .newborn-hero-input {
          width: 100%;
          padding: 0.95rem 1rem 0.95rem 46px;
          border: 1px solid rgba(158, 112, 96, 0.22);
          border-radius: 8px;
          background-color: #fcfbf9;
          color: var(--color-white);
          font-family: var(--font-body);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .newborn-hero-input::placeholder {
          color: #a09088;
        }
        
        .newborn-hero-input:focus {
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px rgba(158, 112, 96, 0.12);
          background-color: #ffffff;
        }
        
        .newborn-hero-checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 0.2rem;
          margin-bottom: 0.5rem;
        }
        
        .newborn-hero-checkbox {
          width: auto !important;
          margin-top: 3px;
          cursor: pointer;
        }
        
        .newborn-hero-checkbox-label {
          font-size: 0.7rem;
          color: var(--color-text-muted);
          line-height: 1.4;
          text-align: left;
          cursor: pointer;
        }
        
        .newborn-hero-checkbox-label a {
          color: var(--color-gold);
          text-decoration: underline;
        }
        
        .newborn-hero-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-gold);
          color: #ffffff;
          padding: 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s, opacity 0.2s;
          width: 100%;
          font-family: var(--font-heading);
        }
        
        .newborn-hero-submit-btn:hover {
          background-color: #83594b;
          transform: translateY(-2px);
        }
        
        .newborn-hero-submit-btn:active {
          transform: translateY(0);
        }
        
        .newborn-hero-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        @media (max-width: 1150px) {
          .newborn-hero-section {
            padding: 120px 5% 70px 5%;
            gap: 30px;
          }
        }
        
        @media (max-width: 1024px) {
          .newborn-hero-section {
            flex-direction: column;
            padding: 110px 8% 60px 8%;
            gap: 40px;
          }
          
          .newborn-hero-left {
            max-width: 100%;
            text-align: center;
            align-items: center;
          }
          
          .newborn-hero-divider {
            margin-left: auto;
            margin-right: auto;
          }
          
          .newborn-hero-right {
            width: 100%;
            max-width: 100%;
            justify-content: center;
          }
          
          .newborn-hero-card {
            max-width: 440px;
          }

          .newborn-hero-section .newborn-hero-title,
          .newborn-hero-section .newborn-hero-title span.accent,
          .newborn-hero-section .newborn-hero-label,
          .newborn-hero-section .newborn-hero-left p {
            color: #ffffff !important;
            text-shadow: 0px 3px 8px rgba(0,0,0,0.85) !important;
          }
        }
        
        @media (max-width: 576px) {
          .newborn-hero-section {
            padding: 100px 4% 50px 4%;
            gap: 35px;
          }
          
          .newborn-hero-card {
            padding: 2rem 1.5rem;
          }
        }
      `}} />
      
      {/* Full Background Image */}
      <div className="newborn-hero-bg">
        <Image 
          src="/assets/services/newborn/newborn-and-maternity/1photo.jpeg" 
          alt="Newborn & Maternity Photography Dubai Background" 
          fill 
          sizes="100vw"
          priority
          quality={75}
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }} 
        />
        <div className="newborn-hero-overlay"></div>
      </div>

      {/* Left content block */}
      <div className="newborn-hero-left">
        <span className="newborn-hero-label">We Capture</span>
        <h1 className="newborn-hero-title">
          Newborn & <br/>
          Maternity <br/>
          <span className="accent">Photography</span> <br/>
          in Dubai
        </h1>
        <div className="newborn-hero-divider">
          <span className="line"></span>
          <span className="diamond"></span>
          <span className="line"></span>
        </div>
        <p style={{ color: 'var(--color-white)', fontSize: '1.25rem', fontWeight: '500', marginTop: '0.5rem', fontFamily: 'var(--font-heading)' }}>
          Starts from 499dhs
        </p>
      </div>
      
      {/* Right form card block */}
      <div className="newborn-hero-right">
        <div className="newborn-hero-card">
          <h3 className="newborn-hero-card-title">Book Your Session</h3>
          <span className="newborn-hero-card-subtitle">Plan Your Session</span>
          <div className="newborn-hero-card-divider">
            <span className="line"></span>
            <span className="diamond"></span>
            <span className="line"></span>
          </div>
          
          <form onSubmit={handleSubmit} className="newborn-hero-form">
            <input type="hidden" name="service" value="newborn" />
            <input type="hidden" name="message" value="Book Your Session request from Newborn & Maternity Hero page." />
            
            <div className="newborn-hero-input-wrapper">
              <span className="newborn-hero-input-icon">
                <User size={18} />
              </span>
              <label htmlFor="hero-name" className="sr-only">Your Name</label>
              <input 
                type="text" 
                name="name" 
                id="hero-name"
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Your Name" 
                required 
                className="newborn-hero-input"
              />
            </div>
            
            <div className="newborn-hero-input-wrapper">
              <span className="newborn-hero-input-icon">
                <Mail size={18} />
              </span>
              <label htmlFor="hero-email" className="sr-only">Email Address</label>
              <input 
                type="email" 
                name="email" 
                id="hero-email"
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="Email Address" 
                required 
                className="newborn-hero-input"
              />
            </div>
            
            <div className="newborn-hero-input-wrapper">
              <span className="newborn-hero-input-icon">
                <Phone size={18} />
              </span>
              <label htmlFor="hero-phone" className="sr-only">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                id="hero-phone"
                value={formData.phone} 
                onChange={handleInputChange} 
                placeholder="Phone Number" 
                required 
                className="newborn-hero-input"
              />
            </div>
            
            <div className="newborn-hero-checkbox-group">
              <input type="checkbox" id="terms-hero" required className="newborn-hero-checkbox" />
              <label htmlFor="terms-hero" className="newborn-hero-checkbox-label">
                I accept the <a href="/terms-and-conditions" target="_blank">Terms and Conditions</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>
              </label>
            </div>
            
            <button type="submit" disabled={state.submitting} className="newborn-hero-submit-btn">
              {state.submitting ? "Submitting..." : "Book Your Session"}
            </button>
          </form>
        </div>
      </div>
    </section>
    </>
  );
};

export default function NewbornMaternityPage() {
  const [activeReview, setActiveReview] = useState(0);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const footerFormRef = useRef(null);

  const scrollToForm = (e) => {
    e.preventDefault();
    footerFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openLightbox = (index) => {
    const event = new CustomEvent('lightbox-open', {
      detail: {
        galleryItems: allGalleryImages,
        startIndex: index,
      },
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* 1. Hero Section (Custom 3-Column Layout Matching Reference Image) */}
      <NewbornMaternityHero />

      {/* 1b. Trust Bar — Google Reviews + Trust Points */}
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
        {/* Google Reviews Badge */}
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

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: 'rgba(158,112,96,0.25)', flexShrink: 0 }} className="trust-bar-divider" />

        {/* Trust Points */}
        {[
          { text: '5+ Years Experience', icon: 'fas fa-award' },
          { text: 'Premium Quality', icon: 'fas fa-gem' },
          { text: 'Female Staff', icon: 'fas fa-female' },
          { text: 'Trained Photographers', icon: 'fas fa-baby' },
          { text: 'Transparent Pricing', icon: 'fas fa-wallet' }
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

      {/* 2. Newborn Photography Section */}
      <SharedServiceSection
        id="newborn"
        theme="dark"
        imageAlignment="right"
        images="/assets/services/new hero.jpeg"
        label="Cherish Your Baby's First Chapter with Our Newborn Photoshoot in Dubai"
        title="Newborn"
        description={
          <>
            There's nothing quite like the first few weeks of your baby's life—those tiny fingers, soft yawns, and peaceful sleepy smiles that seem to disappear almost as quickly as they appear.<br /><br />
            Our newborn photography sessions in Dubai are designed to capture your baby exactly as they are in these first days—calm, natural, and full of character. Our professional photographers work with patience and care inside a cozy, safe studio environment, ensuring your baby stays comfortable throughout the session while creating timeless portraits you'll cherish forever.
          </>
        }
        features={[
          { icon: Shield, title: 'Safe Handling' },
          { icon: Sparkles, title: 'Elegant Props' },
          { icon: Sun, title: 'Gentle Light' },
          { icon: Heart, title: 'Pure Art' }
        ]}
        customCta={
          <>
            <a href="https://www.instagram.com/newborn_photography_breathart?igsi=eTFzOHFhaGF0ZWpr" target="_blank" rel="noopener noreferrer" className="btn-premium btn-premium-outline">
              Explore <ArrowUpRight size={14} />
            </a>
            <Link href="/contact?interest=newborn" className="btn-premium btn-premium-filled">
              Book <ArrowUpRight size={14} />
            </Link>
          </>
        }
      />

      {/* 3. Maternity Photography Section */}
      <SharedServiceSection
        id="maternity"
        theme="light"
        imageAlignment="left"
        images="/assets/services/maternity-pink-dress.jpeg"
        imageObjectPosition="center center"
        label="Celebrate the Beauty of Motherhood"
        title="Maternity"
        description={
          <>
            There's something magical about carrying new life—the anticipation, the transformation, and the quiet connection shared before your baby takes their first breath.<br /><br />
            Our maternity photography sessions beautifully preserve this once-in-a-lifetime journey through elegant, timeless portraits. We design comfortable sessions in our studio or outdoor scenic setups that showcase this fleeting, beautiful chapter.
          </>
        }
        features={[
          { icon: Sparkles, title: 'Couture Gowns', sub: 'Curated silks included' },
          { icon: Sun, title: 'Guided Posing', sub: 'Highlight natural glow' },
          { icon: Shield, title: 'Private Comfort', sub: 'Dedicated touchup space' },
          { icon: Heart, title: 'Family Welcome', sub: 'Partners & siblings join' }
        ]}
        buttonText="Reserve Shoot"
        onButtonClick={scrollToForm}
      />

      {/* 4. Gallery Section (Premium 5-Column Bento Grid with Rounded Corners) */}
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .portfolio-gallery-grid {
            display: flex;
            gap: 16px;
            width: 100%;
            margin-top: 2.5rem;
          }
          
          .portfolio-col {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          
          .portfolio-col-split {
            flex: 1.15;
          }
          
          .portfolio-item {
            position: relative;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            cursor: pointer;
            background-color: var(--color-shade-2);
            box-shadow: 0 8px 24px rgba(59, 35, 26, 0.04);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          }
          
          .portfolio-item img {
            transition: transform 0.6s ease !important;
          }
          
          .portfolio-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 36px rgba(59, 35, 26, 0.1);
          }
          
          .portfolio-item:hover img {
            transform: scale(1.05) !important;
          }
          
          .portfolio-col-tall .portfolio-item {
            height: 480px;
          }
          
          .portfolio-col-split .item-tall {
            height: 282px;
          }
          
          .portfolio-col-split .item-short {
            height: 182px;
          }

          /* Mobile masonry grid - hidden on desktop */
          .portfolio-masonry-mobile {
            display: none;
          }
          
          @media (max-width: 1024px) {
            .portfolio-gallery-grid {
              display: flex;
              gap: 10px;
              width: 100%;
            }
            .portfolio-col {
              display: flex;
              flex-direction: column;
              gap: 10px;
              flex: 1;
              min-width: 0;
            }
            .portfolio-item {
              border-radius: 8px;
            }
            .portfolio-col-tall .portfolio-item {
              height: 340px;
            }
            .portfolio-col-split .item-tall {
              height: 200px;
            }
            .portfolio-col-split .item-short {
              height: 130px;
            }
          }
          
          @media (max-width: 768px) {
            /* Hide the desktop bento grid on mobile */
            .portfolio-gallery-grid {
              display: none !important;
            }
            
            /* Show mobile masonry grid */
            .portfolio-masonry-mobile {
              display: flex;
              gap: 4px;
              width: 100%;
              margin-top: 1.5rem;
            }
            
            .masonry-col {
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 4px;
              min-width: 0;
            }
            
            .masonry-item {
              position: relative;
              width: 100%;
              overflow: hidden;
              cursor: pointer;
              border-radius: 3px;
              background-color: var(--color-shade-2);
            }
            
            .masonry-item img {
              display: block;
              width: 100%;
              height: auto;
            }
          }

          .all-gallery-expanded-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
            margin-top: 16px;
            width: 100%;
          }
          .all-gallery-expanded-grid .portfolio-item {
            height: 250px;
          }
          @media (max-width: 1024px) {
            .all-gallery-expanded-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 10px;
            }
            .all-gallery-expanded-grid .portfolio-item {
              height: 180px;
            }
          }
          @media (max-width: 768px) {
            .all-gallery-expanded-grid {
              display: none !important;
            }
            .all-gallery-expanded-masonry {
              display: flex;
              gap: 4px;
              width: 100%;
              margin-top: 4px;
            }
            .all-gallery-expanded-masonry .masonry-col {
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 4px;
              min-width: 0;
            }
            .all-gallery-expanded-masonry .masonry-item {
              position: relative;
              width: 100%;
              overflow: hidden;
              cursor: pointer;
              border-radius: 3px;
              background-color: var(--color-shade-2);
            }
            .all-gallery-expanded-masonry .masonry-item img {
              display: block;
              width: 100%;
              height: auto;
            }
          }
          @media (min-width: 769px) {
            .all-gallery-expanded-masonry {
              display: none !important;
            }
          }
        `}} />
        <div className="container">
          <div className="section-header animate-reveal active">
            <span className="cinematic-title">Aesthetic Showcase</span>
            <h2 className="section-title">Newborn &amp; Maternity Gallery</h2>
            <div className="accent-divider"></div>
          </div>
          
          <div className="portfolio-gallery-grid">
            {/* Column 1 - Tall */}
            <div className="portfolio-col portfolio-col-tall">
              <div className="portfolio-item" onClick={() => openLightbox(0)}>
                <Image 
                  src="/assets/services/newborn/newborn-and-maternity/1photo.jpeg" 
                  alt="Newborn Portrait" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 20vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            
            {/* Column 2 - Split */}
            <div className="portfolio-col portfolio-col-split">
              <div className="portfolio-item item-tall" onClick={() => openLightbox(1)}>
                <Image 
                  src="/assets/services/newborn/newborn-and-maternity/2 photo.jpeg" 
                  alt="Newborn Portrait" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 20vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="portfolio-item item-short" onClick={() => openLightbox(2)}>
                <Image 
                  src="/assets/services/newborn/newborn-and-maternity/3photo.jpeg" 
                  alt="Newborn Portrait" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 20vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            
            {/* Column 3 - Tall */}
            <div className="portfolio-col portfolio-col-tall">
              <div className="portfolio-item" onClick={() => openLightbox(3)}>
                <Image 
                  src="/assets/services/newborn/newborn-and-maternity/5th photo.jpeg" 
                  alt="Newborn Portrait" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 20vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            
            {/* Column 4 - Split */}
            <div className="portfolio-col portfolio-col-split">
              <div className="portfolio-item item-tall" onClick={() => openLightbox(4)}>
                <Image 
                  src="/assets/services/newborn/newborn-and-maternity/6photo.jpeg" 
                  alt="Newborn Portrait" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 20vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="portfolio-item item-short" onClick={() => openLightbox(5)}>
                <Image 
                  src="/assets/services/newborn/newborn-and-maternity/7phpto.jpeg" 
                  alt="Newborn Portrait" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 20vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            
            {/* Column 5 - Tall */}
            <div className="portfolio-col portfolio-col-tall">
              <div className="portfolio-item" onClick={() => openLightbox(6)}>
                <Image 
                  src="/assets/services/newborn/newborn-and-maternity/8th.jpeg" 
                  alt="Newborn Portrait" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 20vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Mobile Masonry Grid - 3 columns like Pinterest */}
          <div className="portfolio-masonry-mobile">
            {/* Column 1 */}
            <div className="masonry-col">
              <div className="masonry-item" onClick={() => openLightbox(0)}>
                <Image 
                  src={allGalleryImages[0].src}
                  alt={allGalleryImages[0].title}
                  width={400} height={550}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(3)}>
                <Image 
                  src={allGalleryImages[3].src}
                  alt={allGalleryImages[3].title}
                  width={400} height={300}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(6)}>
                <Image 
                  src={allGalleryImages[6].src}
                  alt={allGalleryImages[6].title}
                  width={400} height={550}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(9)}>
                <Image 
                  src={allGalleryImages[9].src}
                  alt={allGalleryImages[9].title}
                  width={400} height={500}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
            {/* Column 2 */}
            <div className="masonry-col">
              <div className="masonry-item" onClick={() => openLightbox(1)}>
                <Image 
                  src={allGalleryImages[1].src}
                  alt={allGalleryImages[1].title}
                  width={400} height={450}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(4)}>
                <Image 
                  src={allGalleryImages[4].src}
                  alt={allGalleryImages[4].title}
                  width={400} height={500}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(7)}>
                <Image 
                  src={allGalleryImages[7].src}
                  alt={allGalleryImages[7].title}
                  width={400} height={400}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(10)}>
                <Image 
                  src={allGalleryImages[10].src}
                  alt={allGalleryImages[10].title}
                  width={400} height={500}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(13)}>
                <Image 
                  src={allGalleryImages[13].src}
                  alt={allGalleryImages[13].title}
                  width={400} height={450}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
            {/* Column 3 */}
            <div className="masonry-col">
              <div className="masonry-item" onClick={() => openLightbox(2)}>
                <Image 
                  src={allGalleryImages[2].src}
                  alt={allGalleryImages[2].title}
                  width={400} height={500}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(5)}>
                <Image 
                  src={allGalleryImages[5].src}
                  alt={allGalleryImages[5].title}
                  width={400} height={450}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(8)}>
                <Image 
                  src={allGalleryImages[8].src}
                  alt={allGalleryImages[8].title}
                  width={400} height={500}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(11)}>
                <Image 
                  src={allGalleryImages[11].src}
                  alt={allGalleryImages[11].title}
                  width={400} height={500}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="masonry-item" onClick={() => openLightbox(14)}>
                <Image 
                  src={allGalleryImages[14].src}
                  alt={allGalleryImages[14].title}
                  width={400} height={450}
                  sizes="33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Desktop expanded gallery */}
          {showAllGallery && (
            <div className="all-gallery-expanded-grid">
              {allGalleryImages.slice(7).map((item, idx) => (
                <div key={idx} className="portfolio-item" onClick={() => openLightbox(idx + 7)} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Mobile expanded masonry gallery */}
          {showAllGallery && (
            <div className="all-gallery-expanded-masonry">
              {[0, 1, 2].map(colIdx => (
                <div key={colIdx} className="masonry-col">
                  {allGalleryImages.slice(15).filter((_, i) => i % 3 === colIdx).map((item, idx) => {
                    const originalIdx = 15 + (idx * 3 + colIdx);
                    return (
                      <div key={idx} className="masonry-item" onClick={() => openLightbox(originalIdx)}>
                        <Image 
                          src={item.src} 
                          alt={item.title} 
                          width={400} height={500}
                          sizes="33vw"
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              onClick={() => setShowAllGallery(!showAllGallery)} 
              className="btn-premium btn-premium-filled"
              style={{ cursor: 'pointer', backgroundColor: '#9a9187', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 32px', fontSize: '14px', letterSpacing: '1px', fontWeight: 'bold' }}
            >
              {showAllGallery ? 'VIEW LESS' : 'VIEW MORE'}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Google Reviews (Star/Testimonial Slider) */}
      <TestimonialsSlider 
        theme="dark" 
        reviews={testimonials.map(t => ({ ...t, rating: 5 }))} 
        title="Client Love" 
        subtitle={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
            <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '3.8rem', fontWeight: 'bold', letterSpacing: '-2.5px', lineHeight: '1' }}>
              <span style={{ color: '#4285F4' }}>G</span>
              <span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC05' }}>o</span>
              <span style={{ color: '#4285F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span>
              <span style={{ color: '#EA4335' }}>e</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={32} fill="#FBBC05" color="#FBBC05" />)}
            </div>
          </div>
        }
      />



      {/* 8. Baby Hand & Foot Casting (Supporting service) */}
      <section id="baby-casting" className="section" style={{ background: 'var(--color-shade-1)', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4rem',
            alignItems: 'center'
          }} className="services-alternate-row">
            {/* Left Content */}
            <div style={{ flex: '1 1 450px' }}>


              {/* The Studio Comes To You Callout */}
              <div style={{ 
                marginBottom: '2.5rem', 
                padding: '1.5rem', 
                background: 'rgba(158, 112, 96, 0.05)', 
                borderLeft: '3px solid var(--color-gold)',
                borderRadius: '0 8px 8px 0'
              }}>
                <h4 style={{ color: 'var(--color-white)', fontSize: '1.15rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                  The studio comes to you!
                </h4>
                <p style={{ color: 'var(--color-gold)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Can’t visit our studio? No worries!
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                  Our professional photography team will come to your home, on time, with everything needed for a beautiful photoshoot.
                </p>
                <p style={{ color: 'var(--color-white)', fontSize: '0.95rem', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Professional photography. At your doorstep.
                </p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Single Window Frame
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Elegant single cast presentation.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Double Window Frame
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Perfect side-by-side hand and foot cast.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Triple Window Frame
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Three windows for casting and portrait.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Custom Designs Available
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Bespoke frames tailored to your style.</p>
                </div>
              </div>

              <a href="#contact-section" onClick={scrollToForm} className="btn-premium btn-premium-outline" style={{ padding: '1rem 2rem', letterSpacing: '2px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Enquire Now
              </a>
            </div>

            {/* Right Product Image */}
            <div style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: '550px',
                border: '1px solid rgba(158, 112, 96, 0.25)'
              }}>
                <Image
                  src="/assets/services/team.jpeg"
                  alt="3D Hand & Foot Casting Keepsake"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 550px"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-section" ref={footerFormRef} className="section" style={{
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
                initialMessage="I am interested in a maternity/newborn photography session."
              />
            </div>

          </div>
        </div>
      </section>

      <Lightbox />
    </>
  );
}
