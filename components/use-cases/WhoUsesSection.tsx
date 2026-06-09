"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Heart,
  Hotel,
  Briefcase,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useIsMounted } from "@/lib/use-is-mounted";

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
  tint: string;
  ring: string;
};

const USE_CASES: UseCase[] = [
  {
    id: "banquet-halls",
    num: "01",
    title: "Banquet Halls",
    description:
      "Manage inquiries, bookings, payments, and event schedules from one banquet management system built for high-volume venues.",
    icon: Building2,
    highlight: "High-volume operations",
    stat: "500+",
    statLabel: "venues served",
    chips: ["Lead pipeline", "Debtor tracking", "Shift-based roles"],
    tint: "#E62E2D",
    ring: "rgba(230,46,45,0.18)",
  },
  {
    id: "wedding-venues",
    num: "02",
    title: "Wedding Venues",
    description:
      "Coordinate customer requirements, muhurat dates, and event milestones with a banquet CRM designed for wedding operations.",
    icon: Heart,
    highlight: "Muhurat-ready planning",
    stat: "50K+",
    statLabel: "events managed",
    chips: ["Muhurat holds", "Milestone tracking", "Season capacity"],
    tint: "#ff5c7a",
    ring: "rgba(255,92,122,0.2)",
  },
  {
    id: "hotels",
    num: "03",
    title: "Hotels with Banquet Facilities",
    description:
      "Centralize banquet operations alongside hospitality services — bookings, billing, and reporting in one platform.",
    icon: Hotel,
    highlight: "Hospitality + events",
    stat: "1",
    statLabel: "unified dashboard",
    chips: ["Room + banquet sync", "Unified billing", "Dept. reporting"],
    tint: "#4f7df0",
    ring: "rgba(79,125,240,0.2)",
  },
  {
    id: "event-companies",
    num: "04",
    title: "Event Management Companies",
    description:
      "Manage multiple venues and customer bookings efficiently with multi-venue access and unified analytics.",
    icon: Briefcase,
    highlight: "Multi-venue scale",
    stat: "24/7",
    statLabel: "cloud access",
    chips: ["Multi-property view", "Portfolio analytics", "Per-venue teams"],
    tint: "#8b6cf6",
    ring: "rgba(139,108,246,0.2)",
  },
];

export const WhoUsesSection = () => {
  const mounted = useIsMounted();
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const current = USE_CASES[active];
  const CurrentIcon = current.icon;

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const blocks = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!blocks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActive(idx);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    blocks.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <section
      id="who-uses-wadii"
      data-nav-theme="light"
      className="relative overflow-hidden border-t border-[#e8edf5] bg-[#f8f9fb] py-20 md:py-28"
      aria-label="Who uses Wadii banquet management software"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 0% 20%, rgba(230,46,45,0.07) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 100% 80%, rgba(17,26,45,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 items-start">
          {/* Sticky visual — updates as you scroll the list */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-[#E62E2D] mb-4">
                Industry fit
              </span>
              <h2 className="text-[2rem] md:text-[2.75rem] font-extrabold text-[#111A2D] leading-[1.1] tracking-tight mb-4">
                Who uses{" "}
                <span className="gradient-text">Wadii?</span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                Banquet management software for every venue that runs events, bookings, and
                customer relationships at scale.
              </p>
            </motion.div>

            <div className="relative rounded-[1.75rem] border border-[#e8edf5] bg-white p-8 md:p-9 shadow-[0_20px_50px_rgba(17,26,45,0.08)] overflow-hidden">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl transition-colors duration-700"
                style={{ background: current.ring }}
                aria-hidden
              />

              {/* Step rail */}
              <div className="relative flex items-center gap-3 mb-8">
                {USE_CASES.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      blockRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                    className="group flex flex-col items-center gap-1.5"
                    aria-label={`Jump to ${item.title}`}
                  >
                    <span
                      className={[
                        "block h-1 rounded-full transition-all duration-500",
                        active === i
                          ? "w-10 bg-[#E62E2D]"
                          : "w-4 bg-[#dde3ee] group-hover:bg-[#c5cdd9]",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "text-[10px] font-bold tabular-nums transition-colors",
                        active === i ? "text-[#111A2D]" : "text-gray-300",
                      ].join(" ")}
                    >
                      {item.num}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg transition-colors duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${current.tint} 0%, ${current.tint}cc 100%)`,
                      boxShadow: `0 12px 28px ${current.ring}`,
                    }}
                  >
                    <CurrentIcon className="h-8 w-8" strokeWidth={1.75} />
                  </div>

                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-2">
                    {current.highlight}
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#111A2D] tracking-tight mb-4">
                    {current.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span
                      className="text-4xl font-extrabold tracking-tight tabular-nums"
                      style={{ color: current.tint }}
                    >
                      {current.stat}
                    </span>
                    <span className="text-sm font-medium text-gray-400">{current.statLabel}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {current.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-[#eef2f8] bg-[#f8faff] px-3 py-1 text-xs font-medium text-gray-600"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="mt-6 hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-[#E62E2D] hover:text-[#c92827] transition-colors"
            >
              See if Wadii fits your venue
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Scroll-driven story blocks */}
          <div className="relative">
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E62E2D]/30 to-transparent hidden lg:block"
              aria-hidden
            />

            <div className="space-y-0 lg:pl-10">
              {USE_CASES.map((item, index) => {
                const Icon = item.icon;
                const isActive = active === index;

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      blockRefs.current[index] = el;
                    }}
                    data-index={index}
                    className={[
                      "relative py-10 md:py-14 border-b border-[#e8edf5] last:border-b-0 transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-45 lg:opacity-40",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "absolute -left-[5px] top-12 hidden lg:block h-2.5 w-2.5 rounded-full border-2 border-white transition-all duration-500",
                        isActive ? "bg-[#E62E2D] scale-100 shadow-md shadow-red-200" : "bg-[#dde3ee] scale-75",
                      ].join(" ")}
                      aria-hidden
                    />

                    <div className="flex items-start gap-4 md:gap-5">
                      <div
                        className={[
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-500 lg:hidden",
                          isActive
                            ? "bg-[#E62E2D] text-white shadow-md shadow-red-200"
                            : "bg-white border border-[#e8edf5] text-[#111A2D]",
                        ].join(" ")}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span
                            className="text-[11px] font-black tracking-[0.2em] uppercase"
                            style={{ color: isActive ? item.tint : "#9ca3af" }}
                          >
                            {item.num} · {item.highlight}
                          </span>
                        </div>

                        <h3
                          className={[
                            "text-xl md:text-2xl font-extrabold tracking-tight mb-3 transition-colors duration-500",
                            isActive ? "text-[#111A2D]" : "text-gray-400",
                          ].join(" ")}
                        >
                          {item.title}
                        </h3>

                        <p
                          className={[
                            "text-[15px] leading-relaxed max-w-lg transition-colors duration-500",
                            isActive ? "text-gray-600" : "text-gray-400",
                          ].join(" ")}
                        >
                          {item.description}
                        </p>

                        <div
                          className={[
                            "mt-5 flex flex-wrap gap-2 transition-all duration-500",
                            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 lg:opacity-0",
                          ].join(" ")}
                        >
                          {item.chips.map((chip) => (
                            <span
                              key={chip}
                              className="rounded-lg border border-[#e8edf5] bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="hidden sm:block shrink-0 text-right pt-1">
                        <p
                          className={[
                            "text-2xl font-extrabold tabular-nums transition-colors duration-500",
                            isActive ? "text-[#111A2D]" : "text-gray-300",
                          ].join(" ")}
                          style={isActive ? { color: item.tint } : undefined}
                        >
                          {item.stat}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 max-w-[88px] leading-snug">
                          {item.statLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 lg:hidden">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#111A2D] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#111A2D]/20"
              >
                See if Wadii fits your venue
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
