import type { Metadata } from "next";
import ExperienceSection from "@/components/sections/ExperienceSection";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience and education — full-stack development, technical internship, and teaching.",
};

export default function ExperiencePage() {
  return <ExperienceSection />;
}
