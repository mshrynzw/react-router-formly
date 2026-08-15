import { useId, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { appearanceToCssVars, isLiquidGlassEnabled, type FormSchema } from "@/domain/form-schema";
import { PreviewField } from "@/features/preview/components/preview-field";
import { PreviewGlassLayers } from "@/features/preview/components/preview-glass-layers";
import {
  createInitialValues,
  type FieldValue,
  type FormValues,
} from "@/features/preview/utils/form-values";
import { mockSubmitForm, type MockSubmitResult } from "@/features/preview/utils/mock-submit";
import {
  validateFormValues,
  type FieldErrors,
} from "@/features/preview/utils/validate-form-values";
import { cn } from "@/lib/utils";

export type PreviewViewport = "desktop" | "tablet" | "mobile";

interface FormRendererProps {
  schema: FormSchema;
  viewport?: PreviewViewport;
  simulateError?: boolean;
  compact?: boolean;
  className?: string;
}

function getSubmitLabel(schema: FormSchema, fallback: string): string {
  const submitField = schema.fields.find((field) => field.type === "submit");
  if (!submitField || submitField.label.trim() === "") {
    return fallback;
  }

  return submitField.label;
}

function countInteractiveFields(schema: FormSchema): number {
  return schema.fields.filter((field) => field.type !== "submit").length;
}

function getValuesSignature(schema: FormSchema): string {
  return schema.fields
    .filter((field) => field.type !== "submit")
    .map((field) => {
      const optionCount = "options" in field ? field.options.length : 0;
      return `${field.id}:${field.name}:${field.type}:${optionCount}`;
    })
    .join("|");
}

function mergeFormValues(schema: FormSchema, previous: FormValues): FormValues {
  const next = createInitialValues(schema);

  for (const key of Object.keys(next)) {
    if (key in previous) {
      next[key] = previous[key]!;
    }
  }

  return next;
}

export function FormRenderer({
  schema,
  viewport = "desktop",
  simulateError = false,
  compact = false,
  className,
}: FormRendererProps) {
  const { t } = useTranslation();
  const formTitleId = useId();
  const glassFilterId = `preview-liquid-${useId().replace(/:/g, "")}`;
  const glassOn = isLiquidGlassEnabled(schema.appearance);
  const backdropOn = schema.appearance.backdropVisible;
  const valuesSignature = getValuesSignature(schema);
  const [trackedSignature, setTrackedSignature] = useState(valuesSignature);
  const [values, setValues] = useState<FormValues>(() => createInitialValues(schema));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<MockSubmitResult | null>(null);

  if (valuesSignature !== trackedSignature) {
    setTrackedSignature(valuesSignature);
    setValues((previous) => mergeFormValues(schema, previous));
    setErrors({});
  }

  const interactiveCount = countInteractiveFields(schema);

  if (interactiveCount === 0) {
    return (
      <div
        className={cn(
          "rounded-xl border border-dashed border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 text-center",
          className,
        )}
      >
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          {t("preview.empty.title")}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {t("preview.empty.description")}
        </p>
      </div>
    );
  }

  const handleValueChange = (name: string, value: FieldValue) => {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
    setErrors((previous) => {
      if (!(name in previous)) {
        return previous;
      }

      const next = { ...previous };
      delete next[name];
      return next;
    });
    setResult(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateFormValues(schema, values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setResult(null);
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionResult = await mockSubmitForm(schema, values, {
        simulateError,
        delayMs: compact ? 150 : 250,
      });
      setResult(submissionResult);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetResult = () => {
    setResult(null);
  };

  return (
    <div
      className={cn(
        "mx-auto w-full rounded-xl transition-[max-width] duration-200",
        viewport === "desktop" && "max-w-2xl",
        viewport === "tablet" && "max-w-[768px]",
        viewport === "mobile" && "max-w-[375px]",
        className,
      )}
      style={{
        ...appearanceToCssVars(schema.appearance),
        backgroundColor: "var(--formly-page-bg)",
        backgroundImage: backdropOn ? "var(--formly-backdrop)" : undefined,
        backgroundSize: backdropOn ? "cover" : undefined,
        backgroundPosition: backdropOn ? "center" : undefined,
        backgroundRepeat: backdropOn ? "no-repeat" : undefined,
        backgroundAttachment: backdropOn ? "fixed" : undefined,
        padding: compact ? "0.75rem" : "1rem",
      }}
    >
      <form
        aria-labelledby={formTitleId}
        className={cn("relative w-full max-w-full overflow-hidden border", glassOn && "isolate")}
        style={{
          background: glassOn ? "transparent" : "var(--formly-bg)",
          color: "var(--formly-text)",
          borderColor: "var(--formly-border)",
          borderRadius: "var(--formly-radius-form)",
          boxShadow: glassOn
            ? "var(--formly-shadow), 0px 0px 21px -8px rgba(255, 255, 255, 0.3)"
            : "var(--formly-shadow)",
          fontFamily: "var(--formly-font)",
          fontSize: "var(--formly-body-size)",
          padding: compact ? "1rem" : "var(--formly-padding)",
          maxWidth: "min(var(--formly-max-width), 100%)",
          margin: "0 auto",
          display: "grid",
          gap: "var(--formly-gap)",
        }}
        noValidate
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        {glassOn ? <PreviewGlassLayers appearance={schema.appearance} filterId={glassFilterId} /> : null}
        <div className="relative z-[2] space-y-1">
          <h3
            id={formTitleId}
            className="font-semibold tracking-tight"
            style={{ fontSize: "var(--formly-title-size)", color: "var(--formly-text)" }}
          >
            {schema.name || t("preview.form.untitled")}
          </h3>
          {schema.description ? (
            <p className="text-sm" style={{ color: "var(--formly-muted)" }}>
              {schema.description}
            </p>
          ) : null}
        </div>

        <div className="relative z-[2] grid" style={{ gap: "var(--formly-gap)" }}>
          {schema.fields.map((field) => (
            <PreviewField
              key={field.id}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              disabled={isSubmitting}
              onChange={(value) => {
                handleValueChange(field.name, value);
              }}
            />
          ))}
        </div>

        <div className="relative z-[2] flex flex-wrap items-center gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-10 items-center justify-center border-0 px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-65"
            style={{
              background: "var(--formly-accent)",
              color: "var(--formly-submit-text)",
              borderRadius: "var(--formly-radius)",
              fontFamily: "inherit",
            }}
          >
            {isSubmitting
              ? t("preview.actions.submitting")
              : getSubmitLabel(schema, t("preview.actions.submit"))}
          </button>
          {result ? (
            <Button type="button" variant="secondary" size="sm" onClick={handleResetResult}>
              {t("preview.actions.tryAgain")}
            </Button>
          ) : null}
        </div>

        {result?.status === "success" ? (
          <div
            role="status"
            className="relative z-[2] p-4 text-sm"
            style={{
              borderRadius: "var(--formly-radius)",
              border: "1px solid var(--formly-success)",
              color: "var(--formly-text)",
            }}
          >
            <p className="font-medium" style={{ color: "var(--formly-success)" }}>
              {t("preview.submission.successTitle")}
            </p>
            <p className="mt-1" style={{ color: "var(--formly-muted)" }}>
              {t("preview.submission.successDescription")}
            </p>
            <dl className="mt-3 space-y-1 text-xs" style={{ color: "var(--formly-muted)" }}>
              <div className="flex gap-2">
                <dt className="font-medium">{t("preview.submission.method")}</dt>
                <dd>{result.method}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">{t("preview.submission.action")}</dt>
                <dd>{result.action || t("preview.submission.actionEmpty")}</dd>
              </div>
            </dl>
          </div>
        ) : null}

        {result?.status === "error" ? (
          <div
            role="alert"
            className="relative z-[2] p-4 text-sm"
            style={{
              borderRadius: "var(--formly-radius)",
              border: "1px solid var(--formly-danger)",
              color: "var(--formly-text)",
            }}
          >
            <p className="font-medium" style={{ color: "var(--formly-danger)" }}>
              {t("preview.submission.errorTitle")}
            </p>
            <p className="mt-1" style={{ color: "var(--formly-muted)" }}>
              {t(result.messageKey)}
            </p>
          </div>
        ) : null}
      </form>
    </div>
  );
}
