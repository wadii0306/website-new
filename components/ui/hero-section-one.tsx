"use client"

import React from 'react'
import Image from 'next/image'
import { ArrowRight, Play, Star, TrendingUp, Users, Calendar } from 'lucide-react'
import { HeroHeader } from './header'
import { OPERATOR_NAME } from '@/lib/brand'

const STATS = [
  { value: '500+', label: 'Venues', icon: <Users className="w-4 h-4" /> },
  { value: '50K+', label: 'Events Booked', icon: <Calendar className="w-4 h-4" /> },
  { value: '99.9%', label: 'Uptime', icon: <TrendingUp className="w-4 h-4" /> },
  { value: '4.8★', label: 'Avg Rating', icon: <Star className="w-4 h-4" /> },
]

const REVIEWS = [
  { name: 'Priya S.', text: 'Bookings doubled in 3 months', avatar: 'P' },
  { name: 'Rajan M.', text: 'Saves 10 hrs/week', avatar: 'R' },
]

export default function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <HeroHeader />
      <section
        data-nav-theme="dark"
        className="section-surface-dark relative min-h-screen flex flex-col overflow-hidden"
        aria-label="Wadii banquet management software hero"
      >
        {/* Background radial glows */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #E62E2D 0%, transparent 65%)' }} />
          <div className="absolute bottom-[-15%] right-[5%] w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #4f8ef7 0%, transparent 65%)' }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }} />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-8 xl:gap-10 items-center">

              {/* Left: copy */}
              <div className="mx-auto lg:mx-0 max-w-xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/60 text-xs font-semibold tracking-wide uppercase mb-3 animate-fade-up">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E62E2D]" />
                  Banquet management software
                </div>

                <p className="text-white/40 text-sm mb-6 animate-fade-up">
                  Powered by <span className="text-white/60 font-medium">{OPERATOR_NAME}</span>
                </p>

                {/* H1 — keyword-rich for SEO */}
                <h1
                  className="max-w-[18ch] sm:max-w-none text-[36px] sm:text-[44px] lg:text-[2.75rem] leading-[1.12] tracking-tight mb-5 animate-fade-up animate-delay-100"
                  style={{ fontFamily: "'Space Grotesk', 'Poppins', sans-serif", color: '#FFFFFF', fontWeight: 700 }}
                >
                  Banquet Management Software for{' '}
                  <span className="gradient-text">Banquet Halls, Hotels & Event Venues</span>
                </h1>

                <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-lg animate-fade-up animate-delay-200">
                  Wadii is a complete banquet management system for inquiries, bookings, billing, and analytics — trusted by venue owners who want more bookings and less admin.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fade-up animate-delay-300">
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); handleScroll('#contact') }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#E62E2D] hover:bg-[#c92827] text-white text-base font-semibold rounded-xl shadow-lg shadow-red-900/40 hover:shadow-red-900/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    Book a Demo
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="#features"
                    onClick={(e) => { e.preventDefault(); handleScroll('#features') }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white text-base font-semibold rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    See How It Works
                  </a>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3 animate-fade-up animate-delay-400">
                  <div className="flex -space-x-2">
                    {REVIEWS.map((r, i) => (
                      <div
                        key={r.name}
                        className={[
                          "flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111A2D] text-xs font-bold text-white",
                          i === 0 ? "bg-[#E62E2D]" : "bg-[#1a2742]",
                        ].join(" ")}
                        title={`${r.name} — ${r.text}`}
                      >
                        {r.avatar}
                      </div>
                    ))}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111A2D] bg-white/15 text-xs font-bold text-white">
                      +
                    </div>
                  </div>
                  <div>
                    <div className="mb-0.5 flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-white/50">Loved by 500+ venue managers</p>
                  </div>
                </div>
              </div>

              {/* Right: product dashboard */}
              <div className="hero-dashboard-wrap relative w-full max-w-[640px] mx-auto lg:max-w-none lg:ml-auto lg:mr-0 mt-8 lg:mt-0 animate-fade-up animate-delay-200">
                <div className="relative">
                  <div
                    className="hero-dashboard-spotlight pointer-events-none absolute -inset-6 rounded-[1.5rem] blur-2xl"
                    aria-hidden
                  />

                  <div className="hero-dashboard-frame relative rounded-2xl border border-white/20 bg-white p-1.5 sm:p-2">
                    <div className="overflow-hidden rounded-xl ring-1 ring-black/5">
                      <Image
                        src="/hero/dashboard_trial.png"
                        alt="Wadii banquet management software dashboard for bookings, CRM, payments, and reporting"
                        width={1920}
                        height={1080}
                        priority
                        sizes="(max-width: 1024px) 92vw, 560px"
                        className="block h-auto w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center gap-1 py-6 px-4">
                  <div className="flex items-center gap-2 text-[#E62E2D] mb-1">{s.icon}</div>
                  <p className="text-2xl font-black text-white">{s.value}</p>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
