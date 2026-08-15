import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import type { FormSchema } from "@/domain/form-schema";
import { FormRenderer } from "@/features/preview/components/form-renderer";
import { cn } from "@/lib/utils";

interface BuilderPreviewPanelProps {
  schema: FormSchema;
  className?: string;
}

export function BuilderPreviewPanel({ schema, className }: BuilderPreviewPanelProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [simulateError, setSimulateError] = useState(false);

  return (
    <section
      aria-labelledby="builder-preview-title"
      className={cn(
        "flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4",
        className,
      )}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 id="builder-preview-title" className="text-sm font-semibold text-[var(--text-primary)]">
            {t("preview.builderPanel.title")}
          </h2>
          <p className="mt-1 text-xs text-[var(--text-muted)]">{t("preview.builderPanel.subtitle")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(event) => {
                setSimulateError(event.target.checked);
              }}
            />
            <span>{t("preview.toolbar.simulateError")}</span>
          </label>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            aria-expanded={isOpen}
            onClick={() => {
              setIsOpen((previous) => !previous);
            }}
          >
            {isOpen ? t("preview.builderPanel.collapse") : t("preview.builderPanel.expand")}
          </Button>
        </div>
      </div>

      {isOpen ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <FormRenderer
            schema={schema}
            viewport="desktop"
            simulateError={simulateError}
            compact
            className="max-w-full"
          />
        </div>
      ) : null}
    </section>
  );
}
