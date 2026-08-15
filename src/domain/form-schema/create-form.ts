import { DEFAULT_FORM_APPEARANCE } from "@/domain/form-schema/appearance";
import { createField } from "@/domain/form-schema/create-field";
import { createId } from "@/domain/form-schema/id";
import { FORM_SCHEMA_VERSION, type FormSchema } from "@/domain/form-schema/types";

export function createEmptyForm(name = "Untitled Form"): FormSchema {
  return {
    version: FORM_SCHEMA_VERSION,
    id: createId("form"),
    name,
    description: "",
    fields: [createField("submit")],
    submission: {
      action: "",
      method: "POST",
    },
    appearance: {
      ...DEFAULT_FORM_APPEARANCE,
      colors: { ...DEFAULT_FORM_APPEARANCE.colors },
      radius: { ...DEFAULT_FORM_APPEARANCE.radius },
      typography: { ...DEFAULT_FORM_APPEARANCE.typography },
      spacing: { ...DEFAULT_FORM_APPEARANCE.spacing },
    },
  };
}
