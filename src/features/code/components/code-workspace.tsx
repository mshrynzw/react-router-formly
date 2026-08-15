import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  FORM_STORAGE_KEY,
  loadFormFromStorage,
  saveFormToStorage,
  updateAppearance,
  type CssFlavor,
  type FormSchema,
  type LoadFormResult,
} from "@/domain/form-schema";
import { CodeViewer } from "@/features/code/components/code-viewer";
import {
  generateFormCode,
  getCodeByLanguage,
  getExportFilename,
  type CodeLanguage,
  type GeneratedFormCode,
} from "@/features/code/generators/generate-form-code";
import { copyToClipboard } from "@/features/code/utils/copy-to-clipboard";
import { downloadTextFile, mimeTypeForLanguage } from "@/features/code/utils/download-text-file";
import { useRovingTabs } from "@/hooks/use-roving-tabs";
import { cn } from "@/lib/utils";

const languages: CodeLanguage[] = ["html", "css", "javascript"];

type FeedbackStatus = "idle" | "copied" | "copyFailed" | "exported";

export function CodeWorkspace() {
  const { t } = useTranslation();
  const [loadResult, setLoadResult] = useState<LoadFormResult>(() => loadFormFromStorage());
  const [language, setLanguage] = useState<CodeLanguage>("html");
  const [feedback, setFeedback] = useState<FeedbackStatus>("idle");
  const languageTabs = useRovingTabs({
    tabs: languages,
    value: language,
    onChange: setLanguage,
    idPrefix: "code-language",
  });

  useEffect(() => {
    const reload = () => {
      setLoadResult(loadFormFromStorage());
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === FORM_STORAGE_KEY) {
        reload();
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", reload);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", reload);
    };
  }, []);

  useEffect(() => {
    if (feedback === "idle") {
      return;
    }

    const timer = window.setTimeout(() => {
      setFeedback("idle");
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [feedback]);

  const schema: FormSchema = loadResult.schema;
  const generated: GeneratedFormCode = useMemo(() => generateFormCode(schema), [schema]);
  const activeCode = getCodeByLanguage(generated, language);
  const interactiveCount = schema.fields.filter((field) => field.type !== "submit").length;

  const handleCssFlavorChange = (flavor: CssFlavor) => {
    if (schema.appearance.cssFlavor === flavor) {
      return;
    }

    const next = updateAppearance(schema, { ...schema.appearance, cssFlavor: flavor });
    const saved = saveFormToStorage(next);
    setLoadResult({
      status: saved.ok ? "ok" : loadResult.status,
      schema: next,
    });
  };

  const handleCopy = async () => {
    const succeeded = await copyToClipboard(activeCode);
    setFeedback(succeeded ? "copied" : "copyFailed");
  };

  const handleExportCurrent = () => {
    downloadTextFile(
      getExportFilename(language, schema),
      activeCode,
      mimeTypeForLanguage(language),
    );
    setFeedback("exported");
  };

  const handleExportCombined = () => {
    downloadTextFile(
      getExportFilename("combined", schema),
      generated.combined,
      mimeTypeForLanguage("combined"),
    );
    setFeedback("exported");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("code.title")}</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {t("code.workspace.subtitle")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/builder"
            className="inline-flex h-8 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-hover)]"
          >
            {t("code.actions.openBuilder")}
          </Link>
          <Link
            to="/preview"
            className="inline-flex h-8 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-hover)]"
          >
            {t("code.actions.openPreview")}
          </Link>
        </div>
      </div>

      <p className="text-xs text-[var(--text-muted)]">{t("code.security.notice")}</p>

      {loadResult.status === "invalid" ? (
        <p className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-xs text-[var(--warning)]">
          {t("code.status.invalidRestored")}
        </p>
      ) : null}

      {interactiveCount === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 text-center">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            {t("code.empty.title")}
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{t("code.empty.description")}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
        <p className="text-xs font-medium text-[var(--text-secondary)]">
          {t("code.cssFlavor.label")}
        </p>
        <div className="flex flex-wrap gap-1" role="group" aria-label={t("code.cssFlavor.label")}>
          {(["css", "tailwind"] as const).map((flavor) => (
            <Button
              key={flavor}
              type="button"
              size="sm"
              variant={schema.appearance.cssFlavor === flavor ? "default" : "secondary"}
              aria-pressed={schema.appearance.cssFlavor === flavor}
              onClick={() => {
                handleCssFlavorChange(flavor);
              }}
            >
              {t(`code.cssFlavor.options.${flavor}`)}
            </Button>
          ))}
        </div>
        <p className="text-xs text-[var(--text-muted)]">{t("code.cssFlavor.help")}</p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label={t("code.tabsLabel")} className="flex flex-wrap gap-1">
          {languages.map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "min-h-11 rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:min-h-8",
                language === item
                  ? "bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]",
              )}
              {...languageTabs.getTabProps(item)}
              onClick={() => {
                setLanguage(item);
              }}
            >
              {t(`code.languages.${item}`)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={() => void handleCopy()}>
            {t("code.actions.copy")}
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={handleExportCurrent}>
            {t("code.actions.export")}
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={handleExportCombined}>
            {t("code.actions.exportCombined")}
          </Button>
        </div>
      </div>

      {feedback !== "idle" ? (
        <p
          role="status"
          className={cn(
            "text-xs",
            feedback === "copyFailed" ? "text-[var(--danger)]" : "text-[var(--success)]",
          )}
        >
          {t(`code.feedback.${feedback}`)}
        </p>
      ) : null}

      <div {...languageTabs.getPanelProps(language)}>
        <CodeViewer language={language} code={activeCode} />
      </div>
    </div>
  );
}
