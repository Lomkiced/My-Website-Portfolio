"use client";

import {
    motion,
} from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { CERTIFICATES_DATA } from "@/lib/data";
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
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

function CertificateCard({ certificate }: { certificate: (typeof CERTIFICATES_DATA)[number] }) {
    return (
        <motion.div
            variants={cardVariants}
            className="group relative rounded-3xl overflow-hidden bg-white/60 dark:bg-black/20 border border-neutral-200/50 dark:border-white/5 backdrop-blur-md md:backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-lg hover:shadow-[0_8px_30px_rgba(217,70,239,0.12)] dark:hover:shadow-[0_0_40px_rgba(217,70,239,0.15)] transition-all hover:-translate-y-2 duration-500 will-change-transform flex flex-col h-full"
        >
            {/* Spotlight overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Glowing Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content Container */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full bg-transparent">

                {/* Header: Icon & Date */}
                <div className="flex justify-between items-start mb-6 gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center shadow-inner border border-fuchsia-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <FiAward size={24} />
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/80 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 border border-neutral-200/50 dark:border-white/5 backdrop-blur-md shadow-sm whitespace-nowrap">
                        {certificate.date}
                    </span>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display tracking-tight group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors duration-300">
                        {certificate.title}
                    </h3>
                    <p className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 mb-1">
                        {certificate.issuer}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
                        {certificate.description}
                    </p>
                </div>

                {/* Footer Link */}
                {certificate.credentialUrl && certificate.credentialUrl !== "#" ? (
                    <div className="pt-6 mt-6 border-t border-neutral-200/60 dark:border-white/10">
                        <MagneticButton
                            href={certificate.credentialUrl}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100/50 dark:bg-white/5 text-neutral-700 dark:text-white text-sm font-semibold border border-neutral-200/60 dark:border-white/10 hover:bg-neutral-200/50 dark:hover:bg-white/10 shadow-sm transition-colors group/btn"
                        >
                            View Credential
                            <FiExternalLink className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </MagneticButton>
                    </div>
                ) : (
                    <div className="pt-6 mt-6 border-t border-neutral-200/60 dark:border-white/10">
                        {/* Placeholder to keep alignment if needed, or simply empty. We'll use a subtle disabled look */}
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-transparent text-neutral-400 dark:text-neutral-600 text-sm font-semibold border border-transparent cursor-default">
                            Verified Digitally
                        </div>
                    </div>
                )}
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr"
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
