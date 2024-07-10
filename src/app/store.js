import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer, { sliceName as userName } from '../features/user/userSlice';
import exerciseReducer, { sliceName as exerciseName } from '../features/exercises/exercisesSlice';

const rootReducer = combineReducers({
  [userName]: userReducer,
  [exerciseName]: exerciseReducer,
})

// Function to provide store for ease of testing
export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}