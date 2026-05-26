"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Video, Globe, MessageCircle, Send, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

/* ─── Data ─── */
const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Techpacks", href: "#workflow" },
    { label: "Integrations", href: "#integrations" },
    { label: "Pricing", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Our Story", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Status", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

const socialLinks = [
  { icon: Video, href: "#", label: "Youtube" },
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: MessageCircle, href: "#", label: "Instagram" },
  { icon: Send, href: "#", label: "Twitter" },
];

/* ─── Ambient Particles Canvas ─── */
function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; pulse: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initParticles = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.15 - 0.1,
        size: Math.random() * 1.8 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;
        const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 163, 150, ${currentOpacity})`;
        ctx.fill();
      });

      // Draw faint connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 163, 150, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();
    window.addEventListener("resize", () => { resize(); initParticles(); });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/* ─── Animated Divider ─── */
function AnimatedDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-accent/20 to-transparent" />
      <motion.div
        className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-teal-accent/50 to-transparent"
        animate={{ x: ["-128px", "calc(100vw + 128px)"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ─── Main Footer ─── */
export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <footer
      className="relative overflow-hidden bg-transparent"
      id="footer"
      ref={ref}
    >
      {/* ── Ambient Layer ── */}
      <AmbientParticles />

      {/* Cinematic glow orbs */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-teal-accent/[0.04] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/[0.02] blur-[200px] pointer-events-none" />

      {/* Flowing grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,163,150,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,163,150,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black, transparent)",
        }}
      />

      {/* ── Top Divider ── */}
      <AnimatedDivider />

      {/* ══════════════════════════════════════════════ */}
      {/*  CTA SECTION — "Enter the operating system"  */}
      {/* ══════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-12 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/[0.06] mb-6">
            <Sparkles size={13} className="text-[#ff8a8a]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-[#ff8a8a] to-[#ffb3b3] bg-clip-text text-transparent">
              Connected Operations
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15] mb-5">
            The future of fashion
            <br />
            <span className="bg-gradient-to-r from-[#ebd07e] via-[#f5e6b8] to-[#ebd07e] bg-clip-text text-transparent">
              starts here.
            </span>
          </h3>
          <p className="text-slate-text text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Join the brands and manufacturers building the next generation of connected fashion workflows.
          </p>
        </motion.div>

        {/* ── Glassmorphism Email Input ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mx-auto mb-20"
        >
          <div
            className={`relative group rounded-2xl p-[1px] transition-all duration-500 ${isFocused
                ? "bg-gradient-to-r from-teal-accent/60 via-cyan-400/40 to-teal-accent/60 shadow-[0_0_40px_rgba(0,163,150,0.15)]"
                : "bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-white/[0.08] hover:from-teal-accent/20 hover:via-cyan-400/15 hover:to-teal-accent/20"
              }`}
          >
            <div className="flex items-center gap-2 bg-[#070E1A]/90 backdrop-blur-2xl rounded-[15px] px-5 py-2">
              <input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-400 placeholder:font-semibold py-3 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#e05555] to-[#ff7b7b] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:from-[#d04a4a] hover:to-[#f06e6e] transition-all shadow-lg shadow-red-500/20"
              >
                <span className="hidden sm:inline">Get Started</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
          {/* <p className="text-center text-[10px] text-slate-text/30 mt-3 uppercase tracking-[0.2em] font-medium">
            Free trial · No credit card required
          </p> */}
        </motion.div>

        {/* ── Animated Divider ── */}
        <AnimatedDivider />

        {/* ══════════════════════════════════ */}
        {/*  LINKS + SOCIAL + BOTTOM BAR      */}
        {/* ══════════════════════════════════ */}
        <div className="pt-14">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <Image src="/logo4.png" alt="Modozo" width={240} height={72} className="h-16 w-auto opacity-80" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-10 lg:gap-16 mb-16"
          >
            {Object.entries(footerLinks).map(([category, links], catIdx) => (
              <div key={category}>
                <h4 className="text-[13px] font-bold text-white/50 uppercase tracking-[0.25em] mb-6">
                  {category}
                </h4>
                <ul className="space-y-3.5">
                  {links.map((link, linkIdx) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.35 + catIdx * 0.05 + linkIdx * 0.03 }}
                        className="text-slate-text text-[15px] hover:text-white transition-all duration-300 inline-block group relative"
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r from-teal-accent to-cyan-400 transition-all duration-300 group-hover:w-full" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* ── Social + Bottom Bar ── */}
          <div className="relative">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10"
            >
              {/* Left: copyright + legal */}
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8">
                <span className="text-[15px] text-slate-text/60 font-medium">
                  © {new Date().getFullYear()} Modozo Inc.
                </span>
                <div className="flex items-center gap-6">
                  {["Privacy", "Terms", "Cookies"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-[13px] text-slate-text/30 hover:text-white/70 transition-colors duration-300 uppercase tracking-[0.12em] font-medium"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: social icons */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-text/50 hover:text-white hover:border-teal-accent/30 hover:bg-teal-accent/[0.08] hover:shadow-[0_0_20px_rgba(0,163,150,0.1)] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={17} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Giant Background Watermark ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[35%] select-none pointer-events-none whitespace-nowrap">
        <span
          className="text-[280px] md:text-[400px] font-black tracking-[-0.04em] uppercase"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          MODOZO
        </span>
      </div>
    </footer>
  );
}
