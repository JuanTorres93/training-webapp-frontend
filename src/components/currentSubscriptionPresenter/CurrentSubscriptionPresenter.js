import React from "react";

export default function CurrentSubscriptionPresenter({
  subscriptionText = "Subscription",
  cancelText = "Cancel",
  costText = "Cost",
  shortMonthText = "mo",
  currentPlant = "Free",
  costInEur = 20,
  renewalDate,
  renewalDateText = "Renewal Date",
  markedForCancel = false,
  cancelledText = "Cancelled",
  isLoadingSubscription = false,
  resumeText = "Resume",
  extraClasses = "",
  cancelSubscription = () => {},
  resumeSubscription = () => {},
}) {
  const subscriptionExpired = currentPlant.toLowerCase().includes("expir");
  const isFreePlan =
    currentPlant.toLowerCase().includes("free") ||
    currentPlant.toLowerCase().includes("grat");

  const hideCancelButton = isFreePlan || markedForCancel || subscriptionExpired;

  return (
    <div className={`current-subscription-presenter ${extraClasses}`}>
      <div className="current-subscription-presenter__upper-row">
        <span className="current-subscription-presenter__title">
          {subscriptionText}
        </span>

        {!hideCancelButton && (
          <button
            onClick={isLoadingSubscription ? null : cancelSubscription}
            className={`plain-btn 
          current-subscription-presenter__cancel-btn
          ${
            isLoadingSubscription
              ? "current-subscription-presenter__cancel-btn--disabled"
              : ""
          }`}
          >
            {isLoadingSubscription ? (
              <div className="spinner-1p3-rem"></div>
            ) : (
              cancelText
            )}
          </button>
        )}

        {markedForCancel && (
          <span className="current-subscription-presenter__cancelled-text">
            {cancelledText}
          </span>
        )}

        {markedForCancel && !subscriptionExpired && (
          <button
            className={`plain-btn 
          current-subscription-presenter__resume-btn
          ${
            isLoadingSubscription
              ? "current-subscription-presenter__resume-btn--disabled"
              : ""
          }
          `}
            onClick={isLoadingSubscription ? null : resumeSubscription}
          >
            {isLoadingSubscription ? (
              <div className="spinner-1p3-rem"></div>
            ) : (
              resumeText
            )}
          </button>
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
              subscriptionExpired && renewalDate
                ? "current-subscription-presenter__info-value--expired-date"
                : ""
            }
            `}
          >
            {renewalDate
              ? renewalDate.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "---"}
          </span>
        </div>
      </div>
    </div>
  );
}
