'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

/*
 * Site-wide tracking for BreathArt — replaces the old Google Tag Manager container.
 * Same conversion actions as before, now loaded directly on every page.
 *
 *  - Form leads:      conversion fires when a visitor lands on /thank-you
 *  - WhatsApp clicks: conversion fires on any click on a wa.me link
 *  - Phone clicks:    conversion fires on any click on a tel: link (set CALL_LABEL first)
 *  - Microsoft Clarity session recordings
 */

const ADS_ID_FORM = 'AW-18311468279';
const FORM_LABEL = 'Sr2iCIbYsu8cEPepy5tE';

const ADS_ID_MAIN = 'AW-18309383399';
const WHATSAPP_LABEL = 'DZw2CNLnjPIcEOeJzJpE';
const CALL_LABEL = ''; // e.g. 'AbCdEf123' — create a "Phone call click" conversion in Google Ads and paste its label here

const CLARITY_ID = 'yf0xwl0vdr';

function ensureGtag() {
  if (typeof window === 'undefined') return;
  if (window.__baGtagReady) return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
  }
  window.gtag('js', new Date());
  window.gtag('config', ADS_ID_MAIN);
  window.gtag('config', ADS_ID_FORM);
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
      sendConversion(`${ADS_ID_FORM}/${FORM_LABEL}`);
    }
  }, [pathname]);

  // WhatsApp and phone clicks anywhere on the site
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest && e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) {
        sendConversion(`${ADS_ID_MAIN}/${WHATSAPP_LABEL}`);
      } else if (href.startsWith('tel:') && CALL_LABEL) {
        sendConversion(`${ADS_ID_MAIN}/${CALL_LABEL}`);
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID_MAIN}`} strategy="afterInteractive" />
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
