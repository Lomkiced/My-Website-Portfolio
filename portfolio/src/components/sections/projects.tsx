"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { PROJECT_DATA } from "@/lib/data";
import { useThemeStore } from "@/lib/store";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

// ─── Per-card wrapper that drives scrollytelling ─────────────────────────────

function ProjectCard({
    project,
}: {
    project: (typeof PROJECT_DATA)[number];
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { amount: 0.5 });
    const setColor = useThemeStore((s) => s.setActiveSectionColor);

    useEffect(() => {
        if (isInView) {
            setColor(project.gradient);
        }
    }, [isInView, project.gradient, setColor]);

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="group glass-card overflow-hidden hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/5 transition-all duration-300"
        >
            {/* Card header gradient */}
            <div
                className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
            >
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 border border-white/30 rounded-2xl rotate-12" />
                    <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-3xl rotate-45" />
                </div>
                {/* Project title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white font-display">
                        {project.title}
                    </h3>
                </div>
            </div>

            {/* Card body */}
            <div className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/10"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-2">
                    <motion.a
                        href={project.liveUrl}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-violet-500/20 transition-shadow"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FiExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                    </motion.a>
                    <motion.a
                        href={project.githubUrl}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-violet-500/30 text-sm font-medium hover:bg-accent/50 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FiGithub className="w-3.5 h-3.5" />
                        GitHub
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Projects Section ────────────────────────────────────────────────────────

export default function Projects() {
    return (
        <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2" />

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
                        Projects
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-display mt-3">
                        Featured Work
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
                        A collection of projects that showcase my skills and passion for
                        development
                    </p>
                </motion.div>

                {/* Project Cards Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {PROJECT_DATA.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
