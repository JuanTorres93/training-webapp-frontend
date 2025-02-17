import React from "react";
import {
  screen,
  waitFor,
  cleanup,
  act,
  fireEvent,
} from "@testing-library/react";

import { renderWithProviders } from "../../utils/testUtils";
import { setupStore } from "../../app/store";

import HomePageV2 from "./HomePageV2";
import {
  registerUser,
  logoutUser,
  loginUser,
} from "../../features/user/userSlice";
import { setRecentWorkoutsTestOnly } from "../../features/workoutsTemplates/workoutTemplatesSlice";

import { userRegistrationData, recentWorkouts } from "../routeTestingUtils";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// TODO TESTEAR ESTA PÁGINA CUANDO ESTÉN TODAS YA HECHAS

describe('HomePageV2', () => {
  describe('Recent workouts', () => {
    describe('User IS logged in', () => {
      let store;

      beforeAll(async () => {
        store = setupStore().store;

        await store.dispatch(registerUser(userRegistrationData));
        await store.dispatch(logoutUser());
        await store.dispatch(loginUser({
          username: userRegistrationData.username,
          password: userRegistrationData.password,
        }));
      });

      beforeEach(async () => {
        // Jest and/or React Testing Library cleanup the component after EACH test
        // so we need to use the beforEach hook to render the component again

        renderWithProviders(<HomePageV2 />, {
          routes: ['/app/home'],
          store,
        });
      });


      it('Does NOT redirect to login page', async () => {
        expect(mockNavigate).not.toHaveBeenCalled();
      });

      describe('Recent workouts section', () => {
        // BELOW store DOES NOT HAVE recentWorkouts
        it('Shows recent workouts section', async () => {
          await waitFor(() => {
            expect(screen.getByTestId('recent-workouts-box')).toBeInTheDocument();
          });
        });

        //it('Shows "No recent workouts" message when there aren\' any of them', async () => {
        //  await waitFor(() => {
        //    expect(screen.getByTestId('no-recent-workouts')).toBeInTheDocument();
        //  });
        //});
      });

      describe('Weight chart section', () => {
        it('Shows weight chart section', async () => {
          await waitFor(() => {
            expect(screen.getByTestId('weight-progress-box')).toBeInTheDocument();
          });
        });
      });

    })

    describe('User is NOT logged in', () => {
      let store;

      beforeEach(async () => {
        // Jest and/or React Testing Library cleanup the component after EACH test
        // so we need to use the beforEach hook to render the component again
        store = setupStore().store;
        await store.dispatch(logoutUser());


        renderWithProviders(<HomePageV2 />, {
          routes: ['/app/home', '/login'],
          store,
        });

      });

      afterAll(() => {
        cleanup();
      });

      it('redirects to login page', async () => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    })
  })
})