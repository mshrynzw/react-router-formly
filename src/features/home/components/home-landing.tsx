import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Code2,
  Eye,
  LayoutTemplate,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const featureKeys = [
  { key: "builder", icon: Sparkles },
  { key: "preview", icon: Eye },
  { key: "code", icon: Code2 },
  { key: "templates", icon: LayoutTemplate },
  { key: "local", icon: ShieldCheck },
  { key: "responsive", icon: MonitorSmartphone },
] as const;

const stepKeys = ["build", "preview", "export"] as const;

const techKeys = [
  "react",
  "router",
  "typescript",
  "vite",
  "tailwind",
  "cloudflare",
  "vitest",
  "playwright",
] as const;

export function HomeLanding() {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-12 sm:px-10 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,128,255,0.14),transparent_55%)]"
        />
        <div className="relative space-y-6">
          <p className="text-sm font-medium tracking-wide text-[var(--accent)]">
            {t("home.hero.eyebrow")}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {t("home.title")}
          </h1>
          <p className="max-w-2xl text-xl text-[var(--text-secondary)] sm:text-2xl">
            {t("app.tagline")}
          </p>
          <p className="max-w-2xl text-[var(--text-secondary)]">{t("home.description")}</p>
          <div className="flex flex-wrap gap-3 pt-2">
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
              {t("home.ctaDemo")}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-features-heading" className="space-y-6">
        <div className="space-y-2">
          <h2 id="home-features-heading" className="text-2xl font-semibold tracking-tight">
            {t("home.features.title")}
          </h2>
          <p className="max-w-2xl text-[var(--text-secondary)]">{t("home.features.description")}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map(({ key, icon: Icon }) => (
            <li
              key={key}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5"
            >
              <Icon className="mb-3 size-5 text-[var(--accent)]" aria-hidden />
              <h3 className="text-base font-semibold">{t(`home.features.items.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {t(`home.features.items.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="home-steps-heading" className="space-y-6">
        <div className="space-y-2">
          <h2 id="home-steps-heading" className="text-2xl font-semibold tracking-tight">
            {t("home.howItWorks.title")}
          </h2>
          <p className="max-w-2xl text-[var(--text-secondary)]">{t("home.howItWorks.description")}</p>
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {stepKeys.map((key, index) => (
            <li
              key={key}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5"
            >
              <p className="text-xs font-medium tracking-wide text-[var(--text-muted)]">
                {t("home.howItWorks.stepLabel", { step: index + 1 })}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{t(`home.howItWorks.steps.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {t(`home.howItWorks.steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="home-demo-heading"
        className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-8 sm:px-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-3">
            <h2 id="home-demo-heading" className="text-2xl font-semibold tracking-tight">
              {t("home.demo.title")}
            </h2>
            <p className="max-w-xl text-[var(--text-secondary)]">{t("home.demo.description")}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/templates"
                className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--accent)] px-5 text-sm font-medium text-[var(--text-on-accent)] transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]"
              >
                {t("home.demo.ctaTemplates")}
              </Link>
              <Link
                to="/preview"
                className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--border-default)] px-5 text-sm font-medium transition-colors hover:bg-[var(--bg-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]"
              >
                {t("home.demo.ctaPreview")}
              </Link>
            </div>
          </div>
          <div
            aria-hidden
            className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-4 shadow-[var(--shadow-sm)]"
          >
            <div className="mb-3 flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[var(--border-strong)]" />
              <span className="size-2.5 rounded-full bg-[var(--border-strong)]" />
              <span className="size-2.5 rounded-full bg-[var(--border-strong)]" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-1/3 rounded bg-[var(--bg-surface-hover)]" />
              <div className="h-9 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)]" />
              <div className="h-3 w-1/4 rounded bg-[var(--bg-surface-hover)]" />
              <div className="h-9 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)]" />
              <div className="mt-3 h-9 w-28 rounded-md bg-[var(--accent)]" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-tech-heading" className="space-y-6">
        <div className="space-y-2">
          <h2 id="home-tech-heading" className="text-2xl font-semibold tracking-tight">
            {t("home.technology.title")}
          </h2>
          <p className="max-w-2xl text-[var(--text-secondary)]">{t("home.technology.description")}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {techKeys.map((key) => (
            <li
              key={key}
              className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3"
            >
              <p className="text-sm font-semibold">{t(`home.technology.items.${key}.name`)}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {t(`home.technology.items.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-[var(--border-subtle)] pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">{t("app.name")}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{t("home.footer.note")}</p>
          </div>
          <nav aria-label={t("home.footer.navLabel")} className="flex flex-wrap gap-3 text-sm">
            <Link
              to="/builder"
              className="text-[var(--text-secondary)] underline-offset-4 hover:text-[var(--text-primary)] hover:underline"
            >
              {t("navigation.builder")}
            </Link>
            <Link
              to="/templates"
              className="text-[var(--text-secondary)] underline-offset-4 hover:text-[var(--text-primary)] hover:underline"
            >
              {t("navigation.templates")}
            </Link>
            <Link
              to="/code"
              className="text-[var(--text-secondary)] underline-offset-4 hover:text-[var(--text-primary)] hover:underline"
            >
              {t("navigation.code")}
            </Link>
            <Link
              to="/settings"
              className="text-[var(--text-secondary)] underline-offset-4 hover:text-[var(--text-primary)] hover:underline"
            >
              {t("navigation.settings")}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
