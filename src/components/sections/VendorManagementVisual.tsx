"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  CheckCircle2,
  Layers,
  Sparkles,
  Palette
} from "lucide-react";

interface Tab {
  id: string;
  name: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: "pantone_library", name: "Pantone Approval", icon: Palette },
  { id: "strike_off", name: "Print Strike-off", icon: Sparkles },
  { id: "pp_sample", name: "PP Sample", icon: Layers },
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

export default function VendorManagementVisual({ onCycleComplete }: { onCycleComplete?: () => void }) {
  const [activeTab, setActiveTab] = useState<string>("pantone_library");
  const [isAutoNavigating, setIsAutoNavigating] = useState<boolean>(true);
  const onCycleCompleteRef = useRef(onCycleComplete);
  const pendingCycleCompleteRef = useRef(false);

  useEffect(() => {
    onCycleCompleteRef.current = onCycleComplete;
  }, [onCycleComplete]);

  const cycleNext = useCallback(() => {
    setActiveTab((current) => {
      const index = tabs.findIndex((t) => t.id === current);
      const nextIndex = (index + 1) % tabs.length;
      pendingCycleCompleteRef.current = nextIndex === 0;
      return tabs[nextIndex].id;
    });
  }, []);

  // Auto navigation loop
  useEffect(() => {
    if (!isAutoNavigating) return;

    // Cycle every 4.5 seconds
    const interval = setInterval(cycleNext, 4500);
    return () => clearInterval(interval);
  }, [isAutoNavigating, cycleNext]);

  useEffect(() => {
    if (!pendingCycleCompleteRef.current || activeTab !== tabs[0].id) return;
    pendingCycleCompleteRef.current = false;
    onCycleCompleteRef.current?.();
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
              <Image src="/modozo_brand_logo.png" alt="Modozo Logo" width={112} height={20} className="object-contain" style={{ height: '20px', width: 'auto' }} />
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
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl w-full text-xs font-bold border transition-all duration-300 relative text-left cursor-pointer shrink-0 md:shrink ${isActive
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

          {/* TAB 1: PP Sample Review */}
          {activeTab === "pp_sample" && (
            <motion.div
              key="pp_sample"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col justify-between overflow-hidden"
            >
              <div className="flex-1 overflow-hidden relative rounded-xl border border-white/[0.08] bg-[#02060f]">
                <Image
                  src="/ppsamppp.png"
                  alt="PP Sample Verification"
                  fill
                  sizes="(min-width: 768px) 68vw, 100vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          )}

          {/* TAB: Pantone Library */}
          {activeTab === "pantone_library" && (
            <motion.div
              key="pantone_library"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col justify-between overflow-hidden"
            >
              <div className="flex-1 overflow-hidden relative rounded-xl border border-white/[0.08] bg-[#02060f]">
                <Image
                  src="/pantone library.png"
                  alt="Pantone Library"
                  fill
                  sizes="(min-width: 768px) 68vw, 100vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          )}

          {/* TAB 3: Print Strike-off Review */}
          {activeTab === "strike_off" && (
            <motion.div
              key="strike_off"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col justify-between overflow-hidden"
            >
              <div className="flex-1 overflow-hidden relative rounded-xl border border-white/[0.08] bg-[#02060f]">
                <Image
                  src="/printsttt.png"
                  alt="Print Strike-off Calibration"
                  fill
                  sizes="(min-width: 768px) 68vw, 100vw"
                  className="object-contain"
                />
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
                          className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-150 whitespace-nowrap ${isEven ? "bg-transparent" : "bg-white/[0.01]"
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
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold border whitespace-nowrap ${order.status === "ACCEPTED"
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
              className="w-full h-full flex flex-col justify-between overflow-hidden"
            >
              <div className="flex-1 overflow-hidden relative rounded-xl border border-white/[0.08] bg-[#02060f]">
                <Image
                  src="/final_inspecction.png"
                  alt="Final Inspection Call"
                  fill
                  sizes="(min-width: 768px) 68vw, 100vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
