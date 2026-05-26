"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import clsx from "clsx";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  noPadding?: boolean;
}

export default function SectionWrapper({
  children,
  className,
  id,
  dark = true,
  noPadding = false,
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id={id}
      className={clsx(
        "relative overflow-hidden",
        !noPadding && "py-24 md:py-32 lg:py-40",
        dark ? "bg-transparent" : "bg-light-bg",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
}
