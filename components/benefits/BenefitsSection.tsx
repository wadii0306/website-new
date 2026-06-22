"use client";

import React from "react";
import { motion } from "framer-motion";
import { Workflow, IndianRupee, Sparkles, ShieldCheck } from "lucide-react";

const BENEFITS = [
  {
    title: "Streamlined Operations",
    description:
      "Automate booking workflows, reminders, and team coordination so your staff spends less time on admin and more on guests.",
    icon: Workflow,
    stat: "10+ hrs",
    statLabel: "saved per week",
    className: "lg:col-span-7",
    variant: "light" as const,
  },
  {
    title: "Higher Revenue Potential",
    description:
      "Improve lead conversion, increase occupancy, and use analytics to make sharper pricing and sales decisions.",
    icon: IndianRupee,
    stat: "+32%",
    statLabel: "avg revenue lift",
    className: "lg:col-span-5",
    variant: "accent" as const,
  },
  {
    title: "Better Guest Experience",
    description:
      "Deliver a consistent, professional journey from inquiry to event day with fewer gaps and faster responses.",
    icon: Sparkles,
    stat: "4.8★",
    statLabel: "venue satisfaction",
    className: "lg:col-span-5",
    variant: "light" as const,
  },
  {
    title: "Secure & Reliable Data",
    description:
      "Booking, billing, and customer records stay protected with role-based access, audit trails, and cloud reliability.",
    icon: ShieldCheck,
    stat: "99.9%",
    statLabel: "platform uptime",
    className: "lg:col-span-7",
    variant: "dark" as const,
  },
];

const METRICS = [
  { value: "500+", label: "Venues trust Wadii" },
  { value: "50K+", label: "Events managed" },
  { value: "24/7", label: "Cloud availability" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const BenefitsSection = () => {
  return (
    <section data-nav-theme="light" className="section-surface-white relative overflow-hidden py-24 md:py-28" aria-label="Benefits of Wadii">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(230,46,45,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(17,26,45,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 bg-red-50 text-[#E62E2D] border border-red-100">
            Benefits
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111A2D] leading-tight tracking-tight mb-4">
            Why venue owners choose
            <br />
            <span className="gradient-text">Wadii over alternatives</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Built for banquet operations — stronger UX, faster onboarding, and outcomes you can measure from day one.
          </p>
        </div>

        {/* Impact metrics strip */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 rounded-2xl border border-[#e8edf5] bg-gradient-to-r from-[#f8f9fb] via-white to-[#f8f9fb] p-4 md:p-6"
        >
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              custom={i}
              variants={fadeUp}
              className="text-center md:text-left md:px-4 md:[&:not(:last-child)]:border-r md:border-[#e8edf5]"
            >
              <p className="text-2xl md:text-3xl font-black text-[#111A2D] tracking-tight">{m.value}</p>
              <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5"
        >
          {BENEFITS.map((item, index) => {
            const Icon = item.icon;
            const isDark = item.variant === "dark";
            const isAccent = item.variant === "accent";

            return (
              <motion.article
                key={item.title}
                custom={index}
                variants={fadeUp}
                className={[
                  "group relative overflow-hidden rounded-3xl border p-7 md:p-8 transition-all duration-300 hover:-translate-y-1",
                  item.className,
                  isDark
                    ? "border-[#1a2742] bg-gradient-to-br from-[#111A2D] via-[#152238] to-[#0f1724] text-white shadow-xl shadow-[#111A2D]/25"
                    : isAccent
                      ? "border-[#f5c4c4] bg-gradient-to-br from-[#fff5f5] via-white to-[#fff8f8] shadow-lg shadow-red-100/50"
                      : "border-[#e8edf5] bg-white shadow-md shadow-gray-200/40 hover:border-red-200 hover:shadow-xl",
                ].join(" ")}
              >
                {!isDark && (
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                    style={{
                      background: isAccent
                        ? "radial-gradient(circle, rgba(230,46,45,0.25) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(17,26,45,0.08) 0%, transparent 70%)",
                    }}
                    aria-hidden
                  />
                )}

                <div className="relative flex flex-col h-full min-h-[200px]">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div
                      className={[
                        "flex h-12 w-12 items-center justify-center rounded-2xl shrink-0",
                        isDark
                          ? "bg-[#E62E2D] text-white"
                          : isAccent
                            ? "bg-[#E62E2D] text-white"
                            : "bg-[#111A2D] text-white",
                      ].join(" ")}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div
                      className={[
                        "text-right",
                        isDark ? "text-white" : "text-[#111A2D]",
                      ].join(" ")}
                    >
                      <p className="text-2xl md:text-3xl font-black leading-none tracking-tight">
                        {item.stat}
                      </p>
                      <p
                        className={[
                          "text-[11px] font-semibold uppercase tracking-wider mt-1",
                          isDark ? "text-white/50" : "text-gray-400",
                        ].join(" ")}
                      >
                        {item.statLabel}
                      </p>
                    </div>
                  </div>

                  <h3
                    className={[
                      "text-xl md:text-2xl font-bold mb-3 tracking-tight",
                      isDark ? "text-white" : "text-[#111A2D]",
                    ].join(" ")}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={[
                      "text-sm md:text-[15px] leading-relaxed flex-1",
                      isDark ? "text-white/65" : "text-gray-600",
                    ].join(" ")}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
