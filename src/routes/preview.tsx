import { useTranslation } from "react-i18next";

import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default function PreviewRoute() {
  const { t } = useTranslation();

  return (
    <PagePlaceholder
      badge={t("common.status.placeholder")}
      title={t("preview.title")}
      description={t("preview.description")}
    />
  );
}
