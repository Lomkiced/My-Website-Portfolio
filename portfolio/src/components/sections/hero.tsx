"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiArrowDown, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { Music, MousePointerClick } from "lucide-react";
import { useThemeStore } from "@/lib/store";
import { ParticleNetwork } from "@/components/animations/particle-network";
import { MagneticButton } from "@/components/ui/magnetic-button";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};



// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const autoplayStatus = useThemeStore((s) => s.autoplayStatus);

    const handleNavClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* ── Hardware-Accelerated Canvas Background ─────────────────────────────────── */}
            <ParticleNetwork />

            {/* ── Content ──────────────────────────────────────────────────────── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center h-screen pointer-events-none">

                {/* Autoplay Toast Overlay (Fixed Position) */}
                <div className="pointer-events-auto absolute top-4 left-1/2 -translate-x-1/2 z-50">
                    <AnimatePresence>
                        {autoplayStatus && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(4px)" }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                {autoplayStatus === "blocked" ? (
                                    <div className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-full bg-black/70 dark:bg-black/50 backdrop-blur-xl border border-white/10 shadow-lg text-white">
                                        <MousePointerClick size={16} className="text-violet-300" />
                                        <span className="text-xs font-medium tracking-wide">Click anywhere to play music</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 shadow-lg text-neutral-800 dark:text-white">
                                        <Music size={16} className="text-emerald-500" />
                                        <span className="text-xs font-medium tracking-wide">Music playing</span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Center Content: Ultra-Clean Typography & Actions */}
                <div className="flex flex-col items-center justify-center text-center pointer-events-auto w-full">


                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6 sm:space-y-8 w-full max-w-5xl mx-auto"
                    >


                        {/* ── Giant Typography Statement ── */}
                        <motion.div variants={itemVariants} className="w-full">
                            <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] uppercase text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground/90 to-muted-foreground/50 drop-shadow-sm">
                                Engineering <br className="hidden sm:block" />
                                <span className="text-violet-600 dark:text-violet-500">Digital</span> Experiences.
                            </h1>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-lg lg:text-xl text-muted-foreground font-semibold uppercase tracking-[0.2em] mt-4"
                        >
                            Full Stack Developer <span className="text-violet-500 mx-3">|</span> IT Graduate
                        </motion.p>

                        {/* Ultra-Clean CTA Row */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
                        >
                            <MagneticButton
                                onClick={() => handleNavClick("#projects")}
                                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                            >
                                View My Work
                                <FiArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </MagneticButton>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
