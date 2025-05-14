import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ForgotPasswordForm from "./ForgotPasswordForm";

const TranslatedForgotPasswordForm = ({
  handleSubmit = () => {}, // Expect to return a function when executed with email and password as arguments
  isLoading = false,
}) => {
  const { t } = useTranslation();

  const formTitle = t("forgot-password-form-title");
  const formSubtitle = t("forgot-password-form-subtitle");
  const formEmailLabel = t("register-form-email-label");
  const formSubmitButtonText = t("forgot-password-form-submit-button");
  const formSentEmailText = t("forgot-password-form-sent-email");

  return (
    <ForgotPasswordForm
      formTitle={formTitle}
      formSubtitle={formSubtitle}
      formEmailLabel={formEmailLabel}
      formSentEmailText={formSentEmailText}
      formSubmitButtonText={formSubmitButtonText}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default TranslatedForgotPasswordForm;
