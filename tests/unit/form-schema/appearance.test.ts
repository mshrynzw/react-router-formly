import { describe, expect, it } from "vitest";

import { appearanceColorToCss, DEFAULT_FORM_APPEARANCE, mergeAppearance, parseFormSchema } from "@/domain/form-schema";
import { createEmptyForm } from "@/domain/form-schema/create-form";

describe("form appearance", () => {
  it("fills defaults when appearance is missing", () => {
    const form = createEmptyForm("Legacy");
    const withoutAppearance: Record<string, unknown> = { ...form };
    delete withoutAppearance.appearance;

    const parsed = parseFormSchema(withoutAppearance);

    expect(parsed.success).toBe(true);
    if (!parsed.success) {
      return;
    }

    expect(parsed.data.appearance).toEqual(DEFAULT_FORM_APPEARANCE);
    expect(parsed.data.appearance.liquidGlass).toBe("off");
    expect(parsed.data.appearance.backdropVisible).toBe(true);
    expect(parsed.data.appearance.backdropId).toBe("01");
  });

  it("ignores invalid colors and cssFlavor values", () => {
    const merged = mergeAppearance({
      cssFlavor: "evil",
      colors: {
        text: "red; } body { background: url(javascript:alert(1))",
        accent: "#00ff00",
      },
    });

    expect(merged.cssFlavor).toBe("css");
    expect(merged.colors.text).toEqual(DEFAULT_FORM_APPEARANCE.colors.text);
    expect(merged.colors.accent).toEqual({ hex: "#00ff00", opacity: 100 });
  });

  it("clamps numeric tokens to allowed ranges", () => {
    const merged = mergeAppearance({
      radius: { form: 99, control: -4 },
      typography: { bodySize: 8, titleSize: 80 },
      spacing: { padding: 2, fieldGap: 100, maxWidth: 10 },
    });

    expect(merged.radius.form).toBe(32);
    expect(merged.radius.control).toBe(0);
    expect(merged.typography.bodySize).toBe(12);
    expect(merged.typography.titleSize).toBe(36);
    expect(merged.spacing.padding).toBe(8);
    expect(merged.spacing.fieldGap).toBe(32);
    expect(merged.spacing.maxWidth).toBe(320);
  });

  it("ignores invalid liquidGlass and backdrop tokens", () => {
    const merged = mergeAppearance({
      liquidGlass: "custom-css",
      backdropVisible: "yes",
      backdropId: "/etc/passwd",
    });

    expect(merged.liquidGlass).toBe("off");
    expect(merged.backdropVisible).toBe(true);
    expect(merged.backdropId).toBe("01");
  });

  it("accepts an allowlisted glass preset and hidden backdrop", () => {
    const merged = mergeAppearance({
      liquidGlass: "nebula",
      backdropVisible: false,
      backdropId: "06",
    });

    expect(merged.liquidGlass).toBe("nebula");
    expect(merged.backdropVisible).toBe(false);
    expect(merged.backdropId).toBe("06");
  });

  it("defaults border opacity to 10 and other colors to 100", () => {
    expect(DEFAULT_FORM_APPEARANCE.colors.border.opacity).toBe(10);
    expect(DEFAULT_FORM_APPEARANCE.colors.pageBackground.opacity).toBe(100);
    expect(DEFAULT_FORM_APPEARANCE.colors.accent.opacity).toBe(100);
  });

  it("treats legacy hex strings as fully opaque", () => {
    const merged = mergeAppearance({
      colors: {
        border: "#112233",
        text: "#abcdef",
      },
    });

    expect(merged.colors.border).toEqual({ hex: "#112233", opacity: 100 });
    expect(merged.colors.text).toEqual({ hex: "#abcdef", opacity: 100 });
  });

  it("clamps opacity and emits rgba below 100%", () => {
    const merged = mergeAppearance({
      colors: {
        border: { hex: "#d8d8e0", opacity: 50 },
        accent: { hex: "#00ff00", opacity: 140 },
      },
    });

    expect(merged.colors.border.opacity).toBe(50);
    expect(merged.colors.accent.opacity).toBe(100);
    expect(appearanceColorToCss(merged.colors.border)).toBe("rgba(216,216,224,0.5)");
    expect(appearanceColorToCss(merged.colors.accent)).toBe("#00ff00");
  });
});
