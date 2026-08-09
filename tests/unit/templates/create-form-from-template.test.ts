import { describe, expect, it } from "vitest";

import {
  FORM_TEMPLATES,
  getFormTemplateById,
  listFormTemplates,
} from "@/features/templates/data/templates";
import { createFormFromTemplate } from "@/features/templates/services/create-form-from-template";

describe("form templates catalog", () => {
  it("exposes the expected starter templates", () => {
    expect(FORM_TEMPLATES.map((template) => template.id)).toEqual([
      "blank",
      "contact",
      "inquiry",
      "feedback",
      "newsletter",
      "reservation",
    ]);
  });

  it("filters templates by category", () => {
    expect(listFormTemplates("business").every((template) => template.category === "business")).toBe(
      true,
    );
    expect(listFormTemplates("all")).toHaveLength(FORM_TEMPLATES.length);
    expect(getFormTemplateById("contact")?.id).toBe("contact");
  });
});

describe("createFormFromTemplate", () => {
  it("creates a validated schema with fresh ids and localized metadata overrides", () => {
    const template = getFormTemplateById("contact");
    expect(template).toBeDefined();

    const result = createFormFromTemplate(template!, {
      name: "お問い合わせ",
      description: "定番の連絡フォーム",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.schema.name).toBe("お問い合わせ");
    expect(result.schema.description).toBe("定番の連絡フォーム");
    expect(result.schema.id).toMatch(/^form_/);
    expect(result.schema.fields.some((field) => field.type === "email")).toBe(true);
    expect(result.schema.fields.every((field) => field.id.startsWith("field_"))).toBe(true);

    const selectLike = result.schema.fields.find((field) => field.type === "email");
    expect(selectLike?.name).toBe("email");
  });

  it("assigns unique option ids for select templates", () => {
    const template = getFormTemplateById("inquiry");
    expect(template).toBeDefined();

    const result = createFormFromTemplate(template!);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    const topic = result.schema.fields.find((field) => field.type === "select");
    expect(topic?.type).toBe("select");
    if (topic?.type !== "select") {
      return;
    }

    const optionIds = topic.options.map((option) => option.id);
    expect(new Set(optionIds).size).toBe(optionIds.length);
    expect(optionIds.every((id) => id.startsWith("option_"))).toBe(true);
  });

  it("creates a blank form with only a submit field", () => {
    const template = getFormTemplateById("blank");
    expect(template).toBeDefined();

    const result = createFormFromTemplate(template!);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.schema.fields).toHaveLength(1);
    expect(result.schema.fields[0]?.type).toBe("submit");
  });
});
