'use client';

import { useState, useEffect, Suspense, useId } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Send } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

function ContactFormInner({ 
  initialService, 
  initialPackage, 
  initialMessage, 
  buttonText, 
  showPackageField = true,
  showServiceField = true,
  showDetailsField = true,
  theme = "cinematic", // "cinematic" (home/contact form style) or "landing" (landing/offers form style)
  onSuccess,
  sessionOptions
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formId = useId();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: theme === 'landing' ? 'Photography' : 'newborn',
    package: '',
    message: showDetailsField ? '' : 'Short inquiry form submitted.'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [state, handleSubmit] = useForm('meebwbzz');

  useEffect(() => {
    if (state.succeeded) {
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
      router.push('/thank-you');
    }
  }, [state.succeeded, router, onSuccess]);

  useEffect(() => {
    // Read from search params if present (for contact page)
    const interestParam = searchParams.get('interest');
    const packageParam = searchParams.get('package');
    const messageParam = searchParams.get('message');

    let updatedService = initialService || formData.service;
    let updatedPackage = initialPackage || formData.package;
    let updatedMessage = initialMessage || formData.message;

    if (interestParam) {
      const lower = interestParam.toLowerCase();
      if (theme === 'landing') {
        if (lower.includes('newborn') || lower.includes('maternity') || lower.includes('family') || lower.includes('photo')) {
          updatedService = 'Photography';
        } else if (lower.includes('video')) {
          updatedService = 'Videography';
        } else if (lower.includes('event')) {
          updatedService = 'Event';
        }
      } else {
        if (lower.includes('newborn') || lower.includes('maternity')) {
          updatedService = 'newborn';
        } else if (lower.includes('wedding')) {
          updatedService = 'wedding';
        } else if (lower.includes('pre-wedding') || lower.includes('prewedding')) {
          updatedService = 'pre-wedding';
        } else if (lower.includes('couple') || lower.includes('romance')) {
          updatedService = 'couple';
        } else if (lower.includes('corporate') || lower.includes('brand')) {
          updatedService = 'corporate';
        } else if (lower.includes('event')) {
          updatedService = 'event';
        } else if (lower.includes('cakesmash') || lower.includes('smash')) {
          updatedService = 'cakesmash';
        } else if (lower.includes('family')) {
          updatedService = 'family';
        } else if (lower.includes('realestate') || lower.includes('estate') || lower.includes('real')) {
          updatedService = 'realestate';
        }
      }
    }

    if (packageParam) {
      updatedPackage = packageParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    if (messageParam) {
      updatedMessage = decodeURIComponent(messageParam);
    }

    setFormData(prev => ({
      ...prev,
      service: updatedService,
      package: updatedPackage,
      message: updatedMessage
    }));
  }, [searchParams, initialService, initialPackage, initialMessage, theme]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: theme === 'landing' ? 'Photography' : 'newborn',
      package: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  // ── Theme A: Landing & Offers Form (Boxed fields, no card bg modifications) ──
  if (theme === 'landing') {
    return (
      <form onSubmit={handleSubmit} className="noha-form">
        <div className="input-group">
          <label htmlFor={`${formId}-name`} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', fontWeight: '600' }}>
            Full Name
          </label>
          <input 
            type="text" 
            name="name" 
            id={`${formId}-name`}
            value={formData.name} 
            onChange={handleInputChange} 
            required 
            placeholder="e.g. Jane Doe" 
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor={`${formId}-email`} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', fontWeight: '600' }}>
              Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              id={`${formId}-email`}
              value={formData.email} 
              onChange={handleInputChange} 
              required 
              placeholder="jane@example.com" 
            />
          </div>
          <div className="input-group">
            <label htmlFor={`${formId}-phone`} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', fontWeight: '600' }}>
              Phone Number
            </label>
            <input 
              type="tel" 
              name="phone" 
              id={`${formId}-phone`}
              value={formData.phone} 
              onChange={handleInputChange} 
              required 
              placeholder="+971 XX XXX XXXX" 
            />
          </div>
        </div>

        <div className="input-row">
          {showServiceField && (
            <div className="input-group">
              <label htmlFor={`${formId}-service`} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', fontWeight: '600' }}>
                Area of Interest
              </label>
              <select name="service" id={`${formId}-service`} value={formData.service} onChange={handleInputChange} required>
                <option value="Photography">Photography</option>
                <option value="Videography">Videography</option>
                <option value="Event">Event</option>
              </select>
            </div>
          )}

          {showPackageField && (
            <div className="input-group">
              <label htmlFor={`${formId}-package`} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', fontWeight: '600' }}>
                Selected Package
              </label>
              <input 
                type="text" 
                name="package" 
                id={`${formId}-package`}
                value={formData.package} 
                onChange={handleInputChange} 
                placeholder="e.g. Newborn 50% Off Offer" 
              />
            </div>
          )}
        </div>

        {showDetailsField && (
          <div className="input-group">
            <label htmlFor={`${formId}-message`} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-white)', fontWeight: '600' }}>
              Additional Details (Date, Venue, Specific Requests)
            </label>
            <textarea 
              name="message" 
              id={`${formId}-message`}
              value={formData.message} 
              onChange={handleInputChange} 
              rows={4} 
              placeholder="Tell us more about your vision..."
              required={showDetailsField}
            ></textarea>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input type="checkbox" id={`terms-${formId}`} required style={{ width: 'auto', cursor: 'pointer', margin: 0 }} />
          <label htmlFor={`terms-${formId}`} style={{ fontSize: '0.7rem', color: 'var(--color-white)', cursor: 'pointer', margin: 0 }}>
            I accept the <a href="/terms-and-conditions" target="_blank" style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}>Terms and Conditions</a> and <a href="/privacy-policy" target="_blank" style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}>Privacy Policy</a>
          </label>
        </div>

        <button type="submit" disabled={state.submitting} className="noha-btn-primary full-width" style={{ cursor: state.submitting ? 'not-allowed' : 'pointer', opacity: state.submitting ? 0.7 : 1 }}>
          {state.submitting ? "Submitting..." : (buttonText || "Submit Inquiry")} <Send size={16} />
        </button>
      </form>
    );
  }

  // ── Theme B: Home & Contact Form (Underline input fields, cinematic-title labels) ──
  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(158, 112, 96, 0.3)',
    color: 'var(--color-white)',
    padding: '0.8rem 0',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
  };

  const labelStyle = {
    fontSize: '0.65rem',
    display: 'block',
    marginTop: '1.8rem',
    marginBottom: '0.5rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--color-gold)'
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-row">
        <div className="form-group">
          <label htmlFor={`${formId}-b-name`} className="cinematic-title" style={labelStyle}>
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id={`${formId}-b-name`}
            value={formData.name}
            onChange={handleInputChange}
            placeholder="E.g., Alexander Wright"
            required
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor={`${formId}-b-email`} className="cinematic-title" style={labelStyle}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id={`${formId}-b-email`}
            value={formData.email}
            onChange={handleInputChange}
            placeholder="alexander@domain.com"
            required
            style={inputStyle}
          />
        </div>
      </div>

      <div className="input-row">
        <div className="form-group">
          <label htmlFor={`${formId}-b-phone`} className="cinematic-title" style={labelStyle}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id={`${formId}-b-phone`}
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+971 -- --- ----"
            required
            style={inputStyle}
          />
        </div>
        {showServiceField && (
          <div className="form-group">
            <label htmlFor={`${formId}-b-service`} className="cinematic-title" style={labelStyle}>
              Select 
            </label>
            <select
              name="service"
              id={`${formId}-b-service`}
              value={formData.service}
              onChange={handleInputChange}
              required
              style={{
                ...inputStyle,
                cursor: 'pointer',
              }}
            >
              <option value="" disabled style={{ background: 'var(--color-shade-2)', color: 'var(--color-text-muted)' }}>Choose a session...</option>
              {sessionOptions ? (
                sessionOptions.map(opt => (
                  <option key={opt.value} value={opt.value} style={{ background: 'var(--color-shade-2)', color: 'var(--color-white)' }}>
                    {opt.label}
                  </option>
                ))
              ) : (
                <>
                  <option value="newborn" style={{ background: 'var(--color-shade-2)', color: 'var(--color-white)' }}>Newborn Photography</option>
                  <option value="wedding" style={{ background: 'var(--color-shade-2)', color: 'var(--color-white)' }}>Wedding Stories</option>
                  <option value="pre-wedding" style={{ background: 'var(--color-shade-2)', color: 'var(--color-white)' }}>Pre-Wedding</option>
                  <option value="couple" style={{ background: 'var(--color-shade-2)', color: 'var(--color-white)' }}>Couple Session</option>
                  <option value="corporate" style={{ background: 'var(--color-shade-2)', color: 'var(--color-white)' }}>Corporate Branding</option>
                  <option value="event" style={{ background: 'var(--color-shade-2)', color: 'var(--color-white)' }}>Event Photography</option>
                  <option value="cakesmash" style={{ background: 'var(--color-shade-2)', color: 'var(--color-white)' }}>Cake Smash</option>
                  <option value="family" style={{ background: 'var(--color-shade-2)', color: 'var(--color-white)' }}>Family Session</option>
                  <option value="realestate" style={{ background: 'var(--color-shade-2)', color: 'var(--color-white)' }}>Real Estate Showcase</option>
                </>
              )}
            </select>
          </div>
        )}
      </div>

      {showPackageField && (
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label htmlFor={`${formId}-b-package`} className="cinematic-title" style={labelStyle}>
            Selected Package
          </label>
          <input
            type="text"
            name="package"
            id={`${formId}-b-package`}
            value={formData.package}
            onChange={handleInputChange}
            placeholder="E.g., Basic Bundle / Package 01"
            style={inputStyle}
          />
        </div>
      )}

      {showDetailsField && (
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label htmlFor={`${formId}-b-message`} className="cinematic-title" style={labelStyle}>
            Additional Details
          </label>
          <textarea
            name="message"
            id={`${formId}-b-message`}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Share details about your dream photoshoot, dates, or concepts..."
            required={showDetailsField}
            style={{
              ...inputStyle,
              minHeight: '100px',
              resize: 'none',
            }}
          ></textarea>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <input type="checkbox" id={`terms-${formId}`} required style={{ width: 'auto', cursor: 'pointer', margin: 0 }} />
        <label htmlFor={`terms-${formId}`} style={{ fontSize: '0.7rem', color: 'var(--color-white)', cursor: 'pointer', margin: 0, textAlign: 'left' }}>
          I accept the <a href="/terms-and-conditions" target="_blank" style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}>Terms and Conditions</a> and <a href="/privacy-policy" target="_blank" style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}>Privacy Policy</a>
        </label>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button type="submit" disabled={state.submitting} className="btn btn-gold" style={{ padding: '1rem 4rem', letterSpacing: '4px', fontSize: '0.75rem', textTransform: 'uppercase', width: '100%', cursor: state.submitting ? 'not-allowed' : 'pointer', border: 'none', opacity: state.submitting ? 0.7 : 1 }}>
          {state.submitting ? "Submitting..." : (buttonText || "Reserve Your Date")}
        </button>
      </div>
    </form>
  );
}

export default function ContactForm(props) {
  return (
    <Suspense fallback={<div style={{ color: 'var(--color-text-muted)' }}>Loading contact form...</div>}>
      <ContactFormInner {...props} />
    </Suspense>
  );
}
