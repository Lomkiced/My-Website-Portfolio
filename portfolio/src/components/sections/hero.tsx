"use client";

import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiMail } from "react-icons/fi";
import { useThemeStore } from "@/lib/store";

const TechMatrix = lazy(() => import("@/components/backgrounds/tech-matrix"));

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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const activeSectionColor = useThemeStore((s) => s.activeSectionColor);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

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
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
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

            {/* ── Mouse follow glow ────────────────────────────────────────────── */}
            <div
                className="absolute pointer-events-none z-0 transition-opacity duration-300"
                style={{
                    left: mousePosition.x - 200,
                    top: mousePosition.y - 200,
                    width: 400,
                    height: 400,
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
                    borderRadius: "50%",
                }}
            />

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
                    {/* Greeting badge */}
                    <motion.div variants={itemVariants} className="inline-block">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-600 dark:text-violet-400 text-sm font-medium backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Available for opportunities
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight"
                    >
                        <span className="block text-foreground">Mike Cedrick</span>
                        <span className="block text-gradient mt-2">Dañocup</span>
                    </motion.h1>

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
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
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
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                <motion.div
                    className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                </motion.div>
            </motion.div>
        </section>
    );
}
