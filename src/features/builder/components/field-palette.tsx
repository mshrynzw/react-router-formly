import {
  CheckSquare,
  CircleDot,
  Hash,
  List,
  Mail,
  Send,
  TextCursorInput,
  Type,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { FIELD_TYPES, type FieldType } from "@/domain/form-schema";

const fieldIcons: Record<FieldType, typeof Type> = {
  text: Type,
  email: Mail,
  number: Hash,
  textarea: TextCursorInput,
  select: List,
  radio: CircleDot,
  checkbox: CheckSquare,
  submit: Send,
};

interface FieldPaletteProps {
  onAddField: (type: FieldType) => void;
}

export function FieldPalette({ onAddField }: FieldPaletteProps) {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="field-palette-title"
      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
    >
      <h2 id="field-palette-title" className="mb-3 text-sm font-semibold text-[var(--text-primary)]">
        {t("builder.palette.title")}
      </h2>
      <ul className="grid gap-2">
        {FIELD_TYPES.map((type) => {
          const Icon = fieldIcons[type];

          return (
            <li key={type}>
              <Button
                type="button"
                variant="secondary"
                className="h-auto w-full justify-start gap-3 px-3 py-2.5 text-left"
                onClick={() => {
                  onAddField(type);
                }}
              >
                <Icon className="size-4 shrink-0 text-[var(--text-muted)]" aria-hidden />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate">{t(`builder.fields.types.${type}`)}</span>
                  <span className="truncate text-xs font-normal text-[var(--text-muted)]">
                    {t(`builder.fields.descriptions.${type}`)}
                  </span>
                </span>
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
