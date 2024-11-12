import React from 'react'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Alert from '../../components/modals/alert/Alert'

import { machineLanguage } from "../../i18n";
import { useTranslation } from "react-i18next";

import NavHorizontal from '../../components/nav/Nav';
import LoginFormV2 from '../../components/loginForm/LoginFormV2';

const LoginPage = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        if (queryParams.size > 0) {
            try {
                const msg = queryParams.get("msg");
                if (msg === 'Login failed') setIsAlertOpen(true);
            } catch (error) {
                setIsAlertOpen(false);
            }
        }

    }, [location]);

    const [language, setLanguage] = useState(machineLanguage);

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
        <>
            <section className="login-page">
                <NavHorizontal
                    items={navItems}
                    currentLocation={location.pathname}
                    currentLanguage={language}
                    loginText={t('nav-landing-login')}
                    signUpText={t('nav-landing-signup')}
                    cbChangeLanguage={changeLanguage} />

                <LoginFormV2
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
            </section>


            <Alert
                isOpen={isAlertOpen}
                onRequestClose={() => {
                    setIsAlertOpen(false)
                    navigate('/login')
                }}
                message='Login failed.'
            />
        </>
    )
}

export default LoginPage