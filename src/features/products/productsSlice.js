import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAllProducts } from "../../serverAPI/products";

export const sliceName = 'products';

export const fetchAllProducts = createAsyncThunk(
    `${sliceName}/fetchAllProducts`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await getAllProducts();

        return response;
    }
);

const productsSlice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: [],
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: builder => {
        // fetchAllProducts state management
        builder.addCase(fetchAllProducts.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            const productsObject = {};
            action.payload.forEach(product => {
                productsObject[product.id] = product;
            });
            // state[sliceName] = action.payload;
            state[sliceName] = productsObject;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectAllProducts = state => state[sliceName][sliceName];
export const selectProductById = id => state => {
    if (!Array.isArray(id)) {
        return state[sliceName][sliceName][id];
    };

    const products = {};

    id.forEach(i => products[i] = state[sliceName][sliceName][i]);
    return products;
};

// Export reducer
export default productsSlice.reducer;
