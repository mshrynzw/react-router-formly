import type { FormField, FormSchema } from "@/domain/form-schema";

import {
  getBooleanValue,
  getStringArrayValue,
  getStringValue,
  type FormValues,
} from "@/features/preview/utils/form-values";

export type FieldErrorCode =
  | "required"
  | "minLength"
  | "maxLength"
  | "min"
  | "max"
  | "pattern"
  | "email"
  | "number";

export type FieldErrors = Record<string, FieldErrorCode>;

function isEmptyString(value: string): boolean {
  return value.trim() === "";
}

function validateField(field: FormField, values: FormValues): FieldErrorCode | null {
  if (field.type === "submit") {
    return null;
  }

  const value = values[field.name];

  if (field.type === "checkbox") {
    if (field.options.length > 0) {
      const selected = getStringArrayValue(value);
      if (field.required && selected.length === 0) {
        return "required";
      }
      return null;
    }

    if (field.required && !getBooleanValue(value)) {
      return "required";
    }

    return null;
  }

  const stringValue = getStringValue(value);

  if (field.required && isEmptyString(stringValue)) {
    return "required";
  }

  if (isEmptyString(stringValue)) {
    return null;
  }

  if (field.type === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(stringValue)) {
      return "email";
    }
  }

  if (field.type === "number") {
    const numeric = Number(stringValue);
    if (!Number.isFinite(numeric)) {
      return "number";
    }

    if (field.validation.min !== undefined && numeric < field.validation.min) {
      return "min";
    }

    if (field.validation.max !== undefined && numeric > field.validation.max) {
      return "max";
    }
  }

  if (
    (field.type === "text" || field.type === "email" || field.type === "textarea") &&
    field.validation.minLength !== undefined &&
    stringValue.length < field.validation.minLength
  ) {
    return "minLength";
  }

  if (
    (field.type === "text" || field.type === "email" || field.type === "textarea") &&
    field.validation.maxLength !== undefined &&
    stringValue.length > field.validation.maxLength
  ) {
    return "maxLength";
  }

  if (
    (field.type === "text" || field.type === "email" || field.type === "textarea") &&
    field.validation.pattern
  ) {
    try {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(stringValue)) {
        return "pattern";
      }
    } catch {
      return "pattern";
    }
  }

  return null;
}

export function validateFormValues(schema: FormSchema, values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of schema.fields) {
    const error = validateField(field, values);
    if (error) {
      errors[field.name] = error;
    }
  }

  return errors;
}
