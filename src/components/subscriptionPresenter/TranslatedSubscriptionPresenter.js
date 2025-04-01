import React from "react";

import { useTranslation } from "react-i18next";

import SubscriptionPresenter from "./SubscriptionPresenter";
import { getCheckoutSession } from "../../serverAPI/payments";

// TODO add featuresText as a prop
export default function TranslatedSubscriptionPresenter({
  subscriptionName = "Subscription name", // TODO translate from DB
  costInEur = 20,
  extraClasses = "",
}) {
  const { t } = useTranslation();
  const monthText = t("month-text");
  const subscribeText = t("subscribe-text");
  const featuresText = t("subscription-features-text");

  const getCheckoutSessionOnClick = async () => {
    const response = await getCheckoutSession();

    window.location = response.session.url;
  };

  return (
    <SubscriptionPresenter
      subscriptionName={subscriptionName}
      costInEur={costInEur}
      monthText={monthText}
      subscribeText={subscribeText}
      featuresText={featuresText}
      getCheckoutSessionOnClick={getCheckoutSessionOnClick}
      extraClasses={extraClasses}
    />
  );
}
