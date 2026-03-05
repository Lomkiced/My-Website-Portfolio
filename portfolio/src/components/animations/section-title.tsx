"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";

// ─── Character-level stagger animation ───────────────────────────────────────

const charVariants: Variants = {
    hidden: {
        opacity: 0,
        y: "40%",
        rotateX: 45,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        y: "0%",
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 120,
        },
    },
};

const wordContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.035,
        },
    },
};

// ─── Section Title Component ─────────────────────────────────────────────────

interface SectionTitleProps {
    /** Small uppercase label above the title */
    label?: string;
    /** Main heading text */
    title: string;
    /** Optional subtitle/description below */
    subtitle?: string;
    /** Additional className for the container */
    className?: string;
    /** Whether to center-align (default: true) */
    center?: boolean;
    /** Whether to show decorative lines beside the label */
    decorativeLines?: boolean;
    /** Whether to show the gradient underline under the title */
    gradientUnderline?: boolean;
    /** Label badge style — 'simple' is text-only, 'badge' wraps in a pill */
    labelStyle?: "simple" | "badge";
}

export default function SectionTitle({
    label,
    title,
    subtitle,
    className = "",
    center = true,
    decorativeLines = false,
    gradientUnderline = true,
    labelStyle = "simple",
}: SectionTitleProps) {
    const shouldReduceMotion = useReducedMotion();

    // Split title into words, then each word into characters
    const words = title.split(" ");

    return (
        <div
            className={`${center ? "text-center" : ""} ${className}`}
        >
            {/* ── Label ─────────────────────────────────────────── */}
            {label && (
                <motion.div
                    className={`mb-4 ${center ? "flex items-center justify-center" : "flex items-center"}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {decorativeLines && (
                        <motion.span
                            className="w-8 h-px bg-violet-500/50 mr-3"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: false, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ transformOrigin: "right" }}
                        />
                    )}

                    {labelStyle === "badge" ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                                {label}
                            </span>
                        </span>
                    ) : (
                        <span className="text-sm font-semibold text-violet-500 dark:text-violet-400 uppercase tracking-widest">
                            {label}
                        </span>
                    )}

                    {decorativeLines && (
                        <motion.span
                            className="w-8 h-px bg-violet-500/50 ml-3"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: false, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ transformOrigin: "left" }}
                        />
                    )}
                </motion.div>
            )}

            {/* ── Heading with character stagger ────────────────── */}
            <motion.h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold font-display mt-3 relative inline-block [perspective:800px]"
                variants={wordContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
            >
                {words.map((word, wordIndex) => (
                    <span key={wordIndex} className="inline-block mr-[0.25em] last:mr-0">
                        {word.split("").map((char, charIndex) => (
                            <motion.span
                                key={`${wordIndex}-${charIndex}`}
                                className="inline-block"
                                variants={shouldReduceMotion ? undefined : charVariants}
                                style={{ transformOrigin: "bottom center" }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                ))}

                {/* Gradient underline */}
                {gradientUnderline && (
                    <motion.span
                        className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, margin: "-80px" }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ transformOrigin: "left" }}
                    />
                )}
            </motion.h2>

            {/* ── Subtitle ──────────────────────────────────────── */}
            {subtitle && (
                <motion.p
                    className={`text-muted-foreground mt-6 text-lg max-w-xl leading-relaxed ${center ? "mx-auto" : ""}`}
                    initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
