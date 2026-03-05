"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useThemeStore } from "@/lib/store";

let globalAudio: HTMLAudioElement | null = null;
const subscribers = new Set<(playing: boolean) => void>();
let isAttemptingPlay = false;

function getAudio() {
    if (typeof window === "undefined") return null;
    if (!globalAudio) {
        globalAudio = new Audio("/audio/Rewrite%20the%20Stars.mp3");
        globalAudio.loop = true;
        globalAudio.volume = 0.25; // Subtle background volume

        globalAudio.addEventListener("play", () => {
            Array.from(subscribers).forEach((cb) => cb(true));
        });
        globalAudio.addEventListener("pause", () => {
            Array.from(subscribers).forEach((cb) => cb(false));
        });
    }
    return globalAudio;
}

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const setAutoplayStatus = useThemeStore((s) => s.setAutoplayStatus);

    useEffect(() => {
        const audio = getAudio();
        if (!audio) return;

        // Sync initial state
        setIsPlaying(!audio.paused);

        // Subscribe to changes
        const handleStateChange = (playing: boolean) => setIsPlaying(playing);
        subscribers.add(handleStateChange);

        const playOnInteraction = async () => {
            if (!globalAudio) return;
            try {
                await globalAudio.play();
                setAutoplayStatus("playing");
                removeListeners();

                // Auto dismiss success toast after 5s
                setTimeout(() => setAutoplayStatus(null), 5000);
            } catch (err) {
                console.warn("Audio interaction play prevented", err);
            }
        };

        const removeListeners = () => {
            document.removeEventListener("click", playOnInteraction);
            document.removeEventListener("keydown", playOnInteraction);
        };

        // Only the first mounted component should attempt the initial autoplay tracking
        if (!isAttemptingPlay && audio.paused) {
            isAttemptingPlay = true;
            const attemptPlay = async () => {
                try {
                    await audio.play();
                    setAutoplayStatus("playing");

                    // Auto dismiss success toast after 5s
                    setTimeout(() => setAutoplayStatus(null), 5000);
                } catch {
                    // Autoplay policy prevented playing without interaction
                    setAutoplayStatus("blocked");
                    document.addEventListener("click", playOnInteraction);
                    document.addEventListener("keydown", playOnInteraction);
                }
            };
            attemptPlay();
        }

        return () => {
            subscribers.delete(handleStateChange);
            removeListeners();
        };
    }, [setAutoplayStatus]);

    const togglePlay = () => {
        const audio = getAudio();
        if (!audio) return;

        if (!audio.paused) {
            audio.pause();
        } else {
            audio.play().catch(() => { });
        }
    };

    return (
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
                        className={`w-[3px] rounded-t-sm ${isPlaying ? "bg-violet-600 dark:bg-violet-400" : "bg-muted-foreground"
                            }`}
                        animate={{
                            height: isPlaying ? ["20%", "100%", "40%", "80%", "20%"] : "20%",
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: bar * 0.2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="text-foreground transition-colors">
                {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </div>
        </motion.button>
    );
}
