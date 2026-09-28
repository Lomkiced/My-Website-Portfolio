"use client";

import { EXPERIENCE_DATA } from "@/lib/data";
import GsapReveal from "@/components/portal/GsapReveal";

// ─── Experience Section ─────────────────────────────────────────────────────
// Clean typographic timeline. Work and education as parallel tracks.

export default function ExperienceSection() {
  return (
    <section>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <GsapReveal>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-muted-foreground/30" />
            <span className="text-label uppercase text-muted-foreground tracking-widest">
              Journey
            </span>
          </div>
          <h1 className="font-display text-h1">Experience & Education</h1>
        </div>
      </GsapReveal>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <div className="space-y-0">
        {EXPERIENCE_DATA.map((item, index) => (
          <GsapReveal key={index} delay={index * 0.08}>
            <div className="group relative pl-8 pb-12 last:pb-0">
              {/* Timeline line */}
              {index < EXPERIENCE_DATA.length - 1 && (
                <div className="absolute left-[3px] top-3 bottom-0 w-px bg-border/50 group-hover:bg-muted-foreground/30 transition-colors duration-500" />
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-[6px] w-[7px] h-[7px] rounded-full bg-muted-foreground/30 group-hover:bg-foreground group-hover:scale-150 transition-all duration-300" />

              {/* Content */}
              <div className="space-y-2">
                {/* Type badge + period */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-label uppercase text-muted-foreground/40 tracking-widest">
                    {item.type}
                  </span>
                  <span className="text-muted-foreground/15">—</span>
                  <span className="text-caption text-muted-foreground/60">
                    {item.period}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-h3 font-medium text-foreground group-hover:translate-x-1 transition-transform duration-300">
                  {item.title}
                </h2>

                {/* Organization */}
                <p className="text-body text-muted-foreground/70">
                  {item.organization}
                </p>

                {/* Description */}
                <p className="text-caption text-muted-foreground leading-relaxed max-w-lg pt-1">
                  {item.description}
                </p>

                {/* Awards */}
                {item.awards && item.awards.length > 0 && (
                  <div className="pt-4 space-y-2">
                    <span className="text-label uppercase text-muted-foreground/30 tracking-widest">
                      Awards & Recognition
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.awards.map((award, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-label uppercase tracking-wider bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-200 rounded-sm"
                        >
                          <span className="text-muted-foreground/30">+</span>
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </GsapReveal>
        ))}
      </div>
    </section>
  );
}
