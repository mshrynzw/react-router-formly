import type { FormSchema } from "@/domain/form-schema";

import { escapeHtml } from "@/features/code/generators/escape";
import { generateFormCss } from "@/features/code/generators/generate-css";
import { generateFormHtml } from "@/features/code/generators/generate-html";
import { generateFormJavaScript } from "@/features/code/generators/generate-javascript";

export type CodeLanguage = "html" | "css" | "javascript";

export interface GeneratedFormCode {
  html: string;
  css: string;
  javascript: string;
  combined: string;
}

export function generateFormCode(schema: FormSchema): GeneratedFormCode {
  const html = generateFormHtml(schema);
  const css = generateFormCss();
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

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
${css}
  </style>
</head>
<body class="formly-page">
${html}
  <script>
${javascript}
  </script>
</body>
</html>
`;
}
