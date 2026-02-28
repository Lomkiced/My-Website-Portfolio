"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiAward, FiCode, FiLayers, FiMapPin } from "react-icons/fi";

const highlights = [
    {
        icon: FiCode,
        title: "Full Stack Development",
        description: "End-to-end web and mobile application development",
    },
    {
        icon: FiLayers,
        title: "Modern Tech Stack",
        description: "Next.js, NestJS, Prisma, React Native",
    },
    {
        icon: FiAward,
        title: "BS Information Technology",
        description: "Strong academic foundation in IT",
    },
];

// 4. Mouse-Tracking Spotlight logic
function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const background = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
    );

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 dark:border-white/5 bg-white/5 dark:bg-black/5 backdrop-blur-xl shadow-xl transition-all hover:shadow-2xl ${className}`}
        >
            {isMounted && (
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{ background }}
                />
            )}
            <div className="relative z-10 h-full">{children}</div>
        </motion.div>
    );
}

// 2. Staggered Text Reveal
const revealVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const } },
};

const textContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
};

function StaggeredText({ text, className }: { text: string; className?: string }) {
    const words = text.split(" ");
    return (
        <motion.div
            className={`flex flex-wrap ${className}`}
            variants={textContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
        >
            {words.map((word, index) => (
                <div key={index} className="overflow-hidden pb-2 mr-2 md:mr-3 last:mr-0 inline-flex">
                    <motion.span className="inline-block" variants={revealVariants}>
                        {word}
                    </motion.span>
                </div>
            ))}
        </motion.div>
    );
}

export default function About() {
    // 1. 3D Parallax Profile Card
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

    const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mousePosX = e.clientX - rect.left;
        const mousePosY = e.clientY - rect.top;
        const xPct = mousePosX / width - 0.5;
        const yPct = mousePosY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeaveCard = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="about" className="py-20 md:py-32 relative overflow-hidden">
            {/* 5. Continuous Floating Badges (Background Blur) */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"
            />

            <motion.div
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-sm font-semibold text-violet-500 dark:text-violet-400 uppercase tracking-widest flex items-center justify-center gap-3">
                        <span className="w-8 h-px bg-violet-500/50"></span>
                        About Me
                        <span className="w-8 h-px bg-violet-500/50"></span>
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-display mt-4">
                        Get to Know Me
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left — Profile Image (3D Parallax) */}
                    <div className="lg:col-span-5 relative" style={{ perspective: "1000px" }}>
                        <motion.div
                            ref={cardRef}
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            onMouseMove={handleMouseMoveCard}
                            onMouseLeave={handleMouseLeaveCard}
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-[2rem] cursor-pointer group"
                        >
                            {/* Premium Glassmorphism & Shadow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-indigo-600/20 rounded-[2rem] blur-xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" style={{ transform: "translateZ(-10px)" }} />
                            <div className="absolute inset-0 rounded-[2rem] border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/5 backdrop-blur-3xl overflow-hidden shadow-2xl" style={{ transformStyle: "preserve-3d" }}>

                                {/* Glare Effect */}
                                <motion.div
                                    className="absolute z-20 pointer-events-none bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        left: glareX,
                                        top: glareY,
                                        width: "200%",
                                        height: "200%",
                                        transform: "translate(-50%, -50%) rotate(-45deg)",
                                    }}
                                />

                                {/* Photo placeholder / actual content */}
                                <div className="absolute inset-[2px] rounded-[1.8rem] overflow-hidden shadow-inner group/image" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                                    <motion.div
                                        className="w-full h-full relative"
                                        style={{
                                            x: useTransform(mouseXSpring, [-0.5, 0.5], ["-5%", "5%"]),
                                            y: useTransform(mouseYSpring, [-0.5, 0.5], ["-5%", "5%"]),
                                            scale: 1.1, // Scale up slightly to hide edges during parallax
                                        }}
                                    >
                                        <Image
                                            src="/profile.jpg"
                                            alt="Mike Cedrick"
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
                                            priority
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                        {/* Premium gradient overlay to ensure text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                                    </motion.div>

                                    {/* Floating Info Panel at the Bottom */}
                                    <div className="absolute bottom-6 inset-x-6" style={{ transform: "translateZ(40px)" }}>
                                        <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 p-5 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105">
                                            <h3 className="text-xl md:text-2xl font-bold font-display text-white drop-shadow-md">Mike Cedrick</h3>
                                            <p className="text-sm md:text-base text-white/80 font-medium tracking-wide mt-1">
                                                Software Developer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 5. Continuous Floating Location badge */}
                        <motion.div
                            className="absolute -bottom-6 -right-4 lg:-right-8 z-30 pointer-events-none"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <SpotlightCard className="!rounded-2xl px-5 py-3.5 flex items-center gap-3 !bg-white/70 dark:!bg-black/50 backdrop-blur-2xl !border-white/40 dark:!border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] pointer-events-auto">
                                <div className="p-2 rounded-full bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400">
                                    <FiMapPin className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-semibold tracking-wide text-foreground/90">
                                    San Marcos, Agoo, La Union
                                </span>
                            </SpotlightCard>
                        </motion.div>
                    </div>

                    {/* Right — Description & Highlights */}
                    <div className="lg:col-span-7 space-y-8 mt-10 lg:mt-0">
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display leading-tight flex flex-wrap gap-x-2">
                                {/* 2. Staggered Text Reveal */}
                                <StaggeredText text="A Passionate" className="inline-flex" />
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 inline-block overflow-visible"
                                >
                                    Full Stack Developer
                                </motion.span>
                            </h3>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="space-y-4 text-base md:text-lg text-foreground/70 leading-relaxed font-light"
                            >
                                <p>
                                    As a Full Stack Developer and BSIT graduate, I am passionate
                                    about building high-performance, type-safe web and mobile
                                    applications that offer fluid user experiences. I leverage a
                                    modern stack including Next.js, NestJS, and Prisma to develop
                                    scalable architectures.
                                </p>
                                <p>
                                    Using Tailwind CSS and Framer Motion, I ensure polished,
                                    interactive interfaces. My goal is to bridge complex backend
                                    systems with intuitive frontend design to deliver seamless
                                    digital products from conception to deployment.
                                </p>
                            </motion.div>
                        </div>

                        {/* 3. Interactive Bento Highlights */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            {highlights.map((highlight, index) => (
                                <motion.div
                                    key={highlight.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.5 + index * 0.1,
                                        ease: "easeOut",
                                    }}
                                >
                                    <SpotlightCard className="p-6 h-full flex flex-col justify-center group/bento">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-12 h-12 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center shrink-0 group-hover/bento:bg-violet-500/20 dark:group-hover/bento:bg-violet-500/30 group-hover/bento:scale-110 transition-all duration-300">
                                                <highlight.icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                                            </div>
                                            <h4 className="font-semibold text-foreground md:text-lg leading-tight">
                                                {highlight.title}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-foreground/60 leading-relaxed group-hover/bento:text-foreground/80 transition-colors">
                                            {highlight.description}
                                        </p>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                            {/* Extra bento card to complete 2x2 grid nicely */}
                            <motion.div
                                className="h-full"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.5 + highlights.length * 0.1,
                                    ease: "easeOut",
                                }}
                            >
                                <SpotlightCard className="p-6 h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-violet-500/5 to-indigo-500/5 group/bento relative overflow-hidden rounded-2xl">
                                    <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
                                        {/* Advanced Loading Animation */}
                                        <div className="w-14 h-14 mb-5 relative flex items-center justify-center shrink-0">
                                            {/* Ambient Core Glow */}
                                            <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-md" />

                                            {/* Outer Dashed Orbit */}
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 rounded-full border border-dashed border-violet-500/40"
                                            />

                                            {/* Inner Continuous Energy Orbit */}
                                            <motion.div
                                                animate={{ rotate: -360 }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-1.5 rounded-full border border-transparent border-t-violet-400 border-b-indigo-400 opacity-80"
                                            />

                                            {/* Pulsing Quantum Core */}
                                            <motion.div
                                                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]"
                                            />

                                            {/* Orbiting Satellite Particle */}
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 z-10 origin-center"
                                            >
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                                            </motion.div>
                                        </div>

                                        {/* Text Content */}
                                        <div className="text-center">
                                            <h4 className="font-semibold text-foreground/90 font-display transition-colors group-hover/bento:text-foreground">Always Learning</h4>
                                            <p className="text-xs text-foreground/50 mt-1 transition-colors group-hover/bento:text-foreground/70">Exploring new frontiers</p>
                                        </div>
                                    </div>

                                    {/* Advanced Hover Ambient Lighting */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-500/10 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
                                </SpotlightCard>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
