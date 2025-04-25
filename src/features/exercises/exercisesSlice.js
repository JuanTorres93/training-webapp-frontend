import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllExercisesFromUser } from "../../serverAPI/exercises";

import { initialErrorState, createNewError } from "../slicesUtils";
import {
  createExercise as createExerciseInDb,
  updateExercise as updateExerciseInDb,
  deleteExercise as deleteExerciseInDb,
  getCommonExercises as getCommonExercisesFromDb,
} from "../../serverAPI/exercises";

export const sliceName = "exercises";

const LOADING_FLAG = true;

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
    const { name, description } = arg;
    // Error is handled from redux state when promise is rejected
    const response = await createExerciseInDb(name, description);

    return response;
  }
);

export const updateExercise = createAsyncThunk(
  `${sliceName}/updateExercise`,
  async (arg, thunkAPI) => {
    // Error is handled from redux state when promise is rejected
    let { exerciseId, name, description } = arg;

    // TODO later? DRY these ifs
    if (!description || description.trim() === "") {
      // Access the state from thunkAPI
      const state = thunkAPI.getState();

      // Get the exercise from the state
      const exercise = state[sliceName][sliceName].userCreatedExercises.find(
        (exercise) => exercise.id === exerciseId
      );
      description = exercise.description;
    }

    if (!name || name.trim() === "") {
      // Access the state from thunkAPI
      const state = thunkAPI.getState();

      // Get the exercise from the state
      const exercise = state[sliceName][sliceName].userCreatedExercises.find(
        (exercise) => exercise.id === exerciseId
      );
      name = exercise.name;
    }
    const response = await updateExerciseInDb(exerciseId, name, description);

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
      userCreatedExercises: [],
      commonExercises: [],
    },
    isLoading: [],
    error: initialErrorState, // Stores both error flag and message
  },
  extraReducers: (builder) => {
    // Get exercises
    builder.addCase(getExercisesFromUser.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(getExercisesFromUser.fulfilled, (state, action) => {
      let userExercises = action.payload;

      // Order by name
      userExercises.sort((a, b) => a.name.localeCompare(b.name));

      state[sliceName].userCreatedExercises = userExercises;

      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(getExercisesFromUser.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(
        action.error?.message || "Fetching exercises failed"
      );
    });

    // Get common exercises
    builder.addCase(getCommonExercises.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(getCommonExercises.fulfilled, (state, action) => {
      let commonExercises = action.payload.map((exercise) => {
        return {
          ...exercise,
          isCommon: true,
        };
      });

      // Order by name
      commonExercises.sort((a, b) => a.name.localeCompare(b.name));

      state[sliceName].commonExercises = commonExercises;
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(getCommonExercises.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(
        action.error?.message || "Fetching common exercises failed"
      );
    });

    // Create exercise
    builder.addCase(createExercise.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(createExercise.fulfilled, (state, action) => {
      let newExercise = action.payload;
      newExercise = {
        ...newExercise,
        name: newExercise.alias,
      };
      state[sliceName].userCreatedExercises.push(newExercise);
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(createExercise.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(
        action.error?.message || "Creating exercise failed"
      );
    });

    // update exercise
    builder.addCase(updateExercise.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(updateExercise.fulfilled, (state, action) => {
      let updatedExercise = action.payload;
      let index = state[sliceName].userCreatedExercises.findIndex(
        (exercise) => exercise.id === updatedExercise.id
      );
      state[sliceName].userCreatedExercises[index] = updatedExercise;
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(updateExercise.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(
        action.error?.message || "Updating exercise failed"
      );
    });

    // Delete exercise
    builder.addCase(deleteExercise.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(deleteExercise.fulfilled, (state, action) => {
      let deletedExercise = action.payload;
      state[sliceName].userCreatedExercises = state[
        sliceName
      ].userCreatedExercises.filter(
        (exercise) => exercise.id !== deletedExercise.id
      );
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(deleteExercise.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(
        action.error?.message || "Deleting exercise failed"
      );
    });
  },
});

// Export selectors
export const selectUserExercises = (state) =>
  state[sliceName][sliceName].userCreatedExercises;
export const selectCommonExercises = (state) =>
  state[sliceName][sliceName].commonExercises;
export const selectExercisesLoading = (state) =>
  state[sliceName].isLoading.length > 0;
export const selectExercisesError = (state) => state[sliceName].error;

export const selectExercisesInNewTemplate = (state) =>
  state[sliceName][sliceName].exercisesInNewTemplate;

// Export reducer
export default exercisesSlice.reducer;
