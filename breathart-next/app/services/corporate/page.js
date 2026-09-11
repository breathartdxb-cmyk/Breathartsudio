'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Sun, Heart, Star, Camera, Check, ArrowRight, Phone, MessageSquare, ArrowUpRight, User, Mail, Briefcase, Building, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useForm } from '@formspree/react';

const HomeLightbox = dynamic(() => import('../../(home)/components/HomeLightbox'));
const Lightbox = dynamic(() => import('../../(home)/components/Lightbox'));
const ContactForm = dynamic(() => import('../../../components/ContactForm'));
const TestimonialsSlider = dynamic(() => import('../../../components/TestimonialsSlider'));
import SharedServiceSection from '../../../components/SharedServiceSection';

const ServiceAutoSlider = ({ images, objectPosition = "center" }) => {
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
            alt="Service gallery preview"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const testimonials = [
  {
    id: 1,
    text: "We hired BreathArt to shoot headshots for our board members and photographs of our new offices. The quality of editing was top-notch, elevating our professional visual brand.",
    author: "Operations Director",
    location: "DIFC Dubai"
  },
  {
    id: 2,
    text: "As a luxury real estate agency, high-quality images are critical. BreathArt's spatial photography captures our listings' layout and lighting perfectly, driving direct client leads.",
    author: "Managing Partner",
    location: "Palm Jumeirah"
  },
  {
    id: 3,
    text: "The team at BreathArt exceeded our expectations. The corporate headshots captured our team's personality perfectly, and the turnaround time was incredibly fast. Highly recommended!",
    author: "Marketing Manager",
    location: "Business Bay"
  }
];

const CorporateRealEstateHero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [state, handleSubmit] = useForm('meebwbzz'); // Use same form endpoint or replace

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
      <Link href="/" className="corp-back-btn" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)',
        padding: '10px 15px',
        borderRadius: '50px',
        color: '#fff',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        border: '1px solid rgba(255,255,255,0.3)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
      >
        <i className="fas fa-arrow-left"></i> Home
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
          max-width: 500px;
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
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 3.5vw, 3.2rem);
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
          font-family: 'Playfair Display', serif;
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
        }
        
        @media (max-width: 576px) {
          .newborn-hero-section {
            padding: 90px 4% 50px 4%;
            gap: 30px;
            min-height: auto;
          }
          
          .newborn-hero-card {
            padding: 2rem 1.2rem;
          }

          .newborn-hero-card-title {
            font-size: 1.3rem;
          }

          .newborn-hero-explore-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 400px) {
          .newborn-hero-section {
            padding: 85px 3% 40px 3%;
            gap: 25px;
          }
          .newborn-hero-card {
            padding: 1.5rem 1rem;
          }
          .newborn-hero-title {
            font-size: clamp(1.6rem, 9vw, 2.2rem);
          }
        }
      `}} />
      
      {/* Full Background Image Slider */}
      <div className="newborn-hero-bg">
        <ServiceAutoSlider 
          objectPosition="center 25%"
          images={[
            '/assets/services/corporate/headway-F2KRf_QfCqw-unsplash.jpg',
            '/assets/services/corporate/campaign-creators-gMsnXqILjp4-unsplash.jpg',
            '/assets/services/corporate/vitaly-gariev-grbDcbyo9nU-unsplash.jpg',
            '/assets/services/corporate/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg'
          ]} 
        />
        <div className="newborn-hero-overlay" style={{display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', zIndex: 1}}></div>
      </div>

      {/* Left content block */}
      <div className="newborn-hero-left">
        <span className="newborn-hero-label">Professional Branding</span>
        <h1 className="newborn-hero-title">
          Corporate <br/>
          Headshots & <br/>
          <span className="accent">Event</span> <br/>
          Photography
        </h1>
        <div className="newborn-hero-divider">
          <span className="line"></span>
          <span className="diamond"></span>
          <span className="line"></span>
        </div>
        <p className="newborn-hero-description" style={{color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
          Professional corporate headshots, branding, and event photography in Dubai designed to showcase your people and brand with a polished, professional look.
        </p>
        <a 
          href="#why-choose-us" 
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('why-choose-us')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="newborn-hero-explore-btn"
        >
          Explore Services
        </a>
      </div>
      
      {/* Right form card block */}
      <div className="newborn-hero-right">
        <div className="newborn-hero-card">
          <h3 className="newborn-hero-card-title">Book Your Session</h3>
          <span className="newborn-hero-card-subtitle">Plan Your Shoot</span>
          <div className="newborn-hero-card-divider">
            <span className="line"></span>
            <span className="diamond"></span>
            <span className="line"></span>
          </div>
          
          <form onSubmit={handleSubmit} className="newborn-hero-form">
            <input type="hidden" name="service" value="corporate" />
            <input type="hidden" name="message" value="Corporate Booking request from Hero." />
            
            <div className="newborn-hero-input-wrapper">
              <span className="newborn-hero-input-icon">
                <User size={18} />
              </span>
              <input 
                type="text" 
                name="name" 
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
              <input 
                type="email" 
                name="email" 
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
              <input 
                type="tel" 
                name="phone" 
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

export default function CorporateRealEstatePage() {
  const [activeReview, setActiveReview] = useState(0);
  const footerFormRef = useRef(null);

  const scrollToForm = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (footerFormRef.current) {
      footerFormRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const corporateGalleryItems = [
    { src: '/assets/services/corporate/linkedin-sales-solutions-NpyF7rjqmq4-unsplash.jpg', title: 'Corporate Headshots', pos: '18% 25%' },
    { src: '/assets/services/corporate/christina-wocintechchat-com-m-SJvDxw0azqw-unsplash.jpg', title: 'Executive Portraits', pos: 'center 15%' },
    { src: '/assets/services/corporate/campaign-creators-gMsnXqILjp4-unsplash.jpg', title: 'Team Collaboration', pos: 'center center' },
    { src: '/assets/services/corporate/vitaly-gariev-grbDcbyo9nU-unsplash.jpg', title: 'Corporate Professional', pos: 'center 20%' },
    { src: '/assets/services/corporate/headway-F2KRf_QfCqw-unsplash.jpg', title: 'Conference & Presentation', pos: 'center center' },
    { src: '/assets/services/corporate/microsoft-365-7mBictB_urk-unsplash.jpg', title: 'Workplace & Executive', pos: 'center 15%' },
    { src: '/assets/services/corporate/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg', title: 'Corporate Keynote Event', pos: 'center 30%' },
    { src: '/assets/services/corporate/bruce-mars-8YG31Xn4dSw-unsplash.jpg', title: 'Boardroom Meeting', pos: 'center center' },
    { src: '/assets/services/corporate/daria-pimkina-tYaccl19A3Q-unsplash.jpg', title: 'Creative Studio Office', pos: 'center center' }
  ];

  const openLightbox = (index) => {
    const event = new CustomEvent('lightbox-open', {
      detail: {
        galleryItems: corporateGalleryItems,
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
      {/* Global Responsive Styles for this page */}
      <style dangerouslySetInnerHTML={{__html: `
        /* ── Trust Bar ── */
        @media (max-width: 640px) {
          .corp-trust-bar {
            gap: 0.8rem !important;
            padding: 1rem 4% !important;
          }
          .corp-trust-bar .trust-bar-divider {
            display: none !important;
          }
          .corp-trust-bar .trust-item {
            font-size: 0.65rem !important;
          }
        }

        /* ── Hero Back Button ── */
        @media (max-width: 480px) {
          .corp-back-btn {
            top: 12px !important;
            left: 12px !important;
            padding: 7px 12px !important;
            font-size: 0.7rem !important;
          }
        }

        /* ── Hero Title Clamp for very small screens ── */
        @media (max-width: 400px) {
          .newborn-hero-title {
            font-size: clamp(1.7rem, 8vw, 2.5rem) !important;
          }
        }

        /* ── Why Choose Us ── */
        @media (max-width: 768px) {
          .why-choose-row {
            flex-direction: column !important;
            gap: 2rem !important;
          }
          .why-choose-left, .why-choose-right {
            flex: 1 1 100% !important;
            width: 100% !important;
          }
          .why-choose-img-container {
            height: 280px !important;
            max-width: 100% !important;
          }
          .why-choose-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .why-choose-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .why-choose-img-container {
            height: 220px !important;
          }
        }

        /* ── Gallery ── */
        @media (max-width: 480px) {
          .portfolio-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .gallery-responsive-section {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
        }

        /* ── Contact / Footer Section ── */
        @media (max-width: 768px) {
          .corp-contact-section {
            padding-top: 4rem !important;
            padding-bottom: 5rem !important;
          }
          .corp-contact-row {
            flex-direction: column !important;
            gap: 2.5rem !important;
          }
          .corp-contact-left, .corp-contact-right {
            flex: 1 1 100% !important;
            width: 100% !important;
          }
          .corp-contact-right {
            padding: 2rem 1.5rem !important;
          }
        }

        /* ── Section Containers ── */
        @media (max-width: 576px) {
          .container {
            padding-left: 1.2rem !important;
            padding-right: 1.2rem !important;
          }
          .section {
            padding-top: 3.5rem !important;
            padding-bottom: 3.5rem !important;
          }
        }

        /* ── SharedServiceSection text padding ── */
        @media (max-width: 576px) {
          [class*="shared-grid-text-col-"] {
            padding: 2.5rem 1.2rem !important;
          }
          [class*="shared-grid-image-wrapper-"] {
            min-height: 280px !important;
          }
        }

        /* ── Testimonials section ── */
        @media (max-width: 576px) {
          .testimonials-section {
            padding: 3rem 1rem !important;
          }
        }

        /* ── Prevent horizontal overflow ── */
        .newborn-hero-section, section, div {
          max-width: 100%;
        }
      `}} />

      {/* 1. Hero Section */}
      <CorporateRealEstateHero />

      {/* 1b. Trust Bar */}
      <div className="corp-trust-bar" style={{
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
          { text: '5+ Years of Experience', icon: 'fas fa-award' },
          { text: 'Premium Quality', icon: 'fas fa-gem' },
          { text: 'Professional Photographers', icon: 'fas fa-camera' },
          { text: 'Transparent Pricing', icon: 'fas fa-wallet' }
        ].map((tp, idx) => (
          <div key={idx} className="trust-item" style={{
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

      {/* 1b. WHY CHOOSE US */}
      <section id="why-choose-us" className="section why-choose-section" style={{ background: 'var(--color-shade-1)', padding: '5.5rem 0' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .why-choose-row {
            display: flex;
            flex-wrap: wrap;
            gap: 4rem;
            align-items: center;
          }
          .why-choose-left {
            flex: 1 1 450px;
          }
          .why-choose-right {
            flex: 1 1 450px;
            display: flex;
            justify-content: center;
            width: 100%;
          }
          .why-choose-img-container {
            width: 100%;
            max-width: 550px;
            height: 450px;
            position: relative;
            border: 1px solid rgba(158, 112, 96, 0.25);
            border-radius: 4px;
            overflow: hidden;
          }
          .why-choose-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2.5rem;
          }
          @media (max-width: 900px) {
            .why-choose-section {
              padding: 4rem 0 !important;
            }
            .why-choose-row {
              gap: 2.5rem;
            }
            .why-choose-img-container {
              height: 340px;
              max-width: 100%;
            }
          }
          @media (max-width: 576px) {
            .why-choose-section {
              padding: 3.5rem 0 !important;
            }
            .why-choose-left {
              flex: 1 1 100%;
            }
            .why-choose-right {
              flex: 1 1 100%;
            }
            .why-choose-grid {
              grid-template-columns: 1fr;
              gap: 1.2rem;
              margin-bottom: 2rem;
            }
            .why-choose-img-container {
              height: 260px;
            }
          }
        `}} />
        <div className="container">
          <div className="why-choose-row">
            {/* Left Content */}
            <div className="why-choose-left">
              <span className="cinematic-title" style={{ color: 'var(--color-gold)', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
                Why Choose Us
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                color: 'var(--color-white)',
                marginTop: '0.5rem',
                marginBottom: '1.5rem',
                lineHeight: 1.15
              }}>
                Professional Photography, Tailored to Your Brand
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Whether you need corporate headshots or real estate photography, our experienced photographers deliver professional images that match your brand, style, and requirements.
              </p>
              
              <div className="why-choose-grid">
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <i className="fas fa-camera" style={{ color: 'var(--color-gold)', marginRight: '8px' }}></i>
                    Experienced Photographers
                  </h4>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <i className="fas fa-video" style={{ color: 'var(--color-gold)', marginRight: '8px' }}></i>
                    Professional Equipment
                  </h4>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <i className="fas fa-building" style={{ color: 'var(--color-gold)', marginRight: '8px' }}></i>
                    Studio & On-Location
                  </h4>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <i className="fas fa-magic" style={{ color: 'var(--color-gold)', marginRight: '8px' }}></i>
                    High-Quality Editing
                  </h4>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <i className="fas fa-calendar" style={{ color: 'var(--color-gold)', marginRight: '8px' }}></i>
                    Flexible Scheduling
                  </h4>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <i className="fas fa-bolt" style={{ color: 'var(--color-gold)', marginRight: '8px' }}></i>
                    Fast Turnaround
                  </h4>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <a 
                  href="#contact-section" 
                  onClick={scrollToForm} 
                  className="btn-premium btn-premium-filled"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Enquire Now <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Right Product Image */}
            <div className="why-choose-right">
              <div className="why-choose-img-container">
                <Image
                  src="/assets/services/corporate/headway-F2KRf_QfCqw-unsplash.jpg"
                  alt="Professional Corporate Photography Studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE PHOTOGRAPHY OVERVIEW */}
      <SharedServiceSection
        id="corporate-overview"
        theme="dark"
        imageAlignment="right"
        images={[
          '/assets/services/corporate/vitaly-gariev-grbDcbyo9nU-unsplash.jpg',
          '/assets/services/corporate/campaign-creators-gMsnXqILjp4-unsplash.jpg',
          '/assets/services/corporate/christina-wocintechchat-com-m-SJvDxw0azqw-unsplash.jpg'
        ]}
        label="Professional Photography for People & Brands"
        title="Corporate Photography"
        description={
          <>
            From professional corporate headshots and team photography to executive portraits in Dubai, we create high-quality images that make a strong first impression.<br /><br />
            Our corporate photography services are ideal for LinkedIn profiles, company websites, employee profiles, marketing materials, and business branding. We help you reflect the professionalism, culture, and personality of your business.
          </>
        }
        features={[
          { icon: User, title: 'Corporate Headshots', sub: 'Professional & polished' },
          { icon: Briefcase, title: 'Team & Executive', sub: 'LinkedIn & business portraits' },
          { icon: Sun, title: 'Brand Story', sub: 'Visual identity' },
          { icon: Zap, title: 'Fast Delivery', sub: 'Quick turnaround' }
        ]}
        buttonText="Enquire Now"
        onButtonClick={scrollToForm}
      />

      {/* 3. EXECUTIVE PORTRAITS */}
      <SharedServiceSection
        id="corporate-headshots"
        theme="light"
        imageAlignment="left"
        images={[
          '/assets/services/corporate/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.jpg',
          '/assets/services/corporate/bruce-mars-8YG31Xn4dSw-unsplash.jpg',
          '/assets/services/corporate/hunters-race-MYbhN8KaaEc-unsplash.jpg'
        ]}
        imageObjectPosition="center center"
        label="Professional Corporate Headshots in Dubai"
        title="Executive Portraits"
        description={
          <>
            Corporate headshot photography in Dubai focuses on clean lighting, natural expressions, and polished portraits that represent you and your business with confidence.<br /><br />
            Beyond photography, we offer complete corporate video production Dubai services — from company profile videos and executive interviews to promotional and training content. Perfect for executives, employees, entrepreneurs, LinkedIn profiles, company websites, and professional branding.
          </>
        }
        buttonText="Enquire Now"
        onButtonClick={scrollToForm}
      />

      {/* 2. SERVICES SECTION */}
      <section className="section" style={{ background: 'var(--color-black)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="cinematic-title" style={{ color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              Our Expertise
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: 'var(--color-white)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Corporate Photography Services
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <SharedServiceSection
              id="corporate-headshots-portraits"
              theme="dark"
              imageAlignment="left"
              images="/assets/services/corporate/linkedin-sales-solutions-NpyF7rjqmq4-unsplash.jpg"
              imageObjectPosition="18% 25%"
              title="Corporate Headshots & Portraits"
              description="Professional, polished headshots for LinkedIn, company websites, and press releases. Whether in our studio or at your office, we ensure your team looks approachable, confident, and perfectly aligned with your brand image."
              features={[
                { icon: Camera, title: "Studio or On-Location Setup" },
                { icon: User, title: "Individual & Team Portraits" },
                { icon: Briefcase, title: "LinkedIn & Executive Headshots" },
                { icon: Sparkles, title: "Professional Retouching" }
              ]}
              onButtonClick={scrollToForm}
            />
            
            <SharedServiceSection
              id="corporate-branding"
              theme="light"
              imageAlignment="right"
              images="/assets/services/corporate/campaign-creators-gMsnXqILjp4-unsplash.jpg"
              imageObjectPosition="center center"
              title="Corporate Branding & Team"
              description="Showcase your company culture and team dynamic. We capture candid, collaborative moments in the workplace, perfect for recruitment, annual reports, and website storytelling."
              features={[
                { icon: Building, title: "Office Culture & Environment" },
                { icon: User, title: "Team Collaboration Shots" },
                { icon: Briefcase, title: "Boardroom & Meeting Coverage" },
                { icon: Sun, title: "Brand Storytelling" }
              ]}
              onButtonClick={scrollToForm}
            />
            
            <SharedServiceSection
              id="corporate-events"
              theme="dark"
              imageAlignment="left"
              images="/assets/services/corporate/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg"
              imageObjectPosition="center 30%"
              title="Corporate Events & Conferences"
              description="Comprehensive coverage for your corporate events, from intimate seminars to large-scale conferences. We capture keynote speakers, networking moments, and the overall atmosphere."
              features={[
                { icon: Briefcase, title: "Conferences & Seminars" },
                { icon: Star, title: "Gala Dinners & Award Ceremonies" },
                { icon: Sparkles, title: "Product Launches" },
                { icon: Zap, title: "Fast Turnaround for PR" }
              ]}
              onButtonClick={scrollToForm}
            />
          </div>
        </div>
      </section>

      {/* 4. GALLERY PREVIEW */}
      <section className="section gallery-responsive-section" style={{ background: 'var(--color-shade-1)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="cinematic-title" style={{ color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              Portfolio
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: 'var(--color-white)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Corporate Gallery
            </h2>
          </div>
          
          <div className="portfolio-gallery-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px'
          }}>
            {corporateGalleryItems.slice(0, 8).map((item, index) => (
              <div 
                key={index} 
                onClick={() => openLightbox(index)}
                style={{ 
                  position: 'relative', 
                  aspectRatio: '1/1',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: '2px'
                }}
                className="gallery-item-hover"
              >
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(0,0,0,0.2)',
                  zIndex: 1,
                  transition: 'background 0.3s ease'
                }} className="gallery-overlay"></div>
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover', objectPosition: item.pos || 'center center' }}
                />
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
            <button 
              onClick={() => openLightbox(0)}
              className="btn-premium btn-premium-outline"
              style={{ padding: '0.85rem 2.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              View Full Gallery
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

      {/* 6. FOOTER ENQUIRY SECTION */}
      <section id="contact-section" ref={footerFormRef} className="section corp-contact-section" style={{
        borderTop: '1px solid rgba(158, 112, 96, 0.15)',
        paddingTop: '6rem',
        paddingBottom: '8rem',
        background: 'var(--color-black)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="corp-contact-row services-alternate-row" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4rem',
            alignItems: 'start'
          }}>

            {/* Left Column CTA */}
            <div className="corp-contact-left" style={{ flex: '1 1 350px' }}>
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
                Let's Create Professional Images for Your Business
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Whether you need corporate headshots, team photography, or event coverage in Dubai, we're ready to bring your vision to life.
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
            <div className="corp-contact-right connect-inner-mobile" style={{
              flex: '1 1 450px',
              background: 'var(--color-shade-2)',
              padding: '3.5rem',
              borderRadius: '0px',
              border: '1px solid rgba(158, 112, 96, 0.15)',
              boxShadow: '0 20px 40px rgba(43, 27, 20, 0.05)'
            }}>
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
                buttonText="Book Now"
                showServiceField={true}
                showPackageField={false}
                showDetailsField={false}
                initialMessage="I am interested in corporate/real estate photography."
                initialService="corporate_shoots"
                sessionOptions={[
                  { value: "corporate_shoots", label: "Corporate shoots" },
                  { value: "executive_headshot", label: "Executive Headshot" },
                  { value: "corporate_events", label: "Corporate events" },
                  { value: "brand_marketing", label: "Brand & marketing photography" },
                  { value: "linkedin_branding", label: "LinkedIn & personal branding" },
                  { value: "product_service", label: "Product/service photography" }
                ]}
              />
            </div>

          </div>
        </div>
      </section>

      <Lightbox />
    </>
  );
}
