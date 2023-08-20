import { configureStore } from "@reduxjs/toolkit";
import SampleReducer from "./stores/sample.store";

export const AppStore = configureStore({
  reducer: {
    Sample: SampleReducer,
  },
});

export type AppState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
