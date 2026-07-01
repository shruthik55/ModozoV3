"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  FileText,
  MessageSquare,
  ClipboardCheck,
  BarChart3,
  Check,
  CheckCircle2,
  UserPlus,
  Image as ImageIcon,
  LayoutDashboard,
} from "lucide-react";

/* ─── Stage definitions ─── */
const STAGES = [
  {
    id: 1, step: "01", shortTitle: "Tech Packs",
    title: "Create Line Sheets & Tech Packs",
    tagline: "Line Sheet → Tech Pack",
    phase: "Linesheet to Tech Pack",
    description: "Upload designs, specifications, BOMs, and references.",
    color: "#0F62FE",
    bullets: [
      "Line Sheets converted to factory-ready Tech Packs",
      "BOMs and POMs auto-linked per version",
      "Design details and references in one style record",
    ],
    icon: FileText,
  },
  {
    id: 2, step: "02", shortTitle: "Collaborate",
    title: "Collaborate with Teams & Vendors",
    tagline: "One Thread. All Stakeholders.",
    phase: "Team Collaboration",
    description: "Share updates, comments, approvals, and costing in one place.",
    color: "#F59E0B",
    bullets: [
      "In-context comments attached to style specs",
      "Vendor updates and approvals tracked per style",
      "No more email chains or version confusion",
    ],
    icon: MessageSquare,
  },
  {
    id: 3, step: "03", shortTitle: "Sampling",
    title: "Track Sampling & Production",
    tagline: "Sample Development to Final Dispatch",
    phase: "Sampling & Production",
    description: "Monitor TNA, approvals, production stages, and inspections.",
    color: "#EF4444",
    bullets: [
      "Five-stage production lifecycle per style",
      "Sample and production approvals with digital sign-off",
      "Inspection reports linked to style record",
    ],
    icon: ClipboardCheck,
  },
  {
    id: 4, step: "04", shortTitle: "Analytics",
    title: "Analyze Performance",
    tagline: "Style-Level Operational Insights",
    phase: "Analytics & Dispatch",
    description: "Use dashboards and analytics to improve visibility and planning.",
    color: "#10B981",
    bullets: [
      "Production progress and dispatch status per style",
      "Approval cycle time and lead time tracking",
      "Vendor performance scores by collection",
    ],
    icon: BarChart3,
  },
] as const;

/* ─── Slideshow images — garment journey in sequence ─── */
const SLIDESHOW_IMAGES = [
  { src: "/linesheet_4.png", label: "Line Sheet" },
  { src: "/pantone_4.png", label: "Pantone Specs" },
  { src: "/techpack_4.png", label: "Tech Pack" },
  { src: "/print_strike_4.png", label: "Print Strike-off" },
  { src: "/sketch_4.png", label: "Concept Sketch" },
];

/* ═══════════════════════════════════════════════════════
   CHAPTER NAV — thin horizontal step rail above content
═══════════════════════════════════════════════════════ */
function ChapterNav({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex w-full">
      {STAGES.map((s) => {
        const isActive = activeStep === s.id;
        const isDone = activeStep > s.id;
        const Icon = s.icon;
        return (
          <div key={s.id} className="flex-1 flex flex-col gap-1.5 pr-6 last:pr-0">
            <div className="flex items-center gap-2">
              {/* Icon bubble */}
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: isActive
                    ? `${s.color}20`
                    : isDone
                      ? "rgba(16,185,129,0.1)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isActive ? `${s.color}30` : isDone ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {isDone ? (
                  <Check size={10} className="text-emerald-400" />
                ) : (
                  <Icon size={10} style={{ color: isActive ? s.color : `${s.color}35` }} />
                )}
              </div>
              {/* Step number */}
              <span
                className="font-mono text-[10px] font-black"
                style={{ color: isActive ? s.color : isDone ? "#475569" : "#334155" }}
              >
                {s.step}
              </span>
              {/* Name */}
              <span
                className="text-[10px] font-bold truncate"
                style={{ color: isActive ? "rgba(255,255,255,0.9)" : isDone ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)" }}
              >
                {s.shortTitle}
              </span>
            </div>

            {/* Phase label — only visible when active */}
            <div style={{ height: 14 }}>
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.p
                    key={s.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="text-[8px] font-mono truncate"
                    style={{ color: `${s.color}70` }}
                  >
                    {s.phase}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Progress track */}
            <div className="h-[1.5px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="h-full origin-left"
                animate={{ scaleX: isActive ? 1 : isDone ? 1 : 0 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  backgroundColor: isDone ? "rgba(16,185,129,0.45)" : s.color,
                  transformOrigin: "left",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SLIDESHOW CANVAS
   Continuously loops through the 5 garment-journey images.
   Fade + slight scale transition, 1 s per slide.
═══════════════════════════════════════════════════════ */


function SlideshowCanvas({ activeStep }: { activeStep: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stage = STAGES[activeStep - 1];

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 2650);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDESHOW_IMAGES[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: "#ede8df" }}>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.label}
            fill
            className="object-contain"
            unoptimized={true}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Step indicator chip — top right ── */}
      <div
        className="absolute top-4 right-4 z-20 font-mono text-[8px] font-bold px-2 py-0.5 rounded backdrop-blur-md"
        style={{ background: "rgba(255,255,255,0.06)", color: "#334155", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        STEP 0{currentIndex + 1}
      </div>

      {/* Slide label — bottom left */}
      <motion.div
        key={`label-${currentIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="absolute bottom-4 left-4 z-20 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
        style={{ color: "rgba(0,0,0,0.32)" }}
      >
        {slide.label}
      </motion.div>

      {/* Progress dots — bottom right */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1">
        {SLIDESHOW_IMAGES.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === currentIndex ? 14 : 4,
              backgroundColor: i === currentIndex ? stage.color : "rgba(0,0,0,0.18)",
            }}
            transition={{ duration: 0.3 }}
            className="h-[4px] rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   COLLABORATION CANVAS — Step 2 Animation
═══════════════════════════════════════════════════════ */
const COLLAB_STAKEHOLDERS = [
  {
    role: "Designer",
    avatar: "/avatars/design.png",
    msg: "Tech Pack ready for review.",
    icon: <FileText size={12} className="text-[#0F62FE]" />,
  },
  {
    role: "Brand Manager",
    avatar: "/avatars/brand.png",
    msg: "Approved. Please proceed with sourcing.",
    icon: <CheckCircle2 size={12} className="text-[#10B981]" />,
  },
  {
    role: "Sourcing Manager",
    avatar: "/avatars/sourcing.png",
    msg: "Vendor assigned. Sample request sent.",
    icon: <UserPlus size={12} className="text-[#F59E0B]" />,
  },
  {
    role: "Vendor",
    avatar: "/avatars/vendor.png",
    msg: "Sample uploaded.",
    icon: <ImageIcon size={12} className="text-[#8B5CF6]" />,
    progress: true,
  },
  {
    role: "Tech Team",
    avatar: "/avatars/qa.png",
    msg: "QA Approved.",
    icon: <LayoutDashboard size={12} className="text-[#10B981]" />,
  }
];

function CollaborationCanvas() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [workflowDone, setWorkflowDone] = useState(false);

  useEffect(() => {
    if (workflowDone) {
      const t = setTimeout(() => {
        setWorkflowDone(false);
        setActiveIdx(0);
        setIsTyping(true);
      }, 1000);
      return () => clearTimeout(t);
    }

    if (isTyping) {
      const t = setTimeout(() => setIsTyping(false), 600);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        if (activeIdx === COLLAB_STAKEHOLDERS.length - 1) {
          setWorkflowDone(true);
        } else {
          setActiveIdx(s => s + 1);
          setIsTyping(true);
        }
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [activeIdx, isTyping, workflowDone]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl flex flex-col justify-center px-6 py-6" style={{ background: "#0a1120", border: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Workflow glowing background effect when done */}
      <AnimatePresence>
        {workflowDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.15), transparent 70%)"
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col gap-3">
        {COLLAB_STAKEHOLDERS.map((s, i) => {
          const isActive = activeIdx === i && !workflowDone;
          const isDone = activeIdx > i || workflowDone;
          const isCurrentTyping = isActive && isTyping;
          const isCurrentMsg = isActive && !isTyping;

          return (
            <div key={s.role} className="relative">
              {/* Connection Line */}
              {i < COLLAB_STAKEHOLDERS.length - 1 && (
                <div className="absolute left-5 top-10 bottom-[-12px] w-[2px] z-0" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div
                    className="w-full origin-top"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isDone ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ height: "100%", background: "#10B981" }}
                  />
                </div>
              )}

              <motion.div
                animate={{
                  opacity: isActive || isDone ? 1 : 0.4,
                  scale: isActive ? 1.02 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex items-start gap-3 p-2.5 rounded-xl backdrop-blur-md"
                style={{
                  background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                  border: isActive ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.04)",
                  boxShadow: isActive ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
                }}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img src={s.avatar} alt={s.role} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  {/* Status Indicator */}
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0a1120]"
                    style={{ background: isActive || isDone ? "#10B981" : "#475569" }}
                  />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="text-[11px] font-bold text-white tracking-wide">{s.role}</h4>
                    {(isActive || isDone) && (
                      <span className="text-[8px] text-emerald-400 font-mono tracking-wider uppercase">Online</span>
                    )}
                  </div>

                  <div className="h-[16px] flex items-center">
                    <AnimatePresence mode="wait">
                      {isCurrentTyping ? (
                        <motion.div
                          key="typing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex gap-1 items-center"
                        >
                          <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1 h-1 bg-slate-400 rounded-full" />
                          <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-slate-400 rounded-full" />
                          <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-slate-400 rounded-full" />
                        </motion.div>
                      ) : (isCurrentMsg || isDone) ? (
                        <motion.div
                          key="msg"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1.5"
                        >
                          <span className="text-[10px] text-slate-300 leading-tight">{s.msg}</span>
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                            {s.icon}
                          </motion.div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  {/* Progress Bar for Vendor */}
                  {s.progress && (
                    <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      {(isCurrentMsg || isDone) && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: isDone ? 0 : 0.8 }}
                          className="h-full bg-emerald-400"
                        />
                      )}
                    </div>
                  )}

                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEP DETAIL PANEL — right side, unique per step
═══════════════════════════════════════════════════════ */
function ProductionJourneyPanel({ stage }: { stage: any }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [progressVal, setProgressVal] = useState(0);

  const STAGES_LIST = [
    "Sample Development",
    "Sample Approval",
    "Production Started",
    "Inspection",
    "Final Dispatch"
  ];

  const NOTIFS = [
    "Fabric Cut",
    "✓ Sample Approved",
    "Production Started",
    "Inspection Scheduled",
    "Dispatch Ready"
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx = (currentIdx + 1) % STAGES_LIST.length;
      setActiveIdx(currentIdx);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const targetProgress = Math.round((activeIdx / (STAGES_LIST.length - 1)) * 100);
    const prevTarget = activeIdx === 0 ? 0 : Math.round(((activeIdx - 1) / (STAGES_LIST.length - 1)) * 100);
    const diff = targetProgress - prevTarget;

    if (diff === 0) {
      setProgressVal(targetProgress);
    } else {
      const steps = 20;
      const stepTime = 1000 / steps;
      let currentStep = 0;

      const t = setInterval(() => {
        currentStep++;
        setProgressVal(Math.round(prevTarget + (diff * (currentStep / steps))));
        if (currentStep >= steps) {
          clearInterval(t);
          setProgressVal(targetProgress);
        }
      }, stepTime);
      return () => clearInterval(t);
    }
  }, [activeIdx]);

  useEffect(() => {
    setNotification(NOTIFS[activeIdx]);
    const nt = setTimeout(() => setNotification(null), 2500);
    return () => clearTimeout(nt);
  }, [activeIdx]);

  return (
    <div className="rounded-xl border bg-white/[0.03] p-3.5 h-full flex flex-col relative overflow-hidden" style={{ borderColor: `${stage.color}18` }}>

      {/* Jacket Hero Area */}
      <div className="relative z-10 w-full flex justify-center mb-3 h-[20%] shrink-0">
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="h-full relative"
          style={{ aspectRatio: "1/1", transformStyle: "preserve-3d" }}
        >
          <img
            src="/blue_jacket.png"
            alt="Hero Garment"
            className="h-full w-full object-contain"
            style={{
              filter: activeIdx === 0 ? "grayscale(80%) drop-shadow(0 0 4px rgba(255,255,255,0.2))" :
                activeIdx === 4 ? "drop-shadow(0 0 12px rgba(16,185,129,0.5))" :
                  "drop-shadow(0 8px 12px rgba(0,0,0,0.5))"
            }}
          />
          {/* Inspection scanning line */}
          {activeIdx === 3 && (
            <motion.div
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_8px_#10B981] z-20"
            />
          )}
          {/* Shipping tag */}
          <AnimatePresence>
            {activeIdx === 4 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-2 right-2 w-3 h-5 bg-amber-100 rounded-sm shadow-md border border-amber-300 z-20 origin-top flex items-center justify-center"
              >
                <div className="w-1 h-1 rounded-full bg-amber-600/50 absolute top-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white border border-white/20 whitespace-nowrap z-30 shadow-xl"
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between pb-2 mb-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <span className="font-mono text-[9px] font-bold text-white">TNA Milestones</span>
        <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded" style={{ color: stage.color, backgroundColor: `${stage.color}15`, border: `1px solid ${stage.color}25` }}>
          {progressVal}% Complete
        </span>
      </div>

      {/* Vertical Timeline */}
      <div className="relative flex-1 min-h-0 flex flex-col justify-around pl-1 pb-1">
        {/* Glowing connected line track */}
        <div className="absolute left-[13px] top-4 bottom-4 w-[2px] bg-white/5 z-0 overflow-hidden rounded-full">
          <motion.div
            className="w-full shadow-[0_0_8px_#10B981]"
            initial={{ height: "0%", top: "0%" }}
            animate={{ height: "20%", top: `${(activeIdx / 4) * 80}%` }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: "absolute", backgroundColor: stage.color }}
          />
        </div>

        {STAGES_LIST.map((s, i) => {
          const isDone = i < activeIdx;
          const isCur = i === activeIdx;

          return (
            <div key={s} className="relative z-10 flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: isDone ? "#10B981" : isCur ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.04)",
                  borderColor: isDone ? "#10B981" : isCur ? "#EF4444" : "rgba(255,255,255,0.1)",
                  boxShadow: isCur ? "0 0 10px rgba(239,68,68,0.3)" : "none",
                  zIndex: 20
                }}
              >
                {isDone && <Check size={10} className="text-white" />}
                {isCur && <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-red-500" />}
              </div>
              <span
                className="flex-1 text-[11px]"
                style={{
                  color: isDone ? "rgba(255,255,255,0.6)" : isCur ? "white" : "rgba(100,116,139,0.5)",
                  fontWeight: isCur ? 700 : 400
                }}
              >
                {s}
              </span>
              {isCur && (
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-mono text-[7px] font-bold px-1.5 py-0.5 rounded uppercase text-red-400 bg-red-400/10 border border-red-400/20"
                >
                  ACTIVE
                </motion.span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   JACKET SVG — vector illustration with 3-D shading
   Built from layered paths + gradients; no photograph.
═══════════════════════════════════════════════════════ */
function JacketSVG({ activeIdx }: { activeIdx: number }) {
  const isEarly = activeIdx === 0;
  const isDispatching = activeIdx === 4;

  /* Stage-sensitive colour palette */
  const c = {
    litFace:   isEarly ? "#243a7c" : "#1e48bc",
    litMid:    isEarly ? "#182e62" : "#153498",
    shadowFace:isEarly ? "#0e1f4a" : "#0f2470",
    shadowDeep:isEarly ? "#07102a" : "#080f44",
    lapelLit:  isEarly ? "#2c4490" : "#2c5cd8",
    lapelShad: isEarly ? "#0f1e50" : "#102472",
    collar:    isEarly ? "#233886" : "#2050c8",
    sleeveLit: isEarly ? "#1c3268" : "#1a42a8",
    sleeveShad:isEarly ? "#0a1840" : "#0a1c5c",
  };

  return (
    <svg
      viewBox="0 0 200 252"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
    >
      <defs>
        {/* Left body — lit from top-left */}
        <linearGradient id="jlp" x1="5%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%"   stopColor={c.litFace} />
          <stop offset="55%"  stopColor={c.litMid} />
          <stop offset="100%" stopColor={c.shadowFace} />
        </linearGradient>
        {/* Right body — shadow side */}
        <linearGradient id="jrp" x1="95%" y1="0%" x2="5%" y2="100%">
          <stop offset="0%"   stopColor={c.shadowFace} />
          <stop offset="100%" stopColor={c.shadowDeep} />
        </linearGradient>
        {/* Left sleeve */}
        <linearGradient id="jls" x1="0%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%"   stopColor={c.sleeveLit} />
          <stop offset="100%" stopColor={c.shadowFace} />
        </linearGradient>
        {/* Right sleeve */}
        <linearGradient id="jrs" x1="100%" y1="0%" x2="10%" y2="100%">
          <stop offset="0%"   stopColor={c.shadowFace} />
          <stop offset="100%" stopColor={c.sleeveShad} />
        </linearGradient>
        {/* Left lapel (brightest — faces viewer + light) */}
        <linearGradient id="jll" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={c.lapelLit} />
          <stop offset="100%" stopColor={c.litMid} />
        </linearGradient>
        {/* Right lapel */}
        <linearGradient id="jrl" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={c.lapelShad} />
          <stop offset="100%" stopColor={c.shadowDeep} />
        </linearGradient>
        {/* Collar */}
        <linearGradient id="jco" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={c.collar} />
          <stop offset="100%" stopColor={c.litMid} />
        </linearGradient>
        {/* Fabric sheen — vertical fade overlay on lit panel */}
        <linearGradient id="jsh" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.13)" />
          <stop offset="42%"  stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Drop shadow filter */}
        <filter id="jsf" x="-25%" y="-15%" width="150%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="rgba(0,0,0,0.80)" />
        </filter>

        {/* Dispatch green glow */}
        {isDispatching && (
          <filter id="jglow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
      </defs>

      {/* ── LAYER 1: shadow group ── */}
      <g filter="url(#jsf)">

        {/* LEFT SLEEVE */}
        <path
          d="M73,66 L27,76 L7,156 L23,168 L39,162 L55,104 L73,82 Z"
          fill="url(#jls)"
          stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"
        />
        {/* left cuff band */}
        <path d="M7,156 L23,168 L39,162" fill="none"
          stroke="rgba(255,255,255,0.18)" strokeWidth="1.6" />
        {/* left sleeve highlight seam */}
        <path d="M27,76 L55,104" fill="none"
          stroke="rgba(255,255,255,0.09)" strokeWidth="0.7" />

        {/* RIGHT SLEEVE */}
        <path
          d="M127,66 L173,76 L193,156 L177,168 L161,162 L145,104 L127,82 Z"
          fill="url(#jrs)"
          stroke="rgba(0,0,0,0.28)" strokeWidth="0.5"
        />
        {/* right cuff band */}
        <path d="M193,156 L177,168 L161,162" fill="none"
          stroke="rgba(255,255,255,0.08)" strokeWidth="1.6" />

        {/* LEFT BODY PANEL */}
        <path
          d="M100,66 L73,66 L55,104 L46,240 L100,240 Z"
          fill="url(#jlp)"
          stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"
        />

        {/* RIGHT BODY PANEL */}
        <path
          d="M100,66 L127,66 L145,104 L154,240 L100,240 Z"
          fill="url(#jrp)"
          stroke="rgba(0,0,0,0.28)" strokeWidth="0.5"
        />

        {/* LEFT LAPEL */}
        <path
          d="M73,66 L82,56 L98,48 L100,64 L100,66 Z"
          fill="url(#jll)"
          stroke="rgba(255,255,255,0.11)" strokeWidth="0.5"
        />

        {/* RIGHT LAPEL */}
        <path
          d="M127,66 L118,56 L102,48 L100,64 L100,66 Z"
          fill="url(#jrl)"
          stroke="rgba(0,0,0,0.22)" strokeWidth="0.5"
        />

        {/* COLLAR */}
        <path
          d="M82,56 L100,46 L118,56 L100,66 Z"
          fill="url(#jco)"
          stroke="rgba(255,255,255,0.14)" strokeWidth="0.6"
        />
      </g>

      {/* ── LAYER 2: surface details ── */}

      {/* Gorge notch lines (where collar meets lapel) */}
      <line x1="82" y1="56" x2="73" y2="66"
        stroke="rgba(255,255,255,0.20)" strokeWidth="0.8" />
      <line x1="118" y1="56" x2="127" y2="66"
        stroke="rgba(0,0,0,0.45)" strokeWidth="0.8" />

      {/* Shoulder seams */}
      <path d="M27,76 L73,66" fill="none"
        stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
      <path d="M173,76 L127,66" fill="none"
        stroke="rgba(0,0,0,0.38)" strokeWidth="0.7" />

      {/* Centre-front crease / shadow */}
      <line x1="100" y1="66" x2="100" y2="240"
        stroke="rgba(0,0,0,0.42)" strokeWidth="1.2" />

      {/* Left side-seam highlight */}
      <path d="M55,104 L46,240" fill="none"
        stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />

      {/* Chest welt pocket */}
      <rect x="60" y="116" width="21" height="12" rx="2"
        fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="0.9" />
      <line x1="60" y1="120" x2="81" y2="120"
        stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" />

      {/* Buttons */}
      {[142, 166, 190, 214].map((y) => (
        <g key={y}>
          <circle cx="100" cy={y} r="3.5"
            fill={c.litMid} stroke="rgba(255,255,255,0.26)" strokeWidth="0.9" />
          <circle cx="100" cy={y} r="1.2"
            fill="rgba(255,255,255,0.10)" />
        </g>
      ))}

      {/* Right hip welt pocket */}
      <rect x="122" y="178" width="26" height="6" rx="2"
        fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="0.7" />

      {/* Fabric sheen overlay on lit panel */}
      <path
        d="M73,66 L55,104 L46,240 L100,240 L100,66 Z"
        fill="url(#jsh)"
      />

      {/* ── STAGE EFFECTS ── */}

      {/* Dispatch glow tint */}
      {isDispatching && (
        <path
          d="M73,66 L55,104 L46,240 L100,240 L100,66 Z"
          fill="rgba(16,185,129,0.07)"
        />
      )}

      {/* Shipping tag */}
      {isDispatching && (
        <g>
          <rect x="120" y="48" width="14" height="20" rx="2"
            fill="#fef3c7" stroke="#fbbf24" strokeWidth="0.9" />
          <circle cx="127" cy="52" r="2" fill="rgba(146,64,14,0.45)" />
          <line x1="127" y1="50" x2="127" y2="46"
            stroke="#92400e" strokeWidth="0.9" opacity="0.7" />
          <line x1="122" y1="59" x2="134" y2="59"
            stroke="#92400e" strokeWidth="0.5" opacity="0.4" />
          <line x1="122" y1="63" x2="132" y2="63"
            stroke="#92400e" strokeWidth="0.5" opacity="0.3" />
        </g>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   GARMENT STAGE CANVAS — Step 3 Left-Panel Animation
   Concept: the jacket itself transforms at each production
   stage — grayscale sample → colour approval → batch
   production → QC scan → dispatch. No lists, no grids.
   The garment IS the story.
═══════════════════════════════════════════════════════ */
const GARMENT_STAGES = [
  {
    id: 0,
    label: "Sample Created",
    sub:   "Vendor stitched the first sample",
    badge: "SAMPLE #1",
    accent:"#94a3b8",
  },
  {
    id: 1,
    label: "Sample Approved",
    sub:   "Buyer reviewed & signed off",
    badge: "APPROVED",
    accent:"#10B981",
  },
  {
    id: 2,
    label: "Production Started",
    sub:   "500 units now on the factory floor",
    badge: "IN PRODUCTION",
    accent:"#EF4444",
  },
  {
    id: 3,
    label: "Quality Check",
    sub:   "Inspector scanning the full batch",
    badge: "QC ACTIVE",
    accent:"#3B82F6",
  },
  {
    id: 4,
    label: "Ready to Ship",
    sub:   "Packed & cleared for dispatch",
    badge: "DISPATCHED",
    accent:"#F59E0B",
  },
] as const;

function TNATrackerCanvas({ stage: _stage }: { stage: any }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % GARMENT_STAGES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const cur = GARMENT_STAGES[idx];

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl flex flex-col"
      style={{ background: "transparent" }}
    >
      {/* Ambient glow — shifts with stage accent colour */}
      <AnimatePresence>
        <motion.div
          key={cur.accent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 70%, ${cur.accent}18, transparent)`,
          }}
        />
      </AnimatePresence>

      {/* ── Top strip: style meta ── */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
        <div>
          <p className="font-mono text-[8px] text-slate-600 uppercase tracking-widest">
            MDZ-SS26-001
          </p>
          <p className="text-[13px] font-black text-white leading-tight">Signature Jacket</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Vertex Apparel</p>
        </div>

        {/* Stage badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.badge}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[8px] font-black uppercase px-2.5 py-1.5 rounded-lg text-right"
            style={{
              color: cur.accent,
              background: `${cur.accent}18`,
              border: `1px solid ${cur.accent}40`,
            }}
          >
            {cur.badge}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Garment hero — fills the middle ── */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center px-2">
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Jacket photo — stage-sensitive filter, overlays positioned on top */}
          <motion.div
            key={idx}
            initial={{ opacity: 0.4, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex items-center justify-center w-full h-full"
          >
            <motion.img
              src="/jacket-nobg.png"
              alt="Signature Jacket"
              animate={{
                filter:
                  idx === 0
                    ? "grayscale(75%) brightness(0.65)"
                    : "grayscale(0%) brightness(1)",
              }}
              transition={{ duration: 0.6 }}
              className="select-none pointer-events-none"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />

            {/* ── Stage-specific overlays ── */}

            {/* Stage 0 — SAMPLE: paper tag hanging off collar */}
            {idx === 0 && (
              <motion.div
                initial={{ opacity: 0, rotate: -20, y: -10 }}
                animate={{ opacity: 1, rotate: 10, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="absolute -top-1 right-[18%] z-30"
              >
                <div
                  className="px-2 py-1 rounded-sm text-[8px] font-black text-amber-900 shadow-lg leading-tight"
                  style={{
                    background: "#fef3c7",
                    border: "1px solid #fbbf24",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                  }}
                >
                  SAMPLE<br />#01
                </div>
                {/* tag string */}
                <div className="w-px h-3 bg-amber-400/60 mx-auto" />
              </motion.div>
            )}

            {/* Stage 1 — APPROVED: rubber stamp presses in */}
            {idx === 1 && (
              <motion.div
                initial={{ scale: 2.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: -15 }}
                transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
                className="absolute top-[10%] right-[8%] z-30 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  border: "3px solid #10B981",
                  background: "rgba(16,185,129,0.12)",
                  boxShadow: "0 0 20px rgba(16,185,129,0.35)",
                }}
              >
                <div className="text-center">
                  <Check size={18} className="text-emerald-400 mx-auto" strokeWidth={3} />
                  <p className="font-mono text-[6px] font-black text-emerald-400 uppercase mt-0.5">
                    Approved
                  </p>
                </div>
              </motion.div>
            )}

            {/* Stage 2 — PRODUCTION: ghost jacket silhouettes (simplified, no SVG ID conflict) */}
            {idx === 2 && (
              <>
                {[-36, 36].map((tx, gi) => (
                  <motion.div
                    key={gi}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.14 }}
                    transition={{ delay: gi * 0.18, duration: 0.5 }}
                    className="absolute inset-0 pointer-events-none rounded-sm"
                    style={{
                      transform: `translateX(${tx}px) scale(0.86)`,
                      background: "rgba(30,72,188,0.35)",
                      clipPath:
                        "polygon(30% 0%, 70% 0%, 100% 15%, 90% 100%, 10% 100%, 0% 15%)",
                    }}
                  />
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-[4%] left-1/2 -translate-x-1/2 font-mono text-[12px] font-black z-30 whitespace-nowrap"
                  style={{ color: "#EF4444", textShadow: "0 0 12px rgba(239,68,68,0.6)" }}
                >
                  × 500 units
                </motion.div>
              </>
            )}

            {/* Stage 3 — QC SCAN: blue laser sweeps the garment */}
            {idx === 3 && (
              <>
                <motion.div
                  initial={{ top: "8%" }}
                  animate={{ top: "88%" }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  className="absolute left-[5%] right-[5%] h-[3px] z-30 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #3B82F6, transparent)",
                    boxShadow: "0 0 14px 2px rgba(59,130,246,0.7)",
                  }}
                />
                {/* QC tick marks appearing on the jacket body */}
                {[
                  { top: "28%", left: "38%" },
                  { top: "28%", left: "56%" },
                  { top: "52%", left: "47%" },
                ].map((pos, qi) => (
                  <motion.div
                    key={qi}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: qi * 0.6 + 0.4, type: "spring", stiffness: 400 }}
                    className="absolute z-30 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      background: "rgba(59,130,246,0.25)",
                      border: "1.5px solid #3B82F6",
                    }}
                  >
                    <Check size={7} className="text-blue-400" strokeWidth={3} />
                  </motion.div>
                ))}
              </>
            )}

            {/* Stage 4 — DISPATCHED: amber shipping tag */}
            {idx === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                className="absolute bottom-[4%] left-1/2 -translate-x-1/2 z-30"
              >
                <div
                  className="px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-wider whitespace-nowrap"
                  style={{
                    background: "#F59E0B",
                    color: "#78350f",
                    boxShadow: "0 0 18px rgba(245,158,11,0.55)",
                  }}
                >
                  Shipped ✦
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Stage name + subtitle ── */}
      <div className="relative z-10 px-5 pt-2 pb-2 shrink-0 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3
              className="text-[19px] font-black leading-tight"
              style={{ color: cur.accent }}
            >
              {cur.label}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">{cur.sub}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress dots ── */}
      <div className="relative z-10 flex items-center justify-center gap-2 pb-4 shrink-0">
        {GARMENT_STAGES.map((s, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === idx ? 22 : 6,
              backgroundColor:
                i < idx
                  ? "#10B981"
                  : i === idx
                  ? cur.accent
                  : "rgba(255,255,255,0.12)",
            }}
            transition={{ duration: 0.35 }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PRODUCTION JOURNEY CANVAS — Step 3 Animation
═══════════════════════════════════════════════════════ */
function ProductionJourneyCanvas({ stage }: { stage: any }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [progressVal, setProgressVal] = useState(0);

  const STAGES_LIST = [
    "Sample Development",
    "Sample Approval",
    "Production Started",
    "Inspection",
    "Final Dispatch"
  ];
  
  const NOTIFS = [
    "Vendor Uploaded PPS",
    "✓ Sample Approved",
    "Production Started",
    "QC Inspection Started",
    "Dispatch Ready"
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx = (currentIdx + 1) % STAGES_LIST.length;
      setActiveIdx(currentIdx);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const targetProgress = Math.round((activeIdx / (STAGES_LIST.length - 1)) * 100);
    const prevTarget = activeIdx === 0 ? 0 : Math.round(((activeIdx - 1) / (STAGES_LIST.length - 1)) * 100);
    const diff = targetProgress - prevTarget;
    
    if (diff === 0) {
      setProgressVal(targetProgress);
    } else {
      const steps = 20;
      const stepTime = 1000 / steps;
      let currentStep = 0;
      
      const t = setInterval(() => {
        currentStep++;
        setProgressVal(Math.round(prevTarget + (diff * (currentStep / steps))));
        if (currentStep >= steps) {
          clearInterval(t);
          setProgressVal(targetProgress);
        }
      }, stepTime);
      return () => clearInterval(t);
    }
  }, [activeIdx]);

  useEffect(() => {
    setNotification(NOTIFS[activeIdx]);
    const nt = setTimeout(() => setNotification(null), 2500);
    return () => clearTimeout(nt);
  }, [activeIdx]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl flex flex-col px-8 py-8" style={{ background: "#0a1120", border: "1px solid rgba(255,255,255,0.05)" }}>
      
      {/* Jacket Hero Area */}
      <div
        className="relative z-10 w-full flex justify-center items-end shrink-0 mb-4 mt-2"
        style={{ perspective: "700px", height: "38%" }}
      >
        {/* Floor glow */}
        <motion.div
          animate={{ opacity: [0.45, 0.85, 0.45], scaleX: [1, 1.18, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "50%", height: 16, borderRadius: "50%",
            background: activeIdx === 4
              ? "radial-gradient(ellipse, rgba(16,185,129,0.5) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(239,68,68,0.32) 0%, transparent 70%)",
            filter: "blur(7px)",
          }}
        />

        {/* Jacket wrapper — sway + float, perspective from parent */}
        <motion.div
          animate={{ rotateY: [-16, 16, -16], y: [0, -7, 0] }}
          transition={{
            rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            y:       { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative h-full"
          style={{ aspectRatio: "200/252", transformStyle: "preserve-3d" }}
        >
          {/* SVG jacket illustration */}
          <JacketSVG activeIdx={activeIdx} />

          {/* Inspection scanning line — sits on top of SVG */}
          {activeIdx === 3 && (
            <motion.div
              initial={{ top: "8%" }}
              animate={{ top: "90%" }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              className="absolute left-[10%] right-[10%] h-[2px] bg-emerald-400 shadow-[0_0_10px_#10B981] z-20 pointer-events-none"
            />
          )}
        </motion.div>

        {/* Floating Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded text-[10px] font-bold text-white border border-white/20 whitespace-nowrap z-30 shadow-xl"
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between pb-3 mb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <span className="font-mono text-[11px] font-bold text-white tracking-widest uppercase">Production Status</span>
        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded" style={{ color: stage.color, backgroundColor: `${stage.color}15`, border: `1px solid ${stage.color}25` }}>
          {progressVal}% Complete
        </span>
      </div>

      {/* Vertical Timeline */}
      <div className="relative flex-1 min-h-0 flex flex-col justify-around pl-2 pb-2">
        {/* Glowing connected line track */}
        <div className="absolute left-[15px] top-6 bottom-6 w-[2px] bg-white/5 z-0 overflow-hidden rounded-full">
           <motion.div 
             className="w-full shadow-[0_0_12px_#10B981]"
             initial={{ height: "0%", top: "0%" }}
             animate={{ height: "20%", top: `${(activeIdx / 4) * 80}%` }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
             style={{ position: "absolute", backgroundColor: stage.color }}
           />
        </div>

        {STAGES_LIST.map((s, i) => {
          const isDone = i < activeIdx;
          const isCur = i === activeIdx;

          return (
            <div key={s} className="relative z-10 flex items-center gap-4">
              <div 
                className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: isDone ? "#10B981" : isCur ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.04)",
                  borderColor: isDone ? "#10B981" : isCur ? "#EF4444" : "rgba(255,255,255,0.1)",
                  boxShadow: isCur ? "0 0 15px rgba(239,68,68,0.4)" : "none",
                  zIndex: 20
                }}
              >
                 {isDone && <Check size={12} className="text-white" />}
                 {isCur && <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-red-500" />}
              </div>
              <span 
                className="flex-1 text-[13px]"
                style={{
                  color: isDone ? "rgba(255,255,255,0.7)" : isCur ? "white" : "rgba(100,116,139,0.5)",
                  fontWeight: isCur ? 800 : 500
                }}
              >
                {s}
              </span>
              {isCur && (
                <motion.span 
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-mono text-[9px] font-bold px-2 py-1 rounded uppercase text-red-400 bg-red-400/10 border border-red-400/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                >
                  ACTIVE
                </motion.span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}

const staggerItem = (i: number) => ({
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
});

function StepDetailPanel({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <motion.div
      key={stage.id}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.22 } }}
      className="h-full flex flex-col px-8 py-6 overflow-hidden"
    >
      {/* Large step number watermark */}
      <motion.div
        variants={staggerItem(0)}
        className="font-mono font-black select-none leading-none"
        style={{
          fontSize: "clamp(48px, 6vw, 72px)",
          color: "#334155",
          letterSpacing: "-0.02em",
        }}
      >
        {stage.step}
      </motion.div>

      {/* Badge + tagline */}
      <motion.div variants={staggerItem(1)} className="flex items-center gap-2 mt-1">
        <span
          className="text-[9px] font-black font-mono px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${stage.color}18`, color: stage.color, border: `1px solid ${stage.color}28` }}
        >
          {stage.phase.toUpperCase()}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h3
        variants={staggerItem(2)}
        className="mt-2 text-[19px] font-black text-white leading-snug"
      >
        {stage.title}
      </motion.h3>

      {/* Description */}
      <motion.p variants={staggerItem(3)} className="mt-1.5 text-[12px] text-slate-400 leading-relaxed">
        {stage.description}
      </motion.p>

      {/* Bullets */}
      <motion.ul variants={staggerItem(4)} className="mt-3 space-y-1.5">
        {stage.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <div className="mt-[5px] w-[4px] h-[4px] rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
            <span className="text-[11px] text-slate-300 leading-snug">{b}</span>
          </li>
        ))}
      </motion.ul>

      {/* ── Data panel — unique per step ── */}
      <motion.div variants={staggerItem(5)} className="mt-4 flex-1 min-h-0 overflow-hidden">

        {/* Step 1: POM spec sheet */}
        {stage.id === 1 && (
          <div className="rounded-xl border bg-white/[0.03] p-3.5 font-mono" style={{ borderColor: `${stage.color}18` }}>
            <div className="flex justify-between items-center pb-2 mb-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <span className="text-[9px] font-bold text-white">MDZ-CJ-SS26 · Cheetah Coat</span>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${stage.color}18`, color: stage.color }}>v1.0</span>
            </div>
            <div className="grid grid-cols-3 text-[7px] text-slate-600 font-bold uppercase tracking-wider pb-1.5">
              <span>Measurement</span><span className="text-center">Value</span><span className="text-right">Tolerance</span>
            </div>
            {[
              ["Chest Width", "52.0 cm", "±0.5 cm"],
              ["Body Length", "68.0 cm", "±1.0 cm"],
              ["Sleeve Length", "63.0 cm", "±0.5 cm"],
              ["Shoulder Width", "42.0 cm", "±0.5 cm"],
            ].map(([l, v, t]) => (
              <div key={l} className="grid grid-cols-3 py-1 border-b text-[10px]" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <span className="text-slate-400">{l}</span>
                <span className="text-center text-white font-bold">{v}</span>
                <span className="text-right text-emerald-400 text-[9px]">{t}</span>
              </div>
            ))}
            <div className="mt-2 px-2 py-1.5 rounded-lg text-[9px]" style={{ backgroundColor: `${stage.color}0c`, border: `1px solid ${stage.color}1e` }}>
              <span className="font-bold uppercase tracking-wider" style={{ color: stage.color }}>BOM</span>
              <span className="text-slate-400 ml-2">Shell: 60% Leather / 40% PU · 850gsm</span>
            </div>
          </div>
        )}

        {/* Step 2: Collaboration thread */}
        {stage.id === 2 && (
          <div className="rounded-xl border bg-white/[0.03] p-3.5" style={{ borderColor: `${stage.color}18` }}>
            <div className="flex justify-between items-center pb-2 mb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <span className="font-mono text-[9px] font-bold text-white">MDZ-CJ-SS26 · Review Thread</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span className="font-mono text-[8px] text-emerald-400">Live</span>
              </span>
            </div>
            <div className="space-y-2.5">
              {[
                { from: "Sourcing Mgr", msg: "Can the lining be updated to recycled satin?", c: "#0F62FE", right: false, t: "10:14" },
                { from: "Vendor", msg: "Yes — updated BOM ready for your review.", c: "#F59E0B", right: true, t: "10:47" },
                { from: "Sourcing Mgr", msg: "Approved. Proceed with sample development ✓", c: "#10B981", right: false, t: "11:02" },
              ].map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.right ? "flex-row-reverse" : ""}`}>
                  <div
                    className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[7px] font-black"
                    style={{ backgroundColor: `${m.c}22`, color: m.c }}
                  >
                    {m.from[0]}
                  </div>
                  <div
                    className={`flex-1 rounded-xl px-2.5 py-2 ${m.right ? "text-right" : ""}`}
                    style={{ backgroundColor: `${m.c}0e`, border: `1px solid ${m.c}1e` }}
                  >
                    <p className="font-mono text-[7px] text-slate-600 mb-0.5">{m.from} · {m.t}</p>
                    <p className="text-[10px] text-slate-200 leading-snug">{m.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: TNA schedule — planned vs actual */}
        {stage.id === 3 && (
          <div className="rounded-xl border bg-white/[0.03] p-3.5" style={{ borderColor: `${stage.color}18` }}>
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <span className="font-mono text-[9px] font-bold text-white">MDZ-SS26-001 · TNA Schedule</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span className="font-mono text-[8px] text-emerald-400 font-bold">Live</span>
              </span>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-3 pb-1.5 mb-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span className="font-mono text-[7px] text-slate-600 uppercase tracking-wider">Milestone</span>
              <span className="font-mono text-[7px] text-slate-600 uppercase tracking-wider">Planned</span>
              <span className="font-mono text-[7px] text-slate-600 uppercase tracking-wider">Actual</span>
              <span className="font-mono text-[7px] text-slate-600 uppercase tracking-wider text-center">St.</span>
            </div>

            {/* Rows */}
            {[
              { label: "Sample Development", planned: "Jun 05", actual: "Jun 05", s: "done"    },
              { label: "Sample Approval",    planned: "Jun 14", actual: "Jun 13", s: "done"    },
              { label: "Production Started", planned: "Jun 20", actual: "Jun 20", s: "active"  },
              { label: "Inspection",         planned: "Jul 08", actual: "—",      s: "pending" },
              { label: "Final Dispatch",     planned: "Jul 15", actual: "—",      s: "pending" },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-x-3 items-center py-1.5 border-b last:border-0"
                style={{ borderColor: "rgba(255,255,255,0.04)" }}
              >
                <span
                  className="text-[10px] leading-snug"
                  style={{
                    color:
                      row.s === "active"  ? "white" :
                      row.s === "done"    ? "rgba(148,163,184,0.42)" :
                                            "rgba(100,116,139,0.38)",
                    fontWeight: row.s === "active" ? 700 : 400,
                    textDecoration: row.s === "done" ? "line-through" : "none",
                  }}
                >
                  {row.label}
                </span>
                <span className="font-mono text-[7.5px] text-slate-600 tabular-nums">{row.planned}</span>
                <span
                  className="font-mono text-[7.5px] tabular-nums"
                  style={{ color: row.actual === "—" ? "rgba(100,116,139,0.28)" : "#10B981" }}
                >
                  {row.actual}
                </span>
                <div className="flex justify-center">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        row.s === "done"   ? "rgba(16,185,129,0.18)" :
                        row.s === "active" ? `${stage.color}20`      :
                                             "rgba(255,255,255,0.03)",
                      border: `1px solid ${
                        row.s === "done"   ? "rgba(16,185,129,0.45)" :
                        row.s === "active" ? `${stage.color}55`      :
                                             "rgba(255,255,255,0.07)"
                      }`,
                    }}
                  >
                    {row.s === "done" && <Check size={7} className="text-emerald-400" />}
                    {row.s === "active" && (
                      <motion.div
                        animate={{ scale: [1, 1.35, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4: Analytics KPIs */}
        {stage.id === 4 && (
          <div className="rounded-xl border bg-white/[0.03] p-3.5" style={{ borderColor: `${stage.color}18` }}>
            <div className="flex items-center justify-between pb-2 mb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <span className="font-mono text-[9px] font-bold text-white">MDZ-CJ-SS26 · Performance</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span className="font-mono text-[8px] text-emerald-400 font-bold">On Track</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { l: "Production", v: "67%", c: "#10B981" },
                { l: "Lead Time", v: "38d", c: "white" },
                { l: "Vendor Score", v: "94%", c: "#10B981" },
              ].map((k) => (
                <div key={k.l} className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="font-mono text-[6.5px] text-slate-600 uppercase tracking-wider mb-1">{k.l}</div>
                  <div className="font-black" style={{ fontSize: 18, color: k.c, fontFamily: "monospace" }}>{k.v}</div>
                </div>
              ))}
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-1 h-8 rounded-lg px-2 py-1" style={{ background: "rgba(0,0,0,0.2)" }}>
              {[52, 64, 78, 71, 86, 91, 88].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: "easeOut" }}
                  className="flex-1 rounded-sm origin-bottom"
                  style={{ height: `${h}%`, backgroundColor: `rgba(16,185,129,${0.3 + i * 0.08})` }}
                />
              ))}
            </div>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5">
              {[{ l: "Dispatch", v: "On Track", c: "#10B981" }, { l: "Cycle Time", v: "4 days", c: "white" }].map((k) => (
                <div key={k.l} className="rounded-lg p-1.5 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="font-mono text-[6.5px] text-slate-600 uppercase tracking-wider">{k.l}</div>
                  <div className="font-bold text-[10px] font-mono" style={{ color: k.c }}>{k.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════ */
export default function HowModozoWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  const prevStepRef = useRef(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let next = 1;
    if (v < 0.27) next = 1;
    else if (v < 0.52) next = 2;
    else if (v < 0.77) next = 3;
    else next = 4;

    if (next !== prevStepRef.current) {
      prevStepRef.current = next;
      setActiveStep(next);
    }
  });

  const stage = STAGES[activeStep - 1];

  /* Background ambient shifts per step */
  const ambientColors: Record<number, string> = {
    1: "rgba(15,98,254,0.06)",
    2: "rgba(245,158,11,0.05)",
    3: "rgba(239,68,68,0.05)",
    4: "rgba(16,185,129,0.05)",
  };

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="relative h-[600vh] bg-[#040b17]"
    >
      {/* Ambient glow — shifts per active step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 75% 45% at 35% 15%, ${ambientColors[activeStep]}, transparent 65%)`,
          }}
        />
      </AnimatePresence>

      {/* ─── Sticky viewport ─── */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden z-10 px-6 pt-5 pb-4 gap-3">

        {/* ══ Header: Modozo as the platform ══ */}
        <div className="shrink-0 flex flex-col items-center gap-1">
          <Image src="/logo4.png" alt="Modozo" width={140} height={48} className="h-9 w-auto" priority />
          <div className="flex items-center gap-3">
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${stage.color}40)` }} />
            <h2 className="text-[14px] font-black text-white tracking-[0.24em] uppercase font-mono">
              How Modozo Works
            </h2>
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${stage.color}40, transparent)` }} />
          </div>
          <p className="text-[8px] font-mono text-white/18 tracking-[0.22em] uppercase">
            Your apparel's full journey — sketch to dispatch, inside one platform
          </p>
        </div>

        {/* ══ Chapter navigation ══ */}
        <div className="shrink-0">
          <ChapterNav activeStep={activeStep} />
        </div>

        {/* ══ Main content: garment canvas (left) + step detail (right) ══ */}
        <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">

          {/* Garment journey slideshow / Collab animation / Production tracking */}
          <div className="w-[42%] min-w-[280px] shrink-0 relative rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {activeStep === 2 ? (
                <motion.div
                  key="collab"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <CollaborationCanvas />
                </motion.div>
              ) : activeStep === 3 ? (
                <motion.div
                  key="tna"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <TNATrackerCanvas stage={STAGES[2]} />
                </motion.div>
              ) : (
                <motion.div
                  key="slideshow"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <SlideshowCanvas activeStep={activeStep} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Step detail panel with clip-reveal transition */}
          <div
            className="flex-1 rounded-2xl overflow-hidden relative"
            style={{
              background: "rgba(6,14,26,0.95)",
              border: `1px solid ${stage.color}1e`,
              boxShadow: `0 0 60px ${stage.color}08, 0 12px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.03)`,
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] z-10"
              style={{
                background: `linear-gradient(90deg, transparent 10%, ${stage.color}70 40%, ${stage.color} 50%, ${stage.color}70 60%, transparent 90%)`,
              }}
            />

            <AnimatePresence mode="wait">
              <StepDetailPanel key={activeStep} stage={stage} />
            </AnimatePresence>
          </div>
        </div>

        {/* ══ Bottom progress indicator ══ */}
        <div className="shrink-0 flex items-center justify-between px-1">
          {/* Step dots */}
          <div className="flex items-center gap-2">
            {STAGES.map((s) => (
              <motion.div
                key={s.id}
                className="h-[3px] rounded-full"
                animate={{
                  width: activeStep === s.id ? 24 : 6,
                  backgroundColor:
                    activeStep === s.id
                      ? s.color
                      : activeStep > s.id
                        ? "#10B981"
                        : "rgba(255,255,255,0.1)",
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            ))}
          </div>

          {/* Sketch/Produced label */}
          <div className="flex items-center gap-1.5 font-mono text-[8px] text-white/15 tracking-widest uppercase">
            <span>Concept → Garment</span>
            <span style={{ color: `${stage.color}50` }}>{stage.step} / 04</span>
          </div>
        </div>

      </div>
    </section>
  );
}
