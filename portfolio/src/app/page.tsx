// React Server Component

import LoadingScreen from "@/components/loading-screen";
import ScrollToTop from "@/components/scroll-to-top";
import Navbar from "@/components/sections/navbar";
import HeroScrollVideo from "@/components/sections/HeroScrollVideo";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Approach from "@/components/sections/approach";
import Projects from "@/components/sections/projects";
import Certificates from "@/components/sections/certificates";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroScrollVideo />
        <About />
        <Skills />
        <Approach />
        <Projects />
        <Certificates />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
