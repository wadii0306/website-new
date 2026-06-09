"use client";

import React, { useEffect, useRef } from 'react';
import {
  Briefcase,
  Layers,
  Shield,
  Trophy,
  Target,
  Compass,
  ArrowRight,
  Rocket,
  Network,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Venues Managed' },
  { value: '50K+', label: 'Events Booked' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

const trustCards = [
  {
    number: '01',
    title: '5 Years of Hospitality & Banquet Industry Experience',
    desc: 'Our team understands the day-to-day challenges of banquet hall management, event coordination, customer communication, and venue operations.',
    icon: Briefcase,
  },
  {
    number: '02',
    title: 'Purpose-Built Banquet Management Software',
    desc: 'Designed specifically for banquet halls, hotels, wedding venues, and event management businesses — not adapted from generic tools.',
    icon: Layers,
  },
  {
    number: '03',
    title: 'Transparent Booking & Venue Operations',
    desc: 'Track bookings, payments, customer communications, and event progress through a centralized banquet management system.',
    icon: Shield,
  },
  {
    number: '04',
    title: 'Trusted by Venue Owners Across India',
    desc: 'Helping banquet managers streamline bookings, improve customer experience, and increase operational efficiency.',
    icon: Trophy,
  },
];

const missionPoints = [
  'Streamline every booking workflow',
  'Bridge the client–vendor communication gap',
  'Drive data-led decisions for venues',
];

const visionPoints = [
  "Become India's #1 banquet CRM",
  'Scale multi-venue intelligence across India',
  'Set the industry standard for transparency',
];

const visionRoadmap: {
  year: string
  phase: string
  title: string
  detail: string
  highlight: string
  icon: LucideIcon
}[] = [
  {
    year: '2025',
    phase: '01',
    title: 'Foundation',
    detail: 'Launch core CRM, leads, bookings, and billing — the operational backbone venues need first.',
    highlight: 'Core platform',
    icon: Rocket,
  },
  {
    year: '2026',
    phase: '02',
    title: 'Multi-Venue Intelligence',
    detail: 'Advanced reporting, debtor tracking, and automation that connects every hall you operate.',
    highlight: 'Smart scale',
    icon: Network,
  },
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
    <section ref={sectionRef} id="about" className="w-full bg-white" style={{ color: '#1D2638' }}>

      {/* ── PART 1: About Wadii (Balanced editorial + structured cards) ── */}
      <div data-nav-theme="light" className="max-w-6xl mx-auto px-6 py-20">
        <div className="wadii-reveal mb-4">
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B45309',
            }}
          >
            Wadii: #1 Banquet Management Software
          </span>
        </div>

        <h2
          className="wadii-reveal mb-5"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 'clamp(36px, 4.6vw, 64px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#1E1B1A',
            maxWidth: 840,
          }}
        >
          India&apos;s trusted{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 500 }}>banquet management</em>{' '}
          platform
        </h2>

        <p className="wadii-reveal delay-1 text-gray-600 text-base md:text-[19px] leading-relaxed max-w-4xl mb-12">
          Wadii is a cloud-based banquet management software built specifically for banquet halls, hotels, wedding venues, convention centers, and event management businesses. Our banquet management system helps venue owners manage bookings, customer relationships, billing, communication, and reporting from a single platform.
        </p>

        <div
          className="wadii-reveal delay-2 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="rounded-xl border border-[#E6ECF5] bg-[#FAFCFF] px-4 py-3">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-gray-500 mb-1">About</p>
            <p className="text-[15px] font-semibold text-[#1D2638]">Banquet Management CRM Platform</p>
          </div>
          <div className="rounded-xl border border-[#E6ECF5] bg-[#FAFCFF] px-4 py-3">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-gray-500 mb-1">Founded</p>
            <p
              className="text-[24px] leading-none text-[#111827]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
            >
              June 3, 2025
            </p>
          </div>
          <div className="rounded-xl border border-[#E6ECF5] bg-[#FAFCFF] px-4 py-3">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-gray-500 mb-1">Founder / Owner</p>
            <p
              className="text-[24px] leading-snug text-[#111827]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
            >
              <span className="inline-block rounded-md bg-[#FEE9E7] px-2.5 py-1 shadow-[inset_0_0_0_1px_rgba(245,181,178,0.4)]">
                Mr. Jainam Shah
              </span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="story-card hover-lift card-glow wadii-reveal delay-3 rounded-2xl p-7 md:p-8 relative overflow-hidden"
            style={{ border: '1px solid rgba(29,38,56,0.1)', background: '#fff' }}
          >
            <span style={cardLabelStyle}>Our Story</span>
            <p className="text-gray-600 text-[15px] leading-[1.8] mb-4">
              Wadii bridges the gap between clients and vendors with clear communication and seamless coordination across the entire event lifecycle.
            </p>
            <p className="text-gray-600 text-[15px] leading-[1.8]">
              For clients, it provides complete visibility into event details. For banquet managers and owners, it offers robust tools to track customer flow, monitor sales, manage leads, and analyze performance in one integrated system.
            </p>
          </div>

          <div
            className="story-card hover-lift card-glow wadii-reveal delay-4 rounded-2xl p-7 md:p-8 relative overflow-hidden"
            style={{ border: '1px solid rgba(29,38,56,0.1)', background: '#fff' }}
          >
            <span style={cardLabelStyle}>Our History</span>
            <p className="text-gray-600 text-[15px] leading-[1.8] mb-6">
              Wadii was born with a clear vision: to organize and professionalize banquet operations through practical, modern technology tailored for real venue teams.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t" style={{ borderColor: 'rgba(29,38,56,0.08)' }}>
              {stats.map((s) => (
                <div key={s.label} className="stat-item text-center rounded-xl py-3 px-2">
                  <p style={{ fontSize: 22, fontWeight: 900, color: '#F52D2A', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: '#9AA4B8', marginTop: 5, fontWeight: 600 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(29,38,56,0.12), transparent)' }} />

      {/* ── PART 2: Why Trust Us ── */}
      <div data-nav-theme="dark" className="relative overflow-hidden bg-[#111A2D]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(230,46,45,0.22) 0%, transparent 60%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          aria-hidden
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="wadii-reveal text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 bg-white/5 text-white/70 border border-white/10">
              Why Trust Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Why Banquet Halls{' '}
              <span className="gradient-text">Choose Wadii</span>
            </h2>
            <p className="text-white/55 text-base md:text-lg leading-relaxed">
              Four reasons venue owners across India trust Wadii as their banquet management software.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="trust-panel overflow-hidden rounded-3xl border border-white/12 bg-white/[0.03] shadow-2xl shadow-black/25">
              <div className="h-1 bg-gradient-to-r from-[#E62E2D] via-[#ff7b7a] to-[#E62E2D]/40" aria-hidden />

              <div className="relative grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
                {trustCards.map((card, i) => {
                  const Icon = card.icon
                  return (
                    <motion.article
                      key={card.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="trust-pillar group relative flex min-h-[220px] flex-col p-6 md:p-7 transition-colors duration-300 hover:bg-[#E62E2D]/[0.07]"
                    >
                      <div className="relative mb-5 flex items-start justify-between gap-3">
                        <span className="text-[28px] font-black leading-none tracking-tight text-[#ff8a89] tabular-nums">
                          {card.number}
                        </span>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#ff8a89] transition-all duration-300 group-hover:border-[#E62E2D]/50 group-hover:bg-[#E62E2D] group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-900/30">
                          <Icon className="h-5 w-5" />
                        </span>
                      </div>

                      <h3 className="relative mb-2.5 text-[15px] font-bold leading-snug text-white">
                        {card.title}
                      </h3>
                      <p className="relative flex-1 text-sm leading-relaxed text-white/55">
                        {card.desc}
                      </p>

                      <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#E62E2D] to-[#ff7b7a] transition-all duration-500 group-hover:brightness-110"
                          style={{ width: `${(i + 1) * 25}%` }}
                        />
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </div>

            {/* Chevron links between pillars — desktop only */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
              {[1, 2, 3].map((step) => (
                <span
                  key={step}
                  className="absolute top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#111A2D] text-sm font-bold text-[#ff8a89] shadow-md shadow-black/40"
                  style={{ left: `${step * 25}%` }}
                >
                  ›
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(29,38,56,0.12), transparent)' }} />

      {/* ── PART 3: Direction — Mission, Vision & Roadmap (flagship) ── */}
      <div id="direction" data-nav-theme="light" className="relative overflow-hidden isolate">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'linear-gradient(180deg, #ffffff 0%, #f3f6fb 45%, #ffffff 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(230,46,45,0.15) 0%, transparent 70%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(17,26,45,0.12) 0%, transparent 70%)' }}
          aria-hidden
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="wadii-reveal text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="wadii-pill" style={pillStyle}>Direction</span>
            <h2
              className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4"
              style={{ color: '#1D2638' }}
            >
              Where we are going
              <br />
              <span className="gradient-text">and why it matters</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Our mission keeps teams grounded. Our vision sets the north star. The roadmap shows how Wadii scales with India&apos;s banquet industry.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Mission — dark flagship card */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="wadii-reveal relative overflow-hidden rounded-3xl p-8 md:p-9 text-white shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, #111A2D 0%, #1a2742 50%, #152238 100%)',
                boxShadow: '0 24px 60px rgba(17,26,45,0.28)',
              }}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
                style={{ background: 'radial-gradient(circle, #E62E2D 0%, transparent 70%)' }}
                aria-hidden
              />
              <div className="relative flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E62E2D] shadow-lg shadow-red-900/40">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">Our Mission</p>
                  <h3 className="text-2xl font-extrabold tracking-tight">Purpose in every workflow</h3>
                </div>
              </div>
              <p className="relative text-white/70 text-[15px] leading-relaxed mb-7">
                Our mission is to help banquet halls and event venues operate more efficiently through modern banquet management software that simplifies bookings, customer management, billing, communication, and reporting.
              </p>
              <ul className="relative space-y-3">
                {missionPoints.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#E62E2D]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>

            {/* Vision — light elevated card */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="wadii-reveal relative overflow-hidden rounded-3xl border border-[#e8edf5] bg-white p-8 md:p-9 shadow-xl shadow-gray-200/50"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E62E2D] via-[#ff6b6a] to-[#111A2D]" />
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111A2D] text-white">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Our Vision</p>
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#1D2638]">India&apos;s banquet standard</h3>
                </div>
              </div>
              <p className="text-gray-600 text-[15px] leading-relaxed mb-7">
                Our vision is to become India&apos;s leading banquet management system, helping thousands of venues digitize operations and deliver exceptional event experiences.
              </p>
              <ul className="space-y-3">
                {visionPoints.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-[#eef2f8] bg-[#f8faff] px-4 py-3 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#111A2D]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>

          {/* Vision Map — editorial timeline */}
          <motion.div
            data-nav-theme="dark"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="wadii-reveal delay-3 vision-roadmap relative overflow-hidden rounded-3xl border border-[#1a2742] shadow-2xl shadow-[#111A2D]/30"
          >
            <div className="vision-roadmap-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(230,46,45,0.45) 0%, transparent 70%)' }}
              aria-hidden
            />

            <div className="relative px-6 py-8 md:px-10 md:py-10 border-b border-white/10">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#E62E2D]/30 bg-[#E62E2D]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff9a99] mb-4">
                    Growth roadmap
                  </span>
                  <h3 className="text-2xl md:text-[2rem] font-extrabold text-white tracking-tight leading-tight">
                    From first venue to{' '}
                    <span className="text-[#ff8a89]">smart scale</span>
                  </h3>
                </div>
                <p className="text-sm text-white/50 max-w-md leading-relaxed lg:text-right">
                  Two deliberate phases — each built for how Indian banquet halls actually grow, not generic SaaS timelines.
                </p>
              </div>
            </div>

            <div className="relative px-4 pb-6 md:px-6 md:pb-8">
              {/* Desktop — linked timeline rail */}
              <div className="relative mb-1 hidden md:block">
                <div
                  className="pointer-events-none absolute left-[calc(25%-6px)] right-[calc(25%-6px)] top-6 z-0 -translate-y-1/2"
                  aria-hidden
                >
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="vision-roadmap-track h-full w-full" />
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-2 max-w-2xl mx-auto">
                  {visionRoadmap.map((item, index) => (
                    <motion.div
                      key={`node-${item.year}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.07 }}
                      className="flex flex-col items-center"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#E62E2D] to-[#b82423] text-sm font-extrabold text-white shadow-lg shadow-red-900/50 ring-[5px] ring-[#111A2D]">
                        {item.year}
                      </span>
                      <span className="mt-2.5 rounded-full border border-white/15 bg-[#111A2D] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70">
                        {item.highlight}
                      </span>
                      <span
                        className="mt-4 block h-9 w-px bg-gradient-to-b from-[#E62E2D]/80 via-[#E62E2D]/35 to-transparent"
                        aria-hidden
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Cards */}
              <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
                {visionRoadmap.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.article
                      key={item.year}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="vision-roadmap-card group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 md:px-7 md:pb-7 md:pt-5 transition-all duration-300 hover:border-[#E62E2D]/40 hover:shadow-xl hover:shadow-black/20"
                    >
                      <span
                        className="pointer-events-none absolute right-4 top-3 text-5xl font-black text-white/[0.04] select-none"
                        aria-hidden
                      >
                        {item.phase}
                      </span>

                      {/* Mobile — inline year + label with vertical link */}
                      <div className="relative mb-5 md:hidden">
                        <div className="flex items-center gap-3">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E62E2D] to-[#b82423] text-sm font-extrabold text-white shadow-lg shadow-red-900/40 ring-4 ring-[#111A2D]">
                            {item.year}
                          </span>
                          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/55">
                            {item.highlight}
                          </span>
                        </div>
                        {index < visionRoadmap.length - 1 && (
                          <span
                            className="mx-6 mt-3 block h-8 w-px bg-gradient-to-b from-[#E62E2D]/70 to-transparent"
                            aria-hidden
                          />
                        )}
                      </div>

                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#ff8a89] border border-white/10">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h4 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-sm text-white/55 leading-relaxed">{item.detail}</p>
                    </motion.article>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* CTA banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="wadii-reveal delay-4 mt-10 rounded-2xl border border-[#f5c4c4] bg-gradient-to-r from-[#fff5f5] via-white to-[#f8faff] p-8 md:p-10 text-center shadow-lg shadow-red-100/40"
          >
            <p className="text-sm font-semibold text-[#E62E2D] mb-2">Ready to align with our direction?</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#1D2638] mb-6 tracking-tight">
              Let&apos;s build the future of banquet management together
            </h3>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="wadii-cta inline-flex items-center gap-2 rounded-full bg-[#111A2D] px-8 py-3.5 text-sm font-semibold text-white shadow-xl hover:bg-[#0d1424]"
            >
              Talk to Our Team
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
};