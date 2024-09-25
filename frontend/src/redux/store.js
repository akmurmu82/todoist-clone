import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";

import todoReducer from "./slices/todoSlice";
import userReducer from "./slices/userSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "todos"], // reducers to persist
};

// combinig all the reducers
const rootReducer = combineReducers({
  user: userReducer,
  todos: todoReducer,
});

// Persisted reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store with persisted reducers and thunk middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // This is important to avoid issues with non-serializable values in state
      },
    }).concat(thunk),
});

// Creating a persistor
const persistor = persistStore(store);
export { store, persistor };
