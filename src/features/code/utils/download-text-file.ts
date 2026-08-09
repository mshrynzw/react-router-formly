export function downloadTextFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function mimeTypeForLanguage(language: "html" | "css" | "javascript" | "combined"): string {
  switch (language) {
    case "html":
    case "combined":
      return "text/html;charset=utf-8";
    case "css":
      return "text/css;charset=utf-8";
    case "javascript":
      return "text/javascript;charset=utf-8";
  }
}
