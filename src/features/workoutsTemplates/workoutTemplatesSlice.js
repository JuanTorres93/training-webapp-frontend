import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTemplate } from "../../serverAPI/workoutsTemplates";

export const sliceName = 'workoutTemplates';

export const createWorkoutTemplate = createAsyncThunk(
    `${sliceName}/createWorkoutTemplate`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties userId, alias and description
        // Error is handled from redux state when promise is rejected
        const response = await createTemplate(arg);

        return response;
    }
);

const slice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {
            userCreatedTemplates: [],
            activeTemplate: null,
        },
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: builder => {
        // Create workout template
        builder.addCase(createWorkoutTemplate.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(createWorkoutTemplate.fulfilled, (state, action) => {
            let template = action.payload;
            state[sliceName].userCreatedTemplates.push(template);
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(createWorkoutTemplate.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectUserTemplates = state => state[sliceName][sliceName].userCreatedTemplates;
export const selectTemplatesLoading = state => state[sliceName].isLoading;
export const selectTemplatesError = state => state[sliceName].hasError;

// Export actions


// Export reducer
export default slice.reducer;
