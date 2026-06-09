"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, BookOpenCheck, Headset, Rocket, ArrowRight, Sparkles } from "lucide-react";
import { useIsMounted } from "@/lib/use-is-mounted";

const STEPS = [
  {
    step: "01",
    time: "5 minutes",
    title: "Get Started with Wadii",
    description:
      "Reach out to our team, choose the all-in-one plan, and get your venue live on Wadii — guided setup included.",
    icon: UserPlus,
    highlight: "Instant access",
  },
  {
    step: "02",
    time: "Same day",
    title: "Self-Onboard Fast",
    description:
      "Configure venues, packages, team roles, and workflows using guided templates built for banquet operations.",
    icon: BookOpenCheck,
    highlight: "Guided setup",
  },
  {
    step: "03",
    time: "When you need it",
    title: "Get Expert Support",
    description:
      "Our team helps with migration, training, and workflow optimization so your staff adopts Wadii confidently.",
    icon: Headset,
    highlight: "Human + product",
  },
  {
    step: "04",
    time: "Go live",
    title: "Scale Operations",
    description:
      "Run bookings, billing, reporting, and team collaboration from one command center across all your venues.",
    icon: Rocket,
    highlight: "Full visibility",
  },
];

const NAV_OFFSET = 88;
const SPY_CENTER_RATIO = 0.45;

function useScrollSpy(
  sectionRef: React.RefObject<HTMLElement | null>,
  stepRefs: React.RefObject<(HTMLElement | null)[]>
) {
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionRect = section.getBoundingClientRect();
    if (sectionRect.bottom < NAV_OFFSET || sectionRect.top > window.innerHeight) return;

    const targetY = window.innerHeight * SPY_CENTER_RATIO;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    stepRefs.current.forEach((el, index) => {
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
  }, [sectionRef, stepRefs]);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  return active;
}

function useRailLine(active: number, railRef: React.RefObject<HTMLDivElement | null>) {
  const [railLine, setRailLine] = useState({ top: 0, height: 0, progress: 0 });

  const updateRailLine = useCallback(() => {
    const list = railRef.current;
    if (!list) return;
    const items = list.querySelectorAll<HTMLElement>("[data-howit-rail]");
    if (!items.length) return;

    const listRect = list.getBoundingClientRect();
    const first = items[0];
    const last = items[items.length - 1];
    const activeItem = items[active] ?? first;

    const centerY = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2 - listRect.top;
    };

    setRailLine({
      top: centerY(first),
      height: Math.max(0, centerY(last) - centerY(first)),
      progress: Math.max(0, centerY(activeItem) - centerY(first)),
    });
  }, [active, railRef]);

  useEffect(() => {
    updateRailLine();
    window.addEventListener("resize", updateRailLine);
    window.addEventListener("scroll", updateRailLine, { passive: true });
    const list = railRef.current;
    const ro = list ? new ResizeObserver(updateRailLine) : null;
    if (list && ro) ro.observe(list);
    return () => {
      window.removeEventListener("resize", updateRailLine);
      window.removeEventListener("scroll", updateRailLine);
      ro?.disconnect();
    };
  }, [updateRailLine, railRef]);

  return railLine;
}

export const HowItWorksSection = () => {
  const mounted = useIsMounted();
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);

  const active = useScrollSpy(sectionRef, stepRefs);
  const railLine = useRailLine(active, railRef);

  const current = STEPS[active];
  const CurrentIcon = current.icon;
  const progress = ((active + 1) / STEPS.length) * 100;

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      data-nav-theme="light"
      className="section-surface-light relative py-24 md:py-28"
      aria-label="How Wadii works"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(230,46,45,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 bg-red-50 text-[#E62E2D] border border-red-100">
            <Sparkles className="w-3.5 h-3.5" />
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111A2D] leading-tight tracking-tight mb-4">
            From signup to scale
            <br />
            <span className="gradient-text">in one smooth journey</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A premium onboarding path designed for banquet teams — fast to start, easy to adopt, built to grow.
          </p>
        </div>

        {/* Journey progress */}
        <div className="mb-10 md:mb-14 max-w-xl mx-auto">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            <span>Start</span>
            <span className="text-[#E62E2D]">Step {current.step}</span>
            <span>Scale</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#e8edf5] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#E62E2D] to-[#ff7b7a]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
          {/* Detail card — sticky while scrolling steps */}
          <div
            className="sticky z-10 self-start mb-2 lg:mb-0"
            style={{ top: NAV_OFFSET }}
          >
            <div className="relative rounded-3xl border border-[#1a2742] bg-gradient-to-br from-[#111A2D] via-[#152238] to-[#0f1628] p-7 md:p-10 shadow-2xl shadow-[#111A2D]/20 overflow-hidden">
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 rounded-full opacity-40 blur-3xl transition-colors duration-700"
                style={{ background: "rgba(230,46,45,0.35)" }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-4 -top-4 text-[130px] font-black leading-none text-white/[0.04] select-none"
                aria-hidden
              >
                {current.step}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="flex flex-wrap items-center gap-2.5 mb-6">
                    <span className="inline-flex items-center rounded-full bg-[#E62E2D]/20 border border-[#E62E2D]/35 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ff8a89]">
                      Step {current.step}
                    </span>
                    <span className="text-sm font-medium text-white/45">{current.time}</span>
                    <span className="inline-flex items-center rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                      {current.highlight}
                    </span>
                  </div>

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E62E2D] to-[#b82423] text-white shadow-lg shadow-red-900/40">
                    <CurrentIcon className="h-7 w-7" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                    {current.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/60 leading-relaxed">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="relative mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-white/40">
                  <span className="text-white font-semibold">{active + 1}</span> of {STEPS.length}{" "}
                  steps
                </p>
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E62E2D] hover:bg-[#c92827] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5"
                >
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Step timeline — scroll updates active step */}
          <div className="relative">
            {mounted ? (
              <>
                <div
                  className="pointer-events-none absolute left-[27px] hidden sm:block w-0.5 rounded-full bg-[#e8edf5]"
                  style={{ top: railLine.top, height: railLine.height }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-[27px] hidden sm:block w-0.5 rounded-full bg-[#E62E2D] transition-all duration-500 ease-out"
                  style={{ top: railLine.top, height: railLine.progress }}
                  aria-hidden
                />
              </>
            ) : null}

            <div ref={railRef} className="relative">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === active;
                const isPast = index < active;

                return (
                  <div
                    key={step.title}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    data-howit-rail
                    className="py-6 md:py-10 scroll-mt-28"
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div
                      className={[
                        "relative overflow-hidden rounded-2xl border bg-white transition-all duration-500",
                        isActive
                          ? "border-[#E62E2D]/35 shadow-xl shadow-red-100/40"
                          : isPast
                            ? "border-[#e8edf5] shadow-sm opacity-80"
                            : "border-[#e8edf5] shadow-sm opacity-60",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "absolute left-0 top-0 w-[3px] bg-gradient-to-b from-[#e62e2d] to-[#ff7b7a] transition-all duration-500",
                          isActive ? "h-full" : "h-0",
                        ].join(" ")}
                        aria-hidden
                      />

                      <div className="p-5 pl-5 sm:pl-16">
                        <span
                          className={[
                            "absolute left-4 top-1/2 hidden sm:flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-all duration-500",
                            isActive
                              ? "border-[#E62E2D] bg-[#E62E2D] text-white scale-110"
                              : isPast
                                ? "border-[#E62E2D]/40 bg-red-50 text-[#E62E2D]"
                                : "border-[#dde3ee] bg-[#F8F9FB] text-gray-400",
                          ].join(" ")}
                        >
                          {index + 1}
                        </span>

                        <div className="flex items-start gap-4">
                          <div
                            className={[
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 sm:hidden",
                              isActive ? "bg-[#E62E2D] text-white" : "bg-[#111A2D] text-white",
                            ].join(" ")}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <p
                                className={[
                                  "text-[15px] font-semibold leading-snug transition-colors duration-500",
                                  isActive ? "text-[#111A2D]" : "text-gray-600",
                                ].join(" ")}
                              >
                                {step.title}
                              </p>
                              <span
                                className={[
                                  "text-[10px] font-bold uppercase tracking-wider shrink-0 transition-colors duration-500",
                                  isActive ? "text-[#E62E2D]" : "text-gray-400",
                                ].join(" ")}
                              >
                                {step.time}
                              </span>
                            </div>
                            <p
                              className={[
                                "text-sm leading-relaxed transition-colors duration-500",
                                isActive ? "text-gray-600" : "text-gray-500",
                              ].join(" ")}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
