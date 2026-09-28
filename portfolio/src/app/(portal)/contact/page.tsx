import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch — email, GitHub, LinkedIn, or send a direct message. Open to work and collaboration.",
};

export default function ContactPage() {
  return <ContactSection />;
}
