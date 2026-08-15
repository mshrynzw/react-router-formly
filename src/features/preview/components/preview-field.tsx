import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormField } from "@/domain/form-schema";
import {
  getBooleanValue,
  getStringArrayValue,
  getStringValue,
  type FieldValue,
} from "@/features/preview/utils/form-values";
import type { FieldErrorCode } from "@/features/preview/utils/validate-form-values";

interface PreviewFieldProps {
  field: FormField;
  value: FieldValue | undefined;
  error: FieldErrorCode | undefined;
  disabled?: boolean;
  onChange: (value: FieldValue) => void;
}

export function PreviewField({
  field,
  value,
  error,
  disabled = false,
  onChange,
}: PreviewFieldProps) {
  const { t } = useTranslation();

  if (field.type === "submit") {
    return null;
  }

  const controlId = `preview-field-${field.id}`;
  const errorId = `${controlId}-error`;
  const descriptionId = field.description ? `${controlId}-description` : undefined;
  const hasError = Boolean(error);
  const isGrouped =
    field.type === "radio" || (field.type === "checkbox" && field.options.length > 0);
  const isSingleCheckbox = field.type === "checkbox" && field.options.length === 0;
  const describedBy =
    [descriptionId, hasError ? errorId : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      {!isSingleCheckbox ? (
        <div className="flex items-baseline gap-2">
          {isGrouped ? (
            <span className="text-sm font-medium" style={{ color: "var(--formly-text)" }}>
              {field.label || t("preview.field.untitled")}
            </span>
          ) : (
            <Label htmlFor={controlId} className="text-[var(--formly-text)]">
              {field.label || t("preview.field.untitled")}
            </Label>
          )}
          {field.required ? (
            <span className="text-xs" style={{ color: "var(--formly-danger)" }} aria-hidden="true">
              *
            </span>
          ) : null}
        </div>
      ) : null}

      {field.description ? (
        <p id={descriptionId} className="text-xs" style={{ color: "var(--formly-muted)" }}>
          {field.description}
        </p>
      ) : null}

      {field.type === "textarea" ? (
        <Textarea
          id={controlId}
          name={field.name}
          value={getStringValue(value)}
          placeholder={field.placeholder}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className="border-[var(--formly-border)] bg-[var(--formly-input-bg)] text-[var(--formly-text)] placeholder:text-[var(--formly-muted)] focus-visible:ring-[var(--formly-accent)]"
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      ) : null}

      {field.type === "text" || field.type === "email" || field.type === "number" ? (
        <Input
          id={controlId}
          name={field.name}
          type={field.type}
          value={getStringValue(value)}
          placeholder={field.placeholder}
          disabled={disabled}
          min={field.validation.min}
          max={field.validation.max}
          step={field.validation.step}
          minLength={field.validation.minLength}
          maxLength={field.validation.maxLength}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className="border-[var(--formly-border)] bg-[var(--formly-input-bg)] text-[var(--formly-text)] placeholder:text-[var(--formly-muted)] focus-visible:ring-[var(--formly-accent)]"
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      ) : null}

      {field.type === "select" ? (
        <select
          id={controlId}
          name={field.name}
          value={getStringValue(value)}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className="flex h-10 w-full rounded-md border border-[var(--formly-border)] bg-[var(--formly-input-bg)] px-3 py-2 text-sm text-[var(--formly-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--formly-accent)] disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          <option value="">{field.placeholder || t("preview.field.selectPlaceholder")}</option>
          {field.options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {field.type === "radio" ? (
        <fieldset
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className="space-y-2"
        >
          <legend className="sr-only">{field.label || t("preview.field.untitled")}</legend>
          {field.options.map((option) => {
            const optionId = `${controlId}-${option.id}`;
            return (
              <label key={option.id} htmlFor={optionId} className="flex items-center gap-2 text-sm">
                <input
                  id={optionId}
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={getStringValue(value) === option.value}
                  onChange={() => {
                    onChange(option.value);
                  }}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </fieldset>
      ) : null}

      {field.type === "checkbox" && field.options.length === 0 ? (
        <div className="flex items-center gap-2">
          <label htmlFor={controlId} className="flex items-center gap-2 text-sm">
            <input
              id={controlId}
              type="checkbox"
              name={field.name}
              checked={getBooleanValue(value)}
              disabled={disabled}
              aria-invalid={hasError}
              aria-describedby={describedBy}
              onChange={(event) => {
                onChange(event.target.checked);
              }}
            />
            <span>{field.label || t("preview.field.untitled")}</span>
          </label>
          {field.required ? (
            <span className="text-xs" style={{ color: "var(--formly-danger)" }} aria-hidden="true">
              *
            </span>
          ) : null}
        </div>
      ) : null}

      {field.type === "checkbox" && field.options.length > 0 ? (
        <fieldset
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className="space-y-2"
        >
          <legend className="sr-only">{field.label || t("preview.field.untitled")}</legend>
          {field.options.map((option) => {
            const optionId = `${controlId}-${option.id}`;
            const selected = getStringArrayValue(value);
            return (
              <label key={option.id} htmlFor={optionId} className="flex items-center gap-2 text-sm">
                <input
                  id={optionId}
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  checked={selected.includes(option.value)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onChange([...selected, option.value]);
                      return;
                    }

                    onChange(selected.filter((item) => item !== option.value));
                  }}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </fieldset>
      ) : null}

      {error ? (
        <p id={errorId} className="text-xs" role="alert" style={{ color: "var(--formly-danger)" }}>
          {t(`preview.validation.${error}`)}
        </p>
      ) : null}
    </div>
  );
}
