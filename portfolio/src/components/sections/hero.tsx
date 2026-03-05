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

                    {/* Name — SVG Path-Drawing Animation */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center select-none pt-4">

                        {/* Shared SVG Gradient Definitions */}
                        <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
                            <defs>
                                {/* Dark-mode: white → light slate | Light-mode: overridden by CSS */}
                                <linearGradient gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0" id="hero-grad-name">
                                    <stop stopColor="var(--hero-name-stop1, #FFFFFF)" />
                                    <stop stopColor="var(--hero-name-stop2, #CBD5E1)" offset="1" />
                                </linearGradient>
                                {/* Purple gradient with rotating transform */}
                                <linearGradient gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0" id="hero-grad-purple">
                                    <stop stopColor="#A855F7" />
                                    <stop stopColor="#7C3AED" offset="1" />
                                    <animateTransform
                                        repeatCount="indefinite"
                                        keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
                                        keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
                                        dur="8s"
                                        values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
                                        type="rotate"
                                        attributeName="gradientTransform"
                                    />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* ── "MIKE" row — theme-aware stroke ── */}
                        <div className="flex items-center justify-center">
                            {/* M */}
                            <svg viewBox="0 0 76 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 6,58 L 6,6 L 38,38 L 70,6 L 70,58" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" />
                            </svg>
                            {/* I */}
                            <svg viewBox="0 0 24 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 12,6 L 12,58" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.12s, 0.12s' }} />
                            </svg>
                            {/* K */}
                            <svg viewBox="0 0 58 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 10,6 L 10,58" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.24s, 0.24s' }} />
                                <path d="M 52,6 L 10,34 L 52,58" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.30s, 0.30s' }} />
                            </svg>
                            {/* E */}
                            <svg viewBox="0 0 50 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 44,6 L 8,6 L 8,58 L 44,58" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.36s, 0.36s' }} />
                                <path d="M 8,32 L 36,32" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.42s, 0.42s' }} />
                            </svg>
                        </div>

                        {/* ── "CEDRICK" row — purple stroke ── */}
                        <div className="flex items-center justify-center mt-1 sm:mt-2">
                            {/* C */}
                            <svg viewBox="0 0 52 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 48,6 L 8,6 L 8,58 L 48,58" stroke="url(#hero-grad-purple)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.50s, 0.50s' }} />
                            </svg>
                            {/* E */}
                            <svg viewBox="0 0 50 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 44,6 L 8,6 L 8,58 L 44,58" stroke="url(#hero-grad-purple)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.62s, 0.62s' }} />
                                <path d="M 8,32 L 36,32" stroke="url(#hero-grad-purple)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.68s, 0.68s' }} />
                            </svg>
                            {/* D */}
                            <svg viewBox="0 0 56 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 8,6 L 8,58 L 34,58 C 52,58 52,6 34,6 Z" stroke="url(#hero-grad-purple)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.74s, 0.74s' }} />
                            </svg>
                            {/* R */}
                            <svg viewBox="0 0 56 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 8,58 L 8,6 L 36,6 C 50,6 50,30 36,30 L 8,30 L 48,58" stroke="url(#hero-grad-purple)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.86s, 0.86s' }} />
                            </svg>
                            {/* I */}
                            <svg viewBox="0 0 24 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 12,6 L 12,58" stroke="url(#hero-grad-purple)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '0.98s, 0.98s' }} />
                            </svg>
                            {/* C */}
                            <svg viewBox="0 0 52 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 48,6 L 8,6 L 8,58 L 48,58" stroke="url(#hero-grad-purple)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '1.10s, 1.10s' }} />
                            </svg>
                            {/* K */}
                            <svg viewBox="0 0 58 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                <path d="M 10,6 L 10,58" stroke="url(#hero-grad-purple)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '1.22s, 1.22s' }} />
                                <path d="M 52,6 L 10,34 L 52,58" stroke="url(#hero-grad-purple)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '1.28s, 1.28s' }} />
                            </svg>
                        </div>

                        {/* ── "Dañocup" — SVG path-drawing, white/dark theme-aware ── */}
                        <div className="relative mt-1 sm:mt-2 flex justify-center pb-2 px-10">
                            {/* Ambient aura */}
                            <div
                                className="absolute -inset-x-8 inset-y-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 blur-3xl z-0 animate-aura-pulse"
                            />
                            <div className="relative z-10 flex items-center justify-center">
                                {/* D */}
                                <svg viewBox="0 0 56 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                    <path d="M 8,6 L 8,58 L 34,58 C 52,58 52,6 34,6 Z" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '1.40s, 1.40s' }} />
                                </svg>
                                {/* A */}
                                <svg viewBox="0 0 64 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                    <path d="M 6,58 L 32,6 L 58,58" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '1.52s, 1.52s' }} />
                                    <path d="M 18,38 L 46,38" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '1.58s, 1.58s' }} />
                                </svg>
                                {/* Ñ — tilde rendered above via overflow:visible */}
                                <svg viewBox="0 0 64 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                    <path d="M 8,58 L 8,6 L 56,58 L 56,6" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '1.64s, 1.64s' }} />
                                    <path d="M 20,-2 Q 27,-9 32,-2 Q 37,5 44,-2" stroke="url(#hero-grad-name)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '1.70s, 1.70s' }} />
                                </svg>
                                {/* O */}
                                <svg viewBox="0 0 64 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                    <path d="M 32,6 C 6,6 6,58 32,58 C 58,58 58,6 32,6 Z" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '1.76s, 1.76s' }} />
                                </svg>
                                {/* C */}
                                <svg viewBox="0 0 52 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                    <path d="M 48,6 L 8,6 L 8,58 L 48,58" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '1.88s, 1.88s' }} />
                                </svg>
                                {/* U */}
                                <svg viewBox="0 0 64 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                    <path d="M 8,6 V 42 Q 8,58 32,58 Q 56,58 56,42 V 6" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '2.00s, 2.00s' }} />
                                </svg>
                                {/* P */}
                                <svg viewBox="0 0 52 64" fill="none" overflow="visible" className="h-[48px] sm:h-[64px] md:h-[88px] lg:h-[110px] w-auto">
                                    <path d="M 8,58 L 8,6 L 36,6 C 50,6 50,30 36,30 L 8,30" stroke="url(#hero-grad-name)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={360} className="hero-letter-dash" style={{ animationDelay: '2.12s, 2.12s' }} />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

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
