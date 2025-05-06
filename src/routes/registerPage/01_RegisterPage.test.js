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

import RegisterPage from "./RegisterPage";
import { LoginObserverProvider } from "../../LoginObserverContext";
import { logoutUser, resetError } from "../../features/user/userSlice";

import { userRegistrationData } from "../routeTestingUtils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock functions for dispatch and register action
const mockDispatchFunction = jest.fn();
const mockRegisterAction = jest.fn((arg) => arg);

const _getUserInputs = () => {
  const usernameInput = screen.getByTestId(/username/i);
  const emailInput = screen.getByTestId(/email/i);
  const passwordInput = screen.getByTestId(/password/i);
  const termsCheckbox = screen.getByTestId(/terms/i);
  const submitButton = screen.getByTestId("register-button");

  return {
    usernameInput,
    emailInput,
    passwordInput,
    termsCheckbox,
    submitButton,
  };
};

describe("RegisterPage", () => {
  let store;

  beforeAll(async () => {
    // Jest and/or React Testing Library cleanup the component after EACH test
    // so we need to use the beforEach hook to render the component again
    store = setupStore().store;
    await store.dispatch(logoutUser());
  });

  afterAll(() => {
    cleanup();
  });

  describe("Happy path", () => {
    // USES CONNECTION TO DB
    beforeEach(async () => {
      renderWithProviders(
        <LoginObserverProvider>
          <RegisterPage />
        </LoginObserverProvider>,
        {
          routes: ["/register"],
          store,
        }
      );
    });

    afterEach(async () => {
      await act(async () => {
        // Clears redux state because weak password message is always the same
        await store.dispatch(resetError());
      });
    });

    afterAll(async () => {
      await store.dispatch(logoutUser());
    });

    it("Registers user", async () => {
      const {
        usernameInput,
        emailInput,
        passwordInput,
        termsCheckbox,
        submitButton,
      } = _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(emailInput, {
        target: { value: userRegistrationData.email },
      });
      fireEvent.change(passwordInput, {
        target: { value: userRegistrationData.password },
      });
      fireEvent.click(termsCheckbox);

      await act(() => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        const navigateCalls = mockNavigate.mock.calls;
        const navigateToHome = navigateCalls.some(
          (call) => call[0] === "/app/home"
        );
        // This is done due to the fact that it uses a DB in docker. When test first runs
        // it registers the user, but when it runs again it tries to register the same user
        const userAlreadyExists =
          store.getState().user.error.message === "Email already in use";

        expect(navigateToHome || userAlreadyExists).toBe(true);
      });

      await act(async () => {
        store.dispatch(logoutUser());

        // Wait 2 seconds for the logout to finish. Otherwise, the next test will fail because
        // the server is still processing the logout
        await new Promise((resolve) => setTimeout(resolve, 2000));
      });
    });

    it("Does NOT register user if EMAIL is already in use", async () => {
      const {
        usernameInput,
        emailInput,
        passwordInput,
        termsCheckbox,
        submitButton,
      } = _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username + "RANDOM-TEXT" },
      });
      fireEvent.change(emailInput, {
        target: { value: userRegistrationData.email },
      });
      fireEvent.change(passwordInput, {
        target: { value: userRegistrationData.password },
      });
      fireEvent.click(termsCheckbox);

      await act(async () => {
        await fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(store.getState().user.error.message).toBe(
          "Email already in use"
        );
      });
    });

    it("Does NOT register user if username is already in use", async () => {
      const {
        usernameInput,
        emailInput,
        passwordInput,
        termsCheckbox,
        submitButton,
      } = _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(emailInput, {
        target: { value: "thisISanEmailNotContainedinDB@gmail.com" },
      });
      fireEvent.change(passwordInput, {
        target: { value: userRegistrationData.password },
      });
      fireEvent.click(termsCheckbox);

      await act(() => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(store.getState().user.error.message).toBe(
          "Username already in use"
        );
      });
    });

    it("does NOT register user if weak PASSWORD (less than 8 chars)", async () => {
      const {
        usernameInput,
        emailInput,
        passwordInput,
        termsCheckbox,
        submitButton,
      } = _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(emailInput, {
        target: { value: userRegistrationData.email },
      });
      fireEvent.change(passwordInput, { target: { value: "weak" } });
      fireEvent.click(termsCheckbox);

      fireEvent.click(submitButton);

      await waitFor(() => {
        //expect(store.getState().user.error.message).toContain(
        //  "not strong enough"
        //);
        //expect(store.getState().user.error.message).toContain("8");
        //expect(store.getState().user.error.message).toContain("1");
        expect(screen.queryByText(/not strong enough/i)).toBeInTheDocument();
      });
    });

    it("does NOT register user if weak PASSWORD (no uppercase)", async () => {
      const {
        usernameInput,
        emailInput,
        passwordInput,
        termsCheckbox,
        submitButton,
      } = _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(emailInput, {
        target: { value: userRegistrationData.email },
      });
      fireEvent.change(passwordInput, { target: { value: "kjhlu1€kbhgg" } });
      fireEvent.click(termsCheckbox);

      fireEvent.click(submitButton);

      await waitFor(() => {
        //expect(store.getState().user.error.message).toContain(
        //  "not strong enough"
        //);
        //expect(store.getState().user.error.message).toContain("8");
        //expect(store.getState().user.error.message).toContain("1");
        expect(screen.queryByText(/not strong enough/i)).toBeInTheDocument();
      });
    });

    it("does NOT register user if weak PASSWORD (no lowercase)", async () => {
      const {
        usernameInput,
        emailInput,
        passwordInput,
        termsCheckbox,
        submitButton,
      } = _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(emailInput, {
        target: { value: userRegistrationData.email },
      });
      fireEvent.change(passwordInput, { target: { value: "KJHLU1€KBHGG" } });
      fireEvent.click(termsCheckbox);

      fireEvent.click(submitButton);

      await waitFor(() => {
        //expect(store.getState().user.error.message).toContain(
        //  "not strong enough"
        //);
        //expect(store.getState().user.error.message).toContain("8");
        //expect(store.getState().user.error.message).toContain("1");
        expect(screen.queryByText(/not strong enough/i)).toBeInTheDocument();
      });
    });

    it("does NOT register user if weak PASSWORD (no number)", async () => {
      const {
        usernameInput,
        emailInput,
        passwordInput,
        termsCheckbox,
        submitButton,
      } = _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(emailInput, {
        target: { value: userRegistrationData.email },
      });
      fireEvent.change(passwordInput, { target: { value: "KJHLUu€KBHGG" } });
      fireEvent.click(termsCheckbox);

      fireEvent.click(submitButton);

      await waitFor(() => {
        //expect(store.getState().user.error.message).toContain(
        //  "not strong enough"
        //);
        //expect(store.getState().user.error.message).toContain("8");
        //expect(store.getState().user.error.message).toContain("1");
        expect(screen.queryByText(/not strong enough/i)).toBeInTheDocument();
      });
    });

    it("does NOT register user if weak PASSWORD (no special character)", async () => {
      const {
        usernameInput,
        emailInput,
        passwordInput,
        termsCheckbox,
        submitButton,
      } = _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(emailInput, {
        target: { value: userRegistrationData.email },
      });
      fireEvent.change(passwordInput, { target: { value: "KJHLU1KBHGGu" } });
      fireEvent.click(termsCheckbox);

      fireEvent.click(submitButton);

      await waitFor(() => {
        //expect(store.getState().user.error.message).toContain(
        //  "not strong enough"
        //);
        //expect(store.getState().user.error.message).toContain("8");
        //expect(store.getState().user.error.message).toContain("1");
        expect(screen.queryByText(/not strong enough/i)).toBeInTheDocument();
      });
    });
  });

  describe("Unhappy path", () => {
    // USES MOCK FUNCTIONS
    beforeEach(async () => {
      // Jest and/or React Testing Library cleanup the component after EACH test
      // so we need to use the beforEach hook to render the component again
      store = setupStore().store;
      await store.dispatch(logoutUser());

      // Mount RegisterPage with mock functions to test the dispatch and register action
      // so it does not depend on error msg text
      renderWithProviders(
        <LoginObserverProvider>
          <RegisterPage
            mockDispatchFunction={mockDispatchFunction}
            mockRegisterAction={mockRegisterAction}
          />
        </LoginObserverProvider>,
        {
          routes: ["/register"],
          store,
        }
      );
    });

    it("does NOT register user if EMAIL is missing", async () => {
      const { usernameInput, passwordInput, termsCheckbox, submitButton } =
        _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(passwordInput, {
        target: { value: userRegistrationData.password },
      });
      fireEvent.click(termsCheckbox);

      fireEvent.click(submitButton);

      waitFor(() => {
        expect(mockRegisterAction).not.toHaveBeenCalled();
        expect(mockDispatchFunction).not.toHaveBeenCalled();
      });
    });

    it("does NOT register user if PASSWORD is missing", async () => {
      const { usernameInput, emailInput, termsCheckbox, submitButton } =
        _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(emailInput, {
        target: { value: userRegistrationData.email },
      });
      fireEvent.click(termsCheckbox);

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockRegisterAction).not.toHaveBeenCalled();
        expect(mockDispatchFunction).not.toHaveBeenCalled();
      });
    });

    it("does NOT register user if USERNAME is missing", async () => {
      const { emailInput, passwordInput, termsCheckbox, submitButton } =
        _getUserInputs();

      fireEvent.change(emailInput, {
        target: { value: userRegistrationData.email },
      });
      fireEvent.change(passwordInput, {
        target: { value: userRegistrationData.password },
      });
      fireEvent.click(termsCheckbox);

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockRegisterAction).not.toHaveBeenCalled();
        expect(mockDispatchFunction).not.toHaveBeenCalled();
      });
    });

    it("does NOT register user if TERMS are NOT accepted", async () => {
      const { usernameInput, emailInput, passwordInput, submitButton } =
        _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(emailInput, {
        target: { value: userRegistrationData.email },
      });
      fireEvent.change(passwordInput, {
        target: { value: userRegistrationData.password },
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockRegisterAction).not.toHaveBeenCalled();
        expect(mockDispatchFunction).not.toHaveBeenCalled();
      });
    });

    it("does NOT register user if email is not valid", async () => {
      const {
        usernameInput,
        emailInput,
        passwordInput,
        termsCheckbox,
        submitButton,
      } = _getUserInputs();

      fireEvent.change(usernameInput, {
        target: { value: userRegistrationData.username },
      });
      fireEvent.change(emailInput, { target: { value: "notAnEmail" } });
      fireEvent.change(passwordInput, {
        target: { value: userRegistrationData.password },
      });
      fireEvent.click(termsCheckbox);

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockRegisterAction).not.toHaveBeenCalled();
        expect(mockDispatchFunction).not.toHaveBeenCalled();
      });
    });
  });
});
