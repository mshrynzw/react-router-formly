import { createEmptyForm } from "@/domain/form-schema/create-form";
import type { FormSchema } from "@/domain/form-schema/types";
import { parseFormSchema } from "@/domain/form-schema/zod-schema";

/**
 * LocalStorage persistence format (MVP single-form):
 *
 * - Key: `formly.activeForm`
 * - Value: JSON-serialized `FormSchema`
 * - Schema includes `version` for forward compatibility
 *
 * Stored data is always treated as untrusted input and validated on load.
 */
export const FORM_STORAGE_KEY = "formly.activeForm";

export type LoadFormResult =
  | { status: "ok"; schema: FormSchema }
  | { status: "empty"; schema: FormSchema }
  | { status: "invalid"; schema: FormSchema };

export type SaveFailureReason = "unavailable" | "quota" | "unknown";

export type SaveFormResult =
  | { ok: true }
  | { ok: false; reason: SaveFailureReason };

export type ClearFormResult =
  | { ok: true }
  | { ok: false; reason: SaveFailureReason };

function isQuotaExceededError(error: unknown): boolean {
  if (!(error instanceof DOMException)) {
    return false;
  }

  return (
    error.name === "QuotaExceededError" ||
    error.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
    // Legacy browsers
    error.code === 22 ||
    error.code === 1014
  );
}

function toFailureReason(error: unknown): SaveFailureReason {
  if (isQuotaExceededError(error)) {
    return "quota";
  }

  return "unknown";
}

export function hasStoredForm(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(FORM_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

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

export function saveFormToStorage(schema: FormSchema): SaveFormResult {
  if (typeof window === "undefined") {
    return { ok: false, reason: "unavailable" };
  }

  const parsed = parseFormSchema(schema);
  if (!parsed.success) {
    return { ok: false, reason: "unknown" };
  }

  try {
    window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(parsed.data));
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: toFailureReason(error) };
  }
}

export function clearFormFromStorage(): ClearFormResult {
  if (typeof window === "undefined") {
    return { ok: false, reason: "unavailable" };
  }

  try {
    window.localStorage.removeItem(FORM_STORAGE_KEY);
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: toFailureReason(error) };
  }
}
