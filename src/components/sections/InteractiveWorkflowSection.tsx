"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";

const workflowData = [
  {
    title: "Faster Team Collaboration",
    desc: "Streamline communication and production workflows across your fashion team with seamless coordination.",
    image: "/photo2.png",
  },
  {
    title: "Smart Production Planning",
    desc: "Organize sourcing, manufacturing, and timelines efficiently for faster delivery cycles.",
    image: "/photo31.png",
  },
  {
    title: "Scalable Fashion Operations",
    desc: "Manage growing collections and production demands with flexible and modern workflows.",
    image: "/photo4.png",
  },
];

export default function InteractiveWorkflowSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SectionWrapper id="features" className="bg-deep-navy border-t border-white/5 !py-16 md:!py-20">
      <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#5eb1ff] mb-6 tracking-tight"
        >
          Built for Fashion Teams <br className="hidden md:block" /> That Move Fast
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white leading-relaxed max-w-2xl mx-auto"
        >
          Modozo connects design, approvals, vendors, sampling, and production into one unified workflow — helping teams eliminate delays, reduce miscommunication, and launch collections faster.
        </motion.p>
      </div>

      {/* Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
        {workflowData.map((item, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer p-6 rounded-[2rem] transition-all duration-500 relative overflow-hidden group border ${activeIndex === index
              ? "bg-gradient-to-br from-[#e8d08a] to-[#d4a94e] border-[#d8b86d] shadow-[0_0_40px_rgba(216,184,109,0.2)]"
              : "bg-gradient-to-br from-[#d8b86d]/10 to-[#c9a545]/10 border-white/5 hover:from-[#d8b86d]/18 hover:to-[#c9a545]/18 hover:border-[#d8b86d]/30"
              }`}
          >
            {/* Active Glow */}
            <div className={`absolute -inset-10 bg-[#d8b86d]/10 blur-[60px] rounded-full transition-opacity duration-700 ${activeIndex === index ? "opacity-100" : "opacity-0"}`} />

            <div className="relative z-10 h-full flex flex-col justify-center pt-2">
              <h3 className={`text-xl font-bold mb-3 transition-all duration-500 ${activeIndex === index ? "text-[#06101F] translate-x-1" : "text-white/60"}`}>
                {item.title}
              </h3>

              <p className={`text-sm leading-relaxed transition-all duration-500 ${activeIndex === index ? "text-[#06101F]/80" : "text-white/30"}`}>
                {item.desc}
              </p>

              {/* Selection Indicator */}
              <div className="mt-6 overflow-hidden h-[1px] w-full bg-white/5">
                <motion.div
                  className="h-full bg-[#5eb1ff]"
                  initial={{ x: "-100%" }}
                  animate={{ x: activeIndex === index ? "0%" : "-100%" }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Visual Area */}
      <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.4/1] rounded-[2rem] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={itemForIndex(activeIndex).image}
              alt={itemForIndex(activeIndex).title}
              fill
              className="object-cover brightness-110 contrast-[1.05]"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

function itemForIndex(index: number) {
  return workflowData[index] || workflowData[0];
}
