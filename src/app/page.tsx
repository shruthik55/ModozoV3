import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import InteractiveWorkflowSection from "@/components/sections/InteractiveWorkflowSection";
import PlatformShowcaseSection from "@/components/sections/PlatformShowcaseSection";
import WorkflowSplit from "@/components/sections/WorkflowSplit";
import VIPServiceSection from "@/components/sections/VIPServiceSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";

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

      {/* 4. Workflow Block A: Faster to Market (Dark) */}
      <WorkflowSplit
        id="workflow"
        tag="Rapid Fashion Deployment"
        theme="dark"
        // emoji="⚡"
        title="Accelerate your time to market"
        subtitle="Watch productivity soar. Modozo provides a centralized hub to track every garment from initial sketch to final shipment."
        bullets={[
          "Live Kanban boards to track collection progress",
          "Automated Time & Action (T&A) calendar management",
          "Proactive delay alerts and milestone tracking"
        ]}
        image="/photo54.png"
      />

      {/* 5. Workflow Block B: Improve Quality (Dark) */}
      <WorkflowSplit
        id="techpacks"
        reverse
        tag="AI-Powered Techpacks"
        theme="dark"
        // emoji="🪄"
        title="Turn sketches into specs instantly"
        subtitle="Stop wasting hours on manual data entry. Generate perfect, factory-ready technical packages in minutes to prevent manufacturing errors."
        bullets={[
          "AI extraction of POMs (Points of Measure) from sketches",
          "Centralized Bill of Materials (BOM) management",
          "Automated grading rules and measurement generation"
        ]}
        image="/photo33.png"
      />

      {/* 6. Workflow Block C: Better Visibility (Dark) */}
      <WorkflowSplit
        id="sourcing"
        tag="Global Supply Chain Visibility"
        theme="dark"
        // emoji="🔎"
        title="Lower costs and optimize sourcing"
        subtitle="Modozo gives you complete visibility into your vendor network, resource allocation, and material costing across all collections."
        bullets={[
          "Compare vendor quotes and track material costs",
          "Streamlined digital sample approvals and QC checks",
          "Scale seamlessly across global manufacturing partners"
        ]}
        image="/phtot34.png"
      />

      {/* 8. VIP Service Section (Dark) */}
      <VIPServiceSection />

      <Footer />
    </main>
  );
}
