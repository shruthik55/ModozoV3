"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Headphones, DatabaseZap, Users } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

const services = [
  {
    icon: Headphones,
    title: "Expert Design Guidance",
    desc: "Work closely with our fashion specialists to refine your collection with precision and trend-focused insights.",
    visual: "/photo47.png"
  },
  {
    icon: DatabaseZap,
    title: "Fast Production Support",
    desc: "Accelerate your production process with dedicated assistance from our experienced manufacturing team.",
    visual: "/photo36.png"
  },
  {
    icon: Users,
    title: "Dedicated VIP Assistance",
    desc: "Receive personalized support and seamless communication throughout every stage of your fashion journey.",
    visual: "/photo48.png"
  },
];

export default function VIPServiceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="services" className="bg-transparent py-12 md:py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-sm font-bold text-teal-accent uppercase tracking-widest"
          >
            {/* START NOW */}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Get VIP service from Modozo experts
          </motion.h2>
        </div>

        {/* SVG Definition for Red Gradient Icons */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="lightRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7b7b" />
              <stop offset="100%" stopColor="#ffb3b3" />
            </linearGradient>
          </defs>
        </svg>

        {/* 3-Column Card Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10"
          onMouseLeave={() => setActiveIndex(0)}
        >
          {services.map((item, i) => (
            <button
              key={item.title}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              className={clsx(
                "p-6 md:p-8 flex flex-col items-start text-left relative overflow-hidden group border rounded-[2rem] transition-all duration-500 cursor-pointer",
                activeIndex === i
                  ? "bg-gradient-to-br from-[#e8d08a] to-[#d4a94e] border-[#d8b86d] shadow-[0_0_40px_rgba(216,184,109,0.2)]"
                  : "bg-gradient-to-br from-[#d8b86d]/10 to-[#c9a545]/10 border-white/5 hover:from-[#d8b86d]/18 hover:to-[#c9a545]/18 hover:border-[#d8b86d]/30"
              )}
            >
              {/* Active Glow */}
              <div className={clsx(
                "absolute -inset-10 bg-[#d8b86d]/10 blur-[60px] rounded-full transition-opacity duration-700 pointer-events-none",
                activeIndex === i ? "opacity-100" : "opacity-0"
              )} />

              <div className="relative z-10 flex flex-col items-start h-full w-full">
                <div className={clsx(
                  "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                  activeIndex === i
                    ? "bg-[#06101F]/90 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)] scale-110"
                    : "bg-red-500/5 border border-red-500/15 group-hover:bg-red-500/10 group-hover:border-red-500/30"
                )}>
                  <item.icon
                    size={20}
                    strokeWidth={1.5}
                    className="[stroke:url(#lightRedGradient)]"
                  />
                </div>
                
                <h3 className={clsx(
                  "text-lg font-bold mb-2 transition-colors duration-300",
                  activeIndex === i ? "text-[#06101F]" : "text-white"
                )}>
                  {item.title}
                </h3>
                
                <p className={clsx(
                  "text-sm leading-relaxed transition-colors duration-300",
                  activeIndex === i ? "text-[#06101F]/80" : "text-slate-400"
                )}>
                  {item.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Image Display */}
        <div className="relative w-full max-w-3xl mx-auto px-4 md:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              <Image
                src={services[activeIndex].visual}
                alt={services[activeIndex].title}
                width={1600}
                height={900}
                className="w-full h-auto display-block"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
