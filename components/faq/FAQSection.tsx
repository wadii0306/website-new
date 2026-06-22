"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react"
import { useIsMounted } from "@/lib/use-is-mounted"
import { SEO_FAQ_ENTRIES } from "@/lib/seo-schema"

const FAQS = [
  ...SEO_FAQ_ENTRIES,
  {
    q: "What is Wadii and who is it for?",
    a: "Wadii is a cloud-based banquet management software and CRM designed specifically for banquet halls, event venues, party halls, wedding halls, and event managers. It helps you manage bookings, leads, billing, team members, and analytics all from one platform.",
  },
  {
    q: "How does Wadii help increase bookings for my banquet hall?",
    a: "Wadii centralises all your leads and inquiries in one place. With automated follow-up reminders, a clear lead pipeline, and a visual calendar, your team can respond faster and convert more inquiries into confirmed bookings. Our customers report an average 30–40% increase in bookings within 3 months.",
  },
  {
    q: "Can I manage multiple venues or banquet halls with one account?",
    a: "Yes! Wadii supports multi-venue management. You can create separate venues under one account, assign team members to each venue, and get combined or individual analytics across all your properties.",
  },
  {
    q: "How do I get started with Wadii?",
    a: "Contact our team through the form on this site or book a demo. We’ll walk you through the all-in-one plan at ₹19,999/year per venue, help with onboarding, and get your banquet hall live on Wadii quickly.",
  },
  {
    q: "How does the pricing work for banquet management software?",
    a: "Wadii offers one all-in-one plan at ₹19,999/year per venue. It includes unlimited bookings and leads, billing and payments, expense and vendor management, team access, analytics, reports, and dedicated onboarding support. There are no hidden fees or per-booking charges.",
  },
  {
    q: "Is my data secure on Wadii?",
    a: "Absolutely. Wadii uses industry-standard encryption for all data in transit and at rest. Your booking data, client information, and financial records are backed up daily and protected with role-based access control.",
  },
  {
    q: "How long does it take to set up Wadii for my banquet hall?",
    a: "Most venues go live within a single day. Our onboarding flow guides you through setting up your venue details, team members, and first bookings. No technical knowledge is required.",
  },
  {
    q: "Does Wadii integrate with WhatsApp or other communication tools?",
    a: "Wadii has built-in communication tools for client management. We are continuously expanding our integration ecosystem — including WhatsApp and email sync — for seamless client communication.",
  },
  {
    q: "What kind of reports can I generate with Wadii?",
    a: "Wadii provides in-depth financial reports including revenue summaries, debtor and creditor analysis, booking trend reports, team performance metrics, and more. All reports can be exported to PDF or Excel.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export const FAQSection = () => {
  const mounted = useIsMounted()
  const [open, setOpen] = useState<number | null>(0)

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="faq"
      data-nav-theme="light"
      className="relative overflow-hidden py-24 md:py-28 section-surface-light"
      aria-label="Frequently asked questions about Wadii banquet management software"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(230,46,45,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 bg-red-50 text-[#E62E2D] border border-red-100">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </span>
          <h2 className="section-heading text-4xl md:text-5xl font-extrabold text-[#111A2D] leading-tight tracking-tight mb-4">
            Answers before
            <br />
            <span className="gradient-text">you book a demo</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Common questions about Wadii&apos;s banquet management software and how it works for your venue.
          </p>
        </motion.div>

        <motion.div
          initial={false}
          animate={mounted ? "show" : false}
          variants={{ show: { transition: { staggerChildren: 0.04 } } }}
          className="space-y-3"
        >
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={faq.q}
                custom={i}
                variants={fadeUp}
                className={[
                  "faq-item group overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                  isOpen
                    ? "border-[#E62E2D]/30 shadow-lg shadow-red-100/30"
                    : "border-[#E6ECF5] shadow-sm hover:border-[#d7deeb] hover:shadow-md",
                ].join(" ")}
              >
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 sm:gap-4 px-4 py-4 sm:px-5 md:px-6 md:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={[
                      "font-semibold text-sm sm:text-[15px] leading-snug transition-colors pr-1",
                      isOpen ? "text-[#E62E2D]" : "text-[#111A2D] group-hover:text-[#1D2638]",
                    ].join(" ")}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "border-[#E62E2D]/30 bg-[#FFF5F5] text-[#E62E2D]"
                        : "border-[#E8EDF5] bg-[#F8FAFC] text-gray-400 group-hover:border-[#E62E2D]/25 group-hover:text-[#E62E2D]",
                    ].join(" ")}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[#F1F5F9] px-5 pb-5 pt-4 md:px-6">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-12 overflow-hidden rounded-2xl border border-[#f5c4c4] bg-gradient-to-br from-[#111A2D] via-[#1a2438] to-[#1D2638] p-8 text-center shadow-xl shadow-[#111A2D]/15"
        >
          <p className="text-white font-bold text-lg mb-2">Still have questions?</p>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            Our team is happy to walk you through how Wadii works for your venue.
          </p>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 rounded-xl bg-[#E62E2D] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/40 transition-all duration-200 hover:bg-[#c92827] hover:-translate-y-0.5"
          >
            Talk to Our Team
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
