import { describe, expect, it } from "vitest";

import { createEmptyForm, createField } from "@/domain/form-schema";
import { validateFormValues } from "@/features/preview/utils/validate-form-values";

describe("validateFormValues", () => {
  it("requires filled values for required fields", () => {
    const schema = createEmptyForm();
    const text = createField("text");
    schema.fields = [text, ...schema.fields];

    const errors = validateFormValues(schema, { [text.name]: "" });

    expect(errors[text.name]).toBe("required");
  });

  it("validates email format", () => {
    const schema = createEmptyForm();
    const email = createField("email");
    email.required = false;
    schema.fields = [email, ...schema.fields];

    const errors = validateFormValues(schema, { [email.name]: "not-an-email" });

    expect(errors[email.name]).toBe("email");
  });

  it("validates number min and max", () => {
    const schema = createEmptyForm();
    const number = createField("number");
    number.required = false;
    number.validation = { min: 1, max: 10 };
    schema.fields = [number, ...schema.fields];

    expect(validateFormValues(schema, { [number.name]: "0" })[number.name]).toBe("min");
    expect(validateFormValues(schema, { [number.name]: "11" })[number.name]).toBe("max");
    expect(validateFormValues(schema, { [number.name]: "5" })[number.name]).toBeUndefined();
  });

  it("validates checkbox option groups", () => {
    const schema = createEmptyForm();
    const checkbox = createField("checkbox");
    checkbox.options = [
      { id: "o1", label: "A", value: "a" },
      { id: "o2", label: "B", value: "b" },
    ];
    schema.fields = [checkbox, ...schema.fields];

    expect(validateFormValues(schema, { [checkbox.name]: [] })[checkbox.name]).toBe("required");
    expect(validateFormValues(schema, { [checkbox.name]: ["a"] })[checkbox.name]).toBeUndefined();
  });
});
