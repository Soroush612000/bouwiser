import type { ReactNode } from "react";
import {
  Bell,
  Menu,
  Search,
  X,
} from "lucide-react";
import {
  Children,
  cloneElement,
  isValidElement,
  useState,
} from "react";

interface DashboardLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export default function DashboardLayout({
  sidebar,
  children,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileSidebar = Children.map(sidebar, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    return cloneElement(
      child as React.ReactElement<{
        onNavigate?: () => void;
        mobile?: boolean;
      }>,
      {
        onNavigate: () => setMobileMenuOpen(false),
        mobile: true,
      },
    );
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      {sidebar}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <div className="relative h-full w-[290px] max-w-[86vw]">
            {mobileSidebar}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="relative hidden w-full max-w-[420px] sm:block">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  placeholder="Search projects..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:gap-5">
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              >
                <Bell className="h-5 w-5" />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 font-black text-white shadow-lg shadow-orange-500/20">
                  S
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-slate-950">
                  Yousef Razmjoo
                  </p>

                  <p className="text-xs text-slate-500">
                    Homeowner
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-4 sm:hidden">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                placeholder="Search projects..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}