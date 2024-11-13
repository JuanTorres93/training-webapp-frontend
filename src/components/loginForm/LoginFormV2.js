import { useState } from 'react';
import { Link } from 'react-router-dom';

import OAuthLoginV2 from '../oauthLogin/OAuthLoginV2';

const LoginFormV2 = ({
    formTitle,
    formSubtitle,
    formOrloginWithText,
    formEmailLabel,
    formPasswordLabel,
    formRememberMeText,
    formSubmitButtonText,
    formForgotPasswordText,
    formDonotHaveAccountText,
    formCreateAccountText,
}) => {
    const [showPass, setShowPass] = useState(false);

    const toggleShowPass = () => {
        setShowPass(!showPass);
    }

    return (
        <div className="login-form">
            <div className="login-form__form-box">
                <div className="login-form__title-box">
                    <h2 className="login-form__title">{formTitle}</h2>
                    <p className="login-form__title-subtext">
                        {formSubtitle}
                    </p>
                </div>

                {/* OAuth logins */}

                <div className="login-form__oauth-box">
                    {/* TODO add callback URL to server endpoint for google login */}
                    <OAuthLoginV2 className="login-form__oauth-button"
                        logo="/images/oauthLogos/google-logo.svg"
                        platformName="Google"
                        callbackURL="https://google.com"
                    />

                    {/* TODO add callback URL to server endpoint for linkedIn login */}
                    <OAuthLoginV2 className="login-form__oauth-button"
                        logo="/images/oauthLogos/linkedin-logo.svg"
                        platformName="LinkedIn"
                        callbackURL="https://linkedin.com"
                    />
                </div>

                {/* email login */}
                <div className="u-margin-top-small">
                    <div className=" separator-text-between-lines ">{formOrloginWithText}</div>
                </div>

                <form className="login-form__form">

                    <div className="login-form__input-box">
                        <figure className="login-form__input-icon-box">
                            <ion-icon name="mail-outline" class="login-form__input-icon"></ion-icon>
                        </figure>
                        <input
                            className="base-input-text login-form__input"
                            id="email"
                            type="email"
                            placeholder={formEmailLabel}
                            // Max value defined in DB
                            maxLength="70"
                            required
                        />
                        <label htmlFor="email" className="login-form__label login-form__label--input-text">{formEmailLabel}</label>
                    </div>

                    <div className="login-form__input-box">
                        <figure className="login-form__input-icon-box">
                            <ion-icon name="lock-closed-outline" class="login-form__input-icon"></ion-icon>
                        </figure>
                        <input
                            className="base-input-text login-form__input"
                            id="password"
                            type={showPass ? 'text' : 'password'}
                            placeholder={formPasswordLabel}
                            required
                        />
                        <label htmlFor="password" className="login-form__label login-form__label--input-text">{formPasswordLabel}</label>
                        <figure className="show-pass-box">
                            {!showPass && <ion-icon
                                onClick={toggleShowPass}
                                name="eye-outline"
                                class="show-pass-icon--opened">
                            </ion-icon>}

                            {showPass && <ion-icon
                                onClick={toggleShowPass}
                                name="eye-off-outline"
                                class="show-pass-icon--closed">
                            </ion-icon>}
                        </figure>
                    </div>

                    {/* Remember me */}
                    <div className="login-form__input-box login-form__input-box--remember">
                        <input type="checkbox" id="terms" className="login-form__checkbox" required />
                        <label htmlFor="terms" className="label-checkbox login-form__label login-form__label--remember">{formRememberMeText}</label>

                        {/* TODO consider if should be a span or other element */}
                        <span className='login-form__forgot'>
                            {formForgotPasswordText}
                        </span>
                    </div>

                    <button type="submit" className="plain-btn login-form__submit-button">{formSubmitButtonText}</button>
                </form>

                <p className="login-form__create-account">
                    {formDonotHaveAccountText} <Link to="/register" className="login-form__create-account-link">{formCreateAccountText}</Link>
                </p>
            </div>

            <figure className="login-form__image-box">
                {/* TODO make image responsive */}
                <img src="/images/login-form-largest.jpg" alt="login form image" className="login-form__image" />
            </figure>

        </div>
    );
}

export default LoginFormV2;