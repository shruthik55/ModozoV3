"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import clsx from "clsx";

interface WorkflowSplitProps {
  tag: string;
  title: string;
  subtitle: string;
  bullets: string[];
  image: string;
  reverse?: boolean;
  id?: string;
  emoji?: string;
  theme?: "light" | "dark";
}

export default function WorkflowSplit({
  tag,
  title,
  subtitle,
  bullets,
  image,
  reverse = false,
  id,
  theme = "light",
}: WorkflowSplitProps) {
  return (
    <section id={id} className={clsx(
      "relative py-16 md:py-20 overflow-hidden",
      theme === "light" ? "section-light" : "bg-transparent"
    )}>
      {theme === "dark" && (
        <>
          {/* Background Elements */}
          <div className="animated-grid opacity-30" />
          <div className={clsx(
            "glow-orb w-[500px] h-[500px] bg-rich-blue/10",
            reverse ? "-top-40 -left-40" : "-top-40 -right-40"
          )} />
          <div className={clsx(
            "glow-orb w-[400px] h-[400px] bg-teal-accent/5",
            reverse ? "-bottom-20 -right-20" : "-bottom-20 -left-20"
          )} />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={clsx(
          "grid grid-cols-1 items-center gap-12 lg:gap-24",
          reverse ? "lg:grid-cols-[1.5fr_1fr]" : "lg:grid-cols-[1fr_1.5fr]"
        )}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={clsx("space-y-8", reverse ? "lg:order-2 lg:pl-12" : "lg:order-1")}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ffaaad] bg-clip-text text-transparent">{tag}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                {title}
              </h2>
              <p className="text-base md:text-lg text-slate-text leading-relaxed">
                {subtitle}
              </p>
            </div>

            <ul className="space-y-4">
              {bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: reverse ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 w-6 h-6 rounded-full bg-teal-accent/10 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-teal-accent" />
                  </div>
                  <span className="text-sm font-medium text-slate-text">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={clsx("relative w-full lg:w-[115%]", reverse ? "lg:order-1 lg:-ml-[15%]" : "lg:order-1 lg:-mr-[15%]")}
          >
            <div className={clsx(
              "relative z-10 rounded-2xl overflow-hidden group",
              theme === "light" 
                ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]" 
                : "glass-card shadow-[0_8px_30px_rgba(59,130,246,0.1)]"
            )}>
              <Image 
                src={image} 
                alt={title} 
                width={1400} 
                height={1000} 
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-[1.02]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
