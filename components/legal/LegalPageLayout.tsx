import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft } from "lucide-react";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col">
      <header className="sticky top-0 z-50 border-b border-[#e8edf5] bg-white/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0" aria-label="Wadii home">
            <Logo variant="light" className="h-9 w-auto" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#E62E2D] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E62E2D] mb-3">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#111A2D] tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-sm text-gray-400 mb-10">Last updated: {lastUpdated}</p>

          <article className="rounded-2xl border border-[#e8edf5] bg-white px-6 py-8 md:px-10 md:py-10 shadow-sm legal-prose">
            {children}
          </article>
        </div>
      </main>

      <footer className="border-t border-[#e8edf5] bg-white">
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Wadii. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#E62E2D] transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-[#111A2D] transition-colors">
              wadii.in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
