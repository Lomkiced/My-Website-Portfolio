import type { Metadata } from "next";
import OverviewSection from "@/components/sections/OverviewSection";
import OverviewBlogSection from "@/components/sections/OverviewBlogSection";
import OverviewProjectsSection from "@/components/sections/OverviewProjectsSection";
import OverviewExperienceSection from "@/components/sections/OverviewExperienceSection";
import OverviewCertificationsSection from "@/components/sections/OverviewCertificationsSection";
import OverviewGithubSection from "@/components/sections/OverviewGithubSection";

export const metadata: Metadata = {
  title: {
    absolute: "Ced | Full Stack Developer",
  },
  description:
    "Mike Cedrick Dañocup — Full-Stack Developer specializing in Next.js, TypeScript, Supabase, and Prisma. BSIT graduate, Top 1 Dean's Lister.",
};

export default function OverviewPage() {
  return (
    <>
      <OverviewSection />
      <OverviewBlogSection />
      <OverviewProjectsSection />
      <OverviewExperienceSection />
      <OverviewCertificationsSection />
      <OverviewGithubSection />
    </>
  );
}
