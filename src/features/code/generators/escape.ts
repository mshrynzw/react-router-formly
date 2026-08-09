/** Escape text for HTML element content. */
export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Escape text for HTML attribute values. */
export function escapeHtmlAttr(value: string): string {
  return escapeHtml(value);
}

/**
 * Serialize a value as a JavaScript literal.
 * Prefer this over string concatenation for untrusted content.
 */
export function toJsLiteral(value: unknown): string {
  return JSON.stringify(value);
}
