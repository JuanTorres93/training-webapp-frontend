import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createWorkout as createWorkoutInDb,
    getLastWorkoutFromTemplate,
    addExerciseToWorkout as addExerciseToWorkoutInDb,
    getLastNWorkoutsFromTemplate,
} from "../../serverAPI/workouts";

export const sliceName = 'workout';

export const createWorkout = createAsyncThunk(
    `${sliceName}/createWorkout`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties alias and description
        // Error is handled from redux state when promise is rejected
        const response = await createWorkoutInDb(arg);

        return response;
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
            const { id: exerciseId, order: exerciseOrder, sets } = exercise;

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

        try {
            await Promise.all(promises);
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
            activeWorkout: null, // Its exercises property contain the values for each set.
            lastWorkout: null,   // For showing last values
            lastNWorkouts: null, // For showing progress
        },
        isLoading: false,
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
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(createWorkout.fulfilled, (state, action) => {
            state[sliceName].activeWorkout = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(createWorkout.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Set last workout from template
        builder.addCase(setLastWorkout.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(setLastWorkout.fulfilled, (state, action) => {
            state[sliceName].lastWorkout = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(setLastWorkout.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Set last N workouts from template
        builder.addCase(setLastNWorkouts.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(setLastNWorkouts.fulfilled, (state, action) => {
            state[sliceName].lastNWorkouts = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(setLastNWorkouts.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Finish workout
        builder.addCase(finishWorkout.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(finishWorkout.fulfilled, (state, action) => {
            state[sliceName].activeWorkout = null;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(finishWorkout.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectActiveWorkout = state => state[sliceName][sliceName].activeTemplate;
export const selectWorkoutsLoading = state => state[sliceName].isLoading;
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
