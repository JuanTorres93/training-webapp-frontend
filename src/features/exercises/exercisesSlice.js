import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllExercisesFromUser } from "../../serverAPI/exercises";

export const sliceName = 'exercises';

export const getExercisesFromUser = createAsyncThunk(
    `${sliceName}/getExercisesFromUser`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await getAllExercisesFromUser(arg.userId);

        return response;
    }
);

const exercisesSlice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {
            userCreatedExercises: null,
            exercisesInNewTemplate: [],
        },
        isLoading: false,
        hasError: false,
    },
    reducers: {
        // Add exercise to exercisesInNewTemplate
        addExerciseToTemplate: (state, action) => {
            // action must be an exercise object
            // with the properties id, name and description
            const exerciseId = action.payload.id;
            state[sliceName].exercisesInNewTemplate.push(action.payload);
            // Remove Id from userCreatedExercises
            state[sliceName].userCreatedExercises = state[sliceName].userCreatedExercises.filter(exercise => exercise.id !== exerciseId);
        },
        removeExerciseFromTemplate: (state, action) => {
            // action.payload is an exercise id
            const exerciseId = action.payload;
            const exercise = state[sliceName].exercisesInNewTemplate.filter(exercise => exercise.id === exerciseId)[0];
            state[sliceName].exercisesInNewTemplate = state[sliceName].exercisesInNewTemplate.filter(exercise => exercise.id !== exerciseId);
            state[sliceName].userCreatedExercises.push(exercise);
            
            // Order by id
            state[sliceName].userCreatedExercises.sort((a, b) => a.id - b.id);
            state[sliceName].exercisesInNewTemplate.sort((a, b) => a.id - b.id);
        }
    },
    extraReducers: builder => {
        builder.addCase(getExercisesFromUser.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(getExercisesFromUser.fulfilled, (state, action) => {
            let userExercises = action.payload;
            state[sliceName].userCreatedExercises = userExercises;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(getExercisesFromUser.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectUserExercises = state => state[sliceName][sliceName].userCreatedExercises;
export const selectExercisesLoading = state => state[sliceName].isLoading;
export const selectExercisesError = state => state[sliceName].hasError;

export const selectExercisesInNewTemplate = state => state[sliceName][sliceName].exercisesInNewTemplate;

// Export actions
export const { addExerciseToTemplate, removeExerciseFromTemplate } = exercisesSlice.actions;

// Export reducer
export default exercisesSlice.reducer;
