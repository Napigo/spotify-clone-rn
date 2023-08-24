import { createAction, createReducer } from "@reduxjs/toolkit";
import { IImage } from "../../modules/api/album.apis";

export type RecommendedArtist = {
  id: string;
  name: string;
  photoCover: string | null;
};

interface RecommendedArtistsState {
  isReady: boolean;
  artists: RecommendedArtist[];
}

const initialState: RecommendedArtistsState = {
  isReady: false,
  artists: [],
};
const load = createAction<RecommendedArtist[]>("recommended-artists/load");
const unload = createAction<RecommendedArtist[]>("recommended-artists/unload");

const reducer = createReducer<RecommendedArtistsState>(
  initialState,
  (build) => {
    build.addCase(load, (state, action) => {
      return Object.assign(
        state,
        {},
        {
          isReady: true,
          artists: action.payload,
        }
      );
    });
    build.addCase(unload, () => initialState);
  }
);

export const recommendedArtistsAction = {
  load,
  unload,
};
export default reducer;
