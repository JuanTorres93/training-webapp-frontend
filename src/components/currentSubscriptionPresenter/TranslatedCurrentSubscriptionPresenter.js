import React from "react";

import { useTranslation } from "react-i18next";

import CurrentSubscriptionPresenter from "./CurrentSubscriptionPresenter";

export default function TranslatedCurrentSubscriptionPresenter({
  currentPlant = "Free", // TODO: Translate in DB
  costInEur = 20,
  renewalDate = new Date("2025-04-26"),
}) {
  const { t } = useTranslation();
  const cancelText = t("cancel-text");
  const subscriptionText = t("subscription-text");
  const costText = t("cost-text");
  const shortMonthText = t("short-month-text");
  const renewalDateText = t("renewal-date-text");

  return (
    <CurrentSubscriptionPresenter
      subscriptionText={subscriptionText}
      cancelText={cancelText}
      currentPlant={currentPlant}
      costInEur={costInEur}
      renewalDate={renewalDate}
      costText={costText}
      shortMonthText={shortMonthText}
      renewalDateText={renewalDateText}
    />
  );
}
