// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
    title: string;
    description: string;
    techStack: string[];
    liveUrl: string;
    githubUrl: string;
    gradient: string;
}

export interface TimelineItem {
    title: string;
    organization: string;
    period: string;
    description: string;
    type: "work" | "education" | "certification";
}

// ─── Project Data ─────────────────────────────────────────────────────────────

export const PROJECT_DATA: Project[] = [
    {
        title: "eCash-Disbursement Monitoring System",
        description:
            "A comprehensive financial tracking and liquidity management system designed to streamline disbursement processes, monitor NCA utilization, and ensure real-time fund tracking for DOST 1 Cashier operations",
        techStack: ["PostgreSQL with ORM(Prisma), Express, React, Node.js"],
        liveUrl: "#",
        githubUrl: "#",
        gradient: "from-violet-600 to-indigo-600",
    },
    {
        title: "Record Management System",
        description:
            "An enterprise-grade Record Management and Disbursement Monitoring System developed for regional deployment.",
        techStack: ["PostgreSQL", "Express", "React", "Node.js"],
        liveUrl: "#",
        githubUrl: "#",
        gradient: "from-purple-600 to-pink-600",
    },
];

// ─── Experience Data ──────────────────────────────────────────────────────────

export const EXPERIENCE_DATA: TimelineItem[] = [
    {
        title: "Information Technology Intern",
        organization: "DOST Region 1",
        period: "2025 – 2026",
        description:
            "Developed the Record Management System and Disbursement Monitoring System using the PERN stack. Managed hardware troubleshooting and STARBOOKS installations across multiple devices.",
        type: "work",
    },
    {
        title: "BS Information Technology",
        organization: "Polytechnic College of La Union",
        period: "2022 – 2026",
        description:
            "Fourth-year student specializing in full-stack systems development, database management, and interactive applications.",
        type: "education",
    },
];
