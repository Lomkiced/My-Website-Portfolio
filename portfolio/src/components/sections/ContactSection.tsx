"use client";

import { useRef, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { sendEmail } from "@/actions/send-email";
import GsapReveal from "@/components/portal/GsapReveal";

// ─── Contact Section ────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    name: "Email",
    icon: FiMail,
    href: "mailto:xanthosis122@gmail.com",
    label: "xanthosis122@gmail.com",
  },
  {
    name: "GitHub",
    icon: FiGithub,
    href: "https://github.com/Lomkiced",
    label: "github.com/Lomkiced",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    href: "https://linkedin.com/in/lomki-ced-446652393",
    label: "linkedin.com/in/lomki-ced-446652393",
  },
] as const;

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setPending(true);
    setToast(null);

    const formData = new FormData(formRef.current);
    const result = await sendEmail(formData);

    setPending(false);
    setToast({
      type: result.success ? "success" : "error",
      message: result.message,
    });

    if (result.success) {
      formRef.current.reset();
    }

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <section>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <GsapReveal>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-muted-foreground/30" />
            <span className="text-label uppercase text-muted-foreground tracking-widest">
              Contact
            </span>
          </div>
          <h1 className="font-display text-h1">Get In Touch</h1>
          <p className="text-body text-muted-foreground mt-3 max-w-lg">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you.
          </p>
        </div>
      </GsapReveal>

      <div className="grid md:grid-cols-2 gap-16">
        {/* ── Contact Form ───────────────────────────────────────────── */}
        <GsapReveal>
          <form
            ref={formRef}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="text-label uppercase tracking-widest text-muted-foreground/60"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="senderEmail"
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground text-body placeholder:text-muted-foreground/30 focus:border-foreground focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-label uppercase tracking-widest text-muted-foreground/60"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                placeholder="Tell me about your project..."
                rows={5}
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground text-body placeholder:text-muted-foreground/30 focus:border-foreground focus:outline-none transition-colors duration-200 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="group inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed mt-4"
            >
              {pending ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="opacity-75"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </GsapReveal>

        {/* ── Info + Socials ──────────────────────────────────────────── */}
        <GsapReveal delay={0.1}>
          <div className="space-y-8">
            {/* Direct links */}
            <div className="space-y-1">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={
                    link.name !== "Email" ? "noopener noreferrer" : undefined
                  }
                  className="group flex items-center gap-4 px-4 py-3.5 -mx-4 rounded-sm transition-colors duration-200 hover:bg-card"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-border/50 rounded-sm text-muted-foreground/50 group-hover:text-foreground group-hover:border-foreground/20 transition-all duration-200">
                    <link.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {link.name}
                    </p>
                    <p className="text-caption text-muted-foreground/60">
                      {link.label}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-border/30" />

            {/* Open to work card */}
            <div className="p-6 border border-border/50 rounded-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/60 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  Open to Work
                </span>
              </div>
              <p className="text-caption text-muted-foreground leading-relaxed">
                Currently looking for full-time positions and freelance
                opportunities. Let&apos;s build something amazing together.
              </p>
            </div>

            {/* Resume download */}
            {/* TODO: Add actual resume PDF to public/ and update href */}
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-caption text-muted-foreground/50 hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
            >
              + Download Resume (PDF)
            </a>
          </div>
        </GsapReveal>
      </div>

      {/* ── Toast ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-sm border backdrop-blur-md ${
              toast.type === "success"
                ? "bg-card border-foreground/10 text-foreground"
                : "bg-card border-foreground/10 text-foreground"
            }`}
          >
            <div className="w-8 h-8 rounded-sm flex items-center justify-center border border-border/50">
              {toast.type === "success" ? (
                <FiCheck className="w-4 h-4" />
              ) : (
                <FiAlertCircle className="w-4 h-4" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-label uppercase font-medium tracking-wider">
                {toast.type === "success" ? "Sent" : "Error"}
              </span>
              <span className="text-caption text-muted-foreground max-w-[220px]">
                {toast.message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
