import { createReducer, createAction } from "@reduxjs/toolkit";
import { ReleaseItem } from "../../modules/api/album.apis";

type RecentTrackState = {
  isReady: boolean;
  data: ReleaseItem[];
};

const initialState: RecentTrackState = {
  isReady: false,
  data: [],
};

const load = createAction<ReleaseItem[]>("recent-tracks/load");
const unload = createAction<void>("recent-tracks/unload");

const reducer = createReducer<RecentTrackState>(initialState, (build) => {
  build.addCase(load, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        isReady: true,
        data: [...action.payload],
      }
    );
  });
  build.addCase(unload, () => {
    return initialState;
  });
});

export const recentTracksAction = {
  load,
  unload,
};
export default reducer;
