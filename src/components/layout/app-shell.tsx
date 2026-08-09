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
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-sidebar)]">
        <div
          className={cn(
            "mx-auto flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
            isBuilder ? "max-w-none" : "max-w-6xl",
          )}
        >
          <Link to="/" className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
            {t("app.name")}
          </Link>
          <AppNav />
        </div>
      </header>
      <main className={cn("mx-auto px-4 py-8", isBuilder ? "max-w-none" : "max-w-6xl")}>
        <Outlet />
      </main>
    </div>
  );
}
