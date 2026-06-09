"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Target,
  BookOpen,
  Calendar,
  Store,
  Receipt,
  BarChart3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import featuresData from "./FeatureData.json"

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  "account-team": Users,
  "blackout-days": Sparkles,
  leads: Target,
  bookings: BookOpen,
  calendar: Calendar,
  "purchase-orders": Store,
  "expense-management": Receipt,
  reports: BarChart3,
}

const FEATURE_META: Record<string, { tag: string; bullets: string[] }> = {
  dashboard: {
    tag: "Command center",
    bullets: ["Live bookings & leads overview", "Real-time revenue snapshot"],
  },
  "account-team": {
    tag: "People & access",
    bullets: ["Role-based team permissions", "Venue-wide access control"],
  },
  "blackout-days": {
    tag: "Wedding muhurat",
    bullets: ["Mark auspicious wedding dates", "Plan premium muhurat demand"],
  },
  leads: {
    tag: "Pipeline",
    bullets: ["Kanban-style lead stages", "Automated follow-up reminders"],
  },
  bookings: {
    tag: "Revenue core",
    bullets: ["Convert leads to bookings", "Track deposits & balances"],
  },
  calendar: {
    tag: "Planning",
    bullets: ["Month & week calendar views", "Color-coded event status"],
  },
  "purchase-orders": {
    tag: "Vendors & ledger",
    bullets: [
      "Add vendors for catering, decor & additional services",
      "Filter by category, service, date range & vendor",
      "Vendor ledger — PO credits, payment debits & balance payable",
    ],
  },
  "expense-management": {
    tag: "Finance ops",
    bullets: ["Log & categorize venue expenses", "Approvals & cashflow visibility"],
  },
  reports: {
    tag: "Intelligence",
    bullets: ["Debtor & creditor reports", "Export to PDF or Excel"],
  },
}

const PLATFORM_STATS = [
  { value: "9", label: "Core modules" },
  { value: "1", label: "Unified platform" },
  { value: "₹19,999", label: "Per year" },
]

export const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLElement | null)[]>([])
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([])
  const railContainerRef = useRef<HTMLDivElement>(null)
  const railProgressRef = useRef<HTMLDivElement>(null)
  const railMobileContainerRef = useRef<HTMLDivElement>(null)
  const railMobileProgressRef = useRef<HTMLDivElement>(null)
  const layoutRef = useRef<{ top: number; span: number; centers: number[] } | null>(null)
  const remeasureFrameRef = useRef(0)

  const measureRailLayout = useCallback(() => {
    const container = timelineRef.current
    const nodes = nodeRefs.current.filter(Boolean) as HTMLElement[]
    const steps = nodes.length ? nodes : (stepRefs.current.filter(Boolean) as HTMLElement[])
    if (!container || steps.length < 1) return

    const cRect = container.getBoundingClientRect()
    const centerRel = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      return r.top + r.height / 2 - cRect.top
    }

    const centers = steps.map(centerRel)
    const top = centers[0]
    const span = Math.max(0, centers[centers.length - 1] - top)

    layoutRef.current = { top, span, centers }

    if (railContainerRef.current) {
      railContainerRef.current.style.top = `${top}px`
      railContainerRef.current.style.height = `${span}px`
    }
    if (railMobileContainerRef.current) {
      railMobileContainerRef.current.style.top = `${top}px`
      railMobileContainerRef.current.style.height = `${span}px`
    }
  }, [])

  const syncTimeline = useCallback(() => {
    const container = timelineRef.current
    const layout = layoutRef.current
    if (!container || !layout) return

    const cRect = container.getBoundingClientRect()
    const scrollMidRel = window.innerHeight * 0.5 - cRect.top
    const progress = Math.max(0, Math.min(layout.span, scrollMidRel - layout.top))

    if (railProgressRef.current) {
      railProgressRef.current.style.height = `${progress}px`
    }
    if (railMobileProgressRef.current) {
      railMobileProgressRef.current.style.height = `${progress}px`
    }

    // Activate only once the scroll center reaches each node — stays in sync with the line
    let idx = 0
    for (let i = 0; i < layout.centers.length; i++) {
      if (scrollMidRel >= layout.centers[i]) idx = i
    }

    if (idx !== activeIndexRef.current) {
      activeIndexRef.current = idx
      setActiveIndex(idx)
    }
  }, [])

  const remeasureAndSync = useCallback(() => {
    measureRailLayout()
    syncTimeline()
  }, [measureRailLayout, syncTimeline])

  const scheduleRemeasure = useCallback(() => {
    if (remeasureFrameRef.current) return
    remeasureFrameRef.current = requestAnimationFrame(() => {
      remeasureFrameRef.current = 0
      remeasureAndSync()
    })
  }, [remeasureAndSync])

  useEffect(() => {
    let rafId = 0
    let scrolling = false
    let scrollEndTimer = 0

    const tick = () => {
      syncTimeline()
      if (scrolling) rafId = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      if (!scrolling) {
        scrolling = true
        rafId = requestAnimationFrame(tick)
      }
      window.clearTimeout(scrollEndTimer)
      scrollEndTimer = window.setTimeout(() => {
        scrolling = false
        if (rafId) cancelAnimationFrame(rafId)
        syncTimeline()
      }, 80)
    }

    remeasureAndSync()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.clearTimeout(scrollEndTimer)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [syncTimeline, remeasureAndSync])

  useEffect(() => {
    const onResize = () => remeasureAndSync()
    window.addEventListener("resize", onResize, { passive: true })
    const container = timelineRef.current
    const ro = container ? new ResizeObserver(onResize) : null
    if (container && ro) ro.observe(container)
    return () => {
      window.removeEventListener("resize", onResize)
      ro?.disconnect()
    }
  }, [remeasureAndSync])

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToStep = (index: number) => {
    stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <section
      id="features"
      data-nav-theme="light"
      className="section-surface-light relative overflow-hidden py-24 md:py-32"
      aria-label="Wadii banquet management features"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(230,46,45,0.07) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 100% 80%, rgba(17,26,45,0.05) 0%, transparent 45%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-[#E62E2D]">
            <Sparkles className="h-3.5 w-3.5" />
            Platform Features
          </span>
          <h2 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-[#111A2D] md:text-[2.75rem]">
            Powerful Features Built for
            <br />
            <span className="gradient-text">Banquet Hall Management</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-500">
            Wadii is a complete banquet management software that helps banquet halls, hotels, and event venues manage bookings, customer relationships, food packages, billing, payments, and business analytics from a single platform.
          </p>
        </div>

        <div className="mb-14 grid grid-cols-3 gap-3 rounded-2xl border border-[#e8edf5] bg-white p-4 md:gap-5 md:p-5">
          {PLATFORM_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-extrabold tracking-tight text-[#111A2D] md:text-2xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-500 md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Sticky step indicator — desktop */}
        <div className="mb-8 hidden items-center justify-center gap-1.5 lg:flex">
          {featuresData.map((f, i) => (
            <button
              key={f.id}
              type="button"
              suppressHydrationWarning
              onClick={() => scrollToStep(i)}
              aria-label={`Go to ${f.title}`}
              aria-current={activeIndex === i ? "step" : undefined}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === i ? "w-8 bg-[#E62E2D]" : i < activeIndex ? "w-4 bg-[#E62E2D]/45" : "w-4 bg-[#dde3ee]",
              ].join(" ")}
            />
          ))}
        </div>

        <div ref={timelineRef} className="feature-timeline relative">
          {/* Center vertical rail — desktop */}
          <div
            ref={railContainerRef}
            className="feature-rail-track pointer-events-none absolute left-1/2 hidden -translate-x-1/2 lg:block"
            aria-hidden
          >
            <div className="absolute inset-0 w-0.5 rounded-full bg-[#e8edf5]" />
            <div
              ref={railProgressRef}
              className="feature-rail-progress absolute left-0 top-0 w-0.5 rounded-full bg-gradient-to-b from-[#E62E2D] to-[#ff7b7a]"
            />
          </div>

          {/* Mobile left rail */}
          <div
            ref={railMobileContainerRef}
            className="feature-rail-track pointer-events-none absolute left-3 w-0.5 rounded-full bg-[#e8edf5] lg:hidden"
            aria-hidden
          >
            <div
              ref={railMobileProgressRef}
              className="feature-rail-progress absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-[#E62E2D] to-[#ff7b7a]"
            />
          </div>

          <div className="space-y-20 md:space-y-28">
            {featuresData.map((feature, index) => {
              const Icon = ICONS[feature.id] ?? LayoutDashboard
              const meta = FEATURE_META[feature.id] ?? FEATURE_META.dashboard
              const imageFirst = index % 2 === 0
              const isActive = activeIndex === index
              const isPast = index < activeIndex

              return (
                <article
                  key={feature.id}
                  ref={(el) => {
                    stepRefs.current[index] = el
                  }}
                  data-step-index={index}
                  data-active={isActive}
                  className={[
                    "feature-timeline-step relative grid items-center gap-8 pl-10 lg:grid-cols-2 lg:gap-12 lg:pl-0",
                    isActive ? "feature-timeline-step-active" : "",
                  ].join(" ")}
                >
                  {/* Timeline node */}
                  <button
                    ref={(el) => {
                      nodeRefs.current[index] = el
                    }}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => scrollToStep(index)}
                    aria-label={`Module ${index + 1}: ${feature.title}`}
                    className={[
                      "feature-timeline-node absolute top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border-2 font-bold",
                      "left-0 h-8 w-8 text-[10px] lg:left-1/2 lg:h-11 lg:w-11 lg:-translate-x-1/2 lg:text-xs",
                      isActive
                        ? "border-[#E62E2D] bg-[#E62E2D] text-white shadow-lg shadow-red-900/30 ring-4 ring-[#E62E2D]/20 lg:scale-105"
                        : isPast
                          ? "border-[#E62E2D]/60 bg-[#fff5f5] text-[#E62E2D]"
                          : "border-[#dde3ee] bg-white text-gray-400 hover:border-[#E62E2D]/40",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>

                  {/* Screenshot */}
                  <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
                    <div
                      className={[
                        "feature-shot-frame overflow-hidden rounded-2xl border bg-[#111A2D] shadow-[0_24px_60px_rgba(17,26,45,0.18)] transition-[border-color,box-shadow] duration-200",
                        isActive
                          ? "border-[#E62E2D]/50 shadow-[0_28px_70px_rgba(230,46,45,0.15)]"
                          : "border-[#1a2742]/80",
                      ].join(" ")}
                    >
                      <div className="features-browser-bar flex items-center gap-2 px-4 py-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                        <span className="ml-2 text-[10px] font-medium text-white/35">
                          wadii.app — {feature.title.toLowerCase()}
                        </span>
                      </div>
                      <div className="bg-[#eef1f6] p-2 md:p-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={feature.image}
                          alt={feature.alt ?? `Wadii ${feature.title} — banquet management software`}
                          width={feature.width}
                          height={feature.height}
                          loading={index < 2 ? "eager" : "lazy"}
                          decoding="async"
                          className="feature-shot-image rounded-lg border border-black/5 shadow-sm"
                          onLoad={scheduleRemeasure}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Copy */}
                  <div
                    className={[
                      imageFirst ? "lg:order-2" : "lg:order-1",
                      "transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-75 lg:opacity-70",
                    ].join(" ")}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className={[
                          "text-sm font-black tabular-nums transition-colors",
                          isActive ? "text-[#E62E2D]" : "text-[#E62E2D]/50",
                        ].join(" ")}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={[
                          "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors",
                          isActive
                            ? "border-[#E62E2D]/30 bg-red-50 text-[#E62E2D]"
                            : "border-[#e8edf5] bg-[#f8f9fb] text-gray-400",
                        ].join(" ")}
                      >
                        {meta.tag}
                      </span>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className={[
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-all duration-300",
                          isActive ? "bg-[#E62E2D] shadow-red-900/25" : "bg-[#111A2D] shadow-[#111A2D]/15",
                        ].join(" ")}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-2xl font-extrabold tracking-tight text-[#111A2D] md:text-[1.65rem]">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="mb-6 max-w-md text-[15px] leading-relaxed text-gray-500">
                      {feature.description}
                    </p>

                    <ul className="space-y-2.5">
                      {meta.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2.5 text-sm text-gray-600">
                          <CheckCircle2
                            className={[
                              "h-4 w-4 shrink-0 transition-colors",
                              isActive ? "text-[#E62E2D]" : "text-gray-300",
                            ].join(" ")}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-16 text-center md:mt-20"
        >
          <p className="mb-4 text-sm text-gray-400">
            Module {activeIndex + 1} of {featuresData.length} —{" "}
            <span className="font-semibold text-[#111A2D]">
              {featuresData[activeIndex]?.title}
            </span>
          </p>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 rounded-xl bg-[#E62E2D] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:bg-[#c92827] hover:-translate-y-0.5"
          >
            Get started with Wadii
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
