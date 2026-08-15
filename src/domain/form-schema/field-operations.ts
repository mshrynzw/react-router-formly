import { mergeAppearance } from "@/domain/form-schema/appearance";
import { createField } from "@/domain/form-schema/create-field";
import { createId } from "@/domain/form-schema/id";
import type {
  FieldOption,
  FieldType,
  FormAppearance,
  FormField,
  FormSchema,
} from "@/domain/form-schema/types";
import { hasOptions } from "@/domain/form-schema/types";

function cloneField(field: FormField): FormField {
  const id = createId("field");
  const nextName = `${field.type}_${id.slice(-8)}`;

  if (hasOptions(field)) {
    return {
      ...field,
      id,
      name: nextName,
      options: field.options.map((option) => ({
        ...option,
        id: createId("option"),
      })),
    };
  }

  return {
    ...field,
    id,
    name: nextName,
  };
}

function insertBeforeSubmit(fields: FormField[], field: FormField): FormField[] {
  const submitIndex = fields.findIndex((item) => item.type === "submit");

  if (submitIndex === -1) {
    return [...fields, field];
  }

  return [...fields.slice(0, submitIndex), field, ...fields.slice(submitIndex)];
}

export function addField(schema: FormSchema, type: FieldType): FormSchema {
  const field = createField(type);

  if (type === "submit") {
    const hasSubmit = schema.fields.some((item) => item.type === "submit");
    if (hasSubmit) {
      return schema;
    }

    return {
      ...schema,
      fields: [...schema.fields, field],
    };
  }

  return {
    ...schema,
    fields: insertBeforeSubmit(schema.fields, field),
  };
}

export function removeField(schema: FormSchema, fieldId: string): FormSchema {
  const target = schema.fields.find((field) => field.id === fieldId);

  if (!target) {
    return schema;
  }

  if (target.type === "submit") {
    return schema;
  }

  return {
    ...schema,
    fields: schema.fields.filter((field) => field.id !== fieldId),
  };
}

export function duplicateField(schema: FormSchema, fieldId: string): FormSchema {
  const index = schema.fields.findIndex((field) => field.id === fieldId);

  if (index === -1) {
    return schema;
  }

  const source = schema.fields[index];

  if (!source || source.type === "submit") {
    return schema;
  }

  const duplicated = cloneField(source);
  const fields = [...schema.fields];
  fields.splice(index + 1, 0, duplicated);

  return {
    ...schema,
    fields,
  };
}

export function moveField(
  schema: FormSchema,
  fieldId: string,
  direction: "up" | "down",
): FormSchema {
  const index = schema.fields.findIndex((field) => field.id === fieldId);

  if (index === -1) {
    return schema;
  }

  const field = schema.fields[index];

  if (!field || field.type === "submit") {
    return schema;
  }

  const targetIndex = direction === "up" ? index - 1 : index + 1;

  if (targetIndex < 0 || targetIndex >= schema.fields.length) {
    return schema;
  }

  const swapTarget = schema.fields[targetIndex];

  if (!swapTarget || swapTarget.type === "submit") {
    return schema;
  }

  const fields = [...schema.fields];
  fields[index] = swapTarget;
  fields[targetIndex] = field;

  return {
    ...schema,
    fields,
  };
}

export function updateField(
  schema: FormSchema,
  fieldId: string,
  updater: (field: FormField) => FormField,
): FormSchema {
  return {
    ...schema,
    fields: schema.fields.map((field) => (field.id === fieldId ? updater(field) : field)),
  };
}

export function updateFormMeta(
  schema: FormSchema,
  patch: Partial<Pick<FormSchema, "name" | "description">>,
): FormSchema {
  return {
    ...schema,
    ...patch,
  };
}

export function updateSubmission(
  schema: FormSchema,
  patch: Partial<FormSchema["submission"]>,
): FormSchema {
  return {
    ...schema,
    submission: {
      ...schema.submission,
      ...patch,
    },
  };
}

export function updateAppearance(schema: FormSchema, appearance: FormAppearance): FormSchema {
  return {
    ...schema,
    appearance: mergeAppearance(appearance),
  };
}

export function addOption(schema: FormSchema, fieldId: string): FormSchema {
  return updateField(schema, fieldId, (field) => {
    if (!hasOptions(field)) {
      return field;
    }

    const nextIndex = field.options.length + 1;
    const option: FieldOption = {
      id: createId("option"),
      label: `Option ${nextIndex}`,
      value: `option_${nextIndex}`,
    };

    return {
      ...field,
      options: [...field.options, option],
    };
  });
}

export function updateOption(
  schema: FormSchema,
  fieldId: string,
  optionId: string,
  patch: Partial<Pick<FieldOption, "label" | "value">>,
): FormSchema {
  return updateField(schema, fieldId, (field) => {
    if (!hasOptions(field)) {
      return field;
    }

    return {
      ...field,
      options: field.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              ...patch,
            }
          : option,
      ),
    };
  });
}

export function removeOption(schema: FormSchema, fieldId: string, optionId: string): FormSchema {
  return updateField(schema, fieldId, (field) => {
    if (!hasOptions(field)) {
      return field;
    }

    if (field.type !== "checkbox" && field.options.length <= 1) {
      return field;
    }

    return {
      ...field,
      options: field.options.filter((option) => option.id !== optionId),
    };
  });
}

export function getFieldById(schema: FormSchema, fieldId: string | null): FormField | null {
  if (!fieldId) {
    return null;
  }

  return schema.fields.find((field) => field.id === fieldId) ?? null;
}
