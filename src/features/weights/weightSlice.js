import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from '../../serverAPI/weights';

export const sliceName = 'weights';
const LOADING_FLAG = true;

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

export const updateCurrentDayWeight = createAsyncThunk(
    `${sliceName}/updateCurrentDayWeight`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties {userId, weight}

        // get the current date in YYYY-MM-DD format
        const date = new Date();

        // Error is handled from redux state when promise is rejected
        const response = await api.updateNewWeight({
            ...arg,
            date,
        });

        return response;
    }
);

export const fetchWeightHistory = createAsyncThunk(
    `${sliceName}/fetchWeightHistory`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties {userId}
        const response = await api.getAllWeightsFromUser(arg.userId);

        return response;
    }
);

const slice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {
            current: {},
            history: [],
        },
        isLoading: [],
        hasError: false,
    },
    reducers: {},
    extraReducers: builder => {
        // Add weight
        builder.addCase(addCurrentDayWeight.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(addCurrentDayWeight.fulfilled, (state, action) => {
            const today = new Date().toISOString().split('T')[0];
            state[sliceName].current = {
                date: today,
                value: action.payload.value,
            };
            state[sliceName].history.push(action.payload);
            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(addCurrentDayWeight.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Update weight
        builder.addCase(updateCurrentDayWeight.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(updateCurrentDayWeight.fulfilled, (state, action) => {
            const today = new Date().toISOString().split('T')[0];
            state[sliceName].current = {
                date: today,
                value: action.payload.value,
            };
            // update weight in history
            const index = state[sliceName].history.findIndex(
                entry => entry.date === action.payload.date
            );
            state[sliceName].history[index] = action.payload;
            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(updateCurrentDayWeight.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Fetch weight history
        builder.addCase(fetchWeightHistory.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(fetchWeightHistory.fulfilled, (state, action) => {
            state[sliceName].history = action.payload;
            // if last date is today, set current weight
            if (action.payload.length > 0) {
                const lastEntry = action.payload[action.payload.length - 1];

                const formattedLastEntryDate = new Date(lastEntry.date).toISOString().split('T')[0];

                // get current date in YYYY-MM-DD format
                const currentDate = new Date().toISOString().split('T')[0];

                if (formattedLastEntryDate === currentDate) {
                    state[sliceName].current = {
                        date: currentDate,
                        value: lastEntry.value,
                    };
                }
            }

            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(fetchWeightHistory.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectCurrentWeight = state => state[sliceName][sliceName].current;
export const selectWeightHistory = state => state[sliceName][sliceName].history;
export const selectWeightIsLoading = state => state[sliceName].isLoading.length > 0;

// Export reducer
export default slice.reducer;
