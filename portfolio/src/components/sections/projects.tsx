"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowRight, FiX } from "react-icons/fi";
import { PROJECT_DATA } from "@/lib/data";
import SectionTitle from "@/components/animations/section-title";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<(typeof PROJECT_DATA)[number] | null>(null);

    // Close modal on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedProject(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
            // Optional: prevent scroll bounce on iOS
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
        } else {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        };
    }, [selectedProject]);

    return (
        <>
            <section id="projects" className="py-24 md:py-40 relative z-10 transition-colors">
                {/* Ambient Background Glows */}
                <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-violet-400/10 dark:bg-violet-500/10 rounded-full blur-3xl md:blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3 transition-colors" />
                <div className="absolute bottom-0 left-0 w-[40vh] h-[40vh] bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl md:blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/4 transition-colors" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionTitle
                        label="Portfolio"
                        title="Featured Work"
                        subtitle="A curated collection of projects combining intuitive design with robust engineering."
                        labelStyle="badge"
                        className="mb-20 md:mb-32"
                    />

                    {/* Vertical List of Projects */}
                    <div className="flex flex-col relative w-full group/list">
                        {PROJECT_DATA.map((project, index) => (
                            <motion.div
                                key={project.title}
                                className="group/row relative border-b border-black/5 dark:border-white/5 first:border-t flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 cursor-pointer transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedProject(project);
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Background morph element */}
                                <motion.div
                                    layoutId={`card-bg-${project.title}`}
                                    className="absolute inset-x-0 -inset-y-0 rounded-3xl bg-transparent z-0 pointer-events-none"
                                />

                                <div className="relative z-10 flex-1 md:pr-12">
                                    <motion.h3
                                        layoutId={`title-${project.title}`}
                                        className="text-2xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white tracking-tight group-hover/row:text-violet-600 dark:group-hover/row:text-violet-400 transition-colors duration-500"
                                    >
                                        {project.title.split(" | ")[0]} {/* Show only the main title in list for elegance */}
                                    </motion.h3>
                                    <p className="text-sm md:text-lg text-neutral-500 dark:text-neutral-400 mt-2 font-medium">
                                        {project.title.split(" | ")[1] || "Project Overview"}
                                    </p>
                                </div>

                                <div className="relative z-10 flex items-center justify-between md:justify-end w-full md:w-auto mt-6 md:mt-0 gap-6">
                                    <motion.div layoutId={`links-${project.title}`} className="flex items-center gap-3">
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 dark:text-neutral-300 hover:text-white hover:bg-violet-600 hover:border-violet-600 dark:hover:text-white dark:hover:bg-violet-600 transition-all duration-300"
                                            onClick={(e) => e.stopPropagation()}
                                            aria-label="View Live Demo"
                                        >
                                            <FiExternalLink className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 dark:text-neutral-300 hover:text-white hover:bg-neutral-900 hover:border-neutral-900 dark:hover:text-neutral-900 dark:hover:bg-white transition-all duration-300"
                                            onClick={(e) => e.stopPropagation()}
                                            aria-label="View Source Code"
                                        >
                                            <FiGithub className="w-5 h-5" />
                                        </a>
                                    </motion.div>
                                    <motion.div layoutId={`view-btn-${project.title}`}>
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:px-8 md:py-3.5 rounded-full bg-neutral-900 border-2 border-transparent text-white dark:bg-white dark:text-neutral-900 text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-neutral-900/20 dark:shadow-white/20 hover:shadow-violet-500/30 ring-0 outline-none"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setSelectedProject(project);
                                            }}
                                            aria-label={`View Details for ${project.title}`}
                                        >
                                            <span className="hidden md:block mr-3">View Details</span>
                                            <FiArrowRight className="w-5 h-5 md:-rotate-45 group-hover/row:rotate-0 transition-transform duration-500 ease-out" />
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal Overlay rendered OUTSIDE the section to prevent content-visibility clipping */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4 sm:p-6 md:p-12 h-[100dvh]">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-white/60 dark:bg-black/60 pointer-events-auto"
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`card-bg-${selectedProject.title}`}
                            className="relative w-full max-w-4xl max-h-[90dvh] flex flex-col bg-white dark:bg-[#0a0a0a] rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto border border-black/5 dark:border-white/10"
                        >
                            {/* Close Button */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ delay: 0.2 }}
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-white/50 backdrop-blur-md hover:bg-white/80 dark:bg-black/50 dark:hover:bg-black/80 rounded-full text-neutral-900 dark:text-white transition-all shadow-sm"
                                aria-label="Close modal"
                            >
                                <FiX className="w-6 h-6" />
                            </motion.button>

                            <div className="overflow-y-auto no-scrollbar w-full h-full flex flex-col">
                                {/* Image Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                    className={`relative w-full h-[30vh] sm:h-[40vh] flex-shrink-0 ${selectedProject.image ? "bg-neutral-100 dark:bg-neutral-900" : "bg-gradient-to-br " + selectedProject.gradient}`}
                                >
                                    {selectedProject.image && selectedProject.image !== "/placeholder.jpg" ? (
                                        <img
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                            {/* Beautiful animated mesh gradient placeholder */}
                                            <div className="w-full h-full bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-80" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent to-transparent opacity-100 h-full" />
                                </motion.div>

                                {/* Content Body */}
                                <div className="p-6 md:p-12 flex flex-col gap-6 md:gap-8 -mt-20 md:-mt-24 relative z-10 flex-1">
                                    <div className="flex flex-col">
                                        <motion.h3
                                            layoutId={`title-${selectedProject.title}`}
                                            className="text-3xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white leading-tight"
                                        >
                                            {selectedProject.title.split(" | ")[0]}
                                        </motion.h3>
                                        {selectedProject.title.split(" | ")[1] && (
                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                                className="text-lg md:text-2xl text-violet-600 dark:text-violet-400 mt-2 font-medium"
                                            >
                                                {selectedProject.title.split(" | ")[1]}
                                            </motion.p>
                                        )}
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.4, delay: 0.15 }}
                                        className="flex flex-wrap gap-2"
                                    >
                                        {selectedProject.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-1.5 text-sm font-medium rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                        className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-wrap max-w-3xl"
                                    >
                                        {selectedProject.description}
                                    </motion.p>

                                    {/* Action Buttons */}
                                    <motion.div
                                        layoutId={`links-${selectedProject.title}`}
                                        className="flex flex-wrap items-center gap-4 pt-8 mt-auto border-t border-black/5 dark:border-white/10"
                                    >
                                        <MagneticButton
                                            href={selectedProject.liveUrl}
                                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-violet-600 text-white text-base font-semibold shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_0_60px_-15px_rgba(124,58,237,0.7)] transition-all"
                                        >
                                            <FiExternalLink className="w-5 h-5" />
                                            Visit Live Site
                                        </MagneticButton>

                                        <MagneticButton
                                            href={selectedProject.githubUrl}
                                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-white text-base font-semibold border border-black/5 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 transition-all"
                                        >
                                            <FiGithub className="w-5 h-5" />
                                            Source Code
                                        </MagneticButton>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
