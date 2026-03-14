"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiAward, FiExternalLink, FiX } from "react-icons/fi";
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
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
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
                        className="fixed inset-0 z-[100] bg-white/40 dark:bg-[#030303]/70 backdrop-blur-md cursor-pointer"
                    />
                )}
                
                {selectedCert && (
                    <div 
                        key="modal-wrapper" 
                        className="fixed inset-0 z-[101] overflow-y-auto w-full min-h-full pointer-events-none no-scrollbar"
                    >
                        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-12 pb-20">
                            <motion.div
                                layoutId={`cert-card-${selectedCert.title}`}
                                className="relative w-full max-w-3xl h-auto bg-white dark:bg-[#0a0a0a] rounded-[2rem] sm:rounded-[2.5rem] border border-neutral-200/60 dark:border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_120px_-20px_rgba(139,92,246,0.15)] flex flex-col pointer-events-auto"
                            >
                                {/* Close Button - Floating over image */}
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="absolute top-4 sm:top-6 right-4 sm:right-6 p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md hover:bg-white/80 dark:hover:bg-black/80 text-neutral-900 dark:text-white transition-all shadow-lg z-20 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a]"
                                    aria-label="Close modal"
                                >
                                    <FiX size={20} />
                                </button>

                                {/* Image Header (Cinematic) */}
                                <div className="relative w-full h-56 sm:h-72 md:h-80 bg-neutral-100/50 dark:bg-white/5 flex-shrink-0 flex items-center justify-center p-6 group/img overflow-hidden">
                                    <Image
                                        src={selectedCert.imageUrl || "/eCash.png"}
                                        fill
                                        className="object-contain p-6 sm:p-8 drop-shadow-2xl transition-transform duration-700 ease-out md:group-hover/img:scale-105"
                                        alt={selectedCert.title}
                                        sizes="(max-width: 1024px) 100vw, 800px"
                                        priority
                                    />
                                    {/* Bottom fade gradient linking the image smoothly to the content */}
                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
                                </div>

                                {/* Text Details Section - Scroll-free fluid container */}
                                <div className="relative w-full px-6 sm:px-10 pb-10 sm:pb-12 pt-2 -mt-10 sm:-mt-12 flex flex-col bg-transparent z-10">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
                                            <motion.span 
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 }}
                                                className="inline-flex px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wide rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-500/20 shadow-sm"
                                            >
                                                {selectedCert.date}
                                            </motion.span>
                                            <motion.div 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.15 }}
                                                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wide rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-white/10"
                                            >
                                                <FiAward size={16} />
                                                Issued by {selectedCert.issuer}
                                            </motion.div>
                                        </div>

                                        <motion.h2 
                                            layoutId={`cert-title-${selectedCert.title}`}
                                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-display tracking-tight leading-tight mb-6 max-w-2xl"
                                        >
                                            {selectedCert.title}
                                        </motion.h2>

                                        <motion.p 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto"
                                        >
                                            {selectedCert.description}
                                        </motion.p>

                                        {selectedCert.credentialUrl && selectedCert.credentialUrl !== "#" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="w-full sm:auto"
                                            >
                                                <a
                                                    href={selectedCert.credentialUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="group/btn inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 sm:px-12 rounded-2xl bg-neutral-900 border border-transparent dark:bg-transparent dark:border-white/20 text-white dark:text-white font-bold transition-all shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] dark:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.1)] hover:bg-neutral-800 dark:hover:bg-white dark:hover:text-black hover:shadow-[0_20px_40px_-10px_rgba(139,92,246,0.4)] hover:-translate-y-1 focus:outline-none"
                                                >
                                                    <span className="text-base tracking-wide">Verify Credential</span>
                                                    <FiExternalLink size={20} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                                </a>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
