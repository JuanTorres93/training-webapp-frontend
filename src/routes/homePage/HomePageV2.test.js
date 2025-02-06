import React from "react";
import { screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "../../utils/testUtils";
import { setupStore } from "../../app/store";

import HomePageV2 from "./HomePageV2";
import {
  registerUser,
  logoutUser,
  loginUser,
} from "../../features/user/userSlice";
import { userRegistrationData } from "../routeTestingUtils";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('HomePageV2', () => {
  describe('Recent workouts', () => {
    describe('User is NOT logged in', () => {
      let store;

      beforeAll(async () => {
        const root = document.createElement('div');
        root.setAttribute('id', 'root');
        document.body.appendChild(root);

        store = setupStore().store;
        await store.dispatch(logoutUser());

        try {
          await store.dispatch(registerUser(userRegistrationData));
        } catch (error) {
          console.log('User already registered');
        }

        renderWithProviders(<HomePageV2 />, {
          routes: ['/app/home', '/login'],
          store,
        });
      });

      it('redirects to login page', async () => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });

    })

    describe('User IS logged in', () => {
      let store;

      beforeAll(async () => {
        const root = document.createElement('div');
        root.setAttribute('id', 'root');
        document.body.appendChild(root);

        store = setupStore().store;
        await store.dispatch(loginUser({
          username: userRegistrationData.username,
          password: userRegistrationData.password,
        }));
        // TODO DELETE THESE DEBUG LOGS
        console.log('store.getState()');
        console.log(store.getState());

        renderWithProviders(<HomePageV2 />, {
          routes: ['/app/home', '/login'],
          store,
        });
      });

      it('Does NOT redirect to login page', async () => {
        expect(mockNavigate).not.toHaveBeenCalled();
      });

      it('Shows recent workouts section', async () => {
        expect(screen.getByTestId('recent-workouts-box')).toBeInTheDocument();
      });
    })

  })
})