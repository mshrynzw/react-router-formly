import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormField } from "@/domain/form-schema";
import { hasOptions } from "@/domain/form-schema";

interface FieldSettingsPanelProps {
  field: FormField | null;
  onUpdateField: (fieldId: string, updater: (field: FormField) => FormField) => void;
  onAddOption: (fieldId: string) => void;
  onUpdateOption: (
    fieldId: string,
    optionId: string,
    patch: Partial<{ label: string; value: string }>,
  ) => void;
  onRemoveOption: (fieldId: string, optionId: string) => void;
}

function parseOptionalNumber(value: string): number | undefined {
  if (value.trim() === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function FieldSettingsPanel({
  field,
  onUpdateField,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: FieldSettingsPanelProps) {
  const { t } = useTranslation();

  if (!field) {
    return <p className="text-sm text-[var(--text-secondary)]">{t("builder.fieldSettings.empty")}</p>;
  }

  const supportsPlaceholder =
    field.type === "text" ||
    field.type === "email" ||
    field.type === "number" ||
    field.type === "textarea" ||
    field.type === "select";

  const supportsLength =
    field.type === "text" || field.type === "email" || field.type === "textarea";

  const supportsNumberBounds = field.type === "number";
  const supportsPattern = field.type === "text" || field.type === "email" || field.type === "textarea";
  const supportsRequired = field.type !== "submit";
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="field-label">{t("builder.fieldSettings.label")}</Label>
        <Input
          id="field-label"
          value={field.label}
          onChange={(event) => {
            onUpdateField(field.id, (current) => ({
              ...current,
              label: event.target.value,
            }));
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="field-name">{t("builder.fieldSettings.name")}</Label>
        <Input
          id="field-name"
          value={field.name}
          onChange={(event) => {
            onUpdateField(field.id, (current) => ({
              ...current,
              name: event.target.value,
            }));
          }}
        />
      </div>

      {supportsPlaceholder ? (
        <div className="space-y-2">
          <Label htmlFor="field-placeholder">{t("builder.fieldSettings.placeholder")}</Label>
          <Input
            id="field-placeholder"
            value={field.placeholder}
            onChange={(event) => {
              onUpdateField(field.id, (current) => ({
                ...current,
                placeholder: event.target.value,
              }));
            }}
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="field-description">{t("builder.fieldSettings.description")}</Label>
        <Textarea
          id="field-description"
          value={field.description}
          onChange={(event) => {
            onUpdateField(field.id, (current) => ({
              ...current,
              description: event.target.value,
            }));
          }}
        />
      </div>

      {supportsRequired ? (
        <label className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(event) => {
              onUpdateField(field.id, (current) => ({
                ...current,
                required: event.target.checked,
              }));
            }}
          />
          {t("builder.fieldSettings.required")}
        </label>
      ) : null}

      {supportsLength ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="field-min-length">{t("builder.fieldSettings.minLength")}</Label>
            <Input
              id="field-min-length"
              type="number"
              min={0}
              value={field.validation.minLength ?? ""}
              onChange={(event) => {
                const minLength = parseOptionalNumber(event.target.value);
                onUpdateField(field.id, (current) => ({
                  ...current,
                  validation: {
                    ...current.validation,
                    minLength,
                  },
                }));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field-max-length">{t("builder.fieldSettings.maxLength")}</Label>
            <Input
              id="field-max-length"
              type="number"
              min={0}
              value={field.validation.maxLength ?? ""}
              onChange={(event) => {
                const maxLength = parseOptionalNumber(event.target.value);
                onUpdateField(field.id, (current) => ({
                  ...current,
                  validation: {
                    ...current.validation,
                    maxLength,
                  },
                }));
              }}
            />
          </div>
        </div>
      ) : null}

      {supportsNumberBounds ? (
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label htmlFor="field-min">{t("builder.fieldSettings.min")}</Label>
            <Input
              id="field-min"
              type="number"
              value={field.validation.min ?? ""}
              onChange={(event) => {
                const min = parseOptionalNumber(event.target.value);
                onUpdateField(field.id, (current) => ({
                  ...current,
                  validation: {
                    ...current.validation,
                    min,
                  },
                }));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field-max">{t("builder.fieldSettings.max")}</Label>
            <Input
              id="field-max"
              type="number"
              value={field.validation.max ?? ""}
              onChange={(event) => {
                const max = parseOptionalNumber(event.target.value);
                onUpdateField(field.id, (current) => ({
                  ...current,
                  validation: {
                    ...current.validation,
                    max,
                  },
                }));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field-step">{t("builder.fieldSettings.step")}</Label>
            <Input
              id="field-step"
              type="number"
              value={field.validation.step ?? ""}
              onChange={(event) => {
                const step = parseOptionalNumber(event.target.value);
                onUpdateField(field.id, (current) => ({
                  ...current,
                  validation: {
                    ...current.validation,
                    step,
                  },
                }));
              }}
            />
          </div>
        </div>
      ) : null}

      {supportsPattern ? (
        <div className="space-y-2">
          <Label htmlFor="field-pattern">{t("builder.fieldSettings.pattern")}</Label>
          <Input
            id="field-pattern"
            value={field.validation.pattern ?? ""}
            placeholder={t("builder.fieldSettings.patternPlaceholder")}
            onChange={(event) => {
              const pattern = event.target.value;
              onUpdateField(field.id, (current) => ({
                ...current,
                validation: {
                  ...current.validation,
                  pattern: pattern === "" ? undefined : pattern,
                },
              }));
            }}
          />
        </div>
      ) : null}

      {hasOptions(field) ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium text-[var(--text-primary)]">
              {t("builder.fieldSettings.options")}
            </h3>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => {
                onAddOption(field.id);
              }}
            >
              {t("builder.actions.addOption")}
            </Button>
          </div>
          <ul className="space-y-3">
            {field.options.map((option) => (
              <li
                key={option.id}
                className="space-y-2 rounded-md border border-[var(--border-subtle)] p-3"
              >
                <Input
                  aria-label={t("builder.fieldSettings.optionLabel")}
                  value={option.label}
                  onChange={(event) => {
                    onUpdateOption(field.id, option.id, { label: event.target.value });
                  }}
                />
                <Input
                  aria-label={t("builder.fieldSettings.optionValue")}
                  value={option.value}
                  onChange={(event) => {
                    onUpdateOption(field.id, option.id, { value: event.target.value });
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    onRemoveOption(field.id, option.id);
                  }}
                >
                  {t("builder.actions.removeOption")}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
