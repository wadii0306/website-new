"use client";

import React, { useEffect, useRef } from 'react';

const stats = [
  { value: '500+', label: 'Venues Managed' },
  { value: '50K+', label: 'Events Booked' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

const trustCards = [
  {
    number: '01',
    title: '5 Years of Service Industry Experience',
    desc: 'Our team brings half a decade of hands-on experience in the service and hospitality industry, understanding the real challenges you face daily.',
  },
  {
    number: '02',
    title: 'Purpose-Built Solution',
    desc: 'Specifically designed for hotels, banquet halls, and event managers. Every feature is crafted with your workflow in mind.',
  },
  {
    number: '03',
    title: 'Complete Transparency',
    desc: "Transparent workflows, complete auditability, and clear communication channels ensure you're always in control of your operations.",
  },
  {
    number: '04',
    title: 'Proven Track Record',
    desc: 'Trusted by banquet managers across India to streamline operations and deliver exceptional customer experiences.',
  },
];

const missionPoints = [
  'Streamline every booking workflow',
  'Bridge the client–vendor communication gap',
  'Drive data-led decisions for venues',
];

const visionPoints = [
  "Become India's #1 banquet CRM",
  'Expand to 5,000+ venues by 2027',
  'Set the industry standard for transparency',
];

// ── Shared style objects ──────────────────────────────────────────────────


const pillStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#F52D2A',
  padding: '5px 14px',
  borderRadius: 100,
  border: '1px solid rgba(242,139,138,0.35)',
  background: 'rgba(242,139,138,0.07)',
};

const cardLabelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#F52D2A',
  marginBottom: 16,
  display: 'block',
};

const decoTextStyle: React.CSSProperties = {
  fontSize: 'clamp(80px, 12vw, 140px)',
  fontWeight: 900,
  fontStyle: 'italic',
  color: 'transparent',
  WebkitTextStroke: '1px rgba(29,38,56,0.07)',
  lineHeight: 1,
  userSelect: 'none',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 0,
};

// ── Component ─────────────────────────────────────────────────────────────

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Inject hover + reveal transition styles that can't be done purely inline
    const styleId = 'wadii-about-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Reveal */
        .wadii-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .wadii-reveal.delay-1 { transition-delay: 0.1s; }
        .wadii-reveal.delay-2 { transition-delay: 0.2s; }
        .wadii-reveal.delay-3 { transition-delay: 0.3s; }
        .wadii-reveal.delay-4 { transition-delay: 0.4s; }
        .wadii-reveal.delay-5 { transition-delay: 0.5s; }
        .wadii-visible { opacity: 1 !important; transform: none !important; }

        /* Story card hover */
        .story-card { transition: border-color 0.3s, box-shadow 0.3s; }
        .story-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #F28B8A, transparent); opacity: 0; transition: opacity 0.3s; }
        .story-card:hover { border-color: rgba(242,139,138,0.3) !important; box-shadow: 0 12px 40px rgba(242,139,138,0.08); }
        .story-card:hover::before { opacity: 1; }

        /* Stat hover */
        .stat-item:hover { background: rgba(242,139,138,0.06); }

        /* Trust card hover */
        .trust-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.3s; }
        .trust-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 80px; height: 80px; border-radius: 20px 0 0 0; background: linear-gradient(135deg, transparent, rgba(242,139,138,0.08)); opacity: 0; transition: opacity 0.3s; }
        .trust-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(29,38,56,0.08); border-color: rgba(242,139,138,0.25) !important; }
        .trust-card:hover::after { opacity: 1; }
        .trust-card:hover .trust-number { color: rgba(242,139,138,0.35); }

        /* Check item hover */
        .check-item:hover { color: #1D2638; }

        /* CTA hover */
        .wadii-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(29,38,56,0.22); }
        .wadii-cta:hover svg { transform: translateX(4px); }
        .wadii-cta svg { transition: transform 0.25s; }

        /* Pill dot */
        .wadii-pill::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #F28B8A; }

        /* mv-block line */
        .mv-block::before { content: ''; position: absolute; top: 0; left: -24px; width: 2px; height: 100%; border-radius: 2px; }
        .mv-block-red::before { background: linear-gradient(180deg, #F28B8A, transparent); }
        .mv-block-dark::before { background: linear-gradient(180deg, #1D2638, transparent); }
      `;
      document.head.appendChild(style);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('wadii-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    const targets = sectionRef.current?.querySelectorAll('.wadii-reveal');
    targets?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about-section" className="w-full bg-white" style={{ color: '#1D2638' }}>

      {/* ── PART 1: About Wadii ── */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-2">
          <div className="wadii-reveal mb-4">
            <span className="wadii-pill" style={pillStyle}>About Us</span>
          </div>
        </div>

        <h2
          className="wadii-reveal text-4xl font-extrabold mb-2 leading-tight tracking-tight"
          style={{ color: '#1D2638' }}
        >
          About Wadii
        </h2>
        <p className="wadii-reveal delay-1 text-gray-500 mb-10 text-base">
          Transforming the banquet management industry through innovation and transparency.
        </p>

        {/* Big heading with decorative overlap */}
        <div className="relative mb-16">
          <div aria-hidden="true" style={decoTextStyle}>Wadii</div>
        </div>

        {/* Story + History cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Our Story */}
          <div
            className="story-card wadii-reveal delay-2 rounded-2xl p-8 relative overflow-hidden"
            style={{ border: '1px solid rgba(242,139,138,0.3)', background: '#fff' }}
          >
            <span style={cardLabelStyle}>Our Story</span>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Wadii is an advanced banquet management software designed to bring transparency, efficiency, and digital transformation to the event management industry. The platform bridges the gap between clients and vendors, ensuring clear communication and seamless coordination throughout the event lifecycle.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              For clients, Wadii ensures complete visibility into event details. For banquet managers and owners, it offers robust tools to track customer flow, monitor sales, and analyze performance — all within a single, integrated system.
            </p>
          </div>

          {/* Our History */}
          <div
            className="story-card wadii-reveal delay-3 rounded-2xl p-8 relative overflow-hidden"
            style={{ border: '1px solid rgba(242,139,138,0.3)', background: '#fff' }}
          >
            <span style={cardLabelStyle}>Our History</span>
            <div className="flex gap-6 mb-4 text-sm">
              <div>
                <span className="font-semibold" style={{ color: '#1D2638' }}>Founded: </span>
                <span className="text-gray-500">June 3, 2025</span>
              </div>
              <div>
                <span className="font-semibold" style={{ color: '#1D2638' }}>Founder: </span>
                <span className="text-gray-500">Mr. Jainam Shah</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Wadii was born from a clear vision: to organize and professionalize the banquet management sector through digital transformation. Our journey began with a deep understanding of the challenges faced by event managers and a commitment to solving them through innovative technology.
            </p>

            {/* Stats row */}
            <div
              className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t"
              style={{ borderColor: 'rgba(29,38,56,0.08)' }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="stat-item text-center"
                  style={{ padding: '16px 8px', borderRadius: 12, transition: 'background 0.25s' }}
                >
                  <p style={{ fontSize: 21, fontWeight: 900, color: '#F52D2A', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: '#9AA4B8', marginTop: 4, fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(29,38,56,0.12), transparent)' }} />

      {/* ── PART 2: Why Trust Us ── */}
      <div style={{ background: '#f8f9fb' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="wadii-reveal text-3xl font-extrabold mb-2 tracking-tight" style={{ color: '#1D2638' }}>
            Why Trust Us
          </h2>
          <p className="wadii-reveal delay-1 text-gray-500 mb-10">Built on experience, driven by excellence.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trustCards.map((card, i) => (
              <div
                key={card.title}
                className={`trust-card wadii-reveal delay-${i + 1} rounded-2xl bg-white relative overflow-hidden`}
                style={{
                  padding: 24,
                  border: i === 0 ? '1.5px solid rgba(242,139,138,0.5)' : '1px solid rgba(242,139,138,0.2)',
                }}
              >
                <p
                  className="trust-number"
                  style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, color: '#F52D2A', marginBottom: 16, transition: 'color 0.3s' }}
                >
                  {card.number}
                </p>
                <h3 className="font-bold text-sm mb-3 leading-snug" style={{ color: '#1D2638' }}>
                  {card.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(29,38,56,0.12), transparent)' }} />

      {/* ── PART 3: Mission & Vision ── */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="wadii-reveal mb-14">
          <span className="wadii-pill" style={pillStyle}>Direction</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(242,139,138,0.12)', flexShrink: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" fill="#F52D2A" />
                </svg>
              </div>
              <h3 className="wadii-reveal text-2xl font-extrabold" style={{ color: '#1D2638' }}>Our Mission</h3>
            </div>
            <p className="wadii-reveal delay-1 text-gray-600 leading-relaxed mb-6">
              To transform the banquet and event management sector by making it more organized, transparent, and professional, while simplifying operations for owners and managers and delivering a seamless experience for customers.
            </p>
            <ul
              className="mv-block mv-block-red wadii-reveal delay-2 space-y-2"
              style={{ position: 'relative', paddingLeft: 24 }}
            >
              {missionPoints.map((item) => (
                <li
                  key={item}
                  className="check-item flex items-start gap-3 text-sm text-gray-600"
                  style={{ paddingTop: 10, paddingBottom: 10, borderBottom: '1px solid rgba(29,38,56,0.06)', transition: 'color 0.2s' }}
                >
                  <span style={{ marginTop: 5, width: 8, height: 8, borderRadius: '50%', background: '#F52D2A', flexShrink: 0, display: 'inline-block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDF1F1', flexShrink: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="3" fill="#F52D2A" />
                  <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="#F52D2A" />
                </svg>
              </div>
              <h3 className="wadii-reveal text-2xl font-extrabold" style={{ color: '#1D2638' }}>Our Vision</h3>
            </div>
            <p className="wadii-reveal delay-1 text-gray-600 leading-relaxed mb-6">
              To establish Wadii as the go-to platform for event planning and management — trusted and used by people of all ages. Every event planned effortlessly, managed transparently, and executed with excellence.
            </p>
            <ul
              className="mv-block mv-block-dark wadii-reveal delay-2 space-y-2"
              style={{ position: 'relative', paddingLeft: 24 }}
            >
              {visionPoints.map((item) => (
                <li
                  key={item}
                  className="check-item flex items-start gap-3 text-sm text-gray-600"
                  style={{ paddingTop: 10, paddingBottom: 10, borderBottom: '1px solid rgba(29,38,56,0.06)', transition: 'color 0.2s' }}
                >
                  <span style={{ marginTop: 5, width: 8, height: 8, borderRadius: '50%', background: '#F52D2A', flexShrink: 0, display: 'inline-block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="wadii-reveal delay-3 mt-14 text-center">
          <button
            className="wadii-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              borderRadius: 100,
              background: '#1D2638',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.03em',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s',
            }}
          >
            Learn More About Us
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </section>
  );
};