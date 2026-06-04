"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Sparkles,
  Building
} from "lucide-react";

interface Tab {
  id: string;
  name: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: "techpacks", name: "Tech Packs", icon: Layers },
  { id: "orders", name: "Fashion Orders", icon: FileText },
  { id: "gpt", name: "GPT", icon: Sparkles },
  { id: "status", name: "Order Status", icon: CheckCircle2 },
  { id: "schedule", name: "Final Inspection", icon: Calendar },
];

interface SourcingOrder {
  vendorName: string;
  factoryName: string;
  date: string;
  season: string;
  brands: string;
  article: string;
  onlineOffline: string;
  poNo: string;
  styleName: string;
  styleCode: string;
  repeatFashion: string;
  inseam: string;
  status: string;
  color: string;
}

const sourcingOrders: SourcingOrder[] = [
  {
    vendorName: "Logoo.pdf",
    factoryName: "Logoo.pdf",
    date: "2/2/2028",
    season: "SS 25",
    brands: "Brand Manager Streetwear Only",
    article: "—",
    onlineOffline: "—",
    poNo: "—",
    styleName: "Logoo.pdf",
    styleCode: "Logoo.pdf",
    repeatFashion: "—",
    inseam: "60",
    status: "ACCEPTED",
    color: "Not Specified"
  },
  {
    vendorName: "DB_AW24_W_TS_FWD113_03 (1)",
    factoryName: "DB_AW24_W_TS_FWD113_03 (1)",
    date: "2/1/2028",
    season: "SS 25",
    brands: "Brand Manager Streetwear Only",
    article: "—",
    onlineOffline: "—",
    poNo: "—",
    styleName: "DB_AW24_W_TS_FWD113_03 (1)",
    styleCode: "FWD_AW24_SW43_2.pdf",
    repeatFashion: "—",
    inseam: "50",
    status: "ACCEPTED",
    color: "Technique"
  },
  {
    vendorName: "New style teckpack.pdf",
    factoryName: "New style teckpack.pdf",
    date: "3/8/2027",
    season: "SS 24",
    brands: "—",
    article: "—",
    onlineOffline: "—",
    poNo: "—",
    styleName: "New style teckpack.pdf",
    styleCode: "New style teckpack.pdf",
    repeatFashion: "—",
    inseam: "—",
    status: "SHARED",
    color: "PIGMENT"
  },
  {
    vendorName: "Copy of Copy of MS_SS25_M_TS_MA013_02.pdf",
    factoryName: "Copy of Copy of MS_SS25_M_TS_MA013_02.pdf",
    date: "3/6/2026",
    season: "SS 25",
    brands: "Brand Manager Streetwear Only",
    article: "—",
    onlineOffline: "—",
    poNo: "—",
    styleName: "Copy of Copy of MS_SS25_M_TS_MA013_02.pdf",
    styleCode: "Copy of Copy of MS_SS25_M_TS_MA013_02.pdf",
    repeatFashion: "—",
    inseam: "—",
    status: "ACCEPTED",
    color: "Not Specified"
  },
  {
    vendorName: "FWD_AW24_MW_TST_151.pdf",
    factoryName: "FWD_AW24_MW_TST_151.pdf",
    date: "3/5/2026",
    season: "SS 25",
    brands: "Brand Manager Streetwear Only",
    article: "—",
    onlineOffline: "—",
    poNo: "—",
    styleName: "FWD_AW24_MW_TST_151.pdf",
    styleCode: "FWD_AW24_MW_TST_151.pdf",
    repeatFashion: "—",
    inseam: "—",
    status: "ACCEPTED",
    color: "Not Specified"
  },
  {
    vendorName: "FWD_AW24_MW_SWT_004.pdf",
    factoryName: "FWD_AW24_MW_SWT_004.pdf",
    date: "3/5/2026",
    season: "SS 25",
    brands: "Brand Manager Streetwear Only",
    article: "—",
    onlineOffline: "—",
    poNo: "—",
    styleName: "FWD_AW24_MW_SWT_004.pdf",
    styleCode: "FWD_AW24_MW_SWT_004.pdf",
    repeatFashion: "—",
    inseam: "—",
    status: "ACCEPTED",
    color: "Not Specified"
  },
  {
    vendorName: "Modozo Fashion Tech Private Limited",
    factoryName: "AARYAN KLOTHING CO",
    date: "29/7/2025",
    season: "FW 24",
    brands: "GLITCHEZ",
    article: "Tsh",
    onlineOffline: "ONLINE",
    poNo: "MYNJ-MTNTNN120625-5",
    styleName: "GLI-SS25-M-SK-004-B",
    styleCode: "34887656",
    repeatFashion: "FASHION",
    inseam: "—",
    status: "U/PPS",
    color: "—"
  },
  {
    vendorName: "Modozo Fashion Tech Private Limited",
    factoryName: "AARYAN KLOTHING CO",
    date: "29/7/2025",
    season: "FW 24",
    brands: "GLITCHEZ",
    article: "Tra",
    onlineOffline: "ONLINE",
    poNo: "MYNJ-MTNTNN250625-3",
    styleName: "GLZ-JUL-KV-AW25-010-A",
    styleCode: "35202724",
    repeatFashion: "FASHION",
    inseam: "—",
    status: "U/CUTTING",
    color: "—"
  }
];

export default function VendorManagementVisual() {
  const [activeTab, setActiveTab] = useState<string>("techpacks");
  const [isAutoNavigating, setIsAutoNavigating] = useState<boolean>(true);
  const pdfScrollRef = useRef<HTMLDivElement>(null);
  const gptScrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto navigation loop
  useEffect(() => {
    if (!isAutoNavigating) return;

    const cycleNext = () => {
      setActiveTab((current) => {
        const index = tabs.findIndex(t => t.id === current);
        const nextIndex = (index + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    };

    // Cycle every 4 seconds
    const interval = setInterval(cycleNext, 4500);
    return () => clearInterval(interval);
  }, [isAutoNavigating]);

  // PDF Autoscroll script (Only when activeTab is "orders")
  useEffect(() => {
    if (activeTab !== "orders") return;

    const container = pdfScrollRef.current;
    if (!container) return;

    container.scrollTop = 0;

    let animationFrameId: number;
    let scrollDirection = 1; // 1 = down, -1 = up
    let lastTime = 0;
    const speed = 0.025; // scroll speed (px/ms)
    let isWaiting = false;

    const scroll = (timestamp: number) => {
      if (isWaiting) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      if (container) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        let currentScroll = container.scrollTop;

        if (scrollDirection === 1) {
          currentScroll += speed * delta;
          if (currentScroll >= maxScroll) {
            currentScroll = maxScroll;
            scrollDirection = -1;
            isWaiting = true;
            setTimeout(() => {
              isWaiting = false;
              lastTime = performance.now();
            }, 1800);
          }
        } else {
          currentScroll -= speed * delta;
          if (currentScroll <= 0) {
            currentScroll = 0;
            scrollDirection = 1;
            isWaiting = true;
            setTimeout(() => {
              isWaiting = false;
              lastTime = performance.now();
            }, 1800);
          }
        }

        container.scrollTop = currentScroll;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    const startTimeout = setTimeout(() => {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(scroll);
    }, 800);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]);

  // GPT Autoscroll script (Only when activeTab is "gpt")
  useEffect(() => {
    if (activeTab !== "gpt") return;

    const container = gptScrollRef.current;
    if (!container) return;

    container.scrollTop = 0;

    let animationFrameId: number;
    let scrollDirection = 1; // 1 = down, -1 = up
    let lastTime = 0;
    const speed = 0.025; // scroll speed (px/ms)
    let isWaiting = false;

    const scroll = (timestamp: number) => {
      if (isWaiting) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      if (container) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        let currentScroll = container.scrollTop;

        if (scrollDirection === 1) {
          currentScroll += speed * delta;
          if (currentScroll >= maxScroll) {
            currentScroll = maxScroll;
            scrollDirection = -1;
            isWaiting = true;
            setTimeout(() => {
              isWaiting = false;
              lastTime = performance.now();
            }, 1800);
          }
        } else {
          currentScroll -= speed * delta;
          if (currentScroll <= 0) {
            currentScroll = 0;
            scrollDirection = 1;
            isWaiting = true;
            setTimeout(() => {
              isWaiting = false;
              lastTime = performance.now();
            }, 1800);
          }
        }

        container.scrollTop = currentScroll;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    const startTimeout = setTimeout(() => {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(scroll);
    }, 800);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsAutoNavigating(false); // Disable auto-navigation once user interacts
  };

  return (
    <div className="w-full bg-[#040a15]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[450px] text-left select-none">
      
      {/* Sidebar - Vendor Panel */}
      <div className="w-full md:w-[32%] border-b md:border-b-0 md:border-r border-white/10 p-4 md:p-5 flex flex-col justify-between bg-[#050e1e]/60 shrink-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/modozo_brand_logo.png" alt="Modozo Logo" className="h-5 w-auto object-contain" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                Vendor Panel
              </span>
            </div>
            {isAutoNavigating && (
              <span className="text-[8px] bg-electric-blue/10 border border-electric-blue/20 text-electric-blue px-2 py-0.5 rounded-full font-semibold animate-pulse">
                Auto Playing
              </span>
            )}
          </div>

          <nav className="flex flex-row md:flex-col gap-1.5 md:gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl w-full text-xs font-bold border transition-all duration-300 relative text-left cursor-pointer shrink-0 md:shrink ${
                    isActive
                      ? "bg-white/[0.06] border-[#bd9128]/40 text-white shadow-[0_0_12px_rgba(189,145,40,0.12)]"
                      : "bg-transparent border-transparent text-white/45 hover:text-white/70 hover:bg-white/[0.02]"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-y-2.5 left-0 w-1 rounded-r bg-[#bd9128]" />
                  )}
                  <Icon size={14} className={isActive ? "text-[#bd9128]" : "text-white/40"} />
                  <span className={isActive ? "text-[#bd9128]" : ""}>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className="flex-1 bg-[#030814]/30 p-5 flex flex-col justify-between h-[300px] md:h-full overflow-hidden relative">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Tech Packs Directory */}
          {activeTab === "techpacks" && (
            <motion.div
              key="techpacks"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col justify-between overflow-hidden"
            >
              <div className="flex-1 overflow-hidden relative rounded-xl border border-white/[0.08] bg-[#02060f]">
                <img 
                  src="/techpack_directory.png" 
                  alt="Techpacks directory" 
                  className="w-full h-full object-contain block mx-auto"
                />
              </div>
            </motion.div>
          )}

          {/* TAB 2: Fashion Orders spec sheet viewer */}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col justify-between overflow-hidden"
            >
              <div className="flex-1 overflow-hidden relative rounded-xl border border-white/[0.08] bg-[#02060f] p-2 flex flex-col justify-between">
                
                {/* Header tag */}
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white leading-tight">Style Spec Sheet PDF</span>
                    <span className="text-[8px] text-white/40 font-mono">MS_SS25_M_TS_MJ011_02.pdf</span>
                  </div>
                  <span className="text-[8px] text-teal-400 bg-teal-400/5 px-2 py-0.5 border border-teal-400/10 rounded-full font-medium">
                    2 Pages
                  </span>
                </div>

                {/* PDF pages scroller */}
                <div 
                  ref={pdfScrollRef}
                  className="flex-1 overflow-y-auto scrollbar-none space-y-3 pr-0.5 rounded bg-[#010307] p-1 border border-white/[0.02]"
                >
                  {/* Page 1: style_details_v2.png */}
                  <div className="relative w-full overflow-hidden rounded border border-white/[0.08] bg-[#fbfbfb]">
                    <img 
                      src="/style_details_v2.png" 
                      alt="Style Details Spec Sheet" 
                      className="w-full h-auto object-contain block"
                    />
                    
                    {/* Cover overlay to hide Marvel logo */}
                    <div className="absolute top-0 left-0 w-[24.5%] h-[15.5%] bg-black flex flex-col justify-center pl-2">
                      <span className="text-white font-extrabold tracking-tighter text-[6px] md:text-[9px] leading-tight">
                        MODOZO
                      </span>
                      <span className="text-white/60 font-semibold tracking-widest text-[3px] md:text-[5px] -mt-0.5 uppercase leading-none">
                        STREET
                      </span>
                    </div>
                  </div>

                  {/* Page 2: colorways_details_v2.png */}
                  <div className="relative w-full overflow-hidden rounded border border-white/[0.08] bg-[#fbfbfb]">
                    <img 
                      src="/colorways_details_v2.png" 
                      alt="Colorways Details Spec Sheet" 
                      className="w-full h-auto object-contain block"
                    />
                    
                    {/* Cover overlay to hide Marvel logo page 2 */}
                    <div className="absolute top-0 left-0 w-[12%] h-[6.5%] bg-black flex items-center pl-1">
                      <span className="text-white font-extrabold tracking-tighter text-[4px] md:text-[6px] leading-none">
                        MODOZO
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: GPT Test Report viewer */}
          {activeTab === "gpt" && (
            <motion.div
              key="gpt"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col gap-3 overflow-hidden"
            >
              {/* Full width: Test Report PDF Scroller */}
              <div className="flex-1 overflow-hidden relative rounded-xl border border-white/[0.08] bg-[#02060f] p-2 flex flex-col justify-between h-full">
                {/* Header tag */}
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white leading-tight">GPT Test Report Analysis</span>
                    <span className="text-[8px] text-white/40 font-mono">TR_KNIT_FABRIC_SS25.pdf</span>
                  </div>
                  <span className="text-[8px] text-teal-400 bg-teal-400/5 px-2 py-0.5 border border-teal-400/10 rounded-full font-medium">
                    2 Pages
                  </span>
                </div>

                {/* PDF pages scroller */}
                <div 
                  ref={gptScrollRef}
                  className="flex-1 overflow-y-auto scrollbar-none space-y-3 pr-0.5 rounded bg-[#010307] p-1 border border-white/[0.02]"
                >
                  {/* Page 1: gpt_test_report_1.png */}
                  <div className="relative w-full overflow-hidden rounded border border-white/[0.08] bg-[#fbfbfb]">
                    <img 
                      src="/gpt_test_report_1.png" 
                      alt="GPT Test Report Page 1" 
                      className="w-full h-auto object-contain block mx-auto"
                    />
                  </div>

                  {/* Page 2: gpt_test_report_2.png */}
                  <div className="relative w-full overflow-hidden rounded border border-white/[0.08] bg-[#fbfbfb]">
                    <img 
                      src="/gpt_test_report_2.png" 
                      alt="GPT Test Report Page 2" 
                      className="w-full h-auto object-contain block mx-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Order Status (Accepted / Rejected / Shared / etc.) */}
          {activeTab === "status" && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col justify-between overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 shrink-0">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Fashion Sourcing Orders</span>
                  <span className="text-[9px] text-white/40">Status of active purchase order sheets</span>
                </div>
              </div>

              <div className="flex-1 overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/10 rounded-xl border border-white/[0.08] bg-[#02060f] w-full">
                <table className="w-full text-left border-collapse text-[9px] md:text-[10px]">
                  <thead>
                    <tr className="bg-white/[0.04] border-b border-white/10 text-white/50 font-bold uppercase tracking-wider whitespace-nowrap">
                      <th className="p-2 pl-3">Vendor Name</th>
                      <th className="p-2">Factory Name</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Season</th>
                      <th className="p-2">Brands</th>
                      <th className="p-2">Article</th>
                      <th className="p-2">Online/Offline</th>
                      <th className="p-2">PO No</th>
                      <th className="p-2">Style Name</th>
                      <th className="p-2">Style Code</th>
                      <th className="p-2">Repeat/Fashion</th>
                      <th className="p-2">Inseam</th>
                      <th className="p-2">Status</th>
                      <th className="p-2 pr-3">Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sourcingOrders.map((order, index) => {
                      const isEven = index % 2 === 0;
                      return (
                        <tr 
                          key={index} 
                          className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-150 whitespace-nowrap ${
                            isEven ? "bg-transparent" : "bg-white/[0.01]"
                          }`}
                        >
                          <td className="p-2 pl-3 font-semibold text-white/80">{order.vendorName}</td>
                          <td className="p-2 text-white/60">{order.factoryName}</td>
                          <td className="p-2 text-white/50 font-mono">{order.date}</td>
                          <td className="p-2 text-white/60">{order.season}</td>
                          <td className="p-2 text-white/60">{order.brands}</td>
                          <td className="p-2 text-white/60">{order.article}</td>
                          <td className="p-2 text-white/60">{order.onlineOffline}</td>
                          <td className="p-2 text-white/60 font-mono">{order.poNo}</td>
                          <td className="p-2 text-white/60">{order.styleName}</td>
                          <td className="p-2 text-white/60 font-mono">{order.styleCode}</td>
                          <td className="p-2 text-white/60">{order.repeatFashion}</td>
                          <td className="p-2 text-white/60 font-mono">{order.inseam}</td>
                          <td className="p-2">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold border whitespace-nowrap ${
                              order.status === "ACCEPTED" 
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : order.status === "SHARED"
                                ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-2 pr-3 text-white/60">{order.color}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 5: Final Inspection Schedule Calendar */}
          {activeTab === "schedule" && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col md:flex-row gap-3 overflow-hidden"
            >
              {/* Left Calendar Grid */}
              <div className="flex-1 rounded-xl border border-white/[0.08] bg-[#02060f] p-3 flex flex-col justify-between h-[60%] md:h-full">
                <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2">
                  <span className="text-[10px] font-bold text-white">June 2026</span>
                  <span className="text-[8px] text-white/40">Standard Grid</span>
                </div>
                
                {/* Days header */}
                <div className="grid grid-cols-7 gap-1 text-[8px] text-center text-white/35 font-bold mb-1">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1 flex-1">
                  {/* Empty cells for starting offset */}
                  {Array.from({ length: 0 }).map((_, i) => <div key={`empty-${i}`} />)}
                  
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isInspectionDay = day === 18;
                    return (
                      <div 
                        key={`day-${day}`}
                        className={`rounded flex items-center justify-center text-[9px] font-bold aspect-square transition-all duration-300 ${
                          isInspectionDay
                            ? "bg-[#bd9128] text-white shadow-[0_0_10px_rgba(189,145,40,0.4)] border border-[#bd9128]/50 relative"
                            : "bg-white/[0.02] text-white/50 border border-white/[0.03]"
                        }`}
                      >
                        {day}
                        {isInspectionDay && (
                          <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-white border border-[#bd9128]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Event details */}
              <div className="w-full md:w-[42%] flex flex-col justify-between h-[38%] md:h-full border-t md:border-t-0 md:border-l border-white/5 pt-2.5 md:pt-0 md:pl-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#bd9128]">
                    <Calendar size={13} />
                    <span>Inspection Event</span>
                  </div>

                  <div className="bg-[#bd9128]/5 border border-[#bd9128]/15 rounded-xl p-3 space-y-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white">Final Shipment Audit</span>
                      <span className="text-[8px] text-white/40">Sino Apparel Factory</span>
                    </div>
                    <div className="space-y-1 text-[9px] text-[#bd9128]/90 font-medium">
                      <div className="flex justify-between">
                        <span>Inspector:</span>
                        <span className="text-white/70">Bureau Veritas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="text-white/70">June 18, 2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-emerald-400">CONFIRMED</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[8px] text-white/30 flex items-center gap-1.5 border-t border-white/5 pt-2">
                  <Building size={10} className="text-electric-blue" />
                  <span>Audited inspections protect factory output quality targets.</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
