export type Theme = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "formly.theme";
export const DEFAULT_THEME: Theme = "dark";

export function isTheme(value: string): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export function resolveTheme(value: string | null | undefined): Theme {
  if (value && isTheme(value)) {
    return value;
  }

  return DEFAULT_THEME;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") {
    return;
  }

  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.dataset.theme = resolved;
}

export function readStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  try {
    return resolveTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return DEFAULT_THEME;
  }
}

export function setAppTheme(theme: Theme): void {
  applyTheme(theme);

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Persistence failures should not break theme switching.
  }
}
