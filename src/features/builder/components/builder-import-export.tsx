import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  getSchemaExportFilename,
  importFormSchemaFromFile,
  serializeFormSchema,
  type FormSchema,
  type ImportFailureReason,
} from "@/domain/form-schema";
import { downloadTextFile } from "@/features/code/utils/download-text-file";

type FeedbackStatus =
  | "idle"
  | "exported"
  | "exportFailed"
  | "imported"
  | ImportFailureReason;

interface BuilderImportExportProps {
  schema: FormSchema;
  onImport: (schema: FormSchema) => void;
}

export function BuilderImportExport({ schema, onImport }: BuilderImportExportProps) {
  const { t } = useTranslation();
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingSchemaRef = useRef<FormSchema | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackStatus>("idle");

  useEffect(() => {
    if (feedback === "idle") {
      return;
    }

    const timer = window.setTimeout(() => {
      setFeedback("idle");
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [feedback]);

  const handleExport = () => {
    try {
      const json = serializeFormSchema(schema);
      downloadTextFile(
        getSchemaExportFilename(schema),
        json,
        "application/json;charset=utf-8",
      );
      setFeedback("exported");
    } catch {
      setFeedback("exportFailed");
    }
  };

  const handleImportPick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";

    if (!file) {
      return;
    }

    const result = await importFormSchemaFromFile(file);
    if (!result.ok) {
      pendingSchemaRef.current = null;
      setFeedback(result.reason);
      return;
    }

    pendingSchemaRef.current = result.schema;
    setIsConfirmOpen(true);
  };

  const handleConfirmImport = () => {
    const next = pendingSchemaRef.current;
    pendingSchemaRef.current = null;
    setIsConfirmOpen(false);

    if (!next) {
      return;
    }

    onImport(next);
    setFeedback("imported");
  };

  const feedbackMessage = (() => {
    switch (feedback) {
      case "idle":
        return null;
      case "exported":
        return t("builder.export.success");
      case "exportFailed":
        return t("builder.export.failed");
      case "imported":
        return t("builder.import.success");
      case "too_large":
        return t("builder.import.failedTooLarge");
      case "parse":
        return t("builder.import.failedParse");
      case "unsupported_version":
        return t("builder.import.failedVersion");
      case "validation":
        return t("builder.import.failedValidation");
    }
  })();

  const isErrorFeedback =
    feedback === "exportFailed" ||
    feedback === "too_large" ||
    feedback === "parse" ||
    feedback === "unsupported_version" ||
    feedback === "validation";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" size="sm" variant="secondary" onClick={handleExport}>
        {t("builder.actions.export")}
      </Button>
      <Button type="button" size="sm" variant="secondary" onClick={handleImportPick}>
        {t("builder.actions.import")}
      </Button>
      <input
        id={inputId}
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => {
          void handleFileChange(event);
        }}
      />

      {feedbackMessage ? (
        <p
          role={isErrorFeedback ? "alert" : "status"}
          className={
            isErrorFeedback ? "text-xs text-[var(--danger)]" : "text-xs text-[var(--success)]"
          }
        >
          {feedbackMessage}
        </p>
      ) : null}

      <ConfirmDialog
        open={isConfirmOpen}
        title={t("builder.import.dialog.title")}
        description={t("builder.import.dialog.description")}
        confirmLabel={t("builder.import.dialog.confirm")}
        cancelLabel={t("common.actions.cancel")}
        onCancel={() => {
          pendingSchemaRef.current = null;
          setIsConfirmOpen(false);
        }}
        onConfirm={handleConfirmImport}
      />
    </div>
  );
}
