"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  ArrowRight,
  Loader2,
  Building2,
  User,
  Phone,
  MapPin,
  CalendarDays,
  Clock,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";
import { contactApi } from "../../services/contact.service";

function getContactErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        return "Contact API is not configured. Add NEXT_PUBLIC_API_URL=https://api.wadii.in/api in Vercel and redeploy.";
      }
      return "Could not reach the Wadii API. Ask your team to confirm NEXT_PUBLIC_API_URL is set to https://api.wadii.in/api on Vercel and redeploy.";
    }
    const data = error.response.data as { message?: string; errors?: string[] } | undefined;
    if (data?.errors?.length) return data.errors.join(" ");
    if (data?.message) return data.message;
    if (error.response.status === 400) return "Please check your form details and try again.";
  }
  return "Something went wrong. Please try again later.";
}

const CONTACT_EMAIL = "managewisesolutions@gmail.com";

const QUICK_STATS = [
  { value: "24h", label: "Avg. response" },
  { value: "₹19,999", label: "All-in-one plan" },
  { value: "500+", label: "Venues onboarded" },
];

interface FormState {
  fullName: string;
  banquetName: string;
  email: string;
  phone: string;
  city: string;
  venueType: string;
  message: string;
}

interface ErrorState {
  fullName?: string;
  banquetName?: string;
  email?: string;
  phone?: string;
  city?: string;
}

function fieldClass(hasError: boolean, focused: boolean) {
  return [
    "w-full rounded-xl border bg-[#f4f6fa] px-4 py-3.5 text-[15px] text-[#111A2D] outline-none transition-all duration-200",
    hasError
      ? "border-[#E62E2D] ring-2 ring-[#E62E2D]/20 bg-red-50/40"
      : focused
        ? "border-[#E62E2D] bg-white ring-4 ring-[#E62E2D]/10"
        : "border-transparent hover:border-[#dde3ee]",
  ].join(" ");
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    banquetName: "",
    email: "",
    phone: "",
    city: "",
    venueType: "",
    message: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const e: ErrorState = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    else if (form.fullName.trim().length < 2) e.fullName = "Name must be at least 2 characters.";
    if (!form.banquetName.trim()) e.banquetName = "Banquet / venue name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Please enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Must be exactly 10 digits.";
    if (!form.city.trim()) e.city = "City is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof ErrorState]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await contactApi.createContact({
        fullName: form.fullName.trim(),
        banquetName: form.banquetName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        venueType: form.venueType.trim() || undefined,
        message: form.message.trim() || undefined,
      });

      if (response.success) {
        toast.success("Message submitted! We'll respond within 24 hours.", {
          duration: 5000,
          position: "top-right",
        });
        setForm({
          fullName: "",
          banquetName: "",
          email: "",
          phone: "",
          city: "",
          venueType: "",
          message: "",
        });
        setErrors({});
      } else {
        toast.error(response.message || "Failed to submit contact form", {
          duration: 4000,
          position: "top-right",
        });
      }
    } catch (error: unknown) {
      console.error("Contact form submission error:", error);
      toast.error(getContactErrorMessage(error), {
        duration: 5000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const FieldError = ({ msg }: { msg?: string }) =>
    msg ? <p className="mt-1.5 text-xs text-[#E62E2D] font-medium">{msg}</p> : null;

  return (
    <section
      id="contact"
      data-nav-theme="dark"
      className="relative isolate overflow-hidden bg-[#111A2D] py-20 md:py-28"
      aria-label="Contact Wadii"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-[420px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(230,46,45,0.5) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#ff8a89] mb-5">
              Contact · Get started
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[2.65rem] font-extrabold text-white leading-[1.12] tracking-tight mb-5">
              Looking for banquet management software for your{" "}
              <span className="text-[#E62E2D]">venue?</span>
            </h2>
            <p className="text-base text-white/60 leading-relaxed mb-8 max-w-md">
              Speak with our team to see how Wadii can help streamline bookings, customer management, billing, reporting, and daily banquet operations.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {QUICK_STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center"
                >
                  <p className="text-base font-extrabold text-white">{s.value}</p>
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-white/45 mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10 transition-colors"
              >
                <Mail className="h-4 w-4 text-[#ff8a89] shrink-0" />
                <span className="text-sm font-medium">{CONTACT_EMAIL}</span>
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
                <Clock className="h-4 w-4 text-[#ff8a89] shrink-0" />
                <span className="text-sm">Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
                <ShieldCheck className="h-4 w-4 text-[#ff8a89] shrink-0" />
                <span className="text-sm">₹19,999/year · guided onboarding</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-white/10 bg-white p-6 sm:p-8 shadow-2xl shadow-black/30">
            <h3 className="text-xl font-bold text-[#111A2D] mb-1">Tell us about your venue</h3>
            <p className="text-sm text-gray-500 mb-6">We&apos;ll respond within one business day.</p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#111A2D]">
                    Full name <span className="text-[#E62E2D]">*</span>
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      suppressHydrationWarning
                      className={`${fieldClass(!!errors.fullName, focused === "fullName")} pl-10`}
                      type="text"
                      name="fullName"
                      placeholder="Your name"
                      value={form.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocused("fullName")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <FieldError msg={errors.fullName} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#111A2D]">
                    Venue name <span className="text-[#E62E2D]">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      suppressHydrationWarning
                      className={`${fieldClass(!!errors.banquetName, focused === "banquetName")} pl-10`}
                      type="text"
                      name="banquetName"
                      placeholder="Your banquet hall"
                      value={form.banquetName}
                      onChange={handleChange}
                      onFocus={() => setFocused("banquetName")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <FieldError msg={errors.banquetName} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#111A2D]">
                    Email <span className="text-[#E62E2D]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      suppressHydrationWarning
                      className={`${fieldClass(!!errors.email, focused === "email")} pl-10`}
                      type="email"
                      name="email"
                      placeholder="you@venue.com"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <FieldError msg={errors.email} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#111A2D]">
                    Phone <span className="text-[#E62E2D]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      suppressHydrationWarning
                      className={`${fieldClass(!!errors.phone, focused === "phone")} pl-10`}
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setForm((p) => ({ ...p, phone: val }));
                        if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                      }}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <FieldError msg={errors.phone} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#111A2D]">
                    City <span className="text-[#E62E2D]">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      suppressHydrationWarning
                      className={`${fieldClass(!!errors.city, focused === "city")} pl-10`}
                      type="text"
                      name="city"
                      placeholder="Mumbai"
                      value={form.city}
                      onChange={handleChange}
                      onFocus={() => setFocused("city")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <FieldError msg={errors.city} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#111A2D]">
                    Venue type <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <select
                      suppressHydrationWarning
                      className={`${fieldClass(false, focused === "venueType")} pl-10 cursor-pointer appearance-none ${!form.venueType ? "text-gray-400" : ""}`}
                      name="venueType"
                      value={form.venueType}
                      onChange={handleChange}
                      onFocus={() => setFocused("venueType")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="">Select type</option>
                      <option>Banquet Hall</option>
                      <option>Hotel</option>
                      <option>Resort</option>
                      <option>Event Space</option>
                      <option>Restaurant</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#111A2D]">
                  Message <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  suppressHydrationWarning
                  className={`${fieldClass(false, focused === "message")} min-h-[100px] resize-y`}
                  name="message"
                  placeholder="Team size, current tools, or goals..."
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <button
                type="submit"
                suppressHydrationWarning
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E62E2D] py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-colors hover:bg-[#c92827] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
