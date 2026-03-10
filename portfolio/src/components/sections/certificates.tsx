"use client";

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform
} from "framer-motion";
import Image from "next/image";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { CERTIFICATES_DATA } from "@/lib/data";
import SectionTitle from "@/components/animations/section-title";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

function CertificateCard({ certificate }: { certificate: (typeof CERTIFICATES_DATA)[number] }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            variants={cardVariants}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative rounded-3xl bg-white/60 dark:bg-black/20 border border-neutral-200/50 dark:border-white/5 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-lg h-[460px] w-full hover:shadow-[0_8px_30px_rgba(217,70,239,0.12)] dark:hover:shadow-[0_0_40px_rgba(217,70,239,0.15)] transition-shadow duration-500 will-change-transform"
        >
            {/* Base Layer */}
            <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fuchsia-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none"
                style={{ transform: "translateZ(0px)" }}
            >
                {/* Glowing Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Main Content Container */}
            <div
                className="relative z-10 p-6 sm:p-8 flex flex-col h-full pointer-events-none transition-all duration-500 group-hover:-translate-y-6 group-hover:opacity-10 dark:group-hover:opacity-20"
                style={{ transform: "translateZ(40px)" }}
            >
                {/* Header: Icon & Date */}
                <div className="flex justify-between items-start mb-6 gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center shadow-inner border border-fuchsia-500/20">
                        <FiAward size={24} />
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/80 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 border border-neutral-200/50 dark:border-white/5 backdrop-blur-md shadow-sm whitespace-nowrap">
                        {certificate.date}
                    </span>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display tracking-tight">
                        {certificate.title}
                    </h3>
                    <p className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 mb-1">
                        {certificate.issuer}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1 line-clamp-4">
                        {certificate.description}
                    </p>
                </div>
            </div>

            {/* 3D Pop-up Image Wrapper */}
            <div
                className="absolute inset-0 flex items-end justify-center rounded-3xl overflow-hidden pointer-events-none"
                style={{ transform: "translateZ(80px)" }}
            >
                <div className="relative w-[85%] h-[55%] mb-6 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/20 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-auto">
                    <Image
                        src={certificate.imageUrl || "/eCash.png"}
                        fill
                        className="object-cover"
                        alt={certificate.title}
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Dark gradient overlay to frame the image and highlight button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Outer Credential Link hovering inside the image */}
                    {certificate.credentialUrl && certificate.credentialUrl !== "#" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <a
                                href={certificate.credentialUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-5 py-2.5 rounded-xl bg-white/20 text-white text-sm font-semibold border border-white/30 backdrop-blur-md shadow-xl flex items-center gap-2 hover:bg-white/30 transition-colors"
                            >
                                View Credential
                                <FiExternalLink />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function Certificates() {
    return (
        <section id="certificates" className="py-24 md:py-32 relative overflow-hidden bg-neutral-50/30 dark:bg-[#030303]">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-fuchsia-400/10 dark:bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-400/10 dark:bg-pink-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    label="Achievements"
                    title="Certifications"
                    subtitle="Professional validations and continuous learning milestones."
                    className="mb-16 md:mb-20"
                />

                {/* Certificates Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr [perspective:1000px]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {CERTIFICATES_DATA.map((cert) => (
                        <CertificateCard key={cert.title} certificate={cert} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
