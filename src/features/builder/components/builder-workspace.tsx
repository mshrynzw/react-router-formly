import { Settings2, Shapes } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { BuilderImportExport } from "@/features/builder/components/builder-import-export";
import { FieldPalette } from "@/features/builder/components/field-palette";
import { FieldSettingsPanel } from "@/features/builder/components/field-settings-panel";
import { FormCanvas } from "@/features/builder/components/form-canvas";
import { FormSettingsPanel } from "@/features/builder/components/form-settings-panel";
import { SubmissionSettingsPanel } from "@/features/builder/components/submission-settings-panel";
import { useFormBuilder, type BuilderPanel } from "@/features/builder/hooks/use-form-builder";
import { BuilderPreviewPanel } from "@/features/preview/components/builder-preview-panel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRovingTabs } from "@/hooks/use-roving-tabs";
import { cn } from "@/lib/utils";

const panels: BuilderPanel[] = ["form", "field", "submission"];

function SettingsContent({
  builder,
  idPrefix,
}: {
  builder: ReturnType<typeof useFormBuilder>;
  idPrefix: string;
}) {
  const { t } = useTranslation();
  const tabs = useRovingTabs({
    tabs: panels,
    value: builder.activePanel,
    onChange: builder.setActivePanel,
    idPrefix,
  });

  return (
    <>
      <div
        role="tablist"
        aria-label={t("builder.settings.tabsLabel")}
        className="mb-4 flex flex-wrap gap-1"
      >
        {panels.map((panel) => (
          <button
            key={panel}
            type="button"
            className={cn(
              "min-h-11 rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:min-h-8",
              builder.activePanel === panel
                ? "bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]",
            )}
            {...tabs.getTabProps(panel)}
            onClick={() => {
              builder.setActivePanel(panel);
            }}
          >
            {t(`builder.settings.tabs.${panel}`)}
          </button>
        ))}
      </div>

      <div {...tabs.getPanelProps("form")}>
        {builder.activePanel === "form" ? (
          <FormSettingsPanel schema={builder.schema} onChange={builder.updateFormMeta} />
        ) : null}
      </div>

      <div {...tabs.getPanelProps("field")}>
        {builder.activePanel === "field" ? (
          <FieldSettingsPanel
            field={builder.selectedField}
            onUpdateField={builder.updateField}
            onAddOption={builder.addOption}
            onUpdateOption={builder.updateOption}
            onRemoveOption={builder.removeOption}
          />
        ) : null}
      </div>

      <div {...tabs.getPanelProps("submission")}>
        {builder.activePanel === "submission" ? (
          <SubmissionSettingsPanel
            schema={builder.schema}
            onChange={builder.updateSubmission}
          />
        ) : null}
      </div>
    </>
  );
}

export function BuilderWorkspace() {
  const { t } = useTranslation();
  const builder = useFormBuilder();
  const isDesktopLayout = useMediaQuery("(min-width: 1024px)");
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const saveStatusMessage = (() => {
    if (builder.saveStatus === "saving") {
      return t("builder.status.saving");
    }

    if (builder.saveStatus === "failed") {
      if (builder.saveFailureReason === "quota") {
        return t("builder.status.saveFailedQuota");
      }
      return t("builder.status.saveFailed");
    }

    return t("builder.status.saved");
  })();

  const handleAddField = (type: Parameters<typeof builder.addField>[0]) => {
    builder.addField(type);
    setIsPaletteOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("builder.title")}</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{t("builder.workspace.subtitle")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p
            role="status"
            aria-live="polite"
            className={cn(
              "text-xs",
              builder.saveStatus === "failed"
                ? "text-[var(--danger)]"
                : "text-[var(--text-muted)]",
            )}
          >
            {saveStatusMessage}
          </p>
          {builder.saveStatus === "failed" ? (
            <Button type="button" size="sm" variant="secondary" onClick={builder.retrySave}>
              {t("builder.actions.retrySave")}
            </Button>
          ) : null}
          <BuilderImportExport schema={builder.schema} onImport={builder.replaceSchema} />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => {
              setIsResetDialogOpen(true);
            }}
          >
            {t("builder.actions.reset")}
          </Button>
        </div>
      </div>

      {builder.loadStatus === "invalid" ? (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-[var(--warning)]">
              {t("builder.error.invalidTitle")}
            </p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              {t("builder.error.invalidDescription")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="secondary" onClick={builder.retryLoad}>
              {t("builder.actions.retryLoad")}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setIsResetDialogOpen(true);
              }}
            >
              {t("builder.actions.reset")}
            </Button>
          </div>
        </div>
      ) : null}

      {isDesktopLayout ? (
        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
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
            <SettingsContent builder={builder} idPrefix="builder-settings-desktop" />
          </section>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => {
                setIsPaletteOpen(true);
              }}
            >
              <Shapes className="size-4" aria-hidden />
              {t("builder.actions.openPalette")}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => {
                setIsSettingsOpen(true);
              }}
            >
              <Settings2 className="size-4" aria-hidden />
              {t("builder.actions.openSettings")}
            </Button>
          </div>

          <FormCanvas
            schema={builder.schema}
            selectedFieldId={builder.selectedFieldId}
            onSelectField={builder.selectField}
            onDuplicateField={builder.duplicateField}
            onRemoveField={builder.removeField}
            onMoveField={builder.moveField}
          />

          <Sheet
            open={isPaletteOpen}
            title={t("builder.palette.title")}
            side="left"
            closeLabel={t("common.actions.close")}
            onClose={() => {
              setIsPaletteOpen(false);
            }}
          >
            <FieldPalette onAddField={handleAddField} />
          </Sheet>

          <Sheet
            open={isSettingsOpen}
            title={t("builder.settings.title")}
            side="right"
            closeLabel={t("common.actions.close")}
            onClose={() => {
              setIsSettingsOpen(false);
            }}
          >
            <SettingsContent builder={builder} idPrefix="builder-settings-mobile" />
          </Sheet>
        </>
      )}

      <BuilderPreviewPanel schema={builder.schema} />

      <ConfirmDialog
        open={isResetDialogOpen}
        title={t("builder.resetDialog.title")}
        description={t("builder.resetDialog.description")}
        confirmLabel={t("builder.resetDialog.confirm")}
        cancelLabel={t("common.actions.cancel")}
        onCancel={() => {
          setIsResetDialogOpen(false);
        }}
        onConfirm={() => {
          builder.resetForm();
          setIsResetDialogOpen(false);
        }}
      />
    </div>
  );
}
