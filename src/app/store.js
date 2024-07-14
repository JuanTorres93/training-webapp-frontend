import { configureStore, combineReducers } from '@reduxjs/toolkit';
// For persisting state when refreshing the page
// TODO it seems to introduce an error. Investigate and fix
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

import userReducer, { sliceName as userName } from '../features/user/userSlice';
import exerciseReducer, { sliceName as exerciseName } from '../features/exercises/exercisesSlice';

const rootReducer = combineReducers({
  [userName]: userReducer,
  [exerciseName]: exerciseReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = preloadedState => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
  });
  let persistor = persistStore(store);
  return { store, persistor };
};