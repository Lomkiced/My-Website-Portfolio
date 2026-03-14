// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
    title: string;
    description: string;
    techStack: string[];
    liveUrl: string;
    githubUrl: string;
    gradient: string;
    image?: string;
}

export interface TimelineItem {
    title: string;
    organization: string;
    period: string;
    description: string;
    type: "work" | "education" | "certification";
}

export interface Certificate {
    title: string;
    issuer: string;
    date: string;
    description: string;
    imageUrl?: string;
    credentialUrl?: string;
}

// ─── Project Data ─────────────────────────────────────────────────────────────

export const PROJECT_DATA: Project[] = [
    {
        title: "eCash - Disbursement Monitoring System | Department of Science and Technology Region 1",
        description:
            "Collaborated on the design and development of a comprehensive Disbursement Monitoring System during my internship at the Department of Science and Technology (DOST) Region 1. Developed using a modern stack featuring React, TailwindCSS, Node.js, Express, and PostgreSQL, this system tracks and manages financial disbursements securely. Key features include real-time updates via WebSockets, automated background tasks, downloadable Excel reporting, and a fully containerized Docker deployment leveraging an Nginx web server.",
        techStack: ["PostgreSQL", "Prisma", "Express", "React", "Node.js"],
        liveUrl: "https://ecash.dost1.ph",
        githubUrl: "https://github.com/Lomkiced",
        gradient: "from-violet-600 to-indigo-600",
        image: "/ecash.png",
    },
    {
        title: "KIP - Record Management System | Department of Science and Technology Region 1",
        description:
            "KIP (Keeping Information Permanently)\n\nDesigned and developed a comprehensive Record Management System for the Department of Science and Technology (DOST) Ilocos Region. Built on the PERN stack (PostgreSQL, Express, React, Node.js), this system digitizes and secures the agency's document archiving process. It features role-based access control, secure file uploads, interactive data dashboards using Recharts, and is fully containerized using Docker for scalable deployment.",
        techStack: ["PostgreSQL", "Express", "React", "Node.js"],
        liveUrl: "https://kip.dost1.ph",
        githubUrl: "https://github.com/Lomkiced",
        gradient: "from-purple-600 to-pink-600",
        image: "/kip.png",
    },
    {
        title: "Institutional Library Management System | Polytechnic College of La Union",
        description:
            "Engineered a comprehensive, full-stack Library Management System for the Polytechnic College of La Union (PCLU). Built with Laravel and React, this system modernizes library operations by offering a dynamic digital catalog, automated circulation tracking, and real-time email notifications for overdue assets. Key features include an automated Google Books API integration for instant cataloging, built-in QR/barcode scanning for streamlined checkouts, a dedicated self-service kiosk mode, and containerized Docker deployment.",
        techStack: ["Laravel", "React", "Docker", "Google Books API"],
        liveUrl: "#",
        githubUrl: "https://github.com/Lomkiced",
        gradient: "from-blue-600 to-cyan-600",
        image: "/lms.png",
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

// ─── Certificates Data ───────────────────────────────────────────────────────

export const CERTIFICATES_DATA: Certificate[] = [
    {
        title: "Top 1 Dean's Lister - BS Information Technology",
        issuer: "Polytechnic College of La Union",
        date: "1st Sem, AY 2024-2025",
        description: "Awarded for exemplary academic performance and outstanding achievement, ranking Top 1 in the Bachelor of Science in Information Technology program with a General Average of 93%.",
        credentialUrl: "#",
        imageUrl: "/DN1.jpg"
    },
    {
        title: "Certificate of Completion - IT Internship",
        issuer: "Department of Science and Technology (DOST) Region 1",
        date: "March 2026",
        description: "Awarded for the successful completion of the Information Technology internship program. Recognized for significant technical contributions to the engineering and deployment of the regional Disbursement Monitoring System and Record Management System using the PERN stack.",
        credentialUrl: "#",
        imageUrl: "/dostc1.jpg"
    },
    {
        title: "AWS Certified Solutions Architect - Associate",
        issuer: "Amazon Web Services (AWS)",
        date: "Jan 2025",
        description: "Validated expertise in designing distributed systems on AWS, encompassing compute, networking, storage, and database services.",
        credentialUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "React Native Specialist",
        issuer: "Meta (Coursera)",
        date: "Nov 2024",
        description: "Demonstrated proficiency in building cross-platform mobile applications using React Native, including navigation, state management, and API integration.",
        credentialUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Full-Stack Web Development Boot-camp",
        issuer: "Udemy",
        date: "Aug 2024",
        description: "Intensive training covering the MERN stack (MongoDB, Express, React, Node.js), encompassing frontend UI creation, backend RESTful APIs, and database management.",
        credentialUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
    }
];
