import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearFormFromStorage,
  createEmptyForm,
  createField,
  FORM_STORAGE_KEY,
  hasStoredForm,
  loadFormFromStorage,
  saveFormToStorage,
} from "@/domain/form-schema";

describe("form persistence", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("saves and restores a Form Schema including submission settings", () => {
    const schema = createEmptyForm("Persisted Form");
    const email = createField("email");
    email.label = "Email";
    schema.fields = [email, ...schema.fields];
    schema.submission = {
      action: "https://example.com/submit",
      method: "GET",
    };

    expect(saveFormToStorage(schema)).toEqual({ ok: true });
    expect(hasStoredForm()).toBe(true);

    const loaded = loadFormFromStorage();
    expect(loaded.status).toBe("ok");
    expect(loaded.schema.name).toBe("Persisted Form");
    expect(loaded.schema.submission.action).toBe("https://example.com/submit");
    expect(loaded.schema.submission.method).toBe("GET");
    expect(loaded.schema.fields.some((field) => field.label === "Email")).toBe(true);
    expect(loaded.schema.appearance.cssFlavor).toBe("css");
  });

  it("restores a schema that was stored without appearance", () => {
    const schema = createEmptyForm("Legacy");
    const legacy: Record<string, unknown> = { ...schema };
    delete legacy.appearance;
    window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(legacy));

    const loaded = loadFormFromStorage();
    expect(loaded.status).toBe("ok");
    expect(loaded.schema.appearance.cssFlavor).toBe("css");
    expect(loaded.schema.appearance.colors.accent.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(loaded.schema.appearance.colors.border.opacity).toBe(10);
  });

  it("returns empty status when nothing is stored", () => {
    const loaded = loadFormFromStorage();
    expect(loaded.status).toBe("empty");
    expect(loaded.schema.fields.some((field) => field.type === "submit")).toBe(true);
  });

  it("handles invalid stored JSON without throwing", () => {
    window.localStorage.setItem(FORM_STORAGE_KEY, "{not-json");

    const loaded = loadFormFromStorage();
    expect(loaded.status).toBe("invalid");
    expect(loaded.schema.version).toBe(1);
  });

  it("handles invalid schema shape without throwing", () => {
    window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({ version: 1, name: "Broken" }));

    const loaded = loadFormFromStorage();
    expect(loaded.status).toBe("invalid");
  });

  it("clears stored form data", () => {
    const schema = createEmptyForm("To Clear");
    expect(saveFormToStorage(schema).ok).toBe(true);
    expect(clearFormFromStorage()).toEqual({ ok: true });
    expect(hasStoredForm()).toBe(false);
    expect(loadFormFromStorage().status).toBe("empty");
  });

  it("reports quota errors when localStorage write fails", () => {
    const schema = createEmptyForm("Large");
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      const error = new DOMException("Quota exceeded", "QuotaExceededError");
      throw error;
    });

    expect(saveFormToStorage(schema)).toEqual({
      ok: false,
      reason: "quota",
    });
  });
});
