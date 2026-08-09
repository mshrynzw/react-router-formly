import {
  FORM_SCHEMA_VERSION,
  type FormSchema,
} from "@/domain/form-schema/types";
import { parseFormSchema } from "@/domain/form-schema/zod-schema";

/** Pretty-printed JSON used for Form Schema export downloads. */
export function serializeFormSchema(schema: FormSchema): string {
  const parsed = parseFormSchema(schema);
  if (!parsed.success) {
    throw new Error("Cannot export an invalid Form Schema.");
  }

  return `${JSON.stringify(parsed.data, null, 2)}\n`;
}

export function getSchemaExportFilename(schema: FormSchema): string {
  const base = slugifyFormName(schema.name || "formly-form");
  return `${base}.formly.json`;
}

export function createExportDocument(schema: FormSchema): FormSchema {
  const parsed = parseFormSchema(schema);
  if (!parsed.success) {
    throw new Error("Cannot export an invalid Form Schema.");
  }

  return {
    ...parsed.data,
    version: FORM_SCHEMA_VERSION,
  };
}

function slugifyFormName(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "formly-form";
}
