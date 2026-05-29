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

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl"
            >
              The operating system for fashion brands. Seamlessly connect your product data, teams, and manufacturers on one high-fidelity platform.
            </motion.p>

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
            className="relative lg:w-[145%] lg:translate-x-[-8%] xl:translate-x-[-12%] flex justify-center items-center h-full min-h-[600px]"
          >
            <div className="relative w-full group flex justify-center items-center">
              {/* Seamlessly Integrated Visual */}
              <div className="relative z-10 w-full flex justify-center items-center overflow-visible">
                <Image
                  src="/photo56.png"
                  alt="Modozo Immersive Fashion Tech Interface"
                  width={1800}
                  height={1800}
                  className="w-full h-auto max-h-[85vh] lg:max-h-[95vh] object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
