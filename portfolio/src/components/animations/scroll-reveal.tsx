"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

// ─── Preset Animation Variants ───────────────────────────────────────────────

const presets = {
    fadeUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
    },
    blurIn: {
        hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
        visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
    clipReveal: {
        hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        visible: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
    },
    slideScale: {
        hidden: { opacity: 0, y: 60, scale: 0.95, rotateX: 8 },
        visible: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    },
} satisfies Record<string, { hidden: object; visible: object }>;

// ─── ScrollReveal Component ──────────────────────────────────────────────────

interface ScrollRevealProps {
    children: ReactNode;
    /** Animation preset key */
    variant?: keyof typeof presets;
    /** Extra delay in seconds */
    delay?: number;
    /** Animation duration in seconds */
    duration?: number;
    /** CSS class */
    className?: string;
    /** Viewport margin for early/late triggering */
    viewportMargin?: string;
    /** Custom variants override */
    variants?: Variants;
    /** Stagger children if this is a container */
    stagger?: number;
    /** HTML tag to render */
    as?: "div" | "section" | "article" | "footer" | "header" | "main" | "aside";
}

export function ScrollReveal({
    children,
    variant = "fadeUp",
    delay = 0,
    duration = 0.7,
    className = "",
    viewportMargin = "-80px",
    variants: customVariants,
    stagger,
    as = "div",
}: ScrollRevealProps) {
    const shouldReduceMotion = useReducedMotion();

    const preset = presets[variant] || presets.fadeUp;

    const finalVariants: Variants = customVariants ?? {
        hidden: preset.hidden,
        visible: {
            ...preset.visible,
            transition: {
                duration: shouldReduceMotion ? 0.01 : duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
                ...(stagger ? { staggerChildren: stagger } : {}),
            },
        },
    } as Variants;

    const MotionComponent = motion[as] as typeof motion.div;

    return (
        <MotionComponent
            className={className}
            variants={finalVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: viewportMargin }}
        >
            {children}
        </MotionComponent>
    );
}

// ─── ScrollRevealItem — for use inside staggered ScrollReveal containers ─────

interface ScrollRevealItemProps {
    children: ReactNode;
    className?: string;
    variant?: keyof typeof presets;
    duration?: number;
}

export function ScrollRevealItem({
    children,
    className = "",
    variant = "fadeUp",
    duration = 0.6,
}: ScrollRevealItemProps) {
    const preset = presets[variant] || presets.fadeUp;

    const itemVariants: Variants = {
        hidden: preset.hidden,
        visible: {
            ...preset.visible,
            transition: {
                duration,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.div className={className} variants={itemVariants}>
            {children}
        </motion.div>
    );
}

export { presets as scrollRevealPresets };
