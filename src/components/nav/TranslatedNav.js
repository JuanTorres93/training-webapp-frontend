import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import NavHorizontal from "./Nav";

import { changeLanguage } from "../../i18n";
import { selectCurrentLanguage } from "../../features/language/languageSlice";

const TranslatedNavHorizontal = ({
    currentLocation,    // current path to determine if logo should be a link or a scroll link
    isInLandingPage = true,    // if true, the logo will be a scroll link
    userIsLoggedIn = false,
}) => {
    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguage);

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
        currentLanguage={currentLanguage}
        userIsLoggedIn={userIsLoggedIn}
        loginText={t('nav-landing-login')}
        signUpText={t('nav-landing-signup')}
        cbChangeLanguage={changeLanguage}
    />
}

export default TranslatedNavHorizontal;
