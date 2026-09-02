"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ─── HeroScrollVideo ──────────────────────────────────────────────────────────
// Full-bleed, scroll-linked video scrubbing hero section.
//
// Architecture (Desktop):
//   - Native passive scroll listener calculates scroll progress (0→1)
//   - A requestAnimationFrame loop lerps toward the target progress
//   - The hidden <video> element seeks to the interpolated time
//   - On each successful seek, the frame is drawn to a <canvas>
//   - Canvas rendering prevents "seeking artifacts" (gray/blank frames)
//   - DPR-aware for retina displays
//
// Architecture (Mobile ≤768px):
//   - Skips scrubbing entirely, autoplays the video in a loop
//   - Uses the <video> element directly (canvas hidden)
//
// No GSAP required — pure native APIs for maximum reliability.
// ───────────────────────────────────────────────────────────────────────────────

export default function HeroScrollVideo() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [canvasReady, setCanvasReady] = useState(false);

    // ── Detect mobile viewport ──────────────────────────────────────────────
    useEffect(() => {
        const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        check();
        const mql = window.matchMedia("(max-width: 768px)");
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    // ── Desktop: Canvas-based scroll scrubbing ──────────────────────────────
    useEffect(() => {
        if (isMobile) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!video || !canvas || !section) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        video.pause();

        let animId: number;
        let targetProgress = 0;
        let currentProgress = 0;
        let destroyed = false;

        // ── Resize canvas to viewport at device pixel ratio ─────────
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // Redraw current frame at new size
            drawFrame();
        };

        // ── Calculate scroll progress through the tall section ──────
        const onScroll = () => {
            const rect = section.getBoundingClientRect();
            const scrollRange = section.offsetHeight - window.innerHeight;
            if (scrollRange <= 0) return;
            targetProgress = Math.max(0, Math.min(1, -rect.top / scrollRange));
        };

        // ── Draw current video frame to canvas (object-cover) ───────
        const drawFrame = () => {
            const vw = video.videoWidth;
            const vh = video.videoHeight;
            if (!vw || !vh) return;

            const cw = window.innerWidth;
            const ch = window.innerHeight;

            // Object-cover: crop the video to fill the canvas
            const videoAspect = vw / vh;
            const canvasAspect = cw / ch;
            let sx = 0, sy = 0, sw = vw, sh = vh;

            if (videoAspect > canvasAspect) {
                // Video is wider — crop sides
                sw = vh * canvasAspect;
                sx = (vw - sw) / 2;
            } else {
                // Video is taller — crop top/bottom
                sh = vw / canvasAspect;
                sy = (vh - sh) / 2;
            }

            ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
        };

        // ── When a seek completes, paint the decoded frame ───────────
        const onSeeked = () => {
            drawFrame();
        };
        video.addEventListener("seeked", onSeeked);

        // ── Lerp animation loop ─────────────────────────────────────
        // Lower LERP_FACTOR = smoother/cinematic, higher = snappier.
        // SEEK_THRESHOLD prevents redundant seeks when nearly converged.
        const LERP_FACTOR = 0.06;
        const SEEK_THRESHOLD = 0.0003;

        const tick = () => {
            if (destroyed) return;

            const delta = targetProgress - currentProgress;

            if (Math.abs(delta) > SEEK_THRESHOLD) {
                currentProgress += delta * LERP_FACTOR;

                // Only issue a new seek if the decoder isn't busy
                if (!video.seeking && video.duration && !isNaN(video.duration)) {
                    const time = Math.max(
                        0,
                        Math.min(currentProgress * video.duration, video.duration - 0.05)
                    );
                    video.currentTime = time;
                }
            }

            animId = requestAnimationFrame(tick);
        };

        // ── Initialization ──────────────────────────────────────────
        const init = () => {
            if (destroyed) return;

            resize();
            window.addEventListener("resize", resize, { passive: true });
            window.addEventListener("scroll", onScroll, { passive: true });

            // Set initial scroll position
            onScroll();

            // Draw the first frame
            video.currentTime = 0;

            // Start the animation loop
            animId = requestAnimationFrame(tick);
            setCanvasReady(true);
        };

        // Wait for enough data to seek and draw
        if (video.readyState >= 2) {
            init();
        } else {
            video.addEventListener("canplay", init, { once: true });
        }

        // ── Cleanup ─────────────────────────────────────────────────
        return () => {
            destroyed = true;
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("scroll", onScroll);
            video.removeEventListener("seeked", onSeeked);
            setCanvasReady(false);
        };
    }, [isMobile]);

    // ── Mobile: autoplay the video ──────────────────────────────────────────
    useEffect(() => {
        if (!isMobile) return;
        const video = videoRef.current;
        if (!video) return;
        video.play().catch(() => {});
    }, [isMobile]);

    return (
        <section
            ref={sectionRef}
            id="home"
            className={`relative ${isMobile ? "h-screen" : "h-[300vh]"}`}
        >
            {/* ── Sticky Viewport Wrapper ───────────────────────────────── */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
                {/* ── Hidden Video Source (decoded off-screen on desktop) ── */}
                <video
                    ref={videoRef}
                    src="/videos/robot-coding-hero.mp4"
                    muted
                    playsInline
                    preload="auto"
                    loop={isMobile}
                    className={
                        isMobile
                            ? "absolute inset-0 w-full h-full object-cover"
                            : "absolute opacity-0 pointer-events-none w-px h-px"
                    }
                />

                {/* ── Canvas (Desktop only — smooth frame rendering) ────── */}
                {!isMobile && (
                    <canvas
                        ref={canvasRef}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                            canvasReady ? "opacity-100" : "opacity-0"
                        }`}
                    />
                )}

                {/* ── Dark Gradient Overlay for Text Readability ────────── */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 pointer-events-none" />

                {/* ── Vignette Edge Effect ──────────────────────────────── */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        boxShadow: "inset 0 0 150px 60px rgba(0,0,0,0.4)",
                    }}
                />

                {/* ── Overlay Content ───────────────────────────────────── */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 lg:p-16">
                    {/* Top Row */}
                    <div className="flex items-start justify-between">
                        {/* Top-Left: Label */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                                ease: "easeOut",
                            }}
                        >
                            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-white/70">
                                <span className="w-8 h-px bg-pink-400" />
                                Portfolio Presentation
                            </span>
                        </motion.div>

                        {/* Top-Right: Year */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.7,
                                ease: "easeOut",
                            }}
                        >
                            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/40">
                                © {new Date().getFullYear()}
                            </span>
                        </motion.div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                        {/* Bottom-Left: Name + Tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.8,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="space-y-3"
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-white">
                                Mike Cedrick
                                <br />
                                <span className="text-pink-400">
                                    Danocup
                                </span>
                            </h1>
                            <p className="text-sm sm:text-base font-medium uppercase tracking-[0.25em] text-white/50">
                                Full Stack Developer
                            </p>
                        </motion.div>

                        {/* Bottom-Right: Portfolio Link */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                delay: 1,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="flex flex-col items-start sm:items-end gap-4"
                        >
                            <a
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .querySelector("#projects")
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                }}
                                className="group flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
                            >
                                <span>View Projects</span>
                                <span className="relative w-10 h-px bg-white/30 group-hover:w-16 transition-all duration-500 overflow-hidden">
                                    <span className="absolute inset-0 bg-pink-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                </span>
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* ── Scroll Indicator (Desktop Only) ──────────────────── */}
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                            Scroll
                        </span>
                        {/* Animated mouse icon */}
                        <div className="relative w-6 h-10 rounded-full border-2 border-white/30">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-pink-400"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
