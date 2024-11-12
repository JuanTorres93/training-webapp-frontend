import { useState } from 'react';
import { Link } from 'react-router-dom';

import OAuthLoginV2 from '../oauthLogin/OAuthLoginV2';

const LoginFormV2 = ({
    formEmailLabel = "Email", // TODO BORRAR VALOR POR DEFECTO Y TRADUCIR
    formPasswordLabel = "Password", // TODO BORRAR VALOR POR DEFECTO Y TRADUCIR
    formRememberMeText = "Remember me", // TODO BORRAR VALOR POR DEFECTO Y TRADUCIR
    formSubmitButtonText = "Log in", // TODO BORRAR VALOR POR DEFECTO Y TRADUCIR
    formOrloginWithText = "Or continue with email" // TODO BORRAR VALOR POR DEFECTO Y TRADUCIR,
}) => {
    const [showPass, setShowPass] = useState(false);

    const toggleShowPass = () => {
        setShowPass(!showPass);
    }

    return (
        <div className="login-form">
            <figure className="login-form__image-box">
                {/* TODO change image */}
                <img src="/images/lastCTA.png" alt="login form image" className="login-form__image" />
            </figure>

            <div className="login-form__form-box">
                <div className="login-form__title-box">
                    <h2 className="login-form__title">TITLE</h2>
                    <p className="login-form__title-subtext">
                        SUBITLTE
                    </p>
                </div>

                <form className="login-form__form">

                    <div className="login-form__input-box">
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
                        <input
                            className="base-input-text login-form__input"
                            id="password"
                            type={showPass ? 'text' : 'password'}
                            placeholder={formPasswordLabel}
                            // TODO add strong password validation
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

                    {/* Accept terms and conditions */}
                    <div className="login-form__input-box login-form__input-box--terms">
                        <input type="checkbox" id="terms" className="login-form__checkbox" required />
                        <label htmlFor="terms" className="label-checkbox login-form__label login-form__label--terms">{formRememberMeText}</label>
                    </div>

                    <button type="submit" className="plain-btn login-form__submit-button">{formSubmitButtonText}</button>
                </form>

                {/* OAuth logins */}
                <div className="separator-text-between-lines">{formOrloginWithText}</div>

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
            </div>
        </div>
    );
}

export default LoginFormV2;