"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiGithub, FiLinkedin, FiMail, FiCheck, FiAlertCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendEmail } from "@/actions/send-email";
import SectionTitle from "@/components/animations/section-title";

const socialLinks = [
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
        href: "https://linkedin.com/in/Ced%20Rick",
        label: "linkedin.com/in/Ced Rick",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

export default function Contact() {
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

        // Auto‑dismiss toast after 5 seconds
        setTimeout(() => setToast(null), 5000);
    };

    return (
        <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <SectionTitle
                    label="Contact"
                    title="Get In Touch"
                    subtitle="Have a project in mind or want to collaborate? Feel free to reach out — I'd love to hear from you!"
                    className="mb-16"
                />

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Form */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                    >
                        {/* Toast notification */}
                        {toast && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`mb-6 flex items-center gap-3 p-4 rounded-xl border text-sm font-medium ${toast.type === "success"
                                    ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                                    : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
                                    }`}
                            >
                                {toast.type === "success" ? (
                                    <FiCheck className="w-4 h-4 shrink-0" />
                                ) : (
                                    <FiAlertCircle className="w-4 h-4 shrink-0" />
                                )}
                                {toast.message}
                            </motion.div>
                        )}

                        <motion.form
                            ref={formRef}
                            className="space-y-6"
                            variants={containerVariants}
                            onSubmit={handleSubmit}
                        >
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="contact-email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="contact-email"
                                    name="senderEmail"
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    className="h-12 rounded-xl bg-card/50 border-border/50 focus:border-violet-500/50 focus:ring-violet-500/20 transition-all"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label
                                    htmlFor="contact-message"
                                    className="text-sm font-medium"
                                >
                                    Message
                                </Label>
                                <Textarea
                                    id="contact-message"
                                    name="message"
                                    required
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    className="rounded-xl bg-card/50 border-border/50 focus:border-violet-500/50 focus:ring-violet-500/20 transition-all resize-none"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    disabled={pending}
                                    className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all disabled:opacity-60"
                                >
                                    {pending ? (
                                        <>
                                            <svg
                                                className="w-4 h-4 mr-2 animate-spin"
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
                                            <FiSend className="w-4 h-4 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.form>
                    </motion.div>

                    {/* Social Links & Info */}
                    <motion.div
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-bold font-display mb-2">
                                Let&apos;s Connect
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                I&apos;m always open to discussing new projects, creative ideas,
                                or opportunities to be part of your vision. Reach out through any
                                of the platforms below.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target={link.name !== "Email" ? "_blank" : undefined}
                                    rel={
                                        link.name !== "Email" ? "noopener noreferrer" : undefined
                                    }
                                    className="group flex items-center gap-4 p-4 rounded-2xl glass-card hover:border-violet-500/30 hover:shadow-lg transition-all"
                                    variants={itemVariants}
                                    whileHover={{ x: 4 }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 dark:group-hover:bg-violet-500/30 transition-colors">
                                        <link.icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">
                                            {link.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {link.label}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Decorative card */}
                        <motion.div
                            variants={itemVariants}
                            className="p-6 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white"
                        >
                            <h4 className="font-bold font-display text-lg mb-2">
                                Open to Work
                            </h4>
                            <p className="text-white/80 text-sm leading-relaxed">
                                I&apos;m currently looking for full-time positions and freelance
                                opportunities. Let&apos;s build something amazing together!
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
