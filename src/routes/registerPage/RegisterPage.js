import RegisterForm from "../../components/registerForm/RegisterForm";
import NavHorizontal from "../../components/nav/Nav";

import { machineLanguage } from "../../i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function RegisterPage() {
    const [language, setLanguage] = useState(machineLanguage);
    const location = useLocation();

    const { t, i18n } = useTranslation();

    // TODO DRY
    const changeLanguage = () => {
        if (i18n.language === "en") {
            setLanguage("es");
            return i18n.changeLanguage("es");
        } else {
            setLanguage("en");
            return i18n.changeLanguage("en");
        }
    };

    const navItems = [
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

    return (
        <section className="register-page">
            <NavHorizontal
                items={navItems}
                currentLocation={location.pathname}
                currentLanguage={language}
                loginText={t('nav-landing-login')}
                signUpText={t('nav-landing-signup')}
                cbChangeLanguage={changeLanguage} />

            <h2 className="heading">Register</h2>
            <RegisterForm />
        </section>
    );
};