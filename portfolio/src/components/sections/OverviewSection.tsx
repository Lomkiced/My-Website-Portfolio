"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { FiCode, FiAward, FiMapPin, FiArrowUpRight } from "react-icons/fi";

// ─── Overview Section ───────────────────────────────────────────────────────
// Ultra-minimalist, flat monochrome design reflecting the exact reference.
// Pure typography, stark grid lines, and high-contrast information density.

export default function OverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll("[data-reveal]"), { opacity: 1, y: 0 });
      return;
    }

    const children = el.querySelectorAll("[data-reveal]");
    gsap.set(children, { opacity: 0, y: 20 });

    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.1,
    });
  }, []);

  return (
    <section className="pt-8 lg:pt-12 pb-16 min-h-[90vh] flex flex-col justify-center">
      <div ref={containerRef} className="max-w-4xl mx-auto w-full px-4 md:px-0">
        
        {/* ── Top Hero Split ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 w-full">
          
          {/* Image Left */}
          <div data-reveal className="w-[200px] md:w-[260px] shrink-0">
            <div className="aspect-square md:aspect-[4/5] relative w-full overflow-hidden">
              <Image 
                src="/hero-picture.jpg" 
                alt="Mike Cedrick" 
                fill
                sizes="260px"
                className="object-cover grayscale"
                priority
              />
              {/* Fade to black mask at the bottom to match reference */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
            </div>
          </div>
          
          {/* Text Right */}
          <div className="flex-1 space-y-6 pt-0 md:pt-4 text-center md:text-left">
            <h1 data-reveal className="font-display text-4xl md:text-5xl text-foreground font-normal tracking-wide">
              Mike Cedrick
            </h1>
            
            <div data-reveal className="space-y-5 text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
              <p>
                I'm a full-stack developer. I build modern web & mobile apps, and these days I'm focused on Next.js, Supabase, and scalable architectures.
              </p>
              <p>
                Right now I'm building cool new stuff every day. I love turning rough ideas into digital products that people actually use.
              </p>
            </div>

            <div data-reveal className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-5 text-xs font-display text-muted-foreground/80">
              <a href="https://github.com/Lomkiced" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                github <FiArrowUpRight className="w-3 h-3" />
              </a>
              <a href="https://linkedin.com/in/lomki-ced-446652393" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                linkedin <FiArrowUpRight className="w-3 h-3" />
              </a>
              <a href="/contact" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                contact <FiArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Stats & Details Grid ─────────────────────────────────────── */}
        <div className="w-full mt-16 md:mt-24 border-t border-border/40" data-reveal>
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-border/40">
            <div className="group p-5 md:p-6 md:border-r border-b md:border-b-0 border-border/40 flex items-center gap-4 cursor-default">
              <FiCode className="w-5 h-5 text-foreground/70 shrink-0 transition-all group-hover:text-foreground group-hover:scale-110" />
              <div>
                <div className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">CODEVS</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 transition-colors group-hover:text-foreground/70">Developer</div>
              </div>
            </div>
            
            <div className="group p-5 md:p-6 md:border-r border-b md:border-b-0 border-border/40 flex items-center gap-4 cursor-default">
              <FiAward className="w-5 h-5 text-foreground/70 shrink-0 transition-all group-hover:text-foreground group-hover:scale-110" />
              <div>
                <div className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">Top 1 Dean's Lister</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 transition-colors group-hover:text-foreground/70">BSIT Graduate</div>
              </div>
            </div>
            
            <div className="group p-5 md:p-6 flex items-center gap-4 cursor-default">
              <FiMapPin className="w-5 h-5 text-foreground/70 shrink-0 transition-all group-hover:text-foreground group-hover:scale-110" />
              <div>
                <div className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">UTC+7</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 transition-colors group-hover:text-foreground/70">Thailand Time</div>
              </div>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-border/40">
            <Link href="/projects" className="group p-5 md:p-6 md:border-r border-b md:border-b-0 border-border/40 cursor-pointer block">
              <div className="text-lg md:text-xl font-display text-foreground/80 transition-colors group-hover:text-foreground flex items-center gap-1.5">
                15+ <FiArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 transition-colors group-hover:text-foreground/70">Projects Built</div>
            </Link>
            
            <div className="group p-5 md:p-6 md:border-r border-b md:border-b-0 border-border/40 cursor-default">
              <div className="text-lg md:text-xl font-display text-foreground/80 transition-colors group-hover:text-foreground flex items-center gap-1.5">
                2+ yrs
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 transition-colors group-hover:text-foreground/70">Experience</div>
            </div>
            
            <div className="group p-5 md:p-6 cursor-default">
              <div className="text-lg md:text-xl font-display text-foreground/80 transition-colors group-hover:text-foreground flex items-center gap-1.5">
                TypeScript
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 transition-colors group-hover:text-foreground/70">Primary Language</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
