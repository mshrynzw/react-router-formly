import { useEffect, useId, useRef } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import type { FormAppearance } from "@/domain/form-schema";
import { AppearanceEffectsFields } from "@/features/builder/components/appearance-effects-fields";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { getFocusableElements, trapFocus } from "@/lib/focus-trap";

interface BackdropSettingsDialogProps {
  open: boolean;
  appearance: FormAppearance;
  onChange: (appearance: FormAppearance) => void;
  onClose: () => void;
}

export function BackdropSettingsDialog({
  open,
  appearance,
  onChange,
  onClose,
}: BackdropSettingsDialogProps) {
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

  if (!open) {
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
        className="relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-[var(--shadow-md)] outline-none"
      >
        <div className="border-b border-[var(--border-subtle)] px-5 py-4">
          <h2 id={titleId} className="text-base font-semibold text-[var(--text-primary)]">
            {t("preview.backdropDialog.title")}
          </h2>
          <p id={descriptionId} className="mt-1 text-sm text-[var(--text-secondary)]">
            {t("preview.backdropDialog.description")}
          </p>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <AppearanceEffectsFields appearance={appearance} onChange={onChange} />
        </div>

        <div className="flex justify-end border-t border-[var(--border-subtle)] px-5 py-4">
          <Button type="button" size="sm" variant="secondary" onClick={onClose}>
            {t("common.actions.close")}
          </Button>
        </div>
      </div>
    </div>
  );
}
