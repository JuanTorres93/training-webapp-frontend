import React, { useState, useEffect, useRef, use } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

import { processCommonStringFromDb } from "../../i18n";

import TranslatedCurrentSubscriptionPresenter from "../../components/currentSubscriptionPresenter/TranslatedCurrentSubscriptionPresenter";
import TranslatedSubscriptionPresenter from "../../components/subscriptionPresenter/TranslatedSubscriptionPresenter";

import {
  selectSubscriptions,
  selectActiveSubscription,
} from "../../features/subscriptions/subscriptionsSlice";
import { selectCurrentLanguage } from "../../features/language/languageSlice";
import { selectLastPayment } from "../../features/payments/paymentsSlice";

export default function SubscriptionsPage() {
  const subscriptions = useSelector(selectSubscriptions);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const activeSubscription = useSelector(selectActiveSubscription);
  const lastPayment = useSelector(selectLastPayment);

  const [subscriptionPresenters, setSubscriptionPresenters] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);

  useEffect(() => {
    setSubscriptionPresenters(
      subscriptions.map((subscription, index) => {
        const priceInEur = (subscription.base_price_in_eur_cents / 100).toFixed(
          2
        );

        return (
          <TranslatedSubscriptionPresenter
            key={index}
            subscriptionName={processCommonStringFromDb(subscription.name)}
            costInEur={priceInEur}
            subscriptionId={subscription.id}
            extraClasses="subscriptions-page__subscription-presenter"
          />
        );
      })
    );

    setCurrentSubscription(() => {
      const currentPlan = processCommonStringFromDb(activeSubscription.name);
      const currentCostInEur = (
        activeSubscription.base_price_in_eur_cents / 100
      ).toFixed(2);

      let renewalDate;
      try {
        renewalDate = new Date(lastPayment.next_payment_date);
      } catch (error) {
        // renewalDate = null;
        // TODO better process this case
        renewalDate = new Date();
      }

      return (
        <TranslatedCurrentSubscriptionPresenter
          currentPlant={currentPlan}
          costInEur={currentCostInEur}
          renewalDate={renewalDate}
          extraClasses="subscriptions-page__current-subscription-presenter"
        />
      );
    });
  }, [currentLanguage]);

  return (
    <div className="behind-app">
      <main className="app-layout">
        <TranslatedNavVertical />
        <section className="subscriptions-page">
          {currentSubscription}
          {subscriptionPresenters}
        </section>
      </main>
    </div>
  );
}
