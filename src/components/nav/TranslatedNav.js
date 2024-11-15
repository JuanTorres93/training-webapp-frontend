import { useState } from "react";
import { useTranslation } from "react-i18next";

import NavHorizontal from "./Nav";

import { machineLanguage } from "../../i18n";

const TranslatedNavHorizontal = ({
    currentLocation,    // current path to determine if logo should be a link or a scroll link
    isInLandingPage = true,    // if true, the logo will be a scroll link
}) => {
    const [language, setLanguage] = useState(machineLanguage);

    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        if (i18n.language === "en") {
            setLanguage("es");
            return i18n.changeLanguage("es");
        } else {
            setLanguage("en");
            return i18n.changeLanguage("en");
        }
    };

    let navItems;

    if (isInLandingPage) {
        navItems = [
            {
                text: t('nav-landing-1'),
                id: "niche-section",
            },
            {
                text: t('nav-landing-2'),
                id: "benefits",
            },
            {
                text: t('nav-landing-3'),
                id: "features",
            },
            {
                text: t('nav-landing-4'),
                id: "testimonials-section",
            },
        ];

    } else {
        navItems = [
            {
                text: t('nav-landing-1'),
                path: "/#niche-section",
            },
            {
                text: t('nav-landing-2'),
                path: "/#benefits",
            },
            {
                text: t('nav-landing-3'),
                path: "/#features",
            },
            {
                text: t('nav-landing-4'),
                path: "/#testimonials-section",
            },
        ];
    }

    return <NavHorizontal
        items={navItems}
        currentLocation={currentLocation}
        currentLanguage={language}
        loginText={t('nav-landing-login')}
        signUpText={t('nav-landing-signup')}
        cbChangeLanguage={changeLanguage}
    />
}

export default TranslatedNavHorizontal;
