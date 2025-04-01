import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialErrorState, createNewError } from "../slicesUtils";

import * as api from "../../serverAPI/payments";

export const sliceName = "payments";
const LOADING_FLAG = true;

// TODO BORRAR. LO he dejado para tener un ejemplo de como hacer un thunk
export const addCurrentDayWeight = createAsyncThunk(
  `${sliceName}/addCurrentDayWeight`,
  async (arg, thunkAPI) => {
    // arg is an object with the properties {userId, weight}

    // get the current date in YYYY-MM-DD format
    const date = new Date();

    // Error is handled from redux state when promise is rejected
    const response = await api.addNewWeight({
      ...arg,
      date,
    });

    return response;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState: {
    [sliceName]: {
      subscriptions: [],
      activeSubscription: {},
    },
    isLoading: [],
    error: initialErrorState,
  },
  reducers: {},
  extraReducers: (builder) => {
    // TODO BORRAR. LO he dejado para tener un ejemplo de como procesar un thunk
    // Add weight
    builder.addCase(addCurrentDayWeight.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(addCurrentDayWeight.fulfilled, (state, action) => {
      const today = new Date().toISOString().split("T")[0];
      state[sliceName].current = {
        date: today,
        value: action.payload.value,
      };
      state[sliceName].history.push(action.payload);
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(addCurrentDayWeight.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(action.error.message || "Unknown error");
    });
  },
});

// Export selectors
export const selectSubscriptions = (state) =>
  state[sliceName][sliceName].subscriptions;
export const selectActiveSubscription = (state) =>
  state[sliceName][sliceName].activeSubscription;

// Export reducer
export default slice.reducer;
