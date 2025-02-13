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

import TemplatesPage from "./TemplatesPage";
import { LoginObserverProvider } from "../../LoginObserverContext";
import {
  logoutUser,
  loginUser,
  resetError,
} from "../../features/user/userSlice";

import {
  userRegistrationData,
  newExerciseData,
} from "../routeTestingUtils";

const SEARCHBAR_TEST_ID = 'search-bar-templates';
const BUTTON_NEW_TEST_ID = 'button-new-template';

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock functions for login
const mockDispatch = jest.fn();
const mockLoginAction = jest.fn((arg) => arg);


describe('TemplatesPage', () => {
  let store;

  beforeAll(async () => {
    // Jest and/or React Testing Library cleanup the component after EACH test
    // so we need to use the beforEach hook to render the component again
    store = setupStore().store;
    await act(async () => {
      await store.dispatch(logoutUser());
    });
  });

  afterAll(async () => {
    cleanup();

    await store.dispatch(logoutUser());
    // wait 2 seconds for the logout to complete
    await new Promise((r) => setTimeout(r, 2000));
  });

  describe('Happy path', () => {
    // USES CONNECTION TO DB
    beforeAll(async () => {
      await act(async () => {
        await store.dispatch(loginUser(userRegistrationData));
      });

      // Give it time to load the common exercises
      await waitFor(() => {
        expect(store.getState().exercises.isLoading.length).toEqual(0);
      });
    });

    beforeEach(async () => {
      mockNavigate.mockClear();

      renderWithProviders(
        <LoginObserverProvider>
          <TemplatesPage />
        </LoginObserverProvider>,
        {
          routes: ['/app/exercises'],
          store,
        });
    });

    it('shows common templates', async () => {
      await waitFor(() => {
        // I'm testing just one exercise.
        // I'm assuming that if one exercise is shown, all of them are shown
        const pullDay = screen.getAllByText(/pull day/i);

        expect(pullDay.length).toBeGreaterThan(0);
      });
    });
  })

  describe('Unhappy path', () => {
    // USES MOCK FUNCTIONS
    beforeEach(async () => {
      // Jest and/or React Testing Library cleanup the component after EACH test
      // so we need to use the beforEach hook to render the component again

      // Mount RegisterPage with mock functions to test the dispatch and register action
      // so it does not depend on error msg text
      renderWithProviders(
        <LoginObserverProvider>
          <TemplatesPage
          // mockLoginAction={mockLoginAction}
          />
        </LoginObserverProvider>,
        {
          routes: ['/app/exercises'],
          store,
        });
    });

    it('shows only if user is logged in', async () => {
      await act(async () => {
        await store.dispatch(logoutUser());
      });

      expect(mockNavigate).toHaveBeenLastCalledWith('/login');
    });
  })
})