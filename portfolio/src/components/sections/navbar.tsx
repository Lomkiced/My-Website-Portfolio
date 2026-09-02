"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiDownload, FiMenu, FiMoon, FiSun, FiX, FiPrinter } from "react-icons/fi";



import { MagneticButton } from "@/components/ui/magnetic-button";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Approach", href: "#approach" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");

    useEffect(() => {
        setMounted(true);
    }, []);

    // Intersection Observer for active section tracking
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        const matchingLink = navLinks.find(
                            (link) => link.href === `#${id}`
                        );
                        if (matchingLink) {
                            setActiveSection(matchingLink.name);
                        }
                    }
                });
            },
            { rootMargin: "-30% 0px -70% 0px" } 
        );

        navLinks.forEach((link) => {
            const el = document.querySelector(link.href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* Fixed Hamburger Toggle Button */}
            <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60]">
                <MagneticButton
                    onClick={() => setMenuOpen(true)}
                    className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-foreground text-background hover:opacity-90 transition-all shadow-lg border border-border/20"
                    aria-label="Open menu"
                >
                    <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
                </MagneticButton>
            </div>

            {/* Premium Sidebar Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="fixed inset-0 z-[90] bg-background/40 backdrop-blur-sm"
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Sidebar Container */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: "0%" }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] md:w-[480px] z-[100] bg-background border-l border-border flex flex-col shadow-2xl overflow-y-auto"
                        >
                            {/* Overlay Header */}
                            <div className="flex items-center justify-between px-6 sm:px-10 pt-8 sm:pt-10 flex-shrink-0">
                                <MagneticButton
                                    onClick={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        handleNavClick("#home");
                                    }}
                                    className="flex items-center gap-3 group px-2 h-full"
                                >
                                    <div className="bg-foreground rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 w-10 h-10 shadow-md">
                                        <Image
                                            src="/DEALWITHIT.png"
                                            alt="Logo"
                                            width={32}
                                            height={32}
                                            className="w-7 h-7 object-contain drop-shadow-md"
                                        />
                                    </div>
                                    <span className="text-lg font-bold font-display tracking-tight text-foreground whitespace-nowrap">
                                        Mike<span className="text-primary"> Cedrick</span>
                                    </span>
                                </MagneticButton>

                                <div className="flex items-center gap-3">
                                    {mounted && (
                                        <MagneticButton
                                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-background/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                                            aria-label="Toggle theme"
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={theme}
                                                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {theme === "dark" ? (
                                                        <FiSun className="w-5 h-5" />
                                                    ) : (
                                                        <FiMoon className="w-5 h-5" />
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </MagneticButton>
                                    )}

                                    <MagneticButton
                                        onClick={() => setMenuOpen(false)}
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-accent hover:bg-accent/80 transition-all hover:scale-105"
                                    >
                                        <FiX className="w-6 h-6 text-foreground" />
                                    </MagneticButton>
                                </div>
                            </div>

                            {/* Sidebar Links */}
                            <div className="flex-1 flex flex-col justify-center items-start gap-6 w-full px-10 py-10">
                                {navLinks.map((link, i) => {
                                    const isActive = activeSection === link.name;
                                    return (
                                        <div key={link.name} className="overflow-hidden w-full">
                                            <motion.a
                                                href={link.href}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNavClick(link.href);
                                                }}
                                                initial={{ x: "50px", opacity: 0 }}
                                                animate={{ x: "0px", opacity: 1 }}
                                                exit={{ x: "50px", opacity: 0 }}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    delay: 0.2 + i * 0.05, 
                                                    ease: [0.76, 0, 0.24, 1] 
                                                }}
                                                className="group relative inline-block w-full"
                                            >
                                                <span className={`text-2xl sm:text-3xl font-bold tracking-wide transition-all duration-300 inline-block group-hover:translate-x-2 ${
                                                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                                }`}>
                                                    {link.name}
                                                </span>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="sidebar-active"
                                                        className="absolute top-1/2 -left-4 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                                                    />
                                                )}
                                            </motion.a>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Sidebar Footer */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="px-10 pb-10 flex flex-col gap-6"
                            >
                                <div className="w-full h-px bg-border/50" />
                                
                                <div className="flex items-center gap-6">
                                    <a href="https://github.com/Lomkiced" target="_blank" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
                                    <a href="https://linkedin.com/in/lomki-ced-446652393" target="_blank" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
                                </div>
                                
                                <div className="flex flex-col gap-3">
                                    <MagneticButton
                                        onClick={(e: React.MouseEvent) => {
                                            e.preventDefault();
                                            setMenuOpen(false);
                                            setTimeout(() => window.print(), 300);
                                        }}
                                        className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-accent/50 text-foreground font-bold hover:bg-accent transition-all border border-border"
                                    >
                                        <FiPrinter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Print Resume
                                    </MagneticButton>

                                    <MagneticButton
                                        onClick={() => {}}
                                        className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-foreground text-background font-bold hover:opacity-90 transition-all"
                                    >
                                        <FiDownload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                        Download CV
                                    </MagneticButton>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
