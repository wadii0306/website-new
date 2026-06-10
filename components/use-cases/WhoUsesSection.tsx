"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Heart,
  Hotel,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Users,
  type LucideIcon,
} from "lucide-react";

type UseCase = {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: LucideIcon;
  highlight: string;
  stat: string;
  statLabel: string;
  chips: string[];
};

const USE_CASES: UseCase[] = [
  {
    id: "banquet-halls",
    num: "01",
    title: "Banquet Halls",
    description:
      "Manage inquiries, bookings, payments, and schedules from one system built for high-volume venues.",
    icon: Building2,
    highlight: "High-volume operations",
    stat: "500+",
    statLabel: "venues served",
    chips: ["Lead pipeline", "Hold locks", "Debtor tracking"],
  },
  {
    id: "wedding-venues",
    num: "02",
    title: "Wedding Venues",
    description:
      "Coordinate muhurat dates, milestones, and wedding enquiries with a CRM built for Indian wedding operations.",
    icon: Heart,
    highlight: "Muhurat-ready planning",
    stat: "50K+",
    statLabel: "events managed",
    chips: ["Muhurat calendar", "Milestone tracking", "WhatsApp follow-ups"],
  },
  {
    id: "hotels",
    num: "03",
    title: "Hotels with Banquet Facilities",
    description:
      "Run rooms and banquets together — unified billing, reporting, and team access in one platform.",
    icon: Hotel,
    highlight: "Hospitality + events",
    stat: "1",
    statLabel: "unified dashboard",
    chips: ["Room + banquet sync", "Unified billing", "Dept. reporting"],
  },
  {
    id: "event-companies",
    num: "04",
    title: "Event & Hospitality Groups",
    description:
      "Multi-venue operators get portfolio visibility, per-venue teams, and analytics without tool fragmentation.",
    icon: Briefcase,
    highlight: "Multi-venue scale",
    stat: "24/7",
    statLabel: "cloud access",
    chips: ["Multi-property view", "Portfolio analytics", "Per-venue teams"],
  },
];

const SPY_CENTER_RATIO = 0.42;

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const },
};

export const WhoUsesSection = () => {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const current = USE_CASES[active];
  const CurrentIcon = current.icon;

  const updateActive = useCallback(() => {
    const targetY = window.innerHeight * SPY_CENTER_RATIO;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    blockRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - targetY);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    setActive(closest);
  }, []);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="who-uses-wadii"
      data-nav-theme="light"
      className="relative overflow-hidden border-t border-[#e8edf5] bg-[#f8f9fb] py-16 md:py-20"
      aria-label="Who uses Wadii banquet management software"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 0% 30%, rgba(230,46,45,0.06) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 100% 70%, rgba(17,26,45,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-start">
          {/* Sticky panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-4 bg-red-50 text-[#E62E2D] border border-red-100">
              <Users className="w-3.5 h-3.5" />
              Industry fit
            </span>
            <h2 className="text-3xl md:text-[2.65rem] font-extrabold text-[#111A2D] leading-tight tracking-tight mb-3">
              Who uses{" "}
              <span className="gradient-text">Wadii?</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 max-w-md">
              Banquet management software for every venue that runs events, bookings, and customer relationships at scale.
            </p>

            <div className="rounded-2xl border border-[#e8edf5] bg-white overflow-hidden shadow-[0_16px_40px_rgba(17,26,45,0.07)]">
              <div className="h-0.5 w-full bg-gradient-to-r from-[#111A2D] via-[#E62E2D] to-[#111A2D]" />

              <div className="p-5 md:p-6">
                {/* Step progress */}
                <div className="flex items-center gap-2 mb-5">
                  {USE_CASES.map((item, i) => (
                    <div key={item.id} className="flex flex-1 flex-col items-center gap-1.5">
                      <span
                        className={[
                          "block h-1 w-full rounded-full transition-all duration-500",
                          active === i
                            ? "bg-[#E62E2D]"
                            : active > i
                              ? "bg-[#E62E2D]/35"
                              : "bg-[#e8edf5]",
                        ].join(" ")}
                      />
                      <span
                        className={[
                          "text-[9px] font-bold tabular-nums tracking-wider",
                          active === i ? "text-[#E62E2D]" : "text-gray-300",
                        ].join(" ")}
                      >
                        {item.num}
                      </span>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={current.id} {...fade}>
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#111A2D] via-[#152238] to-[#0f1628] px-5 py-5 mb-4 ring-1 ring-white/5">
                      <div
                        className="pointer-events-none absolute -right-2 -top-3 text-[64px] font-black leading-none text-white/[0.04] select-none"
                        aria-hidden
                      >
                        {current.num}
                      </div>
                      <div
                        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-3xl opacity-40"
                        style={{ background: "radial-gradient(circle, rgba(230,46,45,0.5) 0%, transparent 70%)" }}
                        aria-hidden
                      />

                      <div className="relative flex items-start gap-3.5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#E62E2D] to-[#b82423] text-white shadow-lg shadow-red-900/30">
                          <CurrentIcon className="h-6 w-6" strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#ff8a89] mb-1">
                            {current.highlight}
                          </p>
                          <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                            {current.title}
                          </h3>
                        </div>
                      </div>

                      <div className="relative mt-4 flex items-baseline gap-2 border-t border-white/10 pt-3">
                        <span className="text-2xl font-black text-[#E62E2D] tabular-nums leading-none">
                          {current.stat}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
                          {current.statLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {current.chips.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center gap-1.5 rounded-md border border-[#e8edf5] bg-[#fafbfd] px-2.5 py-1 text-[11px] font-medium text-gray-600"
                        >
                          <CheckCircle2 className="h-3 w-3 text-[#E62E2D] shrink-0" />
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="mt-5 hidden lg:inline-flex items-center gap-2 rounded-xl bg-[#111A2D] hover:bg-[#1a2742] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#111A2D]/15 transition-all hover:-translate-y-0.5"
            >
              See if Wadii fits your venue
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Scroll list */}
          <div className="relative">
            <div className="mapping-showcase-shell rounded-2xl border border-[#e8edf5] p-2 md:p-3">
              <div
                className="pointer-events-none absolute left-[17px] top-5 bottom-5 w-px bg-[#e8edf5] hidden lg:block"
                aria-hidden
              />

              <div className="space-y-0">
                {USE_CASES.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = active === index;

                  return (
                    <div
                      key={item.id}
                      ref={(el) => {
                        blockRefs.current[index] = el;
                      }}
                      className="relative"
                    >
                      <span
                        className={[
                          "absolute left-[13px] top-1/2 -translate-y-1/2 z-10 hidden lg:block h-2.5 w-2.5 rounded-full border-2 border-white transition-all duration-400",
                          isActive
                            ? "bg-[#E62E2D] scale-100 shadow-sm shadow-red-200"
                            : "bg-[#dde3ee] scale-75",
                        ].join(" ")}
                        aria-hidden
                      />

                      <article
                        className={[
                          "relative rounded-xl px-4 py-4 md:px-5 md:py-5 transition-all duration-400",
                          isActive
                            ? "bg-white border border-[#e8edf5] shadow-sm border-l-[3px] border-l-[#E62E2D]"
                            : "border border-transparent opacity-50 hover:opacity-70",
                        ].join(" ")}
                      >
                        <div className="flex items-start gap-3 md:gap-4">
                          <div
                            className={[
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-400 lg:hidden",
                              isActive
                                ? "bg-[#E62E2D] text-white shadow-md shadow-red-900/20"
                                : "bg-white border border-[#e8edf5] text-[#E62E2D]",
                            ].join(" ")}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1 lg:pl-2">
                            <span
                              className={[
                                "text-[10px] font-bold uppercase tracking-[0.16em]",
                                isActive ? "text-[#E62E2D]" : "text-gray-400",
                              ].join(" ")}
                            >
                              {item.num} · {item.highlight}
                            </span>
                            <h3
                              className={[
                                "text-lg md:text-xl font-extrabold tracking-tight mt-0.5 mb-1.5 transition-colors duration-400",
                                isActive ? "text-[#111A2D]" : "text-gray-400",
                              ].join(" ")}
                            >
                              {item.title}
                            </h3>
                            <p
                              className={[
                                "text-sm leading-relaxed max-w-lg transition-colors duration-400",
                                isActive ? "text-gray-600" : "text-gray-400",
                              ].join(" ")}
                            >
                              {item.description}
                            </p>

                            <div
                              className={[
                                "flex flex-wrap gap-1.5 transition-all duration-400 overflow-hidden",
                                isActive ? "mt-3 max-h-16 opacity-100" : "max-h-0 opacity-0 mt-0",
                              ].join(" ")}
                            >
                              {item.chips.map((chip) => (
                                <span
                                  key={chip}
                                  className="inline-flex items-center gap-1 rounded-md border border-[#e8edf5] bg-[#fafbfd] px-2 py-1 text-[11px] font-medium text-gray-600"
                                >
                                  <CheckCircle2 className="h-3 w-3 text-[#E62E2D]" />
                                  {chip}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="hidden sm:block shrink-0 text-right pt-0.5 min-w-[72px]">
                            <p
                              className={[
                                "text-xl font-extrabold tabular-nums leading-none transition-colors duration-400",
                                isActive ? "text-[#E62E2D]" : "text-gray-300",
                              ].join(" ")}
                            >
                              {item.stat}
                            </p>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mt-1 leading-snug">
                              {item.statLabel}
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="mt-5 lg:hidden inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#111A2D] px-5 py-3 text-sm font-semibold text-white shadow-lg"
            >
              See if Wadii fits your venue
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
