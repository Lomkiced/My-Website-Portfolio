// ─── Types ────────────────────────────────────────────────────────────────────

export interface PortalProject {
  id: string;
  title: string;
  client?: string;
  summary: string;
  description: string;
  techStack: string[];
  role: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: "work" | "education" | "teaching";
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

// ─── Skills Data ──────────────────────────────────────────────────────────────

export interface SkillGroup {
  category: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Core Stack",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
  },
  {
    category: "Backend & Data",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Laravel",
      "PHP",
      "Supabase",
      "Prisma",
      "PostgreSQL",
    ],
  },
  {
    category: "State & Data-Fetching",
    items: ["TanStack Query", "Zustand", "Redux", "Recoil"],
  },
  {
    category: "Mobile Development",
    items: ["React Native", "Expo"],
  },
  {
    category: "Tooling & Workflow",
    items: [
      "Docker",
      "Vercel",
      "GSAP",
      "Framer Motion",
      "Shadcn/UI",
      "Git",
    ],
  },
  {
    category: "AI-Agentic Coding",
    items: ["Antigravity", "Claude Code", "Google Stitch"],
  },
];

// ─── Project Data ─────────────────────────────────────────────────────────────

export const PORTAL_PROJECTS: PortalProject[] = [
  {
    id: "ecash",
    title: "eCash",
    client: "DOST Region 1",
    summary: "Disbursement Monitoring System for government financial tracking",
    description:
      "Collaborated on the design and development of a comprehensive Disbursement Monitoring System during internship at the Department of Science and Technology (DOST) Region 1. Tracks and manages financial disbursements securely with real-time updates via WebSockets, automated background tasks, downloadable Excel reporting, and a fully containerized Docker deployment.",
    techStack: ["PostgreSQL", "Prisma", "Express", "React", "Node.js", "Docker"],
    role: "Full-Stack Developer (Intern)",
    liveUrl: "https://ecash.dost1.ph",
    githubUrl: "https://github.com/Lomkiced",
  },
  {
    id: "kip",
    title: "KIP",
    client: "DOST Region 1",
    summary: "Record Management System — digitizing government document archiving",
    description:
      "Designed and developed a comprehensive Record Management System (Keeping Information Permanently) for the Department of Science and Technology Ilocos Region. Digitizes and secures the agency's document archiving process with role-based access control, secure file uploads, interactive data dashboards, and containerized Docker deployment.",
    techStack: ["PostgreSQL", "Express", "React", "Node.js", "Docker"],
    role: "Full-Stack Developer (Intern)",
    liveUrl: "https://kip.dost1.ph",
    githubUrl: "https://github.com/Lomkiced",
  },
  {
    id: "arms",
    title: "ARMS",
    client: "Polytechnic College of La Union",
    summary: "Accreditation Record Management System — 11 modules, Admin/Faculty roles",
    description:
      "Accreditation Record Management System (ARMS) built for PCLU to handle compliance documents securely and efficiently. Features 11 interconnected modules covering all accreditation areas, with separate Admin and Faculty role dashboards, document versioning, and automated compliance tracking.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    role: "Lead Developer",
    liveUrl: "https://accreditation-record-management-sys.vercel.app/",
    githubUrl: "https://github.com/Lomkiced",
  },
  {
    id: "lms",
    title: "Library Management System",
    client: "Polytechnic College of La Union",
    summary: "Full-stack digital library with QR/barcode scanning and self-service kiosk",
    description:
      "Engineered a comprehensive Library Management System for PCLU. Modernizes library operations with a dynamic digital catalog, automated circulation tracking, real-time email notifications, Google Books API integration for instant cataloging, built-in QR/barcode scanning, and a dedicated self-service kiosk mode.",
    techStack: ["Laravel", "React", "Docker", "Google Books API"],
    role: "Full-Stack Developer",
  },
  {
    id: "edushare",
    title: "EduShare",
    client: "Academic Project",
    summary: "Collaborative learning resource exchange platform",
    description:
      "A Collaborative Learning Resource Exchange Platform enabling students and educators to share materials seamlessly. Features include resource upload and categorization, peer reviews, real-time collaboration tools, and a responsive mobile-first design.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
    liveUrl: "https://edu-share-delta.vercel.app/login",
  },
  {
    id: "farmflow",
    title: "FarmFlow",
    client: "Agoo, La Union",
    summary: "Agricultural PWA marketplace for farm operations management",
    description:
      "Agricultural Operations Management System for optimizing farm activities, supply chain, and harvest yields. Progressive Web App with offline support, marketplace features, and mobile-optimized workflows for farmers and buyers.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
    liveUrl: "https://farm-flow-agoo.vercel.app/",
  },
  {
    id: "aicts",
    title: "Alumni Information Career Tracking",
    client: "Academic Project",
    summary: "Comprehensive platform to track alumni career paths and outcomes",
    description:
      "A comprehensive platform to track alumni career paths, outcomes, and maintain active engagement with graduates. Features include alumni profiles, career tracking dashboards, survey tools, and engagement analytics.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
    liveUrl: "https://alumni-information-career-tracking.vercel.app/login",
  },
  {
    id: "carelink",
    title: "CareLink",
    client: "Academic Project",
    summary: "Senior Citizen Assistance Management System",
    description:
      "A Senior Citizen Assistance Management System facilitating efficient care, support distribution, and resource allocation for elderly community members.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
  },
  {
    id: "fixtrack",
    title: "FixTrack",
    client: "Academic Project",
    summary: "Maintenance request monitoring and resolution tracking",
    description:
      "Maintenance Request Monitoring System for streamlined tracking, assignment, and resolution of facility issues. Includes request submission, priority assignment, technician dispatch, and resolution analytics.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
  },
  {
    id: "qrvents",
    title: "QRVents",
    client: "Academic Project",
    summary: "QR-based event registration and attendance system",
    description:
      "A QR-Based Event Registration and Attendance System ensuring fast check-ins and seamless event management. Generates unique QR codes for each registrant and provides real-time attendance analytics.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
  },
  {
    id: "rhu",
    title: "RHU Online Appointment",
    client: "Government Project",
    summary: "Rural Health Unit remote booking and patient scheduling",
    description:
      "Rural Health Unit Online Appointment System facilitating remote booking and organized patient scheduling for community health services.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
  },
];

// ─── Experience Data ──────────────────────────────────────────────────────────

export const EXPERIENCE_DATA: TimelineItem[] = [
  {
    title: "Freelance Full Stack Developer",
    organization: "Self-Employed",
    period: "Present",
    description:
      "Developing websites, web applications, software systems, and mobile applications for various clients. Specializing in Next.js, Supabase, and Prisma-based solutions.",
    type: "work",
  },
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
      "Top 1 Dean's Lister",
      "Best in Thesis",
      "Best in Oral Defense",
      "Best in Programming",
      "Creative Media Award",
      "Most Innovative Capstone Project Award",
      "Excellence Awardee as Intern in Information Technology",
    ],
  },
  {
    title: "Mathematics & English Teacher",
    organization: "Pakdeepan Kindergarten School",
    period: "2026 - Present",
    description:
      "Taught Mathematics and English to Primary 1–6 students. Developed lesson plans, managed classroom activities, and assessed student progress.",
    type: "teaching",
  },
];

// ─── Certificates Data ───────────────────────────────────────────────────────

export const CERTIFICATES_DATA: Certificate[] = [
  {
    title: "Technical Intern Certification",
    issuer: "micro1",
    date: "March 20, 2026",
    description:
      "Successfully passed micro1's AI Interview and officially certified as a Technical Intern.",
    credentialUrl: "https://micro1.ai/apply-as-talent",
    imageUrl: "/micro1.jpg",
  },
  {
    title: "Top 1 Dean's Lister — BS Information Technology",
    issuer: "Polytechnic College of La Union",
    date: "1st Sem, AY 2024-2025",
    description:
      "Awarded for exemplary academic performance and outstanding achievement, ranking Top 1 in the Bachelor of Science in Information Technology program with a General Average of 93%.",
    imageUrl: "/DN1.jpg",
  },
  {
    title: "Certificate of Completion — IT Internship",
    issuer: "Department of Science and Technology (DOST) Region 1",
    date: "March 2026",
    description:
      "Awarded for the successful completion of the Information Technology internship program. Recognized for significant technical contributions to the engineering and deployment of the regional Disbursement Monitoring System and Record Management System.",
    imageUrl: "/dostc1.jpg",
  },
  {
    title: "Best in Oral Defense",
    issuer: "Polytechnic College of La Union",
    date: "April 10, 2026",
    description:
      "Awarded for the capstone project titled 'SUNERGY HUB: An Arduino-Based Smart Solar Charging Station for Polytechnic College of La Union'.",
    imageUrl: "/BOD.jpg",
  },
  {
    title: "Creative Media Award",
    issuer: "Polytechnic College of La Union",
    date: "April 10, 2026",
    description:
      "Awarded in recognition of outstanding creativity and dedication in the fields of multimedia design, video editing, and event organization.",
    imageUrl: "/CMA.jpg",
  },
  {
    title: "Most Innovative Capstone Project Award",
    issuer: "Polytechnic College of La Union",
    date: "April 10, 2026",
    description:
      "Awarded for the capstone project titled 'SUNERGY HUB: An Arduino-Based Smart Solar Charging Station for Polytechnic College of La Union'.",
    imageUrl: "/BOC.jpg",
  },
  {
    title: "Excellence Awardee as Intern in Information Technology",
    issuer: "Polytechnic College of La Union",
    date: "April 10, 2026",
    description:
      "Awarded for exemplary performance of assigned tasks as an Intern in a government agency.",
    imageUrl: "/BII.jpg",
  },
  {
    title: "Best in Programming",
    issuer: "Polytechnic College of La Union",
    date: "April 10, 2026",
    description:
      "Awarded for exemplary programming skills, discipline, technical skills, and creative outputs proving worth as a promising programmer in the IT industry.",
    imageUrl: "/BIP.jpg",
  },
  {
    title: "Best in Thesis",
    issuer: "Polytechnic College of La Union",
    date: "April 10, 2026",
    description:
      "Awarded for the capstone project titled 'SUNERGY HUB: An Arduino-Based Smart Solar Charging Station for Polytechnic College of La Union'.",
    imageUrl: "/BIT.jpg",
  },
];
