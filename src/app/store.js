import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer, { sliceName as productsName } from '../features/products/productsSlice';
import cartReducer, { sliceName as cartName } from '../features/cart/cartSlice';
import userReducer, { sliceName as userName } from '../features/user/userSlice';

const rootReducer = combineReducers({
  [productsName]: productsReducer,
  [cartName]: cartReducer,
  [userName]: userReducer,
})

// Function to provide store for ease of testing
export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}