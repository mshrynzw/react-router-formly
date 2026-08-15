import { createId } from "@/domain/form-schema/id";
import { cloneAppearanceColors, DEFAULT_FORM_APPEARANCE } from "@/domain/form-schema/appearance";
import { normalizeFormSchema } from "@/domain/form-schema/normalization";
import { parseFormSchema } from "@/domain/form-schema/zod-schema";
import {
  FORM_SCHEMA_VERSION,
  type FieldOption,
  type FormField,
  type FormSchema,
} from "@/domain/form-schema/types";
import type { FormTemplateDefinition, TemplateFieldSpec } from "@/features/templates/types";

export type CreateFormFromTemplateResult =
  { ok: true; schema: FormSchema } | { ok: false; reason: "unknown_template" | "validation" };

export function createFormFromTemplate(
  template: FormTemplateDefinition,
  options?: {
    name?: string;
    description?: string;
  },
): CreateFormFromTemplateResult {
  const fields = template.fields.map((field) => buildField(field));

  const schema: FormSchema = {
    version: FORM_SCHEMA_VERSION,
    id: createId("form"),
    name: options?.name ?? template.defaultFormName,
    description: options?.description ?? template.defaultFormDescription,
    fields,
    submission: {
      action: template.submission.action,
      method: template.submission.method,
    },
    appearance: {
      ...DEFAULT_FORM_APPEARANCE,
      colors: cloneAppearanceColors(DEFAULT_FORM_APPEARANCE.colors),
      radius: { ...DEFAULT_FORM_APPEARANCE.radius },
      typography: { ...DEFAULT_FORM_APPEARANCE.typography },
      spacing: { ...DEFAULT_FORM_APPEARANCE.spacing },
    },
  };

  const parsed = parseFormSchema(schema);
  if (!parsed.success) {
    return { ok: false, reason: "validation" };
  }

  return {
    ok: true,
    schema: normalizeFormSchema(parsed.data),
  };
}

function buildField(spec: TemplateFieldSpec): FormField {
  const id = createId("field");
  const base = {
    id,
    name: spec.name ?? `${spec.type}_${id.slice(-8)}`,
    label: spec.label,
    description: spec.description ?? "",
    placeholder: spec.placeholder ?? "",
    required: spec.required ?? spec.type !== "submit",
    validation: spec.validation ?? {},
  };

  switch (spec.type) {
    case "text":
      return { ...base, type: "text" };
    case "email":
      return { ...base, type: "email" };
    case "number":
      return { ...base, type: "number" };
    case "textarea":
      return { ...base, type: "textarea" };
    case "select":
      return { ...base, type: "select", options: buildOptions(spec) };
    case "radio":
      return { ...base, type: "radio", options: buildOptions(spec) };
    case "checkbox":
      return { ...base, type: "checkbox", options: buildOptions(spec, false) };
    case "submit":
      return {
        ...base,
        type: "submit",
        required: false,
        placeholder: "",
      };
  }
}

function buildOptions(spec: TemplateFieldSpec, requireDefaults = true): FieldOption[] {
  if (spec.options && spec.options.length > 0) {
    return spec.options.map((option) => ({
      id: createId("option"),
      label: option.label,
      value: option.value,
    }));
  }

  if (!requireDefaults) {
    return [];
  }

  return [
    { id: createId("option"), label: "Option 1", value: "option_1" },
    { id: createId("option"), label: "Option 2", value: "option_2" },
  ];
}
