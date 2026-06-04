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
} from "lucide-react";
import CentralizedCollaborationVisual from "./CentralizedCollaborationVisual";
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
}

const features: FeatureCard[] = [
  {
    id: "techpack-builder",
    slug: "techpack-builder",
    title: "Techpack Builder",
    icon: Layers,
    image: "/feature_techpacks.png",
    boldText: "Turn sketches into factory-ready specs.",
    description:
      "Modozo's AI-powered Techpack Builder extracts Points of Measure, generates Bills of Materials, and creates grading rules — all from a single sketch upload.",
  },
  {
    id: "centralized-collaboration",
    slug: "centralized-collaboration",
    title: "Centralized Collaboration",
    icon: Users,
    image: "/centralized_collaboration.png",
    boldText: "Connect your entire fashion workflow in one place.",
    description:
      "Modozo brings your brand, designers, pattern makers, fit specialists, and vendor networks together on a single immersive platform to eliminate communication silos.",
  },
  {
    id: "production-tracking",
    slug: "production-tracking",
    title: "Real-time Production Tracking",
    icon: Activity,
    image: "/production_tracking.png",
    boldText: "Track production milestones from cutting to shipment.",
    description:
      "Get end-to-end visibility into your manufacturing lines. Automated factory floor updates, real-time scanning logs, and instant bottleneck alerts keep your delivery dates secure.",
  },
  {
    id: "sample-manager",
    slug: "sample-manager",
    title: "Sample Manager",
    icon: FlaskConical,
    image: "/feature_accelerate.png",
    boldText: "Streamline your sampling workflow.",
    description:
      "Digitize the entire sample lifecycle — from development and fit samples to pre-production and TOP approvals — with photo comparisons and inline comments.",
  },
  {
    id: "cost-analyzer",
    slug: "cost-analyzer",
    title: "Cost Analyzer",
    icon: BarChart3,
    image: "/feature_vendor_map.png",
    boldText: "Optimize sourcing and reduce costs.",
    description:
      "Compare vendor quotes side-by-side, track material costs across collections, and uncover savings opportunities with real-time cost breakdowns.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PlatformShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ---------- scroll-spy ------------------------------------------ */
  const handleScroll = useCallback(() => {
    const offset = window.innerHeight * 0.15;
    let currentIndex = 0;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      if (rect.top <= offset + 10) {
        currentIndex = i;
      }
    });

    setActiveIndex(currentIndex);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      const top = card.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  /* ---------- render ---------------------------------------------- */
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

        {/* ---- Grid: sidebar + cards --------------------------------- */}
        <div className="relative">
          <div className="grid gap-6 md:grid-cols-4">
            {/* ---- Sticky Sidebar Nav ---- */}
            <aside className="hidden overflow-visible md:sticky md:top-[15vh] md:flex md:h-screen md:flex-1 md:flex-col md:gap-4 md:self-start">
              <nav className="flex flex-col gap-3 overflow-visible">
                {features.map((feat, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <div key={feat.id} className="relative">
                      {/* Active dot + animated gradient line */}
                      {i === 0 && (
                        <div className="absolute -left-6 top-3 flex flex-col items-center gap-0">
                          {/* Blue dot on active */}
                          <div
                            className="size-1.5 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: isActive
                                ? "#3B82F6"
                                : "transparent",
                              boxShadow: isActive
                                ? "0 0 8px rgba(59,130,246,0.6)"
                                : "none",
                            }}
                          />

                          {/* Gradient line track */}
                          <div
                            className="w-px bg-white/[0.08] overflow-hidden relative"
                            style={{
                              height: `${(features.length - 1) * 36 + 8}px`,
                            }}
                          >
                            {/* Animated highlight */}
                            <motion.div
                              className="absolute left-0 w-px"
                              style={{
                                height: "48px",
                                background:
                                  "linear-gradient(to bottom, rgba(59,130,246,0), #3B82F6, rgba(59,130,246,0))",
                              }}
                              animate={{
                                top: `${activeIndex * 36}px`,
                              }}
                              transition={{
                                duration: 0.4,
                                ease: [0.25, 0.1, 0.25, 1],
                              }}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => scrollToCard(i)}
                        className={`block w-full text-left text-sm transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "text-white font-medium"
                            : "text-white/35 hover:text-white/60"
                        }`}
                      >
                        {feat.title}
                      </button>
                    </div>
                  );
                })}
              </nav>
            </aside>

            {/* ---- Cards Column ---- */}
            <div className="w-full md:col-span-3">
              <div>
                {features.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <a
                      key={feat.id}
                      ref={(el) => {
                        cardRefs.current[i] = el;
                      }}
                      id={feat.slug}
                      href={`#${feat.slug}`}
                      className="group mb-5 block rounded-xl px-4 py-6 last:mb-0 lg:p-12
                        border transition-all duration-300 cursor-default
                        border-white/[0.08] bg-white/[0.02]
                        hover:border-electric-blue/40 hover:bg-white/[0.04]"
                      style={{
                        scrollMarginTop: "10px",
                        position: "relative",
                        zIndex: features.length - i,
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      {/* Card Header: Icon + Title */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-center gap-3 md:gap-4"
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-electric-blue/20 to-teal-accent/10 border border-white/[0.08] flex items-center justify-center">
                          <Icon size={18} className="text-electric-blue" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                          {feat.title}
                        </h3>
                      </motion.div>

                      {/* Card Image / Video */}
                      {feat.id === "centralized-collaboration" ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="relative mt-6 w-full"
                        >
                          <CentralizedCollaborationVisual />
                        </motion.div>
                      ) : feat.id === "production-tracking" ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="relative mt-6 w-full"
                        >
                          <ProductionTrackingVisual />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="relative mt-6 flex aspect-[858/400] items-end overflow-hidden rounded-xl"
                        >
                          <Image
                            alt={feat.title}
                            loading="lazy"
                            width={1400}
                            height={700}
                            className="mx-auto h-full w-[90%] object-contain object-bottom md:w-full md:max-w-[620px]
                              transition-transform duration-700 group-hover:scale-[1.02]"
                            src={feat.image}
                          />
                          {/* Bottom gradient fade */}
                          <div className="absolute bottom-0 h-[120px] w-full bg-gradient-to-t from-[#050d1a] via-[#050d1a]/60 to-transparent pointer-events-none" />
                        </motion.div>
                      )}

                      {/* Card Footer: Description + Arrow */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex justify-between gap-3 border-t border-white/[0.06] pt-5 md:items-center md:pt-8"
                      >
                        <div className="text-sm md:text-base w-full md:max-w-[540px] text-white/60 leading-relaxed">
                          <strong className="text-white/90 font-semibold">
                            {feat.boldText}
                          </strong>{" "}
                          {feat.description}
                        </div>

                        {/* Arrow button */}
                        <div
                          className="hidden md:flex size-10 shrink-0 items-center justify-center rounded-full
                          border transition-all duration-300
                          border-white/10 bg-white/5 text-white/50
                          group-hover:bg-electric-blue group-hover:text-white group-hover:border-electric-blue
                          group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="19"
                            fill="none"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="m4.346 14.127 9-9M6.033 5.127h7.313v7.312"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
