// comment this to run rtk query on ssr 


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
  persistReducer,
} from "redux-persist";
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import counterReducer from "./features/counter/counterSlice";
import fullPageLoaderSlice from "@/src/app/components/FullPageLoader/reducer/fullPageLoaderSlice";
import currentUserSlice from "@/src/app/components/Navbar/Reducer/currentUserSlice";

const createNoopStorage = (): Storage => {
  return {
    getItem: (): Promise<null> => {
      return Promise.resolve(null);
    },
    setItem: ( value: string): Promise<string> => {
      return Promise.resolve(value);
    },
    removeItem: (): Promise<void> => {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined'
  ? createWebStorage('local')
  : createNoopStorage();
const persistConfig = {
    key: 'root',
    storage,
    blacklist:['currentUserSlice','fullPageLoaderSlice']
  };

  const reducers = combineReducers({
    counter: counterReducer,
    currentUserSlice: currentUserSlice,
    fullPageLoaderSlice: fullPageLoaderSlice,
    
  });


  const persistedReducers = persistReducer(persistConfig, reducers)



export const makeStore = () => {
  return configureStore({
    reducer: persistedReducers,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
  });
};


const store = makeStore()


setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];