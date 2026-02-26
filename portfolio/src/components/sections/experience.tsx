"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiAward, FiBookOpen } from "react-icons/fi";

interface TimelineItem {
    title: string;
    organization: string;
    period: string;
    description: string;
    type: "work" | "education" | "certification";
}

const timelineData: TimelineItem[] = [
    {
        title: "Full Stack Developer",
        organization: "Freelance / Personal Projects",
        period: "2024 – Present",
        description:
            "Building full-stack applications using Next.js, NestJS, and Prisma. Developing scalable architectures with modern frontend frameworks and backend services.",
        type: "work",
    },
    {
        title: "BS Information Technology",
        organization: "University",
        period: "2020 – 2024",
        description:
            "Completed a comprehensive program in Information Technology with focus on software development, database management, and systems design.",
        type: "education",
    },
    {
        title: "Web Development Intern",
        organization: "Tech Company",
        period: "2023",
        description:
            "Contributed to frontend and backend development of web applications. Gained hands-on experience with React, Node.js, and database management.",
        type: "work",
    },
    {
        title: "Certification Placeholder",
        organization: "Certification Provider",
        period: "2023",
        description:
            "Earned certification in a relevant technology or framework. Details to be updated.",
        type: "certification",
    },
];

const getIcon = (type: string) => {
    switch (type) {
        case "work":
            return FiBriefcase;
        case "education":
            return FiBookOpen;
        case "certification":
            return FiAward;
        default:
            return FiBriefcase;
    }
};

export default function Experience() {
    return (
        <section
            id="experience"
            className="py-20 md:py-32 relative overflow-hidden"
        >
            {/* Background accent */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-sm font-semibold text-violet-500 dark:text-violet-400 uppercase tracking-widest">
                        Experience
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-display mt-3">
                        My Journey
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
                        A timeline of my professional experience, education, and
                        certifications
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-indigo-500/30 to-transparent md:-translate-x-px" />

                    <div className="space-y-8 md:space-y-12">
                        {timelineData.map((item, index) => {
                            const Icon = getIcon(item.type);
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                    initial={{
                                        opacity: 0,
                                        x: isLeft ? -40 : 40,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 z-10">
                                        <Icon className="w-3.5 h-3.5 text-white" />
                                    </div>

                                    {/* Content card */}
                                    <div
                                        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                                            }`}
                                    >
                                        <motion.div
                                            className="glass-card p-6 hover:border-violet-500/30 hover:shadow-lg transition-all"
                                            whileHover={{ y: -2 }}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <span
                                                    className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${item.type === "work"
                                                            ? "bg-blue-500/10 text-blue-500"
                                                            : item.type === "education"
                                                                ? "bg-green-500/10 text-green-500"
                                                                : "bg-amber-500/10 text-amber-500"
                                                        }`}
                                                >
                                                    {item.type.charAt(0).toUpperCase() +
                                                        item.type.slice(1)}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {item.period}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold font-display text-foreground">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm font-medium text-violet-600 dark:text-violet-400 mb-2">
                                                {item.organization}
                                            </p>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
