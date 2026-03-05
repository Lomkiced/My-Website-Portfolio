"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   SVG Path Definitions for "MIKE CEDRICK"
   Each letter is hand-crafted as a continuous SVG <path> with pathLength="360"
   so the reference dashArray / dashOffset animations work perfectly.
   ───────────────────────────────────────────────────────────────────────────── */

interface LetterPath {
    d: string;
    type: "dash" | "spin";
}
interface LetterDef {
    viewBox: string;
    paths: LetterPath[];
}

// ── "MIKE" ──────────────────────────────────────────────────────────────────
const MIKE_LETTERS: LetterDef[] = [
    {
        // M
        viewBox: "0 0 76 64",
        paths: [
            { d: "M 6,58 L 6,6 L 38,38 L 70,6 L 70,58", type: "dash" },
        ],
    },
    {
        // I
        viewBox: "0 0 24 64",
        paths: [{ d: "M 12,6 L 12,58", type: "dash" }],
    },
    {
        // K
        viewBox: "0 0 58 64",
        paths: [
            { d: "M 10,6 L 10,58", type: "dash" },
            { d: "M 52,6 L 10,34 L 52,58", type: "dash" },
        ],
    },
    {
        // E
        viewBox: "0 0 50 64",
        paths: [
            { d: "M 44,6 L 8,6 L 8,58 L 44,58", type: "dash" },
            { d: "M 8,32 L 36,32", type: "dash" },
        ],
    },
];

// ── "CEDRICK" ───────────────────────────────────────────────────────────────
const CEDRICK_LETTERS: LetterDef[] = [
    {
        // C
        viewBox: "0 0 52 64",
        paths: [
            { d: "M 48,6 L 8,6 L 8,58 L 48,58", type: "dash" },
        ],
    },
    {
        // E
        viewBox: "0 0 50 64",
        paths: [
            { d: "M 44,6 L 8,6 L 8,58 L 44,58", type: "dash" },
            { d: "M 8,32 L 36,32", type: "dash" },
        ],
    },
    {
        // D
        viewBox: "0 0 56 64",
        paths: [
            {
                d: "M 8,6 L 8,58 L 34,58 C 52,58 52,6 34,6 Z",
                type: "dash",
            },
        ],
    },
    {
        // R
        viewBox: "0 0 56 64",
        paths: [
            {
                d: "M 8,58 L 8,6 L 36,6 C 50,6 50,30 36,30 L 8,30 L 48,58",
                type: "dash",
            },
        ],
    },
    {
        // I
        viewBox: "0 0 24 64",
        paths: [{ d: "M 12,6 L 12,58", type: "dash" }],
    },
    {
        // C
        viewBox: "0 0 52 64",
        paths: [
            { d: "M 48,6 L 8,6 L 8,58 L 48,58", type: "dash" },
        ],
    },
    {
        // K
        viewBox: "0 0 58 64",
        paths: [
            { d: "M 10,6 L 10,58", type: "dash" },
            { d: "M 52,6 L 10,34 L 52,58", type: "dash" },
        ],
    },
];

/* ─────────────────────────────────────────────────────────────────────────── */

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
        }, 3200);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, []);

    /* Renders one word row of animated SVG letters */
    const renderRow = (
        letters: LetterDef[],
        gradientId: string,
        baseDelay: number,
        keyPrefix: string
    ) => (
        <div className="flex items-center justify-center">
            {letters.map((letter, i) => (
                <svg
                    key={`${keyPrefix}-${i}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={letter.viewBox}
                    fill="none"
                    overflow="visible"
                    className="h-[40px] sm:h-[56px] md:h-[72px] w-auto"
                >
                    {letter.paths.map((path, j) => {
                        const delay = baseDelay + i * 0.12 + j * 0.06;
                        return (
                            <path
                                key={j}
                                d={path.d}
                                stroke={`url(#${gradientId})`}
                                strokeWidth="7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                pathLength={360}
                                fill="none"
                                className={
                                    path.type === "spin"
                                        ? "mc-letter-spin"
                                        : "mc-letter-dash"
                                }
                                style={{
                                    animationDelay: `${delay}s, ${delay}s`,
                                }}
                            />
                        );
                    })}
                </svg>
            ))}
        </div>
    );

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#08080d] overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: "blur(16px)",
                    }}
                    transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* ── Scoped Animation Keyframes ── */}
                    <style jsx global>{`
                        .mc-letter-dash {
                            animation: mcDashArray 2s ease-in-out infinite,
                                mcDashOffset 2s linear infinite;
                            will-change: stroke-dasharray, stroke-dashoffset;
                        }

                        .mc-letter-spin {
                            animation: mcSpinDashArray 2s ease-in-out infinite,
                                mcSpin 8s ease-in-out infinite,
                                mcDashOffset 2s linear infinite;
                            transform-origin: center;
                            will-change: stroke-dasharray, stroke-dashoffset,
                                rotate;
                        }

                        @keyframes mcDashArray {
                            0% {
                                stroke-dasharray: 0 1 359 0;
                            }
                            50% {
                                stroke-dasharray: 0 359 1 0;
                            }
                            100% {
                                stroke-dasharray: 359 1 0 0;
                            }
                        }

                        @keyframes mcSpinDashArray {
                            0% {
                                stroke-dasharray: 270 90;
                            }
                            50% {
                                stroke-dasharray: 0 360;
                            }
                            100% {
                                stroke-dasharray: 270 90;
                            }
                        }

                        @keyframes mcDashOffset {
                            0% {
                                stroke-dashoffset: 365;
                            }
                            100% {
                                stroke-dashoffset: 5;
                            }
                        }

                        @keyframes mcSpin {
                            0% {
                                rotate: 0deg;
                            }
                            12.5%,
                            25% {
                                rotate: 270deg;
                            }
                            37.5%,
                            50% {
                                rotate: 540deg;
                            }
                            62.5%,
                            75% {
                                rotate: 810deg;
                            }
                            87.5%,
                            100% {
                                rotate: 1080deg;
                            }
                        }

                        @keyframes mcPulseGlow {
                            0%,
                            100% {
                                opacity: 0.12;
                                transform: scale(0.95);
                            }
                            50% {
                                opacity: 0.35;
                                transform: scale(1.05);
                            }
                        }

                        @keyframes mcParticleFloat {
                            0%,
                            100% {
                                transform: translateY(0) translateX(0);
                                opacity: 0;
                            }
                            10% {
                                opacity: 0.8;
                            }
                            90% {
                                opacity: 0.6;
                            }
                            50% {
                                transform: translateY(-70px) translateX(15px);
                            }
                        }
                    `}</style>

                    {/* ── Background Effects ── */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Subtle grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50" />

                        {/* Ambient glow — white for MIKE */}
                        <div
                            className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[160px] bg-gradient-to-r from-white/10 via-indigo-200/5 to-white/10 rounded-full blur-[90px]"
                            style={{
                                animation:
                                    "mcPulseGlow 5s ease-in-out infinite",
                            }}
                        />

                        {/* Ambient glow — purple for CEDRICK */}
                        <div
                            className="absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[160px] bg-gradient-to-r from-violet-600/15 via-purple-500/10 to-violet-600/15 rounded-full blur-[100px]"
                            style={{
                                animation:
                                    "mcPulseGlow 5s ease-in-out infinite 2.5s",
                            }}
                        />
                    </div>

                    {/* ── Floating Particles ── */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width: `${2 + (i % 3)}px`,
                                height: `${2 + (i % 3)}px`,
                                left: `${18 + ((i * 9) % 64)}%`,
                                top: `${35 + ((i * 7) % 30)}%`,
                                background:
                                    i % 2 === 0
                                        ? "rgba(255,255,255,0.8)"
                                        : "rgba(168,85,247,0.8)",
                                boxShadow: `0 0 8px ${i % 2 === 0 ? "rgba(255,255,255,0.5)" : "rgba(168,85,247,0.5)"}`,
                                animation: `mcParticleFloat ${3.5 + (i % 3)}s ease-in-out infinite ${i * 0.4}s`,
                            }}
                        />
                    ))}

                    {/* ── SVG Gradient Definitions ── */}
                    <svg
                        height="0"
                        width="0"
                        viewBox="0 0 64 64"
                        className="absolute"
                    >
                        <defs>
                            {/* White gradient for MIKE */}
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                y2="2"
                                x2="0"
                                y1="62"
                                x1="0"
                                id="mc-grad-white"
                            >
                                <stop stopColor="#FFFFFF" />
                                <stop stopColor="#CBD5E1" offset="1" />
                            </linearGradient>

                            {/* Purple gradient for CEDRICK — with rotating transform */}
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                y2="2"
                                x2="0"
                                y1="62"
                                x1="0"
                                id="mc-grad-purple"
                            >
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

                    {/* ── Main Loader ── */}
                    <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3">
                        {/* MIKE — White strokes */}
                        {renderRow(MIKE_LETTERS, "mc-grad-white", 0, "mike")}

                        {/* CEDRICK — Purple strokes */}
                        {renderRow(
                            CEDRICK_LETTERS,
                            "mc-grad-purple",
                            0.5,
                            "cedrick"
                        )}

                        {/* Subtle tagline */}
                        <motion.p
                            className="text-white/20 text-[10px] sm:text-xs tracking-[0.4em] uppercase mt-5 font-light"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                        >
                            Portfolio
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
