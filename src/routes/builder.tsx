import { useTranslation } from "react-i18next";

import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default function BuilderRoute() {
  const { t } = useTranslation();

  return (
    <PagePlaceholder
      badge={t("common.status.placeholder")}
      title={t("builder.title")}
      description={t("builder.description")}
    />
  );
}
