import { describe, expect, it } from "vitest";

import { createEmptyForm } from "@/domain/form-schema";
import { generateFormCss } from "@/features/code/generators/generate-css";

describe("generateFormCss", () => {
  it("includes core form, control, and state styles", () => {
    const css = generateFormCss(createEmptyForm());

    expect(css).toContain(".formly-form");
    expect(css).toContain(".formly-control");
    expect(css).toContain(".formly-submit");
    expect(css).toContain(".is-invalid");
    expect(css).toContain(".formly-success");
    expect(css).toContain("@media (max-width: 640px)");
  });

  it("interpolates appearance tokens into standalone CSS", () => {
    const schema = createEmptyForm();
    schema.appearance.colors.accent = "#112233";
    schema.appearance.colors.pageBackground = "#abcdef";
    schema.appearance.radius.control = 4;

    const css = generateFormCss(schema);

    expect(css).toContain("#112233");
    expect(css).toContain("#abcdef");
    expect(css).toContain("--formly-radius: 4px");
    expect(css).not.toContain("cdn.tailwindcss.com");
  });

  it("includes the default page backdrop and omits glass distortion", () => {
    const css = generateFormCss(createEmptyForm());

    expect(css).toContain(".formly-page--backdrop");
    expect(css).toContain("backdrops/01.avif");
    expect(css).not.toContain("feDisplacementMap");
    expect(css).not.toContain(".formly-form--glass");
  });

  it("emits liquid glass refraction CSS for an allowlisted preset", () => {
    const schema = createEmptyForm();
    schema.appearance.liquidGlass = "ocean";
    schema.appearance.backdropId = "03";

    const css = generateFormCss(schema);

    expect(css).toContain(".formly-form--glass");
    expect(css).toContain("filter: url(#formly-liquid-");
    expect(css).toContain("backdrops/03.avif");
    expect(css).toContain("backdrop-filter: blur(10px)");
    expect(css).toContain(".formly-form--glass::after");
    expect(css).not.toContain(".formly-glass-layer");
  });

  it("emits a companion stylesheet in Tailwind mode", () => {
    const schema = createEmptyForm();
    schema.appearance.cssFlavor = "tailwind";
    schema.appearance.colors.danger = "#aa0000";

    const css = generateFormCss(schema);

    expect(css).toContain("Tailwind companion stylesheet");
    expect(css).toContain("#aa0000");
    expect(css).toContain(".formly-sr-only");
    expect(css).not.toContain("max-width: 640px");
  });
});
