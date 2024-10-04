import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllExercisesFromUser } from "../../serverAPI/exercises";

import {
    createExercise as createExerciseInDb,
    deleteExercise as deleteExerciseInDb,
    getCommonExercises as getCommonExercisesFromDb,
} from "../../serverAPI/exercises";

export const sliceName = 'exercises';

export const getExercisesFromUser = createAsyncThunk(
    `${sliceName}/getExercisesFromUser`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await getAllExercisesFromUser(arg.userId);

        return response;
    }
);

export const getCommonExercises = createAsyncThunk(
    `${sliceName}/getCommonExercises`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await getCommonExercisesFromDb();

        return response;
    }
);

export const createExercise = createAsyncThunk(
    `${sliceName}/createExercise`,
    async (arg, thunkAPI) => {
        const { alias, description } = arg;
        // Error is handled from redux state when promise is rejected
        const response = await createExerciseInDb(alias, description);

        return response;
    }
);

export const deleteExercise = createAsyncThunk(
    `${sliceName}/deleteExercise`,
    async (arg, thunkAPI) => {
        // arg is an object with the property exerciseId
        const { exerciseId } = arg;

        const response = await deleteExerciseInDb(exerciseId);

        return response;
    }
);

const exercisesSlice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {
            userCreatedExercises: null,
            commonExercises: null,
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
            const exerciseInfo = {
                ...action.payload,
                // TODO change default sets to 3?
                sets: 1,
            };
            state[sliceName].exercisesInNewTemplate.push(exerciseInfo);

            // Remove Id from userCreatedExercises of commonExercises, where necessary
            if (exerciseInfo.isCommon) {
                state[sliceName].commonExercises = state[sliceName].commonExercises.filter(exercise => exercise.id !== exerciseId);
            } else {
                state[sliceName].userCreatedExercises = state[sliceName].userCreatedExercises.filter(exercise => exercise.id !== exerciseId);
            }
        },
        removeExerciseFromTemplate: (state, action) => {
            // action.payload is an exercise id
            const exerciseId = action.payload;
            const exercise = state[sliceName].exercisesInNewTemplate.filter(exercise => exercise.id === exerciseId)[0];
            state[sliceName].exercisesInNewTemplate = state[sliceName].exercisesInNewTemplate.filter(exercise => exercise.id !== exerciseId);

            if (exercise.isCommon) {
                state[sliceName].commonExercises.push(exercise);
            } else {
                state[sliceName].userCreatedExercises.push(exercise);
            }

            // Order by id
            state[sliceName].userCreatedExercises.sort((a, b) => a.id - b.id);
            state[sliceName].commonExercises.sort((a, b) => a.id - b.id);
            state[sliceName].exercisesInNewTemplate.sort((a, b) => a.id - b.id);
        },
        updateExerciseSets: (state, action) => {
            // action.payload is an object with the properties id and sets
            const { id, sets } = action.payload;
            state[sliceName].exercisesInNewTemplate = state[sliceName].exercisesInNewTemplate.map(exercise => {
                if (exercise.id === id) {
                    return {
                        ...exercise,
                        sets: sets,
                    };
                }
                return exercise;
            });
        },
    },
    extraReducers: builder => {
        // Get exercises
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

        // Get common exercises
        builder.addCase(getCommonExercises.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(getCommonExercises.fulfilled, (state, action) => {
            const commonExercises = action.payload.map(exercise => {
                return {
                    ...exercise,
                    isCommon: true,
                };
            });
            state[sliceName].commonExercises = commonExercises;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(getCommonExercises.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Create exercise
        builder.addCase(createExercise.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(createExercise.fulfilled, (state, action) => {
            let newExercise = action.payload;
            newExercise = {
                ...newExercise,
                name: newExercise.alias,
            };
            state[sliceName].userCreatedExercises.push(newExercise);
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(createExercise.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Delete exercise
        builder.addCase(deleteExercise.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(deleteExercise.fulfilled, (state, action) => {
            let deletedExercise = action.payload;
            state[sliceName].userCreatedExercises = state[sliceName].userCreatedExercises.filter(
                exercise => exercise.id !== deletedExercise.id
            );
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(deleteExercise.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectUserExercises = state => state[sliceName][sliceName].userCreatedExercises;
export const selectCommonExercises = state => state[sliceName][sliceName].commonExercises;
export const selectExercisesLoading = state => state[sliceName].isLoading;
export const selectExercisesError = state => state[sliceName].hasError;

export const selectExercisesInNewTemplate = state => state[sliceName][sliceName].exercisesInNewTemplate;

// Export actions
export const {
    addExerciseToTemplate,
    removeExerciseFromTemplate,
    updateExerciseSets } = exercisesSlice.actions;

// Export reducer
export default exercisesSlice.reducer;
