"use client";

import { useEffect, useRef } from "react";

export default function SoundManager() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext on first user interaction to bypass browser autoplay policies
  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };

    window.addEventListener("click", initAudio, { once: true });
    window.addEventListener("keydown", initAudio, { once: true });
    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
  }, []);

  useEffect(() => {
    const playHoverSound = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") return;
      const ctx = audioCtxRef.current;
      
      // Minimal, high-end glass "tick" for hover
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      // Start high, drop fast
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.03);
      
      // Envelope
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.005); // Very quiet
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    };

    const playClickSound = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") return;
      const ctx = audioCtxRef.current;
      
      // Deep, satisfying subtle "thock" for click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement;
      
      // Find the nearest interactive element
      const interactiveEl = target.closest('button, a, [role="button"], label, select, input[type="radio"], input[type="checkbox"]');
      
      if (interactiveEl) {
        // If we came from inside the exact same interactive element, don't play again (prevents bubbling double-plays)
        if (related && interactiveEl.contains(related)) return;
        
        playHoverSound();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a, [role="button"], label, select, input');
      
      if (interactiveEl) {
        playClickSound();
      }
    };

    // Attach to document body for global interception
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return null;
}
