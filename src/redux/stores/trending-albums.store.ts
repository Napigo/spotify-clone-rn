import { createAction, createReducer } from "@reduxjs/toolkit";

type TrendingAlbumsState = {
  isReady: boolean;
  albums: TrendingAlbum[];
};

export type TrendingAlbum = {
  id: string;
  coverImage: string;
  albumName: string;
  artistName: string;
};

const initialState: TrendingAlbumsState = {
  isReady: false,
  albums: [],
};

const load = createAction<TrendingAlbum[]>("trending-albums/load");
const unload = createAction<TrendingAlbum[]>("trending-albums/unload");

const reducer = createReducer<TrendingAlbumsState>(initialState, (build) => {
  build.addCase(load, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        albums: action.payload,
        isReady: true,
      }
    );
  });
  build.addCase(unload, () => {
    return initialState;
  });
});

export const trendingAlbumsAction = {
  load,
  unload,
};

export default reducer;
