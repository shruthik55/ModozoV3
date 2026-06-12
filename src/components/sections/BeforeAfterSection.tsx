"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const pairs = [
  { before: { emoji: "✉", text: "Emails + WhatsApp + Excel" }, after: { emoji: "⚡", text: "Unified Platform" } },
  { before: { emoji: "🔁", text: "Manual Follow-Ups" }, after: { emoji: "⚙", text: "Automated Workflow" } },
  { before: { emoji: "📂", text: "Scattered Files" }, after: { emoji: "🗄", text: "Centralized Data" } },
  { before: { emoji: "⏳", text: "Delayed Approvals" }, after: { emoji: "🤝", text: "Real-Time Collaboration" } },
  { before: { emoji: "🚫", text: "Limited Visibility" }, after: { emoji: "📊", text: "Live Dashboards" } },
  { before: { emoji: "🌀", text: "Vendor Chaos" }, after: { emoji: "🏗", text: "Structured Vendor Portal" } },
];

// Smooth, slow easing curve used across the morph.
const MORPH = { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const };
// Each state stays fully settled for 5s; +0.9s glide = 5.9s per state.
const HOLD_MS = 5900;

export default function BeforeAfterSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // mode: false = Traditional, true = With MODOZO
  const [mode, setMode] = useState(false);

  // Auto-cycle: Traditional → With MODOZO → back, forever.
  useEffect(() => {
    const id = setInterval(() => setMode((m) => !m), HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32"
      style={{ background: "linear-gradient(180deg, #040b17 0%, #050d1a 60%, #040b17 100%)" }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(15,98,254,0.07) 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ background: "rgba(189,145,40,0.08)", border: "1px solid rgba(189,145,40,0.2)", color: "#bd9128" }}
          >
            Before vs After
          </span>
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: "#ffffff", lineHeight: 1.1 }}
          >
            From Fragmented Fashion Operations
            <br />
            <span style={{ color: "#bd9128" }}>to One Connected Workflow</span>
          </h2>
          {/* <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base" style={{ color: "#475569" }}>
            MODOZO replaces fragmented fashion workflows with one connected platform.
          </p> */}
        </motion.div>

        {/* ── Morphing Comparison Card ── */}
        <motion.div
          className="relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.012))",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.025), 0 40px 80px -16px rgba(0,0,0,0.65)",
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          {/* Blue glow that fades in on the MODOZO state */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
            style={{ background: "radial-gradient(700px 320px at 50% 0%, rgba(15,98,254,0.16), transparent 60%)" }}
            animate={{ opacity: mode ? 1 : 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          {/* Segmented toggle */}
          <div className="relative mx-auto mb-9 w-full max-w-[380px]">
            <div
              className="relative grid grid-cols-2 rounded-2xl p-1.5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              {/* Sliding thumb */}
              <motion.div
                className="absolute bottom-1.5 top-1.5 rounded-xl"
                style={{
                  left: 6,
                  width: "calc(50% - 6px)",
                  background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
                  boxShadow: "0 6px 20px rgba(15,98,254,0.4)",
                }}
                animate={{ x: mode ? "100%" : "0%" }}
                transition={MORPH}
              />
              <button
                type="button"
                onClick={() => setMode(false)}
                className="relative z-10 rounded-xl py-2.5 text-sm font-semibold tracking-wide transition-colors"
                style={{ color: mode ? "#94a3b8" : "#ffffff" }}
              >
                Traditional
              </button>
              <button
                type="button"
                onClick={() => setMode(true)}
                className="relative z-10 rounded-xl py-2.5 text-sm font-semibold tracking-wide transition-colors"
                style={{ color: mode ? "#ffffff" : "#94a3b8" }}
              >
                With MODOZO
              </button>
            </div>
          </div>

          {/* Morphing rows */}
          <div className="relative mx-auto flex max-w-[640px] flex-col gap-2.5">
            {pairs.map((pair, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 rounded-2xl px-4 py-4 sm:px-5"
                animate={{
                  background: mode ? "rgba(15,98,254,0.05)" : "rgba(255,255,255,0.022)",
                  borderColor: mode ? "rgba(15,98,254,0.22)" : "rgba(255,255,255,0.07)",
                }}
                transition={MORPH}
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Icon — crossfades dashed-red box ↔ blue check box */}
                <div className="relative h-8 w-8 shrink-0">
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center rounded-lg text-base"
                    style={{ border: "1.5px dashed rgba(220,38,38,0.55)", filter: "grayscale(0.5)" }}
                    animate={{ opacity: mode ? 0 : 1 }}
                    transition={MORPH}
                  >
                    {pair.before.emoji}
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center rounded-lg text-xs font-black"
                    style={{ background: "linear-gradient(135deg, #0F62FE, #3B82F6)", color: "#ffffff" }}
                    animate={{ opacity: mode ? 1 : 0 }}
                    transition={MORPH}
                  >
                    ✓
                  </motion.span>
                </div>

                {/* Morphing text */}
                <div className="relative h-6 flex-1">
                  <motion.span
                    className="absolute left-0 top-0 text-[15px] font-medium leading-6 sm:text-base"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    animate={{ opacity: mode ? 0 : 1, y: mode ? -8 : 0 }}
                    transition={MORPH}
                  >
                    {pair.before.text}
                  </motion.span>
                  <motion.span
                    className="absolute left-0 top-0 text-[15px] font-semibold leading-6 sm:text-base"
                    style={{ color: "rgba(255,255,255,0.92)" }}
                    animate={{ opacity: mode ? 1 : 0, y: mode ? 0 : 8 }}
                    transition={MORPH}
                  >
                    {pair.after.text}
                  </motion.span>
                </div>

                {/* Status label */}
                <div className="relative hidden h-4 w-[110px] shrink-0 sm:block">
                  <motion.span
                    className="absolute right-0 top-0 text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: "rgba(239,68,68,0.55)" }}
                    animate={{ opacity: mode ? 0 : 1 }}
                    transition={MORPH}
                  >
                    Fragmented
                  </motion.span>
                  <motion.span
                    className="absolute right-0 top-0 text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: "#60A5FA" }}
                    animate={{ opacity: mode ? 1 : 0 }}
                    transition={MORPH}
                  >
                    Connected
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="mt-8 overflow-hidden rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(15,98,254,0.09) 0%, rgba(189,145,40,0.06) 100%)",
            border: "1px solid rgba(15,98,254,0.14)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.62 }}
        >
          <div className="flex flex-col items-center justify-between gap-5 px-7 py-6 sm:flex-row">
            <div>
              <p className="text-base font-bold sm:text-lg" style={{ color: "#ffffff" }}>
                One platform.{" "}
                <span style={{ color: "#bd9128" }}>Every production decision.</span>
              </p>
              <p className="mt-1 text-sm" style={{ color: "#475569" }}>
                Join fashion brands already running on MODOZO.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
                color: "#ffffff",
                boxShadow: "0 4px 18px rgba(15,98,254,0.3)",
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
