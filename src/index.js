// Application entry point
// Default create-react-app --template redux imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import reportWebVitals from './reportWebVitals';

// custom imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import { loadStripe } from "@stripe/stripe-js";
import { 
  Elements,   // Wrapper component to include stripe components for processing payments
 } from '@stripe/react-stripe-js';
import HomePage from './routes/homePage/HomePage';
import CreateTemplatePage from './routes/createTemplate/CreateTemplatePage';
import SelectTemplatePage from './routes/selectTemplate/SelectTemplatePage';
import GenericChild from './routes/GenericChild';
import DefaultErrorPage from './routes/DefaultErrorPage';
import Products from './routes/ProductsPage';
import SingleProductPage from './routes/SingleProductPage';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import CartPage from './routes/CartPage';
// Link css files
import './variables.css'
import './index.css'

// TODO DELETE IN PRODUCTION
import ComponentDesign from './routes/ComponentDesign';

const container = document.getElementById('root');
const root = createRoot(container);

// Stripe config
// TODO use an environment variable in real projects
// DOCS Stripe tutorial: https://www.youtube.com/watch?v=0Kd0LeAMGf4&ab_channel=FaztCode
const stripePromise = loadStripe("pk_test_51Ogm7BK8WU6l6aWStayNzNOetoI6qIZOp2YpjjwSBbwejqTwHMQ6wuVoldlnhEpeoj2McQvrEpU1yCi0G3HfHduf007gdbuqWa");

// Router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <DefaultErrorPage />,
    children: [
      { index: true, element: <p>Default element for "/"" path, since there are no nested route</p> },
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
      },{
        path: "cart",
        element: <CartPage />
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    {/* Wrapper for redux's store configuration */}
    <Provider store={setupStore({})}>
      {/* Wrapper for stripe process payment configuration. It will allow to access the elements through useElements hook */}
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
