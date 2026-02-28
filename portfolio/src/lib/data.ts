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
        title: "eCash - Disbursement Monitoring System | Department of Science and Technology Region 1",
        description:
            "Engineered a comprehensive Disbursement Monitoring System during my internship at the Department of Science and Technology (DOST) Region 1. Developed using a modern stack featuring React, TailwindCSS, Node.js, Express, and PostgreSQL, this system tracks and manages financial disbursements securely. Key features include real-time updates via WebSockets, automated background tasks, downloadable Excel reporting, and a fully containerized Docker deployment leveraging an Nginx web server.",
        techStack: ["PostgreSQL", "Prisma", "Express", "React", "Node.js"],
        liveUrl: "#",
        githubUrl: "#",
        gradient: "from-violet-600 to-indigo-600",
    },
    {
        title: "KIP - Record Management System | Department of Science and Technology Region 1",
        description:
            "KIP (Keeping Information Permanently)\n\nDesigned and developed a comprehensive Record Management System for the Department of Science and Technology (DOST) Ilocos Region. Built on the PERN stack (PostgreSQL, Express, React, Node.js), this system digitizes and secures the agency's document archiving process. It features role-based access control, secure file uploads, interactive data dashboards using Recharts, and is fully containerized using Docker for scalable deployment.",
        techStack: ["PostgreSQL", "Express", "React", "Node.js"],
        liveUrl: "#",
        githubUrl: "#",
        gradient: "from-purple-600 to-pink-600",
    },
    {
        title: "Institutional Library Management System | Polytechnic College of La Union",
        description:
            "Engineered a comprehensive, full-stack Library Management System for the Polytechnic College of La Union (PCLU). Built with Laravel and React, this system modernizes library operations by offering a dynamic digital catalog, automated circulation tracking, and real-time email notifications for overdue assets. Key features include an automated Google Books API integration for instant cataloging, built-in QR/barcode scanning for streamlined checkouts, a dedicated self-service kiosk mode, and containerized Docker deployment.",
        techStack: ["Laravel", "React", "Docker", "Google Books API"],
        liveUrl: "#",
        githubUrl: "#",
        gradient: "from-blue-600 to-cyan-600",
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
