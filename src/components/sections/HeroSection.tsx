"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-20" id="hero">
      {/* Background Elements */}
      <div className="animated-grid opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8 lg:pr-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              <span className="text-[#bd9128]">Supercharge Your</span> <br />
              <span className="text-white">Fashion Supply Chain</span>
            </motion.h1>

            {/* <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl"
            >
              The operating system for fashion brands. Seamlessly connect your product data, teams, and manufacturers on one high-fidelity platform.
            </motion.p> */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="lg" href="#demo" className="!bg-[hsl(12,60%,46%)] !border !border-[hsl(12,60%,38%)] text-white hover:!bg-[hsl(12,60%,40%)] hover:shadow-[0_0_20px_rgba(192,70,50,0.4)] px-10" id="hero-cta-demo">
                Get a demo
                <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" size="lg" href="#workflow" className="px-10" id="hero-cta-how">
                See How It Works
              </Button>
            </motion.div>
          </div>

          {/* Right: Immersive Cinematic Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              opacity: { duration: 1.5, delay: 0.2 },
              scale: { duration: 1.5, delay: 0.2 }
            }}
            className="relative lg:w-[130%] lg:translate-x-[-5%] xl:translate-x-[-8%] flex justify-center items-center h-full min-h-[600px]"
          >
            <div className="relative w-full group flex justify-center items-center">
              {/* Seamlessly Integrated Visual */}
              <div
                className="relative z-10 w-full flex justify-center items-center overflow-visible"
                style={{
                  maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
                }}
              >
                <Image
                  src="/hero_photo55.png"
                  alt="Modozo Luxury Fashion Supply Chain Model"
                  width={1800}
                  height={1800}
                  className="w-full h-auto max-h-[74vh] lg:max-h-[82vh] lg:scale-[0.92] object-contain transition-transform duration-1000 group-hover:scale-[0.95]"
                  priority
                  unoptimized
                />
              </div>

              {/* Chat Bubble 1: Top-Left (Female) */}
              <div className="absolute z-20 top-[12%] left-[2%] lg:left-[-5%] xl:left-[4%] flex items-center gap-3 px-4 py-3 bg-[rgba(12,26,46,0.7)] backdrop-blur-md border border-[rgba(59,130,246,0.15)] rounded-2xl shadow-[0_8px_32px_0_rgba(4,11,23,0.4)] max-w-[240px] md:max-w-[280px] pointer-events-none transition-all duration-500 group-hover:translate-y-[-4px] scale-90 sm:scale-100 origin-left">
                <Image
                  src="/avatars/avatar1.png"
                  alt="Avatar"
                  width={38}
                  height={38}
                  className="rounded-full border border-white/10 flex-shrink-0"
                />
                <div className="text-[11px] md:text-[12px] font-medium text-white leading-snug">
                  Can we update the sleeve measurements?
                </div>
              </div>

              {/* Chat Bubble 2: Bottom-Left (Male with glasses) */}
              <div className="absolute z-20 bottom-[32%] left-[1%] lg:left-[-7%] xl:left-[0%] flex items-center gap-3 px-4 py-3 bg-[rgba(12,26,46,0.7)] backdrop-blur-md border border-[rgba(59,130,246,0.15)] rounded-2xl shadow-[0_8px_32px_0_rgba(4,11,23,0.4)] max-w-[240px] md:max-w-[280px] pointer-events-none transition-all duration-500 group-hover:translate-y-[4px] scale-90 sm:scale-100 origin-left">
                <Image
                  src="/avatars/avatar2.png"
                  alt="Avatar"
                  width={38}
                  height={38}
                  className="rounded-full border border-white/10 flex-shrink-0"
                />
                <div className="text-[11px] md:text-[12px] font-medium text-white leading-snug">
                  Sleeve measurement updated.<br />New length: 62 cm
                </div>
              </div>

              {/* Chat Bubble 3: Top-Right (Male) */}
              <div className="absolute z-20 top-[20%] right-[-4%] lg:right-[-14%] xl:right-[-4%] flex items-center gap-3 px-4 py-3 bg-[rgba(12,26,46,0.7)] backdrop-blur-md border border-[rgba(59,130,246,0.15)] rounded-2xl shadow-[0_8px_32px_0_rgba(4,11,23,0.4)] max-w-[260px] md:max-w-[300px] pointer-events-none transition-all duration-500 group-hover:translate-y-[-4px] scale-90 sm:scale-100 origin-right">
                <Image
                  src="/avatars/avatar3.png"
                  alt="Avatar"
                  width={38}
                  height={38}
                  className="rounded-full border border-white/10 flex-shrink-0"
                />
                <div className="text-[11px] md:text-[12px] font-medium text-white leading-snug">
                  Sure, I'll update the sleeve measurements and share the revised specs.
                </div>
              </div>

              {/* Chat Bubble 4: Bottom-Right (Female) */}
              <div className="absolute z-20 bottom-[20%] right-[1%] lg:right-[-7%] xl:right-[0%] flex items-center justify-between gap-3 px-4 py-3 bg-[rgba(12,26,46,0.7)] backdrop-blur-md border border-[rgba(59,130,246,0.15)] rounded-2xl shadow-[0_8px_32px_0_rgba(4,11,23,0.4)] min-w-[200px] md:min-w-[240px] pointer-events-none transition-all duration-500 group-hover:translate-y-[4px] scale-90 sm:scale-100 origin-right">
                <div className="flex items-center gap-3">
                  <Image
                    src="/avatars/avatar4.png"
                    alt="Avatar"
                    width={38}
                    height={38}
                    className="rounded-full border border-white/10 flex-shrink-0"
                  />
                  <div className="text-[11px] md:text-[12px] font-medium text-white leading-snug">
                    Looks good.<br />Please proceed.
                  </div>
                </div>
                <div className="flex-shrink-0 w-[18px] h-[18px] rounded-full bg-[#00A396] flex items-center justify-center text-white">
                  <Check size={11} strokeWidth={4} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
