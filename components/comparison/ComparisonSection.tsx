"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

const MANUAL_ITEMS = [
  "Spreadsheet-based booking management",
  "Manual event tracking across teams",
  "Traditional banquet management processes",
  "Disconnected payment and lead follow-ups",
];

const DIGITAL_ITEMS = [
  "Digital banquet management software in one platform",
  "Centralized booking calendar and lead CRM",
  "Automated billing, reporting, and vendor tracking",
  "Real-time visibility for owners and managers",
];

export const ComparisonSection = () => {
  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-nav-theme="light"
      className="section-surface-white relative overflow-hidden py-20 md:py-24 border-y border-[#e8edf5]"
      aria-label="Why choose Wadii over manual banquet management"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111A2D] leading-tight tracking-tight mb-4">
            Why Choose Wadii Over{" "}
            <span className="gradient-text">Manual Banquet Management?</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Move from spreadsheets and scattered notes to a complete banquet management system built for modern venues.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="grid md:grid-cols-2 gap-5 md:gap-6"
        >
          <div className="rounded-2xl border border-[#e8edf5] bg-[#f8f9fb] p-6 md:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-4">
              Manual approach
            </p>
            <ul className="space-y-3">
              {MANUAL_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                    <X className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E62E2D]/25 bg-white p-6 md:p-8 shadow-lg shadow-red-100/30">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E62E2D] mb-4">
              With Wadii
            </p>
            <ul className="space-y-3 mb-6">
              {DIGITAL_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#E62E2D]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#features"
              onClick={scrollToFeatures}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#E62E2D] hover:text-[#c92827] transition-colors"
            >
              Explore banquet management features
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
