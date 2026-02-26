"use client";

import { motion } from "framer-motion";
import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiFramer,
    SiRedux,
    SiNodedotjs,
    SiExpress,
    SiNestjs,
    SiPhp,
    SiLaravel,
    SiPrisma,
    SiExpo,
    SiDocker,
    SiVercel,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

interface Skill {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface SkillCategory {
    title: string;
    skills: Skill[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Frontend",
        skills: [
            { name: "React", icon: SiReact, color: "text-cyan-500" },
            { name: "Next.js", icon: SiNextdotjs, color: "text-foreground" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
            { name: "Framer Motion", icon: SiFramer, color: "text-pink-500" },
            { name: "Redux", icon: SiRedux, color: "text-purple-500" },
            { name: "Zustand", icon: SiReact, color: "text-orange-500" },
            { name: "TanStack Query", icon: SiReact, color: "text-red-500" },
            { name: "Shadcn/UI", icon: SiReact, color: "text-foreground" },
            { name: "DaisyUI", icon: SiTailwindcss, color: "text-green-500" },
            { name: "Recoil", icon: SiReact, color: "text-blue-400" },
        ],
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
            { name: "Express.js", icon: SiExpress, color: "text-foreground" },
            { name: "NestJS", icon: SiNestjs, color: "text-red-500" },
            { name: "PHP", icon: SiPhp, color: "text-indigo-400" },
            { name: "Laravel", icon: SiLaravel, color: "text-red-600" },
        ],
    },
    {
        title: "ORM & Data Access",
        skills: [
            { name: "Prisma", icon: SiPrisma, color: "text-violet-500" },
        ],
    },
    {
        title: "Mobile Development",
        skills: [
            { name: "React Native", icon: TbBrandReactNative, color: "text-cyan-500" },
            { name: "Expo", icon: SiExpo, color: "text-foreground" },
        ],
    },
    {
        title: "DevOps & Deployment",
        skills: [
            { name: "Docker", icon: SiDocker, color: "text-blue-500" },
            { name: "Vercel", icon: SiVercel, color: "text-foreground" },
        ],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" as const },
    },
};

export default function Skills() {
    return (
        <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

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
                        Skills
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-display mt-3">
                        My Tech Stack
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </motion.div>

                {/* Skill categories */}
                <div className="space-y-12">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                        >
                            <h3 className="text-lg font-semibold font-display mb-6 flex items-center gap-3">
                                <span className="w-8 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full" />
                                {category.title}
                            </h3>

                            <motion.div
                                className="flex flex-wrap gap-3"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {category.skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        variants={badgeVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                            transition: { duration: 0.2 },
                                        }}
                                        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-card cursor-default hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all"
                                    >
                                        <skill.icon
                                            className={`w-5 h-5 ${skill.color} transition-transform group-hover:scale-110`}
                                        />
                                        <span className="text-sm font-medium text-foreground">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
