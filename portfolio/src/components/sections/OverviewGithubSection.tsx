"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Overview GitHub Section ──────────────────────────────────────────────────
// A stylized contribution graph modeled after the reference image.

export default function OverviewGithubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate a mock contribution grid that resembles the reference image
  // The reference image has varying sizes and opacities forming an abstract density map
  const grid = useMemo(() => {
    const cols = 48; // number of columns
    const rows = 7; // number of rows
    const cells = [];

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        let baseProb = 0;
        
        // Match the user's real contribution graph:
        // First ~12 columns (Oct, Nov, Dec) are almost entirely empty
        if (c < 12) {
          baseProb = 0.02; // Very sparse
        } 
        // 13-24 (Jan to Mar) very active
        else if (c < 24) {
          baseProb = 0.5;
        }
        // 24-36 (Apr to Jun) moderately active
        else if (c < 36) {
          baseProb = 0.4;
        }
        // 36-48 (Jul to Sep) highly active, with some dense spots
        else {
          baseProb = 0.6;
        }
        
        const rand = Math.random();
        let level = 0;
        
        // Randomly assign levels based on base probability
        if (rand < baseProb * 0.3) {
          level = 4; // Dark green equivalent
        } else if (rand < baseProb * 0.6) {
          level = 3; 
        } else if (rand < baseProb) {
          level = 2;
        } else if (rand < baseProb + 0.1) {
           level = 1; // Light green equivalent
        }
        
        cells.push({ id: `${c}-${r}`, col: c, row: r, level });
      }
    }
    return cells;
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll("[data-reveal]"), { opacity: 1, y: 0 });
      gsap.set(el.querySelectorAll(".gh-dot"), { scale: 1, opacity: 1 });
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

    // Stagger animate the grid dots
    const dots = el.querySelectorAll(".gh-dot");
    gsap.set(dots, { scale: 0, opacity: 0 });
    
    gsap.to(dots, {
      scale: 1,
      opacity: (index, target) => target.dataset.targetOpacity,
      duration: 0.4,
      stagger: {
        amount: 1.5,
        grid: [7, 48],
        from: "random"
      },
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        scroller: "#main-content",
      },
    });

  }, [mounted]);

  // Determine styles based on activity level
  const getDotStyle = (level: number) => {
    switch (level) {
      case 4: return { size: "w-[80%] h-[80%]", bg: "bg-foreground", opacity: 1 };
      case 3: return { size: "w-[65%] h-[65%]", bg: "bg-foreground/90", opacity: 0.9 };
      case 2: return { size: "w-[45%] h-[45%]", bg: "bg-muted-foreground/80", opacity: 0.8 };
      case 1: return { size: "w-[25%] h-[25%]", bg: "bg-muted-foreground/40", opacity: 0.4 };
      default: return { size: "w-[12%] h-[12%]", bg: "bg-border/30", opacity: 0.2 };
    }
  };

  return (
    <section className="py-12 flex flex-col justify-center border-t border-border/20">
      <div ref={containerRef} className="max-w-4xl mx-auto w-full px-4 md:px-0">
        
        {/* Header */}
        <div data-reveal className="flex items-center justify-between mb-12">
          <div className="font-display text-muted-foreground/80 tracking-widest text-sm uppercase flex items-center gap-4">
            <span>05</span>
            <span className="w-8 h-px bg-border/50" />
            <span>github</span>
          </div>
          <a 
            href="https://github.com/Lomkiced" 
            target="_blank"
            rel="noopener noreferrer"
            className="group font-display text-muted-foreground hover:text-foreground tracking-widest text-[10px] uppercase flex items-center gap-2 transition-colors"
          >
            @Lomkiced 
            <FiArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Contribution Graph */}
        <div className="w-full pb-4">
          <div className="flex flex-col justify-between w-full h-[120px] sm:h-[140px] md:h-[180px]">
            {/* Generate rows manually since flex-col groups by rows */}
            {mounted && Array.from({ length: 7 }).map((_, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex justify-between items-center w-full">
                {grid.filter(cell => cell.row === rowIndex).map(cell => {
                  const style = getDotStyle(cell.level);
                  return (
                    <div 
                      key={cell.id} 
                      className="flex items-center justify-center aspect-square"
                      style={{ width: "calc(100% / 48)" }}
                    >
                      <div 
                        className={`gh-dot rounded-full ${style.size} ${style.bg} transition-colors duration-300 hover:bg-foreground hover:scale-150 cursor-pointer`}
                        data-target-opacity={style.opacity}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div data-reveal className="mt-8 pt-6 border-t border-border/20 flex items-center">
          <span className="font-display text-muted-foreground tracking-widest text-[10px] uppercase">
            643 CONTRIBUTIONS IN THE LAST YEAR
          </span>
        </div>

      </div>
    </section>
  );
}
