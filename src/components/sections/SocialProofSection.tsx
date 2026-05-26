"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="impact-overview" className="bg-transparent text-center py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-rich-blue/10 rounded-full filter blur-[120px] pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-accent/20 bg-teal-accent/5 text-[10px] font-bold text-teal-accent uppercase tracking-[0.2em] mb-4">
          Companies
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl mx-auto leading-[1.1] tracking-tight">
          Working together is a success,<br />
          <span className="text-gradient">$1 billion of it</span>
        </h2>

        <p className="text-lg md:text-xl text-slate-text max-w-2xl mx-auto leading-relaxed">
          Modozo has brought 1M+ products to life from start to finish and collectively managed $1B+ in production value.
        </p>

        {/* Animated connecting bubbles in background (conceptual) */}
        <div className="pt-12 flex flex-wrap justify-center gap-12 opacity-30">
           {/* Placeholders for logos or abstract shapes */}
           {[...Array(6)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
               className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40"
             >
               BRAND
             </motion.div>
           ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
