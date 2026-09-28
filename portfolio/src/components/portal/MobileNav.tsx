"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { NAV_ITEMS } from "./Sidebar";

const SOCIALS = [
  { icon: FiGithub, href: "https://github.com/Lomkiced", label: "GitHub" },
  {
    icon: FiLinkedin,
    href: "https://linkedin.com/in/lomki-ced-446652393",
    label: "LinkedIn",
  },
  { icon: FiMail, href: "mailto:xanthosis122@gmail.com", label: "Email" },
] as const;

// ─── Mobile Navigation ──────────────────────────────────────────────────────

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
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-background/90 backdrop-blur-md border-b border-border/30">
        <Link href="/overview" className="font-display text-xl text-foreground">
          CED
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[60] flex flex-col items-center justify-center w-10 h-10 gap-1.5"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`block w-5 h-px bg-foreground transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </header>

      {/* ── Full-Screen Overlay ───────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 bg-background flex flex-col justify-between"
          >
            {/* Nav Items */}
            <nav
              className="flex flex-col gap-2 px-8 pt-28"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item, index) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-4 px-4 py-3 rounded-sm
                        text-2xl transition-all duration-200
                        ${
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      <span className="text-label text-muted-foreground/40 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-8 pb-10">
              <div className="h-px bg-border/50 mb-6" />

              {/* Availability */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/60 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
                </span>
                <span className="text-caption text-muted-foreground">
                  Open to work
                </span>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.label !== "Contact Form" ? "_blank" : undefined}
                    rel={
                      social.label !== "Contact Form"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
