import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createTemplate,
    getAllUserTemplates,
    getRecentWorkouts,
    deleteTemplate,
} from "../../serverAPI/workoutsTemplates";

export const sliceName = 'workoutTemplates';

export const createWorkoutTemplate = createAsyncThunk(
    `${sliceName}/createWorkoutTemplate`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties userId, alias and description
        // Error is handled from redux state when promise is rejected
        const response = await createTemplate(arg);

        response['description'] = response['description'] ? response['description'] : '';

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

export const getUserRecentWorkouts = createAsyncThunk(
    `${sliceName}/getUserRecentWorkouts`,
    async (arg, thunkAPI) => {
        // arg is an object with the property userId

        // Error is handled from redux state when promise is rejected
        const response = await getRecentWorkouts(arg);

        return response;
    }
);

export const deleteTemplateFromUser = createAsyncThunk(
    `${sliceName}/deleteTemplateFromUser`,
    async (arg, thunkAPI) => {
        // arg is an object with the property templateId

        // Error is handled from redux state when promise is rejected
        const response = await deleteTemplate(arg);

        return response;
    }
);

const slice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {
            userCreatedTemplates: [],
            recentWorkouts: [], // Stored here instead of in workoutsSlice
            // Because the id of the template is stored
            // and it can be used to fetch the template
            activeTemplate: null,
        },
        isLoading: false,
        hasError: false,
    },
    reducers: {
        setActiveTemplate: (state, action) => {
            // Action payload is the template id, it should be 
            // contained in the userCreatedTemplates array
            const template = state[sliceName].userCreatedTemplates.find(
                template => template.id === action.payload
            );

            state[sliceName].activeTemplate = template;
        }
    },
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

        // Get user recent workouts
        builder.addCase(getUserRecentWorkouts.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(getUserRecentWorkouts.fulfilled, (state, action) => {
            const templates = action.payload;
            const recentWorkouts = templates.map(template => {
                return {
                    id: template.template_id,
                    date: template.workout_date,
                    name: template.workout_name,
                }
            });
            state[sliceName].recentWorkouts = recentWorkouts;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(getUserRecentWorkouts.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Delete template
        builder.addCase(deleteTemplateFromUser.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(deleteTemplateFromUser.fulfilled, (state, action) => {
            // action payload is an object. Remove it from the userCreatedTemplates array
            const templateId = action.payload.id;
            state[sliceName].userCreatedTemplates = state[sliceName].userCreatedTemplates.filter(
                template => template.id !== templateId
            );

            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(deleteTemplateFromUser.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectUserTemplates = state => state[sliceName][sliceName].userCreatedTemplates;
export const selectActiveTemplate = state => state[sliceName][sliceName].activeTemplate;
export const selectTemplatesLoading = state => state[sliceName].isLoading;
export const selectTemplatesError = state => state[sliceName].hasError;
export const selectRecentWorkouts = state => state[sliceName][sliceName].recentWorkouts;

// Export actions
export const { setActiveTemplate } = slice.actions;

// Export reducer
export default slice.reducer;
