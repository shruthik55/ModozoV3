"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Activity, CheckCircle2, Server, TrendingUp, Users2, ShieldCheck } from "lucide-react";

interface ScanLog {
  time: string;
  station: string;
  details: string;
}

interface ProductionBatch {
  id: string;
  poNumber: string;
  name: string;
  category: string;
  image: string;
  status: string;
  progress: number;
  activeStep: number; // 0: Cutting, 1: Sewing, 2: Finishing, 3: Packing, 4: Shipped
  statusColor: string;
  defects: string;
  kpis: {
    target: number;
    completed: number;
    speed: string;
  };
  logs: ScanLog[];
}

const steps = ["Cutting", "Sewing", "Finishing", "Packing", "Shipped"];

const productionBatches: ProductionBatch[] = [
  {
    id: "po-2024",
    poNumber: "PO-2024",
    name: "Camo Trench Coat",
    category: "Outerwear",
    image: "/collab_jacket.png",
    status: "Sewing",
    progress: 65,
    activeStep: 1,
    statusColor: "text-amber-400 border-amber-400/20 bg-amber-400/5",
    defects: "0.12%",
    kpis: {
      target: 600,
      completed: 390,
      speed: "45 pcs/hr",
    },
    logs: [
      {
        time: "18:12:02",
        station: "Stitching Stn 4",
        details: "Bundle #32 main body panels seamed and verified.",
      },
      {
        time: "18:14:15",
        station: "Sleeve Stn 2",
        details: "Cuff attachments completed for bundle #33.",
      },
      {
        time: "18:15:30",
        station: "QC Inline Stn",
        details: "Laser stitch check complete. Tolerances within 0.1mm.",
      },
    ],
  },
  {
    id: "po-2025",
    poNumber: "PO-2025",
    name: "Baroque Polo Shirt",
    category: "Tops",
    image: "/collab_polo.png",
    status: "Finishing",
    progress: 88,
    activeStep: 2,
    statusColor: "text-blue-400 border-blue-400/20 bg-blue-400/5",
    defects: "0.05%",
    kpis: {
      target: 800,
      completed: 704,
      speed: "62 pcs/hr",
    },
    logs: [
      {
        time: "18:10:45",
        station: "Collar Stn 1",
        details: "Baroque patterned collars fused and aligned.",
      },
      {
        time: "18:12:55",
        station: "Pressing Stn 3",
        details: "Steam pressing cycle completed. Moving to hang-tagging.",
      },
      {
        time: "18:15:10",
        station: "Tagging Stn",
        details: "RFID packaging tags verified and locked to collars.",
      },
    ],
  },
  {
    id: "po-2026",
    poNumber: "PO-2026",
    name: "Leopard Runner Shoes",
    category: "Footwear",
    image: "/collab_shoe.png",
    status: "Packing",
    progress: 96,
    activeStep: 3,
    statusColor: "text-purple-400 border-purple-400/20 bg-purple-400/5",
    defects: "0.00%",
    kpis: {
      target: 400,
      completed: 384,
      speed: "28 prs/hr",
    },
    logs: [
      {
        time: "18:08:30",
        station: "Sole Bonding",
        details: "Adhesive vulcanization cycle passed check.",
      },
      {
        time: "18:11:45",
        station: "Lacing Stn 2",
        details: "Laces threaded and insoles set. Moving to box packing.",
      },
      {
        time: "18:15:02",
        station: "Packing Stn 1",
        details: "Pairs scanned, boxed, and palletized. Waybill generated.",
      },
    ],
  },
];

export default function ProductionTrackingVisual() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleLogsCount, setVisibleLogsCount] = useState(0);
  const autoPlayRef = useRef<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeBatch = productionBatches[activeIndex];

  // Auto-play timer
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        if (autoPlayRef.current) {
          setActiveIndex((prev) => (prev + 1) % productionBatches.length);
        }
      }, 8000);
    };

    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Sequential logs reveal
  useEffect(() => {
    setVisibleLogsCount(0);
    const timers = [
      setTimeout(() => setVisibleLogsCount(1), 400),
      setTimeout(() => setVisibleLogsCount(2), 1600),
      setTimeout(() => setVisibleLogsCount(3), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    autoPlayRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // Resume autoplay after 15 seconds of inactivity
    timerRef.current = setTimeout(() => {
      autoPlayRef.current = true;
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % productionBatches.length);
      }, 8000);
    }, 15000);
  };

  return (
    <div className="w-full bg-[#040a15]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col h-auto md:h-[500px]">
      
      {/* Top Metrics Row - Instantly conveys "Dashboard" theme */}
      <div className="grid grid-cols-3 border-b border-white/10 bg-[#050e1e]/80 p-3.5 shrink-0 text-left">
        <div className="flex items-center gap-2.5 px-2 border-r border-white/10">
          <div className="size-8 rounded-lg bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center shrink-0">
            <Activity size={15} className="text-electric-blue animate-pulse" />
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold tracking-wider text-white/40 block leading-none mb-1">
              Active Floor Lines
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white flex items-center gap-1.5 leading-none">
              3 Running <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 border-r border-white/10">
          <div className="size-8 rounded-lg bg-teal-accent/10 border border-teal-accent/20 flex items-center justify-center shrink-0">
            <TrendingUp size={15} className="text-teal-accent" />
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold tracking-wider text-white/40 block leading-none mb-1">
              Line Efficiency
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white leading-none">
              96.8%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3">
          <div className="size-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
            <Server size={15} className="text-purple-400" />
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold tracking-wider text-white/40 block leading-none mb-1">
              Live Scanner nodes
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white leading-none">
              42 Online
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        
        {/* Left Side - Production Lines (55% width on desktop) */}
        <div className="w-full md:w-[55%] p-4 flex flex-col border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto bg-[#030814]/30">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
              Manufacturing Line Monitor
            </span>
            <span className="text-[9px] text-white/30 font-bold font-mono">
              Auto-rotating
            </span>
          </div>

          {/* Lines list */}
          <div className="flex flex-col gap-3">
            {productionBatches.map((batch, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={batch.id}
                  onClick={() => handleSelect(index)}
                  className={`group/line flex items-center p-3 rounded-xl text-left border transition-all duration-300 ${
                    isActive
                      ? "bg-white/[0.05] border-white/15 shadow-[0_4px_25px_rgba(0,0,0,0.3)]"
                      : "bg-transparent border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Image container with Laser Scanning Animation on Active */}
                  <div className="relative size-14 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                    <Image
                      src={batch.image}
                      alt={batch.name}
                      width={52}
                      height={52}
                      className="object-contain"
                    />
                    
                    {/* Laser Scanner animation */}
                    {isActive && (
                      <div 
                        className="absolute left-0 right-0 h-[2px] bg-emerald-400 z-10 pointer-events-none"
                        style={{
                          boxShadow: "0 0 8px #34d399, 0 0 2px #34d399",
                          animation: "scan 2s linear infinite",
                        }}
                      />
                    )}
                  </div>

                  {/* Batch detail */}
                  <div className="flex-1 min-w-0 ml-3.5 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-bold text-white/40 leading-none">
                        LINE {index + 1} &mdash; {batch.poNumber}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border leading-none font-medium ${batch.statusColor}`}>
                        {batch.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-tight truncate mb-2">
                      {batch.name}
                    </h4>

                    {/* Progress indicator */}
                    <div className="flex items-center justify-between text-[9px] text-white/40 mb-1 leading-none">
                      <span>Completed: <strong className="text-white">{batch.kpis.completed}</strong>/{batch.kpis.target} pcs</span>
                      <span className="font-bold text-white">{batch.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-electric-blue to-teal-accent transition-all duration-500"
                        style={{ width: `${batch.progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Live Milestones & Logs (45% width on desktop) */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#040b17]/60">
          
          {/* Milestone Stepper */}
          <div className="p-4 border-b border-white/10 shrink-0 text-left">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                Milestone Tracking
              </span>
              <span className="text-[9px] text-white/50 font-bold bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                Target: {activeBatch.kpis.speed}
              </span>
            </div>

            {/* Stepper */}
            <div className="relative flex items-center justify-between w-full px-2 mt-1 mb-2">
              <div className="absolute left-0 right-0 h-0.5 bg-white/10 z-0 top-[10px]" />
              <div 
                className="absolute left-0 h-0.5 bg-electric-blue z-0 top-[10px] transition-all duration-700" 
                style={{ width: `${(activeBatch.activeStep / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((step, idx) => {
                const isCompleted = idx < activeBatch.activeStep;
                const isActive = idx === activeBatch.activeStep;

                return (
                  <div key={step} className="flex flex-col items-center relative z-10">
                    <div className={`size-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isCompleted 
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : isActive
                        ? "bg-[#040a15] border-electric-blue text-electric-blue shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                        : "bg-[#040a15] border-white/20 text-white/30"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 size={10} className="stroke-[3]" />
                      ) : isActive ? (
                        <div className="size-1.5 rounded-full bg-electric-blue animate-pulse" />
                      ) : (
                        <span className="text-[7px] font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <span className={`text-[8px] mt-1.5 font-bold transition-all duration-300 ${
                      isActive ? "text-electric-blue" : isCompleted ? "text-white/60" : "text-white/30"
                    }`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Console logs */}
          <div className="flex-1 p-4 flex flex-col overflow-hidden min-h-0 bg-[#040b17]/95">
            <div className="flex items-center justify-between mb-3.5 shrink-0 text-left">
              <div className="flex items-center gap-2">
                <Server size={12} className="text-electric-blue animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                  Live Scanner event stream
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-white/40 font-mono">Defect Rate:</span>
                <span className="text-[9px] font-bold text-emerald-400 font-mono">{activeBatch.defects}</span>
              </div>
            </div>

            {/* Terminal items */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono scrollbar-thin">
              <AnimatePresence>
                {activeBatch.logs.slice(0, visibleLogsCount).map((log, i) => (
                  <motion.div
                    key={log.time + i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex items-start text-left text-[10px] leading-relaxed border-l border-electric-blue/40 pl-2.5 py-0.5"
                  >
                    <span className="text-electric-blue shrink-0 w-[58px] font-bold">
                      [{log.time}]
                    </span>
                    <span className="text-teal-accent font-semibold shrink-0 w-[84px] truncate mr-2">
                      {log.station}:
                    </span>
                    <span className="text-white/70">
                      {log.details}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>

      {/* Embedded CSS for scan keyframe */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </div>
  );
}
