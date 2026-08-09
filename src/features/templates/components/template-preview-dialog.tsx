import { useEffect, useId, useRef } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import type { FormSchema } from "@/domain/form-schema";
import { FormRenderer } from "@/features/preview/components/form-renderer";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { getFocusableElements, trapFocus } from "@/lib/focus-trap";

interface TemplatePreviewDialogProps {
  open: boolean;
  title: string;
  description: string;
  schema: FormSchema | null;
  onClose: () => void;
  onUseTemplate: () => void;
}

export function TemplatePreviewDialog({
  open,
  title,
  description,
  schema,
  onClose,
  onUseTemplate,
}: TemplatePreviewDialogProps) {
  const { t } = useTranslation();
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocused.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusable = dialogRef.current ? getFocusableElements(dialogRef.current) : [];
    (focusable[0] ?? dialogRef.current)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (dialogRef.current) {
        trapFocus(event, dialogRef.current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open || !schema) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div aria-hidden="true" className="absolute inset-0 bg-black/55" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-[var(--shadow-md)] outline-none"
      >
        <div className="border-b border-[var(--border-subtle)] px-5 py-4">
          <h2 id={titleId} className="text-base font-semibold text-[var(--text-primary)]">
            {title}
          </h2>
          <p id={descriptionId} className="mt-1 text-sm text-[var(--text-secondary)]">
            {description}
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <FormRenderer schema={schema} viewport="mobile" compact />
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-[var(--border-subtle)] px-5 py-4">
          <Button type="button" size="sm" variant="secondary" onClick={onClose}>
            {t("common.actions.close")}
          </Button>
          <Button type="button" size="sm" onClick={onUseTemplate}>
            {t("templates.actions.use")}
          </Button>
        </div>
      </div>
    </div>
  );
}
