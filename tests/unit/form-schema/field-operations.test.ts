import { describe, expect, it } from "vitest";

import {
  addField,
  createEmptyForm,
  duplicateField,
  moveField,
  parseFormSchema,
  removeField,
  updateFormMeta,
  updateSubmission,
} from "@/domain/form-schema";

describe("form schema operations", () => {
  it("creates an empty form with a submit field", () => {
    const form = createEmptyForm("Contact");

    expect(form.version).toBe(1);
    expect(form.name).toBe("Contact");
    expect(form.fields).toHaveLength(1);
    expect(form.fields[0]?.type).toBe("submit");
    expect(form.submission.method).toBe("POST");
  });

  it("adds fields before the submit button", () => {
    const form = addField(createEmptyForm(), "text");
    const withEmail = addField(form, "email");

    expect(withEmail.fields.map((field) => field.type)).toEqual(["text", "email", "submit"]);
  });

  it("removes a non-submit field", () => {
    const withText = addField(createEmptyForm(), "text");
    const textId = withText.fields[0]?.id;

    expect(textId).toBeDefined();

    const next = removeField(withText, textId ?? "");

    expect(next.fields.map((field) => field.type)).toEqual(["submit"]);
  });

  it("does not remove the submit field", () => {
    const form = createEmptyForm();
    const submitId = form.fields[0]?.id ?? "";
    const next = removeField(form, submitId);

    expect(next.fields).toHaveLength(1);
    expect(next.fields[0]?.type).toBe("submit");
  });

  it("duplicates a field with a new id", () => {
    const withText = addField(createEmptyForm(), "text");
    const textId = withText.fields[0]?.id ?? "";
    const next = duplicateField(withText, textId);

    expect(next.fields.map((field) => field.type)).toEqual(["text", "text", "submit"]);
    expect(next.fields[0]?.id).not.toBe(next.fields[1]?.id);
  });

  it("moves fields up and down", () => {
    let form = createEmptyForm();
    form = addField(form, "text");
    form = addField(form, "email");

    const emailId = form.fields[1]?.id ?? "";
    const movedUp = moveField(form, emailId, "up");

    expect(movedUp.fields.map((field) => field.type)).toEqual(["email", "text", "submit"]);

    const movedDown = moveField(movedUp, emailId, "down");
    expect(movedDown.fields.map((field) => field.type)).toEqual(["text", "email", "submit"]);
  });

  it("updates form metadata and submission", () => {
    const form = createEmptyForm();
    const next = updateSubmission(updateFormMeta(form, { name: "Inquiry" }), {
      action: "/api/submit",
      method: "GET",
    });

    expect(next.name).toBe("Inquiry");
    expect(next.submission).toEqual({ action: "/api/submit", method: "GET" });
  });

  it("parses a valid form schema", () => {
    const form = addField(createEmptyForm(), "select");
    const result = parseFormSchema(form);

    expect(result.success).toBe(true);
  });

  it("rejects an invalid form schema", () => {
    const result = parseFormSchema({ version: 1, fields: "nope" });

    expect(result.success).toBe(false);
  });
});
