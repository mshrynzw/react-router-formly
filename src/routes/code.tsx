import { useTranslation } from "react-i18next";

import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default function CodeRoute() {
  const { t } = useTranslation();

  return (
    <PagePlaceholder
      badge={t("common.status.placeholder")}
      title={t("code.title")}
      description={t("code.description")}
    />
  );
}
