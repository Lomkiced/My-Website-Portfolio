"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio instance with the custom song
        const audio = new Audio("/audio/Rewrite%20The%20Stars.mp3");
        audio.loop = true;
        audio.volume = 0.25; // Subtle background volume
        audioRef.current = audio;

        const playOnInteraction = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
                removeListeners();
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
            } catch (_error) {
                // Autoplay policy prevented playing without interaction
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

    return (
        <motion.div
            className="flex items-center gap-2 bg-accent/30 hover:bg-accent/50 border border-border/50 px-3 py-1.5 rounded-full transition-colors shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
        >
            <div className="flex items-end gap-[3px] h-5 w-5 overflow-hidden pb-[2px]">
                {[1, 2, 3].map((bar) => (
                    <motion.div
                        key={bar}
                        className="w-[4px] bg-violet-600 dark:bg-violet-400 rounded-t-sm"
                        animate={{
                            height: isPlaying ? ["20%", "100%", "40%", "80%", "20%"] : "10%"
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

            <button
                onClick={togglePlay}
                className="text-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors focus:outline-none"
                aria-label={isPlaying ? "Mute Background Music" : "Unmute Background Music"}
            >
                {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
        </motion.div>
    );
}
