import { describe, expect, it } from "vitest";

import {
  generateLiquidGlassSvg,
  getGlassBackdropBlur,
  getLiquidGlassPreset,
} from "@/domain/form-schema/liquid-glass";

describe("liquid glass presets", () => {
  it("blurs noise before displacing the source graphic", () => {
    const preset = getLiquidGlassPreset("plasma");
    expect(preset).not.toBeNull();
    if (!preset) {
      return;
    }

    const svg = generateLiquidGlassSvg("formly-liquid-test", preset);

    expect(svg.indexOf("feTurbulence")).toBeLessThan(svg.indexOf("feGaussianBlur"));
    expect(svg.indexOf("feGaussianBlur")).toBeLessThan(svg.indexOf("feDisplacementMap"));
    expect(svg).toContain('in="noise"');
    expect(svg).toContain('in2="blurred"');
    expect(svg).toContain('scale="180"');
    expect(svg).toContain('baseFrequency="0.035 0.035"');
    expect(getGlassBackdropBlur(preset)).toBe("blur(4px)");
  });

  it("uses a stronger frost for Frost Lens than Liquid Crystal", () => {
    const crystal = getLiquidGlassPreset("crystal");
    const frost = getLiquidGlassPreset("frost");

    expect(crystal?.backdropBlur).toBe(0);
    expect(crystal?.scale).toBe(85);
    expect(frost?.backdropBlur).toBe(22);
    expect(frost?.scale).toBe(55);
  });
});
