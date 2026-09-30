"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>_";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const targetText = "CED";
  const iterationsRef = useRef(0);

  // Scramble Animation Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Start scramble after a short delay
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          targetText
            .split("")
            .map((char, index) => {
              if (index < iterationsRef.current) {
                return targetText[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iterationsRef.current >= targetText.length) {
          clearInterval(interval);
          // Wait a bit after revealing before sliding up
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }

        iterationsRef.current += 1 / 4; // Controls the speed of reveal
      }, 50);
    }, 300);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  // Lock body scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100vh", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Main Scrambling Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="font-pixel text-[120px] md:text-[180px] lg:text-[220px] leading-none text-white tracking-widest mix-blend-difference selection:bg-transparent">
              {displayText || "   "}
            </h1>
            
            {/* Ambient subtle glow behind the text */}
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 animate-pulse pointer-events-none" />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
