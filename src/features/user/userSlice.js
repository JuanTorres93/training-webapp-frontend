import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { register } from "../../serverAPI/users";
import { login, extendSession } from "../../serverAPI/login";
import { logout } from "../../serverAPI/logout";
import { getExercisesFromUser } from "../exercises/exercisesSlice";
import {
    getAllUserCreatedTemplates,
    getUserRecentWorkouts,
} from "../workoutsTemplates/workoutTemplatesSlice";
import { resetApp } from "../../index";

export const sliceName = 'user';

export const loginUser = createAsyncThunk(
    `${sliceName}/loginUser`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await login(arg.username, arg.password);
        const userId = response.user.id;
        // Get user's templates
        await thunkAPI.dispatch(getAllUserCreatedTemplates({
            userId
        }));
        // Get exercises from user
        thunkAPI.dispatch(getExercisesFromUser({
            userId
        }));
        // Get user's recent workouts
        thunkAPI.dispatch(getUserRecentWorkouts({
            userId
        }));

        return response;
    }
);

export const extendUserSession = createAsyncThunk(
    `${sliceName}/extendUserSession`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await extendSession();

        return response;
    }
);

export const logoutUser = createAsyncThunk(
    `${sliceName}/logoutUser`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await logout();

        // Clean redux state
        resetApp();

        return response.status;
    }
);

export const registerUser = createAsyncThunk(
    `${sliceName}/registerUser`,
    async (arg, thunkAPI) => {
        // arg = { username, email, password, registeredViaOauth }
        const response = await register(
            arg.username,
            arg.email,
            arg.password,
            arg.registeredViaOAuth,
        );

        if (response.id) {
            // Get exercises from user
            thunkAPI.dispatch(loginUser({
                username: arg.username,
                password: arg.password,
            }));

        }

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

        // Extend user session
        builder.addCase(extendUserSession.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(extendUserSession.fulfilled, (state, action) => {
            const expirationDate = action.payload.expirationDate;

            // Update expiration date in state
            if (state[sliceName]) state[sliceName].expirationDate = expirationDate;

            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(extendUserSession.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // register user
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            const user = action.payload;
            state[sliceName] = user;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
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
export const selectUserIsLoading = state => state[sliceName].isLoading;
export const selectUserHasError = state => state[sliceName].hasError;

// Export actions
export const { setUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
