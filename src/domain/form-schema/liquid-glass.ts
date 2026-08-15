import type { BackdropId, FormAppearance, LiquidGlassId } from "@/domain/form-schema/types";

export interface LiquidGlassPreset {
  id: Exclude<LiquidGlassId, "off">;
  baseFrequency: number;
  octaves: number;
  seed: number;
  noiseBlur: number;
  scale: number;
  backdropBlur: number;
  insetBlur: number;
  insetSpread: number;
}

const SHARED_SEED = 92;
const SHARED_OCTAVES = 2;
const SHARED_NOISE_BLUR = 2;

export const LIQUID_GLASS_PRESETS: Record<Exclude<LiquidGlassId, "off">, LiquidGlassPreset> = {
  crystal: {
    id: "crystal",
    baseFrequency: 0.012,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 85,
    backdropBlur: 0,
    insetBlur: 5,
    insetSpread: -8,
  },
  amber: {
    id: "amber",
    baseFrequency: 0.018,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 120,
    backdropBlur: 12,
    insetBlur: 4,
    insetSpread: -8,
  },
  ice: {
    id: "ice",
    baseFrequency: 0.018,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 120,
    backdropBlur: 12,
    insetBlur: 4,
    insetSpread: -8,
  },
  mercury: {
    id: "mercury",
    baseFrequency: 0.008,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 150,
    backdropBlur: 15,
    insetBlur: 12,
    insetSpread: -4,
  },
  ocean: {
    id: "ocean",
    baseFrequency: 0.015,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 95,
    backdropBlur: 10,
    insetBlur: 4,
    insetSpread: -8,
  },
  mist: {
    id: "mist",
    baseFrequency: 0.02,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 110,
    backdropBlur: 14,
    insetBlur: 8,
    insetSpread: -2,
  },
  molten: {
    id: "molten",
    baseFrequency: 0.02,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 110,
    backdropBlur: 14,
    insetBlur: 8,
    insetSpread: -2,
  },
  silk: {
    id: "silk",
    baseFrequency: 0.006,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 45,
    backdropBlur: 18,
    insetBlur: 6,
    insetSpread: -3,
  },
  plasma: {
    id: "plasma",
    baseFrequency: 0.035,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 180,
    backdropBlur: 4,
    insetBlur: 3,
    insetSpread: -10,
  },
  frost: {
    id: "frost",
    baseFrequency: 0.01,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 55,
    backdropBlur: 22,
    insetBlur: 14,
    insetSpread: -4,
  },
  aurora: {
    id: "aurora",
    baseFrequency: 0.022,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 100,
    backdropBlur: 11,
    insetBlur: 7,
    insetSpread: -5,
  },
  nebula: {
    id: "nebula",
    baseFrequency: 0.028,
    octaves: SHARED_OCTAVES,
    seed: SHARED_SEED,
    noiseBlur: SHARED_NOISE_BLUR,
    scale: 130,
    backdropBlur: 16,
    insetBlur: 9,
    insetSpread: -7,
  },
};

export function isLiquidGlassEnabled(appearance: FormAppearance): boolean {
  return appearance.liquidGlass !== "off";
}

export function getLiquidGlassPreset(id: LiquidGlassId): LiquidGlassPreset | null {
  if (id === "off") {
    return null;
  }

  return LIQUID_GLASS_PRESETS[id];
}

export function getBackdropPublicPath(id: BackdropId): string {
  return `/backdrops/${id}.avif`;
}

export function getBackdropExportPath(id: BackdropId): string {
  return `backdrops/${id}.avif`;
}

export function getBackdropCssImage(id: BackdropId, kind: "app" | "export"): string {
  const path = kind === "app" ? getBackdropPublicPath(id) : getBackdropExportPath(id);
  return `url("${path}")`;
}

export function sanitizeFilterId(value: string): string {
  const sanitized = value.replace(/[^a-zA-Z0-9_-]/g, "");
  return sanitized.length > 0 ? sanitized : "formly-liquid-filter";
}

export function getLiquidGlassFilterId(schemaId: string): string {
  return sanitizeFilterId(`formly-liquid-${schemaId}`);
}

export function getGlassInsetShadow(preset: LiquidGlassPreset): string {
  return `inset 0 0 ${preset.insetBlur}px ${preset.insetSpread}px rgba(255, 255, 255, 0.7)`;
}

export function getGlassBackdropBlur(preset: LiquidGlassPreset): string {
  return `blur(${preset.backdropBlur}px)`;
}

export function generateLiquidGlassSvg(filterId: string, preset: LiquidGlassPreset): string {
  const id = sanitizeFilterId(filterId);
  const frequency = `${preset.baseFrequency} ${preset.baseFrequency}`;

  return `<svg class="formly-glass-svg" aria-hidden="true" focusable="false" width="0" height="0"><defs><filter id="${id}" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="${preset.octaves}" seed="${preset.seed}" result="noise"/><feGaussianBlur in="noise" stdDeviation="${preset.noiseBlur}" result="blurred"/><feDisplacementMap in="SourceGraphic" in2="blurred" scale="${preset.scale}" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>`;
}
