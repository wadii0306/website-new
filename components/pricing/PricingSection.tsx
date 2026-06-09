"use client"

import React from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"

const INCLUDED_FEATURES = [
  "Unlimited bookings & leads",
  "Billing, invoicing & payments",
  "Multi-user roles & permissions",
  "Expense & vendor management",
  "Analytics & PDF / Excel exports",
  "Client communication hub",
  "Dedicated onboarding support",
]

export const PricingSection = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="pricing"
      data-nav-theme="dark"
      className="section-surface-dark relative overflow-hidden py-24 md:py-28"
      aria-label="Wadii banquet management software pricing"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #E62E2D 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center md:mb-12"
        >
          <span className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-white/60">
            Pricing
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl leading-tight">
            Choose the Right Banquet Management Software Plan for Your Venue
          </h2>
          <p className="mt-4 text-base text-white/55 leading-relaxed max-w-2xl mx-auto">
            Whether you manage a single banquet hall or a large venue chain, Wadii helps streamline bookings, customer management, billing, and reporting.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="overflow-hidden rounded-3xl border border-[#E8EDF5]/80 bg-white shadow-[0_32px_80px_rgba(0,0,0,0.45)]"
        >
          <div className="h-[3px] bg-[#E62E2D]" aria-hidden />

          <div className="p-8 md:p-10">
            {/* Price row */}
            <div className="mb-8 flex flex-col gap-6 border-b border-[#EEF2F8] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E62E2D]">
                  All-in-one plan
                </p>
                <h3 className="text-2xl font-extrabold text-[#111A2D]">Wadii Complete</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ideal banquet management software for small banquet halls and event venues
                </p>
              </div>
              <div className="sm:text-right">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-extrabold leading-none tracking-tight text-[#111A2D] md:text-[3.25rem]">
                    ₹19,999
                  </span>
                  <span className="text-base font-medium text-gray-400">/yr</span>
                </div>
                <p className="mt-1.5 text-xs text-gray-400">GST as applicable</p>
              </div>
            </div>

            {/* Feature list */}
            <ul className="mb-8 flex flex-col gap-3">
              {INCLUDED_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#E62E2D]" strokeWidth={2.5} />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              onClick={scrollToContact}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E62E2D] py-4 text-[15px] font-semibold text-white shadow-lg shadow-red-900/25 transition-all duration-200 hover:bg-[#c92827] hover:-translate-y-px"
            >
              Get Started — ₹19,999/year
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-center text-xs text-gray-400">
              Simple yearly billing · No per-booking fees
            </p>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-sm text-white/50 leading-relaxed max-w-2xl mx-auto">
          Wadii&apos;s banquet management software pricing is designed to scale with your business, from independent banquet halls to enterprise venue operators. Every plan includes booking management, lead tracking, payment monitoring, vendor management, and event reporting tools.
        </p>
        <p className="mt-4 text-center text-sm text-white/40">
          Multiple venues?{" "}
          <a
            href="#contact"
            onClick={scrollToContact}
            className="font-medium text-white/70 underline-offset-2 hover:text-white hover:underline"
          >
            Get in touch
          </a>{" "}
          for custom pricing.
        </p>
      </div>
    </section>
  )
}
