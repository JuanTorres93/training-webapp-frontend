import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createWorkout as createWorkoutInDb } from "../../serverAPI/workouts";

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

const slice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {
            activeWorkout: null,
        },
        isLoading: false,
        hasError: false,
    },
    reducers: {},
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
    },
});

// Export selectors
export const selectActiveWorkout = state => state[sliceName][sliceName].activeTemplate;
export const selectWorkoutsLoading = state => state[sliceName].isLoading;
export const selectWorkoutsError = state => state[sliceName].hasError;

// Export actions

// Export reducer
export default slice.reducer;
