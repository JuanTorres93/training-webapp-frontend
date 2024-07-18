import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTemplate, getAllUserTemplates } from "../../serverAPI/workoutsTemplates";

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

export const getAllUserCreatedTemplates = createAsyncThunk(
    `${sliceName}/getAllUserCreatedTemplates`,
    async (arg, thunkAPI) => {
        // arg is an object with the property userId

        // Error is handled from redux state when promise is rejected
        const response = await getAllUserTemplates(arg);

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
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(createWorkoutTemplate.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Get all user created templates
        builder.addCase(getAllUserCreatedTemplates.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(getAllUserCreatedTemplates.fulfilled, (state, action) => {
            let templates = action.payload;
            state[sliceName].userCreatedTemplates = templates;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(getAllUserCreatedTemplates.rejected, (state, action) => {
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
