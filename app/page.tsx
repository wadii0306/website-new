import HeroSection from "@/components/ui/hero-section-one";
import { SocialProof } from "@/components/social-proof/SocialProof";
import { ChallengesSection } from "@/components/challenges/ChallengesSection";
import { ComparisonSection } from "@/components/comparison/ComparisonSection";
import { HowItWorksSection } from "@/components/how-it-works/HowItWorksSection";
import { BenefitsSection } from "@/components/benefits/BenefitsSection";
import { FeatureMappingSection } from "@/components/feature-mapping/FeatureMappingSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { AboutSection } from "@/components/about/AboutSection";
import { WhoUsesSection } from "@/components/use-cases/WhoUsesSection";
import ContactPage from "@/components/contact/ContactPage";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      {/* ACT 1 — Hook: dark hero → social proof → who uses → pain */}
      <HeroSection />
      <SocialProof />
      <WhoUsesSection />
      <ChallengesSection />
      <FeatureMappingSection />
      <ComparisonSection />

      {/* ACT 2 — Product story: continuous light band (solution → features) */}
      <HowItWorksSection />
      <BenefitsSection />
      <FeaturesSection />

      {/* ACT 3 — Conversion: dark social proof + pricing */}
      <TestimonialsSection />
      <PricingSection />

      {/* ACT 4 — Trust & close: light about + FAQ → contact → footer */}
      <AboutSection />
      <FAQSection />
      <ContactPage />
      <Footer />
    </main>
  );
}
