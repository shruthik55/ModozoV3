"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Techpacks", href: "#techpacks" },
  { label: "Sourcing", href: "#sourcing" },
  { label: "Services", href: "#services" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If at the very top, always show
      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else {
        // Scrolling down -> hide, Scrolling up -> show (standard behavior)
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 20);

      // Active section logic
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Call once to set initial active section
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-deep-navy/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
        id="navbar"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex items-center h-20 md:h-24">
            {/* Logo - Pushed Left */}
            <div className="flex-1 flex justify-start">
              <a href="#" onClick={(e) => handleSmoothScroll(e, "#hero")} className="flex items-center gap-2" id="nav-logo">
                <Image
                  src="/logo4.png"
                  alt="Modozo"
                  width={200}
                  height={60}
                  className="h-16 md:h-20 w-auto"
                  priority
                />
              </a>
            </div>

            {/* Desktop Links - Truly Centered */}
            <div className="hidden lg:flex items-center justify-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`px-5 py-2 text-[15px] font-semibold transition-all duration-200 rounded-lg hover:bg-white/5 ${
                      isActive ? "text-[#bd9128] bg-white/5" : "text-slate-300 hover:text-white"
                    }`}
                    id={`nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA - Pushed Right */}
            <div className="flex-1 hidden md:flex items-center justify-end gap-4">
              <Button
                variant="secondary"
                size="md"
                href="#contact"
                className="!bg-[hsl(12,60%,46%)] !border !border-[hsl(12,60%,38%)] text-white hover:!bg-[hsl(12,60%,40%)] hover:!border-[hsl(12,60%,35%)] hover:shadow-[0_0_20px_rgba(192,70,50,0.4)] px-6"
                id="nav-talk"
              >
                Sign In / Login
              </Button>
            </div>

            {/* Mobile Menu Toggle - Only visible on small screens */}
            <div className="md:hidden flex-1 flex justify-end">
              <button
                className="text-white p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                id="nav-mobile-toggle"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-deep-navy/95 backdrop-blur-xl pt-20"
          >
            <div className="flex flex-col items-center gap-4 p-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`text-lg transition-colors ${
                      isActive ? "text-[#bd9128] font-semibold" : "text-slate-text hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
                <Button
                  variant="secondary"
                  href="#contact"
                  className="w-full justify-center !bg-[hsl(12,60%,46%)] !border !border-[hsl(12,60%,38%)] text-white hover:!bg-[hsl(12,60%,40%)] hover:!border-[hsl(12,60%,35%)]"
                >
                  Sign In / Login
                </Button>
                <Button
                  variant="primary"
                  href="#demo"
                  className="w-full justify-center !bg-[hsl(12,60%,46%)] !border !border-[hsl(12,60%,38%)] text-white hover:!bg-[hsl(12,60%,40%)]"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

