"use client";

import { motion, Variants } from "framer-motion";
import React from "react";
import {
    SiDocker,
    SiExpo,
    SiExpress,
    SiFramer,
    SiLaravel,
    SiNestjs,
    SiNextdotjs,
    SiNodedotjs,
    SiPhp,
    SiPrisma,
    SiReact,
    SiRedux,
    SiTailwindcss,
    SiVercel,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import SectionTitle from "@/components/animations/section-title";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface Skill {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface SkillCategory {
    title: string;
    skills: Skill[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Frontend",
        skills: [
            { name: "React", icon: SiReact, color: "text-cyan-500" },
            { name: "Next.js", icon: SiNextdotjs, color: "text-foreground" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
            { name: "Framer Motion", icon: SiFramer, color: "text-pink-500" },
            { name: "Redux", icon: SiRedux, color: "text-purple-500" },
            { name: "Zustand", icon: SiReact, color: "text-orange-500" },
            { name: "TanStack Query", icon: SiReact, color: "text-red-500" },
            { name: "Shadcn/UI", icon: SiReact, color: "text-foreground" },
            { name: "DaisyUI", icon: SiTailwindcss, color: "text-green-500" },
            { name: "Recoil", icon: SiReact, color: "text-blue-400" },
        ],
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
            { name: "Express.js", icon: SiExpress, color: "text-foreground" },
            { name: "NestJS", icon: SiNestjs, color: "text-red-500" },
            { name: "PHP", icon: SiPhp, color: "text-indigo-400" },
            { name: "Laravel", icon: SiLaravel, color: "text-red-600" },
        ],
    },
    {
        title: "ORM & Data Access",
        skills: [
            { name: "Prisma", icon: SiPrisma, color: "text-violet-500" },
        ],
    },
    {
        title: "Mobile Development",
        skills: [
            { name: "React Native", icon: TbBrandReactNative, color: "text-cyan-500" },
            { name: "Expo", icon: SiExpo, color: "text-foreground" },
        ],
    },
    {
        title: "DevOps & Deployment",
        skills: [
            { name: "Docker", icon: SiDocker, color: "text-blue-500" },
            { name: "Vercel", icon: SiVercel, color: "text-foreground" },
        ],
    },
];

const colorMap: Record<string, string> = {
    "text-cyan-500": "rgba(6, 182, 212, 0.4)",
    "text-cyan-400": "rgba(34, 211, 238, 0.4)",
    "text-pink-500": "rgba(236, 72, 153, 0.4)",
    "text-purple-500": "rgba(168, 85, 247, 0.4)",
    "text-orange-500": "rgba(249, 115, 22, 0.4)",
    "text-red-500": "rgba(239, 68, 68, 0.4)",
    "text-green-500": "rgba(34, 197, 94, 0.4)",
    "text-blue-400": "rgba(96, 165, 250, 0.4)",
    "text-indigo-400": "rgba(129, 140, 248, 0.4)",
    "text-red-600": "rgba(220, 38, 38, 0.4)",
    "text-violet-500": "rgba(139, 92, 246, 0.4)",
    "text-blue-500": "rgba(59, 130, 246, 0.4)",
    "text-foreground": "rgba(150, 150, 150, 0.3)",
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", damping: 15, stiffness: 100 },
    },
};

function SkillBadge({ skill }: { skill: Skill }) {
    const glowColor = colorMap[skill.color] || "rgba(150, 150, 150, 0.3)";

    return (
        <motion.div
            variants={badgeVariants}
            className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl cursor-default border border-white/10 dark:border-white/5 bg-white/20 dark:bg-white/[0.03] backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 will-change-transform"
        >
            {/* Spotlight Glow (Static) */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 z-0 overflow-hidden rounded-xl"
                style={{ background: `radial-gradient(120px circle at center, ${glowColor}, transparent 80%)` }}
            />

            {/* Top gradient reflecting gloss */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <skill.icon
                className={`w-5 h-5 ${skill.color} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 relative z-10`}
            />
            <span className="text-sm font-medium text-foreground relative z-10 drop-shadow-sm pointer-events-none">
                {skill.name}
            </span>

            {/* Ultra-thin inner border for premium glass feel */}
            <div className="absolute inset-0 rounded-xl border border-white/[0.15] dark:border-white/[0.05] pointer-events-none mix-blend-overlay" />
        </motion.div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent blur-2xl md:blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl md:blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl md:blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <SectionTitle
                    label="Skills"
                    title="My Tech Stack"
                    subtitle="Technologies and tools I use to bring ideas to life"
                    className="mb-20"
                />

                {/* Skill categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {skillCategories.map((category, catIndex) => (
                        <ScrollReveal
                            key={category.title}
                            variant="fadeUp"
                            delay={catIndex * 0.08}
                            viewportMargin="-100px"
                            className={catIndex === 0 ? "lg:col-span-2 h-full" : "col-span-1 h-full"}
                        >
                            <div className="relative flex flex-col h-full p-6 sm:p-8 rounded-[2rem] bg-white/40 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/5 backdrop-blur-xl overflow-hidden group/bento hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                                {/* Top-border gradient line that fades in on hover */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 dark:via-white/30 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                
                                <h3 className="mb-6 text-xl font-bold font-display text-neutral-900 dark:text-white">
                                    {category.title}
                                </h3>

                                <motion.div
                                    className="flex flex-wrap gap-4 [perspective:1000px]"
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                >
                                    {category.skills.map((skill) => (
                                        <SkillBadge key={skill.name} skill={skill} />
                                    ))}
                                </motion.div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
