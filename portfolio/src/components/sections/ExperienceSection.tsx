"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE_DATA } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll(".experience-card"), { opacity: 1, x: 0 });
      return;
    }

    const cards = el.querySelectorAll(".experience-card");
    gsap.set(cards, { opacity: 0, x: -30 });

    gsap.to(cards, {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        scroller: "#main-content",
      },
    });

    // Optional track animation
    const track = el.querySelector(".timeline-track");
    if (track) {
      gsap.fromTo(track, 
        { scaleY: 0, transformOrigin: "top" },
        { 
          scaleY: 1, 
          duration: 1.5, 
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            scroller: "#main-content",
          }
        }
      );
    }
  }, []);

  return (
    <section className="pb-32 pt-12 md:pt-20">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/20 pb-8">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-tight">
            Journey
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            The path of my professional experience, education, and milestones.
          </p>
        </div>
      </div>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        
        {/* Glowing vertical track */}
        <div className="timeline-track absolute left-4 md:left-[100px] top-4 bottom-4 w-px bg-gradient-to-b from-foreground/50 via-foreground/10 to-transparent hidden sm:block" />

        <div className="space-y-12">
          {EXPERIENCE_DATA.map((item, index) => (
            <div 
              key={index} 
              className="experience-card relative flex flex-col sm:flex-row gap-6 md:gap-16 sm:pl-4 md:pl-0 group"
            >
              
              {/* Timeline Indicator (Desktop) */}
              <div className="hidden sm:flex flex-col items-end w-[84px] shrink-0 pt-6 relative z-10">
                <div className="absolute right-[-14px] md:right-[calc(-100px+12px)] top-[30px] w-3 h-3 rounded-full bg-background border-2 border-foreground/30 group-hover:border-foreground transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest text-right">
                  {item.period}
                </span>
              </div>

              {/* Card Content */}
              <div className="flex-1 relative overflow-hidden rounded-2xl bg-[#080808] border border-border/20 p-6 md:p-10 hover:border-foreground/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                
                {/* Mobile Date Badge */}
                <div className="sm:hidden mb-4 inline-block px-3 py-1 rounded-full border border-border/30 bg-background/50 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
                  {item.period}
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-display text-xl md:text-2xl text-foreground font-medium mb-2 group-hover:text-foreground/90 transition-colors">
                      {item.title}
                    </h2>
                    <h3 className="text-sm font-mono text-muted-foreground/60 uppercase tracking-wide">
                      {item.organization}
                    </h3>
                  </div>
                  
                  <span className="inline-flex shrink-0 items-center justify-center px-3 py-1 text-[10px] uppercase tracking-widest font-medium rounded-full bg-foreground/5 border border-foreground/10 text-muted-foreground">
                    {item.type}
                  </span>
                </div>

                <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-2xl mb-8">
                  {item.description}
                </p>

                {/* Awards */}
                {item.awards && item.awards.length > 0 && (
                  <div className="pt-6 border-t border-border/10">
                    <span className="text-[10px] uppercase font-display text-muted-foreground/40 tracking-widest block mb-4">
                      Awards & Recognition
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.awards.map((award, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-md border border-border/30 bg-background/50 text-[10px] font-mono text-muted-foreground hover:text-foreground hover:bg-foreground/5 hover:border-border/60 transition-all cursor-default"
                        >
                          <span className="text-foreground/30 mr-2">+</span>
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
