import type { FormSchema } from "@/domain/form-schema";

import { escapeHtml } from "@/features/code/generators/escape";
import { generateFormCss } from "@/features/code/generators/generate-css";
import { generateFormHtml } from "@/features/code/generators/generate-html";
import { generateFormJavaScript } from "@/features/code/generators/generate-javascript";
import { getFormHtmlClassNames } from "@/features/code/generators/html-classes";

export const TAILWIND_PLAY_CDN = "https://cdn.tailwindcss.com";

export type CodeLanguage = "html" | "css" | "javascript";

export interface GeneratedFormCode {
  html: string;
  css: string;
  javascript: string;
  combined: string;
}

export function generateFormCode(schema: FormSchema): GeneratedFormCode {
  const html = generateFormHtml(schema);
  const css = generateFormCss(schema);
  const javascript = generateFormJavaScript(schema);
  const combined = generateCombinedHtml(schema, html, css, javascript);

  return {
    html,
    css,
    javascript,
    combined,
  };
}

export function getCodeByLanguage(code: GeneratedFormCode, language: CodeLanguage): string {
  switch (language) {
    case "html":
      return code.html;
    case "css":
      return code.css;
    case "javascript":
      return code.javascript;
  }
}

export function getExportFilename(language: CodeLanguage | "combined", schema: FormSchema): string {
  const base = slugify(schema.name || "formly-form");

  switch (language) {
    case "html":
      return `${base}.html`;
    case "css":
      return `${base}.css`;
    case "javascript":
      return `${base}.js`;
    case "combined":
      return `${base}.combined.html`;
  }
}

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "formly-form";
}

function generateCombinedHtml(
  schema: FormSchema,
  html: string,
  css: string,
  javascript: string,
): string {
  const title = escapeHtml(schema.name || "Untitled form");
  const pageClass = getFormHtmlClassNames(schema).page;
  const tailwindCdn =
    schema.appearance.cssFlavor === "tailwind"
      ? `  <!-- Tailwind Play CDN is for previewing this file. Use a production Tailwind build in real sites. -->
  <script src="${TAILWIND_PLAY_CDN}"></script>
`
      : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
${tailwindCdn}  <style>
${css}
  </style>
</head>
<body class="${pageClass}">
${html}
  <script>
${javascript}
  </script>
</body>
</html>
`;
}
