"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiExternalLink, FiX, FiMaximize2 } from "react-icons/fi";
import { CERTIFICATES_DATA, type Certificate } from "@/lib/data";

// ─── Certifications Section ─────────────────────────────────────────────────
// Advanced premium grid gallery. Cards feature desaturated background imagery 
// that bloom into full color on hover. Clicking opens a cinematic glass modal.

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const closeCert = useCallback(() => setSelectedCert(null), []);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCert();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCert]);

  // Body scroll lock
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
    <>
      <section className="pb-32 pt-12 md:pt-20">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/20 pb-8">
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-tight">
              Certifications
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              Professional validations, intensive internships, and continuous learning milestones.
            </p>
          </div>
        </div>

        {/* ── Grid Gallery ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES_DATA.map((cert, index) => (
            <motion.button
              key={cert.title}
              onClick={() => setSelectedCert(cert)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
              className="group relative w-full h-[280px] md:h-[320px] rounded-2xl overflow-hidden border border-border/10 bg-[#050505] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              {/* Image Background */}
              {cert.imageUrl && (
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={cert.imageUrl} 
                    fill 
                    alt={cert.title}
                    className="object-cover object-top opacity-30 grayscale mix-blend-luminosity group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out" 
                  />
                  {/* Rich Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                 <FiMaximize2 className="w-3.5 h-3.5 text-white" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-8 transform group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                  <span className="px-2.5 py-1 rounded-md border border-white/20 bg-black/50 backdrop-blur-md text-[10px] uppercase tracking-widest text-white/90 font-mono shadow-xl">
                    {cert.date}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-white mb-2 leading-tight shadow-black drop-shadow-md">
                  {cert.title}
                </h3>
                <p className="text-white/50 text-[10px] font-mono uppercase tracking-widest truncate w-full shadow-black drop-shadow-md">
                  {cert.issuer}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Cinematic Modal ──────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedCert && (
          <motion.div
            key="cert-modal-overlay"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dark Glass Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={closeCert}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Container */}
            <motion.div
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like easing
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeCert}
                className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all rounded-full focus:outline-none"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Image Pane */}
              <div className="relative w-full md:w-[55%] h-[35vh] md:h-auto min-h-[300px] bg-black/50 flex items-center justify-center p-8 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10">
                {selectedCert.imageUrl ? (
                  <div className="relative w-full h-full drop-shadow-2xl">
                    <Image
                      src={selectedCert.imageUrl}
                      fill
                      className="object-contain"
                      alt={selectedCert.title}
                      sizes="(max-width: 768px) 95vw, 55vw"
                      priority
                    />
                  </div>
                ) : (
                  <div className="text-white/20 font-mono text-sm uppercase tracking-widest">
                    No Document Scanned
                  </div>
                )}
              </div>

              {/* Content Pane */}
              <div className="w-full md:w-[45%] p-8 sm:p-12 flex flex-col justify-center bg-[#050505]">
                {/* Meta Data */}
                <div className="flex flex-col gap-3 mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">
                    Awarded / Issued
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs uppercase tracking-wider text-foreground border border-border/20 bg-foreground/5 px-3 py-1.5 rounded-md">
                      {selectedCert.date}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-foreground border border-border/20 bg-foreground/5 px-3 py-1.5 rounded-md">
                      {selectedCert.issuer}
                    </span>
                  </div>
                </div>

                {/* Main Details */}
                <h2 className="text-3xl font-display text-foreground mb-4 leading-tight">
                  {selectedCert.title}
                </h2>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-10">
                  {selectedCert.description}
                </p>

                {/* Actions */}
                {selectedCert.credentialUrl && selectedCert.credentialUrl !== "#" ? (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl"
                  >
                    Verify Authenticity
                    <FiExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <div className="inline-flex items-center justify-center w-full px-6 py-3.5 border border-border/20 text-muted-foreground/40 text-xs font-mono uppercase tracking-widest rounded-lg bg-background cursor-not-allowed">
                    Physical Record Only
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
