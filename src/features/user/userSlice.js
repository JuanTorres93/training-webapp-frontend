import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../serverAPI/login";
import { logout } from "../../serverAPI/logout";

export const sliceName = 'user';

export const loginUser = createAsyncThunk(
    `${sliceName}/loginUser`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await login(arg.username, arg.password);

        return response;
    }
);

export const logoutUser = createAsyncThunk(
    `${sliceName}/logoutUser`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await logout();

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
        // login user
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
        // logout user
        builder.addCase(logoutUser.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state[sliceName] = null;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
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
