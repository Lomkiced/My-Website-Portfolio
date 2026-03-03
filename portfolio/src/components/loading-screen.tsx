"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TERMINAL_TEXTS = [
    "INITIALIZING NEURAL PATHWAYS...",
    "COMPILING WEBGL SHADERS...",
    "ESTABLISHING SECURE CONNECTION...",
    "LOADING ASSETS...",
    "WAKING UP THE SYSTEM...",
    "ACCESS GRANTED."
];

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        // Counter Logic
        const duration = 2400; // 2.4 seconds total loading
        const startTime = Date.now();

        let animationFrameId: number;
        let lastDisplayed = -1;

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const p = Math.min((elapsed / duration) * 100, 100);

            // Cubic ease-out feeling for the number counter
            const easedProgress = Math.floor(100 - Math.pow(1 - p / 100, 3) * 100);

            // Only trigger a re-render when the displayed integer changes
            if (easedProgress !== lastDisplayed) {
                lastDisplayed = easedProgress;
                setProgress(easedProgress);
            }

            if (elapsed < duration) {
                animationFrameId = requestAnimationFrame(updateProgress);
            } else {
                setProgress(100);
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.overflow = "auto";
                }, 400); // Small pause at 100% before firing exit
            }
        };

        animationFrameId = requestAnimationFrame(updateProgress);

        // Terminal text rotation Logic
        const textInterval = setInterval(() => {
            setTextIndex(prev => Math.min(prev + 1, TERMINAL_TEXTS.length - 1));
        }, duration / TERMINAL_TEXTS.length);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(textInterval);
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.15,
                        filter: "blur(12px)",
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Custom cubic bezier for that "snap" glass shattering feel
                >
                    {/* Background Grid / Vibe */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-sm px-6">

                        {/* Styled Glitch Logo Container */}
                        <motion.div
                            className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center"
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            {/* Ambient Glow behind image */}
                            <div className="absolute inset-0 bg-violet-600/30 blur-[50px] rounded-full mix-blend-screen animate-pulse duration-1000" />

                            <Image
                                src="/DEALWITHIT.png"
                                alt="Booting System"
                                fill
                                className="object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] will-change-transform z-10 p-2"
                                priority
                            />

                            {/* Holographic Scanning Line Overlay */}
                            <motion.div
                                className="absolute inset-x-0 h-[2px] bg-cyan-400 z-20 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                                animate={{ y: ["-10px", "160px", "-10px"] }}
                                transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
                            />
                        </motion.div>

                        {/* Progress Tracker & Terminal Output */}
                        <div className="w-full flex flex-col gap-3">
                            <div className="flex justify-between items-end font-display w-full h-8">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        className="text-violet-400 font-bold tracking-widest text-[10px] sm:text-xs uppercase"
                                        key={textIndex}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {TERMINAL_TEXTS[textIndex]}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter tabular-nums leading-none drop-shadow-md">
                                    {progress}<span className="text-violet-500 text-xl">%</span>
                                </span>
                            </div>

                            {/* Cyberpunk Loading Bar Track */}
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative backdrop-blur-sm border border-white/5">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 rounded-full shadow-[0_0_20px_rgba(139,92,246,1)]"
                                    style={{ width: `${progress}%` }}
                                    initial={{ width: "0%" }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
