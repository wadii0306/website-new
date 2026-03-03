"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from 'sonner';
import { contactApi } from '../../services/contact.service';

const RED  = "#E62E2D";
const DARK = "#111A2D";

interface FormState {
  fullName: string;
  banquetName: string;
  email: string;
  phone: string;
  city: string;
  venueType: string;
  message: string;
}

interface ErrorState {
  fullName?: string;
  banquetName?: string;
  email?: string;
  phone?: string;
  city?: string;
}

const ErrIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5.5" stroke={RED} />
    <path d="M6 3.5v3M6 8v.5" stroke={RED} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>({
    fullName: "", banquetName: "", email: "", phone: "", city: "", venueType: "", message: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = "wadii-contact-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `
        .wc-rev { opacity:0; transform:translateY(28px); transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .wc-rev.d1{transition-delay:.08s} .wc-rev.d2{transition-delay:.16s}
        .wc-rev.d3{transition-delay:.24s} .wc-rev.d4{transition-delay:.32s}
        .wc-vis{opacity:1!important;transform:none!important}
        .wc-pill::before{content:'';width:6px;height:6px;border-radius:50%;background:${RED};flex-shrink:0;}
        .wc-input { transition: border-color 0.25s, box-shadow 0.25s; }
        .wc-input:hover { border-color: rgba(230,46,45,0.4) !important; }
        .wc-btn { transition: transform 0.25s cubic-bezier(0.16,1,.3,1), box-shadow 0.25s, background 0.25s; }
        .wc-btn:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(230,46,45,0.32); background:#c92827 !important; }
        .wc-btn:active { transform:translateY(0); }
        .wc-scard::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,${RED},transparent); border-radius:20px 20px 0 0; }
        .wc-ghost { font-size:clamp(72px,10vw,130px); font-weight:800; font-style:italic; color:transparent; -webkit-text-stroke:1px rgba(17,26,45,0.055); line-height:1; user-select:none; pointer-events:none; white-space:nowrap; }
        @keyframes wc-check { from{stroke-dashoffset:24} to{stroke-dashoffset:0} }
        .wc-check-path { stroke-dasharray:24; stroke-dashoffset:24; animation:wc-check 0.45s 0.2s ease forwards; }
        .wc-field-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; }
        .wc-field-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        @media(max-width:768px){
          .wc-field-row { grid-template-columns:1fr 1fr !important; }
          .wc-field-row-2 { grid-template-columns:1fr !important; }
        }
        @media(max-width:480px){
          .wc-field-row { grid-template-columns:1fr !important; }
        }
      `;
      document.head.appendChild(style);
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("wc-vis"); }),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current?.querySelectorAll(".wc-rev").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const e: ErrorState = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    else if (form.fullName.trim().length < 2) e.fullName = "Name must be at least 2 characters.";
    if (!form.banquetName.trim()) e.banquetName = "Banquet / venue name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Must be exactly 10 digits.";
    if (!form.city.trim()) e.city = "City is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof ErrorState]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const response = await contactApi.createContact({
        fullName: form.fullName.trim(),
        banquetName: form.banquetName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        venueType: form.venueType.trim() || undefined,
        message: form.message.trim() || undefined,
      });
      
      if (response.success) {
        // Show success toast
        toast.success('Message submitted successfully! We will get back to you within 24 hours.', {
          duration: 5000,
          position: 'top-right',
        });
        
        // Reset form
        setForm({
          fullName: "",
          banquetName: "",
          email: "",
          phone: "",
          city: "",
          venueType: "",
          message: ""
        });
        setErrors({});
      } else {
        toast.error(response.message || 'Failed to submit contact form', {
          duration: 4000,
          position: 'top-right',
        });
      }
    } catch (error: unknown) {
      console.error('Contact form submission error:', error);
      toast.error('Network error. Please try again later.', {
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const pillStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 7,
    fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
    color: RED, padding: "5px 14px", borderRadius: 100,
    border: "1px solid rgba(230,46,45,0.28)", background: "rgba(230,46,45,0.06)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 12, fontWeight: 600,
    letterSpacing: "0.04em", marginBottom: 7, color: DARK,
  };

  const inputStyle = (field: string, hasError: boolean): React.CSSProperties => ({
    width: "100%", padding: "13px 16px", borderRadius: 10, fontSize: 14,
    color: DARK, background: "#FAFAFA", outline: "none", boxSizing: "border-box",
    border: hasError
      ? `1.5px solid ${RED}`
      : focused === field ? `1.5px solid ${RED}` : "1.5px solid rgba(17,26,45,0.1)",
    boxShadow: focused === field && !hasError ? "0 0 0 3px rgba(230,46,45,0.08)" : "none",
  });

  const errStyle: React.CSSProperties = {
    fontSize: 11, color: RED, marginTop: 5, display: "flex", alignItems: "center", gap: 5,
  };

  return (
    <section ref={sectionRef} id="contact-section" style={{ background: "#fff", color: DARK, overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px 100px" }}>

        {/* ── Header ── */}
        <div className="wc-rev" style={{ marginBottom: 8 }}>
          <span className="wc-pill" style={pillStyle}>Contact Us</span>
        </div>

        <div style={{ position: "relative", marginBottom: 52 }}>
          <div className="wc-rev d1">
            <h1 style={{ fontSize: "clamp(44px,6vw,80px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.02em", color: DARK, marginBottom: 18 }}>
              Get in<br /><span style={{ color: RED }}>Touch</span>
            </h1>
          </div>
          <div className="wc-ghost" aria-hidden style={{ position: "absolute", top: -8, right: 0, zIndex: 0 }}>
            Contact
          </div>
          <p className="wc-rev d2" style={{ fontSize: 15, color: "#6B7A99", fontWeight: 300, maxWidth: 540, lineHeight: 1.85, position: "relative", zIndex: 1 }}>
            Have a question or want to see Wadii in action? Fill in the form and our team will respond promptly.
          </p>
        </div>

        {/* ── Form card ── */}
        <div
          className="wc-rev wc-scard d2"
          style={{
            background: "#fff", borderRadius: 20,
            border: "1px solid rgba(17,26,45,0.09)",
            padding: "clamp(28px,4vw,52px)",
            position: "relative", overflow: "hidden",
            boxShadow: "0 4px 32px rgba(17,26,45,0.07)",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 32, letterSpacing: "-0.01em" }}>
            Send a Message
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

            {/* Row 1: Full Name + Banquet Name + City */}
            <div className="wc-field-row">
              <div>
                <label style={labelStyle}>Full Name <span style={{ color: RED }}>*</span></label>
                <input className="wc-input" type="text" name="fullName" placeholder="John Doe"
                  value={form.fullName} onChange={handleChange}
                  onFocus={() => setFocused("fullName")} onBlur={() => setFocused(null)}
                  style={inputStyle("fullName", !!errors.fullName)} />
                {errors.fullName && <p style={errStyle}><ErrIcon />{errors.fullName}</p>}
              </div>
              <div>
                <label style={labelStyle}>Banquet / Venue Name <span style={{ color: RED }}>*</span></label>
                <input className="wc-input" type="text" name="banquetName" placeholder="Grand Palace Banquet"
                  value={form.banquetName} onChange={handleChange}
                  onFocus={() => setFocused("banquetName")} onBlur={() => setFocused(null)}
                  style={inputStyle("banquetName", !!errors.banquetName)} />
                {errors.banquetName && <p style={errStyle}><ErrIcon />{errors.banquetName}</p>}
              </div>
              <div>
                <label style={labelStyle}>City <span style={{ color: RED }}>*</span></label>
                <input className="wc-input" type="text" name="city" placeholder="Mumbai"
                  value={form.city} onChange={handleChange}
                  onFocus={() => setFocused("city")} onBlur={() => setFocused(null)}
                  style={inputStyle("city", !!errors.city)} />
                {errors.city && <p style={errStyle}><ErrIcon />{errors.city}</p>}
              </div>
            </div>

            {/* Row 2: Email + Phone + Venue Type */}
            <div className="wc-field-row">
              <div>
                <label style={labelStyle}>Email Address <span style={{ color: RED }}>*</span></label>
                <input className="wc-input" type="email" name="email" placeholder="john@example.com"
                  value={form.email} onChange={handleChange}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  style={inputStyle("email", !!errors.email)} />
                {errors.email && <p style={errStyle}><ErrIcon />{errors.email}</p>}
              </div>
              <div>
                <label style={labelStyle}>Phone Number <span style={{ color: RED }}>*</span></label>
                <input className="wc-input" type="tel" name="phone" placeholder="9876543210" maxLength={10}
                  value={form.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setForm((p) => ({ ...p, phone: val }));
                    if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                  }}
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                  style={inputStyle("phone", !!errors.phone)} />
                {errors.phone && <p style={errStyle}><ErrIcon />{errors.phone}</p>}
              </div>
              <div>
                <label style={labelStyle}>
                  Venue Type{" "}
                  <span style={{ fontSize: 11, color: "#9AA4B8", fontWeight: 400 }}>(optional)</span>
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    className="wc-input"
                    name="venueType"
                    value={form.venueType}
                    onChange={handleChange}
                    onFocus={() => setFocused("venueType")} onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle("venueType", false),
                      appearance: "none", WebkitAppearance: "none",
                      cursor: "pointer",
                      color: form.venueType ? DARK : "#9AA4B8",
                      paddingRight: 36,
                    }}
                  >
                    <option value="">Select type...</option>
                    <option>Banquet Hall</option>
                    <option>Hotel</option>
                    <option>Resort</option>
                    <option>Event Space</option>
                    <option>Restaurant</option>
                    <option>Other</option>
                  </select>
                  {/* Chevron */}
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9AA4B8" }}
                  >
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Message — full width */}
            <div>
              <label style={labelStyle}>
                Message{" "}
                <span style={{ fontSize: 11, color: "#9AA4B8", fontWeight: 400 }}>(optional)</span>
              </label>
              <textarea
                className="wc-input"
                name="message"
                placeholder="Tell us about your requirements, current challenges, or anything else you'd like us to know..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                style={{ ...inputStyle("message", false), resize: "vertical", minHeight: 110 }}
              />
            </div>

            {/* Footer row: note + submit */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 4 }}>
              <p style={{ fontSize: 12, color: "#9AA4B8" }}>
                <span style={{ color: RED }}>*</span> Required fields &nbsp;·&nbsp; We typically respond within 24 hours.
              </p>
              <button
                className="wc-btn"
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "14px 36px", borderRadius: 100,
                  background: isLoading ? "#9AA4B8" : RED, 
                  color: "#fff",
                  fontSize: 14, fontWeight: 700, letterSpacing: "0.02em",
                  border: "none", cursor: isLoading ? "not-allowed" : "pointer", 
                  flexShrink: 0,
                  opacity: isLoading ? 0.7 : 1,
                  transition: "opacity 0.25s, background 0.25s",
                }}
              >
                {isLoading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="12.57" strokeDashoffset="3.14" fill="none" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}