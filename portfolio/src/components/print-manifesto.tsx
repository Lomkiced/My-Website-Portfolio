import { CERTIFICATES_DATA } from "@/lib/data";

export default function PrintManifesto() {
    return (
        <div id="print-manifesto" className="hidden print:block w-full max-w-4xl mx-auto bg-white text-black font-serif p-8">
            {/* Header */}
            <header className="border-b-2 border-black pb-6 mb-10 mt-8">
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2 font-sans">Mike Cedrick Dañocup</h1>
                <p className="text-xl text-neutral-600 font-sans tracking-widest uppercase">Full Stack Developer & IT Graduate</p>
                <div className="flex gap-4 mt-4 text-sm font-sans text-neutral-500">
                    <span>mikecedrick.com</span>
                    <span>|</span>
                    <span>github.com/Lomkiced</span>
                    <span>|</span>
                    <span>linkedin.com/in/lomki-ced-446652393</span>
                </div>
            </header>

            {/* Manifesto Body */}
            <div className="space-y-8 text-lg leading-relaxed text-justify">
                
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 font-sans border-b border-neutral-300 pb-2">The Philosophy</h2>
                    <p className="mb-4">
                        This digital space is more than a traditional portfolio; it is an orchestrated digital experience designed to blur the lines between software engineering and interactive art. My philosophy is rooted in the belief that the modern web should not merely be functional, but visceral.
                    </p>
                    <p>
                        Every micro-interaction, from the fluid glassmorphism to the hardware-accelerated particle networks, is intentionally crafted to elicit a sense of premium quality. I design with empathy for the user, ensuring that beneath the complex visual aesthetics lies an intuitive and accessible architecture. Design is not just how it looks; it is fundamentally how it works.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 font-sans border-b border-neutral-300 pb-2 mt-10">The Engineering</h2>
                    <p className="mb-4">
                        Aesthetics without performance is a compromise I refuse to make. This portfolio is engineered using a robust, modern technology stack designed for scalability, type-safety, and raw performance.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Next.js & React:</strong> The foundation of the application, utilizing server-side rendering and optimized asset delivery to ensure rapid load times despite the heavy visual payload.</li>
                        <li><strong>Tailwind CSS:</strong> A highly customized design system utilizing CSS variables (HSL) to manage complex theme states (Dark/Light mode) without sacrificing bundle size.</li>
                        <li><strong>Framer Motion:</strong> Employed strictly for orchestrated, physics-based animations, carefully balanced against native CSS compositor animations to maintain steady 60fps frame rates.</li>
                        <li><strong>Performance Tuning:</strong> Heavy use of <code>content-visibility</code>, dynamic imports, and intersection observers to ensure that the browser only renders what is strictly necessary in the viewport.</li>
                    </ul>
                </section>

                <section className="mt-12" style={{ pageBreakBefore: 'always' }}>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 font-sans border-b border-neutral-300 pb-2">Continuous Learning & Certifications</h2>
                    <p className="mb-6">
                        The tech landscape is ephemeral, requiring relentless adaptation. Below is a curated list of my professional milestones and continuous learning validations.
                    </p>
                    
                    <div className="space-y-6">
                        {CERTIFICATES_DATA.map((cert) => (
                            <div key={cert.title} className="break-inside-avoid">
                                <h3 className="text-xl font-bold font-sans">{cert.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1 font-sans">
                                    <span className="font-semibold uppercase tracking-wider">{cert.issuer}</span>
                                    <span>•</span>
                                    <span>{cert.date}</span>
                                </div>
                                <p className="mt-2 text-neutral-800">{cert.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-neutral-300 text-center text-sm text-neutral-500 font-sans uppercase tracking-widest">
                <p>Printed Colophon • Mike Cedrick Dañocup • {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
