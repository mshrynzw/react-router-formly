import { FORM_SCHEMA_VERSION, type FormSchema } from "@/domain/form-schema/types";
import { normalizeFormSchema } from "@/domain/form-schema/normalization";
import { parseFormSchema } from "@/domain/form-schema/zod-schema";

/** Soft limit for imported Form Schema JSON files (1 MiB). */
export const MAX_IMPORT_FILE_BYTES = 1_048_576;

export type ImportFailureReason =
  | "too_large"
  | "parse"
  | "unsupported_version"
  | "validation";

export type ImportFormResult =
  | { ok: true; schema: FormSchema }
  | { ok: false; reason: ImportFailureReason };

export function importFormSchemaFromText(
  text: string,
  byteLength = measureUtf8Bytes(text),
): ImportFormResult {
  if (byteLength > MAX_IMPORT_FILE_BYTES) {
    return { ok: false, reason: "too_large" };
  }

  let data: unknown;

  try {
    data = JSON.parse(text) as unknown;
  } catch {
    return { ok: false, reason: "parse" };
  }

  return importFormSchemaFromUnknown(data);
}

export function importFormSchemaFromUnknown(data: unknown): ImportFormResult {
  if (hasUnsupportedVersion(data)) {
    return { ok: false, reason: "unsupported_version" };
  }

  const parsed = parseFormSchema(data);
  if (!parsed.success) {
    return { ok: false, reason: "validation" };
  }

  return {
    ok: true,
    schema: normalizeFormSchema(parsed.data),
  };
}

export async function importFormSchemaFromFile(file: File): Promise<ImportFormResult> {
  if (file.size > MAX_IMPORT_FILE_BYTES) {
    return { ok: false, reason: "too_large" };
  }

  try {
    const text = await file.text();
    return importFormSchemaFromText(text, file.size);
  } catch {
    return { ok: false, reason: "parse" };
  }
}

function hasUnsupportedVersion(data: unknown): boolean {
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return false;
  }

  if (!("version" in data)) {
    return false;
  }

  const version = (data as { version: unknown }).version;
  return typeof version === "number" && version !== FORM_SCHEMA_VERSION;
}

function measureUtf8Bytes(text: string): number {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(text).length;
  }

  return text.length;
}
