'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, ValidationError } from '@formspree/react';
import {
  Shield,
  Heart,
  Sparkles,
  Home,
  Users,
  Wallet,
  Star,
  Phone,
  MessageCircle,
  ChevronDown,
  CalendarHeart,
  Camera,
  Images,
  Check,
  MapPin,
} from 'lucide-react';
import styles from './page.module.css';

/* ------------------------------------------------------------------ */
/*  Content — edit text, prices and photos here                        */
/* ------------------------------------------------------------------ */

const IMG = '/assets/services/newborn/newborn-and-maternity/';

const PHONE_DISPLAY = '+971 52 640 0679';
const PHONE_LINK = 'tel:+971526400679';
const WHATSAPP_LINK =
  'https://wa.me/971526400679?text=' +
  encodeURIComponent("Hi BreathArt! I'd like to know about newborn photoshoot packages and available dates.");
const STARTING_PRICE = 'AED 499';

// Studio location — taken from the map on the Contact page. Please confirm.
const STUDIO_AREA = 'Al Qusais 1, Dubai';
const STUDIO_LANDMARK = 'Near Pasons Supermarket (Noor Al Qusais)';
const MAPS_LINK =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Pasons Supermarket Al Qusais 1 Dubai');
// Opening hours — fill in to show them on the page, e.g. 'Daily, 10am – 8pm'
const OPENING_HOURS = '';

const trustPoints = [
  { icon: Star, text: '5+ Years Experience' },
  { icon: Users, text: 'Female Team' },
  { icon: Shield, text: 'Trained Newborn Photographers' },
  { icon: Wallet, text: 'Transparent Pricing' },
  { icon: Home, text: 'Studio or At-Home' },
];

const reasons = [
  {
    icon: Shield,
    title: 'Safety comes first',
    text: 'Every pose is handled by photographers trained in newborn safety. Your baby is never forced into a position, and comfort always comes before the shot.',
  },
  {
    icon: Heart,
    title: 'Gentle, female-led team',
    text: 'Our lady photographers and assistants work slowly and calmly, with plenty of breaks for feeding, cuddles and changes.',
  },
  {
    icon: Sparkles,
    title: 'Props & outfits included',
    text: 'Wraps, bonnets, baskets, headbands and themed setups are all provided. You just bring your baby.',
  },
  {
    icon: Home,
    title: 'The studio comes to you',
    text: "Can't travel with a newborn? Our team arrives at your home on time with everything needed for a beautiful shoot.",
  },
];

const themes = [
  { src: `${IMG}NB-453 MUTYA (24) copy.jpg`, name: 'Moon & Stars', note: 'Soft pastels and dreamy night-sky details' },
  { src: `${IMG}1photo.jpeg`, name: 'Arabian Heritage', note: 'Lanterns, dallah and golden accents' },
  { src: `${IMG}_BAT3540 copy.jpg`, name: 'Teddy & Basket', note: 'Classic, cosy and timeless' },
  { src: `${IMG}NB-427 KAJAL (317) copy.jpg`, name: 'Floral Princess', note: 'Delicate flower crowns and blush tones' },
  { src: `${IMG}NB-451 DURETI (94) copy.jpg`, name: 'Clouds & Sky', note: 'Bold colour with playful little stars' },
  { src: `${IMG}NB-433 AFIYA (193) copy.jpg`, name: 'Little Characters', note: 'Fun costumes full of personality' },
  { src: `${IMG}NB-450 NAADIYA (44) copy.jpg`, name: 'Family & Siblings', note: 'Parents and big brothers or sisters join in' },
  { src: `${IMG}7phpto.jpeg`, name: 'Tiny Details', note: 'Fingers, toes and the smallest moments' },
];

const steps = [
  {
    icon: CalendarHeart,
    title: 'Reserve during pregnancy',
    text: 'Send us your due date. We pencil you in and confirm the exact day once your little one arrives.',
  },
  {
    icon: Camera,
    title: 'A calm, unhurried session',
    text: 'In our warm studio or at your home. We follow your baby’s rhythm: feeding, settling and sleeping.',
  },
  {
    icon: Images,
    title: 'Receive your gallery',
    text: 'Hand-edited portraits ready to share, print and keep forever.',
  },
];

const testimonials = [
  {
    text: 'The most beautiful experience! They handled our 7-day-old baby with such care and patience. The lady photographers were so gentle and professional. The pictures turned out absolutely stunning!',
    author: 'Sarah K.',
    location: 'Dubai Marina',
  },
  {
    text: 'As a first-time mother, I was very nervous about my maternity shoot. The team at BreathArt made me feel so comfortable and beautiful. The private dressing rooms and custom gowns are incredible!',
    author: 'Priya M.',
    location: 'Downtown Dubai',
  },
  {
    text: 'Exceptional service and transparent pricing. No hidden fees. We got our edited photos within 24 hours as promised! Highly recommend their Maternity & Newborn combined package.',
    author: 'Jessica T.',
    location: 'Jumeirah',
  },
];

const faqs = [
  {
    q: 'When is the best time for a newborn photoshoot?',
    a: 'The first 5–14 days are ideal. Babies sleep deeply and curl naturally into those classic newborn poses. We still photograph older babies beautifully, so just get in touch.',
  },
  {
    q: 'Is the session safe for my baby?',
    a: 'Yes. Our photographers are trained in newborn handling, the studio is kept warm and clean, and we never force a pose. Parents are welcome to stay close throughout.',
  },
  {
    q: 'Can you come to our home?',
    a: 'Absolutely. Our team brings lighting, props and outfits to your home, so you and your baby can stay comfortable.',
  },
  {
    q: 'Can parents and siblings be in the photos?',
    a: 'Of course. Family and sibling portraits are a lovely part of the session, and we will guide everyone through relaxed, natural poses.',
  },
  {
    q: 'What do we need to bring?',
    a: 'Just your baby, a feed and anything that helps them settle. Themes, wraps, outfits and props are all provided.',
  },
  {
    q: 'How much does a newborn photoshoot cost?',
    a: `Packages start from ${STARTING_PRICE}. Pricing is fully transparent with no hidden fees. Message us and we will share the package that suits you.`,
  },
];

const galleryStrip = [
  `${IMG}8th.jpeg`,
  `${IMG}12.jpeg`,
  `${IMG}NB-406 SOPHIE (92) copy.jpg`,
  `${IMG}10photo.jpeg`,
  `${IMG}18.jpeg`,
  `${IMG}NB-413 ARIANA (177) copy.jpg`,
  `${IMG}15photo.jpeg`,
  `${IMG}IMG_0443.PNG`,
];

/* ------------------------------------------------------------------ */

function BookingForm({ id }) {
  const [state, handleSubmit] = useForm('meebwbzz');

  useEffect(() => {
    if (state.succeeded) window.location.href = '/thank-you';
  }, [state.succeeded]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="hidden" name="service" value="newborn" />
      <input type="hidden" name="source" value="Newborn landing page" />

      <label className={styles.field}>
        <span>Your name</span>
        <input type="text" name="name" required autoComplete="name" placeholder="e.g. Aisha" />
      </label>

      <label className={styles.field}>
        <span>WhatsApp / phone</span>
        <input type="tel" name="phone" required autoComplete="tel" placeholder="+971 5X XXX XXXX" />
      </label>
      <ValidationError field="phone" prefix="Phone" errors={state.errors} className={styles.error} />

      <div className={styles.fieldRow}>
        <label className={styles.field}>
          <span>Due date / baby&apos;s birth date</span>
          <input type="date" name="baby_date" />
        </label>
        <label className={styles.field}>
          <span>Session location</span>
          <select name="location" defaultValue="Studio">
            <option>Studio</option>
            <option>At my home</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>

      <label className={styles.field}>
        <span>Email (optional)</span>
        <input type="email" name="email" autoComplete="email" placeholder="you@example.com" />
      </label>
      <ValidationError field="email" prefix="Email" errors={state.errors} className={styles.error} />

      <button type="submit" className={styles.btnPrimary} disabled={state.submitting} id={`${id}-submit`}>
        {state.submitting ? 'Sending…' : 'Check Availability'}
      </button>
      <p className={styles.formNote}>We reply within a few hours. No spam, ever.</p>
    </form>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button type="button" className={styles.faqQ} onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <ChevronDown size={20} />
      </button>
      <div className={styles.faqA}>
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function NewbornLandingPage() {
  return (
    <main className={styles.page}>
      {/* On phones the sticky bar below replaces the site-wide floating buttons */}
      <style>{`@media (max-width: 640px) { .whatsapp-float { display: none !important; } .payment-float-banner { bottom: 76px !important; } }`}</style>

      {/* ---------- Top bar ---------- */}
      <header className={styles.topbar}>
        <Link href="/" className={styles.logo}>
          BreathArt<span>Studio</span>
        </Link>
        <div className={styles.topbarActions}>
          <span className={styles.topbarHome}>
            <Home size={16} /> Home sessions available
          </span>
          <a href={PHONE_LINK} className={styles.topbarPhone}>
            <Phone size={16} /> {PHONE_DISPLAY}
          </a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={styles.btnSmall}>
            WhatsApp Us
          </a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>Studio &amp; at-home sessions · From {STARTING_PRICE}</span>
          <h1 className={styles.heroTitle}>
            Newborn Photography
            <em> in Dubai</em>
          </h1>
          <p className={styles.heroTagline}>Their first days pass in a breath. Keep them forever.</p>
          <p className={styles.heroLead}>
            Gentle, baby-safe newborn photoshoots by a caring female team, in our cosy Dubai studio or in the comfort of
            your home.
          </p>

          <div className={styles.homeBanner}>
            <div className={styles.homeIcon}><Home size={22} /></div>
            <div>
              <strong>The studio comes to your home</strong>
              <span>Can&apos;t travel with a newborn? Our team arrives with lighting, props &amp; outfits, so your baby never leaves home.</span>
            </div>
          </div>

          <ul className={styles.heroChecks}>
            <li><Check size={18} /> All props, wraps &amp; outfits included</li>
            <li><Check size={18} /> Trained in safe newborn posing</li>
            <li><Check size={18} /> Parents &amp; siblings welcome</li>
          </ul>

          <div className={styles.priceRow}>
            <div className={styles.priceTag}>
              <span>Packages from</span>
              <strong>{STARTING_PRICE}</strong>
            </div>
            <div className={styles.payLater}>
              <span>Pay later with</span>
              <Image src="/assets/logo/tabby-logo.svg" alt="Tabby" width={63} height={36} />
              <Image src="/assets/logo/tamara-logo.webp" alt="Tamara" width={63} height={36} />
            </div>
          </div>

          <div className={styles.heroCtas}>
            <a href="#book" className={styles.btnPrimary}>Check Availability</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className={styles.heroMedia}>
          <div className={styles.heroImgMain}>
            <Image
              src={`${IMG}WhatsApp Image 2026-09-09 at 12.45.24 PM.jpeg`}
              alt="Sleeping newborn in a cosy basket with a teddy bear, photographed in Dubai"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.heroImgSmall}>
            <Image
              src={`${IMG}5th photo.jpeg`}
              alt="Parent holding newborn's tiny fingers"
              fill
              sizes="200px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.ratingCard}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span>Loved by Dubai parents</span>
          </div>
          <div className={styles.homeCard}>
            <Home size={18} />
            <span>We come to<br />your home</span>
          </div>
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section className={styles.trust} aria-label="Why BreathArt">
        {trustPoints.map(({ icon: Icon, text }) => (
          <div key={text} className={styles.trustItem}>
            <Icon size={18} />
            <span>{text}</span>
          </div>
        ))}
      </section>

      {/* ---------- Gallery strip ---------- */}
      <section className={styles.strip} aria-label="Newborn portfolio">
        <div className={styles.stripTrack}>
          {[...galleryStrip, ...galleryStrip].map((src, i) => (
            <div key={i} className={styles.stripItem}>
              <Image src={src} alt="BreathArt newborn portrait" fill sizes="280px" style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Why us ---------- */}
      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.splitMedia}>
            <Image
              src={`${IMG}NB-453 MUTYA (158).JPG`}
              alt="Mother cradling her newborn's tiny feet"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <span className={styles.eyebrow}>Why parents choose us</span>
            <h2 className={styles.h2}>Calm, careful and made around your baby</h2>
            <p className={styles.lead}>
              The first few weeks fly by: tiny fingers, soft yawns and sleepy smiles that change almost overnight. We
              capture your baby exactly as they are, calm, natural and full of character.
            </p>
            <div className={styles.reasons}>
              {reasons.map(({ icon: Icon, title, text }) => (
                <div key={title} className={styles.reason}>
                  <div className={styles.reasonIcon}><Icon size={22} /></div>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Themes ---------- */}
      <section className={`${styles.section} ${styles.tinted}`} id="themes">
        <div className={styles.center}>
          <span className={styles.eyebrow}>Choose your style</span>
          <h2 className={styles.h2}>Signature newborn themes</h2>
          <p className={styles.lead}>
            Every setup is styled in-house with baby-safe props. Pick a favourite, mix a few, or ask us for something
            custom.
          </p>
        </div>
        <div className={styles.themes}>
          {themes.map((t) => (
            <figure key={t.name} className={styles.theme}>
              <div className={styles.themeImg}>
                <Image src={t.src} alt={`${t.name} newborn photoshoot theme`} fill sizes="(max-width: 600px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
              </div>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.center}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
            <MessageCircle size={18} /> Ask about a theme
          </a>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className={styles.section}>
        <div className={styles.center}>
          <span className={styles.eyebrow}>Simple from start to finish</span>
          <h2 className={styles.h2}>How it works</h2>
        </div>
        <ol className={styles.steps}>
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className={styles.step}>
              <span className={styles.stepNum}>{i + 1}</span>
              <Icon size={26} />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <p className={styles.tip}>
          <strong>Tip:</strong> the first 5–14 days are the sweetest time for newborn photos, so book while you&apos;re
          still expecting.
        </p>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className={`${styles.section} ${styles.dark}`}>
        <div className={styles.center}>
          <div className={styles.starsLarge}>
            {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={22} fill="currentColor" />)}
          </div>
          <h2 className={styles.h2}>What Dubai parents say</h2>
        </div>
        <div className={styles.reviews}>
          {testimonials.map((t) => (
            <blockquote key={t.author} className={styles.review}>
              <p>“{t.text}”</p>
              <footer>
                <strong>{t.author}</strong> · {t.location}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ---------- Booking ---------- */}
      <section className={styles.section} id="book">
        <div className={styles.bookWrap}>
          <div className={styles.bookInfo}>
            <span className={styles.eyebrow}>Book early — newborn dates are planned around your due date</span>
            <h2 className={styles.h2}>Reserve your baby&apos;s session</h2>
            <p className={styles.lead}>
              Share a few details and our team will contact you within a few hours with available dates and package
              options.
            </p>
            <div className={styles.bookImg}>
              <Image
                src={`${IMG}NB-342 SHAJIDHA (172) .jpg`}
                alt="Parents with their newborn during an at-home photoshoot"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.location}>
              <div className={styles.locationIcon}><MapPin size={22} /></div>
              <div>
                <strong>BreathArt Studio · {STUDIO_AREA}</strong>
                <span>{STUDIO_LANDMARK}</span>
                {OPENING_HOURS && <span>Open: {OPENING_HOURS}</span>}
                <span>Or we come to your home.</span>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Get directions →</a>
              </div>
            </div>
            <div className={styles.contactLinks}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} /> WhatsApp us
              </a>
              <a href={PHONE_LINK}>
                <Phone size={18} /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className={styles.formCard}>
            <h3>Check availability</h3>
            <p>Packages from <strong>{STARTING_PRICE}</strong> · Pay later with Tabby or Tamara</p>
            <BookingForm id="main" />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className={`${styles.section} ${styles.tinted}`}>
        <div className={styles.center}>
          <span className={styles.eyebrow}>Good to know</span>
          <h2 className={styles.h2}>Questions parents ask</h2>
        </div>
        <div className={styles.faq}>
          {faqs.map((f) => <FaqItem key={f.q} {...f} />)}
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className={styles.final}>
        <Image src={`${IMG}8th.jpeg`} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        <div className={styles.finalInner}>
          <h2>They&apos;ll only be this small once.</h2>
          <p>Book your newborn photoshoot in Dubai today. Packages from {STARTING_PRICE}.</p>
          <div className={styles.heroCtas}>
            <a href="#book" className={styles.btnPrimary}>Check Availability</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={styles.btnLight}>
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Mobile sticky bar ---------- */}
      <div className={styles.stickyBar}>
        <a href={PHONE_LINK} className={styles.stickyCall}><Phone size={18} /> Call</a>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={styles.stickyWa}>
          <MessageCircle size={18} /> WhatsApp
        </a>
        <a href="#book" className={styles.stickyBook}>Book</a>
      </div>
    </main>
  );
}
