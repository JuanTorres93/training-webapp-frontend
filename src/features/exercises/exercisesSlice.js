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
        },
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: builder => {
        // login user
        builder.addCase(getExercisesFromUser.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(getExercisesFromUser.fulfilled, (state, action) => {
            let userExercises = action.payload;
            // TODO modify to state[sliceName].userCreatedExercises
            state[sliceName] = userExercises;
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
// TODO modify to state[sliceName].userCreatedExercises when state is modified above
export const selectUserExercises = state => state[sliceName][sliceName];
export const selectExercisesLoading = state => state[sliceName].isLoading;
export const selectExercisesError = state => state[sliceName].hasError;

// Export reducer
export default exercisesSlice.reducer;
