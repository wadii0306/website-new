import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { OPERATOR_NAME, PRODUCT_NAME, SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${PRODUCT_NAME}, operated by ${OPERATOR_NAME}.`,
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  openGraph: {
    title: `Terms of Service | ${PRODUCT_NAME}`,
    description: `${PRODUCT_NAME} is operated by ${OPERATOR_NAME}.`,
    url: `${SITE_URL}/terms-of-service`,
  },
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="June 2026">
      <section>
        <h2>Agreement</h2>
        <p>
          {PRODUCT_NAME} is operated by <strong>{OPERATOR_NAME}</strong>. By accessing or using the {PRODUCT_NAME}{" "}
          website, banquet management platform, CRM, mobile applications, or related services, you agree to these Terms
          of Service.
        </p>
        <p>
          If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section>
        <h2>Services</h2>
        <p>
          {OPERATOR_NAME} provides {PRODUCT_NAME} as a software platform for banquet halls, wedding venues, hotels, and
          event businesses to manage bookings, leads, billing, customer relationships, and related operations.
        </p>
      </section>

      <section>
        <h2>Accounts and Use</h2>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate information when registering or submitting enquiries</li>
          <li>Keep account credentials secure and notify us of unauthorized access</li>
          <li>Use the platform only for lawful business purposes</li>
          <li>Not misuse, reverse engineer, or disrupt the service</li>
        </ul>
      </section>

      <section>
        <h2>Subscriptions and Payments</h2>
        <p>
          Paid plans, pricing, and billing terms are communicated during onboarding or in your service agreement.
          Fees are non-refundable except where required by applicable law or explicitly stated in writing.
        </p>
      </section>

      <section>
        <h2>Intellectual Property</h2>
        <p>
          {PRODUCT_NAME}, its branding, software, and content are owned by or licensed to {OPERATOR_NAME}. You may not
          copy, modify, or distribute our materials without prior written consent.
        </p>
      </section>

      <section>
        <h2>Third-Party Integrations</h2>
        <p>
          {PRODUCT_NAME} may integrate with third-party services including WhatsApp and Meta platforms. Use of those
          integrations is subject to the respective third-party terms in addition to these Terms.
        </p>
      </section>

      <section>
        <h2>Disclaimer</h2>
        <p>
          Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. {OPERATOR_NAME} does not
          guarantee uninterrupted or error-free operation.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, {OPERATOR_NAME} shall not be liable for indirect, incidental, or
          consequential damages arising from use of {PRODUCT_NAME}.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update these Terms from time to time. Continued use of the services after changes constitutes
          acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          {PRODUCT_NAME} is operated by <strong>{OPERATOR_NAME}</strong>. For questions about these Terms:
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
