"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from "react-icons/fi";
import dynamic from "next/dynamic";

const AudioPlayer = dynamic(() => import("@/components/ui/audio-player"), {
    ssr: false,
});

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.3 + i * 0.1, duration: 0.4, ease: "easeOut" as const },
    }),
};

const mobileMenuVariants = {
    closed: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.3, ease: "easeInOut" as const },
    },
    open: {
        opacity: 1,
        height: "auto",
        transition: { duration: 0.3, ease: "easeInOut" as const },
    },
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "glass shadow-lg shadow-black/5"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo & Audio */}
                    <div className="flex items-center gap-4">
                        <motion.a
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("#home");
                            }}
                            className="flex items-center gap-2 group"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Image
                                src="/DEALWITHIT.png"
                                alt="Logo"
                                width={44}
                                height={44}
                                className="w-11 h-11 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                            />
                            <span className="hidden lg:block text-lg font-bold font-display text-foreground whitespace-nowrap">
                                Mike<span className="text-gradient"> Cedrick</span>
                            </span>
                        </motion.a>

                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                custom={i}
                                variants={linkVariants}
                                initial="hidden"
                                animate="visible"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(link.href);
                                }}
                                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50"
                                whileHover={{ y: -1 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        {mounted && (
                            <motion.button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="relative p-2.5 rounded-xl hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={theme}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {theme === "dark" ? (
                                            <FiSun className="w-5 h-5" />
                                        ) : (
                                            <FiMoon className="w-5 h-5" />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        )}

                        {/* Audio Player (Moved to right side for mobile visibility) */}
                        <AudioPlayer />

                        {/* Resume button */}
                        <motion.a
                            href="#"
                            className="hidden lg:flex flex-none items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-shadow"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiDownload className="w-4 h-4" />
                            Resume
                        </motion.a>

                        {/* Mobile menu button */}
                        <motion.button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2.5 rounded-xl hover:bg-accent/50 transition-colors text-muted-foreground"
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle mobile menu"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mobileOpen ? "close" : "open"}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {mobileOpen ? (
                                        <FiX className="w-5 h-5" />
                                    ) : (
                                        <FiMenu className="w-5 h-5" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="md:hidden overflow-hidden pb-4"
                        >
                            <div className="flex flex-col gap-1 pt-2 border-t border-border/50">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(link.href);
                                        }}
                                        className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="#"
                                    className="flex items-center gap-2 px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium text-center justify-center"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 }}
                                >
                                    <FiDownload className="w-4 h-4" />
                                    Download Resume
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
