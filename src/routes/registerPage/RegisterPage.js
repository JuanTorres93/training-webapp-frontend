import RegisterFormV2 from "../../components/registerForm/RegisterFormV2";
import TranslatedNavHorizontal from "../../components/nav/TranslatedNav";
import ExpiredSessionOptionOrCancel from "../../components/popupOptionOrCancel/ExpiredSessionPopupOptionOrCancel";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
    selectUser,
    registerUser,
    selectUserIsLoading,
} from "../../features/user/userSlice";

export default function RegisterPage({
    // These props are for testing purposes
    mockDispatchFunction = null,
    mockRegisterAction = null,
}) {
    const user = useSelector(selectUser);
    const userIsLoading = useSelector(selectUserIsLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        if (user) {
            navigate("/app/home");
        }
    }, [user]);

    const location = useLocation();

    const { t } = useTranslation();

    return (
        <section className="register-page">
            <TranslatedNavHorizontal
                currentLocation={location.pathname}
                isInLandingPage={false}
            />

            <ExpiredSessionOptionOrCancel />

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
                dispatchFunction={mockDispatchFunction || dispatch}
                registerAction={mockRegisterAction || registerUser}
                isLoading={userIsLoading}
            />
            {/* <RegisterForm /> */}
        </section>
    );
};