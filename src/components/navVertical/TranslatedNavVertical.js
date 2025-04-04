import NavVertical from "./NavVertical";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { changeLanguage } from "../../i18n";
import {
  logoutUser,
  selectUser,
  selectUserIsLogingOut,
} from "../../features/user/userSlice";

import { selectActiveTemplate } from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { selectActiveWorkout } from "../../features/workouts/workoutSlice";
import { selectCurrentLanguage } from "../../features/language/languageSlice";
import { selectLastPayment } from "../../features/payments/paymentsSlice";

import lastPaymentExpired from "../../utils/checkLastPayment";

export default function TranslatedNavVertical() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useSelector(selectUser);
  const activeTemplate = useSelector(selectActiveTemplate);
  const activeWorkout = useSelector(selectActiveWorkout);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const isLogingOut = useSelector(selectUserIsLogingOut);
  const lastPayment = useSelector(selectLastPayment);

  const [disabledItems, setDisabledItems] = useState(false);

  const rawNavItems = [
    {
      icon: <ion-icon name="apps-outline"></ion-icon>,
      text: t("nav-app-dashboard"),
      path: "/app/home",
    },
    {
      icon: <ion-icon name="bookmark-outline"></ion-icon>,
      text: t("nav-app-templates"),
      path: "/app/templates",
    },
    {
      icon: <ion-icon name="barbell-outline"></ion-icon>,
      text: t("nav-app-exercises"),
      path: "/app/exercises",
    },
    {
      icon: <ion-icon name="card-outline"></ion-icon>,
      // TODO translate
      text: "Subscription",
      path: "/app/subscriptions",
    },
  ];

  const [navItems, setNavItems] = useState(rawNavItems);

  const cbHandleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    // Check if the last payment is expired
    const isExpired = lastPaymentExpired(lastPayment);
    setDisabledItems(isExpired || isLogingOut);
  }, [lastPayment, isLogingOut]);

  useEffect(() => {
    const activeTemplateExists = Object.keys(activeTemplate).length > 0;
    const activeWorkoutExists = Object.keys(activeWorkout).length > 0;

    // check index of contains runWorkout in navItems
    const runWorkoutIndex = navItems.findIndex(
      (item) => item.text === t("nav-app-current-workout")
    );

    // Show Workout nav item when it is needed
    if (activeTemplateExists && activeWorkoutExists) {
      // Only show if there is an active template
      const workoutNavItem = {
        text: t("nav-app-current-workout"),
        path: "/app/runWorkout/" + activeTemplate.id + "/" + activeWorkout.id,
        // icon: <ion-icon name="fitness-outline"></ion-icon>,
        icon: <ion-icon name="pulse-outline"></ion-icon>,
      };

      // If runWorkout is already in navItems, update it
      if (runWorkoutIndex !== -1) {
        const newNavItems = [...rawNavItems];

        newNavItems[runWorkoutIndex] = workoutNavItem;

        setNavItems(newNavItems);
      }
      // If runWorkout is not in navItems, add it
      else {
        const newNavItems = [...rawNavItems];

        setNavItems([...newNavItems, workoutNavItem]);
      }
    }
    // If there is no active workout, remove the runWorkout item from the nav
    else if (runWorkoutIndex === -1) {
      const newNavItems = [...rawNavItems];

      setNavItems(newNavItems);
    }
  }, [activeTemplate, activeWorkout, user, currentLanguage]);

  const logoutItem = {
    icon: <ion-icon name="log-out-outline"></ion-icon>,
    text: isLogingOut ? (
      <div className="spinner-2p2-rem"></div>
    ) : (
      t("nav-app-logout")
    ),
  };

  return (
    <NavVertical
      items={navItems}
      logoutItem={logoutItem}
      currentLanguage={currentLanguage}
      cbChangeLanguage={changeLanguage}
      cbHandleLogout={cbHandleLogout}
      isLoading={isLogingOut}
      isDisabled={disabledItems}
    />
  );
}
