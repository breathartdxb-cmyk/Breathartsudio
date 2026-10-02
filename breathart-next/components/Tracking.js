'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

/*
 * Site-wide tracking for BreathArt — replaces the old Google Tag Manager container.
 * Loaded directly on every page (no Tag Manager needed).
 *
 *  - Form leads:      conversion fires when a visitor lands on /thank-you
 *  - WhatsApp clicks: conversion fires on any click on a wa.me link
 *  - Phone clicks:    conversion fires on any click on a tel: link
 *  - Microsoft Clarity session recordings
 */

// Google Ads — BreathArt account (673-878-7995)
const ADS_ID = 'AW-18311468279';
const FORM_LABEL = 'Sr2iCIbYsu8cEPepy5tE'; // "Submit lead form (2)"
const WHATSAPP_LABEL = 'oGJiCP3Ro44dEPepy5tE'; // "WhatsApp click"
const CALL_LABEL = '9ieDCK_AmY4dEPepy5tE'; // "Phone call click"

const CLARITY_ID = 'yf0xwl0vdr';

function ensureGtag() {
  if (typeof window === 'undefined') return;
  if (window.__baGtagReady) return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
  }
  window.gtag('js', new Date());
  window.gtag('config', ADS_ID);
  window.__baGtagReady = true;
}

function sendConversion(sendTo) {
  if (typeof window === 'undefined') return;
  ensureGtag(); // queues the event even if gtag.js hasn't finished loading yet
  window.gtag('event', 'conversion', { send_to: sendTo });
}

export default function Tracking() {
  const pathname = usePathname();

  useEffect(() => { ensureGtag(); }, []);

  // Form lead: the booking forms redirect to /thank-you after a successful submit
  useEffect(() => {
    if (pathname === '/thank-you') {
      sendConversion(`${ADS_ID}/${FORM_LABEL}`);
    }
  }, [pathname]);

  // WhatsApp and phone clicks anywhere on the site
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest && e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) {
        sendConversion(`${ADS_ID}/${WHATSAPP_LABEL}`);
      } else if (href.startsWith('tel:')) {
        sendConversion(`${ADS_ID}/${CALL_LABEL}`);
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} strategy="afterInteractive" />
      <Script id="ms-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}
      </Script>
    </>
  );
}
