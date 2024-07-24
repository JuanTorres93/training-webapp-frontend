import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    createWorkout as createWorkoutInDb,
    getLastWorkoutFromTemplate,
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

const slice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {
            activeWorkout: null, // Its exercises property contain the values for each set.
            lastWorkout: null,
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
    },
});

// Export selectors
export const selectActiveWorkout = state => state[sliceName][sliceName].activeTemplate;
export const selectWorkoutsLoading = state => state[sliceName].isLoading;
export const selectWorkoutsError = state => state[sliceName].hasError;

export const selectLastWorkout = state => state[sliceName][sliceName].lastWorkout;

// Export actions
export const { updateActiveWorkoutExercise } = slice.actions;

// Export reducer
export default slice.reducer;
