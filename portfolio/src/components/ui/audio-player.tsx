"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, MousePointerClick } from "lucide-react";

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [autoplayStatus, setAutoplayStatus] = useState<"playing" | "blocked" | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        setIsMounted(true);
        // Initialize audio instance with the custom song
        const audio = new Audio("/audio/Rewrite%20the%20Stars.mp3");
        audio.loop = true;
        audio.volume = 0.25; // Subtle background volume
        audioRef.current = audio;

        const playOnInteraction = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
                setAutoplayStatus("playing");
                removeListeners();

                // Auto dismiss success toast after 5s
                setTimeout(() => {
                    setAutoplayStatus(null);
                }, 5000);
            } catch (err) {
                console.warn("Audio interaction play prevented", err);
            }
        };

        const removeListeners = () => {
            document.removeEventListener("click", playOnInteraction);
            document.removeEventListener("keydown", playOnInteraction);
        };

        const attemptPlay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
                setAutoplayStatus("playing");

                // Auto dismiss success toast after 5s
                setTimeout(() => {
                    setAutoplayStatus(null);
                }, 5000);
            } catch {
                // Autoplay policy prevented playing without interaction
                setAutoplayStatus("blocked");
                document.addEventListener("click", playOnInteraction);
                document.addEventListener("keydown", playOnInteraction);
            }
        };

        attemptPlay();

        return () => {
            audio.pause();
            audio.src = ""; // Clear source for garbage collection
            removeListeners();
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    };

    const toastContent = (
        <AnimatePresence>
            {autoplayStatus && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none w-max max-w-[90vw]"
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
    );

    return (
        <>
            {/* The Audio Player Button */}
            <motion.button
                onClick={togglePlay}
                className="flex items-center gap-2 bg-accent/30 hover:bg-accent/50 border border-border/50 px-3 py-1.5 rounded-full transition-colors shadow-sm focus:outline-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                aria-label={isPlaying ? "Mute Background Music" : "Unmute Background Music"}
            >
                <div className="flex items-end gap-[3px] h-4 w-4 overflow-hidden pb-[2px]">
                    {[1, 2, 3].map((bar) => (
                        <motion.div
                            key={bar}
                            className={`w-[3px] rounded-t-sm ${isPlaying ? "bg-violet-600 dark:bg-violet-400" : "bg-muted-foreground"}`}
                            animate={{
                                height: isPlaying ? ["20%", "100%", "40%", "80%", "20%"] : "20%"
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: bar * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <div className="text-foreground transition-colors">
                    {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </div>
            </motion.button>

            {/* Render Toast perfectly overlaying everything via a Portal */}
            {isMounted && typeof window !== "undefined" && createPortal(toastContent, document.body)}
        </>
    );
}
