import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import PrintManifesto from "@/components/print-manifesto";
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
  title: {
    default: "Mike Cedrick Dañocup | Full Stack Developer",
    template: "%s | Mike Cedrick Dañocup",
  },
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
  creator: "Mike Cedrick Dañocup",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mikecedrick.com"),
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
    description: "Full Stack Developer specializing in building high-performance web and mobile applications.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
          <div className="print:hidden">
            {children}
          </div>
          <PrintManifesto />
        </ThemeProvider>
      </body>
    </html>
  );
}
