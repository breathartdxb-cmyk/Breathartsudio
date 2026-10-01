'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactForm from '../../../components/ContactForm';

const slides = [
  {
    id: 1,
    image: '/assets/hero/photo.png',
    tag: 'love',
    title1: 'BONDING',
    title2: 'TOGETHER',
    desc1: 'Memories that are forever',
    desc2: 'Smile for miles',
    link: '/contact',
    align: 'right',
    objectPosition: 'center 35%'
  },
  {
    id: 2,
    image: '/assets/hero/2_optimized.webp',
    tag: '',
    title1: 'MADE TO',
    title2: 'GROW',
    desc1: 'Feel the moment.',
    desc2: 'Let the images do the talking.',
    link: '/contact'
  },
  {
    id: 3,
    image: '/assets/hero/3_optimized.webp',
    tag: 'love',
    title1: 'MADE WITH',
    title2: 'LOVE',
    desc1: 'Live inside your best moments',
    desc2: 'Because we want you to',
    desc3: 'remember them forever',
    link: '/contact',
    align: 'right'
  },
  {
    id: 4,
    image: '/assets/hero/4_optimized.webp',
    tag: 'art',
    title1: 'CAPTURING',
    title2: 'LIFE',
    desc1: 'Timeless imagery',
    desc2: 'For your legacy',
    link: '/contact'
  }
];

export default function HeroSlider({ 
  showContactForm = false, 
  leftAlignOnly = false, 
  slides: customSlides, 
  buttonText = "Book Your Session",
  showServiceField = true,
  showPackageField = false,
  initialService
}) {
  const activeSlides = customSlides || slides;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  return (
    <section className="hero-slider">
      {activeSlides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div className={`hero-slide-bg ${slide.align === 'right' && !leftAlignOnly ? 'align-right' : ''}`}>
            <Image 
              src={slide.image} 
              alt={slide.title1} 
              fill 
              sizes="100vw"
              quality={60}
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              style={{ objectFit: 'cover', objectPosition: slide.objectPosition || 'center' }} 
            />
            <div className="hero-slide-overlay"></div>
          </div>
          <div className={`hero-slide-content ${slide.align === 'right' && !leftAlignOnly ? 'align-right' : ''}`}>
            <div className="content-inner">
              {slide.tag && <div className="slide-tag">{slide.tag}</div>}
              <h1 className="slide-title">
                <span>{slide.title1}</span>
                <span>{slide.title2}</span>
              </h1>
              <div className="slide-desc">
                <p>{slide.desc1}</p>
                <p>{slide.desc2}</p>
                {slide.desc3 && <p>{slide.desc3}</p>}
              </div>
              <div className="slide-btn-wrapper">
                <Link href={slide.link || '#'} className="slide-btn">
                  CONTACT
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {showContactForm && (
        <div className="static-hero-contact">
          <div className="hero-contact-inner">
            <h3 className="hero-contact-title">Book Your Session</h3>
            <p className="hero-contact-desc">Fill in your details below and we will get back to you shortly.</p>
            <ContactForm 
              theme="cinematic" 
              buttonText={buttonText} 
              showPackageField={showPackageField} 
              showServiceField={showServiceField} 
              initialService={initialService}
            />
          </div>
        </div>
      )}
      
      <div className="scroll-indicator-wrapper">
        <div className="scroll-indicator-mouse">
          <div className="scroll-indicator-wheel"></div>
        </div>
      </div>
    </section>
  );
}
