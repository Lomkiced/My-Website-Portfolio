"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useThemeStore } from "@/lib/store";
import { useTheme } from "next-themes";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

const gradientMap: Record<string, string> = {
    "from-violet-600 to-indigo-600": "139, 92, 246", // Violet-500
    "from-purple-600 to-pink-600": "168, 85, 247",   // Purple-500
    "from-indigo-600 to-cyan-600": "6, 182, 212",    // Cyan-500
};

export function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "200px" });
    const { theme, systemTheme } = useTheme();
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const currentTheme = theme === "system" ? systemTheme : theme;
        setIsDark(currentTheme === "dark");
    }, [theme, systemTheme]);

    const activeSectionColor = useThemeStore((s) => s.activeSectionColor);
    const themeColor = gradientMap[activeSectionColor] || "139, 92, 246"; // Default Violet

    // Simulation Config
    const PARTICLE_COUNT = 60; // Just enough for elegance, not enough to choke the CPU
    const MAX_DISTANCE = 150;  // How close nodes must be to connect
    const BASE_SPEED = 0.3;    // Slow, professional drift

    useEffect(() => {
        if (!isInView || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = -1000;
        let mouseY = -1000;

        // Retina display support
        const resizeCanvas = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            initParticles(width, height);
        };

        const initParticles = (width: number, height: number) => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * BASE_SPEED,
                    vy: (Math.random() - 0.5) * BASE_SPEED,
                    radius: Math.random() * 1.5 + 0.5,
                    color: isDark ? `rgba(${themeColor}, 0.6)` : `rgba(${themeColor}, 0.4)`,
                });
            }
        };

        const draw = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges smoothly
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Subtle mouse repulsion
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    p.x -= dx * 0.05;
                    p.y -= dy * 0.05;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (dist2 < MAX_DISTANCE) {
                        const opacity = 1 - Math.pow(dist2 / MAX_DISTANCE, 1.5); // Smooth organic fade
                        ctx.beginPath();
                        ctx.strokeStyle = isDark
                            ? `rgba(${themeColor}, ${opacity * 0.25})`
                            : `rgba(${themeColor}, ${opacity * 0.2})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        window.addEventListener("resize", resizeCanvas);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isInView, isDark, themeColor]);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
            {/* Base Background Layer based on theme */}
            <div className="absolute inset-0 bg-background" />

            {/* Glowing Accent Gradient (Optimized, no massive blurs) */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] opacity-30 dark:opacity-20 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, rgba(${themeColor}, 0.15) 0%, transparent 70%)`,
                }}
            />

            {/* The actual hardware-accelerated canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* Premium Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_100%)] pointer-events-none" />
            <div className="noise-overlay absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay" />
        </div>
    );
}
