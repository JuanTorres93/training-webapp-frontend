import RegisterForm from "../../components/registerForm/RegisterForm";
import RegisterFormV2 from "../../components/registerForm/RegisterFormV2";
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

            <RegisterFormV2
                formTitle={t('register-form-title')}
                formSubtitle={t('register-form-subtitle')}
                formSubtitleLinkText={t('register-form-subtitle-link')}
                formUsernameLabel={t('register-form-username-label')}
                formEmailLabel={t('register-form-email-label')}
                formPasswordLabel={t('register-form-password-label')}
                formTermsLabel={t('register-form-terms-label')}
                formSubmitButtonText={t('register-form-submit-button')}
                formOrRegisterWithText={t('register-form-or-register-with-text')}
            />
            {/* <RegisterForm /> */}
        </section>
    );
};