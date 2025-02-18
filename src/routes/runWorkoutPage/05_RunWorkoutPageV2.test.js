import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  screen,
  waitFor,
  cleanup,
  act,
  fireEvent,
  within,
} from "@testing-library/react";

import { renderWithProviders } from "../../utils/testUtils";
import { setupStore } from "../../app/store";

import RunWorkoutPageV2 from "./RunWorkoutPageV2";
import { LoginObserverProvider } from "../../LoginObserverContext";
import {
  logoutUser,
  loginUser,
} from "../../features/user/userSlice";
import {
  createWorkout,
  setLastWorkout,
  setLastNWorkouts,
} from "../../features/workouts/workoutSlice";

import { handleStartWorkout } from "../../routes/utils";

import {
  userRegistrationData,
  newExerciseData,
  newTemplateData,
} from "../routeTestingUtils";

import { processCommonStringFromDb } from "../../i18n";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock functions for login
const mockCreateNewWorkoutAction = jest.fn((arg) => arg);


describe('05_RunWorkoutPage', () => {
  let store;
  let workoutId;
  let templateId;

  beforeAll(async () => {
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

      // Wait to finish loading
      await waitFor(() => {
        expect(store.getState().user.isLoading.length).toEqual(0);
        expect(store.getState().exercises.isLoading.length).toEqual(0);
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
      });

      // Start a new common workout
      // Needed to call as: 
      // handleStartWorkout(user)
      //                   (templateId)
      //                   (allTemplates)
      //                   (dispatch)
      //                   (createWorkoutAction)
      //                   (setLastWorkoutAction)
      //                   (setLastNWorkoutsAction)
      //                   (navigate)
      //                   (null); // null is for the event

      const user = store.getState().user.user;
      const userCreatedTemplates = store.getState().workoutTemplates.workoutTemplates.userCreatedTemplates;
      const commonTemplates = store.getState().workoutTemplates.workoutTemplates.commonTemplates;
      const allTemplates = [...userCreatedTemplates, ...commonTemplates];
      const dispatch = store.dispatch;
      const createWorkoutAction = createWorkout;
      const setLastWorkoutAction = setLastWorkout;
      const setLastNWorkoutsAction = setLastNWorkouts;
      const navigate = mockNavigate;

      templateId = commonTemplates[0].id;

      await act(async () => {
        handleStartWorkout(user)
          (templateId)
          (allTemplates)
          (dispatch)
          (createWorkoutAction)
          (setLastWorkoutAction)
          (setLastNWorkoutsAction)
          (navigate)
          (null);
      });

      await waitFor(() => {
        expect(store.getState().exercises.isLoading.length).toEqual(0);
        expect(store.getState().workoutTemplates.isLoading.length).toEqual(0);
        expect(store.getState().workout.isLoading.length).toEqual(0);
      });

      // Get the workoutId from the path
      const runWorkoutPath = mockNavigate.mock.calls[0][0];
      workoutId = runWorkoutPath.split('/')[runWorkoutPath.split('/').length - 1];
    });

    beforeEach(async () => {
      mockNavigate.mockClear();

      renderWithProviders(
        <LoginObserverProvider>
          {/* 
              Routes and Route are needed because I'm using useParams in
              the component to get the templateId.
          */}
          <Routes>
            <Route path="/app/runWorkout/:templateId/:workoutId" element={<RunWorkoutPageV2 />} />
          </Routes>
        </LoginObserverProvider>,
        {
          routes: [`/app/runWorkout/${templateId}/${workoutId}`],
          store,
        });
    });

    it('Shows all exercises in template', () => {
      const exercises = store.getState().workoutTemplates.workoutTemplates.commonTemplates.find(t => t.id === templateId).exercises;

      exercises.forEach(exercise => {
        const englishName = processCommonStringFromDb(exercise.name);
        expect(screen.getByText(englishName)).toBeInTheDocument();
      });
    })

    it('Shows all sets for each exercise', () => {
      const exercises = store.getState().workoutTemplates.workoutTemplates.commonTemplates.find(t => t.id === templateId).exercises;

      exercises.forEach(exercise => {
        // number of sets for the exercise
        const sets = exercise.sets;

        // Exercise name is stored as englishName%$spanishName, get englishName
        const englishName = processCommonStringFromDb(exercise.name);
        // Get element that contains the name and fin the parent element
        // in multiple stetps
        const nameElement = screen.getByText(englishName);
        const titleBoxElement = nameElement.parentElement;
        const exerciseCompleterElement = titleBoxElement.parentElement;

        // set is a number, map it from 1 to sets. All of them must appear
        for (let i = 1; i <= sets; i++) {
          // find the set element in the exerciseCompleterElement
          const setElement = within(exerciseCompleterElement).getByText(`${i}`);
          // check  that all set elements are in the correct container
          expect(setElement).toBeInTheDocument();
        }
      });
    });
  })

  //describe('Unhappy path', () => {
  //  // USES MOCK FUNCTIONS
  //  beforeEach(async () => {
  //    // Jest and/or React Testing Library cleanup the component after EACH test
  //    // so we need to use the beforEach hook to render the component again
  //    mockNavigate.mockClear();
  //    mockCreateNewWorkoutAction.mockClear();

  //    // Mount RegisterPage with mock functions to test the dispatch and register action
  //    // so it does not depend on error msg text
  //    renderWithProviders(
  //      <LoginObserverProvider>
  //        <RunWorkoutPageV2
  //          mockCreateWorkout={mockCreateNewWorkoutAction}
  //        />
  //      </LoginObserverProvider>,
  //      {
  //        // routes: ['/app/exercises'],
  //        store,
  //      });
  //  });

  //})
});