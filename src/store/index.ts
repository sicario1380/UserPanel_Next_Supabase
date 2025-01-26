"use client";
import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice";

// Configure and export the Redux store with multiple reducers
export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

