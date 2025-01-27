import React, { useState, useEffect, createContext } from "react";

// Crear el contexto
const LoginObserverContext = createContext();

export const LoginObserverProvider = ({ children }) => {
  // DOC Can be added useStates to more complex contexts

  const checkIfSessionExpired = (event) => {
    // current datetime log
    console.log(Date.now());
  };

  // Detect global events
  useEffect(() => {

    // Register the listeners
    document.addEventListener("click", checkIfSessionExpired);
    document.addEventListener("keydown", checkIfSessionExpired);

    // Clean listeners when the component is unmounted
    return () => {
      document.removeEventListener("click", checkIfSessionExpired);
      document.removeEventListener("keydown", checkIfSessionExpired);
    };
  }, []);

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
