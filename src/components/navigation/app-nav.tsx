import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", labelKey: "navigation.home", end: true },
  { to: "/builder", labelKey: "navigation.builder", end: false },
  { to: "/preview", labelKey: "navigation.preview", end: false },
  { to: "/code", labelKey: "navigation.code", end: false },
  { to: "/settings", labelKey: "navigation.settings", end: false },
] as const;

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <ul className={cn("flex flex-wrap items-center gap-1", className)}>
      {navItems.map((item) => (
        <li key={item.to} className="w-full sm:w-auto">
          <NavLink
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors sm:min-h-9",
                isActive
                  ? "bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]",
              )
            }
          >
            {t(item.labelKey)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export function AppNav() {
  const { t } = useTranslation();
  const isDesktopNav = useMediaQuery("(min-width: 768px)");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (isDesktopNav) {
    return (
      <nav aria-label={t("navigation.primary")}>
        <NavLinks />
      </nav>
    );
  }

  return (
    <div>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        aria-expanded={isMobileOpen}
        aria-controls="mobile-navigation"
        className="min-h-11 min-w-11"
        onClick={() => {
          setIsMobileOpen(true);
        }}
      >
        <Menu className="size-4" aria-hidden />
        <span className="sr-only">{t("navigation.openMenu")}</span>
      </Button>

      <Sheet
        open={isMobileOpen}
        title={t("navigation.menuTitle")}
        side="right"
        closeLabel={t("navigation.closeMenu")}
        onClose={() => {
          setIsMobileOpen(false);
        }}
      >
        <nav id="mobile-navigation" aria-label={t("navigation.primary")}>
          <NavLinks
            className="flex-col items-stretch"
            onNavigate={() => {
              setIsMobileOpen(false);
            }}
          />
        </nav>
      </Sheet>
    </div>
  );
}
