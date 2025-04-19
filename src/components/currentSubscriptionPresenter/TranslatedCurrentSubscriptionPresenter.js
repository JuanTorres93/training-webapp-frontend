import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import CurrentSubscriptionPresenter from "./CurrentSubscriptionPresenter";
import { cancelSubscription } from "../../features/payments/paymentsSlice";

export default function TranslatedCurrentSubscriptionPresenter({
  currentPlant = "Free",
  costInEur = 20,
  renewalDate = new Date("2025-04-26"),
  markedForCancel = false,
  extraClasses = "",
}) {
  const { t } = useTranslation();
  const cancelText = t("cancel-text");
  const subscriptionText = t("subscription-text");
  const costText = t("cost-text");
  const shortMonthText = t("short-month-text");
  const renewalDateText = t("renewal-date-text");
  const cancelledText = t("cancelled-subscription");

  const dispatch = useDispatch();

  const handleCancelSubscription = () => {
    dispatch(cancelSubscription());
  };

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
      markedForCancel={markedForCancel}
      cancelledText={cancelledText}
      extraClasses={extraClasses}
      cancelSubscription={handleCancelSubscription}
    />
  );
}
