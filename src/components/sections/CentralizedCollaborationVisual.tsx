"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageSquare, MoreHorizontal, Reply } from "lucide-react";

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
    image: "/collab_linesheets.png",
    status: "Shared",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
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
    image: "/collab_techpack.png",
    status: "In Progress",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
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
    id: "fit",
    name: "Fit Approval",
    category: "Fit",
    image: "/collab_fit.png",
    status: "Adjusted",
    statusColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
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
  {
    id: "ppsample",
    name: "Pre-Production Sample",
    category: "PP Sample",
    image: "/collab_pp_sample.png",
    status: "Approved",
    statusColor: "text-teal-400 bg-teal-400/10 border-teal-400/20",
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
];

export default function CentralizedCollaborationVisual() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = apparelItems[activeIndex];

  // Total comment count for active item
  const totalComments = activeItem.commentSections.reduce(
    (sum, section) => sum + section.messages.length,
    0
  );

  // Auto-play timer
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        if (autoPlayRef.current) {
          setActiveIndex((prev) => (prev + 1) % apparelItems.length);
        }
      }, 7000);
    };

    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    autoPlayRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      autoPlayRef.current = true;
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % apparelItems.length);
      }, 7000);
    }, 12000);
  };

  return (
    <div className="w-full bg-[#040a15]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[620px]">
      {/* ═══════ LEFT: Sidebar - Product Workspace list ═══════ */}
      <div className="w-full lg:w-[190px] xl:w-[210px] border-b lg:border-b-0 lg:border-r border-white/10 p-3 flex flex-col bg-[#050e1e]/60 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">
            Workspace
          </span>
          <span className="text-[9px] bg-electric-blue/10 text-electric-blue px-1.5 py-0.5 rounded-full font-medium">
            5 Active
          </span>
        </div>

        {/* Scrollable sidebar list */}
        <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 scrollbar-none">
          {apparelItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(index)}
                className={`flex items-center gap-2.5 p-2 rounded-xl text-left border transition-all duration-300 shrink-0 lg:shrink ${
                  isActive
                    ? "bg-white/[0.06] border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                    : "bg-transparent border-transparent hover:bg-white/[0.02]"
                }`}
              >
                {/* Thumb Image */}
                <div className="relative size-8 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center border border-white/10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col min-w-[100px] lg:min-w-0 pr-1">
                  <span className="text-[9px] font-medium text-white/40 leading-none mb-0.5">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-bold text-white truncate max-w-[120px]">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded border leading-none font-medium ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════ CENTER: Product Image Preview ═══════ */}
      <div className="flex-1 flex flex-col min-h-[350px] lg:min-h-0 bg-[#030814]/30 border-b lg:border-b-0 lg:border-r border-white/10">
        {/* Image Area */}
        <div className="flex-1 p-3 md:p-5 flex items-center justify-center relative overflow-hidden">
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
              className="relative w-full h-full min-h-[300px] lg:min-h-[450px] flex items-center justify-center"
            >
              <Image
                src={activeItem.image}
                alt={activeItem.name}
                fill
                priority
                className="object-contain transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          {/* Info Badge */}
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase">
              Live Canvas
            </span>
          </div>

          {/* Item Name Badge */}
          <div className="absolute bottom-3 left-4 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5">
            <span className="text-[10px] text-white/60 font-medium">{activeItem.category}</span>
            <span className="text-xs font-bold text-white ml-2">{activeItem.name}</span>
          </div>
        </div>
      </div>

      {/* ═══════ RIGHT: Comment Panel (Reference-style) ═══════ */}
      <div className="w-full lg:w-[240px] xl:w-[260px] flex flex-col bg-[#0a1628]/80 backdrop-blur-sm shrink-0">
        {/* Comment Panel Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} className="text-white/60" />
            <AnimatePresence mode="wait">
              <motion.span
                key={activeItem.id + "-count"}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-sm font-bold text-white"
              >
                {totalComments} Comments
              </motion.span>
            </AnimatePresence>
          </div>
          <button className="p-1 rounded-md hover:bg-white/5 transition-colors">
            <MoreHorizontal size={16} className="text-white/40" />
          </button>
        </div>

        {/* Comment List - Scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-3 space-y-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              {activeItem.commentSections.map((section, sIdx) => (
                <div key={section.label + sIdx}>
                  {/* Section Label */}
                  <div className="sticky top-0 bg-[#0a1628]/95 backdrop-blur-sm py-1.5 z-10">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/30">
                      {section.label}
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="space-y-3 pb-3">
                    {section.messages.map((msg, mIdx) => (
                      <motion.div
                        key={msg.sender + mIdx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: sIdx * 0.15 + mIdx * 0.1,
                        }}
                        className="group/comment"
                      >
                        {/* Comment row */}
                        <div className="flex gap-2.5">
                          {/* Avatar dot */}
                          <div
                            className={`size-6 rounded-full shrink-0 flex items-center justify-center text-[8px] font-bold text-white mt-0.5 ${msg.avatarBg}`}
                          >
                            {msg.initials}
                          </div>

                          {/* Comment content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span className="text-[11px] font-bold text-white">
                                {msg.sender}
                              </span>
                              {msg.time && (
                                <span className="text-[9px] text-white/25 font-medium">
                                  {msg.time}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-white/55 leading-relaxed mt-0.5">
                              {msg.text}
                            </p>

                            {/* Reply count */}
                            {msg.replies && msg.replies > 0 && (
                              <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover/comment:opacity-100 transition-opacity duration-200">
                                <Reply size={10} className="text-electric-blue/60" />
                                <span className="text-[9px] text-electric-blue/60 font-medium">
                                  {msg.replies} {msg.replies === 1 ? "reply" : "replies"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Comment Input */}
        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2">
            <span className="text-[11px] text-white/25 flex-1">
              Add a comment. Use @ to mention.
            </span>
            <div className="flex items-center gap-1.5">
              <div className="size-5 rounded flex items-center justify-center bg-white/[0.06] hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-[10px] text-white/40">@</span>
              </div>
              <div className="size-5 rounded flex items-center justify-center bg-electric-blue/20 hover:bg-electric-blue/30 transition-colors cursor-pointer">
                <MessageSquare size={10} className="text-electric-blue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
