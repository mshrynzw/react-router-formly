import type { CSSProperties } from "react";

import {
  APPEARANCE_COLOR_KEYS,
  CSS_FLAVORS,
  FONT_FAMILIES,
  SHADOW_LEVELS,
  type AppearanceColorKey,
  type AppearanceColors,
  type CssFlavor,
  type FontFamilyId,
  type FormAppearance,
  type ShadowLevel,
} from "@/domain/form-schema/types";

export const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export const APPEARANCE_LIMITS = {
  radius: { min: 0, max: 32 },
  bodySize: { min: 12, max: 20 },
  titleSize: { min: 16, max: 36 },
  padding: { min: 8, max: 48 },
  fieldGap: { min: 4, max: 32 },
  maxWidth: { min: 320, max: 800 },
} as const;

export const DEFAULT_FORM_APPEARANCE: FormAppearance = {
  cssFlavor: "css",
  colors: {
    pageBackground: "#f3f3f7",
    formBackground: "#ffffff",
    inputBackground: "#fafafc",
    text: "#16161d",
    muted: "#6b6b76",
    border: "#d8d8e0",
    accent: "#4c6fff",
    accentHover: "#3b5cf0",
    submitText: "#ffffff",
    danger: "#d64550",
    success: "#1f9d6a",
  },
  radius: {
    form: 14,
    control: 10,
  },
  typography: {
    fontFamily: "system",
    bodySize: 16,
    titleSize: 22,
  },
  spacing: {
    padding: 24,
    fieldGap: 16,
    maxWidth: 640,
  },
  shadow: "md",
};

export function isHexColor(value: unknown): value is string {
  return typeof value === "string" && HEX_COLOR_PATTERN.test(value);
}

export function isCssFlavor(value: unknown): value is CssFlavor {
  return typeof value === "string" && (CSS_FLAVORS as readonly string[]).includes(value);
}

export function isFontFamilyId(value: unknown): value is FontFamilyId {
  return typeof value === "string" && (FONT_FAMILIES as readonly string[]).includes(value);
}

export function isShadowLevel(value: unknown): value is ShadowLevel {
  return typeof value === "string" && (SHADOW_LEVELS as readonly string[]).includes(value);
}

export function fontFamilyToCss(fontFamily: FontFamilyId): string {
  switch (fontFamily) {
    case "system":
      return 'system-ui, -apple-system, "Segoe UI", sans-serif';
    case "sans":
      return 'ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    case "serif":
      return 'Georgia, "Times New Roman", serif';
    case "mono":
      return "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    case "rounded":
      return "ui-rounded, Nunito, system-ui, sans-serif";
  }
}

export function shadowToCss(shadow: ShadowLevel): string {
  switch (shadow) {
    case "none":
      return "none";
    case "sm":
      return "0 4px 16px -8px rgba(20, 20, 40, 0.14)";
    case "md":
      return "0 8px 28px -12px rgba(20, 20, 40, 0.18)";
  }
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

export function hexToRgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function mergeAppearance(value: unknown): FormAppearance {
  const next: FormAppearance = {
    cssFlavor: DEFAULT_FORM_APPEARANCE.cssFlavor,
    colors: { ...DEFAULT_FORM_APPEARANCE.colors },
    radius: { ...DEFAULT_FORM_APPEARANCE.radius },
    typography: { ...DEFAULT_FORM_APPEARANCE.typography },
    spacing: { ...DEFAULT_FORM_APPEARANCE.spacing },
    shadow: DEFAULT_FORM_APPEARANCE.shadow,
  };

  if (!isRecord(value)) {
    return next;
  }

  if (isCssFlavor(value.cssFlavor)) {
    next.cssFlavor = value.cssFlavor;
  }

  if (isRecord(value.colors)) {
    for (const key of APPEARANCE_COLOR_KEYS) {
      const color = value.colors[key];
      if (isHexColor(color)) {
        next.colors[key] = color;
      }
    }
  }

  if (isRecord(value.radius)) {
    next.radius.form = clampInt(
      value.radius.form,
      APPEARANCE_LIMITS.radius.min,
      APPEARANCE_LIMITS.radius.max,
      next.radius.form,
    );
    next.radius.control = clampInt(
      value.radius.control,
      APPEARANCE_LIMITS.radius.min,
      APPEARANCE_LIMITS.radius.max,
      next.radius.control,
    );
  }

  if (isRecord(value.typography)) {
    if (isFontFamilyId(value.typography.fontFamily)) {
      next.typography.fontFamily = value.typography.fontFamily;
    }
    next.typography.bodySize = clampInt(
      value.typography.bodySize,
      APPEARANCE_LIMITS.bodySize.min,
      APPEARANCE_LIMITS.bodySize.max,
      next.typography.bodySize,
    );
    next.typography.titleSize = clampInt(
      value.typography.titleSize,
      APPEARANCE_LIMITS.titleSize.min,
      APPEARANCE_LIMITS.titleSize.max,
      next.typography.titleSize,
    );
  }

  if (isRecord(value.spacing)) {
    next.spacing.padding = clampInt(
      value.spacing.padding,
      APPEARANCE_LIMITS.padding.min,
      APPEARANCE_LIMITS.padding.max,
      next.spacing.padding,
    );
    next.spacing.fieldGap = clampInt(
      value.spacing.fieldGap,
      APPEARANCE_LIMITS.fieldGap.min,
      APPEARANCE_LIMITS.fieldGap.max,
      next.spacing.fieldGap,
    );
    next.spacing.maxWidth = clampInt(
      value.spacing.maxWidth,
      APPEARANCE_LIMITS.maxWidth.min,
      APPEARANCE_LIMITS.maxWidth.max,
      next.spacing.maxWidth,
    );
  }

  if (isShadowLevel(value.shadow)) {
    next.shadow = value.shadow;
  }

  return next;
}

export function appearanceToCssVars(appearance: FormAppearance): CSSProperties {
  return {
    "--formly-page-bg": appearance.colors.pageBackground,
    "--formly-bg": appearance.colors.formBackground,
    "--formly-input-bg": appearance.colors.inputBackground,
    "--formly-text": appearance.colors.text,
    "--formly-muted": appearance.colors.muted,
    "--formly-border": appearance.colors.border,
    "--formly-accent": appearance.colors.accent,
    "--formly-accent-hover": appearance.colors.accentHover,
    "--formly-submit-text": appearance.colors.submitText,
    "--formly-danger": appearance.colors.danger,
    "--formly-success": appearance.colors.success,
    "--formly-radius-form": `${appearance.radius.form}px`,
    "--formly-radius": `${appearance.radius.control}px`,
    "--formly-font": fontFamilyToCss(appearance.typography.fontFamily),
    "--formly-body-size": `${appearance.typography.bodySize}px`,
    "--formly-title-size": `${appearance.typography.titleSize}px`,
    "--formly-padding": `${appearance.spacing.padding}px`,
    "--formly-gap": `${appearance.spacing.fieldGap}px`,
    "--formly-max-width": `${appearance.spacing.maxWidth}px`,
    "--formly-shadow": shadowToCss(appearance.shadow),
  } as CSSProperties;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.round(value)));
}

export type { AppearanceColorKey, AppearanceColors };
