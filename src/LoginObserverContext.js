import React, { useState, useEffect, createContext } from "react";

import { useDispatch, useSelector } from "react-redux";

import { logoutUser, selectUser } from "./features/user/userSlice";

// Crear el contexto
const LoginObserverContext = createContext();

export const LoginObserverProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // DOC Can be added useStates to more complex contexts
  const [sessionExpiresAt, setSessionExpiresAt] = useState(null);

  // Effect to set the expiration date when user is loaded
  useEffect(() => {
    const expirationDate = user ? user.expirationDate : null;

    const expirationAt = expirationDate ? new Date(expirationDate).toISOString() : null;

    setSessionExpiresAt(expirationAt);
  }, [user]);


  const logOutOnExpiredSession = (event) => {
    if (!sessionExpiresAt || !user) return;

    const currentTime = new Date().toISOString();

    if (sessionExpiresAt <= currentTime) {
      dispatch(logoutUser());
    }
  };

  // Effect for auto logout if session is expired
  // Used mainly for when user is already logged in and the session expires while the 
  // user is NOT on the page
  // It mainly adds the functionallity of logging out when user reloads or reaches
  // again the page after it was closed.
  useEffect(() => {
    logOutOnExpiredSession();
  });

  // Effect to check periodically if the session is about to expire
  useEffect(() => {
    if (!sessionExpiresAt) return;

    // Run intervals every minute
    const frequencyInMs = 60 * 1000;

    const sessionAboutToExpireInterval = setInterval(() => {
      const currentTime = new Date().toISOString();

      // Margin of 30 minutes for user to be able to act
      const marginToWarnUserinMs = 30 * 60 * 1000;

      // Expiry date minus margin
      const expiryDateMinusMargin = new Date(new Date(sessionExpiresAt).getTime() - marginToWarnUserinMs).toISOString();

      if (expiryDateMinusMargin <= currentTime) {
        // TODO State to show the dialog
        // setIsConfirmOpen(true);
        clearInterval(sessionAboutToExpireInterval);
      }
    }, frequencyInMs);

    const sessionExpiredInterval = setInterval(() => {
      const currentTime = new Date().toISOString();

      if (sessionExpiresAt <= currentTime) {
        // TODO State to show the dialog
        // setIsAlertOpen(true);
        // Close confirm dialog if open
        // TODO State to show the dialog
        // setIsConfirmOpen(false);
        dispatch(logoutUser());
        clearInterval(sessionExpiredInterval);
      }
    }, frequencyInMs);

    return () => {
      clearInterval(sessionAboutToExpireInterval)
      clearInterval(sessionExpiredInterval)
    }; // Clean intervals when component unmounts
  }, [sessionExpiresAt, dispatch]);

  // Detect global events
  useEffect(() => {
    // Register the listeners
    document.addEventListener("click", logOutOnExpiredSession);
    document.addEventListener("keydown", logOutOnExpiredSession);

    // Clean listeners when the component is unmounted
    return () => {
      document.removeEventListener("click", logOutOnExpiredSession);
      document.removeEventListener("keydown", logOutOnExpiredSession);
    };
  }, [user, sessionExpiresAt]);

  // DOC Data can be written to be available in the app
  // useStates values can be used
  const value = {
    test: "test",
  };

  return (
    <LoginObserverContext.Provider value={value}>
      {children}
    </LoginObserverContext.Provider>
  );
};
