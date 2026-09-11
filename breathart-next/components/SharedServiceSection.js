'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const AutoSlider = ({ images, objectPosition = "center center" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt="Service feature"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        style={{ objectFit: 'cover', objectPosition }}
      />
    );
  }

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        >
          <Image
            src={images[index]}
            alt="Service feature slider"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function SharedServiceSection({
  id,
  theme = 'light',
  imageAlignment = 'left',
  images,
  imageObjectPosition = 'center center',
  label,
  title,
  description,
  features,
  buttonText = 'Enquire Now',
  buttonHref = '#contact-section',
  onButtonClick,
  customCta
}) {
  const isDark = theme === 'dark';
  const isImageRight = imageAlignment === 'right';
  
  // Define colors based on theme
  const bgColor = isDark ? 'var(--color-shade-2)' : 'var(--color-shade-1)';
  const textColor = 'var(--color-white)'; // Note: --color-white is dark brown in this theme
  const descColor = 'var(--color-text-muted)';
  
  // Array wrapper if a single string is passed
  const imageArray = Array.isArray(images) ? images : [images];
  
  // Clip path depends on which side the image is on.
  // If image is left: slant top-right to bottom-left (polygon(0 0, 100% 0, 85% 100%, 0 100%))
  // If image is right: slant top-left to bottom-right (polygon(15% 0, 100% 0, 100% 100%, 0 100%))
  const desktopClipPath = isImageRight 
    ? 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' 
    : 'polygon(0 0, 100% 0, 85% 100%, 0 100%)';

  return (
    <section id={id} className="section" style={{ padding: 0 }}>
      <style dangerouslySetInnerHTML={{__html: `
        .shared-grid-container-${id} {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 650px;
          background-color: ${bgColor};
        }
        
        .shared-grid-image-wrapper-${id} {
          position: relative;
          height: 100%;
          width: 100%;
          clip-path: ${desktopClipPath};
        }
        
        /* When image is on right, we need it to be the second column visually on desktop */
        .shared-grid-image-col-${id} {
          order: ${isImageRight ? 2 : 1};
        }
        
        .shared-grid-text-col-${id} {
          order: ${isImageRight ? 1 : 2};
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: ${isImageRight ? '4rem 2rem 4rem 6rem' : '4rem 6rem 4rem 2rem'};
        }
        
        .shared-btn-container-${id} {
          position: absolute;
          bottom: 2.5rem;
          /* If image is left, button is on left. If image is right, button is on right */
          ${isImageRight ? 'right: 2.5rem;' : 'left: 2.5rem;'}
          z-index: 10;
        }

        .shared-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-top: 2.5rem;
        }
        
        .shared-feature-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .shared-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(158, 112, 96, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gold);
        }
        
        @media (max-width: 1024px) {
          .shared-grid-container-${id} {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .shared-grid-image-col-${id} {
            order: 1; /* Always image on top for mobile */
          }
          .shared-grid-text-col-${id} {
            order: 2;
            padding: 4rem 2rem;
          }
          .shared-grid-image-wrapper-${id} {
            min-height: 450px;
            clip-path: none; /* Straight edge on mobile */
          }
          .shared-grid-image-wrapper-${id} img {
            object-position: top center !important;
          }
          .shared-btn-container-${id} {
            /* Keep it bottom-left for consistency on mobile regardless of desktop position */
            bottom: 1.5rem;
            left: 1.5rem;
            right: auto;
          }
          .shared-features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .shared-features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .shared-grid-image-wrapper-${id} {
            min-height: 500px;
          }
          .shared-grid-image-wrapper-${id} img {
            object-position: top center !important;
          }
        }
      `}} />
      
      <div className={`shared-grid-container-${id}`}>
        {/* Image Column */}
        <div className={`shared-grid-image-col-${id}`}>
          <div className={`shared-grid-image-wrapper-${id}`}>
            <AutoSlider images={imageArray} objectPosition={imageObjectPosition} />
          </div>
        </div>
        
        {/* Text Column */}
        <div className={`shared-grid-text-col-${id}`}>
          <div>
            <p className="featured-label" style={{ marginBottom: '1rem', color: isDark ? 'var(--color-gold)' : '' }}>
              {label}
            </p>
            <h3 className="featured-name" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: textColor, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              {title}
            </h3>
            <div className="featured-description" style={{ color: descColor, lineHeight: '1.8' }}>
              {description}
            </div>

            {features && features.length > 0 && (
              <div className="shared-features-grid">
                {features.map((feature, idx) => (
                  <div key={idx} className="shared-feature-item">
                    <div className="shared-icon-box">
                      <feature.icon size={18} />
                    </div>
                    <p style={{ fontSize: '0.8rem', fontWeight: '700', color: textColor, letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0, marginTop: '0.5rem' }}>
                      {feature.title}
                    </p>
                    {feature.sub && (
                      <p style={{ fontSize: '0.75rem', color: descColor, margin: 0, lineHeight: '1.4' }}>
                        {feature.sub}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              {customCta ? customCta : (
                <a href={buttonHref} onClick={onButtonClick} className="btn-premium btn-premium-filled">
                  {buttonText} <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
