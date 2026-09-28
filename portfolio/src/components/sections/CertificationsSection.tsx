"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiAward, FiExternalLink, FiX } from "react-icons/fi";
import { CERTIFICATES_DATA, type Certificate } from "@/lib/data";
import GsapReveal from "@/components/portal/GsapReveal";

// ─── Certifications Section ─────────────────────────────────────────────────
// Reusable card grid with modal detail view. Monochrome styling.

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
      <section>
        {/* ── Header ─────────────────────────────────────────────────── */}
        <GsapReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-muted-foreground/30" />
              <span className="text-label uppercase text-muted-foreground tracking-widest">
                Achievements
              </span>
            </div>
            <h1 className="font-display text-h1">Certifications</h1>
            <p className="text-body text-muted-foreground mt-3 max-w-lg">
              Professional validations and continuous learning milestones.
            </p>
          </div>
        </GsapReveal>

        {/* ── Grid ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
          {CERTIFICATES_DATA.map((cert, index) => (
            <GsapReveal key={cert.title} delay={index * 0.04}>
              <button
                onClick={() => setSelectedCert(cert)}
                className="group relative w-full text-left bg-background p-6 sm:p-8 min-h-[180px] flex flex-col justify-between transition-colors duration-300 hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                {/* Icon */}
                <div className="w-8 h-8 flex items-center justify-center text-muted-foreground/30 group-hover:text-muted-foreground transition-colors duration-300 mb-4">
                  <FiAward className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-foreground leading-snug mb-2 group-hover:translate-x-1 transition-transform duration-300">
                  {cert.title}
                </h3>

                {/* Issuer + Date */}
                <div className="mt-auto pt-3">
                  <p className="text-label text-muted-foreground/40 uppercase tracking-wider">
                    {cert.issuer}
                  </p>
                  <p className="text-label text-muted-foreground/25 mt-0.5">
                    {cert.date}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              </button>
            </GsapReveal>
          ))}
        </div>

        {/* TODO: Ced — drop in any additional certification names here. The card pattern
             above is reusable: just add entries to CERTIFICATES_DATA in data.ts. */}
      </section>

      {/* ── Modal ────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedCert && (
          <motion.div
            key="cert-modal-overlay"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={closeCert}
            />

            {/* Modal Card */}
            <motion.div
              className="relative w-full max-w-3xl max-h-[85vh] bg-card border border-border/50 rounded-sm flex flex-col md:flex-row overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeCert}
                className="absolute top-4 right-4 z-50 p-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Image Pane */}
              {selectedCert.imageUrl && (
                <div className="relative w-full md:w-1/2 h-[30vh] md:h-auto min-h-[250px] bg-secondary flex items-center justify-center p-6 flex-shrink-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedCert.imageUrl}
                      fill
                      className="object-contain"
                      alt={selectedCert.title}
                      sizes="(max-width: 768px) 95vw, 45vw"
                      priority
                    />
                  </div>
                </div>
              )}

              {/* Content Pane */}
              <div className="w-full md:w-1/2 px-6 sm:px-8 py-8 sm:py-10 flex flex-col justify-center overflow-y-auto">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="text-label uppercase tracking-wider text-muted-foreground/50 border border-border/50 px-2.5 py-1 rounded-sm">
                    {selectedCert.date}
                  </span>
                  <span className="text-label uppercase tracking-wider text-muted-foreground/50 border border-border/50 px-2.5 py-1 rounded-sm">
                    {selectedCert.issuer}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-h2 font-display text-foreground mb-4 leading-tight">
                  {selectedCert.title}
                </h2>

                {/* Description */}
                <p className="text-body text-muted-foreground leading-relaxed mb-6">
                  {selectedCert.description}
                </p>

                {/* Verify Link */}
                {selectedCert.credentialUrl &&
                  selectedCert.credentialUrl !== "#" && (
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 px-5 py-3 bg-foreground text-background text-sm font-medium rounded-sm transition-all duration-200 hover:scale-[1.02] self-start"
                    >
                      Verify Credential
                      <FiExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
