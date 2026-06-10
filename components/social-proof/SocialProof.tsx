"use client"

import React from 'react'

const BRANDS = [
  { name: 'Patidar Bhavan', tag: 'Banquet Hall', style: 'serif', accent: '#5c6f57' },
  { name: 'Lauriant Hotels & Resorts', tag: 'Hotels & Resorts', style: 'script', accent: '#7a4d2a' },
  { name: 'Akshata Banquets', tag: 'Banquets', style: 'caps', accent: '#1f3b67' },
  { name: 'Belleza Banquets', tag: 'Banquets', style: 'serif', accent: '#7a3641' },
  { name: 'Banjara Royale Banquets', tag: 'Banquets', style: 'caps', accent: '#4a5568' },
  { name: 'Geet Govind Banquets', tag: 'Banquets', style: 'script', accent: '#365872' },
  { name: 'Gajlaxmi Hospitality', tag: 'Hospitality', style: 'caps', accent: '#576543' },
]

export const SocialProof = () => {
  return (
    <section
      data-nav-theme="light"
      className="py-16 section-surface-white border-b border-gray-100"
      aria-label="Trusted by leading banquet venues"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-gray-400 mb-2">
          Trusted by <span className="text-[#111A2D] font-bold">500+ venues</span> across India
        </p>
        <h3 className="text-3xl md:text-5xl font-extrabold text-[#111A2D] mb-3 leading-tight">
          Trusted by Industry Leaders
        </h3>
        <p className="text-base md:text-xl text-gray-500 leading-relaxed">
          Powering <span className="font-semibold text-[#111A2D]">modern banquet operations</span> with Wadii
        </p>

        <div className="mt-10 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" style={{ background: 'linear-gradient(to left, white, transparent)' }} />

          <div
            className="flex items-center py-2"
            style={{
              width: 'max-content',
              animation: 'ticker 68s linear infinite',
            }}
          >
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
              <article
                key={`${brand.name}-${idx}`}
                className="mx-6 md:mx-8 min-w-[180px] md:min-w-[220px] text-center"
              >
                <p
                  className={[
                    'leading-tight whitespace-nowrap',
                    brand.style === 'serif' ? "font-[Georgia,'Times_New_Roman',serif] text-[30px] md:text-[35px] font-semibold" : '',
                    brand.style === 'caps' ? 'text-[20px] md:text-[23px] font-semibold tracking-[0.16em] uppercase' : '',
                    brand.style === 'script' ? "font-[Georgia,'Times_New_Roman',serif] italic text-[32px] md:text-[38px]" : '',
                  ].join(' ')}
                  style={{ color: brand.accent }}
                >
                  {brand.name}
                </p>
                <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[#9aa4b5] font-semibold">
                  {brand.tag}
                </p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
