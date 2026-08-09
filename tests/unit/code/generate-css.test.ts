import { describe, expect, it } from "vitest";

import { generateFormCss } from "@/features/code/generators/generate-css";

describe("generateFormCss", () => {
  it("includes core form, control, and state styles", () => {
    const css = generateFormCss();

    expect(css).toContain(".formly-form");
    expect(css).toContain(".formly-control");
    expect(css).toContain(".formly-submit");
    expect(css).toContain(".is-invalid");
    expect(css).toContain(".formly-success");
    expect(css).toContain("@media (max-width: 640px)");
  });
});
