"use client";

import React, { useState, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  ArrowRight,
  Zap,
  CalendarDays,
  Users,
  Receipt,
  Star,
  MessageCircle,
  CalendarHeart,
  IndianRupee,
  Building2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

/* ─── Mini UI mocks (CSS-only, no images) ─── */

function MockManualBookings() {
  return (
    <div className="rounded-xl border border-red-500/25 bg-[#0d121f] p-3 space-y-2 font-mono text-[10px]">
      <div className="flex items-center justify-between text-red-400/80">
        <span>booking_sheet_v3_FINAL.xlsx</span>
        <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[9px]">UNSAVED</span>
      </div>
      <div className="grid grid-cols-3 gap-1 text-white/30">
        <span>Date</span>
        <span>Hall</span>
        <span>Status</span>
      </div>
      {[
        { d: "14 Nov", h: "Grand", s: "???", bad: true },
        { d: "14 Nov", h: "Grand", s: "Booked?", bad: true },
        { d: "22 Dec", h: "Lawn", s: "Tentative", bad: false },
      ].map((row, i) => (
        <div
          key={i}
          className={`grid grid-cols-3 gap-1 rounded px-1 py-0.5 ${row.bad ? "bg-red-500/15 text-red-300/90 line-through" : "text-white/40"}`}
        >
          <span>{row.d}</span>
          <span>{row.h}</span>
          <span>{row.s}</span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1.5 text-red-400">
        <AlertCircle className="h-3 w-3 shrink-0" />
        <span>Double booking risk — 14 Nov</span>
      </div>
    </div>
  );
}

function MockWadiiBookings() {
  return (
    <div className="rounded-xl border border-[#E62E2D]/30 bg-gradient-to-br from-[#1a2742] to-[#111A2D] p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-white/70">November 2025</span>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400">LIVE</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-white/35 mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 14 }).map((_, i) => {
          const day = i + 1;
          const isBooked = day === 14;
          const isHold = day === 22;
          const isMuhurat = day === 8;
          return (
            <div
              key={day}
              className={[
                "flex h-6 items-center justify-center rounded text-[9px] font-medium",
                isBooked
                  ? "bg-[#E62E2D] text-white shadow-sm shadow-red-900/40"
                  : isHold
                    ? "bg-amber-500/25 text-amber-300 ring-1 ring-amber-500/40"
                    : isMuhurat
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "text-white/25",
              ].join(" ")}
            >
              {isMuhurat ? <Star className="h-2.5 w-2.5" /> : day}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-[#E62E2D]/20 px-2 py-0.5 text-[9px] text-[#ff9a99]">Hold lock active</span>
        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[9px] text-white/50">0 conflicts</span>
      </div>
    </div>
  );
}

function MockManualLeads() {
  return (
    <div className="space-y-2">
      <div className="rounded-xl border border-white/10 bg-[#0d121f] p-3">
        <p className="mb-2 text-[10px] text-white/40">WhatsApp — unread (47)</p>
        {["Rahul — wedding enquiry", "Priya — ???", "Unknown — missed call"].map((msg, i) => (
          <div
            key={msg}
            className={`mb-1.5 rounded-lg px-2 py-1.5 text-[10px] ${i === 1 ? "bg-red-500/10 text-red-300/80 border border-red-500/20" : "bg-white/5 text-white/45"}`}
          >
            {msg}
            {i === 1 && <span className="ml-1 text-red-400">· no follow-up 12 days</span>}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-dashed border-white/15 px-3 py-2 text-center text-[10px] text-white/30">
        Lead lost — no CRM record
      </div>
    </div>
  );
}

function MockWadiiLeads() {
  return (
    <div className="rounded-xl border border-[#E62E2D]/25 bg-gradient-to-br from-[#1a2742] to-[#111A2D] p-3">
      <p className="mb-2 text-[10px] font-semibold text-white/60">Lead pipeline</p>
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { label: "New", count: 8, color: "bg-blue-500/20 text-blue-300" },
          { label: "Follow-up", count: 5, color: "bg-amber-500/20 text-amber-300" },
          { label: "Hold", count: 3, color: "bg-[#E62E2D]/25 text-[#ff9a99]" },
          { label: "Booked", count: 12, color: "bg-emerald-500/20 text-emerald-300" },
        ].map((col) => (
          <div key={col.label} className="rounded-lg bg-white/[0.03] p-1.5">
            <p className={`mb-1 rounded px-1 py-0.5 text-center text-[8px] font-bold ${col.color}`}>{col.label}</p>
            <div className="space-y-1">
              {Array.from({ length: Math.min(col.count, 2) }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-white/8" />
              ))}
            </div>
            <p className="mt-1 text-center text-[9px] font-bold text-white/50">{col.count}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2 py-1.5 text-[9px] text-emerald-400">
        <MessageCircle className="h-3 w-3" />
        WhatsApp reminder sent · 2h ago
      </div>
    </div>
  );
}

function MockManualBilling() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d121f] p-3 space-y-2">
      {["invoice_draft.pdf", "vendor_payments.xlsx", "cash_memo_nov.jpg"].map((file) => (
        <div key={file} className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5 text-[10px] text-white/40">
          <Receipt className="h-3 w-3 shrink-0 text-white/25" />
          {file}
        </div>
      ))}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-2">
        <p className="text-[10px] text-amber-400/90">₹4.2L pending — unknown debtors</p>
        <p className="text-[9px] text-white/30 mt-0.5">Reconciled manually at month-end</p>
      </div>
    </div>
  );
}

function MockWadiiBilling() {
  return (
    <div className="rounded-xl border border-[#E62E2D]/25 bg-gradient-to-br from-[#1a2742] to-[#111A2D] p-3">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] text-white/50">Revenue this month</span>
        <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
      </div>
      <p className="text-lg font-bold text-white mb-2">₹18.4L</p>
      <div className="space-y-1.5 mb-2">
        <div className="flex justify-between text-[9px]">
          <span className="text-emerald-400">Collected</span>
          <span className="text-white/60">₹14.1L</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-[76%] rounded-full bg-emerald-500" />
        </div>
        <div className="flex justify-between text-[9px]">
          <span className="text-amber-400">Pending</span>
          <span className="text-white/60">₹4.3L</span>
        </div>
      </div>
      <div className="flex gap-1.5">
        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[9px] text-white/45">3 vendors</span>
        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[9px] text-white/45">Auto invoices</span>
      </div>
    </div>
  );
}

function MockManualMuhurat() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d121f] p-3">
      <p className="text-[10px] text-white/40 mb-2">Wedding season planner</p>
      <div className="space-y-1.5">
        {[
          { date: "8 Nov — Muhurat?", note: "check with pandit" },
          { date: "14 Nov", note: "FULL? ask Raj" },
          { date: "22 Nov — premium", note: "price???" },
        ].map((row) => (
          <div key={row.date} className="flex items-start gap-2 rounded-lg bg-white/5 px-2 py-1.5">
            <CalendarHeart className="h-3 w-3 shrink-0 mt-0.5 text-white/25" />
            <div>
              <p className="text-[10px] text-white/50">{row.date}</p>
              <p className="text-[9px] text-white/25 italic">{row.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockWadiiMuhurat() {
  return (
    <div className="rounded-xl border border-yellow-500/30 bg-gradient-to-br from-[#1a2742] to-[#111A2D] p-3">
      <div className="mb-2 flex items-center gap-2">
        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400/30" />
        <span className="text-[10px] font-semibold text-yellow-300/90">Muhurat season · Nov 2025</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {[
          { d: "8 Nov", tag: "Muhurat", full: true },
          { d: "14 Nov", tag: "Premium", full: true },
          { d: "22 Nov", tag: "Muhurat", full: false },
        ].map((item) => (
          <div
            key={item.d}
            className={`rounded-lg p-2 text-center ${item.full ? "bg-[#E62E2D]/20 ring-1 ring-[#E62E2D]/40" : "bg-yellow-500/15 ring-1 ring-yellow-500/30"}`}
          >
            <p className="text-[9px] font-bold text-white/80">{item.d}</p>
            <p className="text-[8px] text-yellow-400/80">{item.tag}</p>
            <p className={`text-[8px] mt-0.5 font-semibold ${item.full ? "text-[#ff9a99]" : "text-emerald-400"}`}>
              {item.full ? "At capacity" : "2 slots left"}
            </p>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-white/40">Premium pricing applied · team notified</p>
    </div>
  );
}

/* ─── Comparison data ─── */

const TOPICS = [
  {
    id: "bookings",
    label: "Bookings",
    icon: CalendarDays,
    manualTitle: "Spreadsheets & scattered notes",
    manualPoints: [
      "Double bookings slip through unchecked",
      "No hold locks — tentative dates get lost",
      "Teams work off different versions",
    ],
    wadiiTitle: "One live booking calendar",
    wadiiPoints: [
      "Conflict alerts before you confirm",
      "Hold locks protect tentative dates",
      "Every team sees the same availability",
    ],
    specialty: "Hold lock system",
    ManualVisual: MockManualBookings,
    WadiiVisual: MockWadiiBookings,
  },
  {
    id: "leads",
    label: "Leads & CRM",
    icon: Users,
    manualTitle: "WhatsApp chaos, zero pipeline",
    manualPoints: [
      "Enquiries buried in personal chats",
      "No follow-up reminders — leads go cold",
      "Walk-ins and web leads never tracked",
    ],
    wadiiTitle: "Banquet CRM with WhatsApp flows",
    wadiiPoints: [
      "Every enquiry logged with full history",
      "Automated follow-up reminders",
      "Enquiry → hold → booked pipeline",
    ],
    specialty: "WhatsApp automation",
    ManualVisual: MockManualLeads,
    WadiiVisual: MockWadiiLeads,
  },
  {
    id: "billing",
    label: "Billing",
    icon: Receipt,
    manualTitle: "Files everywhere, cashflow blind",
    manualPoints: [
      "Invoices, vendors & expenses in silos",
      "Pending payments discovered too late",
      "Month-end reconciliation takes days",
    ],
    wadiiTitle: "Revenue intelligence built in",
    wadiiPoints: [
      "Collected vs pending at a glance",
      "Vendor ledgers & expense tracking",
      "Owner-ready reports every morning",
    ],
    specialty: "Revenue dashboard",
    ManualVisual: MockManualBilling,
    WadiiVisual: MockWadiiBilling,
  },
  {
    id: "muhurat",
    label: "Muhurat dates",
    icon: CalendarHeart,
    manualTitle: "Premium dates managed by memory",
    manualPoints: [
      "Muhurat days noted on paper or WhatsApp",
      "Premium pricing applied inconsistently",
      "Capacity planning is guesswork",
    ],
    wadiiTitle: "Muhurat-aware calendar planning",
    wadiiPoints: [
      "Mark auspicious dates on your calendar",
      "Premium pricing rules per date type",
      "Capacity alerts before you overbook",
    ],
    specialty: "Only on Wadii",
    ManualVisual: MockManualMuhurat,
    WadiiVisual: MockWadiiMuhurat,
  },
];

const SPECIALTIES = [
  {
    icon: Building2,
    title: "Built for Indian banquet halls",
    description: "Not a hotel PMS. Not a generic CRM. Every screen maps to how venues in India actually sell and run weddings.",
    stat: "500+",
    statLabel: "venues onboarded",
    featured: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp-first sales",
    description: "Automated follow-ups and conversation history tied to every lead — where your clients already are.",
    stat: "3×",
    statLabel: "faster follow-ups",
    featured: false,
  },
  {
    icon: CalendarHeart,
    title: "Muhurat season ready",
    description: "Mark auspicious wedding dates, plan capacity, and price premium days without spreadsheet chaos.",
    stat: "0",
    statLabel: "double bookings",
    featured: false,
  },
  {
    icon: IndianRupee,
    title: "₹19,999/year — all in",
    description: "One plan per venue. Unlimited bookings & leads. No per-event fees. Full platform from day one.",
    stat: "1",
    statLabel: "plan, everything",
    featured: false,
  },
];

const panelVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const panelVariantsRight = {
  hidden: { opacity: 0, x: 12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export const ComparisonSection = () => {
  const [activeTopic, setActiveTopic] = useState(0);
  const topic = TOPICS[activeTopic];
  const ManualVisual = topic.ManualVisual;
  const WadiiVisual = topic.WadiiVisual;

  const selectTopic = (idx: number) => {
    if (idx === activeTopic) return;
    startTransition(() => setActiveTopic(idx));
  };

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-nav-theme="dark"
      className="section-surface-dark relative overflow-hidden py-24 md:py-32"
      aria-label="Why choose Wadii over manual banquet management"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(230,46,45,0.5) 0%, transparent 65%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 bg-[#E62E2D]/15 text-[#ff8a89] border border-[#E62E2D]/30">
            <Zap className="w-3.5 h-3.5" />
            Manual vs Wadii
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            See the difference
            <br />
            <span className="gradient-text">side by side</span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Pick any workflow your venue runs daily. This is what manual operations look like — and what changes the moment you switch to Wadii.
          </p>
        </div>

        {/* Topic tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
          {TOPICS.map((t, idx) => {
            const Icon = t.icon;
            const isActive = idx === activeTopic;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTopic(idx)}
                className={[
                  "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-[#E62E2D] border-[#E62E2D] text-white shadow-lg shadow-red-900/35"
                    : "bg-white/[0.04] border-white/10 text-white/55 hover:border-white/20 hover:text-white/80 hover:bg-white/[0.07]",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Split showcase */}
        <div className="comparison-showcase-shell rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
          <AnimatePresence mode="wait">
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-2"
            >
              {/* Manual panel */}
              <motion.div
                variants={panelVariants}
                initial="hidden"
                animate="show"
                className="relative border-b lg:border-b-0 lg:border-r border-white/10 bg-white/[0.02] p-6 md:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent pointer-events-none" aria-hidden />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/40">
                      <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
                      Manual approach
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white/70 mb-4 tracking-tight line-through decoration-red-500/40 decoration-2">
                    {topic.manualTitle}
                  </h3>

                  <div className="mb-5 opacity-75 saturate-50">
                    <ManualVisual />
                  </div>

                  <ul className="space-y-2.5">
                    {topic.manualPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-white/40">
                        <X className="h-4 w-4 shrink-0 mt-0.5 text-red-400/60" strokeWidth={2} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Wadii panel */}
              <motion.div
                variants={panelVariantsRight}
                initial="hidden"
                animate="show"
                className="relative p-6 md:p-8 bg-gradient-to-br from-[#1a2742]/80 via-[#152238]/60 to-[#111A2D]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  aria-hidden
                  style={{
                    background: "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(230,46,45,0.25) 0%, transparent 60%)",
                  }}
                />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E62E2D] text-white shadow-md shadow-red-900/40">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff8a89]">
                      With Wadii
                    </span>
                    <span className="rounded-full border border-[#E62E2D]/40 bg-[#E62E2D]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ff9a99]">
                      {topic.specialty}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
                    {topic.wadiiTitle}
                  </h3>

                  <div className="mb-5 ring-1 ring-[#E62E2D]/20 rounded-xl shadow-lg shadow-red-900/10">
                    <WadiiVisual />
                  </div>

                  <ul className="space-y-2.5">
                    {topic.wadiiPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-white/80">
                        <Check className="h-4 w-4 shrink-0 mt-0.5 text-[#E62E2D]" strokeWidth={3} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-white/[0.03] px-6 py-4">
            {TOPICS.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                aria-label={`View ${t.label} comparison`}
                onClick={() => selectTopic(idx)}
                className={[
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === activeTopic ? "w-8 bg-[#E62E2D]" : "w-3 bg-white/20 hover:bg-white/35",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        {/* Specialties bento */}
        <div className="mt-16 md:mt-20">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff8a89] mb-2">
              Wadii&apos;s edge
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              What no spreadsheet or generic tool gives you
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SPECIALTIES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={[
                    "group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1",
                    item.featured
                      ? "md:col-span-2 lg:col-span-2 lg:row-span-3 border-[#E62E2D]/35 bg-gradient-to-br from-[#E62E2D]/12 via-white/[0.06] to-white/[0.03] hover:border-[#E62E2D]/55 hover:shadow-xl hover:shadow-red-900/15 p-7 md:p-8 flex flex-col justify-center min-h-[280px] lg:min-h-0"
                      : "border-white/10 bg-white/[0.04] hover:border-[#E62E2D]/30 hover:bg-white/[0.07] p-6",
                  ].join(" ")}
                >
                  {item.featured && (
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-2xl"
                      style={{ background: "radial-gradient(circle, #E62E2D 0%, transparent 70%)" }}
                      aria-hidden
                    />
                  )}

                  <div className={item.featured ? "relative flex flex-col sm:flex-row sm:items-start gap-6" : "relative"}>
                    <div
                      className={[
                        "flex shrink-0 items-center justify-center rounded-2xl transition-colors duration-300",
                        item.featured
                          ? "h-14 w-14 bg-[#E62E2D] text-white shadow-lg shadow-red-900/35"
                          : "h-11 w-11 bg-white/10 text-[#E62E2D] group-hover:bg-[#E62E2D] group-hover:text-white",
                      ].join(" ")}
                    >
                      <Icon className={item.featured ? "h-7 w-7" : "h-5 w-5"} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <h4
                          className={[
                            "font-bold text-white tracking-tight",
                            item.featured ? "text-xl md:text-2xl" : "text-[15px]",
                          ].join(" ")}
                        >
                          {item.title}
                        </h4>
                        {item.featured && (
                          <span className="text-3xl md:text-4xl font-black text-[#E62E2D] tabular-nums">
                            {item.stat}
                          </span>
                        )}
                      </div>
                      {item.featured && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#ff8a89] mb-2">
                          {item.statLabel}
                        </p>
                      )}
                      <p
                        className={[
                          "text-white/55 leading-relaxed",
                          item.featured ? "text-sm md:text-base max-w-lg" : "text-sm",
                        ].join(" ")}
                      >
                        {item.description}
                      </p>
                      {!item.featured && (
                        <div className="mt-3 flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-[#E62E2D]">{item.stat}</span>
                          <span className="text-[11px] font-medium uppercase tracking-wider text-white/35">
                            {item.statLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-12 md:mt-14 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.03] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
        >
          <div>
            <p className="text-sm font-semibold text-[#ff8a89] mb-1">Ready to switch?</p>
            <p className="text-lg md:text-xl font-bold text-white tracking-tight">
              See Wadii running on your venue&apos;s actual workflow — not a generic demo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="#features"
              onClick={scrollToFeatures}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Explore features
            </a>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E62E2D] hover:bg-[#c92827] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
