import React from "react";

export default function CurrentSubscriptionPresenter({
  subscriptionText = "Subscription",
  cancelText = "Cancel",
  costText = "Cost",
  shortMonthText = "mo",
  currentPlant = "Free",
  costInEur = 20,
  renewalDate = new Date("2025-04-26"),
  renewalDateText = "Renewal Date",
  markedForCancel = false,
  cancelledText = "Cancelled",
  extraClasses = "",
  cancelSubscription = () => {},
}) {
  const subscriptionExpired = new Date() > renewalDate;
  const isFreePlan =
    currentPlant.toLowerCase().includes("free") ||
    currentPlant.toLowerCase().includes("grat");

  // Show cancel button if subscription is active or is free subscription
  // TODO add condition for already cancelled subscription
  const hideCancelButton = isFreePlan || markedForCancel;

  return (
    <div className={`current-subscription-presenter ${extraClasses}`}>
      <div className="current-subscription-presenter__upper-row">
        <span className="current-subscription-presenter__title">
          {subscriptionText}
        </span>

        {!hideCancelButton && (
          <button
            onClick={cancelSubscription}
            className="plain-btn 
          current-subscription-presenter__cancel-btn"
          >
            {cancelText}
          </button>
        )}

        {markedForCancel && (
          <span className="current-subscription-presenter__cancelled-text">
            {cancelledText}
          </span>
        )}
      </div>

      <div className="current-subscription-presenter__lower-row">
        <div className="current-subscription-presenter__info-container">
          <figure className="current-subscription-presenter__icon-box">
            <ion-icon name="bag-check-outline"></ion-icon>
          </figure>
          <span className="current-subscription-presenter__info-title">
            Plan
          </span>
          <span className="current-subscription-presenter__info-value">
            {currentPlant}
          </span>
        </div>

        <div className="current-subscription-presenter__info-container">
          <figure className="current-subscription-presenter__icon-box">
            <ion-icon name="wallet-outline"></ion-icon>
          </figure>
          <span className="current-subscription-presenter__info-title">
            {costText}
          </span>
          <span className="current-subscription-presenter__info-value">
            {costInEur} €/{shortMonthText}
          </span>
        </div>

        <div className="current-subscription-presenter__info-container">
          <figure className="current-subscription-presenter__icon-box">
            <ion-icon name="calendar-outline"></ion-icon>
          </figure>
          <span className="current-subscription-presenter__info-title">
            {renewalDateText}
          </span>
          <span
            className={`
            current-subscription-presenter__info-value
            ${
              subscriptionExpired
                ? "current-subscription-presenter__info-value--expired-date"
                : ""
            }
            `}
          >
            {renewalDate.toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
