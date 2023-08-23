import { configureStore } from "@reduxjs/toolkit";
import SampleReducer from "./stores/sample.store";
import RecentTracksReducer from "./stores/recent-tracks.store";

export const AppStore = configureStore({
  devTools: true,
  reducer: {
    RecentTracksStore: RecentTracksReducer,
    Sample: SampleReducer,
  },
});

export type AppState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
