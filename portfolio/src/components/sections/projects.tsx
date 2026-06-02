"use client";

import { motion, Variants } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { 
    Briefcase, 
    HeartHandshake, 
    Sprout, 
    BookOpen, 
    Wrench, 
    Award, 
    QrCode, 
    Stethoscope,
    Wallet,
    Archive
} from "lucide-react";
import SectionTitle from "@/components/animations/section-title";

const PROJECTS = [
    {
        id: "ojt-1",
        title: "eCash - DOST-1",
        description: "Disbursement Monitoring System: A secure financial platform developed for DOST-1 to streamline and monitor internal disbursements.",
        icon: Wallet,
        color: "text-blue-400",
        bgGradient: "from-blue-500/20 via-blue-500/5 to-transparent",
        glow: "hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#",
    },
    {
        id: "ojt-2",
        title: "KIP - DOST-1",
        description: "Key Indicator Performance & Record Management System built for DOST-1 to maintain organized, compliant government records.",
        icon: Archive,
        color: "text-fuchsia-400",
        bgGradient: "from-fuchsia-500/20 via-fuchsia-500/5 to-transparent",
        glow: "hover:shadow-[0_0_40px_-10px_rgba(217,70,239,0.3)]",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#",
    },
    {
        id: "1",
        title: "Alumni Information Career Tracking",
        description: "A comprehensive platform to track alumni career paths, outcomes, and maintain active engagement with graduates.",
        icon: Briefcase,
        color: "text-indigo-400",
        bgGradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
        glow: "hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#",
    },
    {
        id: "2",
        title: "CareLink",
        description: "A Senior Citizen Assistance Management System facilitating efficient care, support distribution, and resource allocation.",
        icon: HeartHandshake,
        color: "text-rose-400",
        bgGradient: "from-rose-500/20 via-rose-500/5 to-transparent",
        glow: "hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.3)]",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#",
    },
    {
        id: "3",
        title: "FarmFlow",
        description: "Agricultural Operations Management System for optimizing farm activities, supply chain, and harvest yields.",
        icon: Sprout,
        color: "text-emerald-400",
        bgGradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
        glow: "hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#",
    },
    {
        id: "4",
        title: "EduShare",
        description: "A Collaborative Learning Resource Exchange Platform enabling students and educators to share materials seamlessly.",
        icon: BookOpen,
        color: "text-violet-400",
        bgGradient: "from-violet-500/20 via-violet-500/5 to-transparent",
        glow: "hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#",
    },
    {
        id: "5",
        title: "FixTrack",
        description: "Maintenance Request Monitoring System for streamlined tracking, assignment, and resolution of facility issues.",
        icon: Wrench,
        color: "text-amber-400",
        bgGradient: "from-amber-500/20 via-amber-500/5 to-transparent",
        glow: "hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#",
    },
    {
        id: "6",
        title: "Accreditation Record System",
        description: "An organized Accreditation Record Management System for handling compliance documents securely and efficiently.",
        icon: Award,
        color: "text-yellow-400",
        bgGradient: "from-yellow-500/20 via-yellow-500/5 to-transparent",
        glow: "hover:shadow-[0_0_40px_-10px_rgba(250,204,21,0.3)]",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#",
    },
    {
        id: "7",
        title: "QRVents",
        description: "A QR-Based Event Registration and Attendance System ensuring fast check-ins and seamless event management.",
        icon: QrCode,
        color: "text-cyan-400",
        bgGradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
        glow: "hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)]",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#",
    },
    {
        id: "8",
        title: "RHU Online Appointment",
        description: "Rural Health Unit Online Appointment System facilitating remote booking and organized patient scheduling.",
        icon: Stethoscope,
        color: "text-red-400",
        bgGradient: "from-red-500/20 via-red-500/5 to-transparent",
        glow: "hover:shadow-[0_0_40px_-10px_rgba(248,113,113,0.3)]",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 1, 0.5, 1],
        },
    },
};

// Bento Grid Layout Logic
const getGridClass = (index: number) => {
    if (index === 0) return "md:col-span-2 md:row-span-2"; // Featured OJT 1
    if (index === 3) return "md:col-span-2 lg:col-span-2"; // Wide card 1
    if (index === 6) return "md:col-span-2 md:row-span-2"; // Featured 2
    if (index === 9) return "md:col-span-2 lg:col-span-2"; // Wide card 2
    return "col-span-1 row-span-1";
};

export default function Projects() {
    return (
        <section id="projects" className="py-24 md:py-40 relative z-10 transition-colors">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-violet-400/10 dark:bg-violet-500/10 rounded-full blur-3xl md:blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3 transition-colors" />
            <div className="absolute bottom-0 left-0 w-[40vh] h-[40vh] bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl md:blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/4 transition-colors" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    label="Portfolio"
                    title="Featured Work"
                    subtitle="A curated collection of projects combining intuitive design with robust engineering."
                    labelStyle="badge"
                    className="mb-16 md:mb-24"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(320px,1fr)] md:auto-rows-[340px]"
                >
                    {PROJECTS.map((project, index) => {
                        const Icon = project.icon;

                        return (
                            <motion.article
                                key={project.id}
                                variants={itemVariants}
                                className={`group relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 transition-all duration-500 hover:-translate-y-2 ${project.glow} ${getGridClass(
                                    index
                                )} flex flex-col`}
                            >
                                {/* Minimalist Abstract Background Gradient */}
                                <div className={`absolute inset-0 z-0 bg-gradient-to-br ${project.bgGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />
                                
                                {/* Subtle radial noise/mesh effect */}
                                <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />

                                {/* Giant watermark icon (creates a beautiful brand shape in the background) */}
                                <div className="absolute -bottom-12 -right-12 z-0 opacity-[0.03] md:opacity-[0.02] group-hover:opacity-[0.05] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 ease-out pointer-events-none">
                                    <Icon className="w-96 h-96 text-white" />
                                </div>

                                {/* Top Left Crisp Icon */}
                                <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg group-hover:border-white/20 transition-colors">
                                        <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${project.color}`} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Overlays for depth and readability */}
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 md:opacity-40 md:group-hover:opacity-90 transition-opacity duration-500" />

                                {/* Inner Glow on Hover (Glassmorphism highlight) */}
                                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl" />

                                {/* Content Slide-Up Container */}
                                <div className="absolute inset-0 z-30 flex flex-col justify-end">
                                    <div className="relative p-6 sm:p-8 flex flex-col justify-end translate-y-0 md:translate-y-20 md:group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 md:mb-3 tracking-tight">
                                            {project.title}
                                        </h3>

                                        <div className="flex flex-col gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-75 ease-out">
                                            <p className="text-sm md:text-base text-white/70 line-clamp-2 md:line-clamp-3">
                                                {project.description}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 backdrop-blur-md text-white/90 border border-white/10"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            <a
                                                href={project.link}
                                                className="inline-flex items-center gap-2 text-white font-semibold group/link mt-2 self-start hover:text-white/80 transition-colors"
                                            >
                                                View Project
                                                <span className="bg-white/10 p-1.5 rounded-full group-hover/link:bg-white/20 transition-colors">
                                                    <FiArrowUpRight className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
