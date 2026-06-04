"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageSquare, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface ChatMessage {
  sender: string;
  role: string;
  text: string;
  initials: string;
  avatarBg: string;
}

interface ApparelItem {
  id: string;
  name: string;
  category: string;
  image: string;
  status: string;
  statusColor: string;
  messages: ChatMessage[];
}

const apparelItems: ApparelItem[] = [
  {
    id: "shoe",
    name: "Air Flow Runner v2",
    category: "Footwear",
    image: "/collab_shoe.png",
    status: "Fit Review",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    messages: [
      {
        sender: "Sarah Jenkins",
        role: "Design Lead",
        text: "Added the outsole grading rules for size range 7-12. Please check outsole thickness.",
        initials: "SJ",
        avatarBg: "bg-blue-500",
      },
      {
        sender: "Chen Wei",
        role: "Factory Manager",
        text: "Outsole specs look correct. Preparing mold tooling for initial samples today.",
        initials: "CW",
        avatarBg: "bg-teal-500",
      },
      {
        sender: "Marcus Vance",
        role: "Fit Specialist",
        text: "Physical fit sample approved. Arch support and flexibility are within specs.",
        initials: "MV",
        avatarBg: "bg-purple-500",
      },
    ],
  },
  {
    id: "polo",
    name: "Classic Pique Polo",
    category: "Tops",
    image: "/collab_polo.png",
    status: "Sourcing",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    messages: [
      {
        sender: "Sarah Jenkins",
        role: "Design Lead",
        text: "Can we source a certified organic cotton piqué for this style?",
        initials: "SJ",
        avatarBg: "bg-blue-500",
      },
      {
        sender: "Elena Rostova",
        role: "Sourcing Agent",
        text: "Vendor A updated quote: Organic cotton option is $4.10/pc at 5k MOQ.",
        initials: "ER",
        avatarBg: "bg-indigo-500",
      },
      {
        sender: "Sarah Jenkins",
        role: "Design Lead",
        text: "Approved organic cotton piqué. BOM and Techpack details updated in workspace.",
        initials: "SJ",
        avatarBg: "bg-blue-500",
      },
    ],
  },
  {
    id: "jacket",
    name: "Waterproof Shell Jacket",
    category: "Outerwear",
    image: "/collab_jacket.png",
    status: "QC Testing",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    messages: [
      {
        sender: "Sarah Jenkins",
        role: "Design Lead",
        text: "Hydrostatic rating target: 10,000mm. Seam tape is mandatory on all shoulders.",
        initials: "SJ",
        avatarBg: "bg-blue-500",
      },
      {
        sender: "Chen Wei",
        role: "Factory Manager",
        text: "Tape samples received and applied. Running first batch testing in labs now.",
        initials: "CW",
        avatarBg: "bg-teal-500",
      },
      {
        sender: "Diana Prince",
        role: "QA Lead",
        text: "Hydrostatic test passed. Seam sealing tape held up at 12,000mm pressure.",
        initials: "DP",
        avatarBg: "bg-emerald-500",
      },
    ],
  },
  {
    id: "hoodie",
    name: "Cozy French Terry Hoodie",
    category: "Activewear",
    image: "/collab_hoodie.png",
    status: "Approved",
    statusColor: "text-teal-400 bg-teal-400/10 border-teal-400/20",
    messages: [
      {
        sender: "Sarah Jenkins",
        role: "Design Lead",
        text: "Double check the fleece fabric weight. It should be 320 GSM French Terry.",
        initials: "SJ",
        avatarBg: "bg-blue-500",
      },
      {
        sender: "Chen Wei",
        role: "Factory Manager",
        text: "Confirming 320 GSM stock is ready in Navy and Heather Grey colors.",
        initials: "CW",
        avatarBg: "bg-teal-500",
      },
      {
        sender: "Elena Rostova",
        role: "Sourcing Agent",
        text: "Heather Grey selected. BOM and cost sheets locking in.",
        initials: "ER",
        avatarBg: "bg-indigo-500",
      },
    ],
  },
  {
    id: "denim",
    name: "Slim Fit Stretch Denim",
    category: "Bottoms",
    image: "/collab_denim.png",
    status: "Production",
    statusColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    messages: [
      {
        sender: "Tariq Ali",
        role: "Pattern Maker",
        text: "Grading rules for waistband stretch applied to all fit sizes.",
        initials: "TA",
        avatarBg: "bg-pink-500",
      },
      {
        sender: "Diana Prince",
        role: "QA Lead",
        text: "Shrinkage test results updated: 2.5% warp, 1% weft. Within tolerance.",
        initials: "DP",
        avatarBg: "bg-emerald-500",
      },
      {
        sender: "Sarah Jenkins",
        role: "Design Lead",
        text: "Shrinkage data verified. Grading pattern files officially released.",
        initials: "SJ",
        avatarBg: "bg-blue-500",
      },
    ],
  },
];

export default function CentralizedCollaborationVisual() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const autoPlayRef = useRef<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = apparelItems[activeIndex];

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

  // Sequential message display on item change
  useEffect(() => {
    setVisibleCount(0);
    const timers = [
      setTimeout(() => setVisibleCount(1), 400),
      setTimeout(() => setVisibleCount(2), 1600),
      setTimeout(() => setVisibleCount(3), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    autoPlayRef.current = false; // Pause autoplay on manual selection
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // Resume autoplay after 12 seconds of inactivity
    timerRef.current = setTimeout(() => {
      autoPlayRef.current = true;
      // Start normal interval again
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % apparelItems.length);
      }, 7000);
    }, 12000);
  };

  return (
    <div className="w-full bg-[#040a15]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px]">
      {/* Sidebar - Product Workspace list */}
      <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-col bg-[#050e1e]/60">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
            Workspace Garments
          </span>
          <span className="text-[10px] bg-electric-blue/10 text-electric-blue px-2 py-0.5 rounded-full font-medium">
            5 Active
          </span>
        </div>

        {/* Scrollable sidebar list */}
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-none">
          {apparelItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(index)}
                className={`flex items-center gap-3 p-2.5 rounded-xl text-left border transition-all duration-300 shrink-0 md:shrink ${
                  isActive
                    ? "bg-white/[0.06] border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                    : "bg-transparent border-transparent hover:bg-white/[0.02]"
                }`}
              >
                {/* Thumb Image wrapper */}
                <div className="relative size-10 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center border border-white/10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col min-w-[120px] md:min-w-0 pr-1">
                  <span className="text-[10px] font-medium text-white/40 leading-none mb-1">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-white truncate max-w-[140px]">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded border leading-none font-medium ${item.statusColor}`}
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

      {/* Main Canvas & Collaboration Center */}
      <div className="flex-1 flex flex-col h-[340px] md:h-full bg-[#030814]/30">
        {/* Upper part - Product Preview Window */}
        <div className="flex-1 p-5 flex items-center justify-center relative overflow-hidden border-b border-white/10">
          {/* Subtle background radar circles */}
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
              className="relative w-full h-full max-h-[160px] md:max-h-[220px] flex items-center justify-center"
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
        </div>

        {/* Lower part - Team Collaboration Chat log */}
        <div className="h-[180px] md:h-[220px] p-4 flex flex-col bg-[#040b17]/85 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 mb-3 shrink-0">
            <MessageSquare size={14} className="text-electric-blue" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
              Live Activity Stream
            </span>
          </div>

          {/* Chat message list container */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
            <AnimatePresence>
              {activeItem.messages.slice(0, visibleCount).map((msg, i) => (
                <motion.div
                  key={msg.sender + i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex gap-3 text-left"
                >
                  {/* Initials Avatar */}
                  <div
                    className={`size-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white ${msg.avatarBg}`}
                  >
                    {msg.initials}
                  </div>

                  {/* Message body */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-xs font-bold text-white">
                        {msg.sender}
                      </span>
                      <span className="text-[9px] text-white/35 font-medium">
                        {msg.role}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed bg-white/[0.02] border border-white/[0.04] p-2 rounded-r-xl rounded-bl-xl">
                      {msg.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
