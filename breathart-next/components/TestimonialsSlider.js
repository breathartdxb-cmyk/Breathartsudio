'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const defaultReviews = [
  { id: 1, text: "Breathart Studio captured every moment of our wedding so beautifully. We couldn't have asked for a better experience!", author: "Anjali & Rohit", rating: 5, location: "Dubai Dunes & Resort", image: "/assets/gallery/family/bk-279-suhad.webp" },
  { id: 2, text: "Professional, creative and so passionate - they truly have a talent for turning moments into memories.", author: "Megha & Arjun", rating: 5, location: "Downtown Palace Hotel", image: "/assets/gallery/family/nb-360-kat.webp" },
  { id: 3, text: "The photos are simply magical. They made us so comfortable and the results are timeless.", author: "Sneha & Karan", rating: 5, location: "Jumeirah Beach Club", image: "/assets/gallery/family/bk-102-taise.webp" },
  { id: 4, text: "The most beautiful experience! They handled our 7-day-old baby with such care and patience. The pictures turned out absolutely stunning!", author: "Sarah & Khalid", rating: 5, location: "Dubai Marina Studio", image: "/assets/gallery/family/IMG_9770.webp" },
  { id: 5, text: "As a first-time mother, I was very nervous about my maternity shoot. The team at BreathArt made me feel so comfortable and beautiful.", author: "Priya & Milan", rating: 5, location: "Al Qudra Lakes", image: "/assets/gallery/family/IMG_9773.webp" }
];

export default function TestimonialsSlider({ reviews = defaultReviews, title = "Testimonials", subtitle = "What Our Couples Say", theme = "light" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 900) setVisibleCards(1);
      else if (w < 1200) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalReviews = reviews.length;
  const maxIndex = Math.max(0, totalReviews - visibleCards);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [visibleCards, maxIndex, currentIndex]);

  const handlePrev = () => setCurrentIndex(p => (p > 0 ? p - 1 : maxIndex));
  const handleNext = () => setCurrentIndex(p => (p < maxIndex ? p + 1 : 0));
  const handleTouchStart = (e) => { touchStart.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e) => { touchEnd.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const diff = touchStart.current - touchEnd.current;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStart.current = null;
    touchEnd.current = null;
  };

  const isLight = theme === 'light';
  const cardPct = 100 / visibleCards;
  const translatePct = currentIndex * cardPct;
  const bgStyle = isLight ? '#FAF6F2' : 'var(--color-shade-2)';
  const cardBg = isLight ? '#FAF5F0' : 'rgba(158,112,96,0.08)';
  const cardBorder = isLight ? '1px solid rgba(158,112,96,0.12)' : '1px solid rgba(158,112,96,0.15)';
  const textColor = isLight ? '#3C2B24' : 'var(--color-white)';
  const quoteColor = isLight ? 'rgba(158,112,96,0.35)' : 'rgba(158,112,96,0.5)';
  const headingColor = isLight ? '#2B1B14' : 'var(--color-white)';
  const locationColor = isLight ? '#8A7A72' : 'var(--color-text-muted)';
  const arrowBorder = isLight ? '1px solid rgba(158,112,96,0.2)' : '1px solid rgba(158,112,96,0.3)';
  const arrowBg = isLight ? '#fff' : 'rgba(43,27,20,0.4)';
  const arrowColor = isLight ? '#2B1B14' : 'var(--color-white)';

  const css = `
    .ts-outer { position: relative; padding: 0 3rem; }
    .ts-viewport { overflow: hidden; padding: 1rem 0; }
    .ts-track { display: flex; will-change: transform; transition: transform 0.55s cubic-bezier(0.25,1,0.5,1); }
    .ts-slide { flex-shrink: 0; box-sizing: border-box; }
    .ts-card { border-radius: 10px; display: flex; flex-direction: column; align-items: center; text-align: center; height: 100%; min-height: 300px; justify-content: space-between; position: relative; transition: transform 0.3s ease; }
    .ts-card:hover { transform: translateY(-5px); }
    .ts-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: all 0.3s ease; }
    .ts-arrow:hover { background: var(--color-gold) !important; color: #fff !important; border-color: var(--color-gold) !important; }
    .ts-arrow-prev { left: 0; }
    .ts-arrow-next { right: 0; }
    .ts-dot { height: 8px; border-radius: 50%; border: none; cursor: pointer; padding: 0; transition: all 0.3s cubic-bezier(0.25,1,0.5,1); }
    @media (max-width: 900px) {
      .ts-outer { padding: 0 2.5rem; }
      .ts-arrow { width: 36px !important; height: 36px !important; }
      .testimonials-slider-section { padding-top: 4rem !important; padding-bottom: 4rem !important; }
      .ts-card-inner { width: 88%; margin: 0 auto; }
    }
    @media (max-width: 480px) {
      .ts-outer { padding: 0 2rem; }
      .testimonials-slider-section { padding-top: 3rem !important; padding-bottom: 3rem !important; }
      .ts-card-inner { width: 90%; }
    }
  `;

  return (
    <section className="testimonials-slider-section" style={{ background: bgStyle, paddingTop: '7rem', paddingBottom: '7rem', position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="cinematic-title" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase' }}>{title}</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', color: headingColor, letterSpacing: '0.5px', marginBottom: '1rem', fontWeight: '400' }}>{subtitle}</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1.5rem auto 0' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', opacity: 0.5 }} />
            <span style={{ color: 'var(--color-gold)', fontSize: '0.8rem', opacity: 0.8 }}>❖</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', opacity: 0.5 }} />
          </div>
        </div>

        <div className="ts-outer">
          <button onClick={handlePrev} aria-label="Previous review" className="ts-arrow ts-arrow-prev" style={{ border: arrowBorder, background: arrowBg, color: arrowColor }}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNext} aria-label="Next review" className="ts-arrow ts-arrow-next" style={{ border: arrowBorder, background: arrowBg, color: arrowColor }}>
            <ChevronRight size={20} />
          </button>

          <div className="ts-viewport" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className="ts-track" style={{ transform: `translateX(-${translatePct}%)` }}>
              {reviews.map((review) => (
                <div key={review.id} className="ts-slide" style={{ width: `${cardPct}%`, padding: '0 0.6rem' }}>
                  <div className="ts-card-inner" style={{ width: '100%' }}>
                    <div className="ts-card" style={{ background: cardBg, border: cardBorder, padding: '2.5rem 1.8rem', boxShadow: isLight ? '0 10px 30px rgba(43,27,20,0.04)' : 'none' }}>

                      <div style={{ fontFamily: 'Georgia, serif', fontSize: '3.8rem', lineHeight: 1, color: quoteColor, position: 'absolute', top: '1.2rem', userSelect: 'none' }}>{'\u201C'}</div>

                      <p style={{ fontSize: '0.92rem', lineHeight: '1.8', color: textColor, marginTop: '1.8rem', marginBottom: '1.8rem', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {review.text}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {review.image ? (
                          <div style={{ width: '56px', height: '56px', position: 'relative', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--color-gold)', marginBottom: '0.8rem' }}>
                            <Image src={review.image} alt={review.author} fill sizes="56px" style={{ objectFit: 'cover' }} />
                          </div>
                        ) : (
                          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(158,112,96,0.15)', color: 'var(--color-gold)', border: '2px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '1rem', marginBottom: '0.8rem' }}>
                            {review.author ? review.author.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'U'}
                          </div>
                        )}
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: headingColor, margin: 0, fontWeight: '500' }}>{review.author}</h4>
                        {review.location && <span style={{ fontSize: '0.7rem', color: locationColor, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.2rem', display: 'block' }}>{review.location}</span>}
                        <div style={{ display: 'flex', gap: '3px', marginTop: '0.75rem' }}>
                          {[...Array(review.rating)].map((_, i) => <Star key={i} size={13} fill="var(--color-gold)" color="var(--color-gold)" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {maxIndex > 0 && (
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginTop: '2.5rem' }}>
            {[...Array(maxIndex + 1)].map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)} className="ts-dot" style={{ width: currentIndex === idx ? '24px' : '8px', background: currentIndex === idx ? 'var(--color-gold)' : isLight ? 'rgba(158,112,96,0.25)' : 'rgba(158,112,96,0.3)' }} aria-label={`Go to slide ${idx + 1}`} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
