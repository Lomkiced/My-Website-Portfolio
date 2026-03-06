"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TechMatrix() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isLight = resolvedTheme === "light";

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            {/* Base gradient layer */}
            <div
                className={`absolute inset-0 transition-colors duration-1000 ${isLight ? "bg-slate-50/50" : "bg-zinc-950/80"
                    }`}
            />

            {/* Top/Bottom fade masks for seamless blending */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

            {/* Premium Animated CSS Mesh */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] opacity-30 md:opacity-20 flex justify-center items-center">
                {/* Rotating multi-layered gradients replacing the canvas code rain */}
                <div
                    className="absolute inset-0 animate-spin-slow origin-center rounded-full"
                    style={{
                        background: `conic-gradient(from 0deg at 50% 50%, 
                            ${isLight ? 'rgba(139, 92, 246, 0)' : 'rgba(139, 92, 246, 0)'} 0deg, 
                            ${isLight ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'} 60deg, 
                            ${isLight ? 'rgba(14, 165, 233, 0)' : 'rgba(14, 165, 233, 0)'} 120deg, 
                            ${isLight ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'} 180deg, 
                            ${isLight ? 'rgba(14, 165, 233, 0)' : 'rgba(14, 165, 233, 0)'} 240deg, 
                            ${isLight ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'} 300deg, 
                            ${isLight ? 'rgba(139, 92, 246, 0)' : 'rgba(139, 92, 246, 0)'} 360deg
                        )`
                    }}
                />
                <div
                    className="absolute inset-0 animate-spin-reverse-slow origin-center rounded-full mix-blend-screen"
                    style={{
                        background: `conic-gradient(from 180deg at 50% 50%, 
                            ${isLight ? 'rgba(14, 165, 233, 0)' : 'rgba(14, 165, 233, 0)'} 0deg, 
                            ${isLight ? 'rgba(14, 165, 233, 0.1)' : 'rgba(14, 165, 233, 0.15)'} 90deg, 
                            ${isLight ? 'rgba(139, 92, 246, 0)' : 'rgba(139, 92, 246, 0)'} 180deg, 
                            ${isLight ? 'rgba(14, 165, 233, 0.1)' : 'rgba(14, 165, 233, 0.15)'} 270deg, 
                            ${isLight ? 'rgba(14, 165, 233, 0)' : 'rgba(14, 165, 233, 0)'} 360deg
                        )`
                    }}
                />
            </div>

            {/* Subtle floating orbs for depth instead of thousands of particles */}
            <div className={`absolute top-[20%] left-[15%] w-96 h-96 ${isLight ? 'bg-violet-400/20' : 'bg-violet-600/10'} rounded-full blur-[100px] mix-blend-screen animate-pulse-slow`} />
            <div className={`absolute top-[60%] right-[10%] w-[500px] h-[500px] ${isLight ? 'bg-indigo-300/20' : 'bg-indigo-600/10'} rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000`} />
            <div className={`absolute bottom-[-10%] left-[40%] w-[600px] h-[600px] ${isLight ? 'bg-cyan-200/30' : 'bg-cyan-600/10'} rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-4000`} />

            {/* High-performance CSS grid overlay */}
            <div
                className={`absolute inset-0 ${isLight ? 'opacity-[0.03]' : 'opacity-[0.05]'}`}
                style={{
                    backgroundImage: `linear-gradient(${isLight ? '#4f46e5' : '#8b5cf6'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? '#4f46e5' : '#8b5cf6'} 1px, transparent 1px)`,
                    backgroundSize: "60px 60px"
                }}
            />
        </div>
    );
}
