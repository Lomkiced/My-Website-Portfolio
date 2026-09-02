"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
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
                                <span className="text-pink-600 dark:text-pink-500">Digital</span> Experiences.
                            </h1>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-lg lg:text-xl text-muted-foreground font-semibold uppercase tracking-[0.2em] mt-4"
                        >
                            Full Stack Developer <span className="text-pink-500 mx-3">|</span> IT Graduate
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
