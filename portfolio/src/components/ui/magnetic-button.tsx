"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, ReactNode, MouseEvent } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    href?: string;
    target?: string;
    rel?: string;
    /** The strength of the magnetic pull (default: 0.15) */
    strength?: number;
}

export function MagneticButton({
    children,
    className = "",
    onClick,
    href,
    target,
    rel,
    strength = 0.15,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const shouldReduceMotion = useReducedMotion();

    const handleMouse = (e: MouseEvent) => {
        if (shouldReduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const motionProps = {
        ref,
        onMouseMove: handleMouse,
        onMouseLeave: reset,
        animate: { x: position.x, y: position.y },
        transition: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 },
        className,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick: onClick as any, // Cast to any to handle both button/anchor events
    };

    if (href) {
        return (
            <motion.a href={href} target={target} rel={rel} {...motionProps}>
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button {...motionProps}>
            {children}
        </motion.button>
    );
}
