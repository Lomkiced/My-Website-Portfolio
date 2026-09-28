import type { Metadata } from "next";
import ProjectsSection from "@/components/sections/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured work — production web applications, government systems, and collaborative platforms built with Next.js, Supabase, and modern web technologies.",
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
