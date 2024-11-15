import RegisterFormV2 from "../../components/registerForm/RegisterFormV2";
import TranslatedNavHorizontal from "../../components/nav/TranslatedNav";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function RegisterPage() {
    const location = useLocation();

    const { t } = useTranslation();

    return (
        <section className="register-page">
            <TranslatedNavHorizontal
                currentLocation={location.pathname}
                isInLandingPage={false}
            />

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