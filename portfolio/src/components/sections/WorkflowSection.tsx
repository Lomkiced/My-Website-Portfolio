"use client";

import { FiDatabase, FiCode, FiActivity, FiCloud } from "react-icons/fi";
import GsapReveal from "@/components/portal/GsapReveal";

// ─── Workflow Section ───────────────────────────────────────────────────────

const WORKFLOW_STEPS = [
  {
    title: "Architecture & System Design",
    icon: FiDatabase,
    description:
      "Before writing code, I architect scalable foundations. This involves designing relational database schemas, defining robust API endpoints, and configuring optimal environments using tools like Prisma for type-safe database interactions.",
  },
  {
    title: "Core Engineering & Development",
    icon: FiCode,
    description:
      "Writing clean, modular, and strictly typed code. I focus on building secure, robust backend logic and bridging it seamlessly with immersive, high-performance frontend interfaces.",
  },
  {
    title: "Testing & Refinement",
    icon: FiActivity,
    description:
      "Ensuring enterprise-grade reliability. I rigorously test edge cases, optimize database query performance, and refine the user interface to guarantee fluid, native-feeling interactions.",
  },
  {
    title: "Deployment & Delivery",
    icon: FiCloud,
    description:
      "Shipping to production securely and efficiently. Setting up CI/CD pipelines, managing environment variables, and containerizing applications for highly scalable, global deployment.",
  },
] as const;

export default function WorkflowSection() {
  return (
    <section>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <GsapReveal>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-muted-foreground/30" />
            <span className="text-label uppercase text-muted-foreground tracking-widest">
              Process
            </span>
          </div>
          <h1 className="font-display text-h1">Workflow</h1>
          <p className="text-body text-muted-foreground mt-3 max-w-lg">
            A proven, systematic software development lifecycle for delivering
            high-performance, scalable digital products.
          </p>
        </div>
      </GsapReveal>

      {/* ── Steps ──────────────────────────────────────────────────────── */}
      <div className="space-y-12 md:space-y-16 max-w-4xl">
        {WORKFLOW_STEPS.map((step, index) => (
          <GsapReveal key={step.title} delay={index * 0.1}>
            <div className="group flex flex-col md:flex-row gap-6 md:gap-10">
              {/* Node indicator */}
              <div className="flex flex-row md:flex-col items-center gap-4 shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border/50 text-muted-foreground transition-colors duration-300 group-hover:border-foreground/30 group-hover:text-foreground">
                  <step.icon className="w-5 h-5" />
                </div>
                {index !== WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden md:block w-px h-full min-h-[4rem] bg-gradient-to-b from-border/50 to-transparent" />
                )}
              </div>

              {/* Content */}
              <div className="pt-2">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-display text-3xl text-muted-foreground/20 select-none">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-2xl tracking-tight text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-body text-muted-foreground leading-relaxed md:pr-10">
                  {step.description}
                </p>
              </div>
            </div>
          </GsapReveal>
        ))}
      </div>
    </section>
  );
}
