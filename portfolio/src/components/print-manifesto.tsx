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
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 font-sans border-b border-neutral-300 pb-2 text-black mt-10">Experience & Education</h2>
                    <div className="space-y-10">
                        {EXPERIENCE_DATA.map((item, idx) => (
                            <div key={idx} className="break-inside-avoid flex flex-col md:flex-row gap-4 md:gap-8">
                                <div className="md:w-1/3 flex-shrink-0">
                                    <div className="font-sans font-bold text-black uppercase tracking-wider text-sm">{item.period}</div>
                                    <div className="font-sans text-neutral-600 font-semibold mt-1">{item.organization}</div>
                                </div>
                                <div className="md:w-2/3">
                                    <h3 className="text-xl font-bold font-sans text-black">{item.title}</h3>
                                    <p className="mt-2 text-neutral-800 text-base">{item.description}</p>
                                    {item.awards && (
                                        <ul className="list-disc pl-5 mt-3 text-neutral-700 text-sm font-sans space-y-1">
                                            {item.awards.map((award, i) => (
                                                <li key={i}>{award}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Work */}
                <section style={{ pageBreakBefore: 'always' }}>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 font-sans border-b border-neutral-300 pb-2 text-black mt-10">Featured Work</h2>
                    <div className="space-y-10">
                        {PROJECT_DATA.map((project, idx) => (
                            <div key={idx} className="break-inside-avoid flex flex-col md:flex-row gap-4 md:gap-8">
                                <div className="md:w-1/3 flex-shrink-0">
                                    <h3 className="text-xl font-bold font-sans text-black leading-tight">{project.title}</h3>
                                    <div className="mt-3 text-xs font-sans text-neutral-600 font-bold uppercase tracking-widest leading-relaxed">
                                        {project.techStack.join(" • ")}
                                    </div>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-neutral-800 text-base whitespace-pre-line">{project.description}</p>
                                    <div className="mt-4 text-xs font-sans text-neutral-600 font-medium space-y-1">
                                        <div><span className="font-bold text-neutral-900">LIVE URL:</span> {project.liveUrl}</div>
                                        <div><span className="font-bold text-neutral-900">REPOSITORY:</span> {project.githubUrl}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certifications */}
                <section style={{ pageBreakBefore: 'always' }}>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 font-sans border-b border-neutral-300 pb-2 text-black mt-10">Certifications</h2>
                    <div className="grid grid-cols-2 gap-8">
                        {CERTIFICATES_DATA.map((cert) => (
                            <div key={cert.title} className="break-inside-avoid border border-neutral-200 p-6 rounded-xl bg-neutral-50">
                                {cert.imageUrl && (
                                    <div className="mb-4 rounded-lg border border-neutral-200 overflow-hidden bg-white">
                                        {/* Using standard img ensures aggressive browsers will print the image accurately */}
                                        <img src={cert.imageUrl} alt={cert.title} className="w-full h-auto object-contain max-h-48" />
                                    </div>
                                )}
                                <h3 className="text-lg font-bold font-sans text-black leading-tight">{cert.title}</h3>
                                <div className="flex flex-col gap-1 text-xs text-neutral-600 mt-2 font-sans">
                                    <span className="font-bold uppercase tracking-wider text-black">{cert.issuer}</span>
                                    <span>{cert.date}</span>
                                </div>
                                <p className="mt-3 text-neutral-800 text-sm leading-relaxed">{cert.description}</p>
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
