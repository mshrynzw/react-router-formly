import { ArrowDown, ArrowUp, Copy, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import type { FormField, FormSchema } from "@/domain/form-schema";
import { cn } from "@/lib/utils";

interface FormCanvasProps {
  schema: FormSchema;
  selectedFieldId: string | null;
  onSelectField: (fieldId: string) => void;
  onDuplicateField: (fieldId: string) => void;
  onRemoveField: (fieldId: string) => void;
  onMoveField: (fieldId: string, direction: "up" | "down") => void;
  className?: string;
}

function fieldPreview(field: FormField, t: (key: string) => string) {
  if (field.type === "submit") {
    return (
      <span className="inline-flex rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs text-[var(--text-on-accent)]">
        {field.label || t("builder.fields.types.submit")}
      </span>
    );
  }

  if (field.type === "textarea") {
    return (
      <span className="block h-12 rounded-md border border-dashed border-[var(--border-default)] bg-[var(--bg-canvas)]" />
    );
  }

  return (
    <span className="block h-8 rounded-md border border-dashed border-[var(--border-default)] bg-[var(--bg-canvas)]" />
  );
}

export function FormCanvas({
  schema,
  selectedFieldId,
  onSelectField,
  onDuplicateField,
  onRemoveField,
  onMoveField,
  className,
}: FormCanvasProps) {
  const { t } = useTranslation();
  const editableFields = schema.fields.filter((field) => field.type !== "submit");
  const isEmpty = editableFields.length === 0;

  return (
    <section
      aria-labelledby="form-canvas-title"
      className={cn(
        "rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 id="form-canvas-title" className="text-sm font-semibold text-[var(--text-primary)]">
            {t("builder.canvas.title")}
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{schema.name}</p>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          {t("builder.canvas.fieldCount", { count: editableFields.length })}
        </p>
      </div>

      {isEmpty ? (
        <div className="rounded-lg border border-dashed border-[var(--border-default)] bg-[var(--bg-canvas)] px-4 py-10 text-center">
          <p className="font-medium text-[var(--text-primary)]">{t("builder.empty.title")}</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{t("builder.empty.description")}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {schema.fields.map((field, index) => {
            const isSelected = field.id === selectedFieldId;
            const canMoveUp =
              field.type !== "submit" &&
              index > 0 &&
              schema.fields[index - 1]?.type !== "submit";
            const canMoveDown =
              field.type !== "submit" &&
              index < schema.fields.length - 1 &&
              schema.fields[index + 1]?.type !== "submit";

            return (
              <li key={field.id}>
                <div
                  className={cn(
                    "rounded-lg border p-3 transition-colors",
                    isSelected
                      ? "border-[var(--accent)] bg-[var(--accent-subtle)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-[var(--border-default)]",
                  )}
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => {
                      onSelectField(field.id);
                    }}
                    aria-pressed={isSelected}
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                          {field.label || t(`builder.fields.types.${field.type}`)}
                          {field.required && field.type !== "submit" ? (
                            <span className="ml-1 text-[var(--danger)]" aria-hidden>
                              *
                            </span>
                          ) : null}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {t(`builder.fields.types.${field.type}`)}
                        </p>
                      </div>
                    </div>
                    {fieldPreview(field, t)}
                  </button>

                  <div className="mt-3 flex flex-wrap gap-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={!canMoveUp}
                      aria-label={t("builder.actions.moveUp")}
                      className="min-w-11 sm:min-w-8"
                      onClick={() => {
                        onMoveField(field.id, "up");
                      }}
                    >
                      <ArrowUp className="size-3.5" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={!canMoveDown}
                      aria-label={t("builder.actions.moveDown")}
                      className="min-w-11 sm:min-w-8"
                      onClick={() => {
                        onMoveField(field.id, "down");
                      }}
                    >
                      <ArrowDown className="size-3.5" aria-hidden />
                    </Button>
                    {field.type !== "submit" ? (
                      <>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          aria-label={t("builder.actions.duplicate")}
                          className="min-w-11 sm:min-w-8"
                          onClick={() => {
                            onDuplicateField(field.id);
                          }}
                        >
                          <Copy className="size-3.5" aria-hidden />
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          aria-label={t("builder.actions.delete")}
                          className="min-w-11 sm:min-w-8"
                          onClick={() => {
                            onRemoveField(field.id);
                          }}
                        >
                          <Trash2 className="size-3.5" aria-hidden />
                        </Button>
                      </>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
