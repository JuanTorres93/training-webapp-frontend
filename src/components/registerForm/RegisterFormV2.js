import React, { useState } from 'react';
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
    dispatchFunction = () => { },
    registerAction = (arg) => { },
    isLoading = false,
}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const toggleShowPass = () => {
        setShowPass(!showPass);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatchFunction(registerAction({
            username,
            email,
            password,
            oauth_registration: null,
            is_premium: false,
            is_early_adopter: false,
        }));
    };

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
                        {formSubtitle} <Link
                            className={`register-form__login-link ${isLoading ? 'register-form__login-link--disabled' : ''}`}
                            to={`${isLoading ? '' : '/login'}`}
                        >
                            {formSubtitleLinkText}
                        </Link>
                    </p>
                </div>

                <form className="register-form__form" onSubmit={handleSubmit}>
                    <div className="register-form__input-box">
                        <input
                            className={`base-input-text register-form__input ${isLoading ? 'register-form__input--disabled' : ''}`}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            id="username"
                            data-testid="username"
                            type="text"
                            placeholder={formUsernameLabel}
                            // Max value defined in DB
                            maxLength="40"
                            disabled={isLoading}
                            required
                        />
                        <label htmlFor="username" className="register-form__label register-form__label--input-text">{formUsernameLabel}</label>
                    </div>

                    <div className="register-form__input-box">
                        <input
                            className={`base-input-text register-form__input ${isLoading ? 'register-form__input--disabled' : ''}`}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="email"
                            data-testid="email"
                            type="email"
                            placeholder={formEmailLabel}
                            // Max value defined in DB
                            maxLength="70"
                            disabled={isLoading}
                            required
                        />
                        <label htmlFor="email" className="register-form__label register-form__label--input-text">{formEmailLabel}</label>
                    </div>

                    <div className="register-form__input-box">
                        <input
                            className={`base-input-text register-form__input ${isLoading ? 'register-form__input--disabled' : ''}`}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="password"
                            data-testid="password"
                            type={showPass ? 'text' : 'password'}
                            placeholder={formPasswordLabel}
                            // TODO add strong password validation
                            disabled={isLoading}
                            required
                        />
                        <label htmlFor="password" className="register-form__label register-form__label--input-text">{formPasswordLabel}</label>
                        <figure className="show-pass-box">
                            {!showPass && <ion-icon
                                onClick={isLoading ? () => { } : toggleShowPass}
                                name="eye-outline"
                                class="show-pass-icon--opened">
                            </ion-icon>}

                            {showPass && <ion-icon
                                onClick={isLoading ? () => { } : toggleShowPass}
                                name="eye-off-outline"
                                class="show-pass-icon--closed">
                            </ion-icon>}
                        </figure>
                    </div>

                    {/* Accept terms and conditions */}
                    <div className="register-form__input-box register-form__input-box--terms">
                        <input
                            type="checkbox"
                            onChange={(e) => setTerms(e.target.checked)}
                            value={terms}
                            id="terms"
                            data-testid="terms"
                            className={`register-form__checkbox ${isLoading ? 'register-form__checkbox--disabled' : ''}`}
                            disabled={isLoading}
                            required
                        />
                        <label htmlFor="terms" className="label-checkbox register-form__label register-form__label--terms">{formTermsLabel}</label>
                    </div>

                    {/* Register button */}
                    <button
                        type="submit"
                        data-testid="register-button"
                        className={`plain-btn register-form__submit-button ${isLoading ? 'register-form__submit-button--disabled' : ''}`}
                        disabled={isLoading}
                    >
                        {formSubmitButtonText}
                    </button>
                </form>

                {/* OAuth logins */}
                <div className="separator-text-between-lines">{formOrRegisterWithText}</div>

                <div className="register-form__oauth-box">
                    <OAuthLoginV2 className="register-form__oauth-button"
                        logo="/images/oauthLogos/google-logo.svg"
                        platformName="Google"
                        callbackURL={googleOAuthURL}
                        isEnabled={!isLoading}
                    />

                    {/* TODO add callback URL to server endpoint for linkedIn login */}
                    <OAuthLoginV2 className="register-form__oauth-button"
                        logo="/images/oauthLogos/linkedin-logo.svg"
                        platformName="LinkedIn"
                        callbackURL="https://linkedin.com"
                        isEnabled={!isLoading}
                    />
                </div>
            </div>
        </div>
    );
}

export default RegisterFormV2;