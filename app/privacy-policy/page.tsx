import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { OPERATOR_NAME, PRODUCT_NAME, SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    `How ${PRODUCT_NAME}, operated by ${OPERATOR_NAME}, collects, uses, and protects your data.`,
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  openGraph: {
    title: `Privacy Policy | ${PRODUCT_NAME}`,
    description:
      `${PRODUCT_NAME} is operated by ${OPERATOR_NAME}. Privacy policy for our banquet management platform and website.`,
    url: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="June 2026">
      <section>
        <h2>Introduction</h2>
        <p>
          <strong>
            {PRODUCT_NAME} is operated by {OPERATOR_NAME}.
          </strong>
        </p>
        <p>
          {OPERATOR_NAME} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy
          and security of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard
          information when you use the {PRODUCT_NAME} banquet management platform, CRM system, website, mobile
          applications, and related services.
        </p>
        <p>
          By accessing or using our services, you agree to the practices described in this Privacy Policy.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>

        <h3>Information You Provide</h3>
        <p>We may collect:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name</li>
          <li>Business address</li>
          <li>User account credentials</li>
          <li>Event and banquet booking information</li>
          <li>Customer relationship management (CRM) records</li>
          <li>Communications and support requests</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <p>We may automatically collect:</p>
        <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>Operating system</li>
          <li>Access times</li>
          <li>Pages visited</li>
          <li>Usage analytics and performance data</li>
        </ul>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Manage banquet bookings and event operations</li>
          <li>Manage customer relationships and CRM activities</li>
          <li>Improve platform performance and user experience</li>
          <li>Respond to support requests</li>
          <li>Send important notifications and service updates</li>
          <li>Detect fraud, abuse, and security threats</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>WhatsApp and Meta Platform Data</h2>
        <p>If you communicate with businesses through WhatsApp integrations powered by Wadii:</p>
        <ul>
          <li>Messages are processed solely to provide requested services.</li>
          <li>We do not sell WhatsApp message content.</li>
          <li>
            Information received through Meta platforms is used only for authorized business communications and
            operational purposes.
          </li>
          <li>Data handling complies with Meta Platform Terms and applicable privacy regulations.</li>
        </ul>
      </section>

      <section>
        <h2>Information Sharing</h2>
        <p>We do not sell personal information.</p>
        <p>We may share information with:</p>
        <ul>
          <li>Authorized employees and administrators</li>
          <li>Trusted service providers and hosting partners</li>
          <li>Payment processors when applicable</li>
          <li>Legal authorities when required by law</li>
          <li>Third-party integrations explicitly enabled by the customer</li>
        </ul>
        <p>
          All third parties are required to maintain appropriate confidentiality and security measures.
        </p>
      </section>

      <section>
        <h2>Data Retention</h2>
        <p>We retain information only as long as necessary to:</p>
        <ul>
          <li>Provide services</li>
          <li>Meet contractual obligations</li>
          <li>Comply with legal requirements</li>
          <li>Resolve disputes</li>
          <li>Enforce agreements</li>
        </ul>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>
          We implement reasonable technical, administrative, and organizational safeguards to protect information from
          unauthorized access, disclosure, alteration, or destruction.
        </p>
        <p>
          However, no internet transmission or electronic storage method is completely secure.
        </p>
      </section>

      <section>
        <h2>User Rights</h2>
        <p>Depending on applicable laws, users may have the right to:</p>
        <ul>
          <li>Access their information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of personal data</li>
          <li>Restrict processing</li>
          <li>Object to certain processing activities</li>
          <li>Request data portability</li>
        </ul>
        <p>Requests may be submitted using the contact information below.</p>
      </section>

      <section>
        <h2>Cookies and Analytics</h2>
        <p>
          We may use cookies, analytics tools, and similar technologies to improve website functionality, understand
          user behavior, and enhance service performance.
        </p>
        <p>Users may control cookies through browser settings.</p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>
          Our platform may contain links to third-party services. We are not responsible for the privacy practices of
          external websites or services.
        </p>
      </section>

      <section>
        <h2>Children&apos;s Privacy</h2>
        <p>
          Our services are intended for business and professional use and are not directed toward children under 13 years
          of age.
        </p>
        <p>We do not knowingly collect information from children.</p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Updated versions will be posted on this page with a revised
          effective date.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>For privacy-related questions or requests, contact:</p>
        <p>
          <strong>{OPERATOR_NAME}</strong>
        </p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:managewisessolution@gmail.com" className="text-[#E62E2D] hover:underline">
              managewisessolution@gmail.com
            </a>
          </li>
          <li>
            Email:{" "}
            <a href="mailto:wadii0306@gmail.com" className="text-[#E62E2D] hover:underline">
              wadii0306@gmail.com
            </a>
          </li>
          <li>
            Website:{" "}
            <a href={SITE_URL} className="text-[#E62E2D] hover:underline">
              {SITE_URL}
            </a>
          </li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}
