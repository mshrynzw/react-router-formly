import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTTP_METHODS, type FormSchema, type HttpMethod } from "@/domain/form-schema";

interface SubmissionSettingsPanelProps {
  schema: FormSchema;
  onChange: (patch: Partial<{ action: string; method: HttpMethod }>) => void;
}

export function SubmissionSettingsPanel({ schema, onChange }: SubmissionSettingsPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="form-action">{t("builder.submission.action")}</Label>
        <Input
          id="form-action"
          value={schema.submission.action}
          placeholder={t("builder.submission.actionPlaceholder")}
          onChange={(event) => {
            onChange({ action: event.target.value });
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="form-method">{t("builder.submission.method")}</Label>
        <select
          id="form-method"
          className="flex h-10 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-input)] px-3 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]"
          value={schema.submission.method}
          onChange={(event) => {
            onChange({ method: event.target.value as HttpMethod });
          }}
        >
          {HTTP_METHODS.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>
      <p className="text-xs text-[var(--text-muted)]">{t("builder.submission.help")}</p>
    </div>
  );
}
