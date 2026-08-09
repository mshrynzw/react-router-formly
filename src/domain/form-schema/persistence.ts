import { createEmptyForm } from "@/domain/form-schema/create-form";
import type { FormSchema } from "@/domain/form-schema/types";
import { parseFormSchema } from "@/domain/form-schema/zod-schema";

export const FORM_STORAGE_KEY = "formly.activeForm";

export type LoadFormResult =
  | { status: "ok"; schema: FormSchema }
  | { status: "empty"; schema: FormSchema }
  | { status: "invalid"; schema: FormSchema };

export function loadFormFromStorage(): LoadFormResult {
  if (typeof window === "undefined") {
    return { status: "empty", schema: createEmptyForm() };
  }

  try {
    const raw = window.localStorage.getItem(FORM_STORAGE_KEY);

    if (!raw) {
      return { status: "empty", schema: createEmptyForm() };
    }

    const parsedJson: unknown = JSON.parse(raw);
    const parsed = parseFormSchema(parsedJson);

    if (!parsed.success) {
      return { status: "invalid", schema: createEmptyForm() };
    }

    return { status: "ok", schema: parsed.data };
  } catch {
    return { status: "invalid", schema: createEmptyForm() };
  }
}

export function saveFormToStorage(schema: FormSchema): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(schema));
    return true;
  } catch {
    return false;
  }
}
