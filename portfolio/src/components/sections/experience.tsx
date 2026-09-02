"use client";

import { motion } from "framer-motion";
import { EXPERIENCE_DATA } from "@/lib/data";
import SectionTitle from "@/components/animations/section-title";
import { FiAward } from "react-icons/fi";

export default function Experience() {
    return (
        <section id="experience" className="py-24 md:py-32 relative bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    label="Journey"
                    title="Experience & Education"
                    subtitle="A timeline of my professional experience, education, and continuous learning."
                    className="mb-16 md:mb-24"
                />

                <div className="space-y-12 md:space-y-16">
                    {EXPERIENCE_DATA.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col md:flex-row gap-2 md:gap-12 relative"
                        >
                            {/* Connecting line (visible only on desktop between items) */}
                            {index !== EXPERIENCE_DATA.length - 1 && (
                                <div className="hidden md:block absolute left-[8.5rem] top-14 bottom-[-4rem] w-px bg-border group-hover:bg-pink-300 dark:group-hover:bg-pink-800 transition-colors duration-500" />
                            )}
                            
                            {/* Date & Type Sidebar */}
                            <div className="md:w-32 flex-shrink-0 pt-1">
                                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider block">
                                    {item.period}
                                </span>
                                <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest mt-1 block">
                                    {item.type}
                                </span>
                            </div>

                            {/* Main Content Area */}
                            <div className="relative pb-2">
                                {/* Dot indicator */}
                                <div className="hidden md:block absolute -left-[3.2rem] top-[0.6rem] w-2 h-2 rounded-full bg-border group-hover:bg-pink-500 group-hover:scale-150 transition-all duration-300" />
                                
                                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 group-hover:text-pink-500 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                
                                <h4 className="text-base font-medium text-foreground/80 mb-4">
                                    {item.organization}
                                </h4>
                                
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {item.description}
                                </p>

                                {/* Awards Section */}
                                {item.awards && item.awards.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {item.awards.map((award, i) => (
                                            <span 
                                                key={i} 
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-500/20"
                                            >
                                                <FiAward className="w-3 h-3" /> {award}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
