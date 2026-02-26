"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";

const footerLinks = [
    { name: "GitHub", icon: FiGithub, href: "https://github.com/Lomkiced" },
    {
        name: "LinkedIn",
        icon: FiLinkedin,
        href: "https://linkedin.com/in/Ced%20Rick",
    },
    { name: "Email", icon: FiMail, href: "mailto:xanthosis122@gmail.com" },
];

export default function Footer() {
    return (
        <motion.footer
            className="py-12 border-t border-border/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright */}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>© {new Date().getFullYear()} Mike Cedrick Dañocup.</span>
                        <span className="hidden sm:inline">Built with</span>
                        <FiHeart className="hidden sm:inline w-3.5 h-3.5 text-red-500 mx-0.5" />
                        <span className="hidden sm:inline">using Next.js & Framer Motion</span>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-2">
                        {footerLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target={link.name !== "Email" ? "_blank" : undefined}
                                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                                whileHover={{ y: -2 }}
                                aria-label={link.name}
                            >
                                <link.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
