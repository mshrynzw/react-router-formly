import { describe, expect, it } from "vitest";

import { DEFAULT_LOCALE, isLocale, resolveLocale } from "@/i18n/locales";

describe("locale helpers", () => {
  it("accepts supported locales", () => {
    expect(isLocale("ja")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("zh")).toBe(true);
    expect(isLocale("ko")).toBe(true);
  });

  it("rejects unsupported locales", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("jp")).toBe(false);
  });

  it("falls back to Japanese for invalid values", () => {
    expect(resolveLocale(null)).toBe(DEFAULT_LOCALE);
    expect(resolveLocale("fr")).toBe("ja");
  });
});
