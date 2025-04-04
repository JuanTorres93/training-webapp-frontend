import React from "react";

import { useTranslation } from "react-i18next";

import SubscriptionPresenter from "./SubscriptionPresenter";
import { getCheckoutSession } from "../../serverAPI/payments";

// TODO add featuresText as a prop
export default function TranslatedSubscriptionPresenter({
  subscriptionName = "Subscription name",
  costInEur = 20,
  subscriptionId = "",
  extraClasses = "",
  isActiveSubscription = false,
}) {
  const { t } = useTranslation();
  const monthText = t("month-text");
  let subscribeText = t("subscribe-text");
  const featuresText = t("subscription-features-text");

  if (isActiveSubscription) {
    subscribeText = t("already-subscribed-text");
  }

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
      subscriptionId={subscriptionId}
      getCheckoutSessionOnClick={getCheckoutSessionOnClick}
      isActiveSubscription={isActiveSubscription}
      extraClasses={extraClasses}
    />
  );
}
