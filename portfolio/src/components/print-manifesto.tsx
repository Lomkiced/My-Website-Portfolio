import { CERTIFICATES_DATA, PROJECT_DATA, EXPERIENCE_DATA } from "@/lib/data";

export default function PrintManifesto() {
    return (
        <div id="print-manifesto" className="hidden print:block w-full max-w-4xl mx-auto bg-white text-black font-serif p-8">
            {/* Header */}
            <header className="border-b-2 border-black pb-6 mb-10 mt-8 text-center">
                <h1 className="text-5xl font-bold uppercase tracking-widest mb-2 font-sans">Mike Cedrick Dañocup</h1>
                <p className="text-2xl text-neutral-600 font-sans tracking-widest uppercase">Full Stack Developer & IT Graduate</p>
                <div className="flex justify-center gap-4 mt-4 text-sm font-sans text-neutral-500 font-semibold">
                    <span>mikecedrick.com</span>
                    <span>|</span>
                    <span>github.com/Lomkiced</span>
                    <span>|</span>
                    <span>linkedin.com/in/lomki-ced-446652393</span>
                </div>
            </header>

            <div className="space-y-10 text-lg leading-relaxed text-justify">
                
                {/* About Me */}
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 font-sans border-b border-neutral-300 pb-2 text-black">About Me</h2>
                    <p className="mb-4">
                        I am a Full Stack Developer specializing in building high-performance, type-safe web and mobile applications. With a strong foundation in modern web technologies including Next.js, NestJS, Prisma, and React Native, I am passionate about engineering digital experiences that blur the lines between robust software engineering and interactive art. 
                    </p>
                </section>

                {/* My Technical Skills */}
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 font-sans border-b border-neutral-300 pb-2 text-black">My Technical Skills</h2>
                    <ul className="space-y-3 leading-relaxed">
                        <li><strong>■ Full-Stack Development:</strong> React, Express, Node.js, Next.js, NestJS, PHP, Laravel, REST APIs, Python, Java, React Native, Flutter</li>
                        <li><strong>■ Backend & Databases:</strong> PostgreSQL, MySQL, Prisma ORM, Supabase, Firebase</li>
                        <li><strong>■ DevOps & Tools:</strong> Docker, Git, GitHub, AI-Assisted Development (Claude, Gemini, Codex)</li>
                        <li><strong>■ IT & Hardware:</strong> Computer Hardware Troubleshooting, IT Infrastructure Support, Network Basics</li>
                        <li><strong>■ IoT & Embedded Systems:</strong> Arduino Microcontrollers, RFID Integration, QR/Barcode Systems, Sensor Interfacing</li>
                        <li><strong>■ Other:</strong> Multimedia Design, Video Editing, Technical Presentation, Event Organization</li>
                    </ul>
                </section>

                {/* The Philosophy */}
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 font-sans border-b border-neutral-300 pb-2 text-black">The Philosophy</h2>
                    <p className="mb-4">
                        My philosophy is rooted in the belief that the modern web should not merely be functional, but visceral. Every micro-interaction is intentionally crafted to elicit a sense of premium quality. I design with empathy for the user, ensuring that beneath complex visual aesthetics lies an intuitive and accessible architecture. Aesthetics without performance is a compromise I refuse to make.
                    </p>
                </section>

                {/* My Approach */}
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 font-sans border-b border-neutral-300 pb-2 text-black">My Approach</h2>
                    <ul className="space-y-4">
                        <li>
                            <strong>1. Architecture & System Design:</strong> Before writing code, I architect scalable foundations, designing relational database schemas and defining robust API endpoints using tools like Prisma for type-safe database interactions.
                        </li>
                        <li>
                            <strong>2. Core Engineering & Development:</strong> Writing clean, modular, and strictly typed code. I focus on building secure, robust backend logic and bridging it seamlessly with immersive, high-performance frontend interfaces.
                        </li>
                        <li>
                            <strong>3. Testing & Refinement:</strong> Ensuring enterprise-grade reliability. I rigorously test edge cases, optimize database query performance, and refine the user interface to guarantee fluid, native-feeling interactions.
                        </li>
                        <li>
                            <strong>4. Deployment & Delivery:</strong> Shipping to production securely and efficiently. Setting up CI/CD pipelines, managing environment variables, and containerizing applications for highly scalable, global deployment.
                        </li>
                    </ul>
                </section>

                {/* Experience & Education */}
                <section style={{ pageBreakBefore: 'always' }}>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 font-sans border-b border-neutral-300 pb-2 text-black mt-10">Experience & Education</h2>
                    <div className="space-y-8">
                        {EXPERIENCE_DATA.map((item, idx) => (
                            <div key={idx} className="break-inside-avoid">
                                <h3 className="text-xl font-bold font-sans text-black">{item.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1 font-sans">
                                    <span className="font-semibold uppercase tracking-wider">{item.organization}</span>
                                    <span>•</span>
                                    <span>{item.period}</span>
                                </div>
                                <p className="mt-3 text-neutral-800">{item.description}</p>
                                {item.awards && (
                                    <ul className="list-disc pl-6 mt-3 text-neutral-700 text-[0.95rem] font-sans space-y-1">
                                        {item.awards.map((award, i) => (
                                            <li key={i}>{award}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Work */}
                <section style={{ pageBreakBefore: 'always' }}>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 font-sans border-b border-neutral-300 pb-2 text-black mt-10">Featured Work</h2>
                    <div className="space-y-10">
                        {PROJECT_DATA.map((project, idx) => (
                            <div key={idx} className="break-inside-avoid">
                                <h3 className="text-xl font-bold font-sans text-black">{project.title}</h3>
                                <div className="mt-1 text-[0.9rem] font-sans text-neutral-600 font-bold mb-3 uppercase tracking-wider">
                                    Stack: {project.techStack.join(" • ")}
                                </div>
                                <p className="text-neutral-800 whitespace-pre-line">{project.description}</p>
                                <div className="mt-3 text-[0.9rem] font-sans text-neutral-500 font-medium">
                                    <span>Live URL: {project.liveUrl}</span> <span className="mx-2">|</span> <span>Repository: {project.githubUrl}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certifications */}
                <section style={{ pageBreakBefore: 'always' }}>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 font-sans border-b border-neutral-300 pb-2 text-black mt-10">Certifications</h2>
                    <div className="space-y-8">
                        {CERTIFICATES_DATA.map((cert) => (
                            <div key={cert.title} className="break-inside-avoid">
                                <h3 className="text-xl font-bold font-sans text-black">{cert.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1 font-sans">
                                    <span className="font-semibold uppercase tracking-wider">{cert.issuer}</span>
                                    <span>•</span>
                                    <span>{cert.date}</span>
                                </div>
                                <p className="mt-3 text-neutral-800">{cert.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-neutral-300 text-center text-sm text-neutral-500 font-sans uppercase tracking-widest break-inside-avoid">
                <p>Printed Portfolio • Mike Cedrick Dañocup • {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
