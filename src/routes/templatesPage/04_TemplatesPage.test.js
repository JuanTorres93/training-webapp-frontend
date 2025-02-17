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
  newTemplateData,
} from "../routeTestingUtils";

const SEARCHBAR_TEST_ID = 'search-bar-templates';
const BUTTON_NEW_TEST_ID = 'button-new-template';
const NAME_INPUT_TEST_ID = 'new-template-name';
const DESCRIPTION_INPUT_TEST_ID = 'new-template-description';
const CREATE_TEMPLATE_BUTTON_TEST_ID = 'create-template-button';
const COMMON_EXERCISE_NAME = 'military';
const DELETE_TEMPLATE_BUTTON_TEST_ID = 'delete-template';
const EDIT_TEMPLATE_BUTTON_TEST_ID = 'edit-template';
const EDIT_NAME_INPUT_TEST_ID = 'name';
const EDIT_DESCRIPTION_INPUT_TEST_ID = 'description';
const ACCEPT_POPUP_EDIT_TEST_ID = 'accept-popup';
const ACCEPT_DELETE_TEST_ID = 'accept-option';
const LAUNCH_TEMPLATE_TEST_ID = 'launch-template';

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock functions for login
const mockCreateNewTemplateAction = jest.fn((arg) => arg);


describe('04_TemplatesPage', () => {
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

    it('filters templates', async () => {
      await waitFor(() => {
        const searchBar = screen.getByTestId(SEARCHBAR_TEST_ID);
        fireEvent.change(searchBar, { target: { value: 'eg' } });
      });

      // expect leg day to be shown
      await waitFor(() => {
        const legDay = screen.getAllByText(/leg day/i);

        expect(legDay.length).toBeGreaterThan(0);
      });

      // expect push day to NOT be shown
      await waitFor(() => {
        const pushDay = screen.queryAllByText(/push day/i);

        expect(pushDay.length).toEqual(0);
      });
    });

    it('creates new template', async () => {
      await waitFor(() => {
        expect(store.getState().exercises.isLoading.length).toEqual(0);
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
        expect(store.getState().workout.isLoading.length).toEqual(0);
      });

      await waitFor(() => {
        const buttonNew = screen.getByTestId(BUTTON_NEW_TEST_ID);
        fireEvent.click(buttonNew);
      });

      await act(async () => {
        const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
        await fireEvent.change(nameInput, { target: { value: newTemplateData.name } });

        const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
        await fireEvent.change(descriptionInput, { target: { value: newTemplateData.description } });

        const exerciseToSelect = screen.getAllByText(new RegExp(COMMON_EXERCISE_NAME, 'i'));
        await fireEvent.click(exerciseToSelect[0]);
      });

      const createButton = screen.getByTestId(CREATE_TEMPLATE_BUTTON_TEST_ID);
      await act(async () => {
        fireEvent.click(createButton);
      });

      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
      });

      await waitFor(() => {
        const newTemplate = screen.getAllByText(new RegExp(newTemplateData.name, 'i'));

        expect(newTemplate.length).toBeGreaterThan(0);
      });
    });

    it('deletes template', async () => {
      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
      });
      // IMPORTANT This test assumes that the previous test has passed
      const deleteButtons = screen.getAllByTestId(DELETE_TEMPLATE_BUTTON_TEST_ID);

      // filter the delete button that is not disabled
      const deleteButton = deleteButtons.find(button => !button
        .classList
        .contains('template-presenter__icon-box--disabled'));

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
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
        expect(store.getState().workout.isLoading.length).toEqual(0);
      });


      await waitFor(() => {
        const newTemplate = screen.queryByText(newTemplateData.name);
        expect(newTemplate).toBeNull();
      });

      await waitFor(() => {
        const newTemplate = screen.queryByText(newExerciseData.description);
        expect(newTemplate).toBeNull();
      });
    });

    it('creates template with no description', async () => {
      // IMPORTANT The template created here is then used to test edits
      // after editing then it is removed
      await waitFor(() => {
        const buttonNew = screen.getByTestId(BUTTON_NEW_TEST_ID);
        fireEvent.click(buttonNew);
      });

      await act(async () => {
        const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
        await fireEvent.change(nameInput, { target: { value: newTemplateData.name } });

        const exerciseToSelect = screen.getAllByText(new RegExp(COMMON_EXERCISE_NAME, 'i'));
        await fireEvent.click(exerciseToSelect[0]);
      });

      const createButton = screen.getByTestId(CREATE_TEMPLATE_BUTTON_TEST_ID);
      await act(async () => {
        fireEvent.click(createButton);
      });

      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
      });

      await waitFor(() => {
        const newTemplate = screen.getAllByText(new RegExp(newTemplateData.name, 'i'));

        expect(newTemplate.length).toBeGreaterThan(0);
      });
    });

    it('edits template description', async () => {
      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
      });

      // IMPORTANT This test assumes that the previous test has passed
      const editButtons = screen.getAllByTestId(EDIT_TEMPLATE_BUTTON_TEST_ID);

      // filter the edit button that is not disabled
      const editButton = editButtons.find(button => !button
        .classList
        .contains('template-presenter__icon-box--disabled'));

      // Shows the edit popup
      await act(async () => {
        await fireEvent.click(editButton);
      });

      const descriptionInput = screen.getByTestId(EDIT_DESCRIPTION_INPUT_TEST_ID);
      await act(async () => {
        fireEvent.change(descriptionInput, { target: { value: 'newDescription' } });
      });

      const acceptEditButton = screen.getByTestId(ACCEPT_POPUP_EDIT_TEST_ID);
      await act(async () => {
        fireEvent.click(acceptEditButton);
      });

      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
      });

      await waitFor(() => {
        const newTemplate = screen.getAllByText(/newDescription/i);

        expect(newTemplate.length).toBeGreaterThan(0);
      });
    });

    it('edits template name', async () => {
      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
      });

      // IMPORTANT This test assumes that the previous test has passed
      const editButtons = screen.getAllByTestId(EDIT_TEMPLATE_BUTTON_TEST_ID);

      // filter the edit button that is not disabled
      const editButton = editButtons.find(button => !button
        .classList
        .contains('template-presenter__icon-box--disabled'));

      // Shows the edit popup
      await act(async () => {
        await fireEvent.click(editButton);
      });

      const nameInput = screen.getByTestId(EDIT_NAME_INPUT_TEST_ID);
      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'newName' } });
      });

      const acceptEditButton = screen.getByTestId(ACCEPT_POPUP_EDIT_TEST_ID);
      await act(async () => {
        fireEvent.click(acceptEditButton);
      });

      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
      });

      await waitFor(() => {
        const newTemplate = screen.getAllByText(/newName/i);

        expect(newTemplate.length).toBeGreaterThan(0);
      });
    });

    it('launches user template', async () => {
      // THIS TESTS LAUNCHES THE TEMPLATE CREATED IN NO DESCRIPTION TEST
      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
        expect(store.getState().workout.isLoading.length).toEqual(0);
      });

      // GET LAUNCH BUTTON FOR THE 'newName' TEMPLATE (Created in no description test)
      const launchButtons = screen.getAllByTestId(LAUNCH_TEMPLATE_TEST_ID);

      const launchButton = launchButtons.filter(button => {
        // Parent element of the button
        const parentElement = button.parentElement;
        // Template presenter component
        const templatePresenter = parentElement.parentElement;

        // Select element with class template_presenter__name
        const templateNameContainer = templatePresenter.querySelector('.template-presenter__name');
        // get the text content of the element
        const templateName = templateNameContainer.textContent;

        return templateName === 'newName';
      })[0];


      await act(async () => {
        await fireEvent.click(launchButton);
      });

      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
        expect(store.getState().workout.isLoading.length).toEqual(0);
      });

      await waitFor(() => {
        // get calls to mockNavigate
        const calls = mockNavigate.mock.calls;
        // expect call to match (/app/runWorkout/${templateId}/${workout.id})
        expect(calls[0][0]).toMatch(/\/app\/runWorkout\/.*/);
      });

      // DELETE THE TEMPLATE
      const deleteButtons = screen.getAllByTestId(DELETE_TEMPLATE_BUTTON_TEST_ID);

      // filter the delete button that is not disabled
      const deleteButton = deleteButtons.find(button => !button
        .classList
        .contains('template-presenter__icon-box--disabled'));

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
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
        expect(store.getState().workout.isLoading.length).toEqual(0);
      });

      await waitFor(() => {
        const newTemplate = screen.queryByText(/newName/i);
        expect(newTemplate).toBeNull();
      });
    });

    it('launches common template', async () => {
      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
        expect(store.getState().workout.isLoading.length).toEqual(0);
      });

      // IMPORTANT This test assumes that the previous test has passed
      const launchButtons = screen.getAllByTestId(LAUNCH_TEMPLATE_TEST_ID);

      // filter the launch button that is not disabled
      const launchButton = launchButtons[0];

      await act(async () => {
        await fireEvent.click(launchButton);
      });

      await waitFor(() => {
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
        expect(store.getState().workout.isLoading.length).toEqual(0);
      });

      await waitFor(() => {
        // get calls to mockNavigate
        const calls = mockNavigate.mock.calls;
        // expect call to match (/app/runWorkout/${templateId}/${workout.id})
        expect(calls[0][0]).toMatch(/\/app\/runWorkout\/.*/);
      });
    });

  })

  describe('Unhappy path', () => {
    // USES MOCK FUNCTIONS
    beforeEach(async () => {
      // Jest and/or React Testing Library cleanup the component after EACH test
      // so we need to use the beforEach hook to render the component again
      mockNavigate.mockClear();
      mockCreateNewTemplateAction.mockClear();

      // Mount RegisterPage with mock functions to test the dispatch and register action
      // so it does not depend on error msg text
      renderWithProviders(
        <LoginObserverProvider>
          <TemplatesPage
            mockCreateWorkoutTemplate={mockCreateNewTemplateAction}
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

    it('does NOT create template if no name is provided', async () => {
      await waitFor(() => {
        const buttonNew = screen.getByTestId(BUTTON_NEW_TEST_ID);
        fireEvent.click(buttonNew);
      });

      // Select exercise
      await act(async () => {
        const exerciseToSelect = screen.getAllByText(new RegExp(COMMON_EXERCISE_NAME, 'i'));
        await fireEvent.click(exerciseToSelect[0]);
      });

      const createButton = screen.getByTestId(CREATE_TEMPLATE_BUTTON_TEST_ID);
      await act(async () => {
        fireEvent.click(createButton);
      });

      expect(mockCreateNewTemplateAction).not.toHaveBeenCalled();
    });

    it('does NOT create template if no exercise is selected', async () => {
      await waitFor(() => {
        const buttonNew = screen.getByTestId(BUTTON_NEW_TEST_ID);
        fireEvent.click(buttonNew);
      });

      await act(async () => {
        const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
        await fireEvent.change(nameInput, { target: { value: newTemplateData.name } });
      });

      const createButton = screen.getByTestId(CREATE_TEMPLATE_BUTTON_TEST_ID);
      await act(async () => {
        fireEvent.click(createButton);
      });

      expect(mockCreateNewTemplateAction).not.toHaveBeenCalled();
    });
  })
})