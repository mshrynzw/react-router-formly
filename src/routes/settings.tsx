import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { clearFormFromStorage, hasStoredForm } from "@/domain/form-schema";
import { setAppLocale } from "@/i18n";
import { resolveLocale, SUPPORTED_LOCALES } from "@/i18n/locales";
import {
  readStoredTheme,
  setAppTheme,
  type Theme,
} from "@/lib/theme";

const THEMES: Theme[] = ["dark", "light", "system"];

export default function SettingsRoute() {
  const { t, i18n } = useTranslation();
  const currentLocale = resolveLocale(i18n.resolvedLanguage);
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme());
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [hasForm, setHasForm] = useState(() => hasStoredForm());
  const [clearFeedback, setClearFeedback] = useState<"idle" | "cleared" | "failed">("idle");

  const handleClearConfirm = () => {
    const result = clearFormFromStorage();
    setIsClearDialogOpen(false);
    setHasForm(hasStoredForm());
    setClearFeedback(result.ok ? "cleared" : "failed");
  };

  const handleThemeChange = (next: Theme) => {
    setTheme(next);
    setAppTheme(next);
  };

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
              aria-pressed={currentLocale === locale}
              onClick={() => {
                setAppLocale(locale);
              }}
            >
              {t(`language.${locale}`)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3 border-t border-[var(--border-subtle)] pt-6">
        <h2 className="text-sm font-medium text-[var(--text-primary)]">{t("settings.theme.title")}</h2>
        <p className="text-sm text-[var(--text-muted)]">{t("settings.theme.help")}</p>
        <div
          role="group"
          aria-label={t("settings.theme.label")}
          className="flex flex-wrap gap-2"
        >
          {THEMES.map((item) => (
            <Button
              key={item}
              type="button"
              variant={theme === item ? "default" : "secondary"}
              size="sm"
              aria-pressed={theme === item}
              onClick={() => {
                handleThemeChange(item);
              }}
            >
              {t(`settings.theme.options.${item}`)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3 border-t border-[var(--border-subtle)] pt-6">
        <h2 className="text-sm font-medium text-[var(--text-primary)]">
          {t("settings.storage.title")}
        </h2>
        <p className="text-sm text-[var(--text-muted)]">{t("settings.storage.description")}</p>
        <p className="text-xs text-[var(--text-secondary)]">
          {hasForm ? t("settings.storage.hasData") : t("settings.storage.empty")}
        </p>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={!hasForm}
          onClick={() => {
            setIsClearDialogOpen(true);
          }}
        >
          {t("settings.storage.clear")}
        </Button>
        {clearFeedback === "cleared" ? (
          <p role="status" className="text-xs text-[var(--success)]">
            {t("settings.storage.cleared")}
          </p>
        ) : null}
        {clearFeedback === "failed" ? (
          <p role="alert" className="text-xs text-[var(--danger)]">
            {t("settings.storage.clearFailed")}
          </p>
        ) : null}
      </div>

      <ConfirmDialog
        open={isClearDialogOpen}
        title={t("settings.storage.clearDialog.title")}
        description={t("settings.storage.clearDialog.description")}
        confirmLabel={t("settings.storage.clearDialog.confirm")}
        cancelLabel={t("common.actions.cancel")}
        onCancel={() => {
          setIsClearDialogOpen(false);
        }}
        onConfirm={handleClearConfirm}
      />
    </section>
  );
}
