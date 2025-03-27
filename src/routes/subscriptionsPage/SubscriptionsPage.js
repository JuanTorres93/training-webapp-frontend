import React, { useState, useEffect, useRef } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

import { processCommonStringFromDb } from "../../i18n";

import TranslatedCurrentSubscriptionPresenter from "../../components/currentSubscriptionPresenter/TranslatedCurrentSubscriptionPresenter";
import TranslatedSubscriptionPresenter from "../../components/subscriptionPresenter/TranslatedSubscriptionPresenter";

export default function SubscriptionsPage() {
  return (
    <div className="behind-app">
      <main className="app-layout">
        <TranslatedNavVertical />
        <section className="subscriptions-page">
          <TranslatedCurrentSubscriptionPresenter extraClasses="subscriptions-page__current-subscription-presenter" />
          <TranslatedSubscriptionPresenter extraClasses="subscriptions-page__subscription-presenter" />
        </section>
      </main>
    </div>
  );
}
