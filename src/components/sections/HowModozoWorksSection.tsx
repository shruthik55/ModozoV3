"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { FileText, MessageSquare, ClipboardCheck, BarChart3 } from "lucide-react";

/* ─── Stage definitions ─── */
const STAGES = [
  {
    id: 1,
    step: "01",
    shortTitle: "Tech Packs",
    title: "Create Line Sheets & Tech Packs",
    tagline: "Line Sheet → Tech Pack",
    description:
      "Upload designs, specifications, BOMs, and references.",
    color: "#0F62FE",
    bullets: [
      "Line Sheets converted to factory-ready Tech Packs",
      "BOMs and POMs auto-linked per version",
      "Design details and references in one style record",
    ],
    icon: FileText,
  },
  {
    id: 2,
    step: "02",
    shortTitle: "Collaborate",
    title: "Collaborate with Teams & Vendors",
    tagline: "One Thread. All Stakeholders.",
    description:
      "Share updates, comments, approvals, and costing in one place.",
    color: "#F59E0B",
    bullets: [
      "In-context comments attached to style specs",
      "Vendor updates and approvals tracked per style",
      "No more email chains or version confusion",
    ],
    icon: MessageSquare,
  },
  {
    id: 3,
    step: "03",
    shortTitle: "Sampling",
    title: "Track Sampling & Production",
    tagline: "Sample Development to Final Dispatch",
    description:
      "Monitor TNA, approvals, production stages, and inspections.",
    color: "#EF4444",
    bullets: [
      "Five-stage production lifecycle per style",
      "Sample and production approvals with digital sign-off",
      "Inspection reports linked to style record",
    ],
    icon: ClipboardCheck,
  },
  {
    id: 4,
    step: "04",
    shortTitle: "Analytics",
    title: "Analyze Performance",
    tagline: "Style-Level Operational Insights",
    description:
      "Use dashboards and analytics to improve visibility and planning.",
    color: "#10B981",
    bullets: [
      "Production progress and dispatch status per style",
      "Approval cycle time and lead time tracking",
      "Vendor performance scores by collection",
    ],
    icon: BarChart3,
  },
] as const;

/* ─── Jacket illustration — uses the real Cheetah Jacket photo as base ─── */
const JACKET = "/showcase_cheetah.png";

function TShirtIllustration({ step }: { step: number }) {
  /* Phase cycling for step 1: 0 = Line Sheet, 1 = Tech Pack */
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (step !== 1) return;
    const t = setInterval(() => setPhase((p) => 1 - p), 2400);
    return () => clearInterval(t);
  }, [step]);

  /* ── Card 1 — Line Sheet ↔ Tech Pack animated cycle ── */
  if (step === 1) {
    const isLS = phase === 0;
    return (
      <svg viewBox="0 0 180 200" className="w-full h-full">
        {/* Base jacket photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <image href={JACKET} x="0" y="0" width="180" height="168" preserveAspectRatio="xMidYMid meet" />

        {/* ── Line Sheet phase overlay ── */}
        <motion.g animate={{ opacity: isLS ? 1 : 0 }} transition={{ duration: 0.7 }}>
          {/* Blue sketch tint */}
          <rect x="0" y="0" width="180" height="168" fill="rgba(15,98,254,0.22)" />
          {/* Dashed border */}
          <rect x="2" y="2" width="176" height="164" fill="none" stroke="#0F62FE" strokeWidth="1.5" strokeDasharray="7 3" rx="2" />
          {/* Grid lines */}
          <line x1="0" y1="84" x2="180" y2="84" stroke="#0F62FE" strokeWidth="0.5" opacity="0.3" />
          <line x1="90" y1="0" x2="90" y2="168" stroke="#0F62FE" strokeWidth="0.5" opacity="0.3" />
          <text x="90" y="148" textAnchor="middle" fontSize="7" fill="#4d90fe" fontFamily="monospace" opacity="0.8">FRONT VIEW</text>
          {/* Active label */}
          <rect x="20" y="172" width="140" height="19" rx="4" fill="rgba(15,98,254,0.22)" stroke="rgba(15,98,254,0.5)" strokeWidth="1" />
          <text x="90" y="185" textAnchor="middle" fontSize="8.5" fill="white" fontFamily="monospace" fontWeight="bold">LINE SHEET</text>
        </motion.g>

        {/* ── Tech Pack phase overlay ── */}
        <motion.g animate={{ opacity: isLS ? 0 : 1 }} transition={{ duration: 0.7 }}>
          {/* Subtle dark tint to make callouts readable */}
          <rect x="0" y="0" width="180" height="168" fill="rgba(2,8,20,0.38)" />
          {/* Border */}
          <rect x="2" y="2" width="176" height="164" fill="none" stroke="#0F62FE" strokeWidth="1.2" opacity="0.5" rx="2" />
          {/* Chest width */}
          <line x1="18" y1="100" x2="162" y2="100" stroke="#0F62FE" strokeWidth="0.9" opacity="0.7" strokeDasharray="4 2" />
          <line x1="18" y1="97" x2="18" y2="103" stroke="#0F62FE" strokeWidth="1.4" opacity="0.7" />
          <line x1="162" y1="97" x2="162" y2="103" stroke="#0F62FE" strokeWidth="1.4" opacity="0.7" />
          <rect x="56" y="90" width="68" height="10" rx="2" fill="rgba(2,8,20,0.7)" />
          <text x="90" y="98" textAnchor="middle" fontSize="6.5" fill="#4d90fe" fontFamily="monospace">58.0 cm ±0.5</text>
          {/* BOM callout */}
          <rect x="12" y="130" width="156" height="24" rx="3" fill="rgba(2,8,20,0.78)" stroke="rgba(15,98,254,0.4)" strokeWidth="0.9" />
          <text x="90" y="141" textAnchor="middle" fontSize="6" fill="#0F62FE" fontFamily="monospace" fontWeight="bold">Leopard Print Leather · BOM</text>
          <text x="90" y="150" textAnchor="middle" fontSize="5.5" fill="#7fb3ff" fontFamily="monospace">60% Leather / 40% PU · 850gsm</text>
          {/* Active label */}
          <rect x="20" y="172" width="140" height="19" rx="4" fill="rgba(15,98,254,0.3)" stroke="rgba(15,98,254,0.65)" strokeWidth="1" />
          <text x="90" y="185" textAnchor="middle" fontSize="8.5" fill="white" fontFamily="monospace" fontWeight="bold">TECH PACK v1.0</text>
        </motion.g>

        {/* Style ID — always on top */}
        <rect x="4" y="4" width="66" height="13" rx="3" fill="rgba(15,98,254,0.9)" />
        <text x="37" y="14" textAnchor="middle" fontSize="6" fill="white" fontFamily="monospace" fontWeight="bold">MDZ-CJ-SS26</text>

        {/* Phase indicator dots */}
        <circle cx="82" cy="197" r="2.5" fill={isLS ? "#0F62FE" : "rgba(15,98,254,0.28)"} />
        <circle cx="90" cy="197" r="2" fill="rgba(15,98,254,0.2)" />
        <circle cx="98" cy="197" r="2.5" fill={isLS ? "rgba(15,98,254,0.28)" : "#0F62FE"} />
      </svg>
    );
  }

  /* ── Card 2 — Collaborate: jacket with conversation bubbles ── */
  if (step === 2) {
    return (
      <svg viewBox="0 0 180 200" className="w-full h-full">
        {/* Base jacket photo — fills full width */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <image href={JACKET} x="0" y="0" width="180" height="162" preserveAspectRatio="xMidYMid meet" />
        {/* Dark overlay so bubbles read clearly */}
        <rect x="0" y="0" width="180" height="162" fill="rgba(10,20,40,0.48)" />
        {/* Amber border */}
        <rect x="0" y="0" width="180" height="162" fill="none" stroke="#F59E0B" strokeWidth="1.4" rx="2" />
        {/* Style badge — centered mid-jacket */}
        <rect x="52" y="72" width="76" height="14" rx="3" fill="rgba(245,158,11,0.18)" stroke="rgba(245,158,11,0.45)" strokeWidth="0.8" />
        <text x="90" y="82" textAnchor="middle" fontSize="6" fill="#F59E0B" fontFamily="monospace" fontWeight="bold">MDZ-CJ-SS26</text>
        {/* Sourcing Manager bubble — top left, overlaid */}
        <rect x="2" y="5" width="82" height="36" rx="5" fill="rgba(15,98,254,0.93)" />
        <polygon points="82,18 88,24 82,30" fill="rgba(15,98,254,0.93)" />
        <text x="8" y="17" fontSize="5.5" fill="white" fontFamily="monospace" fontWeight="bold">Sourcing Mgr:</text>
        <text x="8" y="27" fontSize="5" fill="#dbeafe" fontFamily="monospace">&quot;Can lining be updated</text>
        <text x="8" y="37" fontSize="5" fill="#dbeafe" fontFamily="monospace">to recycled satin?&quot;</text>
        {/* Vendor bubble — top right, overlaid */}
        <rect x="96" y="5" width="82" height="36" rx="5" fill="rgba(202,138,4,0.95)" />
        <polygon points="96,18 90,24 96,30" fill="rgba(202,138,4,0.95)" />
        <text x="102" y="17" fontSize="5.5" fill="white" fontFamily="monospace" fontWeight="bold">Vendor:</text>
        <text x="102" y="27" fontSize="5" fill="#fef3c7" fontFamily="monospace">&quot;Yes, updated</text>
        <text x="102" y="37" fontSize="5" fill="#fef3c7" fontFamily="monospace">version ready.&quot;</text>
        {/* Approval bar — below jacket */}
        <rect x="4" y="166" width="172" height="28" rx="5" fill="rgba(16,185,129,0.88)" />
        <polygon points="84,166 80,160 88,166" fill="rgba(16,185,129,0.88)" />
        <text x="90" y="178" textAnchor="middle" fontSize="5.5" fill="white" fontFamily="monospace" fontWeight="bold">Sourcing Mgr: &quot;Looks good — proceed.&quot;</text>
        <text x="90" y="189" textAnchor="middle" fontSize="5" fill="#d1fae5" fontFamily="monospace">Approved for sample development ✓</text>
      </svg>
    );
  }

  /* ── Card 3 — Track: jacket in sampling/production state ── */
  if (step === 3) {
    return (
      <svg viewBox="0 0 180 200" className="w-full h-full">
        {/* Base jacket photo — fills full width */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <image href={JACKET} x="0" y="0" width="180" height="172" preserveAspectRatio="xMidYMid meet" />
        {/* Navy-red tint */}
        <rect x="0" y="0" width="180" height="172" fill="rgba(20,40,90,0.35)" />
        {/* Red border */}
        <rect x="0" y="0" width="180" height="172" fill="none" stroke="#EF4444" strokeWidth="1.4" rx="2" />
        {/* Style ID */}
        <rect x="47" y="4" width="86" height="15" rx="3" fill="rgba(239,68,68,0.92)" />
        <text x="90" y="15" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="monospace" fontWeight="bold">MDZ-CJ-SS26</text>
        {/* Sample stage badge */}
        <rect x="42" y="72" width="96" height="17" rx="3" fill="rgba(239,68,68,0.18)" stroke="rgba(239,68,68,0.5)" strokeWidth="0.9" />
        <text x="90" y="84" textAnchor="middle" fontSize="6.5" fill="#EF4444" fontFamily="monospace" fontWeight="bold">PP SAMPLE #02</text>
        {/* Approval check marks */}
        <circle cx="18" cy="44" r="10" fill="rgba(16,185,129,0.18)" stroke="#10B981" strokeWidth="1.5" />
        <text x="18" y="48" textAnchor="middle" fontSize="10" fill="#10B981">✓</text>
        <circle cx="162" cy="44" r="10" fill="rgba(16,185,129,0.18)" stroke="#10B981" strokeWidth="1.5" />
        <text x="162" y="48" textAnchor="middle" fontSize="10" fill="#10B981">✓</text>
        {/* Inspection dashed ring */}
        <circle cx="90" cy="110" r="34" fill="none" stroke="rgba(239,68,68,0.3)" strokeWidth="1" strokeDasharray="5 3" />
        {/* Color approval chip */}
        <rect x="42" y="150" width="96" height="22" rx="3" fill="rgba(2,8,20,0.82)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        <text x="90" y="160" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.5)" fontFamily="monospace">LEOPARD PRINT</text>
        <text x="90" y="170" textAnchor="middle" fontSize="6" fill="#86efac" fontFamily="monospace" fontWeight="bold">APPROVED ✓</text>
        {/* Status text below image */}
        <text x="90" y="186" textAnchor="middle" fontSize="6" fill="rgba(239,68,68,0.7)" fontFamily="monospace">Production Started</text>
      </svg>
    );
  }

  /* ── Card 4 — Analytics: jacket with data overlay ── */
  return (
    <svg viewBox="0 0 180 200" className="w-full h-full">
      <defs>
        <radialGradient id="s4glow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(16,185,129,0.18)" /><stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Base jacket photo — fills full width */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <image href={JACKET} x="0" y="0" width="180" height="168" preserveAspectRatio="xMidYMid meet" />
      {/* Dark-green tint */}
      <rect x="0" y="0" width="180" height="168" fill="rgba(2,12,8,0.42)" />
      <rect x="0" y="0" width="180" height="200" fill="url(#s4glow2)" />
      {/* Emerald border */}
      <rect x="0" y="0" width="180" height="168" fill="none" stroke="#10B981" strokeWidth="1.4" rx="2" />
      {/* Style complete badge */}
      <rect x="38" y="4" width="104" height="16" rx="3" fill="rgba(16,185,129,0.18)" stroke="rgba(16,185,129,0.48)" strokeWidth="1" />
      <text x="90" y="15" textAnchor="middle" fontSize="6.5" fill="#10B981" fontFamily="monospace" fontWeight="bold">MDZ-CJ-SS26 ✓</text>
      {/* Lead Time */}
      <rect x="4" y="84" width="62" height="36" rx="4" fill="rgba(2,8,20,0.82)" stroke="rgba(16,185,129,0.4)" strokeWidth="0.9" />
      <text x="35" y="98" textAnchor="middle" fontSize="5.5" fill="#6ee7b7" fontFamily="monospace">LEAD TIME</text>
      <text x="35" y="115" textAnchor="middle" fontSize="14" fill="#10B981" fontFamily="monospace" fontWeight="bold">38d</text>
      {/* Vendor Performance */}
      <rect x="114" y="84" width="62" height="36" rx="4" fill="rgba(2,8,20,0.82)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.9" />
      <text x="145" y="98" textAnchor="middle" fontSize="5.5" fill="#94a3b8" fontFamily="monospace">VENDOR</text>
      <text x="145" y="115" textAnchor="middle" fontSize="14" fill="white" fontFamily="monospace" fontWeight="bold">94%</text>
      {/* Bar chart */}
      <rect x="54" y="130" width="72" height="30" rx="3" fill="rgba(2,8,20,0.75)" />
      <rect x="62" y="149" width="8" height="7" fill="#10B981" opacity="0.5" />
      <rect x="73" y="143" width="8" height="13" fill="#10B981" opacity="0.65" />
      <rect x="84" y="136" width="8" height="20" fill="#10B981" opacity="0.82" />
      <rect x="95" y="140" width="8" height="16" fill="#10B981" />
      <rect x="106" y="135" width="8" height="21" fill="#10B981" opacity="0.9" />
      {/* Dispatch label */}
      <text x="90" y="182" textAnchor="middle" fontSize="6" fill="#6ee7b7" fontFamily="monospace">Dispatch: On Track ✓</text>
    </svg>
  );
}

/* ─── Dashboard panels ─── */
function StepDashboard({ step, color }: { step: number; color: string }) {
  /* Card 1 — Tech Pack spec sheet */
  if (step === 1) {
    return (
      <div className="w-full rounded-xl border bg-black/35 border-white/[0.06] p-2.5 font-mono text-[8px]">
        <div className="flex justify-between items-center border-b border-white/[0.07] pb-1.5 mb-2">
          <span className="text-white font-bold text-[8px]">MDZ-CJ-SS26 · Cheetah Jacket</span>
          <span className="px-1.5 py-0.5 rounded text-[7px] font-bold" style={{ backgroundColor: `${color}18`, color, border: `1px solid ${color}30` }}>TECH PACK v1.0</span>
        </div>
        <div className="text-[6px] text-slate-600 font-bold uppercase tracking-widest pb-1 mb-1 border-b border-white/[0.04]">
          Line Sheet → Tech Pack
        </div>
        <div className="grid grid-cols-3 text-[6.5px] text-slate-500 font-bold uppercase tracking-wider pb-1">
          <span>POM</span><span className="text-center">Value</span><span className="text-right">Tol.</span>
        </div>
        {[["Chest Width", "52.0 cm", "±0.5"], ["Body Length", "68.0 cm", "±1.0"], ["Sleeve", "63.0 cm", "±0.5"]].map(([l, v, t]) => (
          <div key={l} className="grid grid-cols-3 py-0.5 border-b border-white/[0.04] text-slate-300">
            <span>{l}</span><span className="text-center text-white font-bold">{v}</span><span className="text-right text-emerald-400">{t}</span>
          </div>
        ))}
        <div className="mt-1.5 rounded-lg p-1.5" style={{ backgroundColor: `${color}0d`, border: `1px solid ${color}22` }}>
          <div className="font-black uppercase tracking-wider mb-0.5 text-[6.5px]" style={{ color }}>BOM · Shell Fabric</div>
          <div className="flex justify-between text-slate-300 text-[7px]">
            <span>60% Leather / 40% PU</span><span className="text-white font-semibold">850gsm</span>
          </div>
        </div>
      </div>
    );
  }

  /* Card 2 — Collaboration conversation with profile photos */
  if (step === 2) {
    const msgs = [
      {
        avatar: "/avatars/avatar1.png",
        name: "Sourcing Manager",
        time: "10:14",
        msg: "Can the fabric composition be updated to recycled cotton for this style?",
        right: false,
        color: "#0F62FE",
      },
      {
        avatar: "/avatars/avatar2.png",
        name: "Vendor",
        time: "10:47",
        msg: "Yes, updated version is ready for review.",
        right: true,
        color: "#F59E0B",
      },
      {
        avatar: "/avatars/avatar1.png",
        name: "Sourcing Manager",
        time: "11:02",
        msg: "Looks good. Proceed with sample development.",
        right: false,
        color: "#10B981",
      },
    ];
    return (
      <div className="w-full rounded-xl border bg-black/35 border-white/[0.06] p-2.5 font-mono text-[8px]">
        <div className="flex justify-between items-center border-b border-white/[0.07] pb-1.5 mb-2">
          <span className="text-white font-bold text-[8px]">MDZ-CJ-SS26 · COLLAB</span>
          <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[7px] font-bold">Live</span>
        </div>
        <div className="space-y-1.5">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-1.5 items-start ${m.right ? "flex-row-reverse" : ""}`}>
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
                <Image src={m.avatar} alt={m.name} width={20} height={20} className="w-full h-full object-cover" />
              </div>
              <div className={`rounded-lg p-1.5 flex-1 ${m.right ? "text-right" : ""}`} style={{ backgroundColor: `${m.color}12`, border: `1px solid ${m.color}22` }}>
                <div className="text-[6px] text-slate-500 font-bold mb-0.5">{m.name} · {m.time}</div>
                <p className="text-slate-200 text-[7px] leading-relaxed">{m.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* Card 4 — Analytics dashboard */
  return (
    <div className="w-full rounded-xl border bg-black/35 border-white/[0.06] p-2.5 font-mono text-[8px]">
      <div className="flex justify-between items-center border-b border-white/[0.07] pb-1.5 mb-2">
        <span className="text-white font-bold text-[8px]">MDZ-CJ-SS26 · ANALYTICS</span>
        <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[7px] font-bold">On Track</span>
      </div>
      {/* Top 3 KPIs */}
      <div className="grid grid-cols-3 gap-1 mb-1">
        {[
          { l: "Prod. Progress", v: "67%", c: "#10B981" },
          { l: "Approval Cycle", v: "4 days", c: "white" },
          { l: "Vendor Perf.", v: "94%", c: "#10B981" },
        ].map((k) => (
          <div key={k.l} className="bg-white/[0.04] border border-white/[0.05] rounded-lg p-1 text-center">
            <div className="text-slate-500 font-bold text-[5px] tracking-wider leading-tight mb-0.5">{k.l}</div>
            <div className="font-black text-[10px]" style={{ color: k.c }}>{k.v}</div>
          </div>
        ))}
      </div>
      {/* Dispatch Status + Lead Time */}
      <div className="grid grid-cols-2 gap-1 mb-1.5">
        {[
          { l: "Dispatch Status", v: "On Track", c: "#10B981" },
          { l: "Lead Time", v: "38 days", c: "white" },
        ].map((k) => (
          <div key={k.l} className="bg-white/[0.04] border border-white/[0.05] rounded-lg p-1 text-center">
            <div className="text-slate-500 font-bold text-[5px] tracking-wider mb-0.5">{k.l}</div>
            <div className="font-bold text-[9px]" style={{ color: k.c }}>{k.v}</div>
          </div>
        ))}
      </div>
      {/* Bar chart — production progress over weeks */}
      <div className="flex items-end gap-0.5 h-6 bg-black/20 rounded-lg px-2 py-1">
        {[55, 68, 80, 74, 88, 94, 91].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-emerald-500" style={{ height: `${h}%`, opacity: 0.4 + i * 0.08 }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Step 3 inline tracker (lives in the right content panel) ─── */
function Step3Tracker({ color }: { color: string }) {
  const stages = [
    { label: "Sample Development", done: true, cur: false },
    { label: "Sample Approval", done: true, cur: false },
    { label: "Production Started", done: false, cur: true },
    { label: "Inspection", done: false, cur: false },
    { label: "Final Dispatch", done: false, cur: false },
  ];
  return (
    <div className="mt-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">TNA Milestones</span>
        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded"
          style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}28` }}>
          60% Complete
        </span>
      </div>
      <div className="w-full h-1 rounded-full bg-white/[0.07] overflow-hidden mb-3">
        <div className="h-full rounded-full" style={{ width: "60%", backgroundColor: color }} />
      </div>
      <div className="space-y-2">
        {stages.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
              style={{
                backgroundColor: s.done ? "#10B981" : s.cur ? `${color}20` : "rgba(255,255,255,0.04)",
                borderColor: s.done ? "#10B981" : s.cur ? color : "rgba(255,255,255,0.12)",
              }}>
              {s.done && <span className="text-[8px] text-white font-black">✓</span>}
              {s.cur && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
            </div>
            <span className="flex-1 text-[11px]" style={{
              color: s.done ? "rgba(148,163,184,0.4)" : s.cur ? "white" : "rgba(100,116,139,0.55)",
              fontWeight: s.cur ? 700 : 400,
              textDecoration: s.done ? "line-through" : "none",
            }}>{s.label}</span>
            {s.cur && (
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}25` }}>
                In Progress
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Compressed card (narrow state) ─── */
function CompressedCard({ stage }: { stage: typeof STAGES[number] }) {
  const Icon = stage.icon;
  return (
    <div className="h-full flex flex-col items-center justify-between py-5 px-2 select-none">
      <span className="text-[10px] font-black font-mono" style={{ color: stage.color }}>
        {stage.step}
      </span>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${stage.color}15`, border: `1.5px solid ${stage.color}30` }}
      >
        <Icon size={16} style={{ color: stage.color }} />
      </div>
      <span
        className="text-[9px] font-bold uppercase tracking-widest font-mono"
        style={{
          color: `${stage.color}80`,
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        {stage.shortTitle}
      </span>
    </div>
  );
}

/* ─── Expanded card (wide state) ─── */
function ExpandedCard({ stage }: { stage: typeof STAGES[number] }) {
  const isStep3 = stage.id === 3;
  return (
    <div className="h-full flex overflow-hidden">
      {/* Left — garment illustration */}
      <div
        className="w-[44%] flex items-center justify-center p-2 border-r shrink-0"
        style={{ borderColor: `${stage.color}10` }}
      >
        <div className="w-full h-full">
          <TShirtIllustration step={stage.id} />
        </div>
      </div>
      {/* Right — content, vertically centered */}
      <div className="flex-1 flex flex-col justify-center p-5 gap-3 min-w-0 overflow-hidden">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[9px] font-black font-mono px-2 py-0.5 rounded"
            style={{ backgroundColor: `${stage.color}18`, color: stage.color, border: `1px solid ${stage.color}28` }}
          >
            STEP {stage.step}
          </span>
          <span className="text-[9px] text-white/25 font-mono uppercase tracking-wider truncate">{stage.tagline}</span>
        </div>
        <h3 className="text-base font-black text-white leading-tight">{stage.title}</h3>
        <p className="text-[11px] text-slate-400 leading-relaxed">{stage.description}</p>
        {isStep3
          ? <Step3Tracker color={stage.color} />
          : <StepDashboard step={stage.id} color={stage.color} />
        }
      </div>
    </div>
  );
}

/* ─── Thread SVG (logo → cards) ─── */
const THREAD_ENDPOINTS = [160, 440, 720, 1000] as const;

function ThreadSVG({ activeStep }: { activeStep: number }) {
  const threads = STAGES.map((s, i) => ({
    color: s.color,
    id: s.id,
    ex: THREAD_ENDPOINTS[i],
  }));
  return (
    <svg
      viewBox="0 0 1160 80"
      className="w-full"
      height="80"
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        {threads.map((t) => (
          <filter key={`gf-${t.id}`} id={`gf-${t.id}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        ))}
      </defs>
      {threads.map((t) => {
        const isActive = activeStep === t.id;
        const cx = 580;
        const cy = 0;
        const ex = t.ex;
        const ey = 80;
        const cpx = cx + (ex - cx) * 0.3;
        const cpy = 50;
        return (
          <motion.path
            key={t.id}
            d={`M ${cx},${cy} C ${cpx},${cpy} ${ex - (ex - cx) * 0.1},${ey - 20} ${ex},${ey}`}
            fill="none"
            stroke={t.color}
            animate={{
              strokeOpacity: isActive ? 1 : 0.18,
              strokeWidth: isActive ? 2.5 : 1.2,
            }}
            transition={{ duration: 0.45 }}
            style={{
              filter: isActive ? `url(#gf-${t.id})` : "none",
            }}
          />
        );
      })}
      {threads.map((t) => (
        <motion.circle
          key={`dot-${t.id}`}
          cx={t.ex}
          cy={80}
          r={4}
          fill={t.color}
          animate={{ opacity: activeStep === t.id ? 1 : 0.2, r: activeStep === t.id ? 5 : 3 }}
          transition={{ duration: 0.35 }}
        />
      ))}
    </svg>
  );
}

/* ─── Main section ─── */
export default function HowModozoWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.27)       setActiveStep(1);
    else if (v < 0.52)  setActiveStep(2);
    else if (v < 0.77)  setActiveStep(3);
    else                setActiveStep(4);
  });

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="relative h-[600vh] bg-[#040b17]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(15,98,254,0.05),transparent_65%)]" />
      </div>

      {/* ─── Sticky viewport ─── */}
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden z-10">

        {/* Section title */}
        <div className="pt-6 pb-1 text-center shrink-0">
          <p className="text-[9px] font-mono font-bold text-white/20 tracking-[0.35em] uppercase">Section 5</p>
          <h2 className="text-xl font-black text-white tracking-[0.2em] uppercase font-mono">
            How Modozo Works
          </h2>
        </div>

        {/* Logo + threads */}
        <div className="relative flex flex-col items-center w-full max-w-[1160px] px-4 shrink-0">
          <Image
            src="/logo4.png"
            alt="Modozo"
            width={200}
            height={70}
            className="h-[52px] w-auto"
            priority
          />
          <ThreadSVG activeStep={activeStep} />
        </div>

        {/* ─── Cards row ─── */}
        <div className="flex-1 w-full max-w-[1160px] px-4 pb-6 flex gap-2.5 min-h-0">
          {STAGES.map((stage) => {
            const isActive = activeStep === stage.id;
            return (
              <motion.div
                key={stage.id}
                style={{
                  flexShrink: 0,
                  flexBasis: "0%",
                  overflow: "hidden",
                  boxShadow: isActive
                    ? `0 0 50px ${stage.color}14, 0 8px 32px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)`
                    : `0 2px 16px rgba(0,0,0,0.5)`,
                }}
                animate={{
                  flexGrow: isActive ? 4.5 : 0.85,
                  borderColor: isActive ? `${stage.color}40` : `${stage.color}15`,
                }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                className="relative rounded-2xl border bg-[rgba(6,14,26,0.97)]"
              >
                {/* Top accent bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  animate={{ opacity: isActive ? 1 : 0.3 }}
                  style={{ background: stage.color }}
                />

                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, delay: 0.2 }}
                      className="h-full"
                    >
                      <ExpandedCard stage={stage} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="compressed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      <CompressedCard stage={stage} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
