"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiGithub, FiArrowUpRight } from "react-icons/fi";
import { PROJECT_DATA } from "@/lib/data";
import SectionTitle from "@/components/animations/section-title";

export default function Projects() {
    return (
        <section id="projects" className="py-24 md:py-40 relative z-10 transition-colors">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-violet-400/10 dark:bg-violet-500/10 rounded-full blur-3xl md:blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3 transition-colors" />
            <div className="absolute bottom-0 left-0 w-[40vh] h-[40vh] bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl md:blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/4 transition-colors" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    label="Portfolio"
                    title="Featured Work"
                    subtitle="A curated collection of projects combining intuitive design with robust engineering."
                    labelStyle="badge"
                    className="mb-16 md:mb-24"
                />

                {/* Vertical Stack of Landscape Project Cards */}
                <div className="flex flex-col gap-16 md:gap-24">
                    {PROJECT_DATA.map((project, index) => {
                        const projectName = project.title.split(" | ")[0];
                        const orgName = project.title.split(" | ")[1];
                        const isEven = index % 2 === 0;

                        return (
                            <motion.article
                                key={project.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                                className="group"
                            >
                                {/* ── Landscape Image Stage ─────────────────── */}
                                <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] mb-6 md:mb-8">
                                    {project.image && project.image !== "/placeholder.jpg" ? (
                                        <Image
                                            src={project.image}
                                            alt={projectName}
                                            fill
                                            quality={100}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                        />
                                    ) : (
                                        <div
                                            className={`w-full h-full bg-gradient-to-br ${project.gradient} transform group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]`}
                                        />
                                    )}

                                    {/* Subtle bottom fade for visual softness */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                                    {/* Floating index badge */}
                                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/15 text-white text-xs font-bold tracking-widest">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>
                                </div>

                                {/* ── Content Block ─────────────────────────── */}
                                <div className={`flex flex-col md:flex-row gap-6 md:gap-12 ${isEven ? "" : "md:flex-row-reverse"}`}>
                                    {/* Left: Title + Org + Buttons */}
                                    <div className="md:w-[40%] flex flex-col gap-4">
                                        {/* Organization Badge */}
                                        {orgName && (
                                            <span className="inline-flex items-center self-start px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-500/20">
                                                {orgName}
                                            </span>
                                        )}

                                        {/* Title */}
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white leading-[1.15] tracking-tight">
                                            {projectName}
                                        </h3>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {project.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/10"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                                            {project.liveUrl && project.liveUrl !== "#" && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold tracking-wide shadow-[0_4px_15px_-3px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(124,58,237,0.5)] transition-all duration-300"
                                                >
                                                    <FiExternalLink className="w-4 h-4" />
                                                    <span>Visit Live</span>
                                                    <FiArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                                                </a>
                                            )}

                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 dark:bg-white/[0.06] text-neutral-800 dark:text-neutral-200 text-sm font-bold tracking-wide border border-neutral-300/80 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                                            >
                                                <FiGithub className="w-4 h-4" />
                                                <span>Source Code</span>
                                                <FiArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Right: Full Description */}
                                    <div className="md:w-[60%]">
                                        <p className="text-sm sm:text-base md:text-[1.05rem] text-neutral-600 dark:text-neutral-400 leading-[1.8] whitespace-pre-wrap">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Section Divider (show between projects, not after last) */}
                                {index < PROJECT_DATA.length - 1 && (
                                    <div className="mt-16 md:mt-24 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 dark:via-white/10 to-transparent" />
                                )}
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
