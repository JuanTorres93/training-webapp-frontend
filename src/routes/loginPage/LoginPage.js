import React from 'react'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from "react-i18next";

import TranslatedNavHorizontal from '../../components/nav/TranslatedNav';
import LoginFormV2 from '../../components/loginForm/LoginFormV2';
import ExpiredSessionOptionOrCancel from '../../components/popupOptionOrCancel/ExpiredSessionPopupOptionOrCancel';
import Alert from '../../components/modals/alert/Alert'
import { loginUser, selectUser, selectUserIsLoading } from '../../features/user/userSlice';

import FlashMessage from '../../components/flashMessage/FlashMessage';

const LoginPage = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userIsLoading = useSelector(selectUserIsLoading);

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

    const { t } = useTranslation();

    useEffect(() => {
        // If user exists, then redirect to the app
        if (user) {
            navigate('/app/home');
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

    return (
        <>
            <section className="login-page">
                <TranslatedNavHorizontal
                    currentLocation={location.pathname}
                    isInLandingPage={false}
                />
                <ExpiredSessionOptionOrCancel />

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
                    isLoading={userIsLoading}
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

            <FlashMessage
                // TODO ADD REAL CONDITION BASED N REDUX ERROR STATES
                isVisible={true}
                title='Logging in'
                description='Please wait while we log you in.'
            />
        </>
    )
}

export default LoginPage