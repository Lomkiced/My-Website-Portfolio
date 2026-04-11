"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FiBriefcase, FiAward, FiBookOpen, FiCalendar, FiStar } from "react-icons/fi";
import { EXPERIENCE_DATA, TimelineItem } from "@/lib/data";
import SectionTitle from "@/components/animations/section-title";

const getIcon = (type: string) => {
    switch (type) {
        case "work":
            return <FiBriefcase className="w-5 h-5 md:w-6 md:h-6" />;
        case "education":
            return <FiBookOpen className="w-5 h-5 md:w-6 md:h-6" />;
        case "certification":
            return <FiAward className="w-5 h-5 md:w-6 md:h-6" />;
        default:
            return <FiBriefcase className="w-5 h-5 md:w-6 md:h-6" />;
    }
};

const getColorConfig = (type: string) => {
    switch (type) {
        case "work":
            return {
                gradient: "from-violet-600 to-purple-600 dark:from-violet-500 dark:to-purple-500",
                border: "border-violet-500/30 group-hover:border-violet-500/60",
                text: "text-violet-600 dark:text-violet-400",
                shadow: "shadow-violet-500/25",
                bg: "bg-violet-500/10 lg:bg-violet-500/5",
                badge: "bg-violet-500/15 text-violet-600 dark:text-violet-300 border-violet-500/20",
            };
        case "education":
            return {
                gradient: "from-purple-600 to-fuchsia-600 dark:from-purple-500 dark:to-fuchsia-500",
                border: "border-purple-500/30 group-hover:border-purple-500/60",
                text: "text-purple-600 dark:text-purple-400",
                shadow: "shadow-purple-500/25",
                bg: "bg-purple-500/10 lg:bg-purple-500/5",
                badge: "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/20",
            };
        case "certification":
            return {
                gradient: "from-fuchsia-600 to-pink-600 dark:from-fuchsia-500 dark:to-pink-500",
                border: "border-fuchsia-500/30 group-hover:border-fuchsia-500/60",
                text: "text-fuchsia-600 dark:text-fuchsia-400",
                shadow: "shadow-fuchsia-500/25",
                bg: "bg-fuchsia-500/10 lg:bg-fuchsia-500/5",
                badge: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-500/20",
            };
        default:
            return {
                gradient: "from-primary to-primary/80",
                border: "border-primary/30 group-hover:border-primary/60",
                text: "text-primary dark:text-primary",
                shadow: "shadow-primary/25",
                bg: "bg-primary/10 lg:bg-primary/5",
                badge: "bg-primary/15 text-primary border-primary/20",
            };
    }
};

const ExperienceCard = ({ item, isLeft, index }: { item: TimelineItem; isLeft: boolean; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const colors = getColorConfig(item.type);

    return (
        <motion.div
            className={`relative flex items-center md:items-start w-full group ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {/* Timeline Node */}
            <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-background dark:border-neutral-950 bg-gradient-to-br ${colors.gradient} flex items-center justify-center z-20 shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]`}>
                <div className="text-white drop-shadow-md relative z-10">
                    {getIcon(item.type)}
                </div>
                {/* Ping animation effect */}
                <span className={`absolute inline-flex h-full w-full rounded-full bg-current opacity-20 duration-1000 group-hover:animate-ping ${colors.text}`} />
            </div>

            {/* Connecting line to node for mobile */}
            <div className="absolute left-[calc(1rem+24px)] md:hidden w-[calc(100%-1rem-24px)] h-px bg-gradient-to-r from-border/80 to-transparent top-6 md:top-8 -z-10" />

            {/* Content Card Container */}
            <div className={`w-full pl-20 md:pl-0 md:w-[calc(50%-4rem)] ${isLeft ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"}`}>
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`relative overflow-hidden rounded-3xl glass-card border bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl p-6 sm:p-8 md:p-10 transition-all duration-500 shadow-xl ${colors.border} group-hover:shadow-2xl`}
                >
                    {/* Spotlight Hover Effect */}
                    <div
                        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 40%)`,
                        }}
                    />

                    {/* Gradient Top Border Accent Line */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.gradient} opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wide mb-5 uppercase ${colors.badge}`}>
                        {item.type}
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-extrabold font-display text-foreground mb-3 leading-tight tracking-tight transition-colors duration-300 w-full text-left`}>
                        {item.title}
                    </h3>

                    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base font-semibold mb-6 ${colors.text} justify-start`}>
                        <span className="flex items-center gap-1.5 text-foreground/80">
                            {item.organization}
                        </span>
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                        <span className="flex items-center gap-1.5 bg-background/80 px-3 py-1 rounded-md border border-border/50 text-foreground/70 shadow-sm">
                            <FiCalendar className="w-4 h-4" />
                            {item.period}
                        </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed md:leading-loose text-sm sm:text-base text-left font-medium">
                        {item.description}
                    </p>

                    {/* Awards Section */}
                    {item.awards && item.awards.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-border/50">
                            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                <FiStar className="text-amber-500 w-4 h-4" /> Distinctive Awards
                            </h4>
                            <div className="flex flex-wrap gap-2 justify-start">
                                {item.awards.map((award, i) => (
                                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/5 dark:bg-primary/10 text-primary border border-primary/20 hover:bg-primary/10 hover:shadow-md transition-all">
                                        <FiAward className="w-3.5 h-3.5" /> {award}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll for the visual line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" className="py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
            {/* Dark Mode Background Effects */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <SectionTitle
                    label="Journey"
                    title="Experience & Education"
                    subtitle="A timeline of my professional experience, education, and continuous learning"
                    className="mb-20 sm:mb-28"
                />

                <div className="relative mt-8 sm:mt-16">
                    {/* The Background Track for Timeline */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1.5 bg-border/40 rounded-full -translate-x-1/2" />

                    {/* The Fill Track for Timeline */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1.5 rounded-full -translate-x-1/2 overflow-hidden z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)]">
                        <motion.div
                            className="absolute top-0 left-0 right-0 w-full bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500 origin-top"
                            style={{ scaleY }}
                        />
                    </div>

                    {/* Powerful Glow effect for filled line */}
                    <motion.div
                        className="absolute left-4 md:left-1/2 top-0 w-6 md:w-8 rounded-full -translate-x-1/2 blur-xl bg-gradient-to-b from-violet-500/60 via-purple-500/60 to-fuchsia-500/60 pointer-events-none mix-blend-screen dark:mix-blend-color-dodge z-0"
                        style={{ height: timelineHeight }}
                    />

                    {/* Timeline Items */}
                    <div className="space-y-16 md:space-y-32 py-12 md:py-24">
                        {EXPERIENCE_DATA.map((item, index) => (
                            <ExperienceCard
                                key={index}
                                item={item}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
