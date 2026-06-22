"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarX2,
  MessageSquareX,
  UtensilsCrossed,
  FileWarning,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

const CHALLENGES = [
  {
    num: "01",
    title: "Scheduling Chaos",
    description:
      "Manual calendars and scattered notes lead to double bookings, missed follow-ups, and lost revenue.",
    icon: CalendarX2,
    impact: "Revenue leakage",
  },
  {
    num: "02",
    title: "Communication Gaps",
    description:
      "Teams and clients misaligned in real time — delays, confusion, and execution mistakes pile up.",
    icon: MessageSquareX,
    impact: "Event-day risk",
  },
  {
    num: "03",
    title: "Menu & Vendor Complexity",
    description:
      "Menus, custom requests, and vendors tracked in spreadsheets slow operations and invite errors.",
    icon: UtensilsCrossed,
    impact: "Operational drag",
  },
  {
    num: "04",
    title: "Billing Delays",
    description:
      "Manual invoicing hides cashflow, stretches reconciliation, and weakens financial control.",
    icon: FileWarning,
    impact: "Cashflow blind spots",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const ChallengesSection = () => {
  const scrollToHow = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-nav-theme="dark"
      className="section-surface-dark relative overflow-hidden py-24 md:py-28"
      aria-label="Common banquet management challenges"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute top-0 left-1/2 h-[380px] w-[640px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(230,46,45,0.45) 0%, transparent 65%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 bg-[#E62E2D]/15 text-[#ff8a89] border border-[#E62E2D]/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            Is This You
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Venues without a
            <br />
            <span className="gradient-text">centralized system</span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            These pain points cost time, money, and guest trust every week. If they feel familiar, you are not alone — and you are exactly who Wadii was built for.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid sm:grid-cols-2 gap-4 md:gap-5"
        >
          {CHALLENGES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                custom={index}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-7 transition-all duration-300 hover:border-[#E62E2D]/45 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10"
              >
                <div
                  className="pointer-events-none absolute -right-4 -top-6 text-[88px] font-black leading-none text-white/[0.03] select-none"
                  aria-hidden
                >
                  {item.num}
                </div>

                <div className="relative flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E62E2D] text-white shadow-lg shadow-red-900/35 ring-4 ring-[#E62E2D]/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold tracking-[0.2em] text-[#ff8a89]">
                        PAIN {item.num}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/45">
                        {item.impact}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="relative mt-4 h-px w-full bg-gradient-to-r from-[#E62E2D]/50 via-white/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bridge to solution */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-10 md:mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.03] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
        >
          <div>
            <p className="text-sm font-semibold text-[#ff8a89] mb-1">The good news</p>
            <p className="text-lg md:text-xl font-bold text-white tracking-tight">
              Wadii replaces chaos with one connected banquet command center.
            </p>
          </div>
          <a
            href="#how-it-works"
            onClick={scrollToHow}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E62E2D] hover:bg-[#c92827] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5"
          >
            See how Wadii fixes this
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
