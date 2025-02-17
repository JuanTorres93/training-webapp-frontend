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

import LoginPage from "./LoginPage";
import { LoginObserverProvider } from "../../LoginObserverContext";
import {
  logoutUser,
  resetError,
} from "../../features/user/userSlice";

import { userRegistrationData } from "../routeTestingUtils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock functions for login
const mockDispatch = jest.fn();
const mockLoginAction = jest.fn((arg) => arg);

const _getUserInputs = () => {
  const emailInput = screen.getByTestId(/email/i);
  const passwordInput = screen.getByTestId(/password/i);
  const submitButton = screen.getByTestId('login-button');

  return {
    emailInput,
    passwordInput,
    submitButton,
  }
}

describe('LoginPage', () => {
  let store;

  beforeAll(async () => {
    // Jest and/or React Testing Library cleanup the component after EACH test
    // so we need to use the beforEach hook to render the component again
    store = setupStore().store;
    await store.dispatch(logoutUser());
  });

  afterAll(async () => {
    cleanup();

    await store.dispatch(logoutUser());
    // wait 2 seconds for the logout to complete
    await new Promise((r) => setTimeout(r, 2000));
  });

  describe('Happy path', () => {
    // USES CONNECTION TO DB
    beforeEach(async () => {
      await act(async () => {
        await store.dispatch(logoutUser());
      });

      // Clean calls to mockNavigate
      mockNavigate.mockClear();

      renderWithProviders(
        <LoginObserverProvider>
          <LoginPage />
        </LoginObserverProvider>,
        {
          routes: ['/login'],
          store,
        });
    });

    it('logs in user', async () => {
      const { emailInput, passwordInput, submitButton } = _getUserInputs();

      // NOTE: Right now the server uses the email as the username for login
      fireEvent.change(emailInput, { target: { value: userRegistrationData.username } });
      fireEvent.change(passwordInput, { target: { value: userRegistrationData.password } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(store.getState().user.user).not.toBeNull();
      });

      expect(mockNavigate).toHaveBeenCalledWith('/app/home');
    });

    it('does NOT log in user if the password is incorrect', async () => {
      const { emailInput, passwordInput, submitButton } = _getUserInputs();

      // NOTE: Right now the server uses the email as the username for login
      fireEvent.change(emailInput, { target: { value: userRegistrationData.username } });
      fireEvent.change(passwordInput, { target: { value: 'wrongStr0ng€Password' } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(store.getState().user.user).toBeNull();
      });

      expect(mockNavigate).not.toHaveBeenCalled();
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
          <LoginPage
            mockLoginAction={mockLoginAction}
          />
        </LoginObserverProvider>,
        {
          routes: ['/login'],
          store,
        });
    });

    it('Does not log in user if no email is introduced', async () => {
      const { passwordInput, submitButton } = _getUserInputs();

      fireEvent.change(passwordInput, { target: { value: userRegistrationData.password } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(mockLoginAction).not.toHaveBeenCalled();
      });
    });

    it('Does not log in user if no password is introduced', async () => {
      const { emailInput, submitButton } = _getUserInputs();

      fireEvent.change(emailInput, { target: { value: userRegistrationData.username } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(mockLoginAction).not.toHaveBeenCalled();
      });
    });
  })
})