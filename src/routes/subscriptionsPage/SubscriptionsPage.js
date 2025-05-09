import React, { useState, useEffect, useRef, use } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

import { processCommonStringFromDb } from "../../i18n";

import TranslatedCurrentSubscriptionPresenter from "../../components/currentSubscriptionPresenter/TranslatedCurrentSubscriptionPresenter";
import TranslatedSubscriptionPresenter from "../../components/subscriptionPresenter/TranslatedSubscriptionPresenter";

import {
  selectSubscriptions,
  selectActiveSubscription,
} from "../../features/subscriptions/subscriptionsSlice";
import { selectCurrentLanguage } from "../../features/language/languageSlice";
import { selectLastPayment } from "../../features/payments/paymentsSlice";

import { getCurrentSubscription } from "../../features/subscriptions/subscriptionsSlice";
import { getLastPayment } from "../../features/payments/paymentsSlice";

import lastPaymentExpired from "../../utils/checkLastPayment";

export default function SubscriptionsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const subscriptions = useSelector(selectSubscriptions);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const activeSubscription = useSelector(selectActiveSubscription);
  const lastPayment = useSelector(selectLastPayment);

  const [subscriptionPresenters, setSubscriptionPresenters] = useState([]);
  const [currentSubscriptionPresenter, setCurrentSubscriptionPresenter] =
    useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  // timeout to check if the last payment is expired
  setTimeout(() => {
    if (lastPayment && lastPayment.next_payment_date && user) {
      const isExpired = lastPaymentExpired(lastPayment.next_payment_date);
      if (isExpired) {
        dispatch(getCurrentSubscription({ userId: user.id }));
        dispatch(getLastPayment());
      }
    }
  }, 10000);

  useEffect(() => {
    if (!user) return;
    dispatch(getCurrentSubscription({ userId: user.id }));
    dispatch(getLastPayment());
  }, []);

  useEffect(() => {
    setSubscriptionPresenters(
      subscriptions.map((subscription, index) => {
        const priceInEur = (subscription.base_price_in_eur_cents / 100).toFixed(
          2
        );

        const isActiveSubscription = subscription.id === activeSubscription.id;

        return (
          <TranslatedSubscriptionPresenter
            key={index}
            subscriptionName={processCommonStringFromDb(subscription.name)}
            costInEur={priceInEur}
            subscriptionId={subscription.id}
            isActiveSubscription={isActiveSubscription}
            extraClasses="subscriptions-page__subscription-presenter"
          />
        );
      })
    );

    setCurrentSubscriptionPresenter(() => {
      const currentPlan = processCommonStringFromDb(activeSubscription.name);
      const currentCostInEur = (
        activeSubscription.base_price_in_eur_cents / 100
      ).toFixed(2);

      const renewalDate = lastPayment.next_payment_date
        ? new Date(lastPayment.next_payment_date)
        : null;

      return (
        <TranslatedCurrentSubscriptionPresenter
          currentPlant={currentPlan}
          costInEur={currentCostInEur}
          renewalDate={renewalDate}
          markedForCancel={lastPayment.marked_for_cancel}
          extraClasses="subscriptions-page__current-subscription-presenter"
        />
      );
    });
  }, [currentLanguage, lastPayment, subscriptions, activeSubscription]);

  return (
    <div className="behind-app">
      <main className="app-layout">
        <TranslatedNavVertical />
        <section className="subscriptions-page">
          {currentSubscriptionPresenter}
          {subscriptionPresenters}
        </section>
      </main>
    </div>
  );
}
