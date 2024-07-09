import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer, { sliceName as userName } from '../features/user/userSlice';

const rootReducer = combineReducers({
  [userName]: userReducer,
})

// Function to provide store for ease of testing
export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}