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
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
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

                    {/* Asymmetric Bento Grid of Projects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative w-full">
                        {PROJECT_DATA.map((project, index) => {
                            const isFeatured = index === 0;
                            return (
                                <motion.div
                                    key={project.title}
                                    className={`group/card relative rounded-[2.5rem] overflow-hidden cursor-pointer border border-black/5 dark:border-white/5 bg-neutral-100 dark:bg-neutral-900 ${
                                        isFeatured ? "md:col-span-2 aspect-[4/3] md:aspect-[21/10]" : "md:col-span-1 aspect-[4/3] md:aspect-square"
                                    }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedProject(project);
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Shared background morph element */}
                                    <motion.div
                                        layoutId={`project-bg-${project.title}`}
                                        className="absolute inset-0 bg-neutral-100 dark:bg-[#0a0a0a] z-0 pointer-events-none rounded-[2.5rem]"
                                    />

                                    {/* Image / Background Layer */}
                                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
                                        {project.image && project.image !== "/placeholder.jpg" ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover object-center transform group-hover/card:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                            />
                                        ) : (
                                            <div
                                                className={`w-full h-full bg-gradient-to-br ${project.gradient} transform group-hover/card:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-80`}
                                            />
                                        )}
                                        {/* Gradient Overlay for text readability (Dark-mode styled) */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                                    </div>

                                    {/* Content Layer */}
                                    <div className="absolute inset-0 z-10 p-6 md:p-10 flex flex-col justify-end pointer-events-none">
                                        <div className="flex flex-col gap-3 transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {project.techStack.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 3 && (
                                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                                                        +{project.techStack.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <motion.h3
                                                layoutId={`project-title-${project.title}`}
                                                className={`font-display font-bold text-white tracking-tight ${
                                                    isFeatured ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
                                                }`}
                                            >
                                                {project.title.split(" | ")[0]}
                                            </motion.h3>

                                            <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                                <div className="overflow-hidden">
                                                    <p
                                                        className={`text-white/70 line-clamp-2 md:line-clamp-3 mt-2 ${
                                                            isFeatured ? "text-base md:text-lg" : "text-sm"
                                                        }`}
                                                    >
                                                        {project.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Hidden links layout container to snap Modal seamlessly */}
                                            <motion.div layoutId={`project-links-${project.title}`} className="hidden" />
                                            <motion.div layoutId={`project-view-btn-${project.title}`} className="hidden" />
                                        </div>

                                        {/* Hover Circular Arrow Button */}
                                        <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 -translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                            <FiArrowRight className="w-5 h-5 -rotate-45" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Modal Overlay rendered OUTSIDE the section to prevent content-visibility clipping */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-auto"
                    >
                        {/* Backdrop background */}
                        <div 
                            className="absolute inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-xl"
                            onClick={() => setSelectedProject(null)}
                        />

                        {/* Modal Content - Text Only Glass Card */}
                        <motion.div
                            layoutId={`project-bg-${selectedProject.title}`}
                            className="relative w-full max-w-2xl bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_120px_-20px_rgba(139,92,246,0.15)] border border-black/5 dark:border-white/10 overflow-y-auto max-h-[90vh] no-scrollbar flex flex-col gap-8"
                            onClick={(e) => e.stopPropagation()} // Prevent clicking inner card from closing
                        >
                            {/* Close Button */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ delay: 0.1 }}
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-full text-neutral-900 dark:text-white transition-all shadow-sm"
                                aria-label="Close modal"
                            >
                                <FiX className="w-5 h-5 md:w-6 md:h-6" />
                            </motion.button>

                            {/* Content Block */}
                            <div className="flex flex-col gap-2 mt-4 md:mt-2">
                                <motion.h3
                                    layoutId={`project-title-${selectedProject.title}`}
                                    className="text-3xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white leading-tight"
                                >
                                    {selectedProject.title.split(" | ")[0]}
                                </motion.h3>
                                
                                {selectedProject.title.split(" | ")[1] && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="text-lg md:text-xl text-violet-600 dark:text-violet-500 font-semibold mt-1"
                                    >
                                        {selectedProject.title.split(" | ")[1]}
                                    </motion.p>
                                )}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, delay: 0.15 }}
                                className="flex flex-wrap gap-2"
                            >
                                {selectedProject.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-xs md:text-sm font-semibold tracking-wide rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10 shadow-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="w-full text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-wrap"
                            >
                                {selectedProject.description}
                            </motion.p>

                            {/* Action Buttons */}
                            <motion.div
                                layoutId={`project-links-${selectedProject.title}`}
                                className="flex flex-col sm:flex-row items-center gap-4 pt-4 mt-2 border-t border-black/5 dark:border-white/10"
                            >
                                <MagneticButton
                                    href={selectedProject.liveUrl}
                                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-violet-600 dark:bg-white text-white dark:text-neutral-900 text-sm md:text-base font-bold shadow-[0_10px_20px_-10px_rgba(124,58,237,0.5)] dark:shadow-[0_10px_20px_-10px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-5px_rgba(124,58,237,0.6)] dark:hover:shadow-[0_15px_30px_-5px_rgba(255,255,255,0.4)] transition-all"
                                >
                                    <FiExternalLink className="w-5 h-5" />
                                    Visit Live Site
                                </MagneticButton>

                                <MagneticButton
                                    href={selectedProject.githubUrl}
                                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-white text-sm md:text-base font-bold border border-black/5 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all"
                                >
                                    <FiGithub className="w-5 h-5" />
                                    Source Code
                                </MagneticButton>
                            </motion.div>
                            
                            {/* Empty layout id sink to fulfill framer motion snap demands natively */}
                            <motion.div layoutId={`project-view-btn-${selectedProject.title}`} className="hidden" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
