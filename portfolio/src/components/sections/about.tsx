"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import { FiAward, FiCode, FiLayers, FiMapPin, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiReact } from "react-icons/si";
import SectionTitle from "@/components/animations/section-title";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

// ─── Bento Box Card Wrapper ──────────────────────────────────────────────────
// Uses pure CSS for hover states instead of heavy JS tracking
function BentoCard({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
    return (
        <ScrollReveal variant="slideScale" delay={delay} className="h-full">
            <div
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${className}`}
            >
                {/* Premium Glassmorphism Shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />
                <div className="relative z-10 h-full">{children}</div>
            </div>
        </ScrollReveal>
    );
}

// ─── Staggered Text Reveal ──────────────────────────────────────────────────
const revealVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const } },
};

const textContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
};

function StaggeredText({ text, className }: { text: string; className?: string }) {
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
                    <motion.span className="inline-block" variants={revealVariants}>
                        {word}
                    </motion.span>
                </div>
            ))}
        </motion.div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function About() {
    return (
        <section id="about" className="py-20 md:py-32 relative overflow-hidden">
            {/* Ambient Base Backgrounds */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    label="About Me"
                    title="Get to Know Me"
                    decorativeLines
                    className="mb-12 md:mb-16"
                />

                {/* ── BENTO GRID LAYOUT ── */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* 1. Main Profile Intro (Spans full width on mobile, 7 cols on large desktop) */}
                    <div className="md:col-span-4 lg:col-span-7 lg:row-span-2 h-full">
                        <BentoCard delay={0.1} className="p-8 md:p-10 flex flex-col justify-between overflow-visible">
                            <div className="space-y-6 relative z-10">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display leading-tight flex flex-wrap gap-x-2">
                                    <StaggeredText text="A Passionate" className="inline-flex" />
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                                        className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 inline-block overflow-visible"
                                    >
                                        Full Stack Developer
                                    </motion.span>
                                </h3>

                                <div className="space-y-4 text-base md:text-lg text-foreground/75 leading-relaxed font-light max-w-2xl">
                                    <p>
                                        As a Full Stack Developer and BSIT graduate, I am obsessed
                                        with building high-performance, type-safe web and mobile
                                        applications that feel incredibly fluid and native.
                                    </p>
                                    <p>
                                        I specialize in bridging powerful, scalable backend systems with
                                        pixel-perfect, hardware-accelerated frontend designs. My ultimate
                                        goal is to build digital products that leave a lasting impression.
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Tech Mesh Background inside the card */}
                            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)] rounded-full blur-2xl pointer-events-none group-hover:bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)] transition-colors duration-700" />
                        </BentoCard>
                    </div>

                    {/* 2. Photo Card (Spans 5 cols) */}
                    <div className="md:col-span-4 lg:col-span-5 lg:row-span-2 h-full">
                        <BentoCard delay={0.2} className="relative h-[400px] lg:h-full w-full p-0">
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src="/profile.jpg"
                                    alt="Mike Cedrick"
                                    fill
                                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Elegant Inner Shadow & Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 ease-out opacity-80 group-hover:opacity-60" />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2rem]" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                <h3 className="text-2xl font-bold font-display text-white drop-shadow-md">Mike Cedrick</h3>
                                <p className="text-white/80 font-medium tracking-wide mt-1 flex items-center gap-2">
                                    <FiMapPin className="text-violet-400" />
                                    La Union, Philippines
                                </p>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 3. Tech Stack / Skills (Spans 4 cols) */}
                    <div className="md:col-span-2 lg:col-span-4">
                        <BentoCard delay={0.3} className="p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-violet-500/5 to-indigo-500/5">
                            <h4 className="font-semibold text-foreground/90 font-display mb-6">Core Stack</h4>
                            <div className="flex flex-wrap justify-center gap-4 text-foreground/60 w-full">
                                <SiNextdotjs size={32} className="hover:text-foreground transition-colors" />
                                <SiReact size={32} className="hover:text-[#61DAFB] transition-colors" />
                                <SiTypescript size={32} className="hover:text-[#3178C6] transition-colors" />
                                <SiTailwindcss size={32} className="hover:text-[#06B6D4] transition-colors" />
                                <SiNodedotjs size={32} className="hover:text-[#339933] transition-colors" />
                            </div>
                        </BentoCard>
                    </div>

                    {/* 4. Contact / Socials (Spans 4 cols) */}
                    <div className="md:col-span-2 lg:col-span-4">
                        <BentoCard delay={0.4} className="p-8 flex flex-col justify-center items-center text-center">
                            <h4 className="font-semibold text-foreground/90 font-display mb-6">Let's Connect</h4>
                            <div className="flex justify-center gap-6">
                                <a href="https://github.com/mcdanocup" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-foreground/5 hover:bg-violet-500/20 hover:text-violet-500 transition-colors">
                                    <FiGithub size={24} />
                                </a>
                                <a href="https://linkedin.com/in/mcdanocup" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-foreground/5 hover:bg-blue-500/20 hover:text-blue-500 transition-colors">
                                    <FiLinkedin size={24} />
                                </a>
                                <a href="mailto:mikecedrickdanocup@gmail.com" className="p-3 rounded-full bg-foreground/5 hover:bg-pink-500/20 hover:text-pink-500 transition-colors">
                                    <FiMail size={24} />
                                </a>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 5. Education / Degree (Spans 4 cols) */}
                    <div className="md:col-span-4 lg:col-span-4">
                        <BentoCard delay={0.5} className="p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 to-transparent opacity-50" />
                            <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/20 text-fuchsia-500 flex items-center justify-center mb-4 relative z-10">
                                <FiAward size={28} />
                            </div>
                            <h4 className="font-bold text-foreground text-lg relative z-10">BS Information Technology</h4>
                            <p className="text-sm text-foreground/60 mt-2 relative z-10">Strong academic foundation</p>
                        </BentoCard>
                    </div>

                </div>
            </div>
        </section>
    );
}
