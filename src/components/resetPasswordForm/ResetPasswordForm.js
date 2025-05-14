import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { handlePasswordChangeFactory } from "../../utils/eventFactory";
import { strongPasswordRegexString } from "../../utils/inputUtils";
import {
  selectPasswordReset,
  resetPasswordReset,
} from "../../features/user/userSlice";

const ResetPasswordForm = ({
  formTitle,
  formSubtitle,
  formPasswordLabel,
  formPasswordConfirmLabel,
  formSubmitButtonText,
  weakPasswordText,
  passwordResetText,
  handleSubmit = () => {}, // Expect to return a function when executed with email and password as arguments
  isLoading = false,
}) => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState(formSubmitButtonText);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmIsValid, setPasswordConfirmIsValid] = useState(false);
  const isPasswordReset = useSelector(selectPasswordReset);

  useEffect(() => {
    dispatch(resetPasswordReset());
  }, []);

  useEffect(() => {
    if (isPasswordReset) {
      setButtonText(passwordResetText);
    } else {
      setButtonText(formSubmitButtonText);
    }
  }, [isPasswordReset]);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    const dispatchResetPassword = handleSubmit();
    dispatchResetPassword(password, passwordConfirm);
    setPassword("");
    setPasswordConfirm("");
  };

  const handlePasswordChange = handlePasswordChangeFactory(
    setPassword,
    setPasswordIsValid
  );
  const handlePasswordConfirmChange = handlePasswordChangeFactory(
    setPasswordConfirm,
    setPasswordConfirmIsValid
  );

  return (
    <div className="forgot-reset-pass-form">
      <div className="forgot-reset-pass-form__form-box">
        <div className="forgot-reset-pass-form__title-box">
          <h2 className="forgot-reset-pass-form__title">{formTitle}</h2>
          <p className="forgot-reset-pass-form__title-subtext">
            {formSubtitle}
          </p>
        </div>

        <form
          className="forgot-reset-pass-form__form"
          onSubmit={handleSubmitChangePassword}
        >
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
              onChange={handlePasswordChange}
              pattern={strongPasswordRegexString}
              title={weakPasswordText}
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
              onChange={handlePasswordConfirmChange}
              pattern={strongPasswordRegexString}
              title={weakPasswordText}
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
              isLoading || isPasswordReset
                ? "forgot-reset-pass-form__submit-button--disabled"
                : ""
            } 
            `}
            disabled={isLoading}
          >
            {!isLoading && buttonText}
            {isLoading && <div className="spinner-2p2-rem"></div>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
