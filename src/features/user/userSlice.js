import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { register, selectUserById } from "../../serverAPI/users";
import { login, extendSession } from "../../serverAPI/login";
import { logout } from "../../serverAPI/logout";
import { getExercisesFromUser, getCommonExercises } from "../exercises/exercisesSlice";
import {
    getAllUserCreatedTemplates,
    getCommonTemplatesForUser,
    getUserRecentWorkouts,
} from "../workoutsTemplates/workoutTemplatesSlice";
import { fetchWeightHistory } from "../weights/weightSlice";

import { resetApp } from "../../index";

export const sliceName = 'user';
const LOADING_FLAG = true;

export const loginUser = createAsyncThunk(
    `${sliceName}/loginUser`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected

        let userId = null;
        let user = null;

        // LocalStrategy login
        if (arg.username && arg.password) {
            const response = await login(arg.username, arg.password);
            user = response.user;
            userId = response.user.id;
        }
        // OAuth login
        else if (arg.userIdOAuth) {
            userId = arg.userIdOAuth;
            user = await selectUserById(userId);
        }

        // Get user's templates
        await thunkAPI.dispatch(getAllUserCreatedTemplates({
            userId
        }));
        // Get common templates
        await thunkAPI.dispatch(getCommonTemplatesForUser());
        // Get common exercises
        thunkAPI.dispatch(getCommonExercises());
        // Get exercises from user
        thunkAPI.dispatch(getExercisesFromUser({
            userId
        }));
        // Get user's recent workouts
        thunkAPI.dispatch(getUserRecentWorkouts({
            userId
        }));
        // Get user's weight history
        thunkAPI.dispatch(fetchWeightHistory({
            userId
        }));

        return user;
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
        // arg = { username, email, password, oauth_registration, is_premium, is_early_adopter }
        const response = await register(
            arg.username,
            arg.email,
            arg.password,
            arg.oauth_registration,
            arg.is_premium,
            arg.is_early_adopter,
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
        isLoading: [],
        error: { hasError: false, message: "" }, // Stores both error flag and message
        isLogingOut: false,
    },
    reducers: {},
    extraReducers: builder => {
        // login user
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.error = { hasError: false, message: "" };
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const user = action.payload;
            state[sliceName] = user;
            state.isLoading.pop();
            state.error = { hasError: false, message: "" };
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading.pop();
            state.error = { hasError: true, message: action.error?.message || "Login failed" };
        })

        // Extend user session
        builder.addCase(extendUserSession.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.error = { hasError: false, message: "" };
        })
        builder.addCase(extendUserSession.fulfilled, (state, action) => {
            const expirationDate = action.payload.expirationDate;

            // Update expiration date in state
            if (state[sliceName]) state[sliceName].expirationDate = expirationDate;

            state.isLoading.pop();
            state.error = { hasError: false, message: "" };
        })
        builder.addCase(extendUserSession.rejected, (state, action) => {
            state.isLoading.pop();
            state.error = { hasError: true, message: action.error?.message || "Session extension failed" };
        })

        // register user
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.error = { hasError: false, message: "" };
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            const user = action.payload;
            state[sliceName] = user;
            state.isLoading.pop();
            state.error = { hasError: false, message: "" };
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading.pop();
            state.error = { hasError: true, message: action.error?.message || "Registration failed" };
        })

        // logout user
        builder.addCase(logoutUser.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.isLogingOut = true;
            state.error = { hasError: false, message: "" };
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state[sliceName] = null;
            state.isLoading.pop();
            state.isLogingOut = false
            state.error = { hasError: false, message: "" };
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading.pop();
            state.isLogingOut = false;
            state.error = { hasError: true, message: action.error?.message || "Logout failed" };
        })
    },
});

// Export selectors
export const selectUser = state => state[sliceName][sliceName];
export const selectUserIsLoading = state => state[sliceName].isLoading.length > 0;
export const selectUserError = state => state[sliceName].error;
export const selectUserIsLogingOut = state => state[sliceName].isLogingOut;

// Export actions
// TODO BORRAR. ESTO ES DE HACE MUCHO TIEMPO. CUANDO USABA EL ROOT COMPONENT
export const { setUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
