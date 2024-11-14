import { useState } from 'react';
import { Link } from 'react-router-dom';

import OAuthLoginV2 from '../oauthLogin/OAuthLoginV2';

import { googleOAuthURL } from '../../serverAPI/serverAPIConfig';

const RegisterFormV2 = ({
    formTitle,  // e.g: 'Create an account'
    formSubtitle,  // e.g: 'Already have an account?'
    formSubtitleLinkText,  // e.g: 'Log in'
    formUsernameLabel,  // e.g: 'Username'
    formEmailLabel,  // e.g: 'Email'
    formPasswordLabel,  // e.g: 'Password'
    formTermsLabel,  // e.g: 'I accept the terms and conditions'
    formSubmitButtonText,  // e.g: 'Create account'
    formOrRegisterWithText,  // e.g: 'Or register with'
}) => {
    const [showPass, setShowPass] = useState(false);

    const toggleShowPass = () => {
        setShowPass(!showPass);
    }

    return (
        <div className="register-form">
            <figure className="register-form__image-box">
                {/* TODO make image responsive */}
                <img src="/images/register-form-largest.jpg" alt="register form image" className="register-form__image" />
            </figure>

            <div className="register-form__form-box">
                <div className="register-form__title-box">
                    <h2 className="register-form__title">{formTitle}</h2>
                    <p className="register-form__title-subtext">
                        {formSubtitle} <Link className="register-form__login-link" to="/login">{formSubtitleLinkText}</Link>
                    </p>
                </div>

                <form className="register-form__form">
                    <div className="register-form__input-box">
                        <input
                            className="base-input-text register-form__input"
                            id="username"
                            type="text"
                            placeholder={formUsernameLabel}
                            // Max value defined in DB
                            maxLength="40"
                            required
                        />
                        <label htmlFor="username" className="register-form__label register-form__label--input-text">{formUsernameLabel}</label>
                    </div>

                    <div className="register-form__input-box">
                        <input
                            className="base-input-text register-form__input"
                            id="email"
                            type="email"
                            placeholder={formEmailLabel}
                            // Max value defined in DB
                            maxLength="70"
                            required
                        />
                        <label htmlFor="email" className="register-form__label register-form__label--input-text">{formEmailLabel}</label>
                    </div>

                    <div className="register-form__input-box">
                        <input
                            className="base-input-text register-form__input"
                            id="password"
                            type={showPass ? 'text' : 'password'}
                            placeholder={formPasswordLabel}
                            // TODO add strong password validation
                            required
                        />
                        <label htmlFor="password" className="register-form__label register-form__label--input-text">{formPasswordLabel}</label>
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

                    {/* Accept terms and conditions */}
                    <div className="register-form__input-box register-form__input-box--terms">
                        <input type="checkbox" id="terms" className="register-form__checkbox" required />
                        <label htmlFor="terms" className="label-checkbox register-form__label register-form__label--terms">{formTermsLabel}</label>
                    </div>

                    <button type="submit" className="plain-btn register-form__submit-button">{formSubmitButtonText}</button>
                </form>

                {/* OAuth logins */}
                <div className="separator-text-between-lines">{formOrRegisterWithText}</div>

                <div className="register-form__oauth-box">
                    <OAuthLoginV2 className="register-form__oauth-button"
                        logo="/images/oauthLogos/google-logo.svg"
                        platformName="Google"
                        callbackURL={googleOAuthURL}
                    />

                    {/* TODO add callback URL to server endpoint for linkedIn login */}
                    <OAuthLoginV2 className="register-form__oauth-button"
                        logo="/images/oauthLogos/linkedin-logo.svg"
                        platformName="LinkedIn"
                        callbackURL="https://linkedin.com"
                    />
                </div>
            </div>
        </div>
    );
}

export default RegisterFormV2;