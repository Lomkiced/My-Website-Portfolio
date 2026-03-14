"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiAward, FiExternalLink, FiX, FiCalendar } from "react-icons/fi";
import { CERTIFICATES_DATA, type Certificate } from "@/lib/data";
import SectionTitle from "@/components/animations/section-title";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring" as const, bounce: 0.3 } }
};

export default function Certificates() {
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedCert(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedCert]);

    return (
        <section id="certificates" className="py-24 md:py-32 relative overflow-hidden bg-neutral-50/30 dark:bg-[#030303]">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-violet-400/10 dark:bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    label="Achievements"
                    title="Certifications"
                    subtitle="Professional validations and continuous learning milestones."
                    className="mb-16 md:mb-20"
                />

                {/* Certificates Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {CERTIFICATES_DATA.map((cert) => (
                        <motion.div
                            key={cert.title}
                            layoutId={`cert-card-${cert.title}`}
                            variants={cardVariants}
                            onClick={() => setSelectedCert(cert)}
                            className="group relative cursor-pointer w-full aspect-square sm:aspect-auto sm:min-h-[250px] lg:aspect-square rounded-[2rem] overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-neutral-200/60 dark:border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.15)] dark:hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.2)]"
                        >
                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 dark:from-violet-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10 flex flex-col items-center text-center gap-5 w-full">
                                <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    <FiAward size={32} />
                                </div>
                                
                                <motion.h3 
                                    layoutId={`cert-title-${cert.title}`}
                                    className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-display tracking-tight px-2 leading-tight"
                                >
                                    {cert.title}
                                </motion.h3>

                                <div className="mt-2 h-6 overflow-hidden">
                                    <div className="text-sm font-semibold text-violet-600 dark:text-violet-400 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        View Details
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Shared Layout Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedCert(null)}
                        className="fixed inset-0 z-[100] bg-black/30 dark:bg-black/60 backdrop-blur-xl cursor-pointer"
                    />
                )}
                
                {selectedCert && (
                    <motion.div 
                        key="modal-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[101] overflow-y-auto w-full min-h-full pointer-events-none no-scrollbar"
                    >
                        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-12 pb-20">
                            <motion.div
                                layoutId={`cert-card-${selectedCert.title}`}
                                className="relative w-full max-w-5xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] dark:shadow-[0_40px_120px_-20px_rgba(139,92,246,0.2)] flex flex-col md:flex-row pointer-events-auto overflow-hidden"
                            >
                                {/* Close Button — Floating, accessible on all sizes */}
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md hover:bg-white/90 dark:hover:bg-black/70 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-lg z-20 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                                    aria-label="Close modal"
                                >
                                    <FiX size={18} />
                                </button>

                                {/* ─── Left Pane: Interactive Image ─────────────── */}
                                <div className="relative w-full md:w-1/2 min-h-[240px] sm:min-h-[280px] md:min-h-[420px] bg-gradient-to-br from-violet-100/60 via-indigo-50/40 to-purple-100/60 dark:from-violet-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 flex items-center justify-center p-6 sm:p-8 md:p-10 group/img overflow-hidden flex-shrink-0">
                                    {/* Decorative glow behind image */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-3/4 h-3/4 rounded-full bg-violet-400/15 dark:bg-violet-500/10 blur-[60px]" />
                                    </div>

                                    <div className="relative w-full h-full min-h-[200px] sm:min-h-[240px] md:min-h-[360px]">
                                        <Image
                                            src={selectedCert.imageUrl || "/eCash.png"}
                                            fill
                                            className="object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover/img:scale-105"
                                            alt={selectedCert.title}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* ─── Right Pane: Typography & Content ─────────── */}
                                <div className="relative w-full md:w-1/2 px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 flex flex-col justify-center">
                                    {/* Glowing Badges */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.4 }}
                                        className="flex flex-wrap items-center gap-2.5 mb-6"
                                    >
                                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wide rounded-full bg-violet-100/80 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-200/70 dark:border-violet-500/25 shadow-[0_0_12px_rgba(139,92,246,0.15)] dark:shadow-[0_0_12px_rgba(139,92,246,0.25)]">
                                            <FiCalendar size={13} />
                                            {selectedCert.date}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wide rounded-full bg-indigo-100/80 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-500/25 shadow-[0_0_12px_rgba(99,102,241,0.15)] dark:shadow-[0_0_12px_rgba(99,102,241,0.25)]">
                                            <FiAward size={13} />
                                            {selectedCert.issuer}
                                        </span>
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h2 
                                        layoutId={`cert-title-${selectedCert.title}`}
                                        className="text-2xl sm:text-3xl md:text-[2rem] font-bold text-neutral-900 dark:text-white font-display tracking-tight leading-tight mb-5"
                                    >
                                        {selectedCert.title}
                                    </motion.h2>

                                    {/* Description */}
                                    <motion.p 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                        className="text-sm sm:text-[0.95rem] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8"
                                    >
                                        {selectedCert.description}
                                    </motion.p>

                                    {/* Verify Button */}
                                    {selectedCert.credentialUrl && selectedCert.credentialUrl !== "#" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.4 }}
                                        >
                                            <a
                                                href={selectedCert.credentialUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group/btn inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-neutral-900 dark:bg-white/10 border border-transparent dark:border-white/15 text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.4)] dark:shadow-[0_10px_25px_-8px_rgba(255,255,255,0.08)] hover:bg-neutral-800 dark:hover:bg-white dark:hover:text-black hover:shadow-[0_15px_35px_-8px_rgba(139,92,246,0.35)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                                            >
                                                <span>Verify Credential</span>
                                                <FiExternalLink size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                            </a>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
