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
  { src: "/linesheets-1.png", label: "Line Sheet" },
  { src: "/pantone-1.png", label: "Pantone Selection" },
  { src: "/printtstrikee-1.png", label: "Print Strike" },
  { src: "/techpack-1.png", label: "Tech Pack" },
  { src: "/finalgarment-1.png", label: "Final Garment" },
] as const;

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
                style={{ color: isActive ? s.color : isDone ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)" }}
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
<<<<<<< HEAD
const SLIDESHOW_IMAGES = [
  "/linesheet_4.png",
  "/pantone_4.png",
  "/printstrike_4.png",
  "/techpack_4.png",
  "/sketch_4.png",
];

function GarmentCanvas({
  smoothClip,
  activeStep,
}: {
  smoothClip: MotionValue<number>;
  activeStep: number;
}) {
  const stage = STAGES[activeStep - 1];
=======
function SlideshowCanvas({ activeStep }: { activeStep: number }) {
>>>>>>> 4e2e0fdc8b57b730a306bcb2829eb3ada8882730
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

<<<<<<< HEAD
        return (
          <motion.div
            key={src}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.98,
              zIndex: isActive ? 10 : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ pointerEvents: isActive ? "auto" : "none" }}
          >
            <Image
              src={src}
              alt={`Slide ${index}`}
              fill
              className="object-contain"
              quality={100}
              unoptimized={true}
              priority
            />
          </motion.div>
        );
      })}


=======
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
            style={{ padding: "6% 8%" }}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Style ID chip — top left */}
      <div
        className="absolute top-4 left-4 z-20 font-mono text-[8px] font-bold px-2 py-0.5 rounded"
        style={{ background: stage.color, color: "white" }}
      >
        MDZ-CJ-SS26
      </div>
>>>>>>> 4e2e0fdc8b57b730a306bcb2829eb3ada8882730



      {/* Slide label — bottom left */}
      <motion.div
        key={`label-${currentIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="absolute bottom-4 left-4 z-20 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
        style={{ color: "rgba(0,0,0,0.32)" }}
      >
<<<<<<< HEAD
        STEP 0{currentIndex + 1}
=======
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
>>>>>>> 4e2e0fdc8b57b730a306bcb2829eb3ada8882730
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEP DETAIL PANEL — right side, unique per step
═══════════════════════════════════════════════════════ */
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
          color: `${stage.color}18`,
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

        {/* Step 3: TNA production tracker */}
        {stage.id === 3 && (
          <div className="rounded-xl border bg-white/[0.03] p-3.5" style={{ borderColor: `${stage.color}18` }}>
            <div className="flex items-center justify-between pb-2 mb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <span className="font-mono text-[9px] font-bold text-white">TNA Milestones</span>
              <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded" style={{ color: stage.color, backgroundColor: `${stage.color}15`, border: `1px solid ${stage.color}25` }}>
                60% Complete
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full overflow-hidden mb-4" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="h-full rounded-full"
                style={{ backgroundColor: stage.color }}
              />
            </div>
            {[
              { label: "Sample Development", done: true, cur: false },
              { label: "Sample Approval", done: true, cur: false },
              { label: "Production Started", done: false, cur: true },
              { label: "Inspection", done: false, cur: false },
              { label: "Final Dispatch", done: false, cur: false },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 py-1.5 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <div
                  className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: s.done ? "#10B981" : s.cur ? `${stage.color}20` : "rgba(255,255,255,0.04)",
                    borderColor: s.done ? "#10B981" : s.cur ? stage.color : "rgba(255,255,255,0.1)",
                  }}
                >
                  {s.done && <Check size={8} className="text-white" />}
                  {s.cur && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stage.color }} />}
                </div>
                <span
                  className="flex-1 text-[11px]"
                  style={{
                    color: s.done ? "rgba(148,163,184,0.35)" : s.cur ? "white" : "rgba(100,116,139,0.45)",
                    fontWeight: s.cur ? 700 : 400,
                    textDecoration: s.done ? "line-through" : "none",
                  }}
                >
                  {s.label}
                </span>
                {s.cur && (
                  <span className="font-mono text-[8px] font-bold px-1.5 py-0.5 rounded uppercase" style={{ color: stage.color, backgroundColor: `${stage.color}15` }}>
                    Active
                  </span>
                )}
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

          {/* Garment journey slideshow */}
          <div className="w-[42%] min-w-[280px] shrink-0">
            <SlideshowCanvas activeStep={activeStep} />
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
