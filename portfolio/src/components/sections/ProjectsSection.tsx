"use client";

import { PORTAL_PROJECTS } from "@/lib/data";
import GsapReveal from "@/components/portal/GsapReveal";
import { FiArrowUpRight } from "react-icons/fi";

// ─── Projects Section ───────────────────────────────────────────────────────
// Editorial project grid. Each card: hairline border, name in display font,
// tech as inline text, subtle hover state (scale + bg shift).

export default function ProjectsSection() {
  return (
    <section>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <GsapReveal>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-muted-foreground/30" />
            <span className="text-label uppercase text-muted-foreground tracking-widest">
              Portfolio
            </span>
          </div>
          <h1 className="font-display text-h1">Featured Work</h1>
          <p className="text-body text-muted-foreground mt-3 max-w-lg">
            A curated collection of production systems, government platforms,
            and collaborative tools.
          </p>
        </div>
      </GsapReveal>

      {/* ── Project Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
        {PORTAL_PROJECTS.map((project, index) => (
          <GsapReveal key={project.id} delay={index * 0.04}>
            <article className="group relative bg-background p-6 sm:p-8 min-h-[220px] flex flex-col justify-between transition-colors duration-300 hover:bg-card cursor-default">
              {/* Top: Number + Title */}
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-label text-muted-foreground/30 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {project.client && (
                    <span className="text-label uppercase text-muted-foreground/40 tracking-wider">
                      {project.client}
                    </span>
                  )}
                </div>

                <h2 className="font-display text-h2 text-foreground mb-2 group-hover:scale-[1.01] transition-transform duration-300 origin-left">
                  {project.title}
                </h2>

                <p className="text-caption text-muted-foreground leading-relaxed mb-4">
                  {project.summary}
                </p>
              </div>

              {/* Bottom: Stack + Link */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-x-1">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={tech}
                      className="text-caption text-muted-foreground/50"
                    >
                      {tech}
                      {i < project.techStack.length - 1 && (
                        <span className="mx-1.5 text-muted-foreground/20">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-label text-muted-foreground/30 uppercase">
                    {project.role}
                  </span>

                  {project.liveUrl && project.liveUrl !== "#" ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-caption text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      View
                      <FiArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="text-label text-muted-foreground/20 uppercase">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>

              {/* Hover indicator — thin left border */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
            </article>
          </GsapReveal>
        ))}
      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <GsapReveal delay={0.3}>
        <div className="mt-12 pt-8 border-t border-border/30">
          <p className="text-caption text-muted-foreground/40">
            + More projects available on{" "}
            <a
              href="https://github.com/Lomkiced"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
            >
              GitHub
            </a>
          </p>
        </div>
      </GsapReveal>
    </section>
  );
}
