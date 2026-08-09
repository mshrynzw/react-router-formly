import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { setAppLocale } from "@/i18n";
import { resolveLocale, SUPPORTED_LOCALES } from "@/i18n/locales";

export default function SettingsRoute() {
  const { t, i18n } = useTranslation();
  const currentLocale = resolveLocale(i18n.resolvedLanguage);

  return (
    <section className="space-y-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("settings.title")}</h1>
        <p className="max-w-2xl text-[var(--text-secondary)]">{t("settings.description")}</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-[var(--text-primary)]">{t("settings.language")}</h2>
        <p className="text-sm text-[var(--text-muted)]">{t("settings.languageHelp")}</p>
        <div
          role="group"
          aria-label={t("language.label")}
          className="flex flex-wrap gap-2"
        >
          {SUPPORTED_LOCALES.map((locale) => (
            <Button
              key={locale}
              type="button"
              variant={currentLocale === locale ? "default" : "secondary"}
              size="sm"
              onClick={() => {
                setAppLocale(locale);
              }}
            >
              {t(`language.${locale}`)}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
