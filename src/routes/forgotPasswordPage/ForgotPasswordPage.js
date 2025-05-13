import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import TranslatedNavHorizontal from "../../components/nav/TranslatedNav";
import TranslatedForgotPasswordForm from "../../components/forgotPasswordForm/TranslateForgotPasswordForm";
import ExpiredSessionOptionOrCancel from "../../components/popupOptionOrCancel/ExpiredSessionPopupOptionOrCancel";

import {
  forgotPasswordUser,
  selectUser,
  selectUserIsLoading,
} from "../../features/user/userSlice";

const ForgotPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userIsLoading = useSelector(selectUserIsLoading);

  useEffect(() => {
    // If user exists, then redirect to the app
    if (user) {
      navigate("/app/home");
    }
  }, [user, navigate]);

  const handleSubmit = () => {
    return (email) => {
      dispatch(forgotPasswordUser({ email }));
    };
  };

  return (
    <>
      <section data-testid="login-page" className="login-page">
        <TranslatedNavHorizontal
          currentLocation={location.pathname}
          isInLandingPage={false}
        />
        <ExpiredSessionOptionOrCancel />

        <TranslatedForgotPasswordForm
          handleSubmit={handleSubmit}
          isLoading={userIsLoading}
        />
      </section>
    </>
  );
};

export default ForgotPasswordPage;
