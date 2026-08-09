import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import {
  FORM_STORAGE_KEY,
  loadFormFromStorage,
  type FormSchema,
  type LoadFormResult,
} from "@/domain/form-schema";
import { FormRenderer, type PreviewViewport } from "@/features/preview/components/form-renderer";
import { PreviewToolbar } from "@/features/preview/components/preview-toolbar";

export function PreviewWorkspace() {
  const { t } = useTranslation();
  const [loadResult, setLoadResult] = useState<LoadFormResult>(() => loadFormFromStorage());
  const [viewport, setViewport] = useState<PreviewViewport>("desktop");
  const [simulateError, setSimulateError] = useState(false);

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

  const schema: FormSchema = loadResult.schema;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("preview.title")}</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{t("preview.workspace.subtitle")}</p>
        </div>
        <Link
          to="/builder"
          className="inline-flex h-8 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-hover)]"
        >
          {t("preview.actions.openBuilder")}
        </Link>
      </div>

      <p className="text-xs text-[var(--text-muted)]">{t("preview.security.notice")}</p>

      {loadResult.status === "invalid" ? (
        <p className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-xs text-[var(--warning)]">
          {t("preview.status.invalidRestored")}
        </p>
      ) : null}

      <PreviewToolbar
        viewport={viewport}
        simulateError={simulateError}
        onViewportChange={setViewport}
        onSimulateErrorChange={setSimulateError}
      />

      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4 sm:p-6">
        <FormRenderer schema={schema} viewport={viewport} simulateError={simulateError} />
      </div>
    </div>
  );
}
