import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createWorkout as createWorkoutInDb,
    getLastWorkoutFromTemplate,
    addExerciseToWorkout as addExerciseToWorkoutInDb,
    getLastNWorkoutsFromTemplate,
    addFinishDateToWorkout,
    deleteWorkout as deleteWorkoutInDb,
    deleteExerciseFromWorkout as deleteExerciseFromWorkoutInDb,
} from "../../serverAPI/workouts";

import { getUserRecentWorkouts } from "../workoutsTemplates/workoutTemplatesSlice";

export const sliceName = 'workout';
const LOADING_FLAG = true;

export const createWorkout = createAsyncThunk(
    `${sliceName}/createWorkout`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties templateId and description
        // Error is handled from redux state when promise is rejected
        const response = await createWorkoutInDb(arg);

        return response;
    }
);

export const deleteWorkout = createAsyncThunk(
    `${sliceName}/deleteWorkout`,
    async (arg, thunkAPI) => {
        // arg is an object with the property workoutId
        const response = await deleteWorkoutInDb(arg);

        return response;
    }
);

export const deleteExerciseFromWorkout = createAsyncThunk(
    `${sliceName}/deleteExerciseFromWorkout`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties workoutId and exerciseId
        const response = await deleteExerciseFromWorkoutInDb(arg);

        const workoutAndExercises = {
            workoutId: arg.workoutId,
            exercises: response,
        };

        return workoutAndExercises;
    }
);

export const setLastWorkout = createAsyncThunk(
    `${sliceName}/setLastWorkout`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties templateId and userId
        // Error is handled from redux state when promise is rejected
        const response = await getLastWorkoutFromTemplate(arg);

        return response;
    }
);

export const setLastNWorkouts = createAsyncThunk(
    `${sliceName}/setLastNWorkouts`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties templateId, userId and numberOfWorkouts
        // Error is handled from redux state when promise is rejected
        const response = await getLastNWorkoutsFromTemplate(arg);

        return response;
    }
);

export const finishWorkout = createAsyncThunk(
    `${sliceName}/finishWorkout`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected

        // select the active workout from the state
        const activeWorkout = thunkAPI.getState()[sliceName][sliceName].activeWorkout;

        // For each exercise in activeWorkout, add it to the workout
        const promises = []
        activeWorkout.exercises.forEach((exercise) => {
            const { id: exerciseId, sets } = exercise;

            sets.forEach(async (set) => {
                const { setNumber, weight, reps } = set;

                promises.push(addExerciseToWorkoutInDb({
                    workoutId: activeWorkout.id,
                    exerciseId,
                    exerciseSet: setNumber,
                    reps,
                    weight,
                }));
            });
        });

        // Update finish date
        promises.push(addFinishDateToWorkout({ workoutId: activeWorkout.id }));

        try {
            await Promise.all(promises);
            // Select current user id
            const userId = thunkAPI.getState().user.user.id;

            // Update recent workouts
            thunkAPI.dispatch(getUserRecentWorkouts({
                userId
            }));

            return true;
        } catch (error) {
            return false;
        }
    }
);

const slice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {
            activeWorkout: {}, // Its exercises property contain the values for each set.
            lastWorkout: {},   // For showing last values
            lastNWorkouts: [], // For showing progress
        },
        isLoading: [],
        hasError: false,
    },
    reducers: {
        updateActiveWorkoutExercise: (state, action) => {
            // action.payload is an object with the properties exerciseId, exerciseOrder, setNumber, weight and reps
            // Check if exercise exists in activeWorkout. If it does, update it. If it doesn't, add it.
            // An exercise is defined by its id and order
            const { exerciseId, exerciseOrder, setNumber, weight, reps } = action.payload;
            const { activeWorkout } = state[sliceName];

            if (activeWorkout.exercises.length === 0) {
                // If there are no exercises, create the first one
                activeWorkout.exercises = [{
                    id: exerciseId,
                    order: exerciseOrder,
                    sets: [{ setNumber, weight, reps }],
                }];
            } else {
                // If there are exercises, check if the exercise exists
                const exerciseIndex = activeWorkout.exercises.findIndex((exercise) => (
                    exercise.id === exerciseId && exercise.order === exerciseOrder
                ));

                if (exerciseIndex === -1) {
                    // If the exercise does not exist, create it
                    activeWorkout.exercises.push({
                        id: exerciseId,
                        order: exerciseOrder,
                        sets: [{ setNumber, weight, reps }],
                    });
                } else {
                    // If the exercise exists, update it
                    const exercise = activeWorkout.exercises[exerciseIndex];
                    const setIndex = exercise.sets.findIndex((set) => set.setNumber === setNumber);

                    if (setIndex === -1) {
                        // If the set does not exist, create it
                        exercise.sets.push({ setNumber, weight, reps });
                    } else {
                        // If the set exists, update it
                        exercise.sets[setIndex] = { setNumber, weight, reps };
                    }
                }
            }
        },

        clearLastWorkout: (state) => {
            state[sliceName].lastWorkout = null;
        }
    },
    extraReducers: builder => {
        // Create workout template
        builder.addCase(createWorkout.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(createWorkout.fulfilled, (state, action) => {
            state[sliceName].activeWorkout = action.payload;
            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(createWorkout.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Delete workout
        builder.addCase(deleteWorkout.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(deleteWorkout.fulfilled, (state, action) => {
            // remove workout from lastNWorkouts
            const workoutId = action.payload;
            state[sliceName].lastNWorkouts = state[sliceName].lastNWorkouts.filter(workout => workout.id !== workoutId);

            // if lastWorkout is the deleted workout, clear it
            if (state[sliceName].lastWorkout && state[sliceName].lastWorkout.id === workoutId) {
                state[sliceName].lastWorkout = null;
            }

            // Same for activeWorkout
            if (state[sliceName].activeWorkout && state[sliceName].activeWorkout.id === workoutId) {
                state[sliceName].activeWorkout = null;
            }

            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(deleteWorkout.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Delete exercise from workout
        builder.addCase(deleteExerciseFromWorkout.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(deleteExerciseFromWorkout.fulfilled, (state, action) => {
            // exercises is a list of objects with the properties 
            // exerciseId, exerciseSet, reps, weight and time_in_seconds
            const { workoutId, exercises } = action.payload;

            // Helper function to remove sets from exercises
            const removeExerciseFromWorkout = (exercises, exerciseIdToRemove) => {
                const exerciseIndex = exercises.findIndex(ex => ex.id === exerciseIdToRemove);
                if (exerciseIndex !== -1) {
                    exercises = exercises.filter(ex => ex.id !== exerciseIdToRemove);
                }

                return exercises;
            };

            // Iterate over exercises
            exercises.forEach(exercise => {
                // If activeWorkout is the workoutId, remove the exercise
                if (state[sliceName].activeWorkout && state[sliceName].activeWorkout.id === workoutId) {
                    state[sliceName].activeWorkout.exercises = removeExerciseFromWorkout(state[sliceName].activeWorkout.exercises, exercise.exerciseId);
                }

                // If workout exists in lastWorkout, remove the exercise
                if (state[sliceName].lastWorkout && state[sliceName].lastWorkout.id === workoutId) {
                    state[sliceName].lastWorkout.exercises = removeExerciseFromWorkout(state[sliceName].lastWorkout.exercises, exercise.exerciseId);
                }

                // If workout exists in lastNWorkouts, remove the exercise
                if (state[sliceName].lastNWorkouts) {
                    const workout = state[sliceName].lastNWorkouts.filter(workout => workout.id === workoutId);

                    if (workout.length > 0) {
                        workout[0].exercises = removeExerciseFromWorkout(workout[0].exercises, exercise.exerciseId);
                    }
                }

            });

            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(deleteExerciseFromWorkout.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Set last workout from template
        builder.addCase(setLastWorkout.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(setLastWorkout.fulfilled, (state, action) => {
            state[sliceName].lastWorkout = action.payload;
            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(setLastWorkout.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Set last N workouts from template
        builder.addCase(setLastNWorkouts.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(setLastNWorkouts.fulfilled, (state, action) => {
            state[sliceName].lastNWorkouts = action.payload;
            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(setLastNWorkouts.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Finish workout
        builder.addCase(finishWorkout.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(finishWorkout.fulfilled, (state, action) => {
            state[sliceName].activeWorkout = null;
            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(finishWorkout.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectActiveWorkout = state => state[sliceName][sliceName].activeWorkout;
export const selectWorkoutsLoading = state => state[sliceName].isLoading.length > 0;
export const selectWorkoutsError = state => state[sliceName].hasError;

export const selectLastWorkout = state => state[sliceName][sliceName].lastWorkout;
export const selectLastNWorkouts = state => state[sliceName][sliceName].lastNWorkouts;

// Export actions
export const {
    updateActiveWorkoutExercise,
    clearLastWorkout,
} = slice.actions;

// Export reducer
export default slice.reducer;
