// Application entry point
// Default create-react-app --template redux imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { setupStore } from './app/store';
import reportWebVitals from './reportWebVitals';

// custom imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// TODO Uncomment for stripe integration
// import { loadStripe } from "@stripe/stripe-js";
//import {
//  Elements,   // Wrapper component to include stripe components for processing payments
//} from '@stripe/react-stripe-js';
import HomePage from './routes/homePage/HomePage';
import NavBar from './components/navbar/NavBar';
import CreateTemplatePage from './routes/createTemplate/CreateTemplatePage';
import CreateExercisePage from './routes/createExercise/CreateExercisePage';
import SelectTemplatePage from './routes/selectTemplate/SelectTemplatePage';
import StartWorkoutPage from './routes/startWorkoutPage/StartWorkoutPage';
import RunWorkoutPage from './routes/runWorkoutPage/RunWorkoutPage';
import GenericChild from './routes/GenericChild';
import DefaultErrorPage from './routes/DefaultErrorPage';
import Products from './routes/ProductsPage';
import SingleProductPage from './routes/SingleProductPage';
import RegisterPage from './routes/registerPage/RegisterPage';
import LoginPage from './routes/loginPage/LoginPage';
// Link css files
import './variables.css'
import './index.css'

// TODO DELETE IN PRODUCTION
import ComponentDesign from './routes/ComponentDesign';

const container = document.getElementById('root');
const root = createRoot(container);

// Redux store configuration
export const { store, persistor, resetApp } = setupStore({});

// Stripe config
// TODO use an environment variable in real projects
// DOCS Stripe tutorial: https://www.youtube.com/watch?v=0Kd0LeAMGf4&ab_channel=FaztCode

// TODO Uncomment for stripe integration
// const stripePromise = loadStripe("pk_test_51Ogm7BK8WU6l6aWStayNzNOetoI6qIZOp2YpjjwSBbwejqTwHMQ6wuVoldlnhEpeoj2McQvrEpU1yCi0G3HfHduf007gdbuqWa");

// Router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: <DefaultErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        // TODO delete all this path in PRODUCTION
        path: "componentDesign",
        element: <ComponentDesign />
      },
      {
        path: "home",
        element: <HomePage />
      },
      {
        path: "createTemplate",
        element: <CreateTemplatePage />
      },
      {
        path: "selectTemplate",
        element: <SelectTemplatePage />
      },
      {
        path: "createExercise",
        element: <CreateExercisePage />
      },
      {
        path: "startWorkout/template/:templateId",
        element: <StartWorkoutPage />
      },
      {
        path: "runWorkout/:workoutId",
        element: <RunWorkoutPage />
      },
      {
        path: "generic-child",
        element: <GenericChild />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "products/:id",
        element: <SingleProductPage />
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    {/* Wrapper for redux's store configuration */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* Wrapper for stripe process payment configuration. It will allow to access the elements through useElements hook */}
        {/* TODO Uncomment for stripe integration */}
        {/* <Elements stripe={stripePromise}> */}
        <RouterProvider router={router} />
        {/* TODO Uncomment for stripe integration */}
        {/* </Elements> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
