"use client";

import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiArrowDown, FiMail } from "react-icons/fi";
import { Music, MousePointerClick } from "lucide-react";
import { useThemeStore } from "@/lib/store";

import dynamic from "next/dynamic";

const TechMatrix = dynamic(() => import("@/components/backgrounds/tech-matrix"), {
    ssr: false,
});

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

// ─── Color mapping for scrollytelling ─────────────────────────────────────────

const gradientMap: Record<string, { from: string; to: string }> = {
    "from-violet-600 to-indigo-600": {
        from: "rgba(124, 58, 237, 0.12)",
        to: "rgba(79, 70, 229, 0.12)",
    },
    "from-purple-600 to-pink-600": {
        from: "rgba(147, 51, 234, 0.12)",
        to: "rgba(219, 39, 119, 0.12)",
    },
    "from-indigo-600 to-cyan-600": {
        from: "rgba(79, 70, 229, 0.12)",
        to: "rgba(8, 145, 178, 0.12)",
    },
};

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const activeSectionColor = useThemeStore((s) => s.activeSectionColor);
    const autoplayStatus = useThemeStore((s) => s.autoplayStatus);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const handleNavClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    // Derive scroll-reactive gradient overlay colors
    const mapped = gradientMap[activeSectionColor];
    const overlayFrom = mapped?.from ?? "transparent";
    const overlayTo = mapped?.to ?? "transparent";

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-32"
        >
            {/* ── Animated gradient background ─────────────────────────────────── */}
            <motion.div className="absolute inset-0 -z-10" style={{ y }}>
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-background to-indigo-950/20 dark:from-violet-950/40 dark:via-background dark:to-indigo-950/40" />

                {/* Scrollytelling overlay — smoothly morphs as project cards come into view */}
                <motion.div
                    className="absolute inset-0 transition-all duration-1000 ease-in-out"
                    style={{
                        background: `linear-gradient(135deg, ${overlayFrom} 0%, transparent 50%, ${overlayTo} 100%)`,
                    }}
                />

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Noise overlay */}
                <div className="noise-overlay absolute inset-0" />
            </motion.div>

            {/* ── Advanced Tech Matrix Background ──────────────────────────────── */}
            <Suspense fallback={null}>
                <TechMatrix />
            </Suspense>



            {/* ── Content ──────────────────────────────────────────────────────── */}
            <motion.div
                className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                style={{ opacity }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6 md:space-y-8"
                >
                    {/* Greeting badge with Autoplay Toast */}
                    <div className="relative inline-flex flex-col items-center">
                        <AnimatePresence>
                            {autoplayStatus && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="absolute bottom-full mb-8 z-50 pointer-events-none w-max max-w-[90vw]"
                                >
                                    {autoplayStatus === "blocked" ? (
                                        <div className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-black/70 dark:bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-50" />
                                            <div className="absolute inset-px rounded-2xl border border-white/5" />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="relative z-10 text-violet-300 flex-shrink-0"
                                            >
                                                <MousePointerClick size={20} />
                                            </motion.div>
                                            <span className="text-sm font-medium relative z-10 tracking-wide text-center">
                                                Click anywhere to play music
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-neutral-800 dark:text-white relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-50" />
                                            <motion.div
                                                initial={{ rotate: -45, scale: 0 }}
                                                animate={{ rotate: 0, scale: 1 }}
                                                transition={{ type: "spring", delay: 0.2 }}
                                                className="relative z-10 text-emerald-600 dark:text-emerald-400 flex-shrink-0"
                                            >
                                                <Music size={20} />
                                            </motion.div>
                                            <span className="text-sm font-medium relative z-10 tracking-wide text-center">
                                                Music playing. Mute anytime.
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div variants={itemVariants} className="inline-block">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-600 dark:text-violet-400 text-sm font-medium backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Available for opportunities
                            </span>
                        </motion.div>
                    </div>

                    {/* Name - CSS Text Fill Animation Style */}
                    <div className="flex flex-col items-center select-none pt-4">
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-display tracking-tight flex flex-col items-center"
                        >

                            {/* Upper Name */}
                            <div className="flex justify-center mb-2">
                                <span
                                    className="text-fill-hero text-foreground"
                                    data-text="Mike Cedrick"
                                >
                                    Mike Cedrick
                                </span>
                            </div>

                            {/* Lower Name - Gradient Applied to Bouncing Text Container */}
                            <div className="relative mt-2 flex justify-center pb-2 px-10">
                                {/* Exquisite Ambient Aura — CSS animated */}
                                <div
                                    className="absolute -inset-x-8 inset-y-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 blur-3xl z-0 animate-aura-pulse"
                                />

                                <div className="relative z-10 block drop-shadow-sm flex">
                                    <span
                                        className="text-fill-hero text-fill-purple"
                                        data-text="Dañocup"
                                    >
                                        Dañocup
                                    </span>
                                </div>
                            </div>
                        </motion.h1>
                    </div>

                    {/* Title */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium"
                    >
                        Full Stack Developer{" "}
                        <span className="text-violet-500 dark:text-violet-400">|</span>{" "}
                        BS Information Technology
                    </motion.p>

                    {/* Bio */}
                    <motion.p
                        variants={itemVariants}
                        className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground/80 leading-relaxed"
                    >
                        Building high-performance, type-safe web and mobile applications
                        with modern architectures. Bridging complex backend systems with
                        intuitive frontend design.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 mb-16"
                    >
                        <motion.button
                            onClick={() => handleNavClick("#projects")}
                            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 transition-all"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View My Work
                            <FiArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        </motion.button>

                        <motion.button
                            onClick={() => handleNavClick("#contact")}
                            className="group flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-border hover:border-violet-500/50 text-foreground font-semibold hover:bg-accent/50 transition-all"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiMail className="w-4 h-4" />
                            Contact Me
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* ── Scroll indicator ─────────────────────────────────────────────── */}
            <motion.div
                className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                <motion.div
                    className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5 backdrop-blur-sm bg-background/30"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                </motion.div>
            </motion.div>
        </section>
    );
}
