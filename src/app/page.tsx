import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import InteractiveWorkflowSection from "@/components/sections/InteractiveWorkflowSection";
import PlatformShowcaseSection from "@/components/sections/PlatformShowcaseSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import HowModozoWorksSection from "@/components/sections/HowModozoWorksSection";
import BusinessImpactSection from "@/components/sections/BusinessImpactSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />

      {/* 1. Hero Section (Dark) */}
      <HeroSection />

      {/* 2. Interactive Workflow (Dark) - Inspired by plmbr.ai */}
      <InteractiveWorkflowSection />

      {/* 3. Platform Showcase (Dark) - Canopy-style sticky nav + cards */}
      <PlatformShowcaseSection />

      {/* 4. Before vs After MODOZO (Dark) */}
      <BeforeAfterSection />

      {/* 5. How Modozo Works (Dark) */}
      <HowModozoWorksSection />

      {/* 6. Business Impact */}
      <BusinessImpactSection />

      <Footer />
    </main>
  );
}
