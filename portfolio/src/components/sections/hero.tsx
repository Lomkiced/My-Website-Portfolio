"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiArrowDown, FiMail } from "react-icons/fi";
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

// ─── Scramble Text Configuration ──────────────────────────────────────────────

interface LineConfig {
    text: string;
    resolvedClass: string;
    /** Size class override */
    sizeClass?: string;
    /** Delay in ms before this line starts resolving */
    startDelay: number;
}

const LINES: LineConfig[] = [
    {
        text: "Hello, I'm",
        resolvedClass: "scramble-resolved-accent",
        sizeClass: "scramble-char-sm",
        startDelay: 0,
    },
    {
        text: "Mike Cedrick",
        resolvedClass: "scramble-resolved",
        startDelay: 200,
    },
    {
        text: "Dañocup",
        resolvedClass: "scramble-resolved-purple",
        startDelay: 500,
    },
];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>{}[]=/|~";
const SCRAMBLE_SPEED = 40;      // ms between random character ticks
const RESOLVE_INTERVAL = 55;    // ms between resolving each character
const INITIAL_SCRAMBLE = 12;    // ticks of pure scramble before resolving starts
const LOOP_PAUSE = 5000;        // ms the fully resolved text stays before re-scrambling

function randomGlyph(): string {
    return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

// ─── Single line scramble hook ────────────────────────────────────────────────

function useScrambleLine(text: string, startDelay: number, trigger: number, isAppLoaded: boolean, isVisible: boolean) {
    // Initialize with the real text so SSR and client match (no hydration mismatch)
    const [display, setDisplay] = useState<string[]>(() => text.split(""));
    const [resolvedCount, setResolvedCount] = useState(text.length);
    const [mounted, setMounted] = useState(false);
    const chars = text.split("");

    // Mark mounted so we only scramble client-side
    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted || !isAppLoaded || !isVisible) return;
        let resolved = 0;
        setResolvedCount(0);
        setDisplay(chars.map((ch) => (ch === " " ? " " : randomGlyph())));

        // Delayed start
        const delayTimer = setTimeout(() => {
            // Random ticker
            const scrambleInterval = setInterval(() => {
                setDisplay((prev) =>
                    prev.map((_, i) => {
                        if (i < resolved || chars[i] === " ") return chars[i];
                        return randomGlyph();
                    })
                );
            }, SCRAMBLE_SPEED);

            // Resolve timer — starts after initial scramble ticks
            const resolveDelay = setTimeout(() => {
                const resolveInterval = setInterval(() => {
                    resolved += 1;
                    setResolvedCount(resolved);
                    setDisplay((prev) => {
                        const next = [...prev];
                        for (let i = 0; i < resolved && i < chars.length; i++) {
                            next[i] = chars[i];
                        }
                        return next;
                    });
                    if (resolved >= chars.length) {
                        clearInterval(resolveInterval);
                        clearInterval(scrambleInterval);
                    }
                }, RESOLVE_INTERVAL);

                return () => clearInterval(resolveInterval);
            }, INITIAL_SCRAMBLE * SCRAMBLE_SPEED);

            return () => {
                clearInterval(scrambleInterval);
                clearTimeout(resolveDelay);
            };
        }, startDelay);

        return () => clearTimeout(delayTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger, mounted, isAppLoaded, isVisible]);

    return { display, resolvedCount };
}

// ─── ScrambleText — all lines visible simultaneously ──────────────────────────

function ScrambleText() {
    const [cycle, setCycle] = useState(0);
    const isAppLoaded = useThemeStore((s) => s.isAppLoaded);
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useInView(ref, { margin: "0px 0px -200px 0px" });

    // Compute total time for longest line to finish
    const longestLine = LINES.reduce((max, line) =>
        Math.max(max, line.startDelay + INITIAL_SCRAMBLE * SCRAMBLE_SPEED + line.text.length * RESOLVE_INTERVAL), 0
    );

    // Re-trigger scramble loop
    useEffect(() => {
        if (!isAppLoaded || !isVisible) return;
        const timer = setTimeout(() => {
            setCycle((prev) => prev + 1);
        }, longestLine + LOOP_PAUSE);
        return () => clearTimeout(timer);
    }, [cycle, longestLine, isAppLoaded, isVisible]);

    return (
        <div ref={ref} className="scramble-text-container">
            {/* Ambient aura - optimized with radial gradient instead of heavy blur */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-600/20 via-fuchsia-500/5 to-transparent z-0 animate-aura-pulse pointer-events-none scale-150" />

            <div className="relative z-10 flex flex-col items-center gap-0 sm:gap-1">
                {LINES.map((line, idx) => (
                    <ScrambleLine key={idx} config={line} trigger={cycle} isAppLoaded={isAppLoaded} isVisible={isVisible} />
                ))}
            </div>
        </div>
    );
}

function ScrambleLine({ config, trigger, isAppLoaded, isVisible }: { config: LineConfig; trigger: number; isAppLoaded: boolean; isVisible: boolean }) {
    const { display, resolvedCount } = useScrambleLine(config.text, config.startDelay, trigger, isAppLoaded, isVisible);

    return (
        <div className="flex items-center justify-center flex-wrap">
            {display.map((char, i) => {
                const isResolved = i < resolvedCount;
                const isSpace = char === " ";
                return (
                    <span
                        key={i}
                        className={`scramble-char ${config.sizeClass ?? ""} ${isResolved ? config.resolvedClass : "scramble-glyph"} ${isSpace ? "scramble-space" : ""}`}
                    >
                        {isSpace ? "\u00A0" : char}
                    </span>
                );
            })}
            {/* Cursor on last line only */}
            {config === LINES[LINES.length - 1] && (
                <motion.span
                    className={`scramble-cursor ${config.sizeClass ?? ""}`}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        times: [0, 0.1, 0.5, 0.6],
                    }}
                />
            )}
        </div>
    );
}

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
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-32"
        >
            {/* ── Hardware-Accelerated Canvas Background ─────────────────────────────────── */}
            <ParticleNetwork />

            {/* ── Content ──────────────────────────────────────────────────────── */}
            <div
                className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none"
            >
                <div className="pointer-events-auto">
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

                        {/* ── Scramble Text — all lines visible at once ── */}
                        <motion.div variants={itemVariants}>
                            <ScrambleText />
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
                            <MagneticButton
                                onClick={() => handleNavClick("#projects")}
                                className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 transition-all"
                            >
                                View My Work
                                <FiArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            </MagneticButton>

                            <MagneticButton
                                onClick={() => handleNavClick("#contact")}
                                className="group flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-border hover:border-violet-500/50 text-foreground font-semibold hover:bg-accent/50 transition-all"
                            >
                                <FiMail className="w-4 h-4" />
                                Contact Me
                            </MagneticButton>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

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
