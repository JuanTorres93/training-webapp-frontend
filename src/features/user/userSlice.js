import { createSlice } from "@reduxjs/toolkit";

export const sliceName = 'user';

const userSlice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: null,
        isLoading: false,
        hasError: false,
    },
    reducers: {
        setUser: (state, action) => {
            // action.payload = { first_name, last_name, second_last_name, email }
            state[sliceName] = action.payload;
        }
    },
});

// Export selectors
export const selectUser = state => state[sliceName][sliceName];

// Export actions
export const { setUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
