import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { getFocusableElements, trapFocus } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  title: string;
  side?: "left" | "right";
  onClose: () => void;
  children: ReactNode;
  closeLabel: string;
}

export function Sheet({
  open,
  title,
  side = "left",
  onClose,
  children,
  closeLabel,
}: SheetProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocused.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const panel = panelRef.current;
    const focusable = panel ? getFocusableElements(panel) : [];
    (focusable[0] ?? panel)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (panel) {
        trapFocus(event, panel);
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
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/55"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "absolute inset-y-0 flex w-[min(100%,20rem)] flex-col border-[var(--border-default)] bg-[var(--bg-surface)] shadow-[var(--shadow-md)] outline-none",
          side === "left" ? "left-0 border-r" : "right-0 border-l",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-4 py-3">
          <h2 id={titleId} className="text-sm font-semibold text-[var(--text-primary)]">
            {title}
          </h2>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            aria-label={closeLabel}
            onClick={onClose}
            className="min-h-11 min-w-11 sm:min-h-8 sm:min-w-8"
          >
            <X className="size-4" aria-hidden />
          </Button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
