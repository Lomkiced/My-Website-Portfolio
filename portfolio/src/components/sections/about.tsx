"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import SectionTitle from "@/components/animations/section-title";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { MouseEvent, ReactNode } from "react";
import { FiAward, FiCode, FiGithub, FiGlobe, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import { SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";

// --- Spotlight Card Component ---
function SpotlightCard({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <ScrollReveal variant="slideScale" delay={delay} className="h-full" viewportMargin="-10%">
            <div
                onMouseMove={handleMouseMove}
                className={`group relative h-full overflow-hidden rounded-[2.5rem] border border-neutral-200/50 dark:border-white/[0.05] bg-white/50 dark:bg-[#0a0a0c]/80 backdrop-blur-3xl transition-transform duration-500 hover:-translate-y-2 will-change-transform shadow-sm hover:shadow-2xl ${className}`}
            >
                {/* Spotlight Holographic Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${mouseX}px ${mouseY}px,
                                rgba(139, 92, 246, 0.1),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 h-full">{children}</div>
            </div>
        </ScrollReveal>
    );
}

// --- Smooth Staggered Text ---
const textContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 * i },
    }),
};

const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const }
    },
};

function AnimatedText({ text, className }: { text: string; className?: string }) {
    const words = text.split(" ");
    return (
        <motion.div
            className={`flex flex-wrap ${className}`}
            variants={textContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
        >
            {words.map((word, index) => (
                <div key={index} className="overflow-hidden pb-2 mr-2 md:mr-3 last:mr-0 inline-flex">
                    <motion.span className="inline-block" variants={wordVariants} viewport={{ once: true }}>
                        {word}
                    </motion.span>
                </div>
            ))}
        </motion.div>
    );
}

// --- Tech Ring Animation Component ---
function TechRing({ delay }: { delay: number }) {
    const techs = [
        { Icon: SiReact, color: "text-[#61DAFB]", bg: "bg-[#61DAFB]/10", border: "border-[#61DAFB]/20" },
        { Icon: SiNextdotjs, color: "text-neutral-900 dark:text-white", bg: "bg-black/5 dark:bg-white/10", border: "border-black/10 dark:border-white/20" },
        { Icon: SiTypescript, color: "text-[#3178C6]", bg: "bg-[#3178C6]/10", border: "border-[#3178C6]/20" },
        { Icon: SiTailwindcss, color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10", border: "border-[#06B6D4]/20" },
        { Icon: SiNodedotjs, color: "text-[#339933]", bg: "bg-[#339933]/10", border: "border-[#339933]/20" },
        { Icon: SiPostgresql, color: "text-[#4169E1]", bg: "bg-[#4169E1]/10", border: "border-[#4169E1]/20" },
    ];

    return (
        <div className="relative flex items-center justify-center w-full h-full min-h-[240px] perspective-1000 mt-4 md:mt-0">
            {/* Center Node */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay, bounce: 0.5 }}
                className="absolute z-20 w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
            >
                <FiCode size={32} className="text-white" />
            </motion.div>

            {/* Orbiting Techs */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[220px] h-[220px] md:w-[260px] md:h-[260px] border border-dashed border-violet-500/20 dark:border-white/10 rounded-full"
            >
                {techs.map((tech, i) => {
                    const angle = (i * 360) / techs.length;
                    return (
                        <div
                            key={i}
                            className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `calc(50% + 100% / 2 * ${Math.cos((angle * Math.PI) / 180)})`,
                                top: `calc(50% + 100% / 2 * ${Math.sin((angle * Math.PI) / 180)})`,
                                width: '48px',
                                height: '48px',
                            }}
                        >
                            <motion.div
                                animate={{ rotate: -360 }} // Counter rotate to keep icons upright
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className={`w-12 h-12 rounded-2xl ${tech.bg} ${tech.border} border flex items-center justify-center backdrop-blur-md shadow-sm`}
                            >
                                <tech.Icon size={24} className={tech.color} />
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function About() {
    return (
        <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-neutral-50/50 dark:bg-[#050505]">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] bg-violet-500/10 dark:bg-violet-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-fuchsia-500/10 dark:bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none animate-blob" />

            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    label="Discover"
                    title="About Me"
                    decorativeLines
                    className="mb-16 md:mb-20"
                />

                {/* ── ADVANCED BENTO GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-[minmax(220px,auto)]">

                    {/* 1. Main Profile Intro */}
                    <div className="md:col-span-6 lg:col-span-8 lg:row-span-2 h-full">
                        <SpotlightCard delay={0.1} className="p-8 md:p-12 flex flex-col justify-between overflow-hidden group/main">
                            <div className="space-y-8 relative z-10">

                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-[1.15] flex flex-wrap gap-x-3">
                                        <AnimatedText text="Crafting Digital" className="inline-flex" />
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.4 }}
                                            className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-400 inline-block animate-gradient-x"
                                        >
                                            Experiences
                                        </motion.span>
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm font-medium text-violet-600 dark:text-violet-400 tracking-wider uppercase">
                                        <span className="w-8 h-[2px] bg-violet-600/50 dark:bg-violet-400/50 rounded-full" />
                                        Full Stack Developer
                                    </div>
                                </div>

                                <div className="space-y-5 text-base md:text-lg text-foreground/75 leading-relaxed font-light max-w-2xl relative z-10">
                                    <p className="drop-shadow-sm">
                                        I am obsessed with building high-performance, type-safe web and mobile
                                        applications that feel incredibly fluid and native. Every pixel and line of code is
                                        crafted with pure intention.
                                    </p>
                                    <p className="drop-shadow-sm">
                                        Bridging powerful, scalable backend orchestration with immersive frontend realism
                                        is where I thrive. My ultimate mission is to build digital products that defy expectations.
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Tech Grid */}
                            <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none transform rotate-12 scale-150 transition-transform duration-1000 group-hover/main:rotate-45">
                                <div className="w-full h-full bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                            </div>
                        </SpotlightCard>
                    </div>

                    {/* 2. Stunning Photo Card - Redesigned */}
                    <div className="md:col-span-6 lg:col-span-4 lg:row-span-2 relative h-full">
                        <SpotlightCard delay={0.2} className="relative w-full aspect-[4/5] max-h-[500px] md:max-h-none md:min-h-[400px] lg:h-full lg:aspect-auto p-0 flex flex-col overflow-hidden group/photo">
                            {/* Elegant Frame Outline */}
                            <div className="absolute inset-2 border border-neutral-200/40 dark:border-white/10 rounded-[2rem] z-20 pointer-events-none transition-colors duration-500 group-hover/photo:border-violet-500/30" />

                            <div className="absolute inset-2 overflow-hidden rounded-[2rem] z-10 bg-neutral-100 dark:bg-[#111113]">
                                <Image
                                    src="/profile.jpg"
                                    alt="Mike Cedrick"
                                    fill
                                    className="object-cover object-top transition-all duration-700 ease-[0.2,0.65,0.3,0.9] group-hover/photo:scale-[1.05] group-hover/photo:grayscale-0 grayscale-[20%] will-change-transform"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                {/* Softer Vignette Overlay */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_120%)] pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 pointer-events-none" />
                            </div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-30 transform transition-transform duration-500 group-hover/photo:-translate-y-2"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-lg overflow-hidden group/status">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover/status:translate-x-[100%] transition-transform duration-1000" />
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                    </span>
                                    Open for Opportunities
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold font-display text-white mb-1 tracking-tight">Mike Cedrick</h3>
                                <p className="text-white/70 font-medium text-sm flex items-center gap-1.5">
                                    <FiMapPin className="text-violet-400" />
                                    La Union, PH
                                </p>
                            </motion.div>
                        </SpotlightCard>
                    </div>

                    {/* 3. Tech Ecosystem - Redesigned */}
                    <div className="md:col-span-6 lg:col-span-8 lg:row-span-2 relative h-full">
                        <SpotlightCard delay={0.3} className="p-8 lg:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden group/tech">
                            {/* Dynamic Background Mesh */}
                            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/80 pointer-events-none" />

                            <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-between relative gap-8 lg:gap-12 z-10">
                                {/* Text Content */}
                                <div className="lg:w-1/3 text-left lg:border-r border-neutral-200/50 dark:border-white/10 lg:pr-10">
                                    <h4 className="font-bold text-foreground font-display text-2xl lg:text-3xl mb-3 tracking-tight">Tech Mastery</h4>
                                    <p className="text-foreground/60 leading-relaxed font-medium mb-6">
                                        Architecting modern digital solutions using a curated stack of cutting-edge technologies.
                                    </p>
                                    <div className="inline-flex items-center justify-center p-[2px] rounded-full bg-gradient-to-r from-violet-500 to-indigo-500">
                                        <div className="px-5 py-2 rounded-full bg-white dark:bg-[#0a0a0c] text-sm font-semibold tracking-wide flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                            Full Stack Ready
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Ring Visuals */}
                                <div className="lg:w-2/3 w-full flex justify-center items-center h-[280px] lg:h-[340px] relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
                                    <TechRing delay={0.5} />
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>

                    {/* 4. Contact / Socials */}
                    <div className="md:col-span-3 lg:col-span-4 h-full">
                        <SpotlightCard delay={0.4} className="p-8 flex flex-col justify-center items-start text-left h-full group/social">
                            <div className="flex items-center justify-between w-full mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-inner border border-blue-500/20">
                                    <FiGlobe size={24} />
                                </div>
                                <a href="mailto:mikecedrickdanocup@gmail.com" className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group-hover/social:translate-x-1 duration-300">
                                    Drop a message <FiMail className="transition-transform group-hover/social:translate-x-1" />
                                </a>
                            </div>

                            <h4 className="font-bold text-foreground font-display mb-2 text-2xl tracking-tight">Let&apos;s Connect</h4>
                            <p className="text-foreground/60 text-sm mb-6 w-3/4">Reach out to collaborate or just say hi.</p>

                            <div className="flex gap-4 w-full">
                                {[
                                    { icon: FiGithub, href: "https://github.com/mcdanocup", label: "GitHub" },
                                    { icon: FiLinkedin, href: "https://linkedin.com/in/mcdanocup", label: "LinkedIn" },
                                ].map((Social, idx) => (
                                    <a
                                        key={idx}
                                        href={Social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 py-3 px-4 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground/80 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors shadow-sm flex items-center justify-center gap-2 font-medium"
                                    >
                                        <Social.icon size={20} /> <span className="hidden sm:inline-block">{Social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </SpotlightCard>
                    </div>

                    {/* 5. Education / Degree */}
                    <div className="md:col-span-3 lg:col-span-4 h-full">
                        <SpotlightCard delay={0.5} className="p-8 flex flex-col justify-center text-left relative overflow-hidden h-full group/edu">
                            <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-48 h-48 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.15)_0%,transparent_70%)] rounded-full transition-transform duration-1000 group-hover/edu:scale-150" />

                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-pink-500/25">
                                <FiAward size={24} />
                            </div>

                            <div className="relative z-10">
                                <h4 className="font-bold text-foreground text-xl font-display tracking-tight leading-tight">BS in Information Technology</h4>
                                <p className="text-sm font-medium text-foreground/60 mt-1">Don Mariano Marcos Memorial State University</p>
                            </div>

                            {/* Decorative Grid */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 dark:opacity-[0.03] bg-[radial-gradient(#d946ef_1px,transparent_1px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_100%_100%_at_100%_100%,#000_10%,transparent_100%)]" />
                        </SpotlightCard>
                    </div>

                </div>
            </div>
        </section>
    );
}
