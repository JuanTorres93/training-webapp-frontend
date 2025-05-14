import React, { useState, useEffect, use } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectEmailSent, resetEmailSent } from "../../features/user/userSlice";

const ForgotPasswordForm = ({
  formTitle,
  formSubtitle,
  formEmailLabel,
  formSubmitButtonText,
  formSentEmailText,
  handleSubmit = () => {}, // Expect to return a function when executed with email and password as arguments
  isLoading = false,
}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState(formSubmitButtonText);
  const emailSent = useSelector(selectEmailSent);

  useEffect(() => {
    dispatch(resetEmailSent());
  }, []);

  useEffect(() => {
    if (emailSent) {
      setButtonText(formSentEmailText);
    } else {
      setButtonText(formSubmitButtonText);
    }
  }, [emailSent, formSubmitButtonText, formSentEmailText]);

  const handleSendResetEmail = (e) => {
    e.preventDefault();
    const dispatchForgotPassword = handleSubmit();
    dispatchForgotPassword(email);
    setEmail("");
  };

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
          onSubmit={handleSendResetEmail}
        >
          <div className="forgot-reset-pass-form__input-box">
            {/* IMPORTANT: This is actually the USERNAME, not the email */}
            <figure className="forgot-reset-pass-form__input-icon-box">
              {/* <ion-icon name="mail-outline" class="forgot-reset-pass-form__input-icon"></ion-icon> */}
              {/* Icon for email */}
              <ion-icon
                name="mail-outline"
                class="forgot-reset-pass-form__input-icon"
              ></ion-icon>
            </figure>
            <input
              // IMPORTANT: This is actually the USERNAME, not the email
              className={`base-input-text forgot-reset-pass-form__input ${
                isLoading ? "forgot-reset-pass-form__input--disabled" : ""
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
          </div>

          {/* Login button */}
          <button
            data-testid="forgot-reset-pass-button"
            type="submit"
            className={`plain-btn forgot-reset-pass-form__submit-button ${
              isLoading ? "forgot-reset-pass-form__submit-button--disabled" : ""
            } 
            ${emailSent ? "forgot-reset-pass-form__submit-button--sent" : ""}
            `}
            disabled={isLoading}
          >
            {!isLoading && <span>{buttonText}</span>}
            {/* Spinner */}
            {isLoading && <div className="spinner-2p2-rem"></div>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
