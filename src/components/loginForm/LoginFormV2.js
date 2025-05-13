import React, { useState } from "react";
import { Link } from "react-router-dom";

import OAuthLoginV2 from "../oauthLogin/OAuthLoginV2";

import { googleOAuthURL } from "../../serverAPI/serverAPIConfig";

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
  handleSubmit = () => {}, // Expect to return a function when executed with email and password as arguments
  isLoading = false,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const dispatchLogin = handleSubmit();
    dispatchLogin(email, password);
  };

  return (
    <div className="login-form">
      <div className="login-form__form-box">
        <div className="login-form__title-box">
          <h2 className="login-form__title">{formTitle}</h2>
          <p className="login-form__title-subtext">{formSubtitle}</p>
        </div>

        {/* OAuth logins */}

        <div className="login-form__oauth-box">
          <OAuthLoginV2
            className="login-form__oauth-button"
            logo="/images/oauthLogos/google-logo.svg"
            platformName="Google"
            callbackURL={googleOAuthURL}
            isEnabled={!isLoading}
          />

          {/* TODO add callback URL to server endpoint for linkedIn login */}
          {/* <OAuthLoginV2 className="login-form__oauth-button"
                        logo="/images/oauthLogos/linkedin-logo.svg"
                        platformName="LinkedIn"
                        callbackURL="https://linkedin.com"
                        isEnabled={!isLoading}
                    /> */}
        </div>

        {/* email login */}
        <div className="u-margin-top-small">
          <div className=" separator-text-between-lines ">
            {formOrloginWithText}
          </div>
        </div>

        <form className="login-form__form" onSubmit={handleLogin}>
          <div className="login-form__input-box">
            {/* IMPORTANT: This is actually the USERNAME, not the email */}
            <figure className="login-form__input-icon-box">
              {/* <ion-icon name="mail-outline" class="login-form__input-icon"></ion-icon> */}
              {/* Icon for username */}
              <ion-icon
                name="person-outline"
                class="login-form__input-icon"
              ></ion-icon>
            </figure>
            <input
              // IMPORTANT: This is actually the USERNAME, not the email
              className={`base-input-text login-form__input ${
                isLoading ? "login-form__input--disabled" : ""
              }`}
              data-testid="email"
              id="email"
              type="text"
              placeholder={formEmailLabel}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Max value defined in DB
              maxLength="70"
              disabled={isLoading}
              required
            />
            <label
              htmlFor="email"
              className="login-form__label login-form__label--input-text"
            >
              {formEmailLabel}
            </label>
          </div>

          <div className="login-form__input-box">
            <figure className="login-form__input-icon-box">
              <ion-icon
                name="lock-closed-outline"
                class="login-form__input-icon"
              ></ion-icon>
            </figure>
            <input
              className={`base-input-text login-form__input ${
                isLoading ? "login-form__input--disabled" : ""
              }`}
              data-testid="password"
              id="password"
              type={showPass ? "text" : "password"}
              placeholder={formPasswordLabel}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              className="login-form__label login-form__label--input-text"
            >
              {formPasswordLabel}
            </label>
            <figure className="show-pass-box">
              {!showPass && (
                <ion-icon
                  onClick={isLoading ? () => {} : toggleShowPass}
                  name="eye-outline"
                  class="show-pass-icon--opened"
                ></ion-icon>
              )}

              {showPass && (
                <ion-icon
                  onClick={isLoading ? () => {} : toggleShowPass}
                  name="eye-off-outline"
                  class="show-pass-icon--closed"
                ></ion-icon>
              )}
            </figure>
          </div>

          {/* Remember me */}
          <div className="login-form__input-box login-form__input-box--remember">
            <input
              type="checkbox"
              id="remember-me"
              className={`login-form__checkbox ${
                isLoading ? "login-form__checkbox--disabled" : ""
              }`}
              disabled={isLoading}
            />
            <label
              htmlFor="remember-me"
              className="label-checkbox login-form__label login-form__label--remember"
            >
              {formRememberMeText}
            </label>

            <Link
              to={`${isLoading ? "" : "/forgotPassword"}`}
              className={`login-form__forgot ${
                isLoading ? "login-form__forgot--disabled" : ""
              }`}
            >
              {formForgotPasswordText}
            </Link>
          </div>

          {/* Login button */}
          <button
            data-testid="login-button"
            type="submit"
            className={`plain-btn login-form__submit-button ${
              isLoading ? "login-form__submit-button--disabled" : ""
            }`}
            disabled={isLoading}
          >
            {!isLoading && formSubmitButtonText}
            {isLoading && <div className="spinner-2p2-rem"></div>}
          </button>
        </form>

        <p className={`login-form__create-account`}>
          {formDonotHaveAccountText}{" "}
          <Link
            to={`${isLoading ? "" : "/register"}`}
            className={`login-form__create-account-link ${
              isLoading ? "login-form__create-account-link--disabled" : ""
            }`}
          >
            {formCreateAccountText}
          </Link>
        </p>
      </div>

      <figure className="login-form__image-box">
        {/* TODO make image responsive */}
        <img
          src="/images/login-form-largest.jpg"
          alt="login form image"
          className="login-form__image"
        />
      </figure>
    </div>
  );
};

export default LoginFormV2;
