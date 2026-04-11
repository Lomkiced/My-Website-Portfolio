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
    awards?: string[];
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
        image: "/eCash.png",
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
        title: "Technical Intern",
        organization: "Department of Science and Technology Ilocos Region",
        period: "2025 – 2026",
        description:
            "Developed the Record Management System and Disbursement Monitoring System using the PERN stack. Managed hardware troubleshooting and STARBOOKS installations across multiple devices.",
        type: "work",
    },
    {
        title: "BS Information Technology",
        organization: "Polytechnic College of La Union",
        period: "Graduated March 28, 2026",
        description:
            "Completed the degree with honors, demonstrating excellence in capstone projects, academic performance, and technical proficiency.",
        type: "education",
        awards: [
            "Best in Thesis",
            "Best in Oral Defense",
            "Best in Programming",
            "Creative Media Award",
            "Most Innovative Capstone Project Award",
            "Excellence Awardee as Intern in Information Technology"
        ]
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
        title: "Best in Oral Defense",
        issuer: "Polytechnic College of La Union",
        date: "April 10, 2026",
        description: "Awarded for the capstone project titled 'SUNERGY HUB: An Arduio-Based Smart Solar Charging Station for Polytechnic College of La Union'.",
        credentialUrl: "#",
        imageUrl: "/BOD.jpg"
    },
    {
        title: "Creative Media Award",
        issuer: "Polytechnic College of La Union",
        date: "April 10, 2026",
        description: "Awarded in recognition of outstanding creativity and dedication in the fields of multimedia design, video editing, and event organization, enhancing BSIT departmental activities.",
        credentialUrl: "#",
        imageUrl: "/CMA.jpg"
    },
    {
        title: "Most Innovative Capstone Project Award",
        issuer: "Polytechnic College of La Union",
        date: "April 10, 2026",
        description: "Awarded for the capstone project titled 'SUNERGY HUB: An Arduio-Based Smart Solar Charging Station for Polytechnic College of La Union'.",
        credentialUrl: "#",
        imageUrl: "/BOC.jpg"
    },
    {
        title: "Excellence Awardee as Intern in Information Technology",
        issuer: "Polytechnic College of La Union",
        date: "April 10, 2026",
        description: "Awarded for exemplary performance of assigned tasks as an Intern in a government agency.",
        credentialUrl: "#",
        imageUrl: "/BII.jpg"
    },
    {
        title: "Best in Programming",
        issuer: "Polytechnic College of La Union",
        date: "April 10, 2026",
        description: "Awarded for exemplary programming skills, discipline, technical skills, and creative outputs proving worth as a promising programmer in the IT industry.",
        credentialUrl: "#",
        imageUrl: "/BIP.jpg"
    },
    {
        title: "Best in Thesis",
        issuer: "Polytechnic College of La Union",
        date: "April 10, 2026",
        description: "Awarded for the capstone project titled 'SUNERGY HUB: An Arduio-Based Smart Solar Charging Station for Polytechnic College of La Union'.",
        credentialUrl: "#",
        imageUrl: "/BIT.jpg"
    }
];
