import React, { use } from "react";
import {
  screen,
  waitFor,
  cleanup,
  act,
  fireEvent,
} from "@testing-library/react";

import { renderWithProviders } from "../../utils/testUtils";
import { setupStore } from "../../app/store";

import RegisterPage from "./RegisterPage";
import { LoginObserverProvider } from "../../LoginObserverContext";
import {
  logoutUser,
} from "../../features/user/userSlice";

import { userRegistrationData } from "../routeTestingUtils";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// TODO TESTEAR ESTA PÁGINA CUANDO ESTÉN TODAS YA HECHAS

describe('RegisterPage', () => {
  describe('User is NOT logged in', () => {
    let store;

    beforeEach(async () => {
      // Jest and/or React Testing Library cleanup the component after EACH test
      // so we need to use the beforEach hook to render the component again
      store = setupStore().store;
      await store.dispatch(logoutUser());


      renderWithProviders(
        <LoginObserverProvider>
          <RegisterPage />
        </LoginObserverProvider>,
        {
          routes: ['/register'],
          store,
        });

    });

    afterAll(() => {
      cleanup();
    });

    it('Registers user', async () => {
      const usernameInput = screen.getByTestId(/username/i);
      const emailInput = screen.getByTestId(/email/i);
      const passwordInput = screen.getByTestId(/password/i);
      const termsCheckbox = screen.getByTestId(/terms/i);
      const submitButton = screen.getByTestId('register-button');

      fireEvent.change(usernameInput, { target: { value: userRegistrationData.username } });
      fireEvent.change(emailInput, { target: { value: userRegistrationData.email } });
      fireEvent.change(passwordInput, { target: { value: userRegistrationData.password } });
      fireEvent.click(termsCheckbox);
      await act(() => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        const navigateCalls = mockNavigate.mock.calls;
        const navigateToHome = navigateCalls.some(call => call[0] === '/app/home');
        const userAlreadyExists = store.getState().user.error.message === 'Email already in use';

        expect(navigateToHome || userAlreadyExists).toBe(true);
      });
    });
  })
})