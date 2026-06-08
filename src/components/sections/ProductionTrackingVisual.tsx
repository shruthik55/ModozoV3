"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Package,
  Scissors,
  Truck,
  ShieldCheck,
  FileText,
  Zap,
  TrendingUp,
  Layers,
  RefreshCw,
  Building2,
} from "lucide-react";

/* ── Scene timing ──────────────────────────────────────────────────── */
const SCENE_DURATIONS = [4000, 5500, 5500, 5500, 4500, 5500];
const TOTAL_SCENES = SCENE_DURATIONS.length;

/* ── Pipeline ──────────────────────────────────────────────────────── */
const PIPELINE = [
  { short: "TP", label: "Tech Pack", icon: FileText },
  { short: "Fab", label: "Fabric Sourcing", icon: Layers },
  { short: "Cut", label: "Cutting", icon: Scissors },
  { short: "Prt", label: "Printing", icon: Zap },
  { short: "Sew", label: "Sewing", icon: Activity },
  { short: "QC", label: "QC", icon: ShieldCheck },
  { short: "Pak", label: "Packing", icon: Package },
  { short: "Shp", label: "Shipment", icon: Truck },
  { short: "Del", label: "Delivered", icon: CheckCircle2 },
];

/* ── Orders ────────────────────────────────────────────────────────── */
const ORDERS = [
  {
    po: "PO-2024", name: "Camo Trench Coat", factory: "Factory A",
    image: "/collab_jacket.png", progress: 55, status: "Sewing",
    units: "330/600", delay: false,
    sc: "text-amber-400 border-amber-400/25 bg-amber-400/[0.06]",
  },
  {
    po: "PO-2025", name: "Baroque Polo Shirt", factory: "Factory B",
    image: "/collab_polo.png", progress: 38, status: "Printing",
    units: "304/800", delay: true,
    sc: "text-amber-400 border-amber-400/25 bg-amber-400/[0.06]",
  },
  {
    po: "PO-2026", name: "Leopard Runner Shoes", factory: "Factory C",
    image: "/collab_shoe.png", progress: 96, status: "Shipment",
    units: "384/400", delay: false,
    sc: "text-emerald-400 border-emerald-400/25 bg-emerald-400/[0.06]",
  },
];

/* ── Factories ─────────────────────────────────────────────────────── */
const FACTORIES = [
  { name: "Factory Alpha", loc: "Mumbai, IN", pct: 87, units: "1,240/1,420", label: "On Track", stroke: "#10b981", tc: "text-emerald-400", bc: "border-emerald-500/25" },
  { name: "Factory Beta", loc: "Bangalore, IN", pct: 54, units: "432/800", label: "Delayed", stroke: "#f59e0b", tc: "text-amber-400", bc: "border-amber-500/25" },
  { name: "Factory Gamma", loc: "Chennai, IN", pct: 96, units: "384/400", label: "Shipping", stroke: "#3b82f6", tc: "text-blue-400", bc: "border-blue-500/25" },
];

/* ── KPIs ──────────────────────────────────────────────────────────── */
const KPIS = [
  { label: "Active Orders", value: 47, suffix: "", color: "#3b82f6", icon: Activity },
  { label: "In Production", value: 31, suffix: "", color: "#2dd4bf", icon: Building2 },
  { label: "Delayed", value: 4, suffix: "", color: "#f59e0b", icon: AlertTriangle },
  { label: "Completed", value: 128, suffix: "", color: "#10b981", icon: CheckCircle2 },
  { label: "On-Time Rate", value: 94, suffix: "%", color: "#a78bfa", icon: TrendingUp },
];

/* ── Modules ───────────────────────────────────────────────────────── */
const MODULES = [
  { label: "Tech Packs", icon: FileText, text: "text-teal-accent", border: "border-teal-accent/30", bg: "bg-teal-accent/[0.07]" },
  { label: "Print Strike-Off", icon: Zap, text: "text-pink-400", border: "border-pink-500/30", bg: "bg-pink-500/[0.07]" },
  { label: "PP Sample", icon: Layers, text: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/[0.07]" },
  { label: "Fashion Orders", icon: ShieldCheck, text: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/[0.07]" },
  { label: "Production\nTracking", icon: Activity, text: "text-electric-blue", border: "border-electric-blue/40", bg: "bg-electric-blue/[0.10]" },
];

/* ── Hooks ─────────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(0);
    let cur = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [target, duration]);
  return val;
}

/* ── Sub-components ────────────────────────────────────────────────── */
function RingProgress({ pct, stroke }: { pct: number; stroke: string }) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" className="shrink-0">
      <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
      <motion.circle
        cx="30" cy="30" r={r} fill="none" stroke={stroke}
        strokeWidth="4" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        transform="rotate(-90 30 30)"
      />
      <text x="30" y="35" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{pct}%</text>
    </svg>
  );
}

function KpiCard({ kpi, delay }: { kpi: typeof KPIS[0]; delay: number }) {
  const count = useCountUp(kpi.value);
  const Icon = kpi.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-2.5 text-center"
    >
      <Icon size={13} className="mx-auto mb-1" style={{ color: kpi.color }} />
      <div className="text-sm md:text-base font-extrabold leading-none" style={{ color: kpi.color }}>
        {count}{kpi.suffix}
      </div>
      <div className="text-[7px] md:text-[8px] text-white/35 font-bold mt-0.5 leading-tight">{kpi.label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCENE 1 — Logo Reveal                                             */
/* ═══════════════════════════════════════════════════════════════════ */
function Scene1() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
      {/* Radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(59,130,246,0.18),transparent_70%)]" />

      {/* Expanding ring */}
      <motion.div
        initial={{ opacity: 0.5, scale: 0.4 }}
        animate={{ opacity: 0, scale: 2.5 }}
        transition={{ duration: 3.5, ease: "easeOut" }}
        className="absolute size-56 rounded-full border border-electric-blue/25 pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0.3, scale: 0.6 }}
        animate={{ opacity: 0, scale: 3 }}
        transition={{ duration: 3.5, ease: "easeOut", delay: 0.3 }}
        className="absolute size-40 rounded-full border border-electric-blue/15 pointer-events-none"
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.65, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="absolute -inset-14 bg-electric-blue/[0.12] blur-3xl rounded-full pointer-events-none" />
        <Image
          src="/modozo_brand_logo.png"
          alt="MODOZO"
          width={136}
          height={46}
          priority
          className="relative object-contain"
        />
      </motion.div>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52, duration: 0.7 }}
        className="text-center mt-5"
      >
        <div className="text-[9px] md:text-[10px] uppercase tracking-[0.38em] text-electric-blue font-bold mb-2.5">
          Module Overview
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Production Tracking
        </h1>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.85 }}
          className="h-px mt-3.5 bg-gradient-to-r from-transparent via-electric-blue to-transparent"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.55, duration: 0.55 }}
          className="mt-3 text-xs md:text-sm text-white/35 font-medium tracking-widest"
        >
          Plan · Produce · Track · Deliver
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCENE 2 — Production Pipeline                                     */
/* ═══════════════════════════════════════════════════════════════════ */
function Scene2() {
  const [activeStage, setActiveStage] = useState(-1);

  useEffect(() => {
    const timers = PIPELINE.map((_, i) =>
      setTimeout(() => setActiveStage(i), 450 + i * 380)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col px-5 md:px-9 justify-center py-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_18%_50%,rgba(59,130,246,0.08),transparent_70%)]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 md:mb-8"
      >
        <span className="text-[9px] uppercase tracking-[0.32em] text-teal-accent font-bold">
          Production Workflow
        </span>
        <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white mt-1">
          Tech Pack{" "}
          <span className="text-white/25">→</span>{" "}
          <span className="text-electric-blue">Delivered</span>
        </h2>
      </motion.div>

      {/* Pipeline track */}
      <div className="relative">
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-white/[0.05]" />
        <motion.div
          className="absolute top-4 left-0 h-[2px] bg-gradient-to-r from-electric-blue via-teal-accent to-emerald-400"
          initial={{ width: "0%" }}
          animate={{
            width: activeStage >= 0
              ? `${(activeStage / (PIPELINE.length - 1)) * 100}%`
              : "0%",
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />

        <div className="flex justify-between relative">
          {PIPELINE.map((s, idx) => {
            const done = idx < activeStage;
            const active = idx === activeStage;
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 + idx * 0.07, duration: 0.35 }}
                className="flex flex-col items-center z-10 flex-1"
              >
                <div
                  className={`size-8 rounded-full border-2 flex items-center justify-center transition-all duration-400 ${
                    done
                      ? "bg-emerald-500 border-emerald-400"
                      : active
                      ? "bg-[#020c1e] border-electric-blue"
                      : "bg-[#020c1e] border-white/10"
                  }`}
                  style={
                    done
                      ? { boxShadow: "0 0 8px rgba(16,185,129,0.45)" }
                      : active
                      ? { boxShadow: "0 0 14px rgba(59,130,246,0.55)" }
                      : undefined
                  }
                >
                  {done ? (
                    <CheckCircle2 size={12} className="text-white" strokeWidth={3} />
                  ) : (
                    <Icon size={11} className={active ? "text-electric-blue" : "text-white/20"} />
                  )}
                </div>
                <span
                  className={`text-[7px] md:text-[8px] mt-1.5 font-bold text-center ${
                    done
                      ? "text-emerald-400/55"
                      : active
                      ? "text-electric-blue"
                      : "text-white/20"
                  }`}
                >
                  {s.short}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active stage card */}
      <AnimatePresence mode="wait">
        {activeStage >= 0 && (
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-6 flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 backdrop-blur-sm"
          >
            <div className="size-9 shrink-0 rounded-lg bg-electric-blue/[0.12] border border-electric-blue/20 flex items-center justify-center">
              {(() => {
                const Icon = PIPELINE[activeStage].icon;
                return <Icon size={14} className="text-electric-blue" />;
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[8px] text-white/30 font-bold uppercase tracking-wider">
                Current Stage · PO-2024
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {PIPELINE[activeStage].label}
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="size-1.5 rounded-full bg-electric-blue animate-pulse" />
              <span className="text-[9px] text-electric-blue font-bold">Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.4 }}
        className="mt-3 text-[8px] text-white/18 font-medium"
      >
        Stage {Math.max(0, activeStage + 1)} of {PIPELINE.length} complete
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCENE 3 — Live Production Tracking                                */
/* ═══════════════════════════════════════════════════════════════════ */
function Scene3() {
  return (
    <div className="absolute inset-0 flex flex-col px-5 md:px-8 py-5 justify-center gap-3">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_78%_40%,rgba(59,130,246,0.07),transparent_70%)]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex items-center justify-between shrink-0"
      >
        <div>
          <span className="text-[9px] uppercase tracking-[0.32em] text-electric-blue font-bold">
            Live Tracking
          </span>
          <h2 className="text-base md:text-xl font-extrabold text-white mt-0.5">
            Real-Time Production
          </h2>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-full px-2.5 py-1 shrink-0">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-400 font-bold">Live</span>
        </div>
      </motion.div>

      {/* Order cards */}
      <div className="flex flex-col gap-2">
        {ORDERS.map((o, i) => (
          <motion.div
            key={o.po}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 + i * 0.18, duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 backdrop-blur-sm"
          >
            {/* Thumb + scan */}
            <div className="relative size-11 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
              <Image src={o.image} alt={o.name} width={40} height={40} className="object-contain" />
              <motion.div
                className="absolute left-0 right-0 h-[1.5px] bg-emerald-400 pointer-events-none"
                style={{ boxShadow: "0 0 5px rgba(52,211,153,0.8)" }}
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: i * 0.65 }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] text-white/35 font-bold">{o.po} · {o.factory}</span>
                <div className="flex items-center gap-1">
                  {o.delay && (
                    <span className="flex items-center gap-0.5 text-[7px] px-1 py-0.5 rounded border text-amber-400 border-amber-400/20 bg-amber-400/5 font-medium">
                      <AlertTriangle size={6} /> Delay
                    </span>
                  )}
                  <span className={`text-[7px] md:text-[8px] px-1.5 py-0.5 rounded border font-medium ${o.sc}`}>
                    {o.status}
                  </span>
                </div>
              </div>

              <div className="text-[10px] md:text-[11px] font-bold text-white mb-1.5 truncate">
                {o.name}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-white/[0.07] rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      o.delay
                        ? "bg-gradient-to-r from-amber-500 to-amber-400"
                        : "bg-gradient-to-r from-electric-blue to-teal-accent"
                    }`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${o.progress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.55 + i * 0.2 }}
                  />
                </div>
                <span className="text-[9px] font-bold text-white shrink-0">{o.progress}%</span>
              </div>
              <div className="text-[7px] text-white/25 mt-0.5 font-mono">{o.units} pcs</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCENE 4 — Factory Visibility + Dashboard KPIs                     */
/* ═══════════════════════════════════════════════════════════════════ */
function Scene4() {
  return (
    <div className="absolute inset-0 flex flex-col px-5 md:px-8 py-5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_28%,rgba(59,130,246,0.07),transparent_70%)]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-4 shrink-0"
      >
        <span className="text-[9px] uppercase tracking-[0.32em] text-purple-400 font-bold">
          Factory Visibility
        </span>
        <h2 className="text-base md:text-xl font-extrabold text-white mt-0.5">
          Multi-Factory Dashboard
        </h2>
      </motion.div>

      {/* Factory cards */}
      <div className="grid grid-cols-3 gap-2 mb-3 flex-1">
        {FACTORIES.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 + i * 0.18, duration: 0.5, ease: "easeOut" }}
            className={`bg-white/[0.04] border ${f.bc} rounded-xl p-3 flex flex-col items-center gap-1.5`}
          >
            <RingProgress pct={f.pct} stroke={f.stroke} />
            <div className="text-center">
              <div className="text-[9px] md:text-[10px] font-bold text-white">{f.name}</div>
              <div className="text-[7px] md:text-[8px] text-white/35">{f.loc}</div>
              <div className="text-[7px] text-white/35 font-mono mt-0.5">{f.units} pcs</div>
              <span className={`text-[7px] md:text-[8px] font-bold ${f.tc} mt-0.5 block`}>{f.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-5 gap-1.5 shrink-0">
        {KPIS.map((kpi, i) => (
          <KpiCard key={kpi.label} kpi={kpi} delay={0.72 + i * 0.1} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCENE 5 — Smart Alerts                                            */
/* ═══════════════════════════════════════════════════════════════════ */
function Scene5() {
  return (
    <div className="absolute inset-0 flex flex-col px-5 md:px-9 py-7 justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(245,158,11,0.06),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.48 }}
        className="mb-5"
      >
        <span className="text-[9px] uppercase tracking-[0.32em] text-amber-400 font-bold">
          Smart Alerts
        </span>
        <h2 className="text-lg md:text-2xl font-extrabold text-white mt-1">
          Delay Detection & Action
        </h2>
      </motion.div>

      {/* Primary alert card */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.28, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
        className="bg-amber-500/[0.06] border border-amber-500/25 rounded-2xl p-4 md:p-5 mb-3"
      >
        <div className="flex items-start gap-3 mb-4">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 8px rgba(245,158,11,0.25)",
                "0 0 22px rgba(245,158,11,0.55)",
                "0 0 8px rgba(245,158,11,0.25)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="size-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0"
          >
            <AlertTriangle size={18} className="text-amber-400" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="text-[8px] text-amber-400/60 font-bold uppercase tracking-wider">
              Auto-Detected · PO-2025
            </div>
            <div className="text-sm md:text-base font-bold text-white mt-0.5">
              Printing Delay Detected
            </div>
          </div>
          <div className="text-[8px] text-white/25 font-mono shrink-0">18:10:45</div>
        </div>

        <div className="space-y-1.5 mb-4">
          {[
            { label: "Bottleneck", value: "Print Station 1 — ink calibration failure" },
            { label: "Impact", value: "+3 day delay · New ETA: Jun 22" },
            { label: "Action", value: "Redirect batch to Print Station 3" },
          ].map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.16, duration: 0.38 }}
              className="flex gap-2 text-[9px] md:text-[10px]"
            >
              <span className="text-white/35 font-bold shrink-0 w-20">{row.label}:</span>
              <span className="text-white/65">{row.value}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          <button className="text-[9px] px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold hover:bg-amber-500/30 transition-colors">
            Notify Factory
          </button>
          <button className="text-[9px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/55 font-bold hover:bg-white/10 transition-colors">
            Adjust Timeline
          </button>
          <button className="text-[9px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/55 font-bold hover:bg-white/10 transition-colors">
            View Details
          </button>
        </motion.div>
      </motion.div>

      {/* Secondary info row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.55, duration: 0.4 }}
        className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-3"
      >
        <div className="size-7 rounded-lg bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center shrink-0">
          <Activity size={12} className="text-electric-blue" />
        </div>
        <span className="text-[9px] md:text-[10px] text-white/55">
          Timeline auto-adjusted · Factory notified · ETA recalibrated to Jun 22
        </span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCENE 6 — End-to-End Visibility + Finale                         */
/* ═══════════════════════════════════════════════════════════════════ */
function Scene6() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-5 py-7 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_50%,rgba(59,130,246,0.16),transparent_70%)]" />

      {/* Module chain */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1 md:gap-2 mb-7 flex-wrap justify-center"
      >
        {MODULES.map((mod, i) => {
          const Icon = mod.icon;
          const isLast = i === MODULES.length - 1;
          return (
            <div key={mod.label} className="flex items-center gap-1 md:gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.82, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.2, duration: 0.42, ease: "easeOut" }}
                className={`flex flex-col items-center gap-1 px-2 md:px-3 py-2.5 rounded-xl ${mod.bg} border ${mod.border} backdrop-blur-sm`}
                style={
                  isLast
                    ? { boxShadow: "0 0 18px rgba(59,130,246,0.18)" }
                    : undefined
                }
              >
                <Icon size={13} className={mod.text} />
                <span
                  className={`text-[7px] md:text-[8px] font-bold ${mod.text} text-center leading-tight`}
                  style={{ maxWidth: 68 }}
                >
                  {mod.label}
                </span>
              </motion.div>

              {!isLast && (
                <motion.span
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.38 + i * 0.2, duration: 0.28 }}
                  className="text-white/20 text-xs font-bold"
                >
                  →
                </motion.span>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.6, ease: "easeOut" }}
        className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white text-center tracking-tight leading-tight mb-3"
      >
        Fashion Production.{" "}
        <span className="bg-gradient-to-r from-electric-blue to-teal-accent bg-clip-text text-transparent">
          Fully Connected.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.88, duration: 0.5 }}
        className="text-xs md:text-sm text-white/38 font-medium mb-6 text-center tracking-widest"
      >
        Plan · Produce · Track · Deliver
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.28, duration: 0.45 }}
        className="px-4 py-2 rounded-xl bg-electric-blue/[0.09] border border-electric-blue/25 backdrop-blur-sm"
      >
        <span className="text-[9px] md:text-[10px] text-electric-blue font-bold uppercase tracking-widest">
          Production Tracking Available in MODOZO
        </span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Main Component                                                    */
/* ═══════════════════════════════════════════════════════════════════ */
const SCENES = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];

export default function ProductionTrackingVisual() {
  const [scene, setScene] = useState(1);
  const [sceneProgress, setSceneProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    setSceneProgress(0);
    const dur = SCENE_DURATIONS[scene - 1];
    let elapsed = 0;

    progressTimerRef.current = setInterval(() => {
      elapsed += 50;
      setSceneProgress(Math.min((elapsed / dur) * 100, 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      setScene((s) => (s >= TOTAL_SCENES ? 1 : s + 1));
    }, dur);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [scene]);

  const SceneComponent = SCENES[scene - 1];

  return (
    <div className="w-full aspect-video bg-[#020812] rounded-2xl overflow-hidden border border-white/10 relative shadow-[0_24px_60px_rgba(0,0,0,0.65)]">

      {/* Ambient grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.028] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Corner glows */}
      <div className="absolute top-0 left-0 w-52 h-52 bg-electric-blue/[0.08] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-44 h-44 bg-teal-accent/[0.06] blur-3xl pointer-events-none" />

      {/* Scene render */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <SceneComponent />
        </motion.div>
      </AnimatePresence>

      {/* Bottom controls bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-4 flex items-center gap-3 bg-gradient-to-t from-[#020812]/80 to-transparent pointer-events-none">
        {/* Scene progress line */}
        <div className="flex-1 h-[2px] bg-white/[0.07] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-electric-blue to-teal-accent rounded-full transition-none"
            style={{ width: `${sceneProgress}%` }}
          />
        </div>

        {/* Scene dots */}
        <div className="flex items-center gap-1.5 pointer-events-auto shrink-0">
          {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setScene(i + 1)}
              className={`rounded-full transition-all duration-300 ${
                i === scene - 1
                  ? "w-4 h-1.5 bg-electric-blue"
                  : "size-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Replay */}
        <button
          onClick={() => setScene(1)}
          className="size-5 flex items-center justify-center text-white/25 hover:text-white/55 transition-colors shrink-0 pointer-events-auto"
        >
          <RefreshCw size={11} />
        </button>
      </div>

      {/* Scene counter */}
      <div className="absolute top-3 right-3.5 text-[8px] text-white/18 font-mono font-bold pointer-events-none">
        {scene} / {TOTAL_SCENES}
      </div>
    </div>
  );
}
