import type { FormAppearance, FormSchema, ShadowLevel } from "@/domain/form-schema";

function cx(...parts: Array<string | false | undefined>): string {
  return parts.filter((part): part is string => Boolean(part)).join(" ");
}

function fontClass(appearance: FormAppearance): string {
  switch (appearance.typography.fontFamily) {
    case "serif":
      return "font-serif";
    case "mono":
      return "font-mono";
    default:
      return "font-sans";
  }
}

function shadowClass(shadow: ShadowLevel): string {
  switch (shadow) {
    case "none":
      return "shadow-none";
    case "sm":
      return "shadow-md";
    case "md":
      return "shadow-lg";
  }
}

export interface FormHtmlClassNames {
  page: string;
  form: string;
  header: string;
  title: string;
  description: string;
  fields: string;
  field: string;
  fieldset: string;
  label: string;
  required: string;
  descriptionText: string;
  control: string;
  options: string;
  option: string;
  error: string;
  actions: string;
  submit: string;
  success: string;
  formError: string;
}

const SEMANTIC: FormHtmlClassNames = {
  page: "formly-page",
  form: "formly-form",
  header: "formly-form-header",
  title: "formly-form-title",
  description: "formly-form-description",
  fields: "formly-fields",
  field: "formly-field",
  fieldset: "formly-field formly-fieldset",
  label: "formly-label",
  required: "formly-required",
  descriptionText: "formly-description",
  control: "formly-control",
  options: "formly-options",
  option: "formly-option",
  error: "formly-error",
  actions: "formly-actions",
  submit: "formly-submit",
  success: "formly-success",
  formError: "formly-form-error",
};

function tailwindClassNames(appearance: FormAppearance): FormHtmlClassNames {
  const colors = appearance.colors;
  const radiusForm = `rounded-[${appearance.radius.form}px]`;
  const radiusControl = `rounded-[${appearance.radius.control}px]`;

  return {
    page: cx(SEMANTIC.page, "m-0 min-h-screen px-4 py-8", `bg-[${colors.pageBackground}]`),
    form: cx(
      SEMANTIC.form,
      "box-border mx-auto w-full border",
      `max-w-[${appearance.spacing.maxWidth}px]`,
      `p-[${appearance.spacing.padding}px]`,
      `bg-[${colors.formBackground}]`,
      `text-[${colors.text}]`,
      `border-[${colors.border}]`,
      `text-[${appearance.typography.bodySize}px]`,
      "leading-normal",
      fontClass(appearance),
      radiusForm,
      shadowClass(appearance.shadow),
    ),
    header: cx(SEMANTIC.header, "mb-5"),
    title: cx(
      SEMANTIC.title,
      "m-0 font-semibold tracking-tight",
      `text-[${appearance.typography.titleSize}px]`,
    ),
    description: cx(SEMANTIC.description, "mt-2 mb-0", `text-[${colors.muted}]`, "text-[0.95rem]"),
    fields: cx(SEMANTIC.fields, "grid", `gap-[${appearance.spacing.fieldGap}px]`),
    field: cx(SEMANTIC.field, "m-0 min-w-0 p-0 border-0"),
    fieldset: cx(SEMANTIC.fieldset, "m-0 min-w-0 p-0 border-0"),
    label: cx(SEMANTIC.label, "mb-1.5 block text-[0.9rem] font-semibold"),
    required: cx(SEMANTIC.required, `text-[${colors.danger}]`),
    descriptionText: cx(
      SEMANTIC.descriptionText,
      "mb-2 mt-0 text-[0.82rem]",
      `text-[${colors.muted}]`,
    ),
    control: cx(
      SEMANTIC.control,
      "box-border block w-full min-h-10 px-3 py-2 font-[inherit]",
      `bg-[${colors.inputBackground}]`,
      `text-[${colors.text}]`,
      `border border-[${colors.border}]`,
      radiusControl,
    ),
    options: cx(SEMANTIC.options, "grid gap-2"),
    option: cx(SEMANTIC.option, "flex items-center gap-2 text-[0.92rem]"),
    error: cx(SEMANTIC.error, "mt-1.5 mb-0 text-[0.8rem]", `text-[${colors.danger}]`),
    actions: cx(SEMANTIC.actions, "mt-1"),
    submit: cx(
      SEMANTIC.submit,
      "inline-flex min-h-10 cursor-pointer items-center justify-center border-0 px-[1.1rem] font-[inherit] font-semibold",
      `bg-[${colors.accent}]`,
      `text-[${colors.submitText}]`,
      radiusControl,
    ),
    success: cx(
      SEMANTIC.success,
      "mt-4 px-4 py-3 text-[0.9rem]",
      radiusControl,
      `text-[${colors.success}]`,
      `border border-[${colors.success}]`,
    ),
    formError: cx(
      SEMANTIC.formError,
      "mt-4 px-4 py-3 text-[0.9rem]",
      radiusControl,
      `text-[${colors.danger}]`,
      `border border-[${colors.danger}]`,
    ),
  };
}

export function getFormHtmlClassNames(schema: FormSchema): FormHtmlClassNames {
  if (schema.appearance.cssFlavor === "tailwind") {
    return tailwindClassNames(schema.appearance);
  }

  return SEMANTIC;
}
