"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiGithub, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Overview Projects Section ──────────────────────────────────────────────
// A 3D fan-out showcase of top projects modeled after the reference image.

export default function OverviewProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // We can add a simple scroll reveal here
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          scroller: "#main-content", // Ensure it works with the app shell
        },
      }
    );
  }, []);

  return (
    <section className="relative py-6 md:py-8 flex flex-col justify-center border-t border-border/20 overflow-hidden">
      {/* Background dot grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff08_1.5px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none" />

      <div ref={containerRef} className="max-w-4xl mx-auto w-full px-4 md:px-0 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="font-display text-muted-foreground/80 tracking-widest text-sm uppercase flex items-center gap-4">
            <span>02</span>
            <span className="w-8 h-px bg-border/50" />
            <span>projects</span>
          </div>
          <Link 
            href="/projects" 
            className="group font-display text-muted-foreground hover:text-foreground tracking-widest text-sm uppercase flex items-center gap-2 transition-colors"
          >
            All Projects 
            <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3D Fan-out Cards Container */}
        <div className="relative w-full max-w-xl mx-auto h-[320px] flex items-center justify-center mb-4">
          
          {/* Left Card (FarmFlow) */}
          <div className="absolute left-[-20%] md:left-[-35%] top-[10%] z-10 w-[300px] md:w-[400px] -rotate-12 scale-90 opacity-40 blur-[1px] hover:blur-none hover:opacity-100 transition-all duration-500 rounded-xl border border-border/30 bg-[#0a0a0a] p-6 md:p-8 shadow-2xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full border border-border/50 text-[10px] uppercase tracking-widest font-medium bg-foreground text-background">
                #1 PWA Marketplace
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="font-display text-lg text-foreground">FarmFlow</h3>
            </div>
            <p className="text-sm text-muted-foreground/80 leading-relaxed mb-8">
              Agricultural Operations Management System for optimizing farm activities, supply chain, and harvest yields. Built with offline support.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://farm-flow-agoo.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-md border border-border/50 text-xs text-foreground bg-background hover:bg-foreground/5 transition-colors">
                <FiExternalLink /> Live System
              </a>
            </div>
          </div>

          {/* Right Card (KIP) */}
          <div className="absolute right-[-20%] md:right-[-35%] top-[10%] z-10 w-[300px] md:w-[400px] rotate-12 scale-90 opacity-40 blur-[1px] hover:blur-none hover:opacity-100 transition-all duration-500 rounded-xl border border-border/30 bg-[#0a0a0a] p-6 md:p-8 shadow-2xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full border border-border/50 text-[10px] uppercase tracking-widest font-medium bg-foreground text-background">
                #1 Secure Archiving
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="font-display text-lg text-foreground">KIP Archiving</h3>
            </div>
            <p className="text-sm text-muted-foreground/80 leading-relaxed mb-8">
              Comprehensive Record Management System. Digitizes and secures document archiving with interactive data dashboards.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/Lomkiced" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-md border border-border/50 text-xs text-foreground bg-background hover:bg-foreground/5 transition-colors">
                <FiGithub /> GitHub
              </a>
            </div>
          </div>

          {/* Center Card (eCash) */}
          <div className="absolute z-30 w-full max-w-[420px] rounded-xl border border-border/50 bg-[#080808] p-6 md:p-8 shadow-[0_0_50px_-12px_rgba(255,255,255,0.05)] hover:scale-[1.02] transition-transform duration-500">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full border border-border/50 text-[10px] uppercase tracking-widest font-medium bg-foreground text-background flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
                Featured System
              </span>
              <span className="px-3 py-1 rounded-full border border-border/30 text-[10px] uppercase tracking-widest font-medium text-muted-foreground">
                Gov Finance
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-5">
              <h3 className="font-display text-xl text-foreground">eCash Tracker</h3>
            </div>
            
            <p className="text-sm text-muted-foreground/90 leading-relaxed mb-8">
              Disbursement Monitoring System for government financial tracking. Features automated background tasks and real-time WebSocket updates.
            </p>
            
            <div className="flex items-center gap-3">
              <a href="https://ecash.dost1.ph" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-border/50 text-xs text-background font-medium bg-foreground hover:bg-foreground/90 transition-colors">
                <FiExternalLink /> Live System
              </a>
              <a href="https://github.com/Lomkiced" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-border/30 text-xs text-muted-foreground bg-secondary/30 hover:bg-secondary transition-colors">
                <FiGithub /> GitHub
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
