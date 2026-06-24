"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useInView,
} from "framer-motion";

/* ─── Design tokens ─── */
const BG = "linear-gradient(180deg,#091a36 0%,#050d1a 50%,#020610 100%)";
const CARD = "rgba(8,18,40,0.88)";
const BORDER = "rgba(59,130,246,0.22)";
const TRACK = "rgba(255,255,255,0.08)";
const SHADOW = "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,130,246,0.06) inset";

/* ═══════════════════════════════════
   Mini visuals
═══════════════════════════════════ */

function VisibilityMini({ active }: { active: boolean }) {
  const labels = ["Design", "Sampling", "Vendor", "Production", "Launch"];
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (!active) { setLit(0); return; }
    let i = 0;
    const tick = () => { i++; setLit(i); if (i < labels.length) setTimeout(tick, 360); };
    const t = setTimeout(tick, 100);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="space-y-1.5 mt-2">
      {labels.map((s, idx) => {
        const done = idx < 3, cur = idx === 3, on = idx <= lit - 1;
        return (
          <motion.div key={s} className="flex items-center gap-2" animate={{ opacity: on ? 1 : 0.25 }}>
            <motion.div
              className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
              animate={{ backgroundColor: on ? (done ? "#22c55e" : cur ? "#FFD54F" : TRACK) : TRACK }}
            >
              {on && done && <svg width="7" height="7" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" /></svg>}
              {on && cur && <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />}
            </motion.div>
            <span className="text-[11px] text-slate-300">{s}</span>
            <span className="ml-auto text-[9px] font-semibold">
              {on && done ? <span className="text-green-400">✓</span>
                : on && cur ? <span className="text-yellow-400">●</span>
                  : <span className="text-slate-600">○</span>}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function TimeMini({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) { setStep(0); return; }
    const a = setTimeout(() => setStep(1), 260);
    const b = setTimeout(() => setStep(2), 820);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [active]);

  return (
    <div className="mt-2 space-y-2.5">
      <div>
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>Before Modozo</span><span className="text-red-400 font-semibold">30 Days</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: TRACK }}>
          <motion.div className="h-full rounded-full bg-red-500" initial={{ width: "0%" }} animate={{ width: step >= 1 ? "100%" : "0%" }} transition={{ duration: 0.7, ease: "easeOut" }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>With Modozo</span>
          <motion.span className="text-green-400 font-semibold" animate={{ opacity: step >= 2 ? 1 : 0 }}>18 Days</motion.span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: TRACK }}>
          <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#FFD54F,#22c55e)" }} initial={{ width: "0%" }} animate={{ width: step >= 2 ? "60%" : "0%" }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }} />
        </div>
      </div>
      <motion.div className="text-center text-[10px] font-semibold text-green-400" animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 4 }} transition={{ duration: 0.4 }}>
        40% faster delivery
      </motion.div>
    </div>
  );
}

function VendorMini({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) { setStep(0); return; }
    const a = setTimeout(() => setStep(1), 180);
    const b = setTimeout(() => setStep(2), 580);
    const c = setTimeout(() => setStep(3), 960);
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c); };
  }, [active]);

  const msgs = [
    { from: "vendor", text: "Sample ready for review" },
    { from: "designer", text: "Minor tweak on collar" },
  ];

  return (
    <div className="mt-2 space-y-2">
      {msgs.map((m, i) => (
        <motion.div key={i} className={`flex items-start gap-2 ${m.from === "designer" ? "flex-row-reverse" : ""}`}
          animate={{ opacity: step > i ? 1 : 0, y: step > i ? 0 : 8 }} transition={{ duration: 0.3 }}>
          <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold"
            style={{ background: m.from === "vendor" ? "#2563EB" : "#FFD54F", color: m.from === "vendor" ? "#fff" : "#111" }}>
            {m.from === "vendor" ? "V" : "D"}
          </div>
          <div className="text-[10px] px-2 py-1 rounded-lg max-w-[120px]"
            style={{ background: m.from === "vendor" ? "rgba(37,99,235,0.2)" : "rgba(255,213,79,0.15)", color: m.from === "vendor" ? "#93c5fd" : "#fde68a" }}>
            {m.text}
          </div>
        </motion.div>
      ))}
      <motion.div className="flex items-center gap-1.5 mt-0.5" animate={{ opacity: step >= 3 ? 1 : 0 }}>
        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center shrink-0">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" /></svg>
        </div>
        <span className="text-[10px] text-green-400 font-semibold">Approved by Designer</span>
      </motion.div>
    </div>
  );
}

function SecurityMini({ active }: { active: boolean }) {
  const rows = [
    { role: "Admin", access: "Full Access", color: "#3B82F6", w: "100%" },
    { role: "Vendor", access: "Limited", color: "#F59E0B", w: "40%" },
    { role: "Designer", access: "Edit", color: "#8B5CF6", w: "70%" },
    { role: "QA", access: "Review", color: "#22c55e", w: "55%" },
  ];
  const [lit, setLit] = useState(0);
  useEffect(() => {
    if (!active) { setLit(0); return; }
    let i = 0;
    const tick = () => { i++; setLit(i); if (i < rows.length) setTimeout(tick, 260); };
    const t = setTimeout(tick, 100);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="mt-2 space-y-2">
      {rows.map((r, idx) => (
        <motion.div key={r.role} className="flex items-center gap-2" animate={{ opacity: idx < lit ? 1 : 0.22 }}>
          <span className="text-[10px] text-slate-400 w-14 shrink-0">{r.role}</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: TRACK }}>
            <motion.div className="h-full rounded-full" style={{ backgroundColor: r.color }}
              initial={{ width: "0%" }} animate={{ width: idx < lit ? r.w : "0%" }} transition={{ duration: 0.4 }} />
          </div>
          <span className="text-[9px] text-slate-500 w-14 text-right shrink-0">{r.access}</span>
        </motion.div>
      ))}
      <motion.div className="flex items-center gap-1 mt-1" animate={{ opacity: lit >= rows.length ? 1 : 0 }}>
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
          <path d="M5 1L1 2.5V6C1 8.5 3 10.5 5 11C7 10.5 9 8.5 9 6V2.5L5 1Z" fill="#3B82F6" opacity="0.2" stroke="#3B82F6" strokeWidth="1" />
        </svg>
        <span className="text-[9px] text-blue-400 font-semibold">Enterprise Security Active</span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════
   Dashboard card (the "center card")
═══════════════════════════════════ */
function Dashboard() {
  const stages = ["Design", "Tech Pack", "Sampling", "Vendor", "Production", "Launch"];
  const activeIdx = 3;
  const feed = ["Sample Approved", "Vendor Confirmed", "Production Started"];
  const metrics = [
    { v: "24", l: "Active Styles" },
    { v: "132", l: "Tasks Done" },
    { v: "8", l: "Vendors" },
    { v: "96%", l: "Approval Rate" },
  ];

  return (
    <div
      className="h-full flex flex-col"
      style={{
        background: "rgba(6,14,32,0.96)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(59,130,246,0.26)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.65), 0 0 80px rgba(37,99,235,0.08), 0 0 0 1px rgba(59,130,246,0.06) inset",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Chrome */}
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-75" />
          <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-75" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-75" />
        </div>
        <span className="text-[11px] font-semibold text-slate-400 tracking-widest">MODOZO WORKSPACE</span>
        <Image src="/modozo_brand_logo.png" alt="Modozo" width={72} height={22} className="object-contain opacity-80" />
      </div>

      <div className="grid grid-cols-2 divide-x flex-1" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {/* Left: timeline + feed */}
        <div className="p-5 space-y-4">
          <div>
            <div className="text-[9px] font-bold text-slate-500 tracking-widest mb-3">PRODUCT LIFECYCLE</div>
            <div className="flex items-start gap-0">
              {stages.map((s, i) => {
                const done = i < activeIdx, cur = i === activeIdx;
                return (
                  <div key={s} className="flex items-center flex-1 min-w-0">
                    <div className="flex flex-col items-center gap-1 min-w-0 flex-1">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                        style={{ backgroundColor: done ? "#2563EB" : cur ? "#FFD54F" : TRACK, color: done ? "#fff" : cur ? "#111" : "#64748b" }}>
                        {done ? "✓" : i + 1}
                      </div>
                      <span className="text-[8px] text-slate-500 text-center leading-tight truncate w-full">{s}</span>
                    </div>
                    {i < stages.length - 1 && (
                      <div className="h-px shrink-0 w-3 mx-0.5 mb-3" style={{ background: done ? "#2563EB" : TRACK }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[9px] font-bold text-slate-500 tracking-widest mb-2">LIVE STATUS</div>
            <div className="space-y-2">
              {feed.map((label, i) => (
                <motion.div key={label} className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15, duration: 0.4 }}>
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 3.5L2.8 5.2L6 1.5" stroke="white" strokeWidth="1" strokeLinecap="round" /></svg>
                  </div>
                  <span className="text-[11px] text-slate-300">{label}</span>
                </motion.div>
              ))}
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ border: "1px solid rgba(255,255,255,0.2)" }} />
                <span className="text-[11px] text-slate-400">Shipment Ready</span>
                <span className="ml-auto text-[9px] text-yellow-400 font-semibold">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: metrics + team */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <div className="text-[9px] font-bold text-slate-500 tracking-widest mb-3">METRICS</div>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div key={m.l} className="rounded-xl p-3" style={{ background: TRACK }}>
                  <div className="text-xl font-bold text-white">{m.v}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[9px] font-bold text-slate-500 tracking-widest mb-2">TEAM</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {["#FFD54F", "#3B82F6", "#ef4444", "#22c55e"].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: c, color: i === 0 ? "#111" : "#fff", marginLeft: i > 0 ? "-7px" : 0, border: "2px solid rgba(6,14,32,0.95)" }}>
                    {["S", "M", "V", "Q"][i]}
                  </div>
                ))}
                <span className="text-[10px] text-slate-500 ml-2.5">4 active</span>
              </div>
              <div className="flex gap-1">
                <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}>Approved</span>
                <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: "rgba(255,213,79,0.12)", color: "#fde68a", border: "1px solid rgba(255,213,79,0.2)" }}>In Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Small impact card
═══════════════════════════════════ */
function ImpactCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4 h-full flex flex-col"
      style={{
        background: CARD,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${BORDER}`,
        boxShadow: SHADOW,
      }}
    >
      <div className="font-semibold text-[13px] text-white mb-0.5">{title}</div>
      <div className="text-[11px] text-slate-400 leading-snug mb-2">{desc}</div>
      <div className="mt-auto">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════
   Scroll nudge
═══════════════════════════════════ */
function ScrollCue() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[9px] text-slate-500 tracking-widest uppercase">Scroll to reveal</span>
      <div className="w-4 h-6 rounded-full flex items-start justify-center pt-1" style={{ border: "1px solid rgba(255,255,255,0.14)" }}>
        <motion.div className="w-1 h-1.5 rounded-full bg-blue-400" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Mobile / Tablet stack
═══════════════════════════════════ */
function MobileStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const cards = [
    { title: "Better Visibility", desc: "Track every lifecycle stage in real time.", mini: <VisibilityMini active={inView} /> },
    { title: "Faster Time-to-Market", desc: "Reduce approval cycles and delays.", mini: <TimeMini active={inView} /> },
    { title: "Vendor Collaboration", desc: "Connect vendors and teams in one workspace.", mini: <VendorMini active={inView} /> },
    { title: "Secure Data Management", desc: "Client-level permissions and enterprise security.", mini: <SecurityMini active={inView} /> },
  ];

  return (
    <section ref={ref} style={{ background: BG, padding: "clamp(48px,8vw,96px) 16px" }}>
      <div className="max-w-lg mx-auto space-y-5">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          {/* <div className="inline-block text-[10px] font-bold tracking-widest text-blue-400 uppercase px-3 py-1 rounded-full mb-3"
            style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)" }}>
            Business Impact
          </div> */}
          <h2 className="font-bold text-white text-[28px] leading-tight" style={{ letterSpacing: "-0.02em" }}>
            Why Fashion Teams Choose Modozo
          </h2>
          <p className="text-slate-400 text-[15px] mt-3">Transform disconnected workflows into a streamlined product lifecycle.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}>
          <Dashboard />
        </motion.div>
        {cards.map((c, i) => (
          <motion.div key={c.title} className="rounded-2xl p-5"
            style={{ background: CARD, backdropFilter: "blur(20px)", border: `1px solid ${BORDER}`, boxShadow: SHADOW }}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.18 + i * 0.1, duration: 0.5 }}>
            <div className="font-semibold text-[14px] text-white mb-1">{c.title}</div>
            <div className="text-[12px] text-slate-400 mb-2">{c.desc}</div>
            {c.mini}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════ */
export default function BusinessImpactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Main scroll progress through the pinned 500vh section */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Approach scroll: section bottom enters viewport → section top reaches viewport */
  const { scrollYProgress: approachProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.05"],
  });

  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const ap = useSpring(approachProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  /* Entire sticky container fades in as section scrolls up into view */
  const sectionFadeIn = useTransform(ap, [0, 1], [0, 1]);

  /* ── Dashboard reveals on first scroll ── */
  const dashOp = useTransform(p, [0, 0.12], [0, 1]);
  const dashY = useTransform(p, [0, 0.12], [28, 0]);

  /* ── Header is always fully visible once section enters — no scroll-fade needed ── */
  const headerY = useTransform(p, [0, 0.08], [12, 0]);

  /* ── Four cards reveal left-to-right ── */
  const c1Op = useTransform(p, [0.14, 0.30], [0, 1]);
  const c1Y = useTransform(p, [0.14, 0.30], [32, 0]);

  const c2Op = useTransform(p, [0.32, 0.48], [0, 1]);
  const c2Y = useTransform(p, [0.32, 0.48], [32, 0]);

  const c3Op = useTransform(p, [0.50, 0.66], [0, 1]);
  const c3Y = useTransform(p, [0.50, 0.66], [32, 0]);

  const c4Op = useTransform(p, [0.68, 0.82], [0, 1]);
  const c4Y = useTransform(p, [0.68, 0.82], [32, 0]);

  /* ── Scroll cue fades in then out ── */
  const cueOp = useTransform(p, [0, 0.06, 0.13, 0.18], [0, 1, 1, 0]);

  /* ── Fire mini-visual animations ── */
  const [active, setActive] = useState<Set<string>>(new Set());
  useMotionValueEvent(p, "change", (v) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (v >= 0.30) next.add("visibility");
      if (v >= 0.48) next.add("vendor");
      if (v >= 0.66) next.add("security");
      if (v >= 0.82) next.add("time");
      return next;
    });
  });

  return (
    <>
      {/* ══════════════════════════════════════════════
          DESKTOP — sticky scroll, top→bottom reveal
      ══════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="hidden lg:block"
        style={{ height: "500vh", background: BG }}
      >
        <motion.div
          className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-start"
          style={{
            opacity: sectionFadeIn,
            gap: "clamp(18px,2.8vh,36px)",
            paddingTop: "clamp(44px,7vh,76px)",
            paddingBottom: "clamp(24px,3vh,40px)",
            paddingLeft: "clamp(20px,3vw,48px)",
            paddingRight: "clamp(24px,4vw,64px)",
          }}
        >
          {/* ── Section header — inset with its own left padding ── */}
          <motion.div className="text-center w-full" style={{ y: headerY, paddingLeft: "clamp(24px,4vw,64px)" }}>
            {/* <div
              className="inline-block text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase px-3 py-1 rounded-full mb-2"
              style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)" }}
            >
              Business Impact
            </div> */}
            <h2
              className="font-bold text-white leading-tight"
              style={{ fontSize: "clamp(22px,2.6vw,36px)", letterSpacing: "-0.02em" }}
            >
              Why Fashion Teams Choose Modozo
            </h2>
            <p className="text-slate-400 mt-1" style={{ fontSize: "clamp(13px,1.1vw,16px)" }}>
              Transform disconnected workflows into a streamlined product lifecycle.
            </p>
          </motion.div>

          {/* ── Side-by-side: Dashboard (left) + 2×2 card grid (right) ── */}
          <div className="flex gap-5 w-full min-h-0 items-stretch" style={{ flex: "1 1 0", overflow: "hidden" }}>

            {/* Left — Dashboard fills ~70% of screen width from left edge */}
            <motion.div
              className="min-w-0 h-full"
              style={{ opacity: dashOp, y: dashY, flex: "7 1 0" }}
            >
              <Dashboard />
            </motion.div>

            {/* Right — 2×2 card grid ~30% */}
            <div className="grid grid-cols-2 gap-4 min-w-0" style={{ flex: "3 1 0" }}>

              <motion.div className="h-full" style={{ opacity: c1Op, y: c1Y }}>
                <ImpactCard title="Better Visibility" desc="Every lifecycle stage tracked in real time.">
                  <VisibilityMini active={active.has("visibility")} />
                </ImpactCard>
              </motion.div>

              <motion.div className="h-full" style={{ opacity: c2Op, y: c2Y }}>
                <ImpactCard title="Vendor Collaboration" desc="Teams and vendors in one workspace.">
                  <VendorMini active={active.has("vendor")} />
                </ImpactCard>
              </motion.div>

              <motion.div className="h-full" style={{ opacity: c3Op, y: c3Y }}>
                <ImpactCard title="Secure Data Management" desc="Enterprise-grade access control.">
                  <SecurityMini active={active.has("security")} />
                </ImpactCard>
              </motion.div>

              <motion.div className="h-full" style={{ opacity: c4Op, y: c4Y }}>
                <ImpactCard title="Faster Time-to-Market" desc="Cut approval cycles by 40%.">
                  <TimeMini active={active.has("time")} />
                </ImpactCard>
              </motion.div>

            </div>

          </div>

          {/* ── Scroll cue ── */}
          <motion.div style={{ opacity: cueOp }}>
            <ScrollCue />
          </motion.div>

        </motion.div>
      </section>

      {/* ══ Mobile / Tablet ══ */}
      <div className="lg:hidden">
        <MobileStack />
      </div>
    </>
  );
}
