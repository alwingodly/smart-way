import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session"; 
import authSlice from "./authSlice";
import { encryptTransform } from "redux-persist-transform-encrypt"; 

const encryptor = encryptTransform({
  secretKey: process.env.REACT_APP_SECRET_KEY, 
  onError: function (error) {
    console.error("Encryption Error: ", error);
  },
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [encryptor],
};

const reducers = combineReducers({
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
