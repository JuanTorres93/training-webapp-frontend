import React, { createContext } from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "./features/user/userSlice";
import { getCurrentSubscription } from "./features/subscriptions/subscriptionsSlice";
import { getLastPayment } from "./features/payments/paymentsSlice";

// Create the context
export const SubscriptionObserverContext = createContext();

export const SubscriptionObserverProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  setInterval(() => {
    if (user) {
      dispatch(getCurrentSubscription({ userId: user.id }));
      dispatch(getLastPayment());
    }
  }, 5 * 60 * 1000);

  // DOC Data can be written to be available in the app
  // useStates values can be used
  const value = {};

  return (
    <SubscriptionObserverContext.Provider value={value}>
      {children}
    </SubscriptionObserverContext.Provider>
  );
};
