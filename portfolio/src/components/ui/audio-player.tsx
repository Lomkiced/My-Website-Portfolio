"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useThemeStore } from "@/lib/store";

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const setAutoplayStatus = useThemeStore((s) => s.setAutoplayStatus);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
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
    }, [setAutoplayStatus]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    };

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
        </>
    );
}
