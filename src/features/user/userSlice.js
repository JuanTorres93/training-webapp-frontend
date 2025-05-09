import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialErrorState, createNewError } from "../slicesUtils";

import { register, selectUserById } from "../../serverAPI/users";
import { login, extendSession, authMe } from "../../serverAPI/login";
import { logout } from "../../serverAPI/logout";
import {
  getExercisesFromUser,
  getCommonExercises,
} from "../exercises/exercisesSlice";
import {
  getAllUserCreatedTemplates,
  getCommonTemplatesForUser,
  getUserRecentWorkouts,
} from "../workoutsTemplates/workoutTemplatesSlice";
import { fetchWeightHistory } from "../weights/weightSlice";
import {
  getAllSubscriptions,
  getCurrentSubscription,
} from "../subscriptions/subscriptionsSlice";
import { getLastPayment } from "../payments/paymentsSlice";

import { resetApp } from "../../app/store";
import i18n from "../../i18n";

export const sliceName = "user";
const LOADING_FLAG = true;

export const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,
  async (arg, thunkAPI) => {
    // Error is handled from redux state when promise is rejected

    let userId = null;
    let user = null;

    try {
      // LocalStrategy login
      if (arg.username && arg.password) {
        const response = await login(arg.username, arg.password);
        user = response.user;
        userId = response.user.id;
      }
      // OAuth login
      else if (arg.isOAuthLogin) {
        const authData = await authMe();

        userId = authData.id;
        user = await selectUserById(userId);
        user.expirationDate = authData.expirationDate;
      }
    } catch (error) {
      const statusCode = error.response.status;
      return thunkAPI.rejectWithValue({ statusCode });
    }

    // Get subscriptions
    thunkAPI.dispatch(getAllSubscriptions());
    thunkAPI.dispatch(getCurrentSubscription({ userId }));

    // Get last payment
    thunkAPI.dispatch(getLastPayment());

    // Get user's templates
    await thunkAPI.dispatch(
      getAllUserCreatedTemplates({
        userId,
      })
    );
    // Get common templates
    await thunkAPI.dispatch(getCommonTemplatesForUser());
    // Get common exercises
    thunkAPI.dispatch(getCommonExercises());
    // Get exercises from user
    thunkAPI.dispatch(
      getExercisesFromUser({
        userId,
      })
    );
    // Get user's recent workouts
    thunkAPI.dispatch(
      getUserRecentWorkouts({
        userId,
      })
    );
    // Get user's weight history
    thunkAPI.dispatch(
      fetchWeightHistory({
        userId,
      })
    );

    return user;
  }
);

export const extendUserSession = createAsyncThunk(
  `${sliceName}/extendUserSession`,
  async (arg, thunkAPI) => {
    // Error is handled from redux state when promise is rejected
    let response;
    try {
      response = await extendSession();
    } catch (error) {
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }

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
    // arg = { username, email, password, oauth_registration, is_premium, is_early_adopter, language }
    let response;
    try {
      response = await register(
        arg.username,
        arg.email,
        arg.password,
        arg.oauth_registration,
        arg.is_premium,
        arg.is_early_adopter,
        arg.language
      );
    } catch (error) {
      const response = error.response;

      return thunkAPI.rejectWithValue({
        statusCode: response.status,
        response: response.data,
      });
    }

    if (response.id) {
      // Get exercises from user
      thunkAPI.dispatch(
        loginUser({
          username: arg.username,
          password: arg.password,
        })
      );
    }

    return response;
  }
);

const userSlice = createSlice({
  name: sliceName,
  initialState: {
    [sliceName]: null,
    isLoading: [],
    error: initialErrorState, // Stores both error flag and message
    isLogingOut: false,
  },
  reducers: {
    resetError: (state) => {
      state.error = initialErrorState;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const user = action.payload;
      state[sliceName] = user;
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      const { statusCode } = action.payload;

      const errorMsg =
        statusCode === 401
          ? i18n.t("error-invalid-credentials")
          : i18n.t("error-login-failed");

      state.isLoading.pop();
      state.error = createNewError(errorMsg);
    });

    // Extend user session
    builder.addCase(extendUserSession.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(extendUserSession.fulfilled, (state, action) => {
      const expirationDate = action.payload.expirationDate;

      // Update expiration date in state
      if (state[sliceName]) state[sliceName].expirationDate = expirationDate;

      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(extendUserSession.rejected, (state, action) => {
      const { statusCode } = action.payload;

      const errorMsg =
        statusCode === 400
          ? i18n.t("error-session-not-extended")
          : i18n.t("error-extension-failed");
      state.isLoading.pop();
      state.error = createNewError(errorMsg);
    });

    // register user
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.error = initialErrorState;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const user = action.payload;
      state[sliceName] = user;
      state.isLoading.pop();
      state.error = initialErrorState;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      const { statusCode, response } = action.payload;

      let errorMsg = i18n.t("error-register-failed");

      if (statusCode === 409) {
        const resMsg = response.msg;

        // Check if email is contained in lowercase resMsg
        if (resMsg.toLowerCase().includes("email")) {
          errorMsg = i18n.t("error-email-taken");
        } else {
          errorMsg = i18n.t("error-username-taken");
        }
      } else if (statusCode === 400) {
        const errorMsgs = response.errors.map((err) => err.msg);
        // TODO TRANSLATE. GESTIONAR DESDE BACK
        errorMsg = errorMsgs[0];
      }

      state.isLoading.pop();
      state.error = createNewError(errorMsg);
    });

    // logout user
    builder.addCase(logoutUser.pending, (state, action) => {
      state.isLoading.push(LOADING_FLAG);
      state.isLogingOut = true;
      state.error = initialErrorState;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state[sliceName] = null;
      state.isLoading.pop();
      state.isLogingOut = false;
      state.error = initialErrorState;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading.pop();
      state.isLogingOut = false;
      state.error = createNewError(action.error?.message || "Logout failed");
    });
  },
});

// Export selectors
export const selectUser = (state) => state[sliceName][sliceName];
export const selectUserIsLoading = (state) =>
  state[sliceName].isLoading.length > 0;
export const selectUserError = (state) => state[sliceName].error;
export const selectUserIsLogingOut = (state) => state[sliceName].isLogingOut;

// Export actions
export const { resetError } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
