import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

const TITLE_KEYS: Record<string, string> = {
  "/": "seo.titles.home",
  "/builder": "seo.titles.builder",
  "/preview": "seo.titles.preview",
  "/code": "seo.titles.code",
  "/templates": "seo.titles.templates",
  "/settings": "seo.titles.settings",
};

export function useDocumentTitle() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    const key = TITLE_KEYS[pathname] ?? "seo.titles.notFound";
    document.title = t(key);
  }, [pathname, t]);
}
