"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Layers,
  Link2,
  BarChart3,
  FlaskConical,
  Eye,
  Users,
  Activity,
  Check,
} from "lucide-react";
import CentralizedCollaborationVisual from "./CentralizedCollaborationVisual";
import VendorManagementVisual from "./VendorManagementVisual";
import ProductionTrackingVisual from "./ProductionTrackingVisual";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface FeatureCard {
  id: string;
  slug: string;
  title: string;
  icon: React.ElementType;
  image: string;
  boldText: string;
  description: string;
  badge: string;
  badgeColor: string;
  checklist: string[];
}

const features: FeatureCard[] = [
  {
    id: "techpack-builder",
    slug: "techpack-builder",
    title: "Smart Techpack Management",
    icon: Layers,
    image: "/smarttechpackmanagement.png",
    boldText: "Version-controlled techpacks with comments and approval tracking.",
    description: "Grade specs, create POM tables, and update bill of materials dynamically with seamless versioning control.",
    badge: "TECHPACK DESIGN & COMPLIANCE",
    badgeColor: "text-teal-accent",
    checklist: [
      "Keep track of every iteration with complete history comparison",
      "Threaded comments directly on sketches and measurements",
      "Automated status updates and sign-off requests for factory partners"
    ],
  },
  {
    id: "centralized-collaboration",
    slug: "centralized-collaboration",
    title: "Centralized Collaboration",
    icon: Users,
    image: "/centralized_collaboration.png",
    boldText: "Connect your entire fashion workflow in one place.",
    description: "Modozo brings your brand, designers, pattern makers, fit specialists, and vendor networks together on a single immersive platform to eliminate communication silos.",
    badge: "COLLABORATION HUB",
    badgeColor: "text-electric-blue",
    checklist: [
      "Real-time chat and document sharing for all stakeholders",
      "Instant design updates and fit correction approvals",
      "Unified database for fabrics, trims, and styling guidelines"
    ],
  },
  {
    id: "production-tracking",
    slug: "production-tracking",
    title: "Real-time Production Tracking",
    icon: Activity,
    image: "/production_tracking.png",
    boldText: "Track production milestones from cutting to shipment.",
    description: "Get end-to-end visibility into your manufacturing lines. Automated factory floor updates, real-time scanning logs, and instant bottleneck alerts keep your delivery dates secure.",
    badge: "FACTORY PRODUCTION",
    badgeColor: "text-purple-400",
    checklist: [
      "Automated scan logs direct from assembly lines",
      "Visual milestone dashboard indicating line bottlenecks",
      "Live progress tracking for all purchase orders"
    ],
  },
  {
    id: "sample-manager",
    slug: "sample-manager",
    title: "Vendor Management",
    icon: FlaskConical,
    image: "/vendor_management_1.png",
    boldText: "Streamline your sampling workflow.",
    description: "Digitize the entire sample lifecycle — from development and fit samples to pre-production and TOP approvals — with photo comparisons and inline comments.",
    badge: "SOURCING & SAMPLING",
    badgeColor: "text-[#ff7b7b]",
    checklist: [
      "Digital sample approvals and step-by-step cycle tracking",
      "Side-by-side photo comparison tools for fit adjustments",
      "Vendor ratings and factory audit data integration"
    ],
  },
  {
    id: "cost-optimization",
    slug: "cost-optimization",
    title: "Cost Optimization",
    icon: BarChart3,
    image: "/feature_vendor_map.png",
    boldText: "Optimize sourcing and reduce costs.",
    description: "Compare vendor quotes side-by-side, track material costs across collections, and uncover savings opportunities with real-time cost breakdowns and logistics tracking.",
    badge: "COST OPTIMIZATION & LOGISTICS",
    badgeColor: "text-[#ff7b7b]",
    checklist: [
      "Compare vendor quotes and raw material costs in real-time",
      "Track global logistics, routes, and vessel statuses on a live map",
      "Uncover cost-saving opportunities with automated margin analysis"
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PlatformShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVersion, setActiveVersion] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play cycle for features tabs (pauses on interaction)
  useEffect(() => {
    if (!isAutoPlaying) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 8500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="platform-showcase"
      className="relative overflow-clip pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20 lg:pb-28"
    >
      {/* BG elements */}
      <div className="animated-grid opacity-15 pointer-events-none" />
      <div className="glow-orb w-[700px] h-[700px] bg-rich-blue/8 top-[20%] -left-[200px] pointer-events-none" />
      <div className="glow-orb w-[500px] h-[500px] bg-teal-accent/5 bottom-[10%] -right-[100px] pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        {/* ---- Header ------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col w-full text-left -ml-1 md:-ml-2"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-teal-accent font-bold mb-5">
            Modozo Platform
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.2rem] font-extrabold tracking-tight leading-[1.12] text-white">
            <span className="whitespace-nowrap">One platform for your entire fashion workflow.</span>
            <br />
            <span className="text-white/40">However complex.</span>
          </h2>
        </motion.div>

        {/* ---- Horizontal Tabs and Showcase ------------------------- */}
        <div className="space-y-10">
          {/* Tab Selector */}
          <div className="flex flex-nowrap md:flex-wrap items-center gap-2 md:gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-none justify-start border-b border-white/[0.06] w-full">
            {features.map((feat, i) => {
              const isActive = i === activeIndex;
              const Icon = feat.icon;
              return (
                <button
                  key={feat.id}
                  onClick={() => handleTabClick(i)}
                  className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  {/* Active tab background slider */}
                  {isActive && (
                    <motion.div
                      layoutId="activePlatformTab"
                      className="absolute inset-0 bg-gradient-to-br from-electric-blue/15 to-teal-accent/5 border border-electric-blue/30 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <Icon size={16} className={`relative z-10 ${isActive ? "text-electric-blue" : "text-white/40 group-hover:text-white/60"}`} />
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-white/50 hover:text-white/80"}`}>
                    {feat.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Grid */}
          <div className="w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Column: Feature Details */}
                <div className="lg:col-span-5 space-y-6 text-left">
                  {/* Badge */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue/20 to-teal-accent/10 border border-white/[0.08] flex items-center justify-center">
                      {(() => {
                        const Icon = features[activeIndex].icon;
                        return <Icon size={16} className="text-electric-blue" />;
                      })()}
                    </div>
                    <span className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold ${features[activeIndex].badgeColor}`}>
                      {features[activeIndex].badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#bd9128] tracking-tight leading-tight">
                    {features[activeIndex].title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {features[activeIndex].description}
                  </p>

                  {/* Checklist */}
                  <ul className="space-y-4 pt-2">
                    {features[activeIndex].checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <div className="mt-1 size-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                          <Check size={12} className="text-emerald-400" />
                        </div>
                        <span className="text-sm text-white/80 leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Visual Mockup */}
                <div className="lg:col-span-7 flex justify-center items-center w-full">
                  {features[activeIndex].id === "techpack-builder" ? (
                    <div className="w-full relative aspect-[1536/1024] overflow-hidden rounded-xl border border-white/10 bg-[#040a15]/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                      <Image
                        alt={features[activeIndex].title}
                        fill
                        className="object-cover rounded-lg"
                        src={features[activeIndex].image}
                        unoptimized
                        priority
                      />
                      <div className="absolute top-[28.8%] left-[29.4%] w-[36.1%] h-[28.2%] overflow-hidden rounded-lg">
                        <AnimatedApparelPreview onVersionChange={setActiveVersion} />
                      </div>

                      {/* Hide text line */}
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          top: "13.2%",
                          left: "20%",
                          width: "60%",
                          height: "4.5%",
                          backgroundColor: "#000517",
                        }}
                      />

                      {/* Card 1 Cover */}
                      <div
                        className="absolute rounded-xl bg-[#08101e]/65 border border-white/5 pointer-events-none transition-all duration-300"
                        style={{
                          top: "24.8%",
                          left: "72.3%",
                          width: "21.3%",
                          height: "17.6%",
                          opacity: activeVersion === 2 ? 1 : 0,
                        }}
                      />

                      {/* Card 1 Highlight */}
                      <div
                        className="absolute rounded-xl border border-electric-blue pointer-events-none transition-all duration-300"
                        style={{
                          top: "24.8%",
                          left: "72.3%",
                          width: "21.3%",
                          height: "17.6%",
                          boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)",
                          opacity: activeVersion === 1 ? 1 : 0,
                        }}
                      />

                      {/* Card 2 Highlight */}
                      <div
                        className="absolute rounded-xl border border-electric-blue pointer-events-none transition-all duration-300"
                        style={{
                          top: "43.0%",
                          left: "72.3%",
                          width: "21.3%",
                          height: "12.0%",
                          boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)",
                          opacity: activeVersion === 2 ? 1 : 0,
                        }}
                      />
                    </div>
                  ) : features[activeIndex].id === "centralized-collaboration" ? (
                    <div className="w-full">
                      <CentralizedCollaborationVisual />
                    </div>
                  ) : features[activeIndex].id === "production-tracking" ? (
                    <div className="w-full">
                      <ProductionTrackingVisual />
                    </div>
                  ) : features[activeIndex].id === "sample-manager" ? (
                    <div className="w-full">
                      <VendorManagementVisual />
                    </div>
                  ) : features[activeIndex].id === "cost-optimization" ? (
                    <div className="w-full relative flex aspect-[858/400] md:aspect-[858/480] justify-center overflow-hidden rounded-xl items-center border border-white/10 bg-[#040a15]/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                      <div className="relative w-full h-full">
                        <Image
                          alt="Cost Optimization Global Logistics"
                          fill
                          className="object-cover rounded-lg"
                          src="/feature_vendor_map.png"
                          unoptimized
                          priority
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedApparelPreview({ onVersionChange }: { onVersionChange: (version: number) => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Preload all showcase images to avoid transition lag
    apparelList.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % apparelList.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    onVersionChange(apparelList[index].version);
  }, [index, onVersionChange]);

  const current = apparelList[index];

  return (
    <div className="w-full h-full bg-[#08101e] relative flex items-center justify-center p-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={current.image}
            alt={current.name}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const apparelList = [
  {
    name: "Wavy Coat Sketch",
    image: "/showcase_sketch_coat.png",
    version: 1,
  },
  {
    name: "Wavy Coat Photo",
    image: "/showcase_photo_coat.png",
    version: 2,
  },
  {
    name: "Leopard Sneaker Sketch",
    image: "/showcase_sketch_sneaker.png",
    version: 1,
  },
  {
    name: "Leopard Sneaker Photo",
    image: "/showcase_photo_sneaker.png",
    version: 2,
  },
  {
    name: "Ornate Suit Sketch",
    image: "/showcase_sketch_suit.png",
    version: 1,
  },
  {
    name: "Ornate Suit Photo",
    image: "/showcase_photo_suit.png",
    version: 2,
  },
];

