import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

const BASE_URL = "https://www.wadii.in";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Wadii collects, uses, and protects your data when you use our banquet management software and website.",
  alternates: { canonical: `${BASE_URL}/privacy-policy` },
  openGraph: {
    title: "Privacy Policy | Wadii",
    description:
      "How Wadii handles your personal information, bookings data, and website usage.",
    url: `${BASE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="June 3, 2025">
      <section>
        <h2>1. Introduction</h2>
        <p>
          Wadii (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the Wadii banquet management platform and
          the website at{" "}
          <a href={BASE_URL} className="text-[#E62E2D] hover:underline">
            wadii.in
          </a>
          . This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
          our website, request a demo, contact us, or use our software services.
        </p>
        <p>
          By using our website or services, you agree to the collection and use of information in accordance with this
          policy.
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Contact information</strong> — name, email address, phone number, venue or company name, and any
            message you submit through our contact or demo forms.
          </li>
          <li>
            <strong>Account and business data</strong> — information related to your venue, bookings, leads, customers,
            billing, and team members when you use the Wadii platform as a customer.
          </li>
          <li>
            <strong>Usage data</strong> — pages visited, features used, device type, browser, IP address, and general
            analytics to improve our website and product.
          </li>
          <li>
            <strong>Cookies and similar technologies</strong> — we use cookies and analytics tools (such as Google Tag
            Manager) to understand how visitors use our site and to improve performance.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How we use your information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Provide, operate, and maintain the Wadii banquet management software</li>
          <li>Respond to enquiries, demo requests, and support messages</li>
          <li>Onboard venues and manage customer accounts</li>
          <li>Send service-related communications and product updates</li>
          <li>Improve our website, features, and user experience</li>
          <li>Comply with legal obligations and protect against fraud or misuse</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing of information</h2>
        <p>
          We do not sell your personal information. We may share information only in these cases:
        </p>
        <ul>
          <li>With trusted service providers who help us operate our website and platform (hosting, analytics, email)</li>
          <li>When required by law, regulation, or valid legal process</li>
          <li>To protect the rights, safety, and security of Wadii, our users, or others</li>
          <li>With your consent or at your direction</li>
        </ul>
      </section>

      <section>
        <h2>5. Data retention</h2>
        <p>
          We retain personal information only for as long as necessary to fulfil the purposes described in this policy,
          provide our services, resolve disputes, and comply with legal requirements. When data is no longer needed, we
          take reasonable steps to delete or anonymize it.
        </p>
      </section>

      <section>
        <h2>6. Data security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your information against unauthorized
          access, alteration, disclosure, or destruction. However, no method of transmission over the internet or
          electronic storage is 100% secure.
        </p>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>
          Depending on applicable law, you may have the right to access, correct, update, or delete your personal
          information, or to object to or restrict certain processing. To make a request, contact us using the details
          below.
        </p>
      </section>

      <section>
        <h2>8. Third-party links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices of
          those sites. We encourage you to review their privacy policies separately.
        </p>
      </section>

      <section>
        <h2>9. Children&apos;s privacy</h2>
        <p>
          Wadii is a business software product and is not directed at children under 18. We do not knowingly collect
          personal information from children.
        </p>
      </section>

      <section>
        <h2>10. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The updated version will be posted on this page with a
          revised &quot;Last updated&quot; date. Continued use of our website or services after changes constitutes
          acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2>11. Contact us</h2>
        <p>
          If you have questions about this Privacy Policy or how we handle your data, contact us at:
        </p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:managewisesolutions@gmail.com" className="text-[#E62E2D] hover:underline">
              managewisesolutions@gmail.com
            </a>
          </li>
          <li>Website: {BASE_URL}</li>
          <li>Location: India</li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}
