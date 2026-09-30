"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTAL_PROJECTS } from "@/lib/data";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Projects Section ───────────────────────────────────────────────────────
// Advanced Bento/Card Grid layout. Premium dark theme with glossy hover states,
// comprehensive data display, and clean actionable links.

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll(".project-card"), { opacity: 1, y: 0 });
      return;
    }

    const cards = el.querySelectorAll(".project-card");
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
            Featured Work
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            A curated collection of production systems, government platforms,
            and collaborative tools built with modern architectures.
          </p>
        </div>
      </div>

      {/* ── Project Grid ─────────────────────────────────────────────── */}
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {PORTAL_PROJECTS.map((project, index) => (
          <article 
            key={project.id} 
            className="project-card group relative bg-[#080808] border border-border/20 rounded-2xl overflow-hidden flex flex-col h-full hover:border-foreground/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="p-8 flex flex-col flex-1 relative z-10">
              
              {/* Top: Client & Number */}
              <div className="flex justify-between items-start mb-8">
                <span className="px-3 py-1 rounded-full border border-border/30 bg-background/50 text-[10px] font-mono text-muted-foreground uppercase tracking-widest shadow-sm">
                  {project.client || "Independent Project"}
                </span>
                <span className="font-mono text-muted-foreground/20 text-2xl font-light tabular-nums leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              
              {/* Middle: Title & Description */}
              <div className="flex-1">
                <h2 className="font-display text-2xl text-foreground mb-3 group-hover:text-foreground/90 transition-colors">
                  {project.title}
                </h2>
                <h3 className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mb-4">
                  Role: {project.role}
                </h3>
                <p className="text-muted-foreground/80 text-sm leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              {/* Stack Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map(tech => (
                  <span 
                    key={tech} 
                    className="px-2.5 py-1 rounded-md border border-border/20 bg-foreground/[0.02] text-[10px] font-medium text-muted-foreground/80 group-hover:border-border/40 group-hover:text-foreground/80 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bottom: Links */}
              <div className="flex flex-wrap items-center gap-3 mt-auto pt-6 border-t border-border/10">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-medium hover:bg-foreground/90 hover:scale-[1.02] transition-all"
                  >
                    <FiExternalLink className="w-3.5 h-3.5" />
                    Live System
                  </a>
                )}
                
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/40 text-foreground text-xs font-medium hover:bg-foreground/5 transition-colors"
                  >
                    <FiGithub className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                )}

                {(!project.liveUrl || project.liveUrl === "#") && (!project.githubUrl || project.githubUrl === "#") && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/20 text-muted-foreground/50 text-xs font-medium cursor-default">
                    Confidential / Offline
                  </span>
                )}
              </div>

            </div>
          </article>
        ))}
      </div>

      {/* ── Footer note ──────────────────────────────────────────────── */}
      <div className="mt-16 pt-8 border-t border-border/20 flex items-center justify-between">
        <p className="text-xs font-mono text-muted-foreground/50">
          + View more repositories on my GitHub.
        </p>
        <a
          href="https://github.com/Lomkiced"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground hover:opacity-70 transition-opacity"
        >
          @Lomkiced <FiArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
