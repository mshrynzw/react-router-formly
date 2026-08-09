import { useTranslation } from "react-i18next";

import type { CodeLanguage } from "@/features/code/generators/generate-form-code";
import { cn } from "@/lib/utils";

interface CodeViewerProps {
  language: CodeLanguage;
  code: string;
  className?: string;
}

export function CodeViewer({ language, code, className }: CodeViewerProps) {
  const { t } = useTranslation();
  const lines = code.length === 0 ? [""] : code.replace(/\n$/, "").split("\n");

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
          {t(`code.languages.${language}`)}
        </p>
        <p className="text-xs text-[var(--text-muted)]">
          {t("code.viewer.lineCount", { count: lines.length })}
        </p>
      </div>

      <pre
        className="max-h-[min(60vh,40rem)] overflow-auto p-0 text-sm leading-6"
        tabIndex={0}
        aria-label={t("code.viewer.label", { language: t(`code.languages.${language}`) })}
      >
        <code className="block min-w-full font-[family-name:var(--font-mono)] text-[var(--text-primary)]">
          {lines.map((line, index) => (
            <span key={`line-${index + 1}`} className="flex">
              <span
                aria-hidden="true"
                className="sticky left-0 w-12 shrink-0 select-none border-r border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 text-right text-xs leading-6 text-[var(--text-muted)]"
              >
                {index + 1}
              </span>
              <span className="whitespace-pre px-3">{line.length === 0 ? " " : line}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
