import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormSchema } from "@/domain/form-schema";

interface FormSettingsPanelProps {
  schema: FormSchema;
  onChange: (patch: Partial<Pick<FormSchema, "name" | "description">>) => void;
}

export function FormSettingsPanel({ schema, onChange }: FormSettingsPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="form-name">{t("builder.formSettings.name")}</Label>
        <Input
          id="form-name"
          value={schema.name}
          onChange={(event) => {
            onChange({ name: event.target.value });
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="form-description">{t("builder.formSettings.description")}</Label>
        <Textarea
          id="form-description"
          value={schema.description}
          onChange={(event) => {
            onChange({ description: event.target.value });
          }}
        />
      </div>
    </div>
  );
}
