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
  extraClasses = "",
  cancelSubscription = () => {},
}) {
  // TODO habilitar y desabilitar botón de cancelar
  return (
    <div className={`current-subscription-presenter ${extraClasses}`}>
      <div className="current-subscription-presenter__upper-row">
        <span className="current-subscription-presenter__title">
          {subscriptionText}
        </span>

        <button
          onClick={cancelSubscription}
          className="plain-btn 
          current-subscription-presenter__cancel-btn"
        >
          {cancelText}
        </button>
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
          <span className="current-subscription-presenter__info-value">
            {renewalDate.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
