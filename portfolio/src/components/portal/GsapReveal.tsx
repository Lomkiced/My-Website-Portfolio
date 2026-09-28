"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── GSAP ScrollTrigger Reveal ──────────────────────────────────────────────
// Wraps content and reveals it with a subtle fade + translateY when scrolled
// into view. Respects prefers-reduced-motion.

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds */
  delay?: number;
  /** Vertical offset in px (default: 30) */
  y?: number;
  /** Duration in seconds (default: 0.8) */
  duration?: number;
  /** Stagger children instead of animating the wrapper (default: false) */
  stagger?: boolean;
  /** Stagger amount in seconds */
  staggerAmount?: number;
}

export default function GsapReveal({
  children,
  className,
  delay = 0,
  y = 30,
  duration = 0.8,
  stagger = false,
  staggerAmount = 0.08,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? el.children : el;

    gsap.set(targets, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      scroller: "#main-content",
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          ...(stagger ? { stagger: staggerAmount } : {}),
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, y, duration, stagger, staggerAmount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
