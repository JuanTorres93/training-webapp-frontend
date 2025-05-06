// Application entry point
// Default create-react-app --template redux imports

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";

import reportWebVitals from "./reportWebVitals";

// custom imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginObserverProvider } from "./LoginObserverContext";
import { SubscriptionObserverProvider } from "./SubscriptionObserverContext";
// Translation import
import "./i18n";

// Link css files
import "./variables.css";
import "./css/style.css";

import HomePageV2 from "./routes/homePage/HomePageV2";
import ExercisesPage from "./routes/exercisesPage/ExercisesPage";
import TemplatesPage from "./routes/templatesPage/TemplatesPage";
import LandingPage from "./routes/landingPage/LandingPage";
import RunWorkoutPageV2 from "./routes/runWorkoutPage/RunWorkoutPageV2";
import GlobalUserMessagesManager from "./components/globalUserMessagesManager/globalUserMessagesManager";

import DefaultErrorPage from "./routes/DefaultErrorPage";
import RegisterPage from "./routes/registerPage/RegisterPage";
import LoginPage from "./routes/loginPage/LoginPage";
import SubscriptionsPage from "./routes/subscriptionsPage/SubscriptionsPage";

if (process.env.REACT_APP_NODE_ENV === "test") {
  // Jest does not provide a root element, so we need to create it
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.appendChild(root);
}

const container = document.getElementById("root");
const root = createRoot(container);

// Redux store configuration
// export const { store, persistor, resetApp } = setupStore({});

// Stripe config
// TODO use an environment variable in real projects
// DOCS Stripe tutorial: https://www.youtube.com/watch?v=0Kd0LeAMGf4&ab_channel=FaztCode

// TODO Uncomment for stripe integration
// const stripePromise = loadStripe("pk_test_51Ogm7BK8WU6l6aWStayNzNOetoI6qIZOp2YpjjwSBbwejqTwHMQ6wuVoldlnhEpeoj2McQvrEpU1yCi0G3HfHduf007gdbuqWa");

// Router config
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GlobalUserMessagesManager>
        <LandingPage />
      </GlobalUserMessagesManager>
    ),
    errorElement: <DefaultErrorPage />,
  },
  {
    path: "/register",
    element: (
      <GlobalUserMessagesManager>
        <RegisterPage />
      </GlobalUserMessagesManager>
    ),
    errorElement: <DefaultErrorPage />,
  },
  {
    path: "/login",
    element: (
      <GlobalUserMessagesManager>
        <LoginPage />
      </GlobalUserMessagesManager>
    ),
    errorElement: <DefaultErrorPage />,
  },
  {
    path: "/app",
    errorElement: <DefaultErrorPage />,
    children: [
      {
        index: true,
        element: (
          <GlobalUserMessagesManager>
            <HomePageV2 />
          </GlobalUserMessagesManager>
        ),
      },
      {
        path: "/app/home",
        element: (
          <GlobalUserMessagesManager>
            <HomePageV2 />
          </GlobalUserMessagesManager>
        ),
      },
      {
        path: "/app/dashboard",
        element: (
          <GlobalUserMessagesManager>
            <HomePageV2 />
          </GlobalUserMessagesManager>
        ),
      },
      {
        path: "/app/exercises",
        element: (
          <GlobalUserMessagesManager>
            <ExercisesPage />
          </GlobalUserMessagesManager>
        ),
      },
      {
        path: "/app/templates",
        element: (
          <GlobalUserMessagesManager>
            <TemplatesPage />
          </GlobalUserMessagesManager>
        ),
      },
      {
        path: "/app/runWorkout/:templateId/:workoutId",
        element: (
          <GlobalUserMessagesManager>
            <RunWorkoutPageV2 />
          </GlobalUserMessagesManager>
        ),
      },
      {
        path: "/app/subscriptions",
        element: (
          <GlobalUserMessagesManager>
            <SubscriptionsPage />
          </GlobalUserMessagesManager>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    {/* Wrapper for redux's store configuration */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoginObserverProvider>
          <SubscriptionObserverProvider>
            <RouterProvider router={router} />
          </SubscriptionObserverProvider>
        </LoginObserverProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
