import { logoutUser } from "../user/userSlice";

// Check if session has expired
export const authMiddleware = store => next => action => {
    // Verify whether the action is an async action that has been fulfilled
    if (action.type.endsWith('/fulfilled')) {
        const { payload } = action;

        // Check if the server response is 401 (Unauthorized)
        if (payload?.msg === "Not logged in.") {
            store.dispatch((dispatch, getState) => {
                dispatch(logoutUser());
            });
        }
    }

    return next(action); // Pass the action to the next middleware or to the reducer
};
