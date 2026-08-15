import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  APPEARANCE_COLOR_KEYS,
  APPEARANCE_LIMITS,
  DEFAULT_FORM_APPEARANCE,
  FONT_FAMILIES,
  SHADOW_LEVELS,
  type CssFlavor,
  type FontFamilyId,
  type FormAppearance,
  type FormSchema,
  type ShadowLevel,
} from "@/domain/form-schema";
import {
  AppearanceColorField,
  AppearanceNumberField,
} from "@/features/builder/components/appearance-fields";

interface AppearanceSettingsPanelProps {
  schema: FormSchema;
  onChange: (appearance: FormAppearance) => void;
}

const selectClassName =
  "flex h-10 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-input)] px-3 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]";

export function AppearanceSettingsPanel({ schema, onChange }: AppearanceSettingsPanelProps) {
  const { t } = useTranslation();
  const appearance = schema.appearance;

  function patch(next: FormAppearance) {
    onChange(next);
  }

  return (
    <div className="space-y-5">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--text-secondary)]">
          {t("builder.appearance.cssFlavor.label")}
        </legend>
        <div
          className="flex flex-wrap gap-1"
          role="group"
          aria-label={t("builder.appearance.cssFlavor.label")}
        >
          {(["css", "tailwind"] as const).map((flavor) => (
            <Button
              key={flavor}
              type="button"
              size="sm"
              variant={appearance.cssFlavor === flavor ? "default" : "secondary"}
              aria-pressed={appearance.cssFlavor === flavor}
              onClick={() => {
                patch({ ...appearance, cssFlavor: flavor satisfies CssFlavor });
              }}
            >
              {t(`builder.appearance.cssFlavor.options.${flavor}`)}
            </Button>
          ))}
        </div>
        <p className="text-xs text-[var(--text-muted)]">{t("builder.appearance.cssFlavor.help")}</p>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-[var(--text-secondary)]">
          {t("builder.appearance.colors.label")}
        </legend>
        <div className="grid gap-3">
          {APPEARANCE_COLOR_KEYS.map((key) => (
            <AppearanceColorField
              key={key}
              colorKey={key}
              value={appearance.colors[key]}
              onChange={(value) => {
                patch({
                  ...appearance,
                  colors: { ...appearance.colors, [key]: value },
                });
              }}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-[var(--text-secondary)]">
          {t("builder.appearance.radius.label")}
        </legend>
        <AppearanceNumberField
          id="appearance-radius-form"
          label={t("builder.appearance.radius.form")}
          value={appearance.radius.form}
          min={APPEARANCE_LIMITS.radius.min}
          max={APPEARANCE_LIMITS.radius.max}
          suffix="px"
          onChange={(form) => {
            patch({ ...appearance, radius: { ...appearance.radius, form } });
          }}
        />
        <AppearanceNumberField
          id="appearance-radius-control"
          label={t("builder.appearance.radius.control")}
          value={appearance.radius.control}
          min={APPEARANCE_LIMITS.radius.min}
          max={APPEARANCE_LIMITS.radius.max}
          suffix="px"
          onChange={(control) => {
            patch({ ...appearance, radius: { ...appearance.radius, control } });
          }}
        />
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-[var(--text-secondary)]">
          {t("builder.appearance.typography.label")}
        </legend>
        <div className="space-y-2">
          <Label htmlFor="appearance-font">{t("builder.appearance.typography.fontFamily")}</Label>
          <select
            id="appearance-font"
            className={selectClassName}
            value={appearance.typography.fontFamily}
            onChange={(event) => {
              patch({
                ...appearance,
                typography: {
                  ...appearance.typography,
                  fontFamily: event.target.value as FontFamilyId,
                },
              });
            }}
          >
            {FONT_FAMILIES.map((font) => (
              <option key={font} value={font}>
                {t(`builder.appearance.typography.fonts.${font}`)}
              </option>
            ))}
          </select>
        </div>
        <AppearanceNumberField
          id="appearance-body-size"
          label={t("builder.appearance.typography.bodySize")}
          value={appearance.typography.bodySize}
          min={APPEARANCE_LIMITS.bodySize.min}
          max={APPEARANCE_LIMITS.bodySize.max}
          suffix="px"
          onChange={(bodySize) => {
            patch({ ...appearance, typography: { ...appearance.typography, bodySize } });
          }}
        />
        <AppearanceNumberField
          id="appearance-title-size"
          label={t("builder.appearance.typography.titleSize")}
          value={appearance.typography.titleSize}
          min={APPEARANCE_LIMITS.titleSize.min}
          max={APPEARANCE_LIMITS.titleSize.max}
          suffix="px"
          onChange={(titleSize) => {
            patch({ ...appearance, typography: { ...appearance.typography, titleSize } });
          }}
        />
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-[var(--text-secondary)]">
          {t("builder.appearance.spacing.label")}
        </legend>
        <AppearanceNumberField
          id="appearance-padding"
          label={t("builder.appearance.spacing.padding")}
          value={appearance.spacing.padding}
          min={APPEARANCE_LIMITS.padding.min}
          max={APPEARANCE_LIMITS.padding.max}
          suffix="px"
          onChange={(padding) => {
            patch({ ...appearance, spacing: { ...appearance.spacing, padding } });
          }}
        />
        <AppearanceNumberField
          id="appearance-gap"
          label={t("builder.appearance.spacing.fieldGap")}
          value={appearance.spacing.fieldGap}
          min={APPEARANCE_LIMITS.fieldGap.min}
          max={APPEARANCE_LIMITS.fieldGap.max}
          suffix="px"
          onChange={(fieldGap) => {
            patch({ ...appearance, spacing: { ...appearance.spacing, fieldGap } });
          }}
        />
        <AppearanceNumberField
          id="appearance-max-width"
          label={t("builder.appearance.spacing.maxWidth")}
          value={appearance.spacing.maxWidth}
          min={APPEARANCE_LIMITS.maxWidth.min}
          max={APPEARANCE_LIMITS.maxWidth.max}
          suffix="px"
          onChange={(maxWidth) => {
            patch({ ...appearance, spacing: { ...appearance.spacing, maxWidth } });
          }}
        />
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="appearance-shadow">{t("builder.appearance.shadow.label")}</Label>
        <select
          id="appearance-shadow"
          className={selectClassName}
          value={appearance.shadow}
          onChange={(event) => {
            patch({ ...appearance, shadow: event.target.value as ShadowLevel });
          }}
        >
          {SHADOW_LEVELS.map((level) => (
            <option key={level} value={level}>
              {t(`builder.appearance.shadow.options.${level}`)}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => {
          patch({
            ...DEFAULT_FORM_APPEARANCE,
            colors: { ...DEFAULT_FORM_APPEARANCE.colors },
            radius: { ...DEFAULT_FORM_APPEARANCE.radius },
            typography: { ...DEFAULT_FORM_APPEARANCE.typography },
            spacing: { ...DEFAULT_FORM_APPEARANCE.spacing },
          });
        }}
      >
        {t("builder.appearance.reset")}
      </Button>
    </div>
  );
}
