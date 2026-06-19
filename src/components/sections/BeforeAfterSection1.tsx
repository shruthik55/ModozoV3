"use client";

import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// ─── Animation variants ────────────────────────────────────────
const panelVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: {
    opacity: 0, y: -50, scale: 0.95,
    transition: { duration: 0.5, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] },
  },
};

// ─── Inline icon SVGs ──────────────────────────────────────────
function GmailSVG() {
  return (
    <svg width="30" height="23" viewBox="0 0 30 23" fill="none">
      <rect x="0.75" y="0.75" width="28.5" height="21.5" rx="2" fill="white" stroke="#DADCE0" strokeWidth="1.5" />
      <path d="M1 2.5L15 13L29 2.5" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
      <path d="M1 3V21" stroke="#34A853" strokeWidth="2.5" />
      <path d="M29 3V21" stroke="#FBBC04" strokeWidth="2.5" />
    </svg>
  );
}
function WASvg() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#25D366" />
      <path d="M14 7C10.13 7 7 10.13 7 14C7 15.47 7.44 16.83 8.2 17.97L7 21L10.22 19.86C11.36 20.56 12.63 20.96 14 20.96C17.87 20.96 21 17.83 21 13.96C21 10.09 17.87 7 14 7Z" fill="white" />
      <path d="M11.5 12.5C11.9 13.3 12.4 14.1 13.2 14.8C14 15.5 14.8 15.9 15.5 16.1L15.9 15.5C15.6 15.2 15 14.6 14.7 14.1C14.9 13.8 15.1 13.4 14.6 13C14.1 12.5 13.6 12.3 13.1 12.5C12.5 12.8 11.1 13.7 11.5 12.5Z" fill="#25D366" stroke="#25D366" strokeWidth="0.3" />
    </svg>
  );
}
function ExcelSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="4" fill="#1D6F42" />
      <text x="5" y="21" fontSize="17" fontWeight="900" fill="white" fontFamily="Arial, sans-serif">X</text>
    </svg>
  );
}
function FolderSVG() {
  return (
    <svg width="30" height="26" viewBox="0 0 30 26" fill="none">
      <path d="M2 7H13L15 4H28V24H2V7Z" fill="#FFB703" />
      <rect x="2" y="9" width="26" height="15" rx="2" fill="#FFD166" />
    </svg>
  );
}
function DocSVG() {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
      <rect width="24" height="28" rx="3" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
      <path d="M15 0V8H24" fill="#E5E7EB" />
      <path d="M15 0L24 8H15V0Z" fill="#D1D5DB" />
      <rect x="3.5" y="11" width="9" height="1.5" rx="0.75" fill="#94A3B8" />
      <rect x="3.5" y="14.5" width="15" height="1.5" rx="0.75" fill="#94A3B8" />
      <rect x="3.5" y="18" width="12" height="1.5" rx="0.75" fill="#94A3B8" />
      <rect x="3.5" y="21.5" width="8" height="1.5" rx="0.75" fill="#94A3B8" />
    </svg>
  );
}
function OutlookSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="4" fill="#0078D4" />
      <text x="3" y="22" fontSize="18" fontWeight="900" fill="white" fontFamily="Arial, sans-serif">O</text>
    </svg>
  );
}
function GDriveSVG() {
  return (
    <svg width="28" height="26" viewBox="0 0 28 26" fill="none">
      <path d="M14 3L5.5 18H22.5L14 3Z" fill="none" />
      <path d="M9.5 18L5 10L14 3L19 11L9.5 18Z" fill="#EA4335" opacity="0.9" />
      <path d="M18.5 18L23 10L14 3L9 11L18.5 18Z" fill="#34A853" opacity="0.9" />
      <path d="M5.5 18H22.5L23 24H5L5.5 18Z" fill="#FBBC04" opacity="0.9" />
    </svg>
  );
}
function BellSVG() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
      <path d="M11 2C11 2 6.5 4.5 6.5 11V19H15.5V11C15.5 4.5 11 2 11 2Z" fill="#94A3B8" />
      <rect x="8.5" y="19" width="5" height="2" rx="1" fill="#94A3B8" />
      <circle cx="11" cy="23" r="2.5" fill="#94A3B8" />
      <circle cx="11" cy="2" r="1.8" fill="#94A3B8" />
    </svg>
  );
}
function PDFSVG() {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
      <rect width="24" height="28" rx="3" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
      <rect x="0" y="10" width="24" height="10" fill="#EF4444" />
      <text x="3.5" y="19" fontSize="8" fontWeight="900" fill="white" fontFamily="Arial, sans-serif">PDF</text>
    </svg>
  );
}
function WordSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="4" fill="#2B5797" />
      <text x="4" y="21" fontSize="16" fontWeight="900" fill="white" fontFamily="Arial, sans-serif">W</text>
    </svg>
  );
}

// ─── Shared primitives ─────────────────────────────────────────
const CARD_BG = "rgba(10, 20, 45, 0.72)";
const CARD_BORDER = "1px solid rgba(255,255,255,0.08)";
const CARD_SHADOW = "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)";

function FC({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", background: CARD_BG, borderRadius: 14, boxShadow: CARD_SHADOW, border: CARD_BORDER, backdropFilter: "blur(8px)", ...style }}>
      {children}
    </div>
  );
}

function Bdg({ count, color = "#EF4444" }: { count: string | number; color?: string }) {
  return (
    <div style={{
      position: "absolute", top: -6, right: -6, background: color, color: "white",
      borderRadius: "50%", minWidth: 18, height: 18, fontSize: 9, fontWeight: 700,
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "1.5px solid #091a36", padding: "0 2px",
    }}>{count}</div>
  );
}

function IconBox({ svg, badge, badgeColor }: { svg: React.ReactNode; badge?: string | number; badgeColor?: string }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
        {svg}
      </div>
      {badge !== undefined && <Bdg count={badge} color={badgeColor} />}
    </div>
  );
}

function AppCard({ svg, badge, badgeColor, label, style }: { svg: React.ReactNode; badge?: string | number; badgeColor?: string; label?: string; style?: React.CSSProperties }) {
  return (
    <FC style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", ...style }}>
      <IconBox svg={svg} badge={badge} badgeColor={badgeColor} />
      {label && <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.82)", whiteSpace: "nowrap" }}>{label}</span>}
    </FC>
  );
}

function MsgCard({ svg, badge, badgeColor, title, message, time, style }: { svg: React.ReactNode; badge?: string | number; badgeColor?: string; title?: string; message?: string; time?: string; style?: React.CSSProperties }) {
  return (
    <FC style={{ padding: "10px 13px", maxWidth: 240, ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: message ? 6 : 0 }}>
        <IconBox svg={svg} badge={badge} badgeColor={badgeColor} />
        {title && <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{title}</span>}
      </div>
      {message && <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.45, margin: 0 }}>{message}</p>}
      {time && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 3, display: "block" }}>{time}</span>}
    </FC>
  );
}


function StickyNote({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: "absolute", background: "rgba(254,240,138,0.15)", padding: "8px 11px",
      borderRadius: 5, transform: "rotate(-2deg)",
      boxShadow: "2px 3px 10px rgba(0,0,0,0.3)", border: "1px solid rgba(254,240,138,0.25)",
      minWidth: 120, fontSize: 12.5, fontWeight: 600, color: "rgba(254,240,138,0.85)", lineHeight: 1.4, ...style,
    }}>
      <div style={{ position: "absolute", top: -7, left: "50%", transform: "translateX(-50%)", width: 13, height: 13, background: "#EF4444", borderRadius: "50%", boxShadow: "0 1px 3px rgba(0,0,0,0.4)" }} />
      {text}
    </div>
  );
}

// ─── Float animation CSS (injected once) ─────────────────────
const FLOAT_STYLE = `
  @keyframes f1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  @keyframes f2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes f3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes f4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes f5 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
`;
const FA: Record<number, React.CSSProperties> = {
  0: { animation: "f1 3.2s ease-in-out infinite" },
  1: { animation: "f2 3.8s ease-in-out infinite 0.6s" },
  2: { animation: "f3 4.2s ease-in-out infinite 1.1s" },
  3: { animation: "f4 3.5s ease-in-out infinite 1.7s" },
  4: { animation: "f5 4.8s ease-in-out infinite 0.3s" },
  5: { animation: "f1 3.9s ease-in-out infinite 2.0s" },
  6: { animation: "f2 4.4s ease-in-out infinite 0.9s" },
};

// ─── Step 1 helpers ────────────────────────────────────────────

function XMark({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", pointerEvents: "none", ...style }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 2L12 12M12 2L2 12" stroke="rgba(190,180,220,0.55)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function LightCard({ svg, badge, badgeColor, label, labelLeft, style }: {
  svg: React.ReactNode; badge?: string | number; badgeColor?: string;
  label?: string; labelLeft?: boolean; style?: React.CSSProperties;
}) {
  return (
    <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 10, ...style }}>
      {labelLeft && label && (
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.72)", whiteSpace: "nowrap" }}>{label}</span>
      )}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 60, height: 60, borderRadius: 15,
          background: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 28px rgba(0,0,0,0.38), 0 2px 8px rgba(0,0,0,0.22)",
        }}>
          {svg}
        </div>
        {badge !== undefined && <Bdg count={badge} color={badgeColor || "#EF4444"} />}
      </div>
      {!labelLeft && label && (
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.72)", whiteSpace: "nowrap" }}>{label}</span>
      )}
    </div>
  );
}

// ─── Step left panels ──────────────────────────────────────────

function Step1Left() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Image
        src="/scattered_communication_transparent.png"
        alt="Scattered communication before Modozo"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}

function Step2Left() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MsgCard svg={<GmailSVG />} badge={23} title="Follow up?"
        message="Requesting update on the sample." time="Sent 3 days ago  ✓✓"
        style={{ top: "5%", left: "3%", ...FA[0] }} />
      <MsgCard svg={<WASvg />} badge={17} message="Any update on the pricing?"
        time="10:30 AM  ✓✓"
        style={{ top: "21%", left: "40%", ...FA[1] }} />
      <FC style={{ top: "41%", left: "4%", padding: "10px 13px", minWidth: 220, ...FA[2] }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
          <IconBox svg={<ExcelSVG />} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>VENDOR TRACKER.xlsx</span>
        </div>
        <table style={{ width: "100%", fontSize: 10.5, borderCollapse: "collapse" }}>
          <tbody>
            {[1, 2, 3].map(n => (
              <tr key={n} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <td style={{ padding: "3px 0", color: "rgba(255,255,255,0.5)", paddingRight: 8 }}>{n}&nbsp;Vendor {String.fromCharCode(64 + n)}</td>
                <td style={{ padding: "3px 0" }}>
                  <span style={{ background: "rgba(202,138,4,0.2)", color: "#FCD34D", fontSize: 9.5, padding: "1px 6px", borderRadius: 4, fontWeight: 600, border: "1px solid rgba(202,138,4,0.3)" }}>Pending</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FC>
      <AppCard svg={<BellSVG />} badge={9}
        style={{ top: "63%", left: "48%", ...FA[3] }} />
      <FC style={{ top: "62%", left: "4%", padding: "7px 11px", display: "flex", gap: 8, alignItems: "flex-start", maxWidth: 200, ...FA[4] }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(59,130,246,0.25)", flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.82)", margin: 0 }}>Checking in on this...</p>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Yesterday</span>
        </div>
      </FC>
      <FC style={{ top: "78%", left: "28%", padding: "7px 11px", display: "flex", gap: 8, alignItems: "flex-start", maxWidth: 200, ...FA[5] }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(236,72,153,0.25)", flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.82)", margin: 0 }}>Gentle reminder any update?</p>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>2 days ago</span>
        </div>
      </FC>
      <StickyNote text={"Did we get\na response?"} style={{ bottom: "3%", left: "3%", transform: "rotate(-3deg)", ...FA[6] }} />
    </div>
  );
}

function Step3Left() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MsgCard svg={<ExcelSVG />} title="Costing_V3_FINAL.xlsx"
        style={{ top: "4%", left: "3%", ...FA[0] }} />
      <MsgCard svg={<WASvg />} badge={12} message="Can you send the latest file?" time="10:32 AM"
        style={{ top: "19%", left: "40%", ...FA[1] }} />
      <AppCard svg={<PDFSVG />} label="Sample_Approval.pdf"
        style={{ top: "35%", left: "4%", ...FA[2] }} />
      <AppCard svg={<FolderSVG />} label="New Folder (12)"
        style={{ top: "50%", left: "42%", ...FA[3] }} />
      <AppCard svg={<WordSVG />} label="Tech Pack.docx"
        style={{ top: "64%", left: "6%", ...FA[4] }} />
      <MsgCard svg={<WASvg />} message="Here is the updated one" time="Yesterday"
        style={{ top: "78%", left: "34%", ...FA[5] }} />
      <AppCard svg={<GmailSVG />} badge={8}
        style={{ top: "88%", left: "4%", ...FA[6] }} />
    </div>
  );
}

function Step4Left() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MsgCard svg={<GmailSVG />} badge={23} title="Can you review this email?"
        style={{ top: "9%", left: "3%", ...FA[0] }} />
      <MsgCard svg={<WASvg />} badge={12} message="Waiting for your reply..."
        style={{ top: "30%", left: "42%", ...FA[1] }} />
      <MsgCard svg={<ExcelSVG />} message="Latest numbers in the sheet?"
        style={{ top: "52%", left: "5%", ...FA[2] }} />
      <MsgCard svg={<DocSVG />} badge={8} message="Any update on this file?"
        style={{ top: "70%", left: "36%", ...FA[3] }} />
    </div>
  );
}

function Step5Left() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MsgCard svg={<OutlookSVG />} badge={28} title="Can you find the latest file?"
        style={{ top: "6%", left: "3%", ...FA[0] }} />
      <AppCard svg={<FolderSVG />} label="Which folder is it in?"
        style={{ top: "24%", left: "42%", ...FA[1] }} />
      <AppCard svg={<GmailSVG />} badge={14} label="Anyone have the file?"
        style={{ top: "44%", left: "5%", ...FA[2] }} />
      <MsgCard svg={<GDriveSVG />} message="Is this the right version?"
        style={{ top: "61%", left: "38%", ...FA[3] }} />
      <AppCard svg={<DocSVG />} badge="?" badgeColor="#8B5CF6" label="Lost or outdated?"
        style={{ top: "78%", left: "8%", ...FA[4] }} />
    </div>
  );
}

function Step6Left() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MsgCard svg={<WASvg />} badge={31} message="Any update on the order?" time="2 hours ago  ✓✓"
        style={{ top: "6%", left: "3%", ...FA[0] }} />
      <MsgCard svg={<ExcelSVG />} title="PURCHASE_ORDERS.xlsx"
        style={{ top: "23%", left: "40%", ...FA[1] }} />
      <MsgCard svg={<GmailSVG />} badge={15} title="Late delivery notice" message="Factory delay, need confirmation..."
        style={{ top: "41%", left: "4%", ...FA[2] }} />
      <AppCard svg={<PDFSVG />} label="Factory_Quote.pdf"
        style={{ top: "60%", left: "42%", ...FA[3] }} />
      <AppCard svg={<FolderSVG />} label="Vendor Documents (47)"
        style={{ top: "75%", left: "6%", ...FA[4] }} />
      <StickyNote text={"Follow up\nagain?"} style={{ top: "66%", left: "44%", transform: "rotate(2deg)", ...FA[5] }} />
    </div>
  );
}

const LEFT_PANELS = [Step1Left, Step2Left, Step3Left, Step4Left, Step5Left, Step6Left];

// ─── Step right-side data ──────────────────────────────────────
const STEPS = [
  {
    key: "unified",
    title: "Unified Platform",
    subtitle: "All communication, tasks & data in one place.\nAlways up-to-date. Always in sync.",
  },
  {
    key: "automated",
    title: "Automated Workflow",
    subtitle: "Automated follow-ups, reminders & updates.\nNo more chasing. Nothing slips.",
  },
  {
    key: "centralized",
    title: "Centralized Data",
    subtitle: "All files & data organized\nand easy to find.",
  },
  {
    key: "collaboration",
    title: "Real-time Collaboration",
    subtitle: "Work together, in real time.\nNo more back-and-forth. No more delays.\nEveryone stays in the loop.",
  },
  {
    key: "search",
    title: "Smarter Search",
    subtitle: "Find any file, message or data in seconds.\nNo more digging. No more guessing.\nJust results.",
  },
  {
    key: "vendor",
    title: "Vendor Management",
    subtitle: "Every supplier organized.\nFrom orders to delivery.\nAll in one place.",
  },
];

// ─── Center: Modozo logo only ──────────────────────────────────
function CenterLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      <Image
        src="/modozo_brand_logo.png"
        alt="Modozo"
        width={130}
        height={95}
        style={{ objectFit: "contain", width: "auto", height: "auto", maxWidth: 130, maxHeight: 95 }}
        priority
      />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────
export default function BeforeAfterSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const s = Math.min(5, Math.floor(v * 6));
      setCurrentStep(s);
    });
  }, [scrollYProgress]);

  const LeftPanel = LEFT_PANELS[currentStep];
  const step = STEPS[currentStep];

  return (
    <section
      ref={containerRef}
      style={{ height: "600vh", position: "relative" }}
    >
      {/* Sticky viewport-height container */}
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: "linear-gradient(180deg, #091a36 0%, #050d1a 50%, #040b17 100%)",
      }}>
        {/* Three-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 1fr",
          height: "100%",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 32px",
        }}>
          {/* ── LEFT: Chaotic before-state ── */}
          <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 20 }}>
            <div style={{ position: "absolute", top: "5%", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
              <span style={{ fontSize: "clamp(15px, 1.3vw, 20px)", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Before Modozo</span>
            </div>
            <div style={{ position: "relative", width: "min(100%, 520px)", height: "88vh" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.key + "-left"}
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ position: "absolute", inset: 0 }}
                >
                  <LeftPanel />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── CENTER: Fixed Modozo logo ── */}
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 10 }}>
            <CenterLogo />
          </div>

          {/* ── RIGHT: After-state title ── */}
          <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: 20 }}>
            <div style={{ position: "absolute", top: "5%", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
              <span style={{ fontSize: "clamp(15px, 1.3vw, 20px)", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em", textTransform: "uppercase" }}>After Modozo</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step.key + "-right"}
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ textAlign: "center" }}
              >
                <h2 style={{
                  fontSize: "clamp(26px, 2.4vw, 40px)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: "#f4f5fb",
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}>
                  {step.title}
                </h2>
                <p style={{
                  fontSize: "clamp(14px, 1.2vw, 17px)",
                  color: "#94a3b8",
                  lineHeight: 1.65,
                  maxWidth: 340,
                  whiteSpace: "pre-line",
                  margin: "0 auto",
                }}>
                  {step.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Step indicator dots — bottom right */}
        <div style={{ position: "absolute", bottom: 32, right: 40, display: "flex", gap: 7, alignItems: "center" }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              width: i === currentStep ? 22 : 7,
              height: 7,
              borderRadius: 4,
              background: i === currentStep ? "#6366f1" : "rgba(255,255,255,0.15)",
              transition: "all 0.4s ease",
            }} />
          ))}
        </div>

        {/* Scroll hint — hidden after first step */}
        <AnimatePresence>
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
              style={{
                position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5, pointerEvents: "none",
              }}
            >
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                style={{ width: 1.5, height: 22, background: "linear-gradient(to bottom, #a5b4fc, transparent)", borderRadius: 2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
