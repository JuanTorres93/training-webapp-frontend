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

import ExercisesPage from "./ExercisesPage";
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

const SEARCHBAR_TEST_ID = 'search-bar';
const BUTTON_NEW_TEST_ID = 'button-new';
const EXERCISE_NAME_INPUT_TEST_ID = 'name';
const EXERCISE_DESCRIPTION_INPUT_TEST_ID = 'description';
const CLOSE_POPUP_TEST_ID = 'close-popup';
const ACCEPT_POPUP_TEST_ID = 'accept-popup';
const DELETE_EXERCISE_TEST_ID = 'delete-exercise';
const EDIT_EXERCISE_TEST_ID = 'edit-exercise';
const ACCEPT_DELETE_TEST_ID = 'accept-option';

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock functions for login
const mockDispatch = jest.fn();
const mockLoginAction = jest.fn((arg) => arg);


describe('ExercisesPage', () => {
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
          <ExercisesPage />
        </LoginObserverProvider>,
        {
          routes: ['/app/exercises'],
          store,
        });
    });

    it('shows common exercises', async () => {
      await waitFor(() => {
        // I'm testing just one exercise.
        // I'm assuming that if one exercise is shown, all of them are shown
        const biceps = screen.getAllByText(/bicep/i);

        expect(biceps.length).toBeGreaterThan(0);
      });
    });

    it('searches for exercises', async () => {
      const searchBar = screen.getByTestId(SEARCHBAR_TEST_ID);

      fireEvent.change(searchBar, { target: { value: 'us' } });

      // Do not show bicep curl
      await waitFor(() => {
        const biceps = screen.queryByText(/bicep/i);
        expect(biceps).toBeNull();
      });

      // Show push up
      await waitFor(() => {
        const pushUps = screen.queryAllByText(/push\s*up/i);
        expect(pushUps.length).toBeGreaterThan(0);
      });
    });

    it('creates a new exercise', async () => {
      const buttonNew = screen.getByTestId(BUTTON_NEW_TEST_ID);

      await act(async () => {
        await fireEvent.click(buttonNew);
      });

      const nameInput = screen.getByTestId(EXERCISE_NAME_INPUT_TEST_ID);
      const descriptionInput = screen.getByTestId(EXERCISE_DESCRIPTION_INPUT_TEST_ID);
      const acceptButton = screen.getByTestId(ACCEPT_POPUP_TEST_ID);

      fireEvent.change(nameInput, { target: { value: newExerciseData.name } });
      fireEvent.change(descriptionInput, { target: { value: newExerciseData.description } });

      await act(async () => {
        await fireEvent.click(acceptButton);
      });

      await waitFor(() => {
        const newExercise = screen.getByText(newExerciseData.name);
        expect(newExercise).toBeInTheDocument();
      });

      await waitFor(() => {
        const newExercise = screen.getByText(newExerciseData.description);
        expect(newExercise).toBeInTheDocument();
      });
    });

    it('deletes an exercise', async () => {
      // Will delete the exercise created in the previous test
      const deleteButtons = screen.getAllByTestId(DELETE_EXERCISE_TEST_ID);

      // filter the delete button that is not disabled
      const deleteButton = deleteButtons.find(button => !button
        .classList
        .contains('exercise-presenter__icon-box--disabled'));

      // Shows the delete popup
      await act(async () => {
        await fireEvent.click(deleteButton);
      });

      const acceptButton = screen.getByTestId(ACCEPT_DELETE_TEST_ID);

      // Accepts the deletion
      await act(async () => {
        await fireEvent.click(acceptButton);
      });

      await waitFor(() => {
        const newExercise = screen.queryByText(newExerciseData.name);
        expect(newExercise).toBeNull();
      });

      await waitFor(() => {
        const newExercise = screen.queryByText(newExerciseData.description);
        expect(newExercise).toBeNull();
      });
    });

    it('creates exercise with empty description', async () => {
      const buttonNew = screen.getByTestId(BUTTON_NEW_TEST_ID);

      await act(async () => {
        await fireEvent.click(buttonNew);
      });

      const nameInput = screen.getByTestId(EXERCISE_NAME_INPUT_TEST_ID);
      const acceptButton = screen.getByTestId(ACCEPT_POPUP_TEST_ID);

      fireEvent.change(nameInput, { target: { value: newExerciseData.name } });

      await act(async () => {
        await fireEvent.click(acceptButton);
      });

      await waitFor(() => {
        const newExercise = screen.getByText(newExerciseData.name);
        expect(newExercise).toBeInTheDocument();
      });

      await waitFor(() => {
        const newExercise = screen.queryByText(newExerciseData.description);
        expect(newExercise).toBeNull();
      });
    });

    // Theses edits are done in the exercise created in the previous test
    // In the last edit then the exercise is deleted
    it('edits exercise description', async () => {
      const editButtons = screen.getAllByTestId(EDIT_EXERCISE_TEST_ID);

      // filter the edit button that is not disabled
      const editButton = editButtons.find(button => !button
        .classList
        .contains('exercise-presenter__icon-box--disabled'));

      // Shows the edit popup
      await act(async () => {
        await fireEvent.click(editButton);
      });

      const descriptionInput = screen.getByTestId(EXERCISE_DESCRIPTION_INPUT_TEST_ID);
      const acceptButton = screen.getByTestId(ACCEPT_POPUP_TEST_ID);

      fireEvent.change(descriptionInput, { target: { value: 'Edited description' } });

      // Accepts the edition
      await act(async () => {
        await fireEvent.click(acceptButton);
      });

      await waitFor(() => {
        const newExercise = screen.getByText('Edited description');
        expect(newExercise).toBeInTheDocument();
      });

    });

    it('edits exercise name', async () => {
      const editButtons = screen.getAllByTestId(EDIT_EXERCISE_TEST_ID);

      // filter the edit button that is not disabled
      const editButton = editButtons.find(button => !button
        .classList
        .contains('exercise-presenter__icon-box--disabled'));

      // Shows the edit popup
      await act(async () => {
        await fireEvent.click(editButton);
      });

      const nameInput = screen.getByTestId(EXERCISE_NAME_INPUT_TEST_ID);
      const acceptButton = screen.getByTestId(ACCEPT_POPUP_TEST_ID);

      fireEvent.change(nameInput, { target: { value: 'Edited name' } });

      // Accepts the edition
      await act(async () => {
        await fireEvent.click(acceptButton);
      });

      await waitFor(() => {
        const newExercise = screen.getByText('Edited name');
        expect(newExercise).toBeInTheDocument();
      });

      // DELETE EXERCISE FOR REPEATED TESTS
      const deleteButtons = screen.getAllByTestId(DELETE_EXERCISE_TEST_ID);

      // filter the delete button that is not disabled
      const deleteButton = deleteButtons.find(button => !button
        .classList
        .contains('exercise-presenter__icon-box--disabled'));

      // Shows the delete popup
      await act(async () => {
        await fireEvent.click(deleteButton);
      });

      const acceptDeleteButton = screen.getByTestId(ACCEPT_DELETE_TEST_ID);

      // Accepts the deletion
      await act(async () => {
        await fireEvent.click(acceptDeleteButton);
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
          <ExercisesPage
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

    it('does NOT create exercise with empty name', async () => {
      // login
      await act(async () => {
        await store.dispatch(loginUser(userRegistrationData));
      });

      // Give it time to load the user
      await waitFor(() => {
        expect(store.getState().user.isLoading.length).toEqual(0);
      });

      const buttonNew = screen.getByTestId(BUTTON_NEW_TEST_ID);

      await act(async () => {
        await fireEvent.click(buttonNew);
      });

      const descriptionInput = screen.getByTestId(EXERCISE_DESCRIPTION_INPUT_TEST_ID);
      const acceptButton = screen.getByTestId(ACCEPT_POPUP_TEST_ID);

      fireEvent.change(descriptionInput, { target: { value: 'should not appear' } });

      // wait for finish loading
      // I don't know why it should be here instead of after the click
      // But here it works and after the click it does not
      await waitFor(() => {
        expect(store.getState().exercises.isLoading.length).toEqual(0);
      });

      await act(async () => {
        await fireEvent.click(acceptButton);
      });

      await waitFor(() => {
        const newExercise = screen.queryByText('should not appear');
        expect(newExercise).toBeNull();
      });
    });
  })
})