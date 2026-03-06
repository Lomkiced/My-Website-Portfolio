"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiDownload, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const AudioPlayer = dynamic(() => import("@/components/ui/audio-player"), {
    ssr: false,
});

import { MagneticButton } from "@/components/ui/magnetic-button";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);

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
            { rootMargin: "-30% 0px -70% 0px" } // Trigger when element is slightly above center
        );

        navLinks.forEach((link) => {
            const el = document.querySelector(link.href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };



    return (
        <>
            {/* Desktop Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center hidden md:flex pointer-events-none px-4 pt-6">
                <nav
                    className="pointer-events-auto w-full max-w-6xl rounded-[2.5rem] bg-background/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20 dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                >
                    <div className="flex items-center justify-between px-6 h-[72px]">
                        {/* Logo */}
                        <motion.button
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("#home");
                            }}
                            className="flex items-center gap-2 group flex-shrink-0"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="bg-foreground rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 w-11 h-11 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
                                <Image
                                    src="/DEALWITHIT.png"
                                    alt="Logo"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 object-contain drop-shadow-md"
                                />
                            </div>
                            <span className="hidden xl:block text-lg font-bold font-display text-foreground whitespace-nowrap overflow-hidden">
                                Mike<span className="text-gradient"> Cedrick</span>
                            </span>
                        </motion.button>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-1 relative" onMouseLeave={() => setHoveredSection(null)}>
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.name;
                                const isHovered = hoveredSection === link.name;

                                return (
                                    <div
                                        key={link.name}
                                        className="relative"
                                        onMouseEnter={() => setHoveredSection(link.name)}
                                    >
                                        <MagneticButton
                                            onClick={(e: React.MouseEvent) => {
                                                e.preventDefault();
                                                handleNavClick(link.href);
                                            }}
                                            className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300 ${isActive || isHovered
                                                ? "text-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            {link.name}
                                        </MagneticButton>

                                        {/* Hover Indicator */}
                                        {isHovered && (
                                            <motion.div
                                                layoutId="nav-hover"
                                                className="absolute inset-0 bg-accent/40 rounded-full -z-10"
                                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                            />
                                        )}

                                        {/* Active Indicator (Dot) */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active"
                                                className="absolute -bottom-2 left-1/2 w-1 h-1 bg-violet-500 rounded-full"
                                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                                style={{ x: "-50%" }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {mounted && (
                                <motion.button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="relative flex items-center justify-center w-10 h-10 rounded-full bg-accent/30 hover:bg-accent/60 transition-colors text-muted-foreground hover:text-foreground border border-border/20"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
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
                                                <FiSun className="w-4 h-4" />
                                            ) : (
                                                <FiMoon className="w-4 h-4" />
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.button>
                            )}

                            <div className="hidden lg:block h-6 w-px bg-border/50 mx-1" />

                            <AudioPlayer />

                            <MagneticButton
                                onClick={() => { }}
                                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(255,255,255,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                            >
                                <FiDownload className="w-4 h-4" />
                                <span>Resume</span>
                            </MagneticButton>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile Header */}
            <nav
                className="fixed top-0 left-0 right-0 z-[60] flex md:hidden items-center justify-between px-6 h-20 bg-background/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-white/10 shadow-sm"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-foreground rounded-full flex items-center justify-center w-10 h-10 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
                        <Image
                            src="/DEALWITHIT.png"
                            alt="Logo"
                            width={28}
                            height={28}
                            className="w-7 h-7 object-contain"
                        />
                    </div>
                    <span className="text-lg font-bold font-display tracking-tight text-foreground whitespace-nowrap">
                        Mike<span className="text-gradient"> Cedrick</span>
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <AudioPlayer />
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-accent hover:bg-accent/80 transition-colors"
                        aria-label="Open menu"
                    >
                        <FiMenu className="w-5 h-5 text-foreground" />
                    </button>
                </div>
            </nav>

            {/* Premium Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-3xl md:hidden overflow-hidden flex flex-col"
                    >
                        {/* Overlay Header */}
                        <div className="flex items-center justify-between px-6 h-20 flex-shrink-0">
                            <span className="text-lg font-bold font-display tracking-tight text-foreground">
                                Navigation<span className="text-violet-500">.</span>
                            </span>
                            <div className="flex items-center gap-4">
                                {mounted && (
                                    <button
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-accent hover:bg-accent/80 transition-colors text-foreground"
                                    >
                                        {theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                                    </button>
                                )}
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground hover:bg-foreground/90 transition-colors"
                                >
                                    <FiX className="w-5 h-5 text-background" />
                                </button>
                            </div>
                        </div>

                        {/* Huge Typography Links */}
                        <div className="flex-1 px-6 py-8 flex flex-col justify-center gap-4">
                            {navLinks.map((link, i) => {
                                const isActive = activeSection === link.name;
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(link.href);
                                        }}
                                        initial={{ opacity: 0, y: 15, rotateX: 10 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                                        transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                                        className="relative py-2 origin-left flex items-center group"
                                    >
                                        <span className={`text-5xl font-extrabold tracking-tighter uppercase transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                                            {link.name}
                                        </span>
                                        {isActive && (
                                            <motion.span
                                                layoutId="mobile-active"
                                                className="ml-4 w-12 h-1 bg-violet-500 rounded-full inline-block"
                                            />
                                        )}
                                    </motion.a>
                                );
                            })}
                        </div>

                        {/* Resume Footer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="p-6 border-t border-border/50 pb-12"
                        >
                            <a
                                href="#"
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-lg font-bold hover:shadow-lg hover:shadow-violet-500/25 transition-shadow"
                            >
                                <FiDownload className="w-5 h-5" />
                                Download Resume
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
