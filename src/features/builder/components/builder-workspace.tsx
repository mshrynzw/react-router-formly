import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { FieldPalette } from "@/features/builder/components/field-palette";
import { FieldSettingsPanel } from "@/features/builder/components/field-settings-panel";
import { FormCanvas } from "@/features/builder/components/form-canvas";
import { FormSettingsPanel } from "@/features/builder/components/form-settings-panel";
import { SubmissionSettingsPanel } from "@/features/builder/components/submission-settings-panel";
import { useFormBuilder, type BuilderPanel } from "@/features/builder/hooks/use-form-builder";
import { cn } from "@/lib/utils";

const panels: BuilderPanel[] = ["form", "field", "submission"];

export function BuilderWorkspace() {
  const { t } = useTranslation();
  const builder = useFormBuilder();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("builder.title")}</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{t("builder.workspace.subtitle")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {builder.loadStatus === "invalid" ? (
            <p className="text-xs text-[var(--warning)]">{t("builder.status.invalidRestored")}</p>
          ) : null}
          {builder.isSaveFailed ? (
            <p className="text-xs text-[var(--danger)]">{t("builder.status.saveFailed")}</p>
          ) : (
            <p className="text-xs text-[var(--text-muted)]">{t("builder.status.saved")}</p>
          )}
          <Button type="button" size="sm" variant="secondary" onClick={builder.resetForm}>
            {t("builder.actions.reset")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_320px]">
        <FieldPalette onAddField={builder.addField} />
        <FormCanvas
          schema={builder.schema}
          selectedFieldId={builder.selectedFieldId}
          onSelectField={builder.selectField}
          onDuplicateField={builder.duplicateField}
          onRemoveField={builder.removeField}
          onMoveField={builder.moveField}
        />

        <section
          aria-labelledby="builder-settings-title"
          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
        >
          <h2
            id="builder-settings-title"
            className="mb-3 text-sm font-semibold text-[var(--text-primary)]"
          >
            {t("builder.settings.title")}
          </h2>

          <div
            role="tablist"
            aria-label={t("builder.settings.tabsLabel")}
            className="mb-4 flex flex-wrap gap-1"
          >
            {panels.map((panel) => (
              <button
                key={panel}
                type="button"
                role="tab"
                aria-selected={builder.activePanel === panel}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  builder.activePanel === panel
                    ? "bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]",
                )}
                onClick={() => {
                  builder.setActivePanel(panel);
                }}
              >
                {t(`builder.settings.tabs.${panel}`)}
              </button>
            ))}
          </div>

          {builder.activePanel === "form" ? (
            <FormSettingsPanel schema={builder.schema} onChange={builder.updateFormMeta} />
          ) : null}

          {builder.activePanel === "field" ? (
            <FieldSettingsPanel
              field={builder.selectedField}
              onUpdateField={builder.updateField}
              onAddOption={builder.addOption}
              onUpdateOption={builder.updateOption}
              onRemoveOption={builder.removeOption}
            />
          ) : null}

          {builder.activePanel === "submission" ? (
            <SubmissionSettingsPanel
              schema={builder.schema}
              onChange={builder.updateSubmission}
            />
          ) : null}
        </section>
      </div>
    </div>
  );
}
