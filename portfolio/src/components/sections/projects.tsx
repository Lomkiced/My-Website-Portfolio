"use client";

import { useRef, useEffect, MouseEvent } from "react";
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useMotionTemplate,
    useReducedMotion,
} from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { PROJECT_DATA } from "@/lib/data";
import { useThemeStore } from "@/lib/store";
import SectionTitle from "@/components/animations/section-title";
import { MagneticButton } from "@/components/ui/magnetic-button";

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



// ─── Project Card ─────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof PROJECT_DATA)[number] }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { amount: 0.5, once: false });
    const setColor = useThemeStore((s) => s.setActiveSectionColor);

    useEffect(() => {
        if (isInView) {
            setColor(project.gradient);
        }
    }, [isInView, project.gradient, setColor]);

    // Spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Parallax Tilt
    const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
    const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
    const shouldReduceMotion = useReducedMotion();

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        if (shouldReduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
        const { currentTarget, clientX, clientY } = event;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;

        // Tilt amount
        rotateX.set(yPct * -15);
        rotateY.set(xPct * 15);
    }

    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
    }

    const mouseXSpring = useSpring(mouseX, { stiffness: 500, damping: 100 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 500, damping: 100 });

    const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseXSpring}px ${mouseYSpring}px, white, transparent 80%)`;

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative rounded-3xl overflow-hidden bg-white/60 dark:bg-black/20 border border-neutral-200/50 dark:border-white/5 backdrop-blur-md md:backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-lg hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] dark:hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-[box-shadow,border-color] duration-500 will-change-transform"
        >
            {/* Spotlight overlay */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 bg-violet-500/15 dark:bg-violet-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ WebkitMaskImage: maskImage, maskImage }}
            />

            {/* Content Container (parallax lift) */}
            <div
                className="relative z-10 flex flex-col h-full bg-transparent"
                style={{ transform: "translateZ(40px)" }}
            >
                {/* Header Graphic */}
                <div
                    className={`relative h-56 ${project.image ? 'bg-neutral-900' : `bg-gradient-to-br ${project.gradient}`} overflow-hidden rounded-t-3xl`}
                >
                    {/* Optional Background Image */}
                    {project.image && (
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${project.image})` }}
                        />
                    )}
                    {/* Animated Orbs/Waves (Only show if no image exists) */}
                    {!project.image && (
                        <>
                            <div
                                className="absolute -top-10 -left-10 w-48 h-48 bg-white/30 blur-2xl md:blur-3xl rounded-full will-change-transform"
                                style={{ animation: 'orb-drift-1 5s ease-in-out infinite' }}
                            />
                            <div
                                className="absolute -bottom-10 -right-10 w-64 h-64 bg-black/20 blur-2xl md:blur-3xl rounded-full will-change-transform"
                                style={{ animation: 'orb-drift-2 7s ease-in-out infinite' }}
                            />
                        </>
                    )}

                    {/* Title Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6">
                        <h3
                            className="text-2xl font-bold text-white font-display drop-shadow-md"
                            style={{ transform: "translateZ(30px)" }}
                        >
                            {project.title}
                        </h3>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 p-6 flex flex-col gap-5">
                    <p
                        className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap flex-1 drop-shadow-sm"
                        style={{ transform: "translateZ(20px)" }}
                    >
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div
                        className="flex flex-wrap gap-2"
                        style={{ transform: "translateZ(25px)" }}
                    >
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 border border-neutral-200/60 dark:border-white/10 backdrop-blur-md shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Magnetic Buttons */}
                    <div
                        className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-200/60 dark:border-white/10"
                        style={{ transform: "translateZ(30px)" }}
                    >
                        <MagneticButton
                            href={project.liveUrl}
                            className="flex items-center justify-center flex-1 gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 relative overflow-hidden group/btn min-w-[120px]"
                        >
                            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                            <FiExternalLink className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">Live Demo</span>
                        </MagneticButton>

                        <MagneticButton
                            href={project.githubUrl}
                            className="flex items-center justify-center flex-1 gap-2 px-4 py-2.5 rounded-xl bg-neutral-100/50 dark:bg-white/5 text-neutral-700 dark:text-white text-sm font-semibold border border-neutral-200/60 dark:border-white/10 hover:bg-neutral-200/50 dark:hover:bg-white/10 shadow-sm transition-colors min-w-[120px]"
                        >
                            <FiGithub className="w-4 h-4" />
                            GitHub
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Projects Section ────────────────────────────────────────────────────────
export default function Projects() {
    return (
        <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-400/20 dark:bg-violet-500/10 rounded-full blur-3xl md:blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl md:blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/4" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <SectionTitle
                    label="Portfolio"
                    title="Featured Work"
                    subtitle="A curated collection of projects combining intuitive design with robust engineering."
                    labelStyle="badge"
                    className="mb-20"
                />

                {/* Project Cards Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 [perspective:2000px]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-50px" }}
                >
                    {PROJECT_DATA.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
