import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../serverAPI/login";

export const sliceName = 'user';

export const loginUser = createAsyncThunk(
    `${sliceName}/loginUser`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await login(arg.username, arg.password);

        return response;
    }
);

const userSlice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: null,
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: builder => {
        // login user state management
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const user = action.payload.user;
            state[sliceName] = user;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectUser = state => state[sliceName][sliceName];

// Export actions
export const { setUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
