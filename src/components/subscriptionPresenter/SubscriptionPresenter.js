import React, { useState } from "react";

import { getCheckoutSession } from "../../serverAPI/payments";

export default function SubscriptionPresenter({
  subscriptionName = "Subscription name",
  costInEur = 20,
  monthText = "month",
  subscribeText = "Subscribe",
  featuresText = "All features included",
}) {
  const [loading, setLoading] = useState(false);

  const getCheckoutSessionOnClick = async () => {
    setLoading(true);
    try {
      const response = await getCheckoutSession();

      window.location = await response.session.url;
    } catch (error) {
      // TODO handle error
      console.log(error);
    } finally {
      setLoading(false);
    }
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
          className={`plain-btn subscription-presenter__checkout-btn ${
            loading ? "subscription-presenter__checkout-btn--disabled" : ""
          }`}
          onClick={loading ? undefined : getCheckoutSessionOnClick}
        >
          {loading ? <div className="spinner-1p3-rem"></div> : subscribeText}
        </button>

        <div className="subscription-presenter__features-box">
          {featuresText}
        </div>
      </div>
    </div>
  );
}
