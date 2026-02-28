"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

// ─── Type Definitions ──────────────────────────────────────────────────────────

/** Depth tier for parallax layering: far = slowest/smallest, near = fastest/biggest */
type DepthTier = "far" | "mid" | "near";

/** A single data-node particle in the constellation */
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    baseRadius: number;
    tier: DepthTier;
    /** Phase offset for sine-wave drift */
    phase: number;
    /** Per-particle opacity multiplier */
    alpha: number;
}

/** A sparse code-rain column */
interface RainColumn {
    x: number;
    y: number;
    speed: number;
    chars: string[];
    length: number;
    /** Opacity of the head character */
    headAlpha: number;
}

/** A floating code keyword drifting across the canvas */
interface FloatingText {
    x: number;
    y: number;
    vx: number;
    vy: number;
    text: string;
    alpha: number;
    fontSize: number;
}

/** Theme-dependent color palette used inside the animation loop */
interface ColorPalette {
    /** Semi-transparent background fill for trailing effect */
    trailFill: string;
    /** Array of node/line colors to pick from */
    nodeColors: string[];
    /** Glow color for the cursor radial gradient */
    cursorGlow: string;
    /** Color for the code-rain head character */
    rainHead: string;
    /** Color for the code-rain tail characters */
    rainTail: string;
    /** Color for floating text fragments */
    textColor: string;
    /** Color for connecting lines between nodes */
    lineColor: (alpha: number) => string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 80;
const RAIN_COLUMN_COUNT = 18;
const FLOATING_TEXT_COUNT = 12;
const CONNECTION_DISTANCE = 180;
const MOUSE_REPULSION_RADIUS = 200;
const MOUSE_GLOW_RADIUS = 300;
const RAIN_FONT_SIZE = 14;

/** Katakana + tech symbols for code rain */
const RAIN_CHARS =
    "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789<>{}[]=-+*#$%".split(
        ""
    );

/** Floating code keywords that drift across the canvas */
const CODE_KEYWORDS = [
    "const",
    "=>",
    "async",
    "<div>",
    "0xFF",
    "npm",
    "export",
    "return",
    "void",
    "type",
    "interface",
    "await",
    "import",
    "from",
    "null",
    "true",
    "0x3F",
    "git",
    "push",
    "deploy",
];

// ─── Palette Definitions ───────────────────────────────────────────────────────

const DARK_PALETTE: ColorPalette = {
    trailFill: "rgba(3, 7, 18, 0.12)",
    nodeColors: [
        "rgba(139, 92, 246, 0.8)", // violet-500
        "rgba(99, 102, 241, 0.7)", // indigo-500
        "rgba(59, 130, 246, 0.6)", // blue-500
        "rgba(6, 182, 212, 0.5)",  // cyan-500
    ],
    cursorGlow: "rgba(139, 92, 246, 0.15)",
    rainHead: "rgba(255, 255, 255, 0.95)",
    rainTail: "rgba(139, 92, 246, 0.4)",
    textColor: "rgba(139, 92, 246, 0.08)",
    lineColor: (a: number) => `rgba(139, 92, 246, ${(a * 0.35).toFixed(3)})`,
};

const LIGHT_PALETTE: ColorPalette = {
    trailFill: "rgba(248, 250, 252, 0.14)",
    nodeColors: [
        "rgba(79, 70, 229, 0.55)",  // indigo-600
        "rgba(99, 102, 241, 0.45)", // indigo-500
        "rgba(100, 116, 139, 0.4)", // slate-500
        "rgba(71, 85, 105, 0.35)",  // slate-600
    ],
    cursorGlow: "rgba(79, 70, 229, 0.1)",
    rainHead: "rgba(30, 41, 59, 0.7)",
    rainTail: "rgba(79, 70, 229, 0.2)",
    textColor: "rgba(79, 70, 229, 0.06)",
    lineColor: (a: number) => `rgba(79, 70, 229, ${(a * 0.2).toFixed(3)})`,
};

// ─── Tier Configuration ────────────────────────────────────────────────────────

const TIER_CONFIG: Record<DepthTier, { speedMul: number; radiusRange: [number, number]; alphaRange: [number, number] }> = {
    far: { speedMul: 0.3, radiusRange: [1.0, 1.8], alphaRange: [0.25, 0.4] },
    mid: { speedMul: 0.6, radiusRange: [1.8, 2.8], alphaRange: [0.45, 0.65] },
    near: { speedMul: 1.0, radiusRange: [2.8, 4.2], alphaRange: [0.7, 0.9] },
};

// ─── Utility Helpers ───────────────────────────────────────────────────────────

/** Random float in [min, max) */
function rand(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/** Pick a random element from an array */
function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Factory Functions ─────────────────────────────────────────────────────────

function createParticle(w: number, h: number): Particle {
    const tiers: DepthTier[] = ["far", "far", "far", "mid", "mid", "near"];
    const tier = pick(tiers);
    const cfg = TIER_CONFIG[tier];
    const baseRadius = rand(cfg.radiusRange[0], cfg.radiusRange[1]);

    return {
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.4, 0.4) * cfg.speedMul,
        vy: rand(-0.4, 0.4) * cfg.speedMul,
        radius: baseRadius,
        baseRadius,
        tier,
        phase: rand(0, Math.PI * 2),
        alpha: rand(cfg.alphaRange[0], cfg.alphaRange[1]),
    };
}

function createRainColumn(w: number, h: number): RainColumn {
    const length = Math.floor(rand(8, 22));
    return {
        x: rand(0, w),
        y: rand(-h, 0),
        speed: rand(1.5, 4),
        chars: Array.from({ length }, () => pick(RAIN_CHARS)),
        length,
        headAlpha: rand(0.6, 1.0),
    };
}

function createFloatingText(w: number, h: number): FloatingText {
    return {
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.1, 0.1),
        text: pick(CODE_KEYWORDS),
        alpha: rand(0.03, 0.09),
        fontSize: rand(18, 42),
    };
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function TechMatrix() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();

    /**
     * Store the current palette in a ref so the animation loop always reads
     * the latest colors without triggering a full effect re-run.
     */
    const paletteRef = useRef<ColorPalette>(DARK_PALETTE);

    // Update palette ref whenever the theme changes
    useEffect(() => {
        paletteRef.current = resolvedTheme === "light" ? LIGHT_PALETTE : DARK_PALETTE;
    }, [resolvedTheme]);

    /**
     * Main animation setup — runs once on mount, cleans up on unmount.
     * Reads paletteRef.current each frame for theme-aware rendering.
     */
    const setupAnimation = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // ── State ────────────────────────────────────────────────────────────
        let animationFrameId = 0;
        let particles: Particle[] = [];
        let rainColumns: RainColumn[] = [];
        let floatingTexts: FloatingText[] = [];
        let mouseX = -9999;
        let mouseY = -9999;
        let time = 0;
        let logicalW = 0;
        let logicalH = 0;

        // ── Initialization ───────────────────────────────────────────────────

        const init = () => {
            const parent = canvas.parentElement;
            logicalW = parent?.clientWidth || window.innerWidth;
            logicalH = parent?.clientHeight || window.innerHeight;

            const isMobile = logicalW < 768;

            // Dynamic Device Pixel Ratio scaling for sharper canvases
            // On mobile, cap dpr to 1.5 to save performance while maintaining decent sharpness
            const dpr = typeof window !== "undefined"
                ? (isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : window.devicePixelRatio || 1)
                : 1;

            // Set canvas resolution to match CSS size (avoid stretching)
            canvas.style.width = `${logicalW}px`;
            canvas.style.height = `${logicalH}px`;
            canvas.width = logicalW * dpr;
            canvas.height = logicalH * dpr;

            // Normalize coordinate system to use CSS pixels
            ctx.scale(dpr, dpr);

            // Clear canvas (transparent - allows hero background to show through)
            ctx.clearRect(0, 0, logicalW, logicalH);

            // Mobile fallback / throttling
            const particleCount = isMobile ? Math.floor(PARTICLE_COUNT * 0.25) : PARTICLE_COUNT;
            const rainCount = isMobile ? Math.floor(RAIN_COLUMN_COUNT * 0.2) : RAIN_COLUMN_COUNT;
            const textCount = isMobile ? Math.floor(FLOATING_TEXT_COUNT * 0.3) : FLOATING_TEXT_COUNT;

            // Create entities
            particles = Array.from({ length: particleCount }, () => createParticle(logicalW, logicalH));
            rainColumns = Array.from({ length: rainCount }, () => createRainColumn(logicalW, logicalH));
            floatingTexts = Array.from({ length: textCount }, () => createFloatingText(logicalW, logicalH));
        };

        // ── Mouse Handlers ───────────────────────────────────────────────────

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onMouseLeave = () => {
            mouseX = -9999;
            mouseY = -9999;
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseleave", onMouseLeave);

        // ── Resize Observer ──────────────────────────────────────────────────

        const resizeObserver = new ResizeObserver(() => {
            init();
        });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        // ── Animation Loop ───────────────────────────────────────────────────

        const draw = () => {
            const w = logicalW;
            const h = logicalH;
            const p = paletteRef.current;

            time += 0.008;

            // ─ Clear canvas each frame (transparent overlay) ─────────────────
            ctx.clearRect(0, 0, w, h);

            // ─ Layer 4: Floating text fragments (drawn first, behind everything) ─
            ctx.save();
            for (let i = 0; i < floatingTexts.length; i++) {
                const ft = floatingTexts[i];

                ft.x += ft.vx;
                ft.y += ft.vy;

                // Wrap around edges
                if (ft.x < -100) ft.x = w + 50;
                if (ft.x > w + 100) ft.x = -50;
                if (ft.y < -50) ft.y = h + 30;
                if (ft.y > h + 50) ft.y = -30;

                ctx.font = `${ft.fontSize}px "Courier New", monospace`;
                ctx.fillStyle = p.textColor;
                ctx.globalAlpha = ft.alpha + Math.sin(time * 2 + i) * 0.015;
                ctx.fillText(ft.text, ft.x, ft.y);
            }
            ctx.restore();

            // ─ Layer 2: Code rain streams ────────────────────────────────────
            ctx.save();
            ctx.font = `${RAIN_FONT_SIZE}px monospace`;
            ctx.textAlign = "center";

            for (let i = 0; i < rainColumns.length; i++) {
                const col = rainColumns[i];

                // Draw each character in the stream
                for (let j = 0; j < col.chars.length; j++) {
                    const charY = col.y - j * RAIN_FONT_SIZE;
                    if (charY < -RAIN_FONT_SIZE || charY > h + RAIN_FONT_SIZE) continue;

                    if (j === 0) {
                        // Head character: bright glow
                        ctx.fillStyle = p.rainHead;
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = p.nodeColors[0];
                        ctx.globalAlpha = col.headAlpha;
                    } else {
                        // Trailing characters: fade proportionally
                        const fadeRatio = 1 - j / col.length;
                        ctx.fillStyle = p.rainTail;
                        ctx.shadowBlur = 0;
                        ctx.globalAlpha = fadeRatio * 0.6;
                    }

                    ctx.fillText(col.chars[j], col.x, charY);
                }

                // Reset shadow
                ctx.shadowBlur = 0;

                // Advance downward
                col.y += col.speed;

                // Randomize characters occasionally
                if (Math.random() > 0.96) {
                    const idx = Math.floor(Math.random() * col.chars.length);
                    col.chars[idx] = pick(RAIN_CHARS);
                }

                // Reset column when fully past bottom
                if (col.y - col.length * RAIN_FONT_SIZE > h) {
                    col.x = rand(0, w);
                    col.y = rand(-h * 0.3, -RAIN_FONT_SIZE);
                    col.speed = rand(1.5, 4);
                    col.headAlpha = rand(0.6, 1.0);
                }
            }
            ctx.restore();

            // ─ Layer 1: Particle constellation (primary effect) ──────────────

            // Update particle positions
            for (let i = 0; i < particles.length; i++) {
                const pt = particles[i];
                const cfg = TIER_CONFIG[pt.tier];

                // Sine-wave drift for organic, flowing motion
                pt.x += pt.vx + Math.sin(time * 1.5 + pt.phase) * 0.25 * cfg.speedMul;
                pt.y += pt.vy + Math.cos(time * 1.2 + pt.phase) * 0.2 * cfg.speedMul;

                // ── Mouse repulsion physics ──────────────────────────────────
                const dx = pt.x - mouseX;
                const dy = pt.y - mouseY;
                const distSq = dx * dx + dy * dy;
                const repulsionRadiusSq = MOUSE_REPULSION_RADIUS * MOUSE_REPULSION_RADIUS;

                if (distSq < repulsionRadiusSq && distSq > 0) {
                    const dist = Math.sqrt(distSq);
                    const force = (1 - dist / MOUSE_REPULSION_RADIUS) * 3.5;
                    const normX = dx / dist;
                    const normY = dy / dist;

                    pt.vx += normX * force * 0.15;
                    pt.vy += normY * force * 0.15;
                }

                // Velocity damping (friction)
                pt.vx *= 0.985;
                pt.vy *= 0.985;

                // Wrap around edges with padding
                const pad = 20;
                if (pt.x < -pad) pt.x = w + pad;
                if (pt.x > w + pad) pt.x = -pad;
                if (pt.y < -pad) pt.y = h + pad;
                if (pt.y > h + pad) pt.y = -pad;

                // Pulsate radius subtly
                pt.radius = pt.baseRadius + Math.sin(time * 3 + pt.phase) * 0.4;
            }

            // Draw connecting lines between nearby particles
            ctx.save();
            ctx.lineWidth = 0.6;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
                        const dist = Math.sqrt(distSq);
                        const alpha = 1 - dist / CONNECTION_DISTANCE;
                        ctx.strokeStyle = p.lineColor(alpha);
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.restore();

            // Draw particle nodes
            ctx.save();
            for (let i = 0; i < particles.length; i++) {
                const pt = particles[i];
                const colorIdx = i % p.nodeColors.length;

                // Proximity glow: brighten particles near the cursor
                let glowBoost = 0;
                const dxM = pt.x - mouseX;
                const dyM = pt.y - mouseY;
                const distM = Math.sqrt(dxM * dxM + dyM * dyM);
                if (distM < MOUSE_GLOW_RADIUS) {
                    glowBoost = (1 - distM / MOUSE_GLOW_RADIUS) * 0.5;
                }

                ctx.globalAlpha = Math.min(pt.alpha + glowBoost, 1.0);
                ctx.fillStyle = p.nodeColors[colorIdx];

                // Add glow for near-tier particles
                if (pt.tier === "near" || glowBoost > 0.15) {
                    ctx.shadowBlur = 6 + glowBoost * 12;
                    ctx.shadowColor = p.nodeColors[colorIdx];
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.beginPath();
                ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.shadowBlur = 0;
            ctx.restore();

            // ─ Layer 3: Cursor glow radial gradient ──────────────────────────
            if (mouseX > -9000 && mouseY > -9000) {
                ctx.save();
                const gradient = ctx.createRadialGradient(
                    mouseX, mouseY, 0,
                    mouseX, mouseY, MOUSE_GLOW_RADIUS
                );
                gradient.addColorStop(0, p.cursorGlow);
                gradient.addColorStop(1, "transparent");
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, MOUSE_GLOW_RADIUS, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // ── Kickoff ──────────────────────────────────────────────────────────
        init();
        animationFrameId = requestAnimationFrame(draw);

        // ── Cleanup ──────────────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    // Run the animation once on mount
    useEffect(() => {
        const cleanup = setupAnimation();
        return cleanup;
    }, [setupAnimation]);

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        >
            {/* Top fade mask: blends canvas into the UI */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />

            {/* The canvas fills the entire viewport */}
            <canvas
                ref={canvasRef}
                className="w-full h-full opacity-40 sm:opacity-50"
                style={{ display: "block" }}
            />

            {/* Bottom fade mask */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </div>
    );
}
