"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FiBriefcase, FiAward, FiBookOpen, FiCalendar } from "react-icons/fi";
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
                gradient: "from-primary to-accent",
                border: "border-primary/20 group-hover:border-primary/40",
                text: "text-primary dark:text-primary",
                shadow: "shadow-primary/20",
                bg: "bg-primary/10 lg:bg-primary/5",
            };
        case "education":
            return {
                gradient: "from-accent to-primary",
                border: "border-accent/20 group-hover:border-accent/40",
                text: "text-accent dark:text-accent",
                shadow: "shadow-accent/20",
                bg: "bg-accent/10 lg:bg-accent/5",
            };
        case "certification":
            return {
                gradient: "from-primary via-accent to-primary",
                border: "border-primary/20 group-hover:border-primary/40",
                text: "text-foreground dark:text-foreground",
                shadow: "shadow-primary/20",
                bg: "bg-primary/10 lg:bg-primary/5",
            };
        default:
            return {
                gradient: "from-primary to-accent",
                border: "border-primary/20 group-hover:border-primary/40",
                text: "text-primary dark:text-primary",
                shadow: "shadow-primary/20",
                bg: "bg-primary/10 lg:bg-primary/5",
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
            <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-background dark:border-background bg-gradient-to-br ${colors.gradient} flex items-center justify-center z-20 shadow-lg ${colors.shadow} transition-transform duration-500 group-hover:scale-110`}>
                <div className="text-white drop-shadow-md">
                    {getIcon(item.type)}
                </div>
            </div>

            {/* Connecting line to node for mobile */}
            <div className="absolute left-[calc(1rem+24px)] md:hidden w-[calc(100%-1rem-24px)] h-px bg-gradient-to-r from-border to-transparent top-6 md:top-8 -z-10" />

            {/* Content Card Container */}
            <div className={`w-full pl-20 md:pl-0 md:w-[calc(50%-4rem)] ${isLeft ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"}`}>
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className={`relative overflow-hidden rounded-3xl glass-card border bg-background/50 dark:bg-black/20 backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 ${colors.border}`}
                >
                    {/* Spotlight Hover Effect */}
                    <div
                        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                        }}
                    />

                    {/* Gradient Border Accent Line */}
                    <div className={`absolute top-0 ${isLeft ? "right-0" : "left-0"} w-full h-1 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-5 bg-background/50 backdrop-blur-sm border ${colors.border} ${colors.text}`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </div>

                    <h3 className={`text-xl sm:text-2xl font-bold font-display text-foreground mb-2 transition-colors duration-300 w-full truncate text-left`}>
                        {item.title}
                    </h3>

                    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base font-medium mb-5 ${colors.text} justify-start`}>
                        <span className="flex items-center gap-1.5 font-bold">
                            {item.organization}
                        </span>
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                        <span className="flex items-center gap-1.5 text-muted-foreground bg-background/80 px-2.5 py-1 rounded-md border border-border/50">
                            <FiCalendar className="w-4 h-4" />
                            {item.period}
                        </span>
                    </div>

                    <p className={`text-muted-foreground leading-relaxed text-sm sm:text-base text-left`}>
                        {item.description}
                    </p>

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
            {/* Background Effects */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />

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
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1.5 rounded-full -translate-x-1/2 overflow-hidden z-10">
                        <motion.div
                            className="absolute top-0 left-0 right-0 w-full bg-gradient-to-b from-primary via-accent to-primary origin-top"
                            style={{ scaleY }}
                        />
                    </div>

                    {/* Glow effect for line */}
                    <motion.div
                        className="absolute left-4 md:left-1/2 top-0 w-6 rounded-full -translate-x-1/2 blur-md bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 pointer-events-none mix-blend-screen z-0"
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
