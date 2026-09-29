"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";
import { BLOG_POSTS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// ─── Overview Blog Section ──────────────────────────────────────────────────
// Minimalist list of recent blog posts for the landing page.

export default function OverviewBlogSection() {
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
    <section className="relative py-12 flex flex-col justify-center border-t border-border/20 overflow-hidden">
      {/* Background dot grid pattern (fading out from left) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,#ffffff15_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 mask-image:linear-gradient(to_right,black,transparent) pointer-events-none" style={{ WebkitMaskImage: 'radial-gradient(circle at left, black 0%, transparent 70%)' }} />

      <div ref={containerRef} className="max-w-4xl mx-auto w-full px-4 md:px-0 relative z-10">
        
        {/* Header */}
        <div data-reveal className="flex items-center justify-between mb-8">
          <div className="font-display text-muted-foreground/80 tracking-widest text-sm uppercase flex items-center gap-4">
            <span>01</span>
            <span className="w-8 h-px bg-border/50" />
            <span>blog</span>
          </div>
          <Link 
            href="/blog" 
            className="group font-display text-muted-foreground hover:text-foreground tracking-widest text-[10px] uppercase flex items-center gap-2 transition-colors"
          >
            All Posts 
            <FiArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* List */}
        <div className="w-full flex flex-col border-t border-border/30">
          {BLOG_POSTS.map((post, idx) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`}
              data-reveal
              className="group flex flex-col py-6 border-b border-border/30 hover:bg-foreground/[0.02] transition-colors cursor-pointer px-2 md:px-4"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-16">
                
                {/* Title & Description */}
                <div className="flex-1">
                  <h3 className="font-display text-lg md:text-xl text-foreground font-medium group-hover:text-foreground/80 transition-colors">
                    {post.title}
                  </h3>
                  
                  {/* Subtle description that reveals/highlights on hover */}
                  <p className="mt-2 text-sm text-muted-foreground/60 group-hover:text-muted-foreground/90 transition-colors line-clamp-1 md:line-clamp-2 pr-4">
                    {post.summary}
                  </p>
                </div>

                {/* Date */}
                <span className="font-mono text-muted-foreground/60 text-xs md:text-sm shrink-0 md:pt-1">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
