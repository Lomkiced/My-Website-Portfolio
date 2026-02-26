"use client";

import { useEffect, useRef } from "react";
import { useThemeStore } from "@/lib/store";

export default function TechMatrix() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const activeSectionColor = useThemeStore((s) => s.activeSectionColor);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;

        // Katakana + Latin + Numerals + Tech Symbols
        const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]/=-+*#$%".split("");

        const fontSize = 16;
        let columns: number = 0;
        let drops: number[] = [];

        // For interaction
        let mouseX = -1000;
        let mouseY = -1000;
        const mouseRadius = 150;

        const handleMouseMove = (e: MouseEvent) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        const init = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            columns = Math.floor(canvas.width / fontSize) + 1;
            // Stagger initial drop vertical positions
            drops = Array(columns).fill(0).map(() => Math.random() * -100);
        };

        const getPrimaryColor = () => {
            if (activeSectionColor.includes("purple-600")) return "#d8b4fe";
            if (activeSectionColor.includes("indigo-600")) return "#c7d2fe";
            return "#c4b5fd"; // Default violet-300
        };

        const getSecondaryColor = () => {
            if (activeSectionColor.includes("purple-600")) return "#a855f7";
            if (activeSectionColor.includes("indigo-600")) return "#6366f1";
            return "#8b5cf6"; // Default violet-500
        };

        const draw = () => {
            // Semi-transparent blackout for fading trails
            // We use dark, transparent overlay for a trail effect
            ctx.fillStyle = "rgba(5, 5, 10, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const primary = getPrimaryColor();
            const secondary = getSecondaryColor();

            ctx.font = `bold ${fontSize}px monospace`;
            ctx.textAlign = "center";

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];

                const x = i * fontSize + (fontSize / 2);
                const y = drops[i] * fontSize;

                const dx = mouseX - x;
                const dy = mouseY - y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // If close to the mouse, ignite the data stream
                if (distance < mouseRadius) {
                    ctx.fillStyle = "#ffffff";
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = primary;
                    ctx.fillText(text, x, y);

                    // Draw spontaneous web lines connecting scattered characters to mouse cursor
                    if (Math.random() > 0.98 && distance < mouseRadius * 0.7) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.4 * (1 - distance / mouseRadius)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(mouseX, mouseY);
                        ctx.lineTo(x, y);
                        ctx.stroke();
                    }
                } else {
                    // Normal behavior: randomly spawn bright white/glowy 'heads' on some streams
                    const isHead = Math.random() > 0.95;
                    ctx.fillStyle = isHead ? "#ffffff" : secondary;
                    ctx.shadowBlur = isHead ? 8 : 0;
                    ctx.shadowColor = isHead ? primary : "transparent";
                    ctx.fillText(text, x, y);
                }

                // Important: clear shadow for trailing items
                ctx.shadowBlur = 0;

                // Send dropped lines back to varying heights for natural dispersion
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = Math.random() * -10;
                }

                // Falling velocity
                drops[i] += 0.8;
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        init();
        draw();

        // Responsive handling with debounce
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(init, 200);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [activeSectionColor]);

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        >
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
            <canvas
                ref={canvasRef}
                className="w-full h-full opacity-30 sm:opacity-40"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </div>
    );
}
