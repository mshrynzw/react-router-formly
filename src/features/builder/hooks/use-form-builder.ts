import { useEffect, useMemo, useRef, useState } from "react";

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
  type SaveFailureReason,
} from "@/domain/form-schema";

export type BuilderPanel = "form" | "field" | "submission";

export type BuilderSaveStatus = "saved" | "saving" | "failed";

const SAVE_DEBOUNCE_MS = 300;

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
  const [saveStatus, setSaveStatus] = useState<BuilderSaveStatus>("saved");
  const [saveFailureReason, setSaveFailureReason] = useState<SaveFailureReason | null>(null);

  const schemaRef = useRef(schema);
  const saveTimerRef = useRef<number | null>(null);

  const selectedField = getFieldById(schema, selectedFieldId);

  useEffect(() => {
    schemaRef.current = schema;
  }, [schema]);

  function clearSaveTimer() {
    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
  }

  function persistSchema(next: FormSchema): boolean {
    const result = saveFormToStorage(next);
    if (result.ok) {
      setSaveStatus("saved");
      setSaveFailureReason(null);
      return true;
    }

    setSaveStatus("failed");
    setSaveFailureReason(result.reason);
    return false;
  }

  function scheduleSave(next: FormSchema) {
    setSaveStatus("saving");
    setSaveFailureReason(null);
    clearSaveTimer();

    saveTimerRef.current = window.setTimeout(() => {
      saveTimerRef.current = null;
      persistSchema(next);
    }, SAVE_DEBOUNCE_MS);
  }

  useEffect(() => {
    const flushPendingSave = () => {
      clearSaveTimer();
      saveFormToStorage(schemaRef.current);
    };

    window.addEventListener("beforeunload", flushPendingSave);

    return () => {
      window.removeEventListener("beforeunload", flushPendingSave);
      flushPendingSave();
    };
  }, []);

  function commitSchema(next: FormSchema, nextSelectedFieldId?: string | null, immediate = false) {
    setSchema(next);
    schemaRef.current = next;

    if (immediate) {
      clearSaveTimer();
      persistSchema(next);
    } else {
      scheduleSave(next);
    }

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
    commitSchema(next, next.fields[0]?.id ?? null, true);
    setActivePanel("form");
    setLoadStatus("empty");
  }

  function handleRetryLoad() {
    const result = loadFormFromStorage();
    clearSaveTimer();
    setSchema(result.schema);
    schemaRef.current = result.schema;
    setLoadStatus(result.status);
    setSelectedFieldId(
      result.schema.fields.find((field) => field.type !== "submit")?.id ??
        result.schema.fields[0]?.id ??
        null,
    );
    setActivePanel("form");
    setSaveStatus("saved");
    setSaveFailureReason(null);
  }

  function handleRetrySave() {
    clearSaveTimer();
    persistSchema(schemaRef.current);
  }

  return {
    schema,
    selectedFieldId,
    selectedField,
    activePanel,
    loadStatus,
    saveStatus,
    saveFailureReason,
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
    retryLoad: handleRetryLoad,
    retrySave: handleRetrySave,
  };
}
