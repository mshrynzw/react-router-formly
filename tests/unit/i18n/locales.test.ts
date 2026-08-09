import { describe, expect, it } from "vitest";

import en from "@/i18n/locales/en.json";
import ja from "@/i18n/locales/ja.json";
import ko from "@/i18n/locales/ko.json";
import zh from "@/i18n/locales/zh.json";
import { DEFAULT_LOCALE, isLocale, resolveLocale } from "@/i18n/locales";

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value as Record<string, unknown>).flatMap(([key, nested]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    if (nested !== null && typeof nested === "object" && !Array.isArray(nested)) {
      return flattenKeys(nested, next);
    }
    return [next];
  });
}

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

describe("locale key completeness", () => {
  it("keeps ja/en/zh/ko translation keys in sync", () => {
    const jaKeys = flattenKeys(ja).sort();
    expect(flattenKeys(en).sort()).toEqual(jaKeys);
    expect(flattenKeys(zh).sort()).toEqual(jaKeys);
    expect(flattenKeys(ko).sort()).toEqual(jaKeys);
  });
});
