import { createId } from "@/domain/form-schema/id";
import { createField } from "@/domain/form-schema/create-field";
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
  };
}
