"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, Variants, useReducedMotion } from "framer-motion";
import React, { useRef, useState } from "react";
import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiFramer,
    SiRedux,
    SiNodedotjs,
    SiExpress,
    SiNestjs,
    SiPhp,
    SiLaravel,
    SiPrisma,
    SiExpo,
    SiDocker,
    SiVercel,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

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
    hidden: { opacity: 0, scale: 0.8, y: 30, rotateX: 30, rotateY: -15 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        transition: { type: "spring", damping: 15, stiffness: 100 },
    },
};

function SkillBadge({ skill }: { skill: Skill }) {
    const ref = useRef<HTMLDivElement>(null);

    // Magnetic effect core
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Mouse relative position for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configuration smoothing the movement
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Initial randomized float config (calculated once per badge)
    const [floatDuration] = useState(() => 3 + Math.random() * 2);
    const [floatDelay] = useState(() => Math.random() * 2);
    const shouldReduceMotion = useReducedMotion();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (shouldReduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        // Magnet effect calculations
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pullStrengthX = 0.2;
        const pullStrengthY = 0.3;

        x.set((e.clientX - centerX) * pullStrengthX);
        y.set((e.clientY - centerY) * pullStrengthY);

        // Spotlight calculations
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const glowColor = colorMap[skill.color] || "rgba(150, 150, 150, 0.3)";
    const background = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`;

    return (
        <motion.div variants={badgeVariants} className="relative will-change-transform">
            <motion.div
                animate={{
                    y: [0, -6, 0],
                }}
                transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay,
                }}
            >
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ x: springX, y: springY }}
                    className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default overflow-hidden border border-white/10 dark:border-white/5 bg-white/20 dark:bg-white/[0.03] backdrop-blur-md md:backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 will-change-transform"
                >
                    {/* Dynamic Spotlight Glow */}
                    {!shouldReduceMotion && (
                        <motion.div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0 will-change-opacity"
                            style={{ background }}
                        />
                    )}

                    {/* Top gradient reflecting gloss */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <skill.icon
                        className={`w-5 h-5 ${skill.color} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 relative z-10`}
                    />
                    <span className="text-sm font-medium text-foreground relative z-10 drop-shadow-sm">
                        {skill.name}
                    </span>

                    {/* Ultra-thin inner border for premium glass feel */}
                    <div className="absolute inset-0 rounded-xl border border-white/[0.15] dark:border-white/[0.05] pointer-events-none mix-blend-overlay" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent blur-2xl md:blur-3xl -z-10 pointer-events-none will-change-transform" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl md:blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none -z-10 will-change-transform" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl md:blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none -z-10 will-change-transform" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-4">
                        Skills & Arsenal
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-foreground">
                        My Tech Stack
                    </h2>
                    <p className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </motion.div>

                {/* Skill categories */}
                <div className="space-y-16">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: catIndex * 0.1, duration: 0.6, ease: "easeOut" }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <h3 className="text-2xl font-semibold font-display tracking-wide text-foreground">
                                    {category.title}
                                </h3>
                                <div className="h-px flex-1 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-transparent" />
                            </div>

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
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
