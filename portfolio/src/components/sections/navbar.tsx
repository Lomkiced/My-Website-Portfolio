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
            {/* Ultra-Minimalist Agency Navbar (Universal for Desktop & Mobile) */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 sm:px-6 pt-4 sm:pt-6">
                <nav className="pointer-events-auto w-full max-w-7xl rounded-full bg-background/40 dark:bg-zinc-950/40 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/20 dark:border-white/10 flex items-center justify-between px-2 sm:px-4 h-[60px] sm:h-[72px]">
                    
                    {/* Left: Logo */}
                    <MagneticButton
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            handleNavClick("#home");
                        }}
                        className="flex items-center gap-3 group px-2 sm:px-4 h-full"
                    >
                        <div className="bg-foreground rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 w-9 h-9 sm:w-11 sm:h-11 shadow-md">
                            <Image
                                src="/DEALWITHIT.png"
                                alt="Logo"
                                width={32}
                                height={32}
                                className="w-6 h-6 sm:w-8 sm:h-8 object-contain drop-shadow-md"
                            />
                        </div>
                        <span className="text-base sm:text-lg font-bold font-display tracking-tight text-foreground whitespace-nowrap">
                            Mike<span className="text-violet-500"> Cedrick</span>
                        </span>
                    </MagneticButton>

                    {/* Right: Actions & Menu Button */}
                    <div className="flex items-center gap-1 sm:gap-2 pr-1 sm:pr-2">

                        
                        {mounted && (
                            <MagneticButton
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
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
                                            <FiSun className="w-4 h-4 sm:w-5 sm:h-5" />
                                        ) : (
                                            <FiMoon className="w-4 h-4 sm:w-5 sm:h-5" />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </MagneticButton>
                        )}

                        <div className="w-px h-6 bg-border mx-1 sm:mx-2" />

                        <MagneticButton
                            onClick={() => setMenuOpen(true)}
                            className="group flex items-center gap-2 px-4 sm:px-6 h-10 sm:h-12 rounded-full bg-foreground text-background hover:opacity-90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                        >
                            <span className="hidden sm:block text-sm font-bold uppercase tracking-widest">Menu</span>
                            <FiMenu className="w-4 h-4 sm:w-5 sm:h-5" />
                        </MagneticButton>
                    </div>
                </nav>
            </div>

            {/* Premium Full-Screen Slide Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[100] bg-background dark:bg-zinc-950 flex flex-col"
                    >
                        {/* Overlay Header */}
                        <div className="flex items-center justify-between px-6 sm:px-12 pt-6 sm:pt-10 flex-shrink-0">
                            <span className="text-xl font-bold font-display tracking-tight text-foreground">
                                Navigation<span className="text-violet-500">.</span>
                            </span>
                            <MagneticButton
                                onClick={() => setMenuOpen(false)}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-accent hover:bg-accent/80 transition-all hover:scale-105"
                            >
                                <FiX className="w-6 h-6 text-foreground" />
                            </MagneticButton>
                        </div>

                        {/* Centered Typography Links */}
                        <div className="flex-1 flex flex-col justify-center items-center gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-6">
                            {navLinks.map((link, i) => {
                                const isActive = activeSection === link.name;
                                return (
                                    <div key={link.name} className="overflow-hidden w-full text-center">
                                        <motion.a
                                            href={link.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(link.href);
                                            }}
                                            initial={{ y: "100%", opacity: 0 }}
                                            animate={{ y: "0%", opacity: 1 }}
                                            exit={{ y: "100%", opacity: 0 }}
                                            transition={{ 
                                                duration: 0.6, 
                                                delay: 0.2 + i * 0.05, 
                                                ease: [0.76, 0, 0.24, 1] 
                                            }}
                                            className="group relative inline-block"
                                        >
                                            <span className={`text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight transition-colors duration-300 ${
                                                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                            }`}>
                                                {link.name}
                                            </span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="menu-active"
                                                    className="absolute -bottom-2 left-0 right-0 h-1 bg-violet-500"
                                                />
                                            )}
                                        </motion.a>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Resume & Socials Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="px-6 sm:px-12 pb-10 flex flex-col sm:flex-row items-center justify-between gap-6"
                        >
                            <div className="flex gap-6">
                                <a href="https://github.com/Lomkiced" target="_blank" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
                                <a href="https://linkedin.com/in/lomki-ced-446652393" target="_blank" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <MagneticButton
                                    onClick={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        setMenuOpen(false);
                                        setTimeout(() => window.print(), 300);
                                    }}
                                    className="group flex items-center gap-2 px-6 py-4 rounded-full bg-accent/50 text-foreground font-bold hover:bg-accent transition-all border border-border"
                                >
                                    <FiPrinter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Print
                                </MagneticButton>

                                <MagneticButton
                                    onClick={() => {}}
                                    className="group flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-all"
                                >
                                    <FiDownload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                    Download Resume
                                </MagneticButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
