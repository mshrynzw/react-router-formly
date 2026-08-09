import { Link, Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

import { AppNav } from "@/components/navigation/app-nav";
import { cn } from "@/lib/utils";

export function AppShell() {
  const { t } = useTranslation();
  const location = useLocation();
  const isBuilder = location.pathname.startsWith("/builder");

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <a href="#main-content" className="skip-link">
        {t("navigation.skipToContent")}
      </a>

      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-sidebar)]">
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 px-4 py-4",
            isBuilder ? "max-w-none" : "max-w-6xl",
          )}
        >
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-[var(--text-primary)]"
          >
            {t("app.name")}
          </Link>
          <AppNav />
        </div>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          "mx-auto px-4 py-6 outline-none sm:py-8",
          isBuilder ? "max-w-none" : "max-w-6xl",
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
