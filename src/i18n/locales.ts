export const SUPPORTED_LOCALES = ["ja", "en", "zh", "ko"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ja";

export const LOCALE_STORAGE_KEY = "formly.locale";

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(value: string | null | undefined): Locale {
  if (value && isLocale(value)) {
    return value;
  }

  return DEFAULT_LOCALE;
}
