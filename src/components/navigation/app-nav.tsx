import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", labelKey: "navigation.home", end: true },
  { to: "/builder", labelKey: "navigation.builder", end: false },
  { to: "/preview", labelKey: "navigation.preview", end: false },
  { to: "/code", labelKey: "navigation.code", end: false },
  { to: "/settings", labelKey: "navigation.settings", end: false },
] as const;

export function AppNav() {
  const { t } = useTranslation();

  return (
    <nav aria-label={t("navigation.primary")} className="flex flex-wrap items-center gap-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]",
            )
          }
        >
          {t(item.labelKey)}
        </NavLink>
      ))}
    </nav>
  );
}
