import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TranslatedNavHorizontal from "../../components/nav/TranslatedNav";
import TranslatedResetPasswordForm from "../../components/resetPasswordForm/TranslatedResetPasswordForm";
import ExpiredSessionOptionOrCancel from "../../components/popupOptionOrCancel/ExpiredSessionPopupOptionOrCancel";

import { selectUser, selectUserIsLoading } from "../../features/user/userSlice";
import { resetPasswordUser } from "../../features/user/userSlice";

const ResetPasswordPage = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { token } = useParams(); // Extract token from the URL
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
  }, [user, navigate, token]);

  const handleSubmit = () => {
    return (password, passwordConfirm) => {
      dispatch(resetPasswordUser({ token, password, passwordConfirm }));
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

        <TranslatedResetPasswordForm
          handleSubmit={handleSubmit}
          isLoading={userIsLoading}
        />
      </section>
    </>
  );
};

export default ResetPasswordPage;
