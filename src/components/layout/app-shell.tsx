import { Link, Outlet } from "react-router";
import { useTranslation } from "react-i18next";

import { AppNav } from "@/components/navigation/app-nav";

export function AppShell() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-sidebar)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
            {t("app.name")}
          </Link>
          <AppNav />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
