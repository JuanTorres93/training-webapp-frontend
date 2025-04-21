import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import CurrentSubscriptionPresenter from "./CurrentSubscriptionPresenter";
import {
  cancelSubscription,
  resumeSubscription,
} from "../../features/payments/paymentsSlice";
import { getLastPayment } from "../../features/payments/paymentsSlice";

export default function TranslatedCurrentSubscriptionPresenter({
  currentPlant = "Free",
  costInEur = 20,
  renewalDate = new Date("2025-04-26"),
  markedForCancel = false,
  extraClasses = "",
}) {
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const { t } = useTranslation();
  const cancelText = t("cancel-text");
  const subscriptionText = t("subscription-text");
  const costText = t("cost-text");
  const shortMonthText = t("short-month-text");
  const renewalDateText = t("renewal-date-text");
  const cancelledText = t("cancelled-subscription");

  const dispatch = useDispatch();

  const handleCancelSubscription = async () => {
    try {
      setLoadingSubscription(true);
      await dispatch(cancelSubscription());

      // Get info about the last payment to show the correct info
      setTimeout(() => {
        dispatch(getLastPayment()).then(() => {
          setLoadingSubscription(false);
        });
      }, 7000);
    } catch (error) {
      console.log(error);
      setLoadingSubscription(false);
    }
  };

  const handleResumeSubscription = async () => {
    try {
      setLoadingSubscription(true);
      await dispatch(resumeSubscription());

      // Get info about the last payment to show the correct info
      setTimeout(() => {
        dispatch(getLastPayment()).then(() => {
          setLoadingSubscription(false);
        });
      }, 7000);
    } catch (error) {
      console.log(error);
      setLoadingSubscription(false);
    }
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
      isLoadingSubscription={loadingSubscription}
      cancelSubscription={handleCancelSubscription}
      resumeSubscription={handleResumeSubscription}
    />
  );
}
