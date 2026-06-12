"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageSquare } from "lucide-react";

interface ChatMessage {
  sender: string;
  role: string;
  text: string;
  initials: string;
  avatarBg: string;
  time?: string;
  replies?: number;
}

interface ApparelItem {
  id: string;
  name: string;
  category: string;
  image: string;
  status: string;
  statusColor: string;
  chatThread: {
    author: string;
    text: string;
    align: "left" | "right";
  }[];
  commentSections: {
    label: string;
    messages: ChatMessage[];
  }[];
}

const apparelItems: ApparelItem[] = [
  {
    id: "linesheets",
    name: "S/S T-Shirt Linesheet",
    category: "Linesheets",
    image: "/collab_linesheets_v2.png",
    status: "Shared",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    chatThread: [
      { author: "Design", text: "Linesheet shared with final colorways.", align: "left" },
      { author: "Sales", text: "Pricing looks ready for buyer review.", align: "right" },
      { author: "Sourcing", text: "MOQ notes are updated.", align: "left" },
    ],
    commentSections: [
      {
        label: "Pricing",
        messages: [
          {
            sender: "Sarah Jenkins",
            role: "Design Lead",
            text: "Hey team, the Spring/Summer T-shirt linesheet is ready. I've added all the new colorways and graphic prints.",
            initials: "SJ",
            avatarBg: "bg-blue-500",
            time: "2 hours ago",
            replies: 2,
          },
          {
            sender: "Elena Rostova",
            role: "Sourcing Agent",
            text: "Pricing tiers are locked for all styles. Sharing the linesheet with regional buyers today.",
            initials: "ER",
            avatarBg: "bg-indigo-500",
            time: "1 hour ago",
          },
        ],
      },
      {
        label: "Quantities",
        messages: [
          {
            sender: "Chen Wei",
            role: "Factory Manager",
            text: "Received. Preparing fabric allocation and MOQ planning based on the projected quantities.",
            initials: "CW",
            avatarBg: "bg-teal-500",
            time: "45 min ago",
            replies: 1,
          },
        ],
      },
    ],
  },
  {
    id: "techpack",
    name: "S/S Techpack Review",
    category: "Techpack",
    image: "/collab_techpack_v2.png",
    status: "In Progress",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    chatThread: [
      { author: "Design", text: "BOM and specs are updated.", align: "left" },
      { author: "Pattern", text: "Checking measurements now.", align: "right" },
      { author: "Factory", text: "Prototype cut starts after approval.", align: "left" },
    ],
    commentSections: [
      {
        label: "BOM Updates",
        messages: [
          {
            sender: "Sarah Jenkins",
            role: "Design Lead",
            text: "Uploaded the latest S/S techpack with updated BOM and construction details. Please review and confirm.",
            initials: "SJ",
            avatarBg: "bg-blue-500",
            time: "3 hours ago",
            replies: 1,
          },
          {
            sender: "Tariq Ali",
            role: "Pattern Maker",
            text: "Reviewed the spec sheet. Adjusting seam allowances and updating the measurement grading chart now.",
            initials: "TA",
            avatarBg: "bg-pink-500",
            time: "2 hours ago",
          },
        ],
      },
      {
        label: "Factory",
        messages: [
          {
            sender: "Chen Wei",
            role: "Factory Manager",
            text: "Techpack received. We'll begin the prototype cut based on these specifications.",
            initials: "CW",
            avatarBg: "bg-teal-500",
            time: "1 hour ago",
            replies: 3,
          },
        ],
      },
    ],
  },
  {
    id: "pantone",
    name: "Pantone Library",
    category: "Pantone",
    image: "/collab_pantone.png",
    status: "Review",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    chatThread: [
      { author: "Design", text: "Final palette is uploaded.", align: "left" },
      { author: "Sourcing", text: "Mill shades are matched.", align: "right" },
      { author: "Lab", text: "Dips arrive in 3 days.", align: "left" },
    ],
    commentSections: [
      {
        label: "Color Palette",
        messages: [
          {
            sender: "Sarah Jenkins",
            role: "Design Lead",
            text: "I've updated the Pantone library with the final S/S color palette. Please cross-reference with the approved swatches.",
            initials: "SJ",
            avatarBg: "bg-blue-500",
            time: "5 hours ago",
            replies: 2,
          },
          {
            sender: "Elena Rostova",
            role: "Sourcing Agent",
            text: "Matching Pantone codes with our fabric mill's available dyelots. Lab dips will be ready in 3 days.",
            initials: "ER",
            avatarBg: "bg-indigo-500",
            time: "4 hours ago",
          },
        ],
      },
      {
        label: "Lab Dips",
        messages: [
          {
            sender: "Chen Wei",
            role: "Factory Manager",
            text: "Understood. Awaiting lab dip approvals for light box color matching.",
            initials: "CW",
            avatarBg: "bg-teal-500",
            time: "3 hours ago",
            replies: 1,
          },
        ],
      },
    ],
  },
  {
    id: "strikeoff",
    name: "Print Strike-off",
    category: "Strike-off",
    image: "/printstrikk.png",
    status: "Pending",
    statusColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    chatThread: [
      { author: "Design", text: "Print placement looks aligned.", align: "left" },
      { author: "Sourcing", text: "Ink coverage is within tolerance.", align: "right" },
      { author: "Factory", text: "Mill is waiting for sign-off.", align: "left" },
    ],
    commentSections: [
      {
        label: "Print Quality",
        messages: [
          {
            sender: "Sarah Jenkins",
            role: "Design Lead",
            text: "Strike-off received from the mill. Comparing the print placement against the original artwork file now.",
            initials: "SJ",
            avatarBg: "bg-blue-500",
            time: "3 hours ago",
            replies: 2,
          },
          {
            sender: "Elena Rostova",
            role: "Sourcing Agent",
            text: "Color matching looks accurate under D65 lighting. Ink coverage on the chest graphic is within tolerance.",
            initials: "ER",
            avatarBg: "bg-indigo-500",
            time: "2 hours ago",
          },
        ],
      },
      {
        label: "Approval",
        messages: [
          {
            sender: "Chen Wei",
            role: "Factory Manager",
            text: "Awaiting final sign-off to proceed with bulk print production. Mill is on standby.",
            initials: "CW",
            avatarBg: "bg-teal-500",
            time: "1 hour ago",
            replies: 1,
          },
        ],
      },
    ],
  },
  {
    id: "ppsample",
    name: "Pre-Production Sample",
    category: "PP Sample",
    image: "/pp-smpf.png",
    status: "Approved",
    statusColor: "text-teal-400 bg-teal-400/10 border-teal-400/20",
    chatThread: [
      { author: "QA", text: "PP sample passes inspection.", align: "left" },
      { author: "Design", text: "Approved. Keep label placement.", align: "right" },
      { author: "Factory", text: "Bulk line setup begins today.", align: "left" },
    ],
    commentSections: [
      {
        label: "QA Review",
        messages: [
          {
            sender: "Diana Prince",
            role: "QA Lead",
            text: "Pre-production sample has arrived. Stitch count, seam tension, and fabric hand all meet standards.",
            initials: "QA",
            avatarBg: "bg-emerald-500",
            time: "1 day ago",
            replies: 3,
          },
          {
            sender: "Sarah Jenkins",
            role: "Design Lead",
            text: "Approved. Please verify care label placement and hang tag positioning match the final techpack.",
            initials: "SJ",
            avatarBg: "bg-blue-500",
            time: "1 day ago",
          },
        ],
      },
      {
        label: "Production",
        messages: [
          {
            sender: "Chen Wei",
            role: "Factory Manager",
            text: "PP sample approved. Locking in production line settings for bulk manufacturing.",
            initials: "CW",
            avatarBg: "bg-teal-500",
            time: "22 hours ago",
            replies: 1,
          },
        ],
      },
    ],
  },
  {
    id: "fit",
    name: "Fit Approval",
    category: "Fit",
    image: "/fitappro.png",
    status: "Adjusted",
    statusColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    chatThread: [
      { author: "Fit", text: "Shoulder and sleeve are corrected.", align: "left" },
      { author: "Pattern", text: "DXF file is exported.", align: "right" },
      { author: "Factory", text: "Marker file received.", align: "left" },
    ],
    commentSections: [
      {
        label: "Fit Adjustments",
        messages: [
          {
            sender: "Marcus Vance",
            role: "Fit Specialist",
            text: "Fit review complete. Shoulder drop adjusted by -0.5cm and sleeve length shortened for better drape.",
            initials: "MV",
            avatarBg: "bg-purple-500",
            time: "6 hours ago",
            replies: 2,
          },
          {
            sender: "Tariq Ali",
            role: "Pattern Maker",
            text: "Pattern corrections applied. Exporting the updated DXF and grading specs to the factory portal.",
            initials: "TA",
            avatarBg: "bg-pink-500",
            time: "5 hours ago",
          },
        ],
      },
      {
        label: "Factory Response",
        messages: [
          {
            sender: "Chen Wei",
            role: "Factory Manager",
            text: "DXF received. Loading the corrected marker for the next sample round.",
            initials: "CW",
            avatarBg: "bg-teal-500",
            time: "4 hours ago",
            replies: 1,
          },
        ],
      },
    ],
  },
];

export default function CentralizedCollaborationVisual({ onCycleComplete }: { onCycleComplete?: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<boolean>(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCycleCompleteRef = useRef(onCycleComplete);
  const pendingCycleCompleteRef = useRef(false);

  useEffect(() => { onCycleCompleteRef.current = onCycleComplete; }, [onCycleComplete]);

  const advanceActiveItem = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % apparelItems.length;
      pendingCycleCompleteRef.current = next === 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!pendingCycleCompleteRef.current || activeIndex !== 0) return;

    pendingCycleCompleteRef.current = false;
    onCycleCompleteRef.current?.();
  }, [activeIndex]);

  const activeItem = apparelItems[activeIndex];

  // Auto-play timer
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        if (autoPlayRef.current) {
          advanceActiveItem();
        }
      }, 7000);
    };

    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advanceActiveItem]);

  return (
    <div className="w-full bg-[#040a15]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden h-auto lg:h-[640px]">
      {/* ═══════ CENTER: Product Image Preview ═══════ */}
      <div className="h-full flex flex-col min-h-[390px] lg:min-h-0 bg-[#030814]/30">
        {/* Image Area */}
        <div className="flex-1 p-2 lg:p-3 flex items-center justify-center relative overflow-hidden">
          {/* Background radar circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="absolute size-40 rounded-full border border-white/10 animate-[ping_6s_infinite]" />
            <div className="absolute size-64 rounded-full border border-white/5 animate-[ping_10s_infinite]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full h-full min-h-[480px] md:min-h-[530px] lg:min-h-[590px] flex flex-col items-center justify-start pt-20 pb-[185px] md:pt-24 md:pb-[195px] lg:pt-18 lg:pb-8 px-4 md:px-6 lg:px-8 rounded-xl border border-white/10 bg-black/15 overflow-hidden"
            >
              {/* Card Name Tag (Top Left Corner of the entire outer container card) */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 lg:top-5 lg:left-5 z-20 max-w-[70%] rounded-lg border border-white/15 bg-[#07111f]/90 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md whitespace-nowrap">
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-electric-blue/80">
                  {activeItem.category}
                </span>
                <span className="mt-0.5 block truncate text-xs font-bold text-white">
                  {activeItem.name}
                </span>
              </div>

              {/* Centered Relative Wrapper for Image */}
              <div className="relative">
                {/* Center Image (Optimized Size) */}
                <img
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="h-[210px] sm:h-[240px] md:h-[270px] lg:h-[310px] w-auto object-contain rounded-xl border border-white/10 bg-black/25 transition-transform duration-700 hover:scale-[1.01]"
                />
              </div>

              {/* Comment Chat Box (Bottom Right Corner of the entire outer container card - Compact Size) */}
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 lg:bottom-5 lg:right-5 z-20 w-[220px] sm:w-[235px] md:w-[250px] rounded-xl border border-electric-blue/30 bg-[#07111f]/95 p-2.5 md:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <div className="mb-2 flex items-center gap-2">
                  <div className="size-5.5 rounded-lg bg-electric-blue/15 flex items-center justify-center">
                    <MessageSquare size={12} className="text-electric-blue" />
                  </div>
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-white/45">
                    Team chat
                  </span>
                </div>
                <div className="space-y-1.5">
                  {activeItem.chatThread.map((message) => (
                    <div
                      key={`${activeItem.id}-${message.author}`}
                      className={`flex ${message.align === "right" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-lg px-2.5 py-1 ${
                          message.align === "right"
                            ? "bg-electric-blue/20 border border-electric-blue/25 text-white"
                            : "bg-white/[0.06] border border-white/10 text-white/85"
                        }`}
                      >
                        <span className="block text-[7.5px] font-bold uppercase tracking-[0.12em] text-white/35">
                          {message.author}
                        </span>
                        <span className="block text-[9.5px] font-semibold leading-snug">
                          {message.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2.5 flex items-center gap-1.5 border-t border-white/[0.06] pt-2">
                  <span className={`text-[7.5px] px-1.5 py-0.5 rounded border leading-none font-medium ${activeItem.statusColor}`}>
                    {activeItem.status}
                  </span>
                  <span className="text-[8.5px] font-medium text-white/35">
                    synced now
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
