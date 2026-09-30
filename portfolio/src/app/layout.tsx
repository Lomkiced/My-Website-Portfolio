import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pixelFont = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel",
});

// ─── Typography ─────────────────────────────────────────────────────────────
// Geist — a modern, geometric font family by Vercel.
// Geist Sans is used for body copy and UI.
// Geist Mono is used for technical labels and display highlights.

// ─── Metadata ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "Mike Cedrick Dañocup | Full Stack Developer",
    template: "%s | Mike Cedrick Dañocup",
  },
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, Supabase, and Prisma. Building high-performance, type-safe web applications.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Supabase",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Mike Cedrick Dañocup" }],
  creator: "Mike Cedrick Dañocup",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mikecedrick.com"
  ),
  openGraph: {
    title: "Mike Cedrick Dañocup | Full Stack Developer",
    description:
      "Full Stack Developer specializing in building high-performance web and mobile applications.",
    type: "website",
    url: "/",
    siteName: "Mike Cedrick Dañocup",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 1000,
        alt: "Mike Cedrick Dañocup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mike Cedrick Dañocup | Full Stack Developer",
    description:
      "Full Stack Developer specializing in building high-performance web and mobile applications.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import SoundManager from "@/components/ui/SoundManager";
import Preloader from "@/components/ui/Preloader";

// ─── Root Layout ────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${pixelFont.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <Preloader />
        <SoundManager />
        {children}
      </body>
    </html>
  );
}
