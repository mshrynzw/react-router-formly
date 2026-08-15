import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HEX_COLOR_PATTERN, type AppearanceColorKey } from "@/domain/form-schema";

export function AppearanceColorField({
  colorKey,
  value,
  onChange,
}: {
  colorKey: AppearanceColorKey;
  value: string;
  onChange: (value: string) => void;
}) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const inputId = `appearance-color-${colorKey}`;

  if (value !== previousValue) {
    setPreviousValue(value);
    setDraft(value);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{t(`builder.appearance.colors.fields.${colorKey}`)}</Label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          aria-label={t(`builder.appearance.colors.fields.${colorKey}`)}
          className="h-10 w-12 shrink-0 cursor-pointer rounded-md border border-[var(--border-default)] bg-[var(--bg-input)] p-1"
          onChange={(event) => {
            onChange(event.target.value);
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
              onChange(next);
            }
          }}
          onBlur={() => {
            setDraft(value);
          }}
        />
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
