import type { FormField, FormSchema } from "@/domain/form-schema";

export type FieldValue = string | boolean | string[];

export type FormValues = Record<string, FieldValue>;

export function createInitialValues(schema: FormSchema): FormValues {
  const values: FormValues = {};

  for (const field of schema.fields) {
    if (field.type === "submit") {
      continue;
    }

    values[field.name] = getDefaultValue(field);
  }

  return values;
}

function getDefaultValue(field: FormField): FieldValue {
  switch (field.type) {
    case "checkbox":
      return field.options.length > 0 ? [] : false;
    case "radio":
    case "select":
    case "text":
    case "email":
    case "number":
    case "textarea":
      return "";
    case "submit":
      return "";
  }
}

export function getStringValue(value: FieldValue | undefined): string {
  if (typeof value === "string") {
    return value;
  }

  return "";
}

export function getBooleanValue(value: FieldValue | undefined): boolean {
  return value === true;
}

export function getStringArrayValue(value: FieldValue | undefined): string[] {
  return Array.isArray(value) ? value : [];
}
