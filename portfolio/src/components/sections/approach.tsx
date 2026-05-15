"use client";

import { motion, Variants } from "framer-motion";
import { FiDatabase, FiCode, FiActivity, FiCloud } from "react-icons/fi";
import SectionTitle from "@/components/animations/section-title";

const approachSteps = [
    {
        title: "Architecture & System Design",
        icon: FiDatabase,
        description: "Before writing code, I architect scalable foundations. This involves designing relational database schemas, defining robust API endpoints, and configuring optimal environments using tools like Prisma for type-safe database interactions."
    },
    {
        title: "Core Engineering & Development",
        icon: FiCode,
        description: "Writing clean, modular, and strictly typed code. I focus on building secure, robust backend logic and bridging it seamlessly with immersive, high-performance frontend interfaces."
    },
    {
        title: "Testing & Refinement",
        icon: FiActivity,
        description: "Ensuring enterprise-grade reliability. I rigorously test edge cases, optimize database query performance, and refine the user interface to guarantee fluid, native-feeling interactions."
    },
    {
        title: "Deployment & Delivery",
        icon: FiCloud,
        description: "Shipping to production securely and efficiently. Setting up CI/CD pipelines, managing environment variables, and containerizing applications for highly scalable, global deployment."
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
    },
};

export default function Approach() {
    return (
        <section id="approach" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    label="Workflow"
                    title="My Approach"
                    subtitle="A proven, systematic software development lifecycle for delivering high-performance, scalable digital products."
                    className="mb-20"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    className="relative"
                >
                    {/* Glowing Connecting Line */}
                    <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-violet-500/30 to-transparent" />

                    <div className="space-y-12 md:space-y-24">
                        {approachSteps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className={`relative flex flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"} items-start md:items-center`}
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 p-[2px] shadow-lg shadow-violet-500/30 group">
                                            <div className="w-full h-full rounded-2xl bg-white dark:bg-[#0a0a0c] backdrop-blur-md flex items-center justify-center transition-colors duration-300 group-hover:bg-transparent">
                                                <step.icon className="w-6 h-6 text-violet-600 dark:text-violet-400 group-hover:text-white transition-colors duration-300" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full pl-20 md:pl-0 md:w-1/2 ${isEven ? "md:pr-16 lg:pr-24" : "md:pl-16 lg:pl-24"}`}>
                                        <div className="group relative rounded-[2rem] bg-white/50 dark:bg-[#0a0a0c]/80 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/[0.05] p-8 md:p-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden will-change-transform">
                                            
                                            {/* Spotlight Holographic Effect / Ambient glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-indigo-500/0 group-hover:from-violet-500/5 group-hover:via-fuchsia-500/5 group-hover:to-indigo-500/5 transition-opacity duration-700 pointer-events-none" />
                                            
                                            <div className="relative z-10">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                                                    <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 font-display select-none">
                                                        0{index + 1}
                                                    </span>
                                                    <h3 className="text-2xl font-bold font-display text-foreground tracking-tight leading-tight">
                                                        {step.title}
                                                    </h3>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
