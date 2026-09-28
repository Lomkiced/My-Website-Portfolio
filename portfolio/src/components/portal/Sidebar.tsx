"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

// ─── Navigation Items ───────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Certifications", href: "/certifications" },
] as const;

const SOCIALS = [
  {
    icon: FiGithub,
    href: "https://github.com/Lomkiced",
    label: "GitHub",
  },
  {
    icon: FiLinkedin,
    href: "https://linkedin.com/in/lomki-ced-446652393",
    label: "LinkedIn",
  },
  {
    icon: FiMail,
    href: "/contact",
    label: "Contact Form",
  },
] as const;

// ─── Sidebar Component ──────────────────────────────────────────────────────

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex h-full w-sidebar shrink-0 flex-col justify-between border-r border-border/50 bg-background z-50 noise-overlay"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* ── Top: Identity ──────────────────────────────────────────────── */}
      <div className="px-8 pt-10">
        <Link href="/overview" className="block group" aria-label="Home">
          <span className="font-display text-3xl text-foreground tracking-tight transition-opacity group-hover:opacity-70">
            CED
          </span>
        </Link>

        {/* Hairline divider */}
        <div className="mt-6 mb-8 h-px bg-border/50" />

        {/* ── Navigation ───────────────────────────────────────────────── */}
        <nav className="flex flex-col gap-1" aria-label="Section navigation">
          {NAV_ITEMS.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center gap-4 py-2.5
                  text-sm transition-all duration-200
                  ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <span
                  className={`
                    text-label font-sans tabular-nums transition-colors duration-200
                    ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/40 group-hover:text-muted-foreground"
                    }
                  `}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom: Status + Socials ───────────────────────────────────── */}
      <div className="px-8 pb-8">
        {/* Availability */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
          </span>
          <span className="text-caption text-muted-foreground">
            Open to work
          </span>
        </div>

        {/* Hairline divider */}
        <div className="h-px bg-border/50 mb-5" />



        {/* Location / Direct Contact */}
        <div className="space-y-1.5 mt-2">
          <p className="text-caption text-muted-foreground leading-relaxed">
            For work, collabs & everything else, reach me at
          </p>
          <a
            href="mailto:xanthosis122@gmail.com"
            className="flex items-center gap-2 mt-1 text-caption font-medium text-foreground hover:underline underline-offset-4 transition-all"
          >
            <MdEmail size={18} className="text-muted-foreground shrink-0" />
            <span className="truncate">xanthosis122@gmail.com</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

export { NAV_ITEMS, SOCIALS };
