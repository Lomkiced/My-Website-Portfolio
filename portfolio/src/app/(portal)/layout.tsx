import Sidebar from "@/components/portal/Sidebar";
import MobileNav from "@/components/portal/MobileNav";

// ─── Portal Layout ──────────────────────────────────────────────────────────
// Shared shell for all section routes. Sidebar persists across navigations;
// only the content panel (children) swaps per route.

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-background flex flex-col lg:flex-row overflow-hidden relative">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Top Bar + Drawer */}
      <MobileNav />

      {/* Content Panel */}
      <main
        className="flex-1 w-full h-full overflow-y-auto min-w-0"
        role="main"
        id="main-content"
      >
        {/* Mobile top bar spacer */}
        <div className="lg:hidden h-16 shrink-0" />

        {/* Inner content with generous padding */}
        <div className="px-6 sm:px-10 lg:px-16 xl:px-20 py-8 lg:py-12 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
