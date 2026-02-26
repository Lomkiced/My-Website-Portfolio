"use client";

import { motion } from "framer-motion";
import { FiSend, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
    return (
        <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-sm font-semibold text-violet-500 dark:text-violet-400 uppercase tracking-widest">
                        Contact
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-display mt-3">
                        Get In Touch
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
                        Have a project in mind or want to collaborate? Feel free to reach out
                        — I&apos;d love to hear from you!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Form */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.form
                            className="space-y-6"
                            variants={containerVariants}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="contact-name" className="text-sm font-medium">
                                    Name
                                </Label>
                                <Input
                                    id="contact-name"
                                    placeholder="Your name"
                                    className="h-12 rounded-xl bg-card/50 border-border/50 focus:border-violet-500/50 focus:ring-violet-500/20 transition-all"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="contact-email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="contact-email"
                                    type="email"
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
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    className="rounded-xl bg-card/50 border-border/50 focus:border-violet-500/50 focus:ring-violet-500/20 transition-all resize-none"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all"
                                >
                                    <FiSend className="w-4 h-4 mr-2" />
                                    Send Message
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
                        viewport={{ once: true }}
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
