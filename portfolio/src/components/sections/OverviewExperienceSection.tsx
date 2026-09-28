"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Overview Experience Section ──────────────────────────────────────────────
// Ultra-minimalist list of experiences and tech stack modeled after reference.

const experiences = [
  {
    year: "Present",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
  },
  {
    year: "2026",
    role: "Mathematics & English Teacher",
    company: "Pakdeepan Kindergarten School",
  },
  {
    year: "2025",
    role: "Technical Intern",
    company: "DOST Region 1",
  },
];

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Supabase",
  "Prisma",
  "PostgreSQL",
  "Tailwind CSS",
  "Docker",
  "Antigravity",
];

export default function OverviewExperienceSection() {
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
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        scroller: "#main-content",
      },
    });
  }, []);

  return (
    <section className="py-12 flex flex-col justify-center border-t border-border/20">
      <div ref={containerRef} className="max-w-4xl mx-auto w-full px-4 md:px-0 space-y-16">
        
        {/* ── Experience List ────────────────────────────────────────────── */}
        <div>
          {/* Header */}
          <div data-reveal className="flex items-center justify-between mb-8">
            <div className="font-display text-muted-foreground/80 tracking-widest text-sm uppercase flex items-center gap-4">
              <span>03</span>
              <span className="w-8 h-px bg-border/50" />
              <span>experience</span>
            </div>
            <Link 
              href="/experience" 
              className="group font-display text-muted-foreground hover:text-foreground tracking-widest text-[10px] uppercase flex items-center gap-2 transition-colors"
            >
              Full History 
              <FiArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* List */}
          <div className="w-full flex flex-col border-t border-border/30">
            {experiences.map((exp, idx) => (
              <div 
                key={idx} 
                data-reveal
                className="group flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-border/30 hover:bg-foreground/[0.02] transition-colors cursor-default px-2 md:px-4"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16">
                  <span className="font-display text-muted-foreground/60 text-xs w-12">
                    {exp.year}
                  </span>
                  <span className="text-foreground font-medium text-base group-hover:text-foreground transition-colors">
                    {exp.role}
                  </span>
                </div>
                <span className="text-muted-foreground/80 text-sm mt-2 md:mt-0 md:text-right">
                  {exp.company}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech Stack ─────────────────────────────────────────────────── */}
        <div>
          {/* Header */}
          <div data-reveal className="flex items-center justify-between mb-8">
            <div className="font-display text-muted-foreground/80 tracking-widest text-sm uppercase">
              Stack
            </div>
            <Link 
              href="/skills" 
              className="group font-display text-muted-foreground hover:text-foreground tracking-widest text-[10px] uppercase flex items-center gap-2 transition-colors"
            >
              View All 
              <FiArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Tags */}
          <div data-reveal className="flex flex-wrap items-center gap-3 md:gap-4">
            {stack.map((tech) => (
              <div 
                key={tech}
                className="px-4 py-2 rounded border border-border/40 bg-transparent text-muted-foreground/80 font-display text-xs hover:border-border/80 hover:text-foreground transition-colors cursor-default"
              >
                {tech}
              </div>
            ))}
            <div className="px-4 py-2 rounded border border-dashed border-border/40 bg-transparent text-muted-foreground/50 font-display text-xs cursor-default">
              + more
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
