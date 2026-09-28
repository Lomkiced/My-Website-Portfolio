"use client";

import { SKILL_GROUPS } from "@/lib/data";
import GsapReveal from "@/components/portal/GsapReveal";

// ─── Skills Section ─────────────────────────────────────────────────────────
// Grouped, typographic skill display. No colored badges — monochrome only.

export default function SkillsSection() {
  return (
    <section>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <GsapReveal>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-muted-foreground/30" />
            <span className="text-label uppercase text-muted-foreground tracking-widest">
              Skills
            </span>
          </div>
          <h1 className="font-display text-h1">Tech Stack</h1>
        </div>
      </GsapReveal>

      {/* ── Skill Groups ─────────────────────────────────────────────── */}
      <div className="space-y-12">
        {SKILL_GROUPS.map((group, groupIndex) => (
          <GsapReveal key={group.category} delay={groupIndex * 0.06}>
            <div className="group">
              {/* Category Header */}
              <div className="flex items-baseline gap-4 mb-5">
                <span className="text-label uppercase text-muted-foreground/40 tracking-widest tabular-nums">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="text-h3 font-medium text-foreground">
                  {group.category}
                </h2>
              </div>

              {/* Skill Items */}
              <div className="pl-10 flex flex-wrap gap-x-1 gap-y-0">
                {group.items.map((item, itemIndex) => (
                  <span
                    key={item}
                    className="text-body text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-default"
                  >
                    {item}
                    {itemIndex < group.items.length - 1 && (
                      <span className="text-muted-foreground/20 mx-2">·</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Hairline divider */}
              {groupIndex < SKILL_GROUPS.length - 1 && (
                <div className="mt-10 h-px bg-border/40" />
              )}
            </div>
          </GsapReveal>
        ))}
      </div>

      {/* ── Footer note ──────────────────────────────────────────────── */}
      <GsapReveal delay={0.4}>
        <div className="mt-16 pt-8 border-t border-border/30">
          <p className="text-caption text-muted-foreground/50">
            + Continuously exploring new tools and frameworks to expand my stack.
          </p>
        </div>
      </GsapReveal>
    </section>
  );
}
