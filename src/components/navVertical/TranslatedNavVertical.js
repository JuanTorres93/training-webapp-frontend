import NavVertical from "./NavVertical";

import { useTranslation } from "react-i18next";

import { currentLanguage, changeLanguage } from "../../i18n";

export default function TranslatedNavVertical() {
    // TODO only appear if user is logged in

    const { t } = useTranslation();

    const navItems = [
        {
            icon: <ion-icon name="apps-outline"></ion-icon>,
            text: t("nav-app-dashboard"),
            path: "/app",
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
            // TODO: only show if a training is in progress
            text: t("nav-app-current-workout"),
            path: "/app/runWorkout",
            // icon: <ion-icon name="fitness-outline"></ion-icon>,
            icon: <ion-icon name="pulse-outline"></ion-icon>,
        },
    ];

    const logoutItem = {
        icon: <ion-icon name="log-out-outline"></ion-icon>,
        text: t("nav-app-logout"),
    };

    return (
        <NavVertical
            items={navItems}
            logoutItem={logoutItem}
            currentLanguage={currentLanguage}
            cbChangeLanguage={changeLanguage}
        />
    );
}
