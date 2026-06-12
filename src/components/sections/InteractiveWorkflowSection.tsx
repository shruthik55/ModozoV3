"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import {
  FileSpreadsheet,
  MessageSquare,
  FolderSearch,
  CalendarClock,
  UsersRound,
  AlertTriangle,
  FileText,
  Check,
  Search,
  EyeOff,
  CloudLightning
} from "lucide-react";

interface Card {
  id: string;
  tag: string;
  title: string;
  desc: string;
  accent: string;
  badgeBg: string;
  glowColor: string;
  borderColor: string;
}

const cardsData: Card[] = [
  {
    id: "01",
    tag: "Scattered Communication",
    title: "Scattered Communication",
    desc: "Techpacks, measurement spec sheets, pattern designs, and assets scattered across localized spreadsheets, personal folders, and email threads.",
    accent: "#F59E0B",
    badgeBg: "rgba(245, 158, 11, 0.1)",
    glowColor: "rgba(245, 158, 11, 0.05)",
    borderColor: "rgba(245, 158, 11, 0.2)"
  },
  {
    id: "02",
    tag: "No Workflow Visibility",
    title: "No Workflow Visibility",
    desc: "Disjointed processes, status tracking errors, and workflow bottlenecks.",
    accent: "#EF4444",
    badgeBg: "rgba(239, 68, 68, 0.1)",
    glowColor: "rgba(239, 68, 68, 0.05)",
    borderColor: "rgba(239, 68, 68, 0.2)"
  },
  {
    id: "03",
    tag: "Long Time-to-Market",
    title: "Long Time-to-Market",
    desc: "Delays in sampling and production milestones pushing collection timelines.",
    accent: "#3B82F6",
    badgeBg: "rgba(59, 130, 246, 0.1)",
    glowColor: "rgba(59, 130, 246, 0.05)",
    borderColor: "rgba(59, 130, 246, 0.2)"
  },
  {
    id: "04",
    tag: "Delayed Approvals",
    title: "Delayed Approvals",
    desc: "Approval bottlenecks and delayed sample feedback loops.",
    accent: "#8B5CF6",
    badgeBg: "rgba(139, 92, 246, 0.1)",
    glowColor: "rgba(139, 92, 246, 0.05)",
    borderColor: "rgba(139, 92, 246, 0.2)"
  },
];

export default function InteractiveWorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const calculateRange = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth);
      }
    };

    // Run after components mount
    calculateRange();

    // Add event listener for resizing
    window.addEventListener("resize", calculateRange);
    return () => window.removeEventListener("resize", calculateRange);
  }, []);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const clearAllTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
      inactivityTimeoutRef.current = null;
    }
  };

  const startAutoplayChain = (startIndex: number) => {
    clearAllTimers();

    // Start a 4-second timeout for the current card
    inactivityTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const startScroll = element.offsetTop;
      const totalScrollHeight = element.offsetHeight - window.innerHeight;

      let nextCard = startIndex + 1;

      if (nextCard <= 3) {
        // Scroll to the next card
        const progressMap = [0.0, 0.28, 0.58, 0.88];
        const targetProgress = progressMap[nextCard];
        const targetY = startScroll + totalScrollHeight * targetProgress;

        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });

        // Start the interval for subsequent cards (every 4 seconds)
        timerRef.current = setInterval(() => {
          nextCard += 1;

          if (nextCard <= 3) {
            const progress = progressMap[nextCard];
            const targetY = startScroll + totalScrollHeight * progress;

            window.scrollTo({
              top: targetY,
              behavior: "smooth",
            });
          } else {
            // Scroll to the next section (PlatformShowcaseSection)
            const targetY = startScroll + element.offsetHeight;
            window.scrollTo({
              top: targetY,
              behavior: "smooth",
            });
            clearAllTimers();
          }
        }, 4000);
      } else {
        // Already at or past the last card, scroll to the next section
        const targetY = startScroll + element.offsetHeight;
        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
        clearAllTimers();
      }
    }, 4000);
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      clearAllTimers();

      const progress = scrollYProgress.get();
      const currentIdx = Math.min(3, Math.floor(progress * 4.1));

      // After 4 seconds of scroll inactivity, restart autoplay from the current card
      if (progress > 0.02 && progress < 0.95) {
        inactivityTimeoutRef.current = setTimeout(() => {
          startAutoplayChain(currentIdx);
        }, 4000);
      }
    };

    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleUserInteraction, { passive: true });
    window.addEventListener("mousedown", handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("mousedown", handleUserInteraction);
      clearAllTimers();
    };
  }, [scrollYProgress]);

  useEffect(() => {
    const progress = scrollYProgress.get();
    if (progress > 0.02 && progress < 0.95) {
      const currentIdx = Math.min(3, Math.floor(progress * 4.1));
      startAutoplayChain(currentIdx);
    }
  }, [scrollYProgress]);

  // Slide horizontally based on scroll progress
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Sync active card index with scroll position and handle programmatic triggers
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardIndex = Math.min(3, Math.floor(latest * 4.1)); // Multiply by 4.1 to buffer the end
    setActiveCard(cardIndex);

    // Trigger autoplay when entering sticky range via links (no user touch/mouse inputs)
    if (latest > 0.02 && latest < 0.95) {
      if (!timerRef.current && !inactivityTimeoutRef.current) {
        startAutoplayChain(cardIndex);
      }
    } else {
      // Clear timers if scrolled out of the sticky range
      clearAllTimers();
    }
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[480vh] bg-transparent"
      id="problems-horizontal"
    >
      {/* Pinned Sticky Wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-transparent">
        {/* Background Elements */}
        <div className="animated-grid opacity-25 pointer-events-none" />
        <div className="glow-orb w-[600px] h-[600px] bg-rich-blue/5 top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="glow-orb w-[500px] h-[500px] bg-teal-accent/5 top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Top Sticky Header */}
        <div className="absolute top-[6%] left-[8vw] lg:left-[10vw] z-20 space-y-2 pointer-events-none">
          {/* <span className="text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-[#ff7b7b] font-bold">The Sourcing Pain Points</span> */}
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-none">
            Multiple tools. Limited visibility. Slower collaboration.
          </h2>
        </div>

        {/* Horizontal Moving Track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-12 md:gap-20 items-center h-full pl-[10vw] pr-[10vw] lg:pl-[15vw] lg:pr-[15vw] pt-[28vh] pb-[10vh] overflow-visible select-none"
        >
          {cardsData.map((card, i) => {
            if (i === 0) {
              return (
                <div
                  key={card.id}
                  className="w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-3xl h-auto shrink-0 bg-gradient-to-br from-[#0c1a2e]/85 to-[#050d1a]/85 border border-white/10 group-hover:border-white/20 rounded-[2rem] px-6 pt-4 pb-6 md:px-8 md:pt-4 md:pb-6 shadow-[0_20px_50px_rgba(4,11,23,0.65)] flex flex-col justify-start gap-4 md:gap-6 overflow-hidden relative group transition-all duration-350"
                >
                  {/* Subtle background colored glow inside card */}
                  <div
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full filter blur-[80px] opacity-15 group-hover:opacity-25 pointer-events-none transition-opacity duration-500"
                    style={{ backgroundColor: card.accent }}
                  />

                  {/* Header: Title only */}
                  <div className="z-10 text-left">
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-[#bd9128] tracking-tight leading-tight">
                      Scattered Communication
                    </h3>
                  </div>

                  {/* Visual area with SaaS style border and shadow */}
                  <div className="z-10 w-full flex items-center justify-center overflow-hidden mb-3 md:mb-4">
                    <div className="w-full aspect-[1535/1024] rounded-[2rem] overflow-hidden border border-white/10 bg-[#040a15]/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                      <Image
                        src="/scattered-communication-2.png"
                        alt="Scattered Communication"
                        width={1535}
                        height={1024}
                        className="w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-[1.02]"
                        priority
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              );
            }

            if (i === 1) {
              return (
                <div
                  key={card.id}
                  className="w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-3xl h-auto shrink-0 bg-gradient-to-br from-[#0c1a2e]/85 to-[#050d1a]/85 border border-white/10 group-hover:border-white/20 rounded-[2rem] px-6 pt-4 pb-6 md:px-8 md:pt-4 md:pb-6 shadow-[0_20px_50px_rgba(4,11,23,0.65)] flex flex-col justify-start gap-4 md:gap-6 overflow-hidden relative group transition-all duration-350"
                >
                  {/* Subtle background colored glow inside card */}
                  <div
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full filter blur-[80px] opacity-15 group-hover:opacity-25 pointer-events-none transition-opacity duration-500"
                    style={{ backgroundColor: card.accent }}
                  />

                  {/* Header: Title only */}
                  <div className="z-10 text-left">
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-[#bd9128] tracking-tight leading-tight">
                      Delayed Approvals
                    </h3>
                  </div>

                  {/* Visual area with SaaS style border and shadow */}
                  <div className="z-10 w-full flex items-center justify-center overflow-hidden mb-3 md:mb-4">
                    <div className="w-full aspect-[1535/1024] rounded-[2rem] overflow-hidden border border-white/10 bg-[#040a15]/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                      <Image
                        src="/delayed-approval-2.png"
                        alt="Delayed Approvals"
                        width={1535}
                        height={1024}
                        className="w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-[1.02]"
                        priority
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              );
            }

            if (i === 2) {
              return (
                <div
                  key={card.id}
                  className="w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-3xl h-auto shrink-0 bg-gradient-to-br from-[#0c1a2e]/85 to-[#050d1a]/85 border border-white/10 group-hover:border-white/20 rounded-[2rem] px-6 pt-4 pb-6 md:px-8 md:pt-4 md:pb-6 shadow-[0_20px_50px_rgba(4,11,23,0.65)] flex flex-col justify-start gap-4 md:gap-6 overflow-hidden relative group transition-all duration-350"
                >
                  {/* Subtle background colored glow inside card */}
                  <div
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full filter blur-[80px] opacity-15 group-hover:opacity-25 pointer-events-none transition-opacity duration-500"
                    style={{ backgroundColor: card.accent }}
                  />

                  {/* Header: Title only */}
                  <div className="z-10 text-left">
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-[#bd9128] tracking-tight leading-tight">
                      Long Time-to-Market
                    </h3>
                  </div>

                  {/* Visual area with SaaS style border and shadow */}
                  <div className="z-10 w-full flex items-center justify-center overflow-hidden mb-3 md:mb-4">
                    <div className="w-full aspect-[1535/1024] rounded-[2rem] overflow-hidden border border-white/10 bg-[#040a15]/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                      <Image
                        src="/longtimetomarket-2.png"
                        alt="Long Time-to-Market"
                        width={1535}
                        height={1024}
                        className="w-full h-full object-contain rounded-[2rem] transition-transform duration-700 group-hover:scale-[1.02]"
                        priority
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              );
            }

            if (i === 3) {
              return (
                <div
                  key={card.id}
                  className="w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-3xl h-auto shrink-0 bg-gradient-to-br from-[#0c1a2e]/85 to-[#050d1a]/85 border border-white/10 group-hover:border-white/20 rounded-[2rem] px-6 pt-4 pb-6 md:px-8 md:pt-4 md:pb-6 shadow-[0_20px_50px_rgba(4,11,23,0.65)] flex flex-col justify-start gap-4 md:gap-6 overflow-hidden relative group transition-all duration-350"
                >
                  {/* Subtle background colored glow inside card */}
                  <div
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full filter blur-[80px] opacity-15 group-hover:opacity-25 pointer-events-none transition-opacity duration-500"
                    style={{ backgroundColor: card.accent }}
                  />

                  {/* Header: Title only */}
                  <div className="z-10 text-left">
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-[#bd9128] tracking-tight leading-tight">
                      Techpack Mismanagement
                    </h3>
                  </div>

                  {/* Visual area with SaaS style border and shadow */}
                  <div className="z-10 w-full flex items-center justify-center overflow-hidden mb-3 md:mb-4">
                    <div className="w-full aspect-[1535/1024] rounded-[2rem] overflow-hidden border border-white/10 bg-[#040a15]/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                      <Image
                        src="/techpack-mismanagement-2.png"
                        alt="Techpack Mismanagement"
                        width={1535}
                        height={1024}
                        className="w-full h-full object-contain rounded-[2rem] transition-transform duration-700 group-hover:scale-[1.02]"
                        priority
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </motion.div>

        {/* Bottom Navigation Progress Indicator */}
        <div className="absolute bottom-[4%] left-[6vw] lg:left-[8vw] z-20 flex items-center gap-6 pointer-events-none">
          <div className="flex gap-2">
            {cardsData.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${i === activeCard ? "w-10 bg-electric-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "w-2 bg-white/20"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// Visual Mockups for the Supply Chain Pain Points
// ---------------------------------------------------------

function ExcelMockup() {
  return (
    <div className="w-full h-full flex flex-col text-left font-mono text-[10px] md:text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <FileSpreadsheet size={14} className="text-amber-500" />
          <span className="text-white/60 font-semibold truncate">techpack_bom_v14_final.xlsx</span>
        </div>
        <span className="text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-sans font-bold flex items-center gap-1">
          <AlertTriangle size={8} /> Conflict
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1 text-slate-500 font-bold border-b border-white/5 pb-1 mb-1">
        <div>POM</div>
        <div>Specs</div>
        <div>Tolerance</div>
        <div>Status</div>
      </div>

      <div className="space-y-1.5 flex-1 overflow-hidden">
        <div className="grid grid-cols-4 gap-1 text-slate-300">
          <div className="truncate">Collar Width</div>
          <div>42 cm</div>
          <div>+/- 0.5</div>
          <div className="text-emerald-400">Approved</div>
        </div>
        <div className="grid grid-cols-4 gap-1 text-slate-300 bg-red-500/5 border border-red-500/20 p-0.5 rounded">
          <div className="truncate font-semibold text-red-300">Sleeve Length</div>
          <div className="text-red-300 line-through">60 cm</div>
          <div className="text-amber-300">62 cm ??</div>
          <div className="text-red-400 font-bold">Overwrite</div>
        </div>
        <div className="grid grid-cols-4 gap-1 text-slate-400">
          <div className="truncate">Cuff Opening</div>
          <div>14 cm</div>
          <div>+/- 0.3</div>
          <div className="text-slate-500">Pending</div>
        </div>
        <div className="grid grid-cols-4 gap-1 text-slate-400">
          <div className="truncate">Chest Width</div>
          <div>54 cm</div>
          <div>+/- 1.0</div>
          <div className="text-emerald-400">Approved</div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-white/5 text-[9px] text-amber-500 flex items-center gap-1">
        <AlertTriangle size={10} /> Conflict: Modified by Sai (Pattern Maker) 3 mins ago
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="w-full h-full flex flex-col justify-between text-left text-[10px] md:text-xs">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
        <MessageSquare size={14} className="text-red-400" />
        <span className="text-white/60 font-semibold">Vendor WhatsApp Chat (Group)</span>
      </div>

      <div className="space-y-2 flex-1 overflow-hidden">
        <div className="flex gap-2 items-start max-w-[85%]">
          <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-[8px]">D</div>
          <div className="bg-white/5 p-2 rounded-xl rounded-tl-none border border-white/5">
            <p className="text-slate-300 leading-tight">Should we proceed with the polyester blend or the 100% organic cotton?</p>
            <span className="text-[7px] text-slate-500 block mt-1">Designer • 10:14 AM</span>
          </div>
        </div>
        <div className="flex gap-2 items-start max-w-[85%] ml-auto flex-row-reverse">
          <div className="w-5 h-5 rounded-full bg-teal-accent/20 border border-teal-accent/40 text-teal-300 flex items-center justify-center font-bold text-[8px]">M</div>
          <div className="bg-electric-blue/15 p-2 rounded-xl rounded-tr-none border border-electric-blue/25 text-right">
            <p className="text-slate-200 leading-tight">Go with organic cotton, standard dye. Let's start production.</p>
            <span className="text-[7px] text-slate-400 block mt-1">Sourcing Mgr • 11:32 AM</span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-white/5 text-[8px] uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
        Traceability Error: Decision not logged in the platform
      </div>
    </div>
  );
}

function FolderMockup() {
  return (
    <div className="w-full h-full flex flex-col text-left text-[10px] md:text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <Search size={12} className="text-slate-400" />
          <span className="text-white/60 font-semibold font-mono">search: "jacket_spec"</span>
        </div>
        <span className="text-slate-500 text-[9px] font-mono">42 files found</span>
      </div>

      <div className="space-y-1.5 flex-1 overflow-hidden font-mono text-[9px] md:text-[10px]">
        <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2 text-slate-300">
            <FileText size={12} className="text-red-400" />
            <span className="truncate">jacket_spec_final_v3.pdf</span>
          </div>
          <span className="text-slate-500">Google Drive</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-red-500/5 border border-red-500/10">
          <div className="flex items-center gap-2 text-red-300">
            <FileText size={12} className="text-amber-500" />
            <span className="truncate">jacket_spec_revised_FINAL.pdf</span>
          </div>
          <span className="text-red-400/70 font-semibold">Local (Sai's Mac)</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2 text-slate-300">
            <FileText size={12} className="text-blue-400" />
            <span className="truncate">jacket_spec_factory_version.pdf</span>
          </div>
          <span className="text-slate-500">Email attachment</span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-white/5 text-[9px] text-[#3B82F6] flex items-center gap-1">
        <EyeOff size={10} className="shrink-0" /> Version Blindness: No centralized file control
      </div>
    </div>
  );
}

function TimelineMockup() {
  return (
    <div className="w-full h-full flex flex-col text-left text-[10px] md:text-xs">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
        <CalendarClock size={14} className="text-[#8B5CF6]" />
        <span className="text-white/60 font-semibold">Gantt Production Track</span>
      </div>

      <div className="space-y-2.5 flex-1 overflow-hidden mt-1 font-mono text-[9px] md:text-[10px]">
        {/* Row 1 */}
        <div className="space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Sourcing (Lab Dips)</span>
            <span className="text-emerald-400">Done</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[40%]" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-300">Fit Sampling</span>
            <span className="text-red-400 font-bold flex items-center gap-1">
              <AlertTriangle size={10} /> Delayed +14d
            </span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
            <div className="h-full bg-emerald-500 w-[40%]" />
            <div className="h-full bg-red-500 w-[25%] absolute left-[40%] animate-pulse" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Bulk Production</span>
            <span>Blocked</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-slate-700 w-0" />
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-white/5 text-[9px] text-[#8B5CF6] flex items-center gap-1 font-sans">
        <CloudLightning size={10} className="shrink-0" /> Risk: Sampling delay pushes factory slot by 3 weeks
      </div>
    </div>
  );
}

function NetworkMockup() {
  return (
    <div className="w-full h-full flex flex-col justify-between text-left text-[10px] md:text-xs">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
        <UsersRound size={14} className="text-cyan-400" />
        <span className="text-white/60 font-semibold">Stakeholder Alignment Graph</span>
      </div>

      {/* Simplified Node Connectors Visual */}
      <div className="flex-1 flex items-center justify-between px-6 relative">
        <div className="absolute inset-x-12 h-[1px] border-t border-dashed border-red-500/30 top-1/2 -translate-y-1/2" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-950/40 border border-red-500/30 px-1.5 py-0.5 rounded text-[8px] font-mono text-red-400 font-bold">
          Siloed
        </div>

        {/* Node 1 */}
        <div className="flex flex-col items-center gap-1 z-10">
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 font-bold font-mono text-[9px]">BR</div>
          <span className="text-[7px] text-slate-500 uppercase tracking-wider font-bold">Brand</span>
        </div>

        {/* Node 2 */}
        <div className="flex flex-col items-center gap-1 z-10">
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 font-bold font-mono text-[9px]">PA</div>
          <span className="text-[7px] text-slate-500 uppercase tracking-wider font-bold">Pattern</span>
        </div>

        {/* Node 3 */}
        <div className="flex flex-col items-center gap-1 z-10">
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 font-bold font-mono text-[9px]">FA</div>
          <span className="text-[7px] text-slate-500 uppercase tracking-wider font-bold">Factory</span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-white/5 text-[9px] text-[#06B6D4] flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
        Communication Gap: Average 48h latency for minor revisions
      </div>
    </div>
  );
}
