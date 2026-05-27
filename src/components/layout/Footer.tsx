"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Linkedin, ArrowRight } from "lucide-react";

/* ─── Data ─── */
const footerLinks = {
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

const bottomLinks = [
  // { label: "Privacy Policy", href: "#" },
  // { label: "Terms of Service", href: "#" },
  { label: "About Us", href: "#" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <footer
      className="bg-transparent border-t border-white/5 py-16"
      id="footer"
      ref={ref}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Main Layout Grid: Left (Logo/Contact), Middle (CTA), Right (Support) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-4 items-center lg:items-start gap-12 lg:gap-8 mb-16"
        >
          {/* 1. Logo & Centered Contact Column */}
          <div className="lg:col-span-1 flex flex-col items-center text-center gap-5 w-full">
            <div className="flex items-center justify-center">
              <Image
                src="/logo4.png"
                alt="Modozo"
                width={240}
                height={72}
                className="h-16 w-auto opacity-90"
                priority
              />
            </div>
            <div className="text-neutral-400 text-sm leading-relaxed space-y-1.5 font-sans">
              <p className="text-neutral-300">Shaikpet, Telangana, India, 500081</p>
              <p>Email: <a href="mailto:admin@modozo.fashion" className="hover:text-white transition-colors duration-200">admin@modozo.fashion</a></p>
              <p>Contact: <a href="tel:+911234996667" className="hover:text-white transition-colors duration-200">+91 123-499-6667</a></p>
            </div>
          </div>

          {/* 2. Middle CTA Section */}
          <div className="lg:col-span-2 flex flex-col items-center text-center w-full py-2">
            <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold text-white tracking-tight leading-snug mb-3">
              The future of fashion{" "}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#ebd07e] via-[#f5e6b8] to-[#ebd07e] bg-clip-text text-transparent">
                starts here.
              </span>
            </h3>
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-sm mx-auto mb-6">
              Join the brands and manufacturers building the next generation of connected fashion workflows.
            </p>

            {/* Glassmorphism Email Input */}
            <div className="w-full max-w-md mx-auto">
              <div
                className={`relative group rounded-xl p-[1px] transition-all duration-500 ${isFocused
                    ? "bg-gradient-to-r from-teal-accent/60 via-cyan-400/40 to-teal-accent/60 shadow-[0_0_30px_rgba(0,163,150,0.12)]"
                    : "bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-white/[0.08] hover:from-teal-accent/20 hover:via-cyan-400/15 hover:to-teal-accent/20"
                  }`}
              >
                <div className="flex items-center gap-2 bg-[#070E1A]/90 backdrop-blur-2xl rounded-[11px] px-4 py-1.5">
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 bg-transparent text-white text-xs placeholder:text-neutral-500 placeholder:font-semibold py-2 focus:outline-none"
                  />
                  <button
                    className="flex items-center gap-1.5 bg-gradient-to-r from-[#e05555] to-[#ff7b7b] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:from-[#d04a4a] hover:to-[#f06e6e] transition-all duration-300 shadow-md shadow-red-500/10"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Right Support Column */}
          <div className="lg:col-span-1 flex flex-col w-full items-center lg:items-end">
            <div className="flex flex-col items-start w-fit">
              <h4 className="text-sm font-bold text-white tracking-wider mb-5">
                Support
              </h4>
              <ul className="space-y-3.5">
                {footerLinks.Support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-neutral-400 text-[14px] hover:text-white transition-colors duration-200 font-sans"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Thin Divider Line */}
        <div className="w-full h-px bg-neutral-800 mb-8" />

        {/* Bottom Section: Left copyright & Right links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-[14px] text-neutral-400 font-sans"
        >
          {/* Left Copyright */}
          <div className="text-neutral-500 font-normal">
            © 2026 Modozo. All rights reserved.
          </div>

          {/* Right Links + LinkedIn Icon */}
          <div className="flex items-center flex-wrap gap-x-8 gap-y-4">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
