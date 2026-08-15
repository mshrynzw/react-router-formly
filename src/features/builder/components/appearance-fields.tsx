import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APPEARANCE_LIMITS, HEX_COLOR_PATTERN, type AppearanceColor, type AppearanceColorKey } from "@/domain/form-schema";

export function AppearanceColorField({
  colorKey,
  value,
  onChange,
}: {
  colorKey: AppearanceColorKey;
  value: AppearanceColor;
  onChange: (value: AppearanceColor) => void;
}) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(value.hex);
  const [previousHex, setPreviousHex] = useState(value.hex);
  const inputId = `appearance-color-${colorKey}`;
  const opacityId = `${inputId}-opacity`;
  const opacityLabel = t("builder.appearance.colors.opacity");

  if (value.hex !== previousHex) {
    setPreviousHex(value.hex);
    setDraft(value.hex);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{t(`builder.appearance.colors.fields.${colorKey}`)}</Label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value.hex}
          aria-label={t(`builder.appearance.colors.fields.${colorKey}`)}
          className="h-10 w-12 shrink-0 cursor-pointer rounded-md border border-[var(--border-default)] bg-[var(--bg-input)] p-1"
          onChange={(event) => {
            onChange({ ...value, hex: event.target.value });
          }}
        />
        <Input
          id={inputId}
          value={draft}
          spellCheck={false}
          autoComplete="off"
          onChange={(event) => {
            const next = event.target.value;
            setDraft(next);
            if (HEX_COLOR_PATTERN.test(next)) {
              onChange({ ...value, hex: next });
            }
          }}
          onBlur={() => {
            setDraft(value.hex);
          }}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={opacityId}>{opacityLabel}</Label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={APPEARANCE_LIMITS.opacity.min}
            max={APPEARANCE_LIMITS.opacity.max}
            value={value.opacity}
            aria-label={opacityLabel}
            className="h-11 flex-1 accent-[var(--accent)]"
            onChange={(event) => {
              onChange({ ...value, opacity: Number.parseInt(event.target.value, 10) });
            }}
          />
          <Input
            id={opacityId}
            type="number"
            min={APPEARANCE_LIMITS.opacity.min}
            max={APPEARANCE_LIMITS.opacity.max}
            value={value.opacity}
            className="w-20"
            onChange={(event) => {
              const parsed = Number.parseInt(event.target.value, 10);
              if (!Number.isFinite(parsed)) {
                return;
              }

              onChange({
                ...value,
                opacity: Math.min(
                  APPEARANCE_LIMITS.opacity.max,
                  Math.max(APPEARANCE_LIMITS.opacity.min, parsed),
                ),
              });
            }}
          />
          <span className="text-xs text-[var(--text-muted)]">%</span>
        </div>
      </div>
    </div>
  );
}

export function AppearanceNumberField({
  id,
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) => {
            const parsed = Number.parseInt(event.target.value, 10);
            if (Number.isFinite(parsed)) {
              onChange(Math.min(max, Math.max(min, parsed)));
            }
          }}
        />
        <span className="text-xs text-[var(--text-muted)]">{suffix}</span>
      </div>
    </div>
  );
}
