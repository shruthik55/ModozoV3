"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Layers,
  Scissors,
  Activity,
  CheckCircle,
  Truck,
} from "lucide-react";

type LevelId = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/* ─── Data — each level is contextually coherent ─────────────────────── */
const LEVELS = [
  {
    id: 0 as LevelId,
    stageName: "Level 01  ·  Technical Design",
    name: "Tech Pack & BOM Approval",
    icon: FileText,
    status: "Approved",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    accentColor: "#10b981",
    // Center card rows
    centerRows: [
      { label: "Style Reference", value: "MDZ-SS26-08" },
      { label: "Season", value: "SS 2026 — Shirt" },
      { label: "Spec Version", value: "v3.2  (Final Locked)" },
      { label: "BOM Status", value: "18 trims · All approved" },
      { label: "Graded Sizes", value: "XS · S · M · L · XL · XXL" },
      { label: "Handoff Date", value: "May 12, 2026" },
    ],
    // Left side-card
    leftTitle: "Spec Sheets",
    leftKpi: "6",
    leftKpiUnit: "size grades",
    leftNote: "Patterns graded & released to vendor",
    // Right side-card
    rightTitle: "BOM Locked",
    rightKpi: "100%",
    rightKpiUnit: "approval rate",
    rightNote: "18 accessories · 4 fabric components",
  },
  {
    id: 1 as LevelId,
    stageName: "Level 02  ·  Sample Stage",
    name: "Fit Sample & Size Sign-off",
    icon: ShieldCheck,
    status: "Approved",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    accentColor: "#10b981",
    centerRows: [
      { label: "Sample Type", value: "Pre-Production (PP) Sample" },
      { label: "Fit Model", value: "Size M  ·  Sign-off Confirmed" },
      { label: "Chest Tolerance", value: "+0.1 cm  ✓ Within spec" },
      { label: "Inseam Tolerance", value: "−0.2 cm  ✓ Within spec" },
      { label: "Shrinkage Test", value: "−1.8 %  ✓ Pass" },
      { label: "Shade Match", value: "Grade 4.5 / 5  ✓ Pass" },
    ],
    leftTitle: "Fit Model",
    leftKpi: "M",
    leftKpiUnit: "reference size",
    leftNote: "All 6 measurements within ±0.5 cm",
    rightTitle: "Sample Result",
    rightKpi: "Pass",
    rightKpiUnit: "PP sign-off",
    rightNote: "Fit specialist · Jun 02, 2026",
  },
  {
    id: 2 as LevelId,
    stageName: "Level 03  ·  Sourcing",
    name: "Fabric & Material Release",
    icon: Layers,
    status: "100% In-House",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    accentColor: "#3b82f6",
    centerRows: [
      { label: "Shell Fabric", value: "Indigo Denim 12 oz  — 12,400 yd in-house" },
      { label: "Pocket Lining", value: "Cotton Twill  — 2,800 yd in-house" },
      { label: "Zippers", value: "YKK #5  — 5,000 pcs  ✓ Received" },
      { label: "Eyelets", value: "Gunmetal  — 10,200 pcs  ✓ Received" },
      { label: "Brand Labels", value: "Woven main label  — 5,200 pcs" },
      { label: "Shrinkage Pre-test", value: "−2.1 %  ✓ Approved for cutting" },
    ],
    leftTitle: "Fabric Stock",
    leftKpi: "12,400",
    leftKpiUnit: "yards denim",
    leftNote: "100% roll inspection passed",
    rightTitle: "Accessories",
    rightKpi: "100%",
    rightKpiUnit: "trims received",
    rightNote: "5 component types · all cleared",
  },
  {
    id: 3 as LevelId,
    stageName: "Level 04  ·  Cutting Room",
    name: "Bulk Cutting & Spreading",
    icon: Scissors,
    status: "Completed",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    accentColor: "#8b5cf6",
    centerRows: [
      { label: "Cut Order Qty", value: "5,000 pcs  (order) + 1% allowance" },
      { label: "Panels Cut", value: "5,050 pcs  ✓ +50 buffer" },
      { label: "Marker Efficiency", value: "98.6%  — Optimized lay plan" },
      { label: "Fabric Consumed", value: "11,980 yd  (vs. 12,400 yd allocated)" },
      { label: "No. of Plies", value: "80 plies  ·  Straight knife machine" },
      { label: "Completed On", value: "Jun 14, 2026" },
    ],
    leftTitle: "Target Qty",
    leftKpi: "5,000",
    leftKpiUnit: "pcs ordered",
    leftNote: "98.6% marker efficiency",
    rightTitle: "Actual Output",
    rightKpi: "5,050",
    rightKpiUnit: "panels cut",
    rightNote: "+50 pcs buffer · Jun 14 complete",
  },
  {
    id: 4 as LevelId,
    stageName: "Level 05  ·  Sewing Floor",
    name: "Sewing Line Assembly",
    icon: Activity,
    status: "73% Active",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/25",
    accentColor: "#3b82f6",
    centerRows: [
      { label: "Production Line", value: "Line B-3  ·  42 operators" },
      { label: "Sewn to Date", value: "3,650 pcs  /  5,000 target" },
      { label: "Hourly Velocity", value: "138 pcs / hr  (target: 150 / hr)" },
      { label: "OEE Efficiency", value: "87%  — within acceptable range" },
      { label: "Operations / Pcs", value: "24 sewing operations per garment" },
      { label: "Est. Completion", value: "Jun 22, 2026  at current pace" },
    ],
    leftTitle: "Sewing Done",
    leftKpi: "3,650",
    leftKpiUnit: "pcs joined",
    leftNote: "87% OEE  ·  138 pcs / hr",
    rightTitle: "Remaining",
    rightKpi: "1,350",
    rightKpiUnit: "pcs pending",
    rightNote: "Est. complete Jun 22, 2026",
  },
  {
    id: 5 as LevelId,
    stageName: "Level 06  ·  Quality Control",
    name: "Inline & AQL Audit",
    icon: CheckCircle,
    status: "98.8% Pass",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    accentColor: "#10b981",
    centerRows: [
      { label: "Inspection Type", value: "Inline  +  AQL 2.5 End-line" },
      { label: "Units Inspected", value: "3,650 pcs inline  ·  80 pcs AQL sample" },
      { label: "AQL Result", value: "0 critical  ·  3 minor  → PASS" },
      { label: "DHU (Defects)", value: "1.2%  — below 2.5% threshold" },
      { label: "Stitch Density", value: "12 SPI  ✓  (spec: 10–14 SPI)" },
      { label: "Shade Variation", value: "Grade 4 / 5  ✓ No reject" },
    ],
    leftTitle: "AQL Sampling",
    leftKpi: "80",
    leftKpiUnit: "pcs checked",
    leftNote: "0 critical defects · AQL 2.5 Pass",
    rightTitle: "Quality Score",
    rightKpi: "98.8%",
    rightKpiUnit: "pass rate",
    rightNote: "DHU 1.2%  ·  Inline cleared",
  },
  {
    id: 6 as LevelId,
    stageName: "Level 07  ·  Packing & Dispatch",
    name: "Carton Pack & Ex-Factory",
    icon: Truck,
    status: "In Progress",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/25",
    accentColor: "#f59e0b",
    centerRows: [
      { label: "Packing Method", value: "Polybag  →  Master carton (12 pcs)" },
      { label: "Cartons Packed", value: "42  /  417 total cartons" },
      { label: "Packed Quantity", value: "504 pcs  /  5,000 pcs ordered" },
      { label: "Carton Gross Wt.", value: "15.4 kg avg  — verified on scale" },
      { label: "Ex-factory Date", value: "Jul 03, 2026  — booking confirmed" },
      { label: "Carrier", value: "MSC Ocean Freight  ·  FCL container" },
    ],
    leftTitle: "Cartons Packed",
    leftKpi: "42",
    leftKpiUnit: "of 417 cartons",
    leftNote: "504 pcs sealed · 10% complete",
    rightTitle: "ETD",
    rightKpi: "Jul 03",
    rightKpiUnit: "ex-factory",
    rightNote: "MSC ocean FCL · booking confirmed",
  },
] as const;

/* ─── Premium 3D floating card layout ────────────────────────────────── */
function Layout({
  center,
  left,
  right,
}: {
  center: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw mouse position (-1 … +1 on each axis)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Spring-smoothed for organic feel
  const mouseX = useSpring(rawX, { stiffness: 120, damping: 22 });
  const mouseY = useSpring(rawY, { stiffness: 120, damping: 22 });

  // Per-card rotations — different ranges = independent parallax depth
  // Center: -12° Y base, 3° X base (medium depth)
  const cRotY = useTransform(mouseX, [-1, 1], [-14, -10]);
  const cRotX = useTransform(mouseY, [-1, 1], [4.5, 1.5]);
  // Top-right: -8° Y base, 4° X base (foreground — lighter lean)
  const rRotY = useTransform(mouseX, [-1, 1], [-11, -5]);
  const rRotX = useTransform(mouseY, [-1, 1], [6, 2]);
  // Bottom-left: -10° Y base, 2° X base (foreground — slightly deeper)
  const lRotY = useTransform(mouseX, [-1, 1], [-13, -7]);
  const lRotX = useTransform(mouseY, [-1, 1], [3.5, 0.5]);

  // ── Per-card gradient backgrounds ──────────────────────────────────
  // Center card: deep navy → indigo (dominant, matches site's dark base)
  const CENTER_BG = "linear-gradient(145deg, rgba(3, 24, 99, 0.96) 0%, rgba(4, 13, 80, 0.94) 45%, rgba(22,16,60,0.92) 100%)";
  // Right side card: electric blue → teal (crisp, foreground accent)
  const RIGHT_BG = "linear-gradient(145deg, rgba(6,18,48,0.94) 0%, rgba(2, 23, 60, 0.92) 50%, rgba(8,45,60,0.90) 100%)";
  // Left side card: violet → deep purple (warm foreground accent)
  const LEFT_BG = "linear-gradient(145deg, rgba(14,8,42,0.94) 0%, rgba(28,12,58,0.92) 50%, rgba(40,10,55,0.90) 100%)";

  const CARD_BLUR = "blur(24px)";

  // Center border: indigo-blue tint
  const CENTER_BORDER = "1px solid rgba(94,114,228,0.28)";
  // Right border: cyan-blue tint
  const RIGHT_BORDER = "1px solid rgba(56,189,248,0.22)";
  // Left border: violet-purple tint
  const LEFT_BORDER = "1px solid rgba(167,139,250,0.22)";

  const CENTER_SHADOW = [
    "0 32px 80px rgba(0,0,0,0.55)",
    "14px 24px 64px rgba(0,0,0,0.32)",
    "0 0 0 1px rgba(255,255,255,0.04)",
    "inset 0 1px 0 rgba(255,255,255,0.07)",
    "0 0 80px rgba(94,114,228,0.12)",
    "0 0 40px rgba(59,130,246,0.08)",
  ].join(", ");
  const RIGHT_SHADOW = [
    "0 24px 60px rgba(0,0,0,0.60)",
    "10px 18px 44px rgba(0,0,0,0.35)",
    "0 0 0 1px rgba(255,255,255,0.05)",
    "inset 0 1px 0 rgba(255,255,255,0.08)",
    "0 0 50px rgba(56,189,248,0.10)",
    "0 0 25px rgba(14,165,233,0.08)",
  ].join(", ");
  const LEFT_SHADOW = [
    "0 24px 60px rgba(0,0,0,0.60)",
    "10px 18px 44px rgba(0,0,0,0.35)",
    "0 0 0 1px rgba(255,255,255,0.05)",
    "inset 0 1px 0 rgba(255,255,255,0.08)",
    "0 0 50px rgba(167,139,250,0.10)",
    "0 0 25px rgba(139,92,246,0.08)",
  ].join(", ");

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
    >
      {/* ── Center card — navy→indigo gradient ── */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          left: "11%",
          width: "66%",
          top: "8%",
          bottom: "8%",
          zIndex: 10,
          background: CENTER_BG,
          backdropFilter: CARD_BLUR,
          borderRadius: "22px",
          border: CENTER_BORDER,
          boxShadow: CENTER_SHADOW,
          rotateY: cRotY,
          rotateX: cRotX,
          transformPerspective: 1400,
        }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
        transition={{
          opacity: { duration: 0.45, ease: "easeOut" },
          scale: { duration: 0.45, ease: "easeOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        }}
      >
        {center}
      </motion.div>

      {/* ── Top-right card — electric blue→teal gradient ── */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          right: "0%",
          top: "3%",
          width: "25%",
          height: "43%",
          zIndex: 20,
          background: RIGHT_BG,
          backdropFilter: CARD_BLUR,
          borderRadius: "18px",
          border: RIGHT_BORDER,
          boxShadow: RIGHT_SHADOW,
          rotateY: rRotY,
          rotateX: rRotX,
          rotateZ: -1.5,
          transformPerspective: 900,
        }}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0, y: [0, -7, 0] }}
        transition={{
          opacity: { duration: 0.42, delay: 0.08, ease: "easeOut" },
          x: { duration: 0.42, delay: 0.08, ease: "easeOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
        }}
      >
        {right}
      </motion.div>

      {/* ── Bottom-left card — violet→deep-purple gradient ── */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          left: "0%",
          bottom: "-8%",
          width: "24%",
          height: "43%",
          zIndex: 20,
          background: LEFT_BG,
          backdropFilter: CARD_BLUR,
          borderRadius: "18px",
          border: LEFT_BORDER,
          boxShadow: LEFT_SHADOW,
          rotateY: lRotY,
          rotateX: lRotX,
          rotateZ: 2,
          transformPerspective: 900,
        }}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.42, delay: 0.1, ease: "easeOut" },
          x: { duration: 0.42, delay: 0.1, ease: "easeOut" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
      >
        {left}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════════════ */

export default function ProductionTrackingVisual({ onCycleComplete }: { onCycleComplete?: () => void }) {
  const [activeLevel, setActiveLevel] = useState<LevelId>(0);
  const onCycleCompleteRef = useRef(onCycleComplete);
  const pendingCycleCompleteRef = useRef(false);

  useEffect(() => {
    onCycleCompleteRef.current = onCycleComplete;
  }, [onCycleComplete]);

  const advanceLevel = useCallback(() => {
    setActiveLevel((prev) => {
      const next = ((prev + 1) % 7) as LevelId;
      pendingCycleCompleteRef.current = next === 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!pendingCycleCompleteRef.current || activeLevel !== 0) return;
    pendingCycleCompleteRef.current = false;
    onCycleCompleteRef.current?.();
  }, [activeLevel]);

  useEffect(() => {
    const id = setInterval(advanceLevel, 3500);
    return () => clearInterval(id);
  }, [advanceLevel]);

  const lvl = LEVELS[activeLevel];
  const Icon = lvl.icon;

  return (
    <div className="w-full aspect-[16/9] relative overflow-visible select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevel}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <Layout
            /* ── CENTER ───────────────────────────────────── */
            center={
              <div className="h-full flex text-slate-200">

                {/* ── Left: data table ── */}
                <div className="flex flex-col p-5 flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: lvl.accentColor + "18",
                          border: `1px solid ${lvl.accentColor}30`,
                        }}
                      >
                        <Icon size={14} style={{ color: lvl.accentColor }} />
                      </div>
                      <div>
                        <p className="text-[7.5px] font-bold uppercase tracking-[0.2em]"
                          style={{ color: lvl.accentColor }}>
                          {lvl.stageName}
                        </p>
                        <h4 className="text-[13px] font-black text-white leading-tight mt-0.5">
                          {lvl.name}
                        </h4>
                      </div>
                    </div>
                    <span className={`text-[7.5px] font-bold px-2 py-0.5 rounded-full border ${lvl.statusColor} shrink-0 ml-2 mt-0.5`}>
                      {lvl.status}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-white/[0.05] mb-3" />

                  {/* Row table */}
                  <div className="flex-1 space-y-2">
                    {lvl.centerRows.map((row) => (
                      <div key={row.label} className="flex items-baseline gap-2">
                        <span className="text-[8.5px] text-slate-500 w-[38%] shrink-0 font-medium">
                          {row.label}
                        </span>
                        <span className="text-[9.5px] text-slate-200 font-semibold leading-snug">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer dots */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.04] text-[7.5px] text-slate-500 font-mono">
                    <span>MDZ-SS26-08</span>
                    <div className="flex gap-1">
                      {LEVELS.map((_, i) => (
                        <span
                          key={i}
                          className="h-1 rounded-full transition-all duration-300"
                          style={{
                            width: i === activeLevel ? 12 : 5,
                            background: i === activeLevel ? lvl.accentColor : "rgba(255,255,255,0.12)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Right: product image panel ── */}
                <div
                  className="relative flex items-center justify-center shrink-0 overflow-hidden"
                  style={{
                    width: "38%",
                    borderLeft: "1px solid rgba(255,255,255,0.04)",
                    background: "linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(9,15,34,0.0) 60%)",
                  }}
                >
                  {/* Glow behind image */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 60%, ${lvl.accentColor}22 0%, transparent 70%)`,
                    }}
                  />
                  {/* Product label */}
                  <div className="absolute top-3 left-0 right-0 flex justify-center">
                    <span
                      className="text-[7px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                      style={{
                        color: lvl.accentColor,
                        background: lvl.accentColor + "15",
                        border: `1px solid ${lvl.accentColor}30`,
                      }}
                    >
                      SS26 Collection
                    </span>
                  </div>
                  {/* Garment image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/shirt.png"
                    alt="SS26 Premium Shirt"
                    style={{
                      width: "88%",
                      maxHeight: "80%",
                      objectFit: "contain",
                      filter: `drop-shadow(0 10px 28px rgba(0,0,0,0.65)) brightness(1.08) saturate(1.1)`,
                      marginTop: "4px",
                      borderRadius: "6px",
                    }}
                  />
                </div>

              </div>
            }

            /* ── LEFT ─────────────────────────────────────── */
            left={
              <div className="h-full flex flex-col justify-between p-4 text-slate-200">
                <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {lvl.leftTitle}
                </p>
                <div className="flex-1 flex flex-col justify-center gap-0.5">
                  <p className="text-2xl font-black text-white leading-none">
                    {lvl.leftKpi}
                  </p>
                  <p className="text-[8px] text-slate-500 font-medium">
                    {lvl.leftKpiUnit}
                  </p>
                </div>
                <p className="text-[7.5px] text-slate-400 leading-snug border-t border-white/[0.04] pt-2">
                  {lvl.leftNote}
                </p>
              </div>
            }

            /* ── RIGHT ────────────────────────────────────── */
            right={
              <div className="h-full flex flex-col justify-between p-4 text-slate-200">
                <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {lvl.rightTitle}
                </p>
                <div className="flex-1 flex flex-col justify-center gap-0.5">
                  <p className="text-2xl font-black leading-none" style={{ color: lvl.accentColor }}>
                    {lvl.rightKpi}
                  </p>
                  <p className="text-[8px] text-slate-500 font-medium">
                    {lvl.rightKpiUnit}
                  </p>
                </div>
                <p className="text-[7.5px] text-slate-400 leading-snug border-t border-white/[0.04] pt-2">
                  {lvl.rightNote}
                </p>
              </div>
            }
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
