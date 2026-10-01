'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PaymentFloat() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="payment-float-banner">
      <div className="payment-float-container">
        <span className="payment-float-text">We accept</span>
        <Image 
          src="/assets/logo/tabby-logo.svg" 
          alt="Tabby Accepted" 
          width={49}
          height={28}
          className="payment-float-img" 
        />
        <Image 
          src="/assets/logo/tamara-logo.webp" 
          alt="Tamara Accepted" 
          width={49}
          height={28}
          className="payment-float-img" 
        />
      </div>
      <button 
        className="payment-float-close" 
        onClick={() => setIsVisible(false)}
        aria-label="Close Payment Banner"
      >
        <i className="fas fa-times" aria-hidden="true"></i>
      </button>
    </div>
  );
}
