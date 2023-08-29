import { createAction, createReducer } from "@reduxjs/toolkit";
import { IImage } from "../../modules/api/album.apis";

export interface SavedTrack {
  id: string;
  name: string;
  images: IImage[];
  artistName: string;
  albumName: string;
}
interface SavedTracksState {
  isReady: boolean;
  total: number;
  tracks: SavedTrack[];
}

const initialState: SavedTracksState = {
  isReady: false,
  total: 0,
  tracks: [],
};

const load = createAction<{ tracks: SavedTrack[]; total: number }>(
  "saved-tracks/load"
);
const unload = createAction<SavedTrack[]>("saved-tracks/unload");
const updateList = createAction<SavedTrack[]>("saved-tracks/update-list");

const reducer = createReducer<SavedTracksState>(initialState, (build) => {
  build.addCase(load, (state, action) => {
    const { tracks, total } = action.payload;
    return Object.assign(
      state,
      {},
      {
        isReady: true,
        tracks: tracks,
        total: total,
      }
    );
  });
  build.addCase(updateList, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        tracks: action.payload,
      }
    );
  });
  build.addCase(unload, () => initialState);
});

export const savedTracksAction = {
  load,
  unload,
  updateList,
};

export default reducer;
