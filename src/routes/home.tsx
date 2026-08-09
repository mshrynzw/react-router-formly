import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function HomeRoute() {
  const { t } = useTranslation();

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-medium text-[var(--text-muted)]">{t("common.status.phase1")}</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("home.title")}</h1>
        <p className="max-w-2xl text-lg text-[var(--text-secondary)]">{t("app.tagline")}</p>
        <p className="max-w-2xl text-[var(--text-secondary)]">{t("home.description")}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/builder"
          className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--accent)] px-6 text-sm font-medium text-[var(--text-on-accent)] transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]"
        >
          {t("home.cta")}
        </Link>
        <Link
          to="/templates"
          className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-6 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]"
        >
          {t("home.ctaTemplates")}
        </Link>
      </div>
    </section>
  );
}
