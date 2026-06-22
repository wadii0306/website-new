import { INSTAGRAM_URL, LINKEDIN_URL, OPERATOR_NAME, PRODUCT_NAME, SITE_URL } from "./brand";

export const SEO_FAQ_ENTRIES = [
  {
    q: "What is banquet management software?",
    a: "Banquet management software helps banquet halls and event venues manage bookings, customer communication, billing, event planning, and reporting from one platform.",
  },
  {
    q: "How does a banquet management system work?",
    a: "A banquet management system centralizes venue operations including inquiry tracking, booking management, payment collection, customer communication, and performance analytics.",
  },
  {
    q: "Who can use banquet management software?",
    a: "Banquet halls, wedding venues, hotels, convention centers, and event management companies can use banquet management software to streamline operations.",
  },
  {
    q: "Is Wadii suitable for small banquet halls?",
    a: "Yes. Wadii is designed for both small banquet halls and large venue chains.",
  },
] as const;

export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: PRODUCT_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo/main_logo.png`,
      },
      description:
        `${PRODUCT_NAME} is a banquet management software operated by ${OPERATOR_NAME}. It helps banquet halls, hotels, and event venues manage bookings, leads, payments, vendor management, CRM, and reporting.`,
      foundingDate: "2025-06-03",
      parentOrganization: {
        "@type": "Organization",
        name: OPERATOR_NAME,
      },
      founder: {
        "@type": "Person",
        name: "Jainam Shah",
      },
      email: "managewisessolution@gmail.com",
      sameAs: [SITE_URL, INSTAGRAM_URL, LINKEDIN_URL],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: PRODUCT_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description:
        "Wadii is a cloud-based banquet management software and banquet management system for banquet halls, hotels, wedding venues, and event management businesses. It helps manage bookings, leads, customer relationships, vendor management, payments, billing, and analytics from one platform.",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      offers: {
        "@type": "Offer",
        name: "Wadii Complete",
        price: "19999",
        priceCurrency: "INR",
        priceValidUntil: "2027-12-31",
        description: "All-in-one banquet management — billed yearly per venue.",
      },
      featureList: [
        "Banquet Booking Management",
        "Banquet CRM & Lead Management",
        "Banquet Booking Calendar",
        "Vendor Management",
        "Expense Management",
        "Reports & Business Analytics",
        "Team & Access Management",
        "Muhurat Day Management",
        "Banquet Management Dashboard",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: PRODUCT_NAME,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: SEO_FAQ_ENTRIES.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};
