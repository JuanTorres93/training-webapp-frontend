import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPasswordForm = ({
  formTitle,
  formSubtitle,
  formPasswordLabel,
  formPasswordConfirmLabel,
  formSubmitButtonText,
  handleSubmit = () => {}, // Expect to return a function when executed with email and password as arguments
  isLoading = false,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleLogin = (e) => {};

  return (
    <div className="forgot-reset-pass-form">
      <div className="forgot-reset-pass-form__form-box">
        <div className="forgot-reset-pass-form__title-box">
          <h2 className="forgot-reset-pass-form__title">{formTitle}</h2>
          <p className="forgot-reset-pass-form__title-subtext">
            {formSubtitle}
          </p>
        </div>

        <form className="forgot-reset-pass-form__form" onSubmit={handleLogin}>
          <div className="forgot-reset-pass-form__input-box">
            <figure className="forgot-reset-pass-form__input-icon-box">
              <ion-icon
                name="lock-closed-outline"
                class="forgot-reset-pass-form__input-icon"
              ></ion-icon>
            </figure>
            <input
              className={`base-input-text forgot-reset-pass-form__input ${
                isLoading ? "forgot-reset-pass-form__input--disabled" : ""
              }`}
              data-testid="password"
              id="password"
              type={showPass ? "text" : "password"}
              placeholder={formPasswordLabel}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

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

          <div className="forgot-reset-pass-form__input-box">
            <figure className="forgot-reset-pass-form__input-icon-box">
              <ion-icon
                name="lock-closed-outline"
                class="forgot-reset-pass-form__input-icon"
              ></ion-icon>
            </figure>
            <input
              className={`base-input-text forgot-reset-pass-form__input ${
                isLoading ? "forgot-reset-pass-form__input--disabled" : ""
              }`}
              data-testid="passwordConfirm"
              id="passwordConfirm"
              type={showPass ? "text" : "password"}
              placeholder={formPasswordConfirmLabel}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />

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

          {/* Login button */}
          <button
            data-testid="forgot-reset-pass-button"
            type="submit"
            className={`plain-btn forgot-reset-pass-form__submit-button ${
              isLoading ? "forgot-reset-pass-form__submit-button--disabled" : ""
            }`}
            disabled={isLoading}
          >
            {!isLoading && formSubmitButtonText}
            {isLoading && <div className="spinner-2p2-rem"></div>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
