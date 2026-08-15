import { describe, expect, it } from "vitest";

import { createEmptyForm, createField } from "@/domain/form-schema";
import { generateFormHtml } from "@/features/code/generators/generate-html";

describe("generateFormHtml", () => {
  it("reflects submission action and method", () => {
    const schema = createEmptyForm("Contact");
    schema.submission = {
      action: "https://example.com/submit",
      method: "GET",
    };

    const html = generateFormHtml(schema);

    expect(html).toContain('method="GET"');
    expect(html).toContain('action="https://example.com/submit"');
    expect(html).toContain('type="submit"');
  });

  it("escapes malicious labels and placeholders", () => {
    const schema = createEmptyForm("XSS");
    const text = createField("text");
    text.label = `<img src=x onerror=alert(1)>`;
    text.placeholder = `" onclick="alert(1)`;
    text.required = true;
    schema.fields = [text, ...schema.fields];

    const html = generateFormHtml(schema);

    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
    expect(html).toContain('placeholder="&quot; onclick=&quot;alert(1)"');
  });

  it("generates accessible labels and required markers", () => {
    const schema = createEmptyForm("Contact");
    const email = createField("email");
    email.label = "Email";
    email.required = true;
    schema.fields = [email, ...schema.fields];

    const html = generateFormHtml(schema);

    expect(html).toContain(`for="field_${email.id}"`);
    expect(html).toContain(`id="field_${email.id}"`);
    expect(html).toContain('class="formly-required"');
    expect(html).toContain("required");
  });

  it("generates select options", () => {
    const schema = createEmptyForm("Survey");
    const select = createField("select");
    select.label = "Color";
    schema.fields = [select, ...schema.fields];

    const html = generateFormHtml(schema);

    expect(html).toContain("<select");
    expect(html).toContain("Option 1");
    expect(html).toContain('value="option_1"');
  });

  it("adds Tailwind utility classes when cssFlavor is tailwind", () => {
    const schema = createEmptyForm("Contact");
    schema.appearance.cssFlavor = "tailwind";
    schema.appearance.colors.formBackground = "#123456";

    const html = generateFormHtml(schema);

    expect(html).toContain("formly-form");
    expect(html).toContain("bg-[#123456]");
    expect(html).toContain("font-sans");
  });

  it("does not emit glass layers when liquid glass is off", () => {
    const html = generateFormHtml(createEmptyForm("Contact"));

    expect(html).not.toContain("formly-form--glass");
    expect(html).not.toContain("feDisplacementMap");
    expect(html).not.toContain("formly-glass-layer");
  });

  it("emits an SVG displacement filter when liquid glass is on", () => {
    const schema = createEmptyForm("Contact");
    schema.appearance.liquidGlass = "crystal";

    const html = generateFormHtml(schema);

    expect(html).toContain("formly-form--glass");
    expect(html).toContain("feDisplacementMap");
    expect(html).toContain('in2="blurred"');
    expect(html).toContain("feGaussianBlur");
    expect(html).toContain('scale="85"');
    expect(html).not.toContain("formly-glass-layer");
    expect(html).not.toContain("formly-glass-tint");
  });
});
