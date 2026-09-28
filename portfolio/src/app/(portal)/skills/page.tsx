import type { Metadata } from "next";
import SkillsSection from "@/components/sections/SkillsSection";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills and tools — Next.js, TypeScript, Supabase, Prisma, React Native, and more.",
};

export default function SkillsPage() {
  return <SkillsSection />;
}
