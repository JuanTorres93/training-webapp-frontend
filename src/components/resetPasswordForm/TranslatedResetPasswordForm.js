import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ResetPasswordForm from "./ResetPasswordForm";

const TranslatedResetPasswordForm = ({
  handleSubmit = () => {}, // Expect to return a function when executed with email and password as arguments
  isLoading = false,
}) => {
  const { t } = useTranslation();

  const formTitle = t("reset-password-form-title");
  const formSubtitle = t("reset-password-form-subtitle");
  const formPasswordLabel = t("reset-password-form-password-label");
  const formPasswordConfirmLabel = t(
    "reset-password-form-password-confirm-label"
  );
  const formSubmitButtonText = t("reset-password-form-submit-button");
  const weakPasswordText = t("weak-password-text");
  const passwordResetText = t("reset-password-form-success-text");

  return (
    <ResetPasswordForm
      formTitle={formTitle}
      formSubtitle={formSubtitle}
      formPasswordLabel={formPasswordLabel}
      formPasswordConfirmLabel={formPasswordConfirmLabel}
      formSubmitButtonText={formSubmitButtonText}
      weakPasswordText={weakPasswordText}
      passwordResetText={passwordResetText}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default TranslatedResetPasswordForm;
