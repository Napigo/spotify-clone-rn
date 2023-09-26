import { createReducer, createAction } from "@reduxjs/toolkit";

interface PlayerState {
  active: boolean;
  isPlaying?: boolean;
  trackSeed?: number;
  dominanceColor?: string;
  source: TrackSource | null;
}

export interface TrackSource {
  id: string;
  title: string;
  label: string;
  uri: string;
  coverPhoto: string;
}

export const initialState: PlayerState = {
  active: false,
  isPlaying: false,
  trackSeed: 0,
  dominanceColor: "",
  source: null,
};

const setActive = createAction<boolean>("player/set-active");
const isPlaying = createAction<boolean>("player/is-playing");
const updateTrackSeed = createAction<number>("player/update-track-seed");
const loadSource = createAction<TrackSource>("player/load-source");
const clearPlayer = createAction<void>("player/clear-player");

const reducer = createReducer<PlayerState>(initialState, (build) => {
  build.addCase(setActive, (state, action) => {
    return Object.assign(state, {}, { active: action.payload });
  });
  build.addCase(isPlaying, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        isPlaying: action.payload,
      }
    );
  });
  build.addCase(updateTrackSeed, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        trackSeed: action.payload,
      }
    );
  });
  build.addCase(loadSource, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        source: action.payload,
      }
    );
  });
  build.addCase(clearPlayer, () => initialState);
});

export const playerAction = {
  setActive,
  isPlaying,
  updateTrackSeed,
  loadSource,
  clearPlayer,
};

export default reducer;
