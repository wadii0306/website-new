"use client"

import React, { useState } from 'react';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#F28B8A" fillOpacity="0.15" />
    <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#F28B8A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const plans = [
  {
    name: 'Starter',
    tagline: 'Perfect for small banquet halls',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      'Up to 50 bookings/month',
      'Basic analytics dashboard',
      'Email & calendar sync',
      'Standard templates',
      'Email support',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Professional',
    tagline: 'Ideal for growing businesses',
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      'Unlimited bookings',
      'Advanced analytics & reports',
      'Priority support (24/7)',
      'Custom report builder',
      'Client portal access',
      'Multi-user accounts',
    ],
    cta: 'Get Started',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    tagline: 'For large banquet chains',
    monthlyPrice: 399,
    yearlyPrice: 319,
    features: [
      'Everything in Professional',
      'Full API access',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      id="pricing-section"
      className="w-full py-24 relative overflow-hidden"
    //   style={{ background: '#0f1724' }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow blobs */}
        <div
          className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, #F28B8A 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-[-100px] w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #F28B8A 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(242,139,138,0.12)', color: '#F28B8A', border: '1px solid rgba(242,139,138,0.25)' }}
          >
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f1724] mb-4 leading-tight tracking-tight">
            Simple, Transparent<br />
            <span style={{ color: '#F52D2A' }}>Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Choose the perfect plan for your banquet hall. No hidden fees, no surprises — just results.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none"
              style={{ background: '#2a3547' }}
            >
              <span
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300"
                style={{ transform: isYearly ? 'translateX(28px)' : 'translateX(0)' }}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-gray-500'}`}>
              Yearly
              <span
                className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(242,139,138,0.15)', color: '#F52D2A' }}
              >
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl transition-transform duration-300 hover:-translate-y-1"
              style={
                plan.featured
                  ? {
                      background: '#1D2638',
                      border: '1.5px solid rgba(242,139,138,0.4)',
                      boxShadow: '0 0 40px rgba(242,139,138,0.12), 0 20px 60px rgba(0,0,0,0.4)',
                      transform: 'scale(1.04)',
                    }
                  : {
                      background: '#161f2e',
                      border: '1px solid rgba(255,255,255,0.06)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }
              }
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full"
                    style={{ background: '#F52D2A', color: '#fff' }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan name */}
                <p className="text-xs font-bold tracking-[0.15em] uppercase mb-1" style={{ color: 'white' }}>
                  {plan.name}
                </p>
                <p className="text-gray-400 text-sm mb-6">{plan.tagline}</p>

                {/* Price */}
                <div className="flex items-end gap-1 mb-8">
                  <span className="text-5xl font-extrabold text-white leading-none">
                    ₹{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-500 mb-1">/mo</span>
                </div>

                {/* Divider */}
                <div className="w-full h-px mb-8" style={{ background: 'white' }} />

                {/* Features */}
                <ul className="space-y-3.5 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200"
                  style={
                    plan.featured
                      ? {
                          background: '#F52D2A',
                          color: '#fff',
                          boxShadow: '0 4px 20px rgba(242,139,138,0.35)',
                        }
                      : {
                          background: 'transparent',
                          color: 'white',
                          border: '1.5px solid #F52D2A',
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!plan.featured) {
                      e.currentTarget.style.background = '#F52D2A';
                    } else {
                      e.currentTarget.style.background = '#F52D2A';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.featured) {
                      e.currentTarget.style.background = 'transparent';
                    } else {
                      e.currentTarget.style.background = '#F52D2A';
                    }
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-600 text-sm mt-12">
          All plans include a <span className="text-gray-400 font-medium">14-day free trial</span>. No credit card required.
        </p>
      </div>
    </section>
  );
};