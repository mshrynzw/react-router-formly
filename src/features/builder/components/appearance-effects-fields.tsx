import { useTranslation } from "react-i18next";

import {
  BACKDROP_IDS,
  LIQUID_GLASS_IDS,
  getBackdropPublicPath,
  type BackdropId,
  type FormAppearance,
  type LiquidGlassId,
} from "@/domain/form-schema";
import { cn } from "@/lib/utils";

interface AppearanceEffectsFieldsProps {
  appearance: FormAppearance;
  onChange: (appearance: FormAppearance) => void;
}

const presetButtonClassName =
  "rounded-md border p-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]";

export function AppearanceEffectsFields({ appearance, onChange }: AppearanceEffectsFieldsProps) {
  const { t } = useTranslation();

  return (
    <>
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--text-secondary)]">
          {t("builder.appearance.liquidGlass.label")}
        </legend>
        <p className="text-xs text-[var(--text-muted)]">{t("builder.appearance.liquidGlass.help")}</p>
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3"
          role="group"
          aria-label={t("builder.appearance.liquidGlass.label")}
        >
          {LIQUID_GLASS_IDS.map((id) => {
            const selected = appearance.liquidGlass === id;

            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                className={cn(
                  presetButtonClassName,
                  "min-h-11 px-2.5 py-2 text-center text-[11px] font-medium leading-tight text-[var(--text-primary)]",
                  selected
                    ? "border-[var(--accent)] bg-[var(--accent-subtle)]"
                    : "border-[var(--border-default)] bg-[var(--bg-input)] hover:bg-[var(--bg-surface-hover)]",
                )}
                onClick={() => {
                  onChange({ ...appearance, liquidGlass: id satisfies LiquidGlassId });
                }}
              >
                {t(`builder.appearance.liquidGlass.options.${id}`)}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-[var(--text-secondary)]">
          {t("builder.appearance.backdrop.label")}
        </legend>
        <label className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--text-primary)]">
          <input
            type="checkbox"
            checked={appearance.backdropVisible}
            onChange={(event) => {
              onChange({ ...appearance, backdropVisible: event.target.checked });
            }}
          />
          <span>{t("builder.appearance.backdrop.visible")}</span>
        </label>
        <p className="text-xs text-[var(--text-muted)]">{t("builder.appearance.backdrop.help")}</p>
        <div
          className="grid grid-cols-3 gap-2"
          role="group"
          aria-label={t("builder.appearance.backdrop.choose")}
        >
          {BACKDROP_IDS.map((id) => {
            const selected = appearance.backdropId === id;

            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                aria-label={t("builder.appearance.backdrop.option", { id })}
                className={cn(
                  presetButtonClassName,
                  selected
                    ? "border-[var(--accent)] bg-[var(--accent-subtle)]"
                    : "border-[var(--border-default)] bg-[var(--bg-input)] hover:bg-[var(--bg-surface-hover)]",
                )}
                onClick={() => {
                  onChange({ ...appearance, backdropId: id satisfies BackdropId });
                }}
              >
                <img
                  src={getBackdropPublicPath(id)}
                  alt=""
                  className="h-14 w-full rounded-[6px] object-cover"
                />
              </button>
            );
          })}
        </div>
      </fieldset>
    </>
  );
}
