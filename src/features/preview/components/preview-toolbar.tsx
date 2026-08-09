import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import type { PreviewViewport } from "@/features/preview/components/form-renderer";
import { cn } from "@/lib/utils";

const viewports: PreviewViewport[] = ["desktop", "tablet", "mobile"];

interface PreviewToolbarProps {
  viewport: PreviewViewport;
  simulateError: boolean;
  onViewportChange: (viewport: PreviewViewport) => void;
  onSimulateErrorChange: (value: boolean) => void;
}

export function PreviewToolbar({
  viewport,
  simulateError,
  onViewportChange,
  onSimulateErrorChange,
}: PreviewToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="group"
        aria-label={t("preview.toolbar.viewportLabel")}
        className="flex flex-wrap gap-1"
      >
        {viewports.map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant={viewport === item ? "default" : "secondary"}
            aria-pressed={viewport === item}
            onClick={() => {
              onViewportChange(item);
            }}
          >
            {t(`preview.toolbar.viewport.${item}`)}
          </Button>
        ))}
      </div>

      <label
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 rounded-md border border-[var(--border-default)] px-3 py-2 text-xs text-[var(--text-secondary)]",
        )}
      >
        <input
          type="checkbox"
          checked={simulateError}
          onChange={(event) => {
            onSimulateErrorChange(event.target.checked);
          }}
        />
        <span>{t("preview.toolbar.simulateError")}</span>
      </label>
    </div>
  );
}
