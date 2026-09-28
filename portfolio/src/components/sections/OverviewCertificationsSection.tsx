"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Overview Certifications Section ──────────────────────────────────────────
// A clean, grid-based showcase of top certifications and awards modeled after
// the reference design.

const certifications = [
  {
    title: "Technical Intern",
    issuer: "micro1",
    logoSrc: "/micro1-logo.png",
    logoText: "m1",
    colorClass: "text-emerald-400",
    link: "/micro1.jpg",
  },
  {
    title: "Top 1 Dean's Lister",
    issuer: "PCLU",
    logoSrc: "/pclu-logo.png",
    logoText: "DL",
    colorClass: "text-amber-400",
    link: "/DN1.jpg",
  },
  {
    title: "IT Internship",
    issuer: "DOST REGION 1",
    logoSrc: "/dost-logo.png",
    logoText: "DOST",
    colorClass: "text-blue-400",
    link: "/dostc1.jpg",
  },
];

export default function OverviewCertificationsSection() {
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
    <section className="pt-12 pb-24 flex flex-col justify-center border-t border-border/20 bg-[#050505]">
      <div ref={containerRef} className="max-w-4xl mx-auto w-full px-4 md:px-0">
        
        {/* Header */}
        <div data-reveal className="flex items-center justify-between mb-12">
          <div className="font-display text-muted-foreground/80 tracking-widest text-sm uppercase flex items-center gap-4">
            <span>04</span>
            <span className="w-8 h-px bg-border/50" />
            <span>certifications</span>
          </div>
          <Link 
            href="/certifications" 
            className="group font-display text-muted-foreground hover:text-foreground tracking-widest text-[10px] uppercase flex items-center gap-2 transition-colors"
          >
            All Certifications 
            <FiArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div 
              key={idx}
              data-reveal
              className="group relative flex flex-col items-center justify-between p-8 rounded-2xl border border-border/30 bg-[#0a0a0a] hover:bg-foreground/[0.02] transition-colors shadow-lg h-[260px]"
            >
              {/* Logo */}
              <div className="w-24 h-24 flex items-center justify-center mb-6 relative">
                {cert.logoSrc ? (
                  <Image src={cert.logoSrc} alt={cert.issuer} fill className="object-contain" />
                ) : (
                  <span className={`font-display font-bold text-2xl ${cert.colorClass}`}>
                    {cert.logoText}
                  </span>
                )}
              </div>

              {/* Text Info */}
              <div className="flex flex-col items-center text-center space-y-2 flex-1">
                <h3 className="font-display text-foreground font-semibold text-lg leading-snug max-w-[200px]">
                  {cert.title}
                </h3>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  {cert.issuer}
                </span>
              </div>

              {/* View Button */}
              <a 
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 text-[10px] font-display uppercase tracking-widest text-muted-foreground/60 group-hover:text-foreground transition-colors"
              >
                <span className="opacity-50 group-hover:opacity-100 transition-opacity">⟨</span>
                VIEW
                <span className="opacity-50 group-hover:opacity-100 transition-opacity">⟩</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
