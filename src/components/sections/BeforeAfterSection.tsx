"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const beforeItems = [
  { icon: "✉", label: "Emails + WhatsApp + Excel" },
  { icon: "🔁", label: "Manual Follow-Ups" },
  { icon: "📂", label: "Scattered Files" },
  { icon: "⏳", label: "Delayed Approvals" },
  { icon: "🚫", label: "Limited Visibility" },
  { icon: "🌀", label: "Vendor Chaos" },
];

const afterItems = [
  { icon: "⬡", label: "Unified Platform" },
  { icon: "⚡", label: "Automated Workflow" },
  { icon: "🗄", label: "Centralized Data" },
  { icon: "🤝", label: "Real-Time Collaboration" },
  { icon: "📊", label: "Live Dashboards" },
  { icon: "🏗", label: "Structured Vendor Portal" },
];

const modules = [
  "Tech Packs",
  "Pantone Library",
  "Print Strike-Off",
  "PP Samples",
  "Fashion Orders",
  "Production Tracking",
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function BeforeAfterSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32"
      style={{ background: "linear-gradient(180deg, #040b17 0%, #050d1a 50%, #040b17 100%)" }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[700px] w-[700px] translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(15,98,254,0.12) 0%, transparent 65%)" }}
      />
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <span
            className="mb-5 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              background: "rgba(189,145,40,0.1)",
              border: "1px solid rgba(189,145,40,0.25)",
              color: "#bd9128",
            }}
          >
            Before vs After
          </span>
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{ color: "#ffffff", lineHeight: 1.1 }}
          >
            From Fragmented Fashion Operations
            <br />
            <span style={{ color: "#bd9128" }}>to One Connected Workflow</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-base sm:text-lg"
            style={{ color: "#475569" }}
          >
            MODOZO replaces fragmented fashion workflows with one connected platform.
          </p>
        </motion.div>

        {/* Main split */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_56px_1fr]">

          {/* ── LEFT: Before ── */}
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(160deg, rgba(28,6,6,0.92) 0%, rgba(12,3,3,0.98) 100%)",
              border: "1px solid rgba(220,38,38,0.18)",
              boxShadow: "inset 0 0 60px rgba(220,38,38,0.04), 0 0 0 1px rgba(220,38,38,0.06)",
            }}
            initial={{ opacity: 0, x: -48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            {/* Red glow top-left */}
            <div
              className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)" }}
            />

            {/* Header bar */}
            <div
              className="px-8 pb-6 pt-8"
              style={{ borderBottom: "1px solid rgba(220,38,38,0.1)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                  style={{ background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.25)" }}
                >
                  ✕
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "rgba(220,38,38,0.6)" }}>
                    Before MODOZO
                  </p>
                  <p className="text-lg font-bold leading-tight" style={{ color: "#ffffff" }}>
                    Managing Production
                  </p>
                </div>
              </div>
            </div>

            {/* Scattered tools visual */}
            <div className="relative px-8 pt-8">
              {/* Chaotic scattered boxes */}
              <div className="relative mb-8 h-32">
                {[
                  { label: "📧 Email", top: "0%", left: "0%", rot: "-4deg" },
                  { label: "📱 WhatsApp", top: "10%", left: "30%", rot: "3deg" },
                  { label: "📊 Excel", top: "5%", left: "60%", rot: "-5deg" },
                  { label: "📁 Drive", top: "48%", left: "5%", rot: "5deg" },
                  { label: "🗒 Sheets", top: "45%", left: "42%", rot: "-3deg" },
                  { label: "💬 Chat", top: "50%", left: "72%", rot: "4deg" },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="absolute rounded-lg px-3 py-1.5 text-xs font-medium"
                    style={{
                      top: t.top,
                      left: t.left,
                      transform: `rotate(${t.rot})`,
                      background: "rgba(220,38,38,0.07)",
                      border: "1px solid rgba(220,38,38,0.2)",
                      color: "rgba(255,255,255,0.45)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    {t.label}
                  </div>
                ))}
                {/* Broken lines */}
                <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.15 }}>
                  <line x1="15%" y1="18%" x2="42%" y2="25%" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" />
                  <line x1="55%" y1="18%" x2="42%" y2="25%" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" />
                  <line x1="15%" y1="65%" x2="55%" y2="62%" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" />
                  <line x1="80%" y1="65%" x2="55%" y2="62%" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" />
                </svg>
              </div>

              {/* Items */}
              <motion.ul
                className="space-y-2 pb-8"
                variants={stagger}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {beforeItems.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={fadeUp}
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(220,38,38,0.05)",
                      border: "1px solid rgba(220,38,38,0.1)",
                    }}
                  >
                    <span className="shrink-0 text-base" style={{ filter: "grayscale(0.5) opacity(0.7)" }}>{item.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {item.label}
                    </span>
                    <span className="ml-auto shrink-0 text-xs font-bold" style={{ color: "rgba(220,38,38,0.5)" }}>✕</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Bottom status */}
            <div
              className="px-8 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{
                background: "rgba(220,38,38,0.06)",
                borderTop: "1px solid rgba(220,38,38,0.1)",
                color: "rgba(220,38,38,0.5)",
              }}
            >
              Fragmented · Stressful · Inefficient
            </div>
          </motion.div>

          {/* ── DIVIDER ── */}
          <motion.div
            className="flex flex-row items-center justify-center gap-2 lg:flex-col lg:gap-0"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
          >
            <div
              className="h-px flex-1 lg:h-full lg:w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(100,116,139,0.15), transparent)" }}
            />
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xs font-black"
              style={{
                background: "linear-gradient(135deg, #081020, #040b17)",
                border: "1px solid rgba(100,116,139,0.2)",
                color: "#475569",
                boxShadow: "0 0 24px rgba(15,98,254,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              VS
            </div>
            <div
              className="h-px flex-1 lg:h-full lg:w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(100,116,139,0.15), transparent)" }}
            />
          </motion.div>

          {/* ── RIGHT: After ── */}
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(160deg, rgba(4,16,38,0.95) 0%, rgba(4,11,23,0.99) 100%)",
              border: "1px solid rgba(15,98,254,0.2)",
              boxShadow: "inset 0 0 60px rgba(15,98,254,0.05), 0 0 0 1px rgba(15,98,254,0.05)",
            }}
            initial={{ opacity: 0, x: 48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            {/* Grid overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(15,98,254,0.05) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(15,98,254,0.05) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
            {/* Blue glow top-right */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(15,98,254,0.3) 0%, transparent 70%)" }}
            />

            {/* Header bar */}
            <div
              className="relative px-8 pb-6 pt-8"
              style={{ borderBottom: "1px solid rgba(15,98,254,0.1)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                  style={{ background: "rgba(15,98,254,0.15)", border: "1px solid rgba(15,98,254,0.3)" }}
                >
                  ✓
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "#60A5FA" }}>
                    With MODOZO
                  </p>
                  <p className="text-lg font-bold leading-tight" style={{ color: "#ffffff" }}>
                    One Connected Platform
                  </p>
                </div>
              </div>
            </div>

            {/* Connected modules visual */}
            <div className="relative px-8 pt-8">
              <div className="relative mb-8">
                {/* Center hub */}
                <div className="relative flex flex-wrap justify-center gap-2">
                  {modules.map((mod, i) => (
                    <motion.div
                      key={mod}
                      className="rounded-lg px-3 py-2 text-xs font-semibold"
                      style={{
                        background: "rgba(15,98,254,0.1)",
                        border: "1px solid rgba(15,98,254,0.25)",
                        color: "rgba(255,255,255,0.75)",
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.06, ease: "easeOut" }}
                    >
                      {mod}
                    </motion.div>
                  ))}
                </div>
                {/* Pulse center */}
                <motion.div
                  className="mx-auto mt-3 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
                    boxShadow: "0 0 24px rgba(15,98,254,0.5)",
                  }}
                  animate={{ boxShadow: ["0 0 16px rgba(15,98,254,0.4)", "0 0 32px rgba(15,98,254,0.7)", "0 0 16px rgba(15,98,254,0.4)"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <span className="text-base">⬡</span>
                </motion.div>
              </div>

              {/* Items */}
              <motion.ul
                className="space-y-2 pb-8"
                variants={stagger}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {afterItems.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={fadeUp}
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(15,98,254,0.07)",
                      border: "1px solid rgba(15,98,254,0.14)",
                    }}
                  >
                    <span className="shrink-0 text-base">{item.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {item.label}
                    </span>
                    <span className="ml-auto shrink-0 text-xs font-bold" style={{ color: "#22c55e" }}>✓</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Bottom status */}
            <div
              className="px-8 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{
                background: "rgba(15,98,254,0.07)",
                borderTop: "1px solid rgba(15,98,254,0.1)",
                color: "#60A5FA",
              }}
            >
              Connected · Clear · In Control
            </div>
          </motion.div>
        </div>

        {/* Arrow indicator */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(220,38,38,0.5)" }}>Chaos</span>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-1 w-6 rounded-full"
                style={{ background: i < 2 ? "rgba(220,38,38,0.3)" : "rgba(15,98,254,0.3)" }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#60A5FA" }}>Control</span>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 overflow-hidden rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(15,98,254,0.1) 0%, rgba(189,145,40,0.07) 100%)",
            border: "1px solid rgba(15,98,254,0.18)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
        >
          <div className="flex flex-col items-center justify-between gap-6 px-8 py-7 sm:flex-row">
            <div>
              <p className="text-lg font-bold sm:text-xl" style={{ color: "#ffffff" }}>
                One platform.{" "}
                <span style={{ color: "#bd9128" }}>Every production decision.</span>
              </p>
              <p className="mt-1 text-sm" style={{ color: "#475569" }}>
                Join fashion brands already running on MODOZO.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
                color: "#ffffff",
                boxShadow: "0 4px 20px rgba(15,98,254,0.35)",
              }}
            >
              See MODOZO in Action →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
