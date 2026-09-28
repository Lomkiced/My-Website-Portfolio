"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

// ─── Page Transition Template ───────────────────────────────────────────────
// Next.js App Router re-mounts template.tsx on every route change.
// We use this to run a GSAP entry animation for each section.

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "all",
      }
    );
  }, []);

  return <div ref={ref}>{children}</div>;
}
