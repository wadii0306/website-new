"use client"

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Mail, MapPin, Instagram } from 'lucide-react'
import { INSTAGRAM_URL, OPERATOR_NAME, PRODUCT_NAME } from '@/lib/brand'

const NAV_LINKS = {
  Product: [
    { label: 'Features',   href: '#features' },
    { label: 'Pricing',    href: '#pricing' },
    { label: 'Dashboard',  href: '#features' },
    { label: 'Analytics',  href: '#features' },
    { label: 'Bookings',   href: '#features' },
  ],
  Company: [
    { label: 'About Us',   href: '#about' },
    { label: 'Contact',    href: '#contact' },
    { label: 'Blog',       href: '#' },
    { label: 'Careers',    href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'FAQs',        href: '#faq' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
}

const SOCIALS = [
  { Icon: Instagram, href: INSTAGRAM_URL, label: 'Wadii on Instagram' },
]

export const Footer = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('wadii:navigate', { detail: { href } }))
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer data-nav-theme="dark" className="bg-[#0b1120] text-white border-t border-white/10" aria-label="Wadii footer">

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#111A2D] to-[#1D2638] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-1">
              Ready to streamline your banquet hall?
            </h3>
            <p className="text-white/50 text-sm">All-in-one plan from ₹19,999/year. Book a demo to get started.</p>
          </div>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-[#E62E2D] hover:bg-[#c92827] text-white font-semibold rounded-xl text-sm shadow-lg shadow-red-900/40 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            Get Started →
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-2">
            <Logo variant="dark" className="h-10 w-auto mb-3" />
            <p className="text-white/40 text-xs font-medium mb-1">
              Powered by {OPERATOR_NAME}
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              The #1 banquet management software for event venues, party halls, and wedding halls. Simplify your operations, grow your bookings.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a href="mailto:managewisessolution@gmail.com" className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors">
                <Mail className="w-4 h-4 text-[#E62E2D]" />
                managewisessolution@gmail.com
              </a>
              <div className="flex items-center gap-2.5 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-[#E62E2D]" />
                India
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(NAV_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">{group}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleScroll(e, link.href)}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {OPERATOR_NAME}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <Link
              href="/privacy-policy"
              className="text-white/45 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <p className="text-white/20 hidden sm:block">·</p>
            <Link
              href="/terms-of-service"
              className="text-white/45 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <p className="text-white/20 hidden sm:block">·</p>
            <p className="text-white/30 text-xs">
              {PRODUCT_NAME} — banquet management software
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
