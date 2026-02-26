import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import AudioPlayer from "@/components/ui/audio-player";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mike Cedrick Dañocup | Full Stack Developer",
  description:
    "Full Stack Developer specializing in Next.js, NestJS, Prisma, React Native. Building high-performance, type-safe web and mobile applications.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "NestJS",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Mike Cedrick Dañocup" }],
  openGraph: {
    title: "Mike Cedrick Dañocup | Full Stack Developer",
    description:
      "Full Stack Developer specializing in building high-performance web and mobile applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AudioPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
