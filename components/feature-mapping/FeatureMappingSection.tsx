"use client";

import React, { startTransition, useState, useRef, useEffect, useCallback } from "react";
import {
  CalendarCheck2,
  MessageCircleMore,
  Wallet,
  TrendingUp,
  Link2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const MAPPINGS = [
  {
    title: "Lead & Booking Control",
    subtitle: "Never miss a lead. Never lose a booking.",
    outcome: "Conversion",
    points: [
      "Capture leads from website, WhatsApp, and walk-ins.",
      "Track enquiry → follow-up → hold → booked pipeline.",
      "Tentative and hold lock support to avoid conflicts.",
      "Calendar-first view for instant venue availability.",
    ],
    icon: CalendarCheck2,
  },
  {
    title: "WhatsApp-First Automation",
    subtitle: "Your sales team, automated and intelligent.",
    outcome: "Speed",
    points: [
      "Automated reminders for follow-ups and payments.",
      "Campaign-friendly messaging flows for promotions.",
      "Conversation history linked to every lead.",
      "Fast response loops that improve conversion rates.",
    ],
    icon: MessageCircleMore,
  },
  {
    title: "Payments & Revenue Intelligence",
    subtitle: "See where you earn and where you lose.",
    outcome: "Revenue",
    points: [
      "Integrated pending/collected payment dashboard.",
      "Revenue leakage tracking tied to dropped leads.",
      "Smart debtor visibility and payment status control.",
      "Decision-ready reports across all venues.",
    ],
    icon: Wallet,
  },
  {
    title: "Upsell & Growth Engine",
    subtitle: "Increase revenue from existing bookings.",
    outcome: "Growth",
    points: [
      "Identify high-potential upcoming bookings.",
      "Promote decor, menu, room, and add-on upgrades.",
      "Targeted campaigns for better average ticket size.",
      "Data-backed growth actions, not guesswork.",
    ],
    icon: TrendingUp,
  },
  {
    title: "Ecosystem Integrations",
    subtitle: "Built to connect with your workflow.",
    outcome: "Scale",
    points: [
      "Connect lead forms and marketing channels.",
      "Integrate PMS and allied business systems.",
      "Centralize data for complete event lifecycle clarity.",
      "Scale operations without tool fragmentation.",
    ],
    icon: Link2,
  },
];

export const FeatureMappingSection = () => {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const railRef = useRef<HTMLDivElement>(null);
  const railTrackRef = useRef<HTMLDivElement>(null);
  const railProgressRef = useRef<HTMLDivElement>(null);

  const current = MAPPINGS[active];
  const CurrentIcon = current.icon;

  const applyRailLine = useCallback((activeIdx: number) => {
    const list = railRef.current;
    if (!list) return;
    const buttons = list.querySelectorAll<HTMLButtonElement>("[data-mapping-rail]");
    if (buttons.length < 1) return;

    const listRect = list.getBoundingClientRect();
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    const activeBtn = buttons[activeIdx] ?? first;

    const centerY = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2 - listRect.top;
    };

    const top = centerY(first);
    const end = centerY(last);
    const progressEnd = centerY(activeBtn);
    const height = Math.max(0, end - top);
    const progress = Math.max(0, progressEnd - top);

    if (railTrackRef.current) {
      railTrackRef.current.style.top = `${top}px`;
      railTrackRef.current.style.height = `${height}px`;
    }
    if (railProgressRef.current) {
      railProgressRef.current.style.top = `${top}px`;
      railProgressRef.current.style.height = `${progress}px`;
    }
  }, []);

  const selectMapping = useCallback(
    (idx: number) => {
      if (idx === activeRef.current) return;
      activeRef.current = idx;
      startTransition(() => setActive(idx));
      applyRailLine(idx);
    },
    [applyRailLine]
  );

  useEffect(() => {
    const onResize = () => applyRailLine(activeRef.current);
    applyRailLine(0);
    window.addEventListener("resize", onResize, { passive: true });
    const list = railRef.current;
    const ro = list ? new ResizeObserver(onResize) : null;
    if (list && ro) ro.observe(list);
    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [applyRailLine]);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-nav-theme="light"
      className="section-surface-light relative overflow-hidden py-24 md:py-28"
      aria-label="Key feature mapping"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 0% 50%, rgba(17,26,45,0.05) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 100% 20%, rgba(230,46,45,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 bg-red-50 text-[#E62E2D] border border-red-100">
            <Sparkles className="w-3.5 h-3.5" />
            Key Feature Mapping
          </span>
          <h2 className="text-4xl md:text-[2.75rem] font-extrabold text-[#111A2D] leading-tight tracking-tight mb-4">
            One platform across your
            <br />
            <span className="gradient-text">entire sales lifecycle</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            For every Wadii user, each capability maps to a real business outcome — revenue, efficiency, and conversion in one connected system.
          </p>
        </div>

        <div className="mapping-showcase-shell rounded-3xl border border-[#e8edf5] p-4 md:p-6 lg:p-7">
          <div className="grid lg:grid-cols-[minmax(0,300px)_1fr] gap-5 lg:gap-7 items-stretch">
            {/* Capability rail */}
            <aside className="relative hidden lg:block">
              <div
                ref={railTrackRef}
                className="feature-rail-track pointer-events-none absolute left-[19px] hidden lg:block w-0.5 rounded-full bg-[#e8edf5]"
                aria-hidden
              />
              <div
                ref={railProgressRef}
                className="feature-rail-progress pointer-events-none absolute left-[19px] hidden lg:block w-0.5 rounded-full bg-[#E62E2D]"
                aria-hidden
              />

              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400 px-2 pb-3 lg:pl-2">
                Capability map
              </p>

              <div ref={railRef} className="relative flex flex-col gap-2">
                {MAPPINGS.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = idx === active;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      suppressHydrationWarning
                      data-mapping-rail
                      onClick={() => selectMapping(idx)}
                      className={[
                        "group relative w-full text-left rounded-2xl border px-4 py-4 lg:pl-[3.25rem] transition-all duration-200",
                        isActive
                          ? "bg-[#fff5f5] border-[#E62E2D]/35 shadow-md ring-1 ring-[#E62E2D]/15"
                          : "bg-white border-[#e8edf5] shadow-sm hover:border-[#d7deeb] hover:shadow-md",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "absolute left-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-colors",
                          isActive
                            ? "border-[#E62E2D] bg-[#E62E2D] text-white"
                            : "border-[#dde3ee] bg-white text-gray-500 group-hover:border-[#E62E2D]/40",
                        ].join(" ")}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-start gap-3">
                        <div
                          className={[
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                            isActive
                              ? "bg-[#E62E2D] text-white shadow-md shadow-red-900/20"
                              : "bg-[#111A2D]/5 text-[#E62E2D]",
                          ].join(" ")}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[14px] font-semibold text-[#111A2D] leading-snug">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Active capability */}
            <article className="rounded-2xl border border-[#e8edf5] bg-white overflow-hidden shadow-sm flex flex-col min-h-0 sm:min-h-[420px]">
              <div className="relative overflow-hidden bg-gradient-to-br from-[#111A2D] via-[#152238] to-[#0f1628] px-6 py-7 md:px-8 md:py-8">
                <div
                  className="pointer-events-none absolute -right-2 -top-4 text-[88px] font-black leading-none text-white/[0.04] select-none"
                  aria-hidden
                >
                  {String(active + 1).padStart(2, "0")}
                </div>

                <div className="relative transition-opacity duration-200">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center rounded-full bg-[#E62E2D]/20 border border-[#E62E2D]/35 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ff9a99]">
                      {current.outcome} impact
                    </span>
                    <span className="text-xs font-medium text-white/40">
                      {active + 1} of {MAPPINGS.length}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E62E2D] to-[#b82423] text-white shadow-lg shadow-red-900/35 shrink-0">
                          <CurrentIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-tight min-w-0">
                          {current.title}
                        </h3>
                      </div>
                      <p className="text-sm md:text-[15px] text-white/55 leading-relaxed max-w-xl">
                        {current.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative mt-5 flex gap-1" role="tablist" aria-label="Capabilities">
                  {MAPPINGS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      suppressHydrationWarning
                      role="tab"
                      aria-selected={i === active}
                      aria-label={MAPPINGS[i].title}
                      onClick={() => selectMapping(i)}
                      className={[
                        "h-1 flex-1 rounded-full transition-all duration-300",
                        i === active ? "bg-[#E62E2D]" : "bg-white/15 hover:bg-white/25",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col bg-[#fafbfd]">
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-gray-400 mb-4">
                  What you unlock
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 flex-1">
                  {current.points.map((point) => (
                    <li
                      key={point}
                      className="group flex items-start gap-3 rounded-xl border border-[#e6ecf5] bg-white px-4 py-4 shadow-sm hover:border-[#E62E2D]/25 hover:shadow-md transition-all duration-200 border-l-[3px] border-l-[#E62E2D]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E62E2D] shrink-0 mt-0.5" />
                      <span className="text-[14px] text-[#111A2D] leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-[#e8edf5] flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-gray-500">
                    Built for <span className="font-semibold text-[#111A2D]">banquet operators</span>, not generic CRM.
                  </p>
                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E62E2D] hover:bg-[#c92827] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/25 transition-all hover:-translate-y-0.5"
                  >
                    See it in action
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
