"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { MdEmail } from "react-icons/md";
import { NAV_ITEMS, SOCIALS } from "./Sidebar";

// ─── Mobile Navigation ──────────────────────────────────────────────────────
// Advanced Glassmorphic Full-Screen Menu with staggered entry animations.

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key handler
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  return (
    <>
      {/* ── Top Bar ───────────────────────────────────────────────────── */}
      <header 
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 transition-colors duration-500 ${
          isOpen ? "bg-transparent" : "bg-background/80 backdrop-blur-2xl border-b border-border/10"
        }`}
      >
        <Link 
          href="/overview" 
          className="relative z-[60] font-pixel text-2xl text-foreground mix-blend-difference"
          onClick={() => setIsOpen(false)}
        >
          CED
        </Link>

        {/* Premium Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[60] flex flex-col items-center justify-center w-12 h-12 gap-1.5 focus:outline-none group mix-blend-difference"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-400 ease-out origin-center ${
              isOpen ? "rotate-[45deg] translate-y-[4px]" : "group-hover:-translate-y-0.5"
            }`}
          />
          <span
            className={`block h-[2px] bg-white transition-all duration-400 ease-out origin-center ${
              isOpen ? "w-6 -rotate-[45deg] -translate-y-[4px]" : "w-4 group-hover:w-6 group-hover:translate-y-0.5"
            }`}
          />
        </button>
      </header>

      {/* ── Cinematic Full-Screen Overlay ─────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { delay: 0.2, duration: 0.4 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 z-40 bg-[#020202]/90 flex flex-col justify-between h-[100dvh]"
          >
            {/* Background ambient noise/gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] to-transparent pointer-events-none" />

            {/* Nav Items */}
            <nav
              className="relative z-10 flex flex-col gap-6 px-8 pt-32"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item, index) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                    transition={{ 
                      delay: 0.1 + (index * 0.08), 
                      duration: 0.6, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`
                        block text-4xl sm:text-5xl font-display tracking-tight transition-all duration-300
                        ${
                          isActive
                            ? "text-white translate-x-2"
                            : "text-white/30 hover:text-white hover:translate-x-2"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer */}
            <motion.div 
              className="relative z-10 px-8 pb-12 mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="h-px bg-white/10 mb-8 w-full" />

              {/* Availability */}
              <div className="flex items-center gap-2.5 mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                  Open to work
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-8">
                <p className="text-xs text-white/40">
                  For work, collabs & everything else:
                </p>
                <a
                  href="mailto:xanthosis122@gmail.com"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/70 transition-colors"
                >
                  <MdEmail size={18} className="text-white/40 shrink-0" />
                  xanthosis122@gmail.com
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-6">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white hover:scale-110 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
