import type { Metadata } from "next";
import CertificationsSection from "@/components/sections/CertificationsSection";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Professional certifications, academic awards, and recognition — Dean's Lister, Best in Thesis, Best in Programming, and more.",
};

export default function CertificationsPage() {
  return <CertificationsSection />;
}
