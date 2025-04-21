import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialErrorState, createNewError } from "../slicesUtils";

import * as api from "../../serverAPI/payments";

export const sliceName = "payments";
const LOADING_FLAG = true;

export const getCheckoutSession = createAsyncThunk(
  `${sliceName}/getCheckoutSession`,
  async (arg, thunkAPI) => {
    // arg is an object with the properties {subscriptionId, language}

    // Error is handled from redux state when promise is rejected
    const response = await api.getCheckoutSession(
      arg.subscriptionId,
      arg.language
    );

    return response;
  }
);

export const getLastPayment = createAsyncThunk(
  `${sliceName}/getLastPayment`,
  async (arg, thunkAPI) => {
    // Error is handled from redux state when promise is rejected
    const response = await api.getLastPayment();

    return response;
  }
);

export const cancelSubscription = createAsyncThunk(
  `${sliceName}/cancelSubscription`,
  async (arg, thunkAPI) => {
    // Error is handled from redux state when promise is rejected
    const response = await api.cancelSubscription();

    return response;
  }
);

export const resumeSubscription = createAsyncThunk(
  `${sliceName}/resumeSubscription`,
  async (arg, thunkAPI) => {
    // Error is handled from redux state when promise is rejected
    const response = await api.resumeSubscription();

    return response;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState: {
    [sliceName]: {
      lastPayment: {},
    },
    isLoading: [],
    error: initialErrorState,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Get checkout session
    builder.addCase(getCheckoutSession.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(getCheckoutSession.fulfilled, (state, action) => {
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(getCheckoutSession.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(action.error.message || "Unknown error");
    });

    // Get last payment
    builder.addCase(getLastPayment.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(getLastPayment.fulfilled, (state, action) => {
      state.isLoading.pop();
      state[sliceName].lastPayment = action.payload;
      state.error = initialErrorState;
      state.payments.lastPayment = action.payload;
    });
    builder.addCase(getLastPayment.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(action.error.message || "Unknown error");
    });

    // Cancel subscription
    builder.addCase(cancelSubscription.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(cancelSubscription.fulfilled, (state, action) => {
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(cancelSubscription.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(action.error.message || "Unknown error");
    });

    // Resume subscription
    builder.addCase(resumeSubscription.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(resumeSubscription.fulfilled, (state, action) => {
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(resumeSubscription.rejected, (state, action) => {
      state.isLoading.pop();
      state.error = createNewError(action.error.message || "Unknown error");
    });
  },
});

// Export selectors
// select last payment
export const selectLastPayment = (state) =>
  state[sliceName][sliceName].lastPayment;

// Export reducer
export default slice.reducer;
