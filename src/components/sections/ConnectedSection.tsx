"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { FileText, GitBranch, Handshake, Eye, BarChart3 } from "lucide-react";

const previewHeights = {
  techpack: [58, 82, 46, 68],
  approval: [42, 76, 55],
  vendor: [72, 48, 88],
  sample: [36, 64, 92],
  production: [52, 74, 39, 86, 61, 96],
} as const;

const features = [
  { icon: FileText, title: "Structured Techpack Management", desc: "Digital techpacks with measurements, BOMs, artwork specs, and version history.", span: "md:col-span-2", preview: "techpack" },
  { icon: GitBranch, title: "Approval Workflows", desc: "Route reviews to the right stakeholders with tracked comments and sign-offs.", span: "", preview: "approval" },
  { icon: Handshake, title: "Vendor Coordination", desc: "Share specs, manage quotes, and track vendor responses in one place.", span: "", preview: "vendor" },
  { icon: Eye, title: "Sample Visibility", desc: "Track every sample iteration from submission to final approval.", span: "md:col-span-2", preview: "sample" },
  { icon: BarChart3, title: "Real-Time Production Tracking", desc: "Monitor milestones, quantities, and delivery timelines across all orders.", span: "md:col-span-3 lg:col-span-2", preview: "production" },
];

function MiniPreview({ type }: { type: string }) {
  const heights = previewHeights[type as keyof typeof previewHeights] ?? previewHeights.approval;

  return (
    <div className="mt-4 pt-3 border-t border-white/5">
      <div className="flex gap-1.5 items-end h-12">
        {heights.map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-electric-blue/20"
            initial={{ height: 0 }}
            whileInView={{ height: `${height}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ConnectedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="features">
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16 md:mb-20">
        <span className="text-xs uppercase tracking-[0.2em] text-electric-blue font-medium">Connected Systems</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 tracking-tight">
          It&apos;s Not Just Features —{" "}
          <span className="text-gradient">It&apos;s How Everything Connects</span>
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`glass-card p-6 !rounded-2xl group hover:border-electric-blue/30 transition-all ${feature.span}`}
          >
            <div className="w-11 h-11 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center mb-4 group-hover:bg-electric-blue/15 transition-colors">
              <feature.icon size={20} className="text-electric-blue" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-slate-text leading-relaxed">{feature.desc}</p>
            <MiniPreview type={feature.preview} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
