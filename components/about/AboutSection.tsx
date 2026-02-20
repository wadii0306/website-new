import React from 'react';

const stats = [
  { value: '500+', label: 'Venues Managed' },
  { value: '50K+', label: 'Events Booked' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

const trustCards = [
  {
    title: '5 Years of Service Industry Experience',
    desc: 'Our team brings half a decade of hands-on experience in the service and hospitality industry, understanding the real challenges you face daily.',
  },
  {
    title: 'Purpose-Built Solution',
    desc: 'Specifically designed for hotels, banquet halls, and event managers. Every feature is crafted with your workflow in mind.',
  },
  {
    title: 'Complete Transparency',
    desc: 'Transparent workflows, complete auditability, and clear communication channels ensure you\'re always in control of your operations.',
  },
  {
    title: 'Proven Track Record',
    desc: 'Trusted by banquet managers across India to streamline operations and deliver exceptional customer experiences.',
  },
];

const CheckDot = () => (
  <span
    className="mt-1.5 shrink-0 w-2 h-2 rounded-full block"
    style={{ background: '#F28B8A' }}
  />
);

export const AboutSection = () => {
  return (
    <section id="about-section" className="w-full bg-white">

      {/* ── Part 1: About Wadii ── */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-2">
          <span
            className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(242,139,138,0.1)', color: '#F28B8A', border: '1px solid rgba(242,139,138,0.25)' }}
          >
            About Us
          </span>
        </div>
        <h2 className="text-4xl font-extrabold mb-2 leading-tight tracking-tight" style={{ color: '#1D2638' }}>
          About Wadii
        </h2>
        <p className="text-gray-500 mb-10 text-base">
          Transforming the banquet management industry through innovation and transparency.
        </p>

        {/* Story + History cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Our Story */}
          <div
            className="rounded-2xl p-8 border"
            style={{ borderColor: 'rgba(242,139,138,0.3)', background: '#fff' }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: '#1D2638' }}>Our Story</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Wadii is an advanced banquet management software designed to bring transparency, efficiency, and digital transformation to the event management industry. The platform bridges the gap between clients and vendors, ensuring clear communication and seamless coordination throughout the event lifecycle.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              For clients, Wadii ensures complete visibility into event details. For banquet managers and owners, it offers robust tools to track customer flow, monitor sales, and analyze performance — all within a single, integrated system.
            </p>
          </div>

          {/* Our History */}
          <div
            className="rounded-2xl p-8 border"
            style={{ borderColor: 'rgba(242,139,138,0.3)', background: '#fff' }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: '#1D2638' }}>Our History</h3>
            <div className="flex gap-6 mb-4 text-sm">
              <div>
                <span className="font-semibold" style={{ color: '#1D2638' }}>Founded: </span>
                <span className="text-gray-500">June 3, 2025</span>
              </div>
              <div>
                <span className="font-semibold" style={{ color: '#1D2638' }}>Founder: </span>
                <span className="text-gray-500">Mr. Jainam Shah</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Wadii was born from a clear vision: to organize and professionalize the banquet management sector through digital transformation. Our journey began with a deep understanding of the challenges faced by event managers and a commitment to solving them through innovative technology.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t" style={{ borderColor: 'rgba(29,38,56,0.08)' }}>
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-extrabold" style={{ color: '#F28B8A' }}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Part 2: Why Trust Us ── */}
      <div className="py-16" style={{ background: '#f8f9fb' }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight" style={{ color: '#1D2638' }}>
            Why Trust Us
          </h2>
          <p className="text-gray-500 mb-10">Built on experience, driven by excellence.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trustCards.map((card, i) => (
              <div
                key={card.title}
                className="rounded-2xl p-6 border bg-white transition-shadow duration-200 hover:shadow-md"
                style={{
                  borderColor: i === 0 ? 'rgba(242,139,138,0.5)' : 'rgba(242,139,138,0.2)',
                  borderWidth: i === 0 ? '1.5px' : '1px',
                }}
              >
                <h3 className="font-bold text-sm mb-3 leading-snug" style={{ color: '#1D2638' }}>
                  {card.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Part 3: Mission & Vision ── */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(242,139,138,0.12)' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" fill="#F28B8A" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold" style={{ color: '#1D2638' }}>Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              To transform the banquet and event management sector by making it more organized, transparent, and professional, while simplifying operations for owners and managers and delivering a seamless experience for customers.
            </p>
            <ul className="space-y-2.5">
              {['Streamline every booking workflow', 'Bridge the client–vendor communication gap', 'Drive data-led decisions for venues'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckDot />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(29,38,56,0.06)' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="3" fill="#1D2638" />
                  <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="#1D2638" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold" style={{ color: '#1D2638' }}>Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              To establish Wadii as the go-to platform for event planning and management — trusted and used by people of all ages. Every event planned effortlessly, managed transparently, and executed with excellence.
            </p>
            <ul className="space-y-2.5">
              {['Become India\'s #1 banquet CRM', 'Expand to 5,000+ venues by 2027', 'Set the industry standard for transparency'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckDot />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button
            className="px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
            style={{ background: '#1D2638', boxShadow: '0 4px 16px rgba(29,38,56,0.2)' }}
          >
            Learn More About Us
          </button>
        </div>
      </div>

    </section>
  );
};