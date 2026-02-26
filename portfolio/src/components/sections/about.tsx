"use client";

import { motion } from "framer-motion";
import {
    FiMapPin,
    FiAward,
    FiCode,
    FiLayers,
} from "react-icons/fi";

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

export default function About() {
    return (
        <section id="about" className="py-20 md:py-32 relative overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-sm font-semibold text-violet-500 dark:text-violet-400 uppercase tracking-widest">
                        About Me
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-display mt-3">
                        Get to Know Me
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left — Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden">
                            {/* Gradient border effect */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-3xl opacity-60 blur-sm" />
                            <div className="relative w-full h-full rounded-3xl bg-muted overflow-hidden">
                                {/* Photo placeholder */}
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-950/50 dark:to-indigo-950/50">
                                    <div className="text-center p-8">
                                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mb-4">
                                            <span className="text-3xl font-bold text-white font-display">
                                                MC
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Profile Photo
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Location badge */}
                        <motion.div
                            className="absolute -bottom-4 -right-4 md:right-0 glass-card px-4 py-3 flex items-center gap-2 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <FiMapPin className="w-4 h-4 text-violet-500" />
                            <span className="text-sm font-medium">
                                San Marcos, Agoo, La Union
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Right — Description & Highlights */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold font-display">
                                A Passionate{" "}
                                <span className="text-gradient">Full Stack Developer</span>
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                As a Full Stack Developer and BSIT graduate, I am passionate about
                                building high-performance, type-safe web and mobile applications
                                that offer fluid user experiences. I leverage a modern stack
                                including Next.js, NestJS, and Prisma to develop scalable
                                architectures.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Using Tailwind CSS and Framer Motion, I ensure polished, interactive
                                interfaces. My goal is to bridge complex backend systems with
                                intuitive frontend design to deliver seamless digital products from
                                conception to deployment.
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-4 pt-4">
                            {highlights.map((highlight, index) => (
                                <motion.div
                                    key={highlight.title}
                                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-accent/50 transition-colors group"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 dark:group-hover:bg-violet-500/30 transition-colors">
                                        <highlight.icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">
                                            {highlight.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            {highlight.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
