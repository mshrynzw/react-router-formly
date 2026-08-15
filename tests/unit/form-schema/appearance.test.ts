import { describe, expect, it } from "vitest";

import { DEFAULT_FORM_APPEARANCE, mergeAppearance, parseFormSchema } from "@/domain/form-schema";
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
    expect(merged.colors.text).toBe(DEFAULT_FORM_APPEARANCE.colors.text);
    expect(merged.colors.accent).toBe("#00ff00");
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
});
