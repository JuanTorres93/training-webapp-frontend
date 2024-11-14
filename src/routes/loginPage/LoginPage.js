import React from 'react'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { machineLanguage } from "../../i18n";
import { useTranslation } from "react-i18next";

import NavHorizontal from '../../components/nav/Nav';
import LoginFormV2 from '../../components/loginForm/LoginFormV2';
import Alert from '../../components/modals/alert/Alert'
import { loginUser, selectUser } from '../../features/user/userSlice';

const LoginPage = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

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

    useEffect(() => {
        // If user exists, then redirect to the app
        if (user) {
            navigate('/app');
        }
    }, [user, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        // find email and password by keys in e
        const email = e.target.email.value;
        const password = e.target.password.value;

        // TODO this will be just email. Right now auth requires username.
        dispatch(loginUser({ username: email, password }));
    }

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
                    formTitle={t('login-form-title')}
                    formSubtitle={t('login-form-subtitle')}
                    formOrloginWithText={t('login-form-or-login-with-text')}
                    formEmailLabel={t('login-form-email-label')}
                    formPasswordLabel={t('login-form-password-label')}
                    formRememberMeText={t('login-form-remember-me-text')}
                    formSubmitButtonText={t('login-form-submit-button')}
                    formForgotPasswordText={t('login-form-forgot-password-text')}
                    formDonotHaveAccountText={t('login-form-dont-have-account-text')}
                    formCreateAccountText={t('login-form-create-account-text')}
                    handleSubmit={handleLogin}
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