import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Space_Grotesk } from "next/font/google";
import { Toaster } from 'sonner';
import { jsonLdGraph } from "@/lib/seo-schema";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const BASE_URL = "https://www.wadii.in";
const GTM_ID = "GTM-MM7QV7VT";

const META_TITLE =
  "#1 Banquet Management Software & System for Venues & Banquet Halls | Wadii";
const META_DESCRIPTION =
  "Wadii is a complete banquet management software for banquet halls, hotels, and event venues. Manage bookings, leads, payments, vendor management, CRM, and reports from one platform. Plans from ₹19,999/year.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: META_TITLE,
    template: "%s | Wadii",
  },
  description: META_DESCRIPTION,
  keywords: [
    "banquet management software",
    "banquet management system",
    "banquet hall management software",
    "banquet hall CRM",
    "event venue management",
    "banquet booking system",
    "event management software",
    "venue booking software",
    "banquet hall software India",
    "wedding hall management",
    "party hall booking system",
    "banquet CRM",
    "Wadii",
  ],
  authors: [{ name: "Wadii", url: BASE_URL }],
  creator: "Wadii",
  publisher: "Wadii",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Wadii",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Wadii banquet management software dashboard for bookings, CRM, payments, and reporting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: { canonical: BASE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=function(){document.querySelectorAll("[fdprocessedid]").forEach(function(e){e.removeAttribute("fdprocessedid")})};s();new MutationObserver(s).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["fdprocessedid"]})})();`,
          }}
        />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
