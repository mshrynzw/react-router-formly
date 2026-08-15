import { describe, expect, it } from "vitest";

import {
  FORM_SCHEMA_VERSION,
  MAX_IMPORT_FILE_BYTES,
  createEmptyForm,
  createField,
  getSchemaExportFilename,
  importFormSchemaFromText,
  importFormSchemaFromUnknown,
  serializeFormSchema,
} from "@/domain/form-schema";

describe("Form Schema import/export", () => {
  it("round-trips a schema including submission settings", () => {
    const schema = createEmptyForm("Contact Form");
    const email = createField("email");
    email.label = "Email";
    email.required = true;
    schema.fields = [email, ...schema.fields];
    schema.submission = {
      action: "https://example.com/submit",
      method: "POST",
    };

    const json = serializeFormSchema(schema);
    const result = importFormSchemaFromText(json);

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.schema.version).toBe(FORM_SCHEMA_VERSION);
    expect(result.schema.name).toBe("Contact Form");
    expect(result.schema.submission).toEqual({
      action: "https://example.com/submit",
      method: "POST",
    });
    expect(result.schema.fields.find((field) => field.type === "email")?.label).toBe("Email");
  });

  it("uses a portable filename", () => {
    const schema = createEmptyForm("My Cool Form!");
    expect(getSchemaExportFilename(schema)).toBe("my-cool-form.formly.json");
  });

  it("rejects malformed JSON", () => {
    const result = importFormSchemaFromText("{not-json");
    expect(result).toEqual({ ok: false, reason: "parse" });
  });

  it("rejects unsupported schema versions", () => {
    const schema = createEmptyForm();
    const result = importFormSchemaFromUnknown({
      ...schema,
      version: 999,
    });

    expect(result).toEqual({ ok: false, reason: "unsupported_version" });
  });

  it("rejects invalid schemas that fail validation", () => {
    const result = importFormSchemaFromUnknown({
      version: FORM_SCHEMA_VERSION,
      id: "form_1",
      name: "Broken",
      description: "",
      fields: [{ type: "text" }],
      submission: { action: "", method: "POST" },
    });

    expect(result).toEqual({ ok: false, reason: "validation" });
  });

  it("rejects oversized payloads", () => {
    const huge = "x".repeat(MAX_IMPORT_FILE_BYTES + 1);
    const result = importFormSchemaFromText(`{"version":1}`, MAX_IMPORT_FILE_BYTES + 1);
    expect(result).toEqual({ ok: false, reason: "too_large" });
    expect(huge.length).toBeGreaterThan(MAX_IMPORT_FILE_BYTES);
  });

  it("strips unknown top-level properties during validation", () => {
    const schema = createEmptyForm("Clean");
    const result = importFormSchemaFromUnknown({
      ...schema,
      extra: { evil: true },
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.schema).not.toHaveProperty("extra");
  });

  it("fills default appearance when importing a schema without it", () => {
    const schema = createEmptyForm("Legacy Import");
    const legacy: Record<string, unknown> = { ...schema };
    delete legacy.appearance;
    const result = importFormSchemaFromUnknown(legacy);

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.schema.appearance.cssFlavor).toBe("css");
    expect(result.schema.appearance.colors.accent).toEqual({ hex: "#4c6fff", opacity: 100 });
  });
});
