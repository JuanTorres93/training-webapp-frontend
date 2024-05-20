import { createSlice } from "@reduxjs/toolkit";

export const sliceName = 'cart';

const cartSlice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {},
        isLoading: false,
        hasError: false,
    },
    reducers: {
        addToCart: (state, action) => {
            // action.payload = { id, quantity } 
            const { id, quantity } = action.payload;
            console.log(state[sliceName]);
            const currentCart = state[sliceName];

            if (Object.keys(currentCart).includes(String(id))) {
                state[sliceName][id] += quantity;
            } else {
                state[sliceName][id] = quantity;
            }
        }
    },
});

// Export selectors
export const selectCart = state => state[sliceName][sliceName];

// Export actions
export const { addToCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
