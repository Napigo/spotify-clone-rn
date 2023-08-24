import { createAction, createReducer } from "@reduxjs/toolkit";

export type FeaturedPlaylistItem = {
  id: string;
  description: string;
  name: string;
  photoCover: string | null;
};

interface FeaturePlaylistsState {
  isReady: boolean;
  playlists: FeaturedPlaylistItem[];
}

const initialState: FeaturePlaylistsState = {
  isReady: false,
  playlists: [],
};

const load = createAction<FeaturedPlaylistItem[]>("featured-playlists/load");
const unload = createAction<FeaturedPlaylistItem[]>(
  "featured-playlists/unload"
);

const reducer = createReducer<FeaturePlaylistsState>(initialState, (build) => {
  build.addCase(load, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        isReady: true,
        playlists: action.payload,
      }
    );
  });
  build.addCase(unload, () => initialState);
});

export const featuredPlaylistsAction = {
  load,
  unload,
};
export default reducer;
