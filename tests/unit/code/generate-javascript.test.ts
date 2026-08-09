import { describe, expect, it } from "vitest";

import { createEmptyForm, createField } from "@/domain/form-schema";
import { generateFormJavaScript } from "@/features/code/generators/generate-javascript";

describe("generateFormJavaScript", () => {
  it("embeds field validation config safely", () => {
    const schema = createEmptyForm("Contact");
    const text = createField("text");
    text.name = "full_name";
    text.required = true;
    text.validation = { minLength: 2, maxLength: 40 };
    schema.fields = [text, ...schema.fields];

    const js = generateFormJavaScript(schema);

    expect(js).toContain('"name":"full_name"');
    expect(js).toContain('"minLength":2');
    expect(js).toContain("validateForm");
    expect(js).toContain("addEventListener(\"submit\"");
    expect(js).toContain('setAttribute("aria-invalid", "true")');
    expect(js).toContain('setAttribute("role", "alert")');
  });

  it("marks whether an action URL is configured", () => {
    const withAction = createEmptyForm();
    withAction.submission.action = "https://example.com/submit";

    const withoutAction = createEmptyForm();
    withoutAction.submission.action = "";

    expect(generateFormJavaScript(withAction)).toContain("var hasAction = true;");
    expect(generateFormJavaScript(withoutAction)).toContain("var hasAction = false;");
  });

  it("does not concatenate untrusted strings into executable code", () => {
    const schema = createEmptyForm();
    const text = createField("text");
    text.label = `");alert(1);//`;
    text.name = "safe_name";
    schema.fields = [text, ...schema.fields];

    const js = generateFormJavaScript(schema);

    expect(js).not.toContain(`");alert(1);//`);
    expect(js).toContain('"name":"safe_name"');
  });
});
