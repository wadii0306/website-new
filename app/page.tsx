import { FeaturesHeader } from "@/components/features/FeaturesHeader";
import { PricingSection } from "@/components/pricing/PricingSection";
import { AboutSection } from "@/components/about/AboutSection";
import HeroSection from "@/components/ui/hero-section-one";

export default function Home() {
  return (
   <div>
    <HeroSection /> 
    <div id="features-section">
      <FeaturesHeader />
    </div>
    <PricingSection />
    <AboutSection />
   </div>
  );
}
