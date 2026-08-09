import { useMemo, useState } from "react";

import {
  addField,
  addOption,
  createEmptyForm,
  duplicateField,
  getFieldById,
  loadFormFromStorage,
  moveField,
  removeField,
  removeOption,
  saveFormToStorage,
  updateField,
  updateFormMeta,
  updateOption,
  updateSubmission,
  type FieldType,
  type FormField,
  type FormSchema,
  type HttpMethod,
} from "@/domain/form-schema";

export type BuilderPanel = "form" | "field" | "submission";

export function useFormBuilder() {
  const initial = useMemo(() => loadFormFromStorage(), []);
  const [schema, setSchema] = useState<FormSchema>(initial.schema);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(
    initial.schema.fields.find((field) => field.type !== "submit")?.id ??
      initial.schema.fields[0]?.id ??
      null,
  );
  const [activePanel, setActivePanel] = useState<BuilderPanel>("form");
  const [loadStatus, setLoadStatus] = useState<"ok" | "empty" | "invalid">(initial.status);
  const [isSaveFailed, setIsSaveFailed] = useState(false);

  const selectedField = getFieldById(schema, selectedFieldId);

  function commitSchema(next: FormSchema, nextSelectedFieldId?: string | null) {
    setSchema(next);
    setIsSaveFailed(!saveFormToStorage(next));

    if (nextSelectedFieldId !== undefined) {
      setSelectedFieldId(nextSelectedFieldId);
    } else if (
      selectedFieldId !== null &&
      !next.fields.some((field) => field.id === selectedFieldId)
    ) {
      setSelectedFieldId(next.fields[0]?.id ?? null);
    }
  }

  function selectField(fieldId: string) {
    setSelectedFieldId(fieldId);
    setActivePanel("field");
  }

  function handleAddField(type: FieldType) {
    const next = addField(schema, type);
    const added = next.fields.find(
      (field) => !schema.fields.some((existing) => existing.id === field.id),
    );

    commitSchema(next, added?.id ?? selectedFieldId);

    if (added) {
      setActivePanel("field");
    }

    setLoadStatus("ok");
  }

  function handleRemoveField(fieldId: string) {
    commitSchema(removeField(schema, fieldId));
  }

  function handleDuplicateField(fieldId: string) {
    const next = duplicateField(schema, fieldId);
    const sourceIndex = schema.fields.findIndex((field) => field.id === fieldId);
    const duplicatedId = next.fields[sourceIndex + 1]?.id ?? selectedFieldId;

    commitSchema(next, duplicatedId);

    if (duplicatedId) {
      setActivePanel("field");
    }
  }

  function handleMoveField(fieldId: string, direction: "up" | "down") {
    commitSchema(moveField(schema, fieldId, direction));
  }

  function handleUpdateField(fieldId: string, updater: (field: FormField) => FormField) {
    commitSchema(updateField(schema, fieldId, updater));
  }

  function handleUpdateFormMeta(patch: Partial<Pick<FormSchema, "name" | "description">>) {
    commitSchema(updateFormMeta(schema, patch));
  }

  function handleUpdateSubmission(patch: Partial<{ action: string; method: HttpMethod }>) {
    commitSchema(updateSubmission(schema, patch));
  }

  function handleResetForm() {
    const next = createEmptyForm();
    commitSchema(next, next.fields[0]?.id ?? null);
    setActivePanel("form");
    setLoadStatus("empty");
  }

  return {
    schema,
    selectedFieldId,
    selectedField,
    activePanel,
    loadStatus,
    isSaveFailed,
    setActivePanel,
    selectField,
    addField: handleAddField,
    removeField: handleRemoveField,
    duplicateField: handleDuplicateField,
    moveField: handleMoveField,
    updateField: handleUpdateField,
    updateFormMeta: handleUpdateFormMeta,
    updateSubmission: handleUpdateSubmission,
    addOption: (fieldId: string) => {
      commitSchema(addOption(schema, fieldId));
    },
    updateOption: (
      fieldId: string,
      optionId: string,
      patch: Partial<{ label: string; value: string }>,
    ) => {
      commitSchema(updateOption(schema, fieldId, optionId, patch));
    },
    removeOption: (fieldId: string, optionId: string) => {
      commitSchema(removeOption(schema, fieldId, optionId));
    },
    resetForm: handleResetForm,
  };
}
