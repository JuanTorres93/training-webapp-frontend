import React, { useState, useEffect, useRef } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

import { processCommonStringFromDb } from "../../i18n";

import TranslatedCurrentSubscriptionPresenter from "../../components/currentSubscriptionPresenter/TranslatedCurrentSubscriptionPresenter";
import SubscriptionPresenter from "../../components/subscriptionPresenter/SubscriptionPresenter";

export default function SubscriptionsPage() {
  return (
    <div className="behind-app">
      <main className="app-layout">
        <TranslatedNavVertical />
        {/* TODO Crear sass subscriptions-page */}
        <section className="subscriptions-page">
          <TranslatedCurrentSubscriptionPresenter />
          <SubscriptionPresenter />
        </section>
      </main>
    </div>
  );
}
