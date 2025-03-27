import React from "react";

import { getCheckoutSession } from "../../serverAPI/payments";

// TODO: ADD loading state, specifically when getting checkout session
export default function SubscriptionPresenter({
  subscriptionName = "Subscription name",
  costInEur = 20,
  monthText = "month",
  subscribeText = "Subscribe",
  featuresText = "All features included",
}) {
  const getCheckoutSessionOnClick = async () => {
    const response = await getCheckoutSession();

    window.location = response.session.url;
  };

  return (
    <div className="subscription-presenter">
      <div className="subscription-presenter__title-box">
        <span className="subscription-presenter__title">
          {subscriptionName}
        </span>
      </div>

      <div className="subscription-presenter__info-box">
        <div className="subscription-presenter__price">
          {costInEur} €{" "}
          <span className="subscription-presenter__per-month">
            / {monthText}
          </span>
        </div>

        <button
          className="plain-btn subscription-presenter__checkout-btn"
          onClick={getCheckoutSessionOnClick}
        >
          {subscribeText}
        </button>

        <div className="subscription-presenter__features-box">
          {featuresText}
        </div>
      </div>
    </div>
  );
}
