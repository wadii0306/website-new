"use client"

import React from 'react'
import { Star, Quote } from 'lucide-react'

// Placeholder reviews — replace with real client testimonials when available
const TESTIMONIALS = [
  {
    name: 'Rajesh Patel',
    role: 'Owner, Grand Palace Banquet',
    location: 'Ahmedabad, Gujarat',
    avatar: 'R',
    color: '#E62E2D',
    rating: 5,
    text: "Wadii completely transformed how we manage our banquet hall. Before, we were tracking bookings in Excel sheets. Now everything is centralised — leads, bookings, payments. Our bookings increased by 40% in just 3 months.",
  },
  {
    name: 'Sunita Sharma',
    role: 'Manager, Royal Events Center',
    location: 'Mumbai, Maharashtra',
    avatar: 'S',
    color: '#111A2D',
    rating: 5,
    text: "The calendar view and lead management features save our team at least 10 hours per week. We never miss a follow-up now. The analytics dashboard alone is worth the subscription price.",
  },
  {
    name: 'Mohammed Ali',
    role: 'Director, Star Celebrations',
    location: 'Surat, Gujarat',
    avatar: 'M',
    color: '#4f8ef7',
    rating: 5,
    text: "We manage multiple venues with Wadii. Multi-team access and muhurat-day planning keep our staff aligned in real time — we have zero double-booking issues now.",
  },
  {
    name: 'Priya Menon',
    role: 'Co-founder, Heritage Banquets',
    location: 'Pune, Maharashtra',
    avatar: 'P',
    color: '#22c55e',
    rating: 5,
    text: "The vendor management module helps us track vendor payments perfectly. We know exactly what we owe and what's been paid. Support is responsive whenever we need help.",
  },
]

export const TestimonialsSection = () => {
  return (
    <section
      data-nav-theme="dark"
      className="section-surface-dark py-24 overflow-hidden relative"
      aria-label="Customer reviews of Wadii banquet management software"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-10 rounded-full"
          style={{ background: 'radial-gradient(ellipse, #E62E2D 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 border border-white/15 bg-white/5 text-white/60">
            Customer Reviews
          </span>
          <h2 className="section-heading text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            500+ Venue Managers<br />
            <span className="gradient-text">Love Wadii</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Real results from banquet hall owners and event venue managers across India.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-white">4.8</span>
            <span className="text-sm text-white/40">from 247 reviews</span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/8 transition-all duration-300 group hover-lift card-glow min-h-[300px] flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-6 h-6 text-[#E62E2D] mb-4 opacity-60" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-white/70 text-sm leading-relaxed mb-6 flex-1">"{t.text}"</p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                  <p className="text-white/30 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E62E2D] hover:bg-[#c92827] text-white font-semibold rounded-xl shadow-lg shadow-red-900/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started with Wadii
          </a>
        </div>
      </div>
    </section>
  )
}
