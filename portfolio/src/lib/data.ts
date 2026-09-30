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
  {
    category: "Hardware & Infrastructure",
    items: [
      "Hardware Troubleshooting",
      "System Assembly",
      "Network Setup",
      "STARBOOKS Deployment",
      "OS Configuration",
    ],
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
    client: "Client Project",
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
    client: "Client Project",
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
    client: "Client Project",
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
    client: "Client Project",
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
    client: "Client Project",
    summary: "Senior Citizen Assistance Management System",
    description:
      "A Senior Citizen Assistance Management System facilitating efficient care, support distribution, and resource allocation for elderly community members.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
  },
  {
    id: "fixtrack",
    title: "FixTrack",
    client: "Client Project",
    summary: "Maintenance request monitoring and resolution tracking",
    description:
      "Maintenance Request Monitoring System for streamlined tracking, assignment, and resolution of facility issues. Includes request submission, priority assignment, technician dispatch, and resolution analytics.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
  },
  {
    id: "qrvents",
    title: "QRVents",
    client: "Client Project",
    summary: "QR-based event registration and attendance system",
    description:
      "A QR-Based Event Registration and Attendance System ensuring fast check-ins and seamless event management. Generates unique QR codes for each registrant and provides real-time attendance analytics.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
  },
  {
    id: "rhu",
    title: "RHU Online Appointment",
    client: "Client Project",
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
    title: "Mathematics, English & Computer Science Teacher",
    organization: "Pakdeepan Kindergarten School",
    period: "2026 - Present",
    description:
      "Taught Mathematics, English, and Computer Science to Primary 1–6 students. Developed lesson plans, managed classroom activities, and assessed student progress.",
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

// ─── Blog Data ───────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  imageUrl?: string;
  content?: string[]; // Paragraphs
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "ambition-experience-world",
    title: "My real ambition is to experience as much of the world as I possibly can.",
    date: "Sep 29, 2026",
    readTime: "3 min",
    summary: "The older I get, the more I realize that this is probably the ambition that feels most true to me. I don’t want my entire life to be measured by how much money I made...",
    imageUrl: "/POST1.jpg",
    content: [
      "The older I get, the more I realize that this is probably the ambition that feels most true to me.",
      "I don't want my entire life to be measured by how much money I made, how many things I owned, or how impressive my job title sounded. Of course, I want to build a good life and become successful—but I also want to live.",
      "I want to wake up in places I've never seen before. Walk through streets where I don't know anyone. Try food I've never tasted. Learn languages, meet people with completely different stories, and understand cultures that are different from my own.",
      "I want to see mountains, oceans, old cities, quiet villages, crowded streets, and everything in between. I want to collect experiences instead of just possessions.",
      "Maybe one day I'll look back and realize that I didn't have the most luxurious life, or that I didn't accomplish everything I once planned. But if I can say that I explored, learned, loved, struggled, grew, and experienced as much of this world as I possibly could—I think I'll be at peace with that.",
      "Because for me, life isn't just about finding a place to settle.",
      "It's about seeing how far life can take me."
    ]
  },
  {
    id: "jack-of-all-trades",
    title: "𝗝𝗮𝗰𝗸 𝗼𝗳 𝗔𝗹𝗹 𝗧𝗿𝗮𝗱𝗲𝘀, 𝗠𝗮𝘀𝘁𝗲𝗿 𝗼𝗳 𝗡𝗼𝗻𝗲, 𝗕𝘂𝘁 𝗢𝗳𝘁𝗲𝗻 𝗕𝗲𝘁𝘁𝗲𝗿 𝗧𝗵𝗮𝗻 𝗮 𝗠𝗮𝘀𝘁𝗲𝗿 𝗼𝗳 𝗢𝗻𝗲",
    date: "Sep 29, 2026",
    readTime: "4 min",
    summary: "They called me a jack of all trades. I could write a poem, design a poster, speak in front of a crowd, fix a broken presentation, create exceptional artwork...",
    imageUrl: "/POST2.jpg",
    content: [
      "They called me a jack of all trades.",
      "I could write a poem, design a poster, speak in front of a crowd, fix a broken presentation, create exceptional artwork, learn a new skill overnight, and somehow find a way to make things work. I became the person people called whenever they needed something done.",
      "At first, I wore the title like a crown.",
      "Then, slowly, it became a question.",
      "What am I actually good at?",
      "I watched others become experts. My classmate had a voice that could fill a room. My friend could paint emotions with a single stroke. Someone else could write stories that made people forget they were reading. Even a kid in ballet danced gracefully. They knew exactly what they wanted to be.",
      "And me?",
      "I knew a little about everything, yet sometimes, that felt like knowing nothing at all.",
      "It hurts in a subtle way—being recognized yet feeling a void. Applauded, yet hearing nothing.",
      "No one calls me a failure. No one tells me I am incapable.",
      "Instead, they say, “You can do anything.”",
      "And somehow, those words were meant to comfort, yet they only reminded me of what I lacked.",
      "Because if I can do anything, why do I feel like I have accomplished nothing?",
      "I have gathered pieces of so many skills. I joined many events, participated in many activities, and poured my soul into everything, but none of them became a masterpiece. I became a collection of unfinished attempts—a person who knows enough to begin, but never enough to feel worthy of calling something my own.",
      "𝙊𝙣 𝙩𝙝𝙚 𝙤𝙩𝙝𝙚𝙧 𝙝𝙖𝙣𝙙, 𝙬𝙝𝙚𝙣 𝙩𝙝𝙚 𝙨𝙠𝙞𝙚𝙨 𝙖𝙧𝙚 𝙗𝙡𝙪𝙚 𝙖𝙣𝙙 𝙄 𝙖𝙢 𝙞𝙣 𝙗𝙡𝙞𝙨𝙨, 𝙄 𝙤𝙪𝙜𝙝𝙩 𝙩𝙤 𝙩𝙝𝙞𝙣𝙠 𝙩𝙝𝙖𝙩 𝙥𝙚𝙧𝙝𝙖𝙥𝙨 𝙗𝙚𝙞𝙣𝙜 𝙖 𝙟𝙖𝙘𝙠 𝙤𝙛 𝙖𝙡𝙡 𝙩𝙧𝙖𝙙𝙚𝙨 𝙞𝙨 𝙣𝙤𝙩 𝙖𝙨 𝙪𝙣𝙛𝙤𝙧𝙩𝙪𝙣𝙖𝙩𝙚 𝙖𝙨 𝙞𝙩 𝙨𝙚𝙚𝙢𝙨. 𝙄 𝙨𝙤𝙢𝙚𝙝𝙤𝙬 𝙗𝙚𝙜𝙞𝙣 𝙩𝙤 𝙨𝙚𝙚 𝙞𝙩 𝙛𝙧𝙤𝙢 𝙖𝙣𝙤𝙩𝙝𝙚𝙧 𝙥𝙚𝙧𝙨𝙥𝙚𝙘𝙩𝙞𝙫𝙚.",
      "𝙅𝙖𝙘𝙠 𝙖𝙡𝙡 𝙩𝙧𝙖𝙙𝙚𝙨, 𝙢𝙖𝙨𝙩𝙚𝙧 𝙤𝙛 𝙣𝙤𝙣𝙚, 𝙗𝙪𝙩 𝙤𝙛𝙩𝙚𝙣 𝙗𝙚𝙩𝙩𝙚𝙧 𝙩𝙝𝙖𝙣 𝙖 𝙢𝙖𝙨𝙩𝙚𝙧 𝙤𝙛 𝙣𝙤𝙣𝙚.",
      "Knowing a little about many things means being able to adapt, learn, and take on challenges that others might not. Perhaps I do not need to master just one thing to prove that I am capability of something.",
      "However, when I am inside a dark room, alone with the silence of the night and the weight of questionable thoughts, I wonder if this is what it truly means to be a jack of all trades.",
      "To always be capable, but never exceptional.",
      "To know many paths, yet have no place that feels like home.",
      "And sometimes, when everyone else seems to have found the one thing they were born to do, I quietly wonder—Will I always be someone who knows a little about everything, but never enough to finally become something?"
    ]
  },
  {
    id: "life-is-tough",
    title: "Life is tough, but God is good.",
    date: "Sep 29, 2026",
    readTime: "3 min",
    summary: "There are seasons in life when everything feels heavier than it should. When you’re tired, uncertain, disappointed, and quietly fighting battles that nobody else knows about.",
    imageUrl: "/POST3.jpg",
    content: [
      "There are seasons in life when everything feels heavier than it should. When you’re tired, uncertain, disappointed, and quietly fighting battles that nobody else knows about.",
      "Sometimes, you pray and wonder why things aren’t changing. You ask God for answers, but instead, you receive silence. You wonder if you’re still on the right path, if your struggles have a purpose, or if things will ever get better.",
      "But I’m slowly learning that faith isn't about having a life without problems. It’s about trusting God even when you don't understand what He is doing.",
      "Some doors close. Some plans fall apart. Some people leave. Some seasons hurt more than we expected.",
      "And yet, somehow, God continues to provide the strength to take another step.",
      "Looking back, there are things I once prayed for that I didn't receive—and now I'm grateful I didn't. There are things I once considered setbacks that eventually became lessons. There were moments I thought would break me, but somehow, they helped shape me into someone stronger.",
      "I may not understand everything God is doing in my life right now. I may still have questions. I may still struggle.",
      "But I choose to believe that His goodness doesn't disappear just because life becomes difficult.",
      "Life may be tough. The road may be uncertain. The waiting may be painful. But God is still good.",
      "And as long as He gives me another day, I'll keep walking, keep trusting, and keep believing that whatever comes next, I don't have to face it alone. 🤍",
      "“The Lord is close to the brokenhearted and saves those who are crushed in spirit.” — Psalm 34:18"
    ]
  },
  {
    id: "young-man-with-a-vision",
    title: "Just a young man with nothing but a vision and the hunger to make it real.",
    date: "Sep 30, 2026",
    readTime: "3 min",
    summary: "I may not have everything I want right now. I may not have the money, the connections, the perfect circumstances, or a clear map of how everything will unfold. But I have a vision.",
    imageUrl: "/POST4.jpg",
    content: [
      "I may not have everything I want right now. I may not have the money, the connections, the perfect circumstances, or a clear map of how everything will unfold.",
      "But I have a vision.",
      "I know there is a life I want to build, places I want to see, things I want to accomplish, and a version of myself I haven't become yet.",
      "And honestly, that's enough to keep me moving.",
      "I'm learning to be patient with the process. To work quietly when nobody is watching. To keep going when progress feels invisible. To accept that sometimes the journey will be lonely, uncertain, and much harder than I imagined.",
      "There will be people who don't understand the things I dream about. There will be moments when I'll question myself. There will be failures, wrong turns, and days when giving up seems easier.",
      "But I don't want to spend my life wondering **“What if I had tried?”**",
      "So I'll keep learning.",
      "I'll keep working.",
      "I'll keep taking risks.",
      "I'll keep rebuilding when things fall apart.",
      "I don't need to have it all figured out today.",
      "I'm just a young man with a vision, a lot to learn, and an unbelievable hunger to turn that vision into reality.",
      "**Maybe I don't have much right now. But I know where I want to go—and I'm willing to work for it.**",
      "One day, I'll look back at this version of myself and hopefully say:",
      "**“You had no idea how far you were capable of going.”**"
    ]
  },
  {
    id: "confidence-cheat-code",
    title: "It took me 23 years to realize that confidence is the real cheat code to life.",
    date: "Sep 30, 2026",
    readTime: "4 min",
    summary: "For the longest time, I thought I needed to become more successful, more attractive, more experienced, or more accomplished before I could truly believe in myself.",
    imageUrl: "/POST5.jpg",
    content: [
      "For the longest time, I thought I needed to become more successful, more attractive, more experienced, or more accomplished before I could truly believe in myself.",
      "I kept waiting for something outside of me to prove that I was good enough.",
      "But I've slowly realized that confidence doesn't come from having everything figured out.",
      "It comes from knowing that even if things don't go according to plan, you'll be okay.",
      "Confidence is walking into a room without needing everyone to like you.",
      "It's speaking even when your voice shakes.",
      "It's pursuing something even when there's a chance you'll fail.",
      "It's being willing to look stupid while learning something new.",
      "It's saying no without feeling guilty and saying yes without being afraid of what people might think.",
      "It's understanding that rejection doesn't define your worth, failure doesn't define your potential, and someone else's opinion doesn't determine who you are.",
      "The funny thing is, confidence doesn't necessarily make life easier.",
      "It just makes you less afraid to live it.",
      "At 23, I'm realizing that I've spent too much time waiting until I felt ready.",
      "Maybe you never actually feel ready.",
      "Maybe you just have to believe in yourself enough to take the first step—and trust yourself to figure out the rest along the way.",
      "Confidence isn't thinking you're better than everyone else.",
      "It's finally understanding that you don't have to be better than anyone else.",
      "You just have to believe that you are capable of becoming the person you want to be.",
      "And honestly?",
      "That realization might be one of the biggest upgrades I've ever given myself."
    ]
  }
];
