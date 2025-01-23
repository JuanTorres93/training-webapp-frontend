import { createSlice } from "@reduxjs/toolkit";

export const sliceName = 'language';
const LOADING_FLAG = true;

// Detect navigator language
const userLanguage = navigator.language || navigator.userLanguage;

// Gets the language code (first two characters)
// e.g. 'es-ES' -> returns 'es'
// e.g. 'en-US' -> returns 'en'
const machineLanguage = userLanguage.split('-')[0];

const slice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {
            currentLanguage: machineLanguage,
        },
    },
    reducers: {
        setLanguage: (state, action) => {
            // action.payload is the language code. e.g. 'es' or 'en'
            state[sliceName].currentLanguage = action.payload
        },
    },
});

// Export selectors
export const selectCurrentLanguage = state => state[sliceName][sliceName].currentLanguage;

// Export actions
export const { setLanguage } = slice.actions;

// Export reducer
export default slice.reducer;
