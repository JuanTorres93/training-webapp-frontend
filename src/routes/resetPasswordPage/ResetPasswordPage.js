import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import TranslatedNavHorizontal from "../../components/nav/TranslatedNav";
import TranslatedResetPasswordForm from "../../components/resetPasswordForm/TranslatedResetPasswordForm";
import ExpiredSessionOptionOrCancel from "../../components/popupOptionOrCancel/ExpiredSessionPopupOptionOrCancel";

import { selectUser, selectUserIsLoading } from "../../features/user/userSlice";

const ResetPasswordPage = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userIsLoading = useSelector(selectUserIsLoading);

  const { t } = useTranslation();
  useEffect(() => {
    // If user exists, then redirect to the app
    if (user) {
      navigate("/app/home");
    }
  }, [user, navigate]);

  return (
    <>
      <section data-testid="login-page" className="login-page">
        <TranslatedNavHorizontal
          currentLocation={location.pathname}
          isInLandingPage={false}
        />
        <ExpiredSessionOptionOrCancel />

        <TranslatedResetPasswordForm isLoading={userIsLoading} />
      </section>
    </>
  );
};

export default ResetPasswordPage;
