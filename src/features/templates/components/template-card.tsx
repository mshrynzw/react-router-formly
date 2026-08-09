import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import type { FormTemplateDefinition } from "@/features/templates/types";

interface TemplateCardProps {
  template: FormTemplateDefinition;
  onPreview: (template: FormTemplateDefinition) => void;
  onUse: (template: FormTemplateDefinition) => void;
}

export function TemplateCard({ template, onPreview, onUse }: TemplateCardProps) {
  const { t } = useTranslation();
  const fieldCount = template.fields.filter((field) => field.type !== "submit").length;

  return (
    <article className="flex h-full flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            {t(template.nameKey)}
          </h2>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            {t(`templates.categories.${template.category}`)}
          </p>
        </div>
        <p className="shrink-0 text-xs text-[var(--text-muted)]">
          {t("templates.fieldCount", { count: fieldCount })}
        </p>
      </div>

      <p className="mb-5 flex-1 text-sm text-[var(--text-secondary)]">
        {t(template.descriptionKey)}
      </p>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => {
            onPreview(template);
          }}
        >
          {t("templates.actions.preview")}
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            onUse(template);
          }}
        >
          {t("templates.actions.use")}
        </Button>
      </div>
    </article>
  );
}
