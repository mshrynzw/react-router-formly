import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/i18n/locales/en.json";
import ja from "@/i18n/locales/ja.json";
import ko from "@/i18n/locales/ko.json";
import zh from "@/i18n/locales/zh.json";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  resolveLocale,
  type Locale,
} from "@/i18n/locales";

function readStoredLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  try {
    return resolveLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY));
  } catch {
    return DEFAULT_LOCALE;
  }
}

const initialLocale = readStoredLocale();

void i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: ja },
    en: { translation: en },
    zh: { translation: zh },
    ko: { translation: ko },
  },
  lng: initialLocale,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
});

export function setAppLocale(locale: Locale): void {
  void i18n.changeLanguage(locale);

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Persistence failures should not break language switching.
  }

  document.documentElement.lang = locale;
}

if (typeof document !== "undefined") {
  document.documentElement.lang = initialLocale;
}

export default i18n;
