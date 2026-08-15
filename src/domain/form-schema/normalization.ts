import { mergeAppearance } from "@/domain/form-schema/appearance";
import { FORM_SCHEMA_VERSION, type FormSchema } from "@/domain/form-schema/types";

/**
 * Normalize a validated Form Schema for Builder use.
 * Keeps canonical version and stable shape after import.
 */
export function normalizeFormSchema(schema: FormSchema): FormSchema {
  return {
    version: FORM_SCHEMA_VERSION,
    id: schema.id,
    name: schema.name,
    description: schema.description,
    fields: schema.fields.map((field) => ({ ...field })),
    submission: {
      action: schema.submission.action,
      method: schema.submission.method,
    },
    appearance: mergeAppearance(schema.appearance),
  };
}
