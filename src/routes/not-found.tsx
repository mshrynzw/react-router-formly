import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function NotFoundRoute() {
  const { t } = useTranslation();

  return (
    <section className="space-y-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("notFound.title")}</h1>
        <p className="max-w-2xl text-[var(--text-secondary)]">{t("notFound.description")}</p>
      </div>
      <Link
        to="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-[var(--text-on-accent)] transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]"
      >
        {t("notFound.action")}
      </Link>
    </section>
  );
}
