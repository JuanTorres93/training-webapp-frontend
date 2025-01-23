import { configureStore, combineReducers } from '@reduxjs/toolkit';
// For persisting state when refreshing the page
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { authMiddleware } from '../features/reduxmiddlewares/authentication';

import userReducer, { sliceName as userName } from '../features/user/userSlice';
import exerciseReducer, { sliceName as exerciseName } from '../features/exercises/exercisesSlice';
import templateReducer, { sliceName as templateName } from '../features/workoutsTemplates/workoutTemplatesSlice';
import workoutReducer, { sliceName as workoutName } from '../features/workouts/workoutSlice';
import weightReducer, { sliceName as weightName } from '../features/weights/weightSlice';
import languageReducer, { sliceName as languageName } from '../features/language/languageSlice';

// Action for restarting the state
const RESET_STATE = 'RESET_STATE';

export const resetState = () => ({
  type: RESET_STATE,
});

const appReducer = combineReducers({
  [userName]: userReducer,
  [exerciseName]: exerciseReducer,
  [templateName]: templateReducer,
  [workoutName]: workoutReducer,
  [weightName]: weightReducer,
  [languageName]: languageReducer,
});

// Modify rootReducer to handle state reset
const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    // Clear persisted storage
    // Remove the state persisted from storage
    storage.removeItem('persist:root');
    // Restarts the state in memory
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = preloadedState => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // DOCS: Documentation states that all action types in redux-persist must be ignored. 
          // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(authMiddleware),
  });
  let persistor = persistStore(store);

  // Function to reset the state
  const resetApp = () => {
    store.dispatch(resetState());
    // Purge the persisted storage
    persistor.purge();
  };

  return { store, persistor, resetApp };
};
