"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILL_GROUPS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll(".skill-card"), { opacity: 1, y: 0 });
      return;
    }

    const cards = el.querySelectorAll(".skill-card");
    gsap.set(cards, { opacity: 0, y: 30 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        scroller: "#main-content",
      },
    });
  }, []);

  return (
    <section className="pb-32">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/20 pb-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-tight">
            Technical Expertise
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            A comprehensive overview of my technical capabilities, ranging from modern front-end frameworks to robust backend architectures and hardware infrastructure.
          </p>
        </div>
      </div>

      {/* ── Bento Grid ───────────────────────────────────────────────── */}
      <div 
        ref={containerRef} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {SKILL_GROUPS.map((group, groupIndex) => (
          <div
            key={group.category}
            className="skill-card group relative overflow-hidden rounded-2xl bg-[#080808] border border-border/20 p-8 hover:border-foreground/20 transition-colors duration-500 flex flex-col h-full"
          >
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs text-muted-foreground/40 tabular-nums">
                {String(groupIndex + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-lg text-foreground tracking-wide">
                {group.category}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-md border border-border/30 bg-background/50 text-xs font-medium text-muted-foreground group-hover:border-border/60 hover:!text-foreground hover:!bg-foreground/5 transition-all duration-300 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer note ──────────────────────────────────────────────── */}
      <div className="mt-16 pt-8 border-t border-border/20 flex items-center justify-between">
        <p className="text-xs font-mono text-muted-foreground/50">
          + Continuously exploring new tools and frameworks.
        </p>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-pulse delay-75" />
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-pulse delay-150" />
        </div>
      </div>
    </section>
  );
}
