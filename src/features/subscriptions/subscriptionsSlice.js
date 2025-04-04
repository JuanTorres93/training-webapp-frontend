import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialErrorState, createNewError } from "../slicesUtils";

// TODO modificar a subscriptions
import * as api from "../../serverAPI/subscriptions";

export const sliceName = "subscriptions";
const LOADING_FLAG = true;

export const getAllSubscriptions = createAsyncThunk(
  `${sliceName}/getAllSubscriptions`,
  async (arg, thunkAPI) => {
    // Error is handled from redux state when promise is rejected
    const response = await api.getAllSubscriptions();

    return response;
  }
);

export const getCurrentSubscription = createAsyncThunk(
  `${sliceName}/getCurrentSubscription`,
  async (arg, thunkAPI) => {
    // arg is an object with the properties {userId}

    // Error is handled from redux state when promise is rejected
    const response = await api.getCurrentSubscription(arg.userId);

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
    // Fetch all subscriptions
    builder.addCase(getAllSubscriptions.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(getAllSubscriptions.fulfilled, (state, action) => {
      // Filter out free and free_trial subscriptions
      const subscriptions = action.payload.filter(
        (s) => !["FREE", "FREE_TRIAL"].includes(s.type)
      );
      state[sliceName].subscriptions = subscriptions;
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(getAllSubscriptions.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(action.error.message || "Unknown error");
    });

    // Fetch current subscription
    builder.addCase(getCurrentSubscription.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(getCurrentSubscription.fulfilled, (state, action) => {
      const subscription = action.payload;
      state[sliceName].activeSubscription = subscription;
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(getCurrentSubscription.rejected, (state, action) => {
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
