"use client";

import { useRef, useState } from "react";
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
    tagline: "Rough Sketch → Digital Spec",
    description:
      "Upload designs, specifications, BOMs, and references. Build factory-ready tech packs with Points of Measure, material specs, and version history — all on a single style record.",
    color: "#0F62FE",
    bullets: [
      "POMs attached to every style record",
      "Bill of Materials auto-linked per version",
      "Factory-ready tech packs in minutes",
    ],
    icon: FileText,
  },
  {
    id: 2,
    step: "02",
    shortTitle: "Collaborate",
    title: "Collaborate with Teams & Vendors",
    tagline: "Real-time Stakeholder Communication",
    description:
      "Share updates, comments, approvals, and costing in one place. Designers, brand managers, and global factory vendors all work on a single live style thread — zero email chains.",
    color: "#F59E0B",
    bullets: [
      "In-context comments on spec items",
      "Vendor cost approvals tracked per style",
      "Broadcast updates to all stakeholders",
    ],
    icon: MessageSquare,
  },
  {
    id: 3,
    step: "03",
    shortTitle: "Sampling",
    title: "Track Sampling & Production",
    tagline: "Physical to Digital Validation",
    description:
      "Monitor TNA milestones, approvals, production stages, and inspections. Sign off on physical samples with a complete digital audit trail at every checkpoint.",
    color: "#EF4444",
    bullets: [
      "Pantone color and fit digital sign-off",
      "TNA milestone tracking per order",
      "Inspection reports linked to style",
    ],
    icon: ClipboardCheck,
  },
  {
    id: 4,
    step: "04",
    shortTitle: "Analytics",
    title: "Analyze Performance",
    tagline: "Garment-Level Operational Data",
    description:
      "Use dashboards and analytics to improve visibility and planning. Review lead times, OTD rates, and quality scorecards generated automatically from the style record.",
    color: "#10B981",
    bullets: [
      "Automated reports from style history",
      "On-time delivery and cycle time KPIs",
      "Vendor scorecard ratings per collection",
    ],
    icon: BarChart3,
  },
] as const;

/* ─── Consistent t-shirt SVG path ─── */
const TP = "M48,22 Q60,6 90,9 Q120,6 132,22 L170,42 L172,78 L136,78 L136,190 L44,190 L44,78 L8,78 L10,42 Z";
const CP = "M48,22 Q60,50 90,55 Q120,50 132,22";

function TShirtIllustration({ step }: { step: number }) {
  if (step === 1) {
    return (
      <svg viewBox="0 0 180 200" className="w-full h-full">
        <path d={TP} fill="rgba(15,98,254,0.07)" stroke="#0F62FE" strokeWidth="1.5" strokeDasharray="5,3" />
        <path d={CP} fill="none" stroke="#0F62FE" strokeWidth="1.2" strokeDasharray="4,3" />
        <line x1="44" y1="118" x2="136" y2="118" stroke="#0F62FE" strokeWidth="0.8" opacity="0.5" strokeDasharray="3,2" />
        <line x1="44" y1="115" x2="44" y2="121" stroke="#0F62FE" strokeWidth="1" opacity="0.5" />
        <line x1="136" y1="115" x2="136" y2="121" stroke="#0F62FE" strokeWidth="1" opacity="0.5" />
        <text x="90" y="113" textAnchor="middle" fontSize="7" fill="#4d90fe" fontFamily="monospace">58.0 cm ±0.5</text>
        <line x1="150" y1="78" x2="150" y2="190" stroke="#0F62FE" strokeWidth="0.8" opacity="0.45" strokeDasharray="3,2" />
        <line x1="147" y1="78" x2="153" y2="78" stroke="#0F62FE" strokeWidth="1" opacity="0.45" />
        <line x1="147" y1="190" x2="153" y2="190" stroke="#0F62FE" strokeWidth="1" opacity="0.45" />
        <text x="162" y="136" textAnchor="middle" fontSize="6" fill="#4d90fe" fontFamily="monospace" transform="rotate(90,162,136)">72 cm</text>
        <rect x="60" y="138" width="60" height="24" rx="3" fill="rgba(15,98,254,0.1)" stroke="rgba(15,98,254,0.28)" strokeWidth="0.8" />
        <text x="90" y="149" textAnchor="middle" fontSize="6" fill="#0F62FE" fontFamily="monospace" fontWeight="bold">280g OE Cotton</text>
        <text x="90" y="158" textAnchor="middle" fontSize="5.5" fill="#7fb3ff" fontFamily="monospace">85% CTN / 15% PES</text>
        <rect x="6" y="6" width="46" height="14" rx="3" fill="rgba(15,98,254,0.85)" />
        <text x="29" y="16" textAnchor="middle" fontSize="6" fill="white" fontFamily="monospace" fontWeight="bold">HD-302 · V1.4</text>
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg viewBox="0 0 180 200" className="w-full h-full">
        <defs>
          <linearGradient id="s2g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" /><stop offset="100%" stopColor="#0d2a46" />
          </linearGradient>
        </defs>
        <path d={TP} fill="url(#s2g)" stroke="#F59E0B" strokeWidth="1.5" />
        <path d={CP} fill="rgba(0,0,0,0.2)" stroke="rgba(245,158,11,0.35)" strokeWidth="1" />
        <rect x="-14" y="48" width="52" height="22" rx="5" fill="rgba(15,98,254,0.9)" />
        <polygon points="38,55 44,61 38,67" fill="rgba(15,98,254,0.9)" />
        <text x="-8" y="57" fontSize="5.5" fill="white" fontFamily="monospace" fontWeight="bold">Designer:</text>
        <text x="-8" y="66" fontSize="5" fill="#dbeafe" fontFamily="monospace">&quot;280g OE Cotton?&quot;</text>
        <rect x="142" y="58" width="50" height="22" rx="5" fill="rgba(202,138,4,0.92)" />
        <polygon points="142,65 136,61 142,69" fill="rgba(202,138,4,0.92)" />
        <text x="146" y="67" fontSize="5.5" fill="white" fontFamily="monospace" fontWeight="bold">Brand Mgr:</text>
        <text x="146" y="76" fontSize="5" fill="#fef3c7" fontFamily="monospace">&quot;GOTS cert only&quot;</text>
        <rect x="30" y="170" width="120" height="22" rx="5" fill="rgba(16,185,129,0.82)" />
        <polygon points="74,170 70,164 78,170" fill="rgba(16,185,129,0.82)" />
        <text x="90" y="180" textAnchor="middle" fontSize="5.5" fill="white" fontFamily="monospace" fontWeight="bold">Factory: &quot;OE-4421 cert ✓&quot;</text>
        <text x="90" y="188" textAnchor="middle" fontSize="5" fill="#d1fae5" fontFamily="monospace">Cost locked · Ship Aug 12</text>
        <circle cx="44" cy="64" r="2.5" fill="#0F62FE" opacity="0.8" />
        <circle cx="136" cy="71" r="2.5" fill="#F59E0B" opacity="0.8" />
        <circle cx="74" cy="162" r="2.5" fill="#10B981" opacity="0.8" />
        <rect x="62" y="116" width="56" height="16" rx="3" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.38)" strokeWidth="0.8" />
        <text x="90" y="127" textAnchor="middle" fontSize="6.5" fill="#10B981" fontFamily="monospace" fontWeight="bold">SYNCED ✓</text>
      </svg>
    );
  }
  if (step === 3) {
    return (
      <svg viewBox="0 0 180 200" className="w-full h-full">
        <defs>
          <linearGradient id="s3g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" /><stop offset="100%" stopColor="#1d3a8a" />
          </linearGradient>
        </defs>
        <path d={TP} fill="url(#s3g)" stroke="#EF4444" strokeWidth="1.5" />
        <path d={CP} fill="rgba(0,0,0,0.2)" stroke="rgba(239,68,68,0.35)" strokeWidth="1" />
        <rect x="62" y="5" width="56" height="14" rx="3" fill="rgba(239,68,68,0.92)" />
        <text x="90" y="15" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="monospace" fontWeight="bold">PP SAMPLE #04</text>
        <rect x="70" y="97" width="40" height="24" rx="3" fill="#1D4ED8" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
        <text x="90" y="108" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.45)" fontFamily="monospace">19-4052 TCX</text>
        <text x="90" y="117" textAnchor="middle" fontSize="5.5" fill="#86efac" fontFamily="monospace" fontWeight="bold">APPROVED ✓</text>
        <circle cx="90" cy="42" r="9" fill="rgba(16,185,129,0.14)" stroke="#10B981" strokeWidth="1.5" />
        <text x="90" y="46.5" textAnchor="middle" fontSize="9" fill="#10B981">✓</text>
        <circle cx="20" cy="64" r="8" fill="rgba(16,185,129,0.14)" stroke="#10B981" strokeWidth="1.5" />
        <text x="20" y="68" textAnchor="middle" fontSize="8" fill="#10B981">✓</text>
        <circle cx="160" cy="64" r="8" fill="rgba(16,185,129,0.14)" stroke="#10B981" strokeWidth="1.5" />
        <text x="160" y="68" textAnchor="middle" fontSize="8" fill="#10B981">✓</text>
        <rect x="44" y="174" width="92" height="7" rx="3.5" fill="rgba(255,255,255,0.07)" />
        <rect x="44" y="174" width="74" height="7" rx="3.5" fill="#EF4444" />
        <text x="90" y="190" textAnchor="middle" fontSize="6" fill="#fca5a5" fontFamily="monospace">TNA: 80% Complete</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 180 200" className="w-full h-full">
      <defs>
        <linearGradient id="s4g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" /><stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <radialGradient id="s4glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(16,185,129,0.28)" /><stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <path d={TP} fill="url(#s4g)" stroke="#10B981" strokeWidth="1.5" />
      <path d={TP} fill="url(#s4glow)" opacity="0.65" />
      <path d={CP} fill="rgba(0,0,0,0.2)" stroke="rgba(16,185,129,0.28)" strokeWidth="1" />
      <rect x="4" y="98" width="54" height="30" rx="4" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.32)" strokeWidth="0.8" />
      <text x="31" y="111" textAnchor="middle" fontSize="5.5" fill="#6ee7b7" fontFamily="monospace">OTD RATE</text>
      <text x="31" y="123" textAnchor="middle" fontSize="11" fill="#10B981" fontFamily="monospace" fontWeight="bold">98.4%</text>
      <rect x="122" y="98" width="54" height="30" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <text x="149" y="111" textAnchor="middle" fontSize="5.5" fill="#94a3b8" fontFamily="monospace">CYCLE</text>
      <text x="149" y="123" textAnchor="middle" fontSize="10" fill="white" fontFamily="monospace" fontWeight="bold">39 days</text>
      <rect x="60" y="144" width="60" height="36" rx="3" fill="rgba(0,0,0,0.22)" />
      <rect x="66" y="164" width="8" height="11" fill="#10B981" opacity="0.5" />
      <rect x="77" y="157" width="8" height="18" fill="#10B981" opacity="0.65" />
      <rect x="88" y="151" width="8" height="24" fill="#10B981" opacity="0.82" />
      <rect x="99" y="154" width="8" height="21" fill="#10B981" />
      <text x="90" y="192" textAnchor="middle" fontSize="5.5" fill="#6ee7b7" fontFamily="monospace">Score: 9.6 / 10</text>
      <rect x="58" y="56" width="64" height="16" rx="3" fill="rgba(16,185,129,0.17)" stroke="rgba(16,185,129,0.42)" strokeWidth="1" />
      <text x="90" y="67" textAnchor="middle" fontSize="6.5" fill="#10B981" fontFamily="monospace" fontWeight="bold">STYLE COMPLETE ✓</text>
    </svg>
  );
}

/* ─── Dashboard panels ─── */
function StepDashboard({ step, color }: { step: number; color: string }) {
  if (step === 1) {
    return (
      <div className="w-full rounded-xl border bg-black/35 border-white/[0.06] p-2.5 font-mono text-[8px]">
        <div className="flex justify-between items-center border-b border-white/[0.07] pb-1.5 mb-2">
          <span className="text-white font-bold text-[8px]">STYLE: HD-302</span>
          <span className="px-1.5 py-0.5 rounded text-[7px] font-bold" style={{ backgroundColor: `${color}18`, color, border: `1px solid ${color}30` }}>V1.4 Active</span>
        </div>
        <div className="grid grid-cols-3 text-[6.5px] text-slate-500 font-bold uppercase tracking-wider pb-1">
          <span>POM</span><span className="text-center">Value</span><span className="text-right">Tol.</span>
        </div>
        {[["Chest Width","58.0 cm","±0.5"],["Body Length","72.0 cm","±1.0"],["Sleeve","51.5 cm","±0.5"]].map(([l,v,t])=>(
          <div key={l} className="grid grid-cols-3 py-0.5 border-b border-white/[0.04] text-slate-300">
            <span>{l}</span><span className="text-center text-white font-bold">{v}</span><span className="text-right text-emerald-400">{t}</span>
          </div>
        ))}
        <div className="mt-1.5 rounded-lg p-1.5" style={{ backgroundColor: `${color}0d`, border: `1px solid ${color}22` }}>
          <div className="font-black uppercase tracking-wider mb-0.5 text-[6.5px]" style={{ color }}>BOM</div>
          <div className="flex justify-between text-slate-300 text-[7px]">
            <span>Shell: 85% Organic Cotton</span><span className="text-white font-semibold">280g Terry</span>
          </div>
        </div>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="w-full rounded-xl border bg-black/35 border-white/[0.06] p-2.5 font-mono text-[8px]">
        <div className="flex justify-between items-center border-b border-white/[0.07] pb-1.5 mb-2">
          <span className="text-white font-bold text-[8px]">COLLAB FEED</span>
          <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[7px] font-bold">Live</span>
        </div>
        <div className="space-y-1.5">
          {[
            {i:"DE",bg:"#0F62FE",l:"Designer",t:"10:14",m:'"Use 280g organic cotton?"',r:false},
            {i:"BM",bg:"#b45309",l:"Brand Mgr",t:"10:32",m:'"Yes, GOTS cert only."',r:true},
            {i:"VN",bg:"#059669",l:"Factory",t:"11:05",m:'"OE-4421 cert uploaded."',r:false},
          ].map((m) => (
            <div key={m.l} className={`flex gap-1.5 items-start ${m.r ? "flex-row-reverse" : ""}`}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[6px] shrink-0 text-white" style={{ backgroundColor: m.bg }}>{m.i}</div>
              <div className={`rounded-lg p-1.5 flex-1 ${m.r ? "text-right" : ""}`} style={{ backgroundColor: `${m.bg}12`, border: `1px solid ${m.bg}22` }}>
                <div className="text-[6px] text-slate-500 font-bold mb-0.5">{m.l} · {m.t}</div>
                <p className="text-slate-200 text-[7.5px]">{m.m}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (step === 3) {
    return (
      <div className="w-full rounded-xl border bg-black/35 border-white/[0.06] p-2.5 font-mono text-[8px]">
        <div className="flex justify-between items-center border-b border-white/[0.07] pb-1.5 mb-2">
          <span className="text-white font-bold text-[8px]">TNA MILESTONES</span>
          <span className="px-1.5 py-0.5 rounded text-[7px] font-bold" style={{ backgroundColor:"rgba(245,158,11,0.12)", color:"#F59E0B", border:"1px solid rgba(245,158,11,0.28)" }}>80% Done</span>
        </div>
        <div className="space-y-1.5">
          {[
            {l:"Fit Sample Review",done:true,cur:false},
            {l:"Pantone Color Approval",done:true,cur:false},
            {l:"PP Sample Sign-off",done:true,cur:false},
            {l:"Pre-Shipment Inspection",done:false,cur:true},
            {l:"Final Handoff",done:false,cur:false},
          ].map((m) => (
            <div key={m.l} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border flex items-center justify-center shrink-0 text-[7px]"
                style={{ backgroundColor: m.done ? "#10B981" : m.cur ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)", borderColor: m.done ? "#10B981" : m.cur ? "#EF4444" : "rgba(255,255,255,0.15)", color: "white" }}>
                {m.done && "✓"}
                {m.cur && <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />}
              </div>
              <span className="flex-1 text-[7.5px]" style={{ color: m.done ? "rgba(148,163,184,0.55)" : m.cur ? "white" : "rgba(100,116,139,0.65)", fontWeight: m.cur ? 700 : 400, textDecoration: m.done ? "line-through" : "none" }}>{m.l}</span>
              {m.cur && <span className="text-[#EF4444] font-bold text-[6.5px] uppercase">In Progress</span>}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full rounded-xl border bg-black/35 border-white/[0.06] p-2.5 font-mono text-[8px]">
      <div className="flex justify-between items-center border-b border-white/[0.07] pb-1.5 mb-2">
        <span className="text-white font-bold text-[8px]">ANALYTICS</span>
        <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[7px] font-bold">Healthy</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-1.5">
        {[{l:"OTD",v:"98.4%",s:"vs 95%",c:"#10B981"},{l:"Cycle",v:"39d",s:"-6 days",c:"white"},{l:"Score",v:"9.6",s:"/ 10",c:"#10B981"}].map((k)=>(
          <div key={k.l} className="bg-white/[0.04] border border-white/[0.05] rounded-lg p-1.5 text-center">
            <div className="text-slate-500 font-bold uppercase text-[5.5px] tracking-wider">{k.l}</div>
            <div className="font-black mt-0.5 text-[12px]" style={{ color: k.c }}>{k.v}</div>
            <div className="text-[6px]" style={{ color: k.c === "white" ? "#10B981" : "#64748b" }}>{k.s}</div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-0.5 h-7 bg-black/20 rounded-lg px-2 py-1">
        {[55,68,80,74,88,94,91].map((h,i)=>(
          <div key={i} className="flex-1 rounded-sm bg-emerald-500" style={{ height:`${h}%`, opacity: 0.4 + i * 0.08 }} />
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
  return (
    <div className="h-full flex overflow-hidden">
      {/* Left — t-shirt */}
      <div
        className="w-[36%] flex items-center justify-center p-5 border-r shrink-0"
        style={{ borderColor: `${stage.color}10` }}
      >
        <div className="w-full max-w-[160px] aspect-[9/10]">
          <TShirtIllustration step={stage.id} />
        </div>
      </div>
      {/* Right — content */}
      <div className="flex-1 flex flex-col p-5 gap-3 min-w-0 overflow-hidden">
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
        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">{stage.description}</p>
        <ul className="space-y-1">
          {stage.bullets.map((b) => (
            <li key={b} className="flex items-start gap-1.5 text-[11px] text-slate-300">
              <span
                className="shrink-0 mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-black"
                style={{ backgroundColor: `${stage.color}18`, color: stage.color }}
              >✓</span>
              <span className="leading-tight">{b}</span>
            </li>
          ))}
        </ul>
        <div className="flex-1 flex items-end">
          <StepDashboard step={stage.id} color={stage.color} />
        </div>
      </div>
    </div>
  );
}

/* ─── Thread SVG (logo → cards) ─── */
const THREAD_ENDPOINTS = [160, 440, 720, 1000] as const; // x positions in viewBox 0 0 1160 80

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
        const cx = 580; // logo center x in viewBox
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
      {/* Endpoint dots on card tops */}
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
