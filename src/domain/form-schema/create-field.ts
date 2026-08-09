import { createId } from "@/domain/form-schema/id";
import type { FieldOption, FieldType, FormField } from "@/domain/form-schema/types";

function createDefaultOptions(): FieldOption[] {
  return [
    {
      id: createId("option"),
      label: "Option 1",
      value: "option_1",
    },
    {
      id: createId("option"),
      label: "Option 2",
      value: "option_2",
    },
  ];
}

const defaultLabels: Record<FieldType, string> = {
  text: "Text",
  email: "Email",
  number: "Number",
  textarea: "Message",
  select: "Select",
  radio: "Radio",
  checkbox: "Checkbox",
  submit: "Submit",
};

export function createField(type: FieldType): FormField {
  const id = createId("field");
  const base = {
    id,
    name: `${type}_${id.slice(-8)}`,
    label: defaultLabels[type],
    description: "",
    placeholder: "",
    required: type !== "submit",
    validation: {},
  };

  switch (type) {
    case "text":
      return { ...base, type: "text" };
    case "email":
      return { ...base, type: "email" };
    case "number":
      return { ...base, type: "number" };
    case "textarea":
      return { ...base, type: "textarea" };
    case "select":
      return { ...base, type: "select", options: createDefaultOptions() };
    case "radio":
      return { ...base, type: "radio", options: createDefaultOptions() };
    case "checkbox":
      return { ...base, type: "checkbox", options: [] };
    case "submit":
      return {
        ...base,
        type: "submit",
        required: false,
        placeholder: "",
      };
  }
}
