import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { saveFormToStorage } from "@/domain/form-schema";
import { TemplateCard } from "@/features/templates/components/template-card";
import { TemplatePreviewDialog } from "@/features/templates/components/template-preview-dialog";
import { FORM_TEMPLATES, listFormTemplates } from "@/features/templates/data/templates";
import { createFormFromTemplate } from "@/features/templates/services/create-form-from-template";
import {
  TEMPLATE_CATEGORIES,
  type FormTemplateDefinition,
  type TemplateCategory,
} from "@/features/templates/types";
import { useRovingTabs } from "@/hooks/use-roving-tabs";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | TemplateCategory;

const categoryTabs: CategoryFilter[] = ["all", ...TEMPLATE_CATEGORIES];

export function TemplateGallery() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [previewTemplate, setPreviewTemplate] = useState<FormTemplateDefinition | null>(null);
  const [pendingTemplate, setPendingTemplate] = useState<FormTemplateDefinition | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tabs = useRovingTabs({
    tabs: categoryTabs,
    value: category,
    onChange: setCategory,
    idPrefix: "template-category",
  });

  const templates = useMemo(() => listFormTemplates(category), [category]);

  const previewSchema = useMemo(() => {
    if (!previewTemplate) {
      return null;
    }

    const result = createFormFromTemplate(previewTemplate, {
      name: t(previewTemplate.nameKey),
      description: t(previewTemplate.descriptionKey),
    });

    return result.ok ? result.schema : null;
  }, [previewTemplate, t]);

  const requestUseTemplate = (template: FormTemplateDefinition) => {
    setErrorMessage(null);
    setPendingTemplate(template);
  };

  const applyTemplate = (template: FormTemplateDefinition) => {
    const result = createFormFromTemplate(template, {
      name: t(template.nameKey),
      description: t(template.descriptionKey),
    });

    if (!result.ok) {
      setErrorMessage(t("templates.feedback.applyFailed"));
      return;
    }

    const saveResult = saveFormToStorage(result.schema);
    if (!saveResult.ok) {
      setErrorMessage(t("templates.feedback.saveFailed"));
      return;
    }

    setPendingTemplate(null);
    setPreviewTemplate(null);
    void navigate("/builder");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("templates.title")}
        </h1>
        <p className="max-w-2xl text-[var(--text-secondary)]">{t("templates.description")}</p>
      </div>

      <div
        role="tablist"
        aria-label={t("templates.categoriesLabel")}
        className="flex flex-wrap gap-1"
      >
        {categoryTabs.map((item) => (
          <button
            key={item}
            type="button"
            className={cn(
              "min-h-11 rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:min-h-8",
              category === item
                ? "bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]",
            )}
            {...tabs.getTabProps(item)}
            onClick={() => {
              setCategory(item);
            }}
          >
            {item === "all"
              ? t("templates.categories.all")
              : t(`templates.categories.${item}`)}
          </button>
        ))}
      </div>

      {errorMessage ? (
        <p role="alert" className="text-sm text-[var(--danger)]">
          {errorMessage}
        </p>
      ) : null}

      {templates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--border-default)] bg-[var(--bg-elevated)] p-8 text-center">
          <p className="font-medium text-[var(--text-primary)]">{t("templates.empty.title")}</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {t("templates.empty.description")}
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <li key={template.id}>
              <TemplateCard
                template={template}
                onPreview={setPreviewTemplate}
                onUse={requestUseTemplate}
              />
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-[var(--text-muted)]">
        {t("templates.catalogCount", { count: FORM_TEMPLATES.length })}
      </p>

      <TemplatePreviewDialog
        open={previewTemplate !== null}
        title={previewTemplate ? t(previewTemplate.nameKey) : ""}
        description={previewTemplate ? t(previewTemplate.descriptionKey) : ""}
        schema={previewSchema}
        onClose={() => {
          setPreviewTemplate(null);
        }}
        onUseTemplate={() => {
          if (previewTemplate) {
            requestUseTemplate(previewTemplate);
          }
        }}
      />

      <ConfirmDialog
        open={pendingTemplate !== null}
        title={t("templates.confirm.title")}
        description={t("templates.confirm.description")}
        confirmLabel={t("templates.confirm.confirm")}
        cancelLabel={t("common.actions.cancel")}
        onCancel={() => {
          setPendingTemplate(null);
        }}
        onConfirm={() => {
          if (pendingTemplate) {
            applyTemplate(pendingTemplate);
          }
        }}
      />
    </div>
  );
}
