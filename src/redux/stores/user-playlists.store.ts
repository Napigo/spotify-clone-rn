import { createAction, createReducer } from "@reduxjs/toolkit";
import { IImage } from "../../modules/api/album.apis";

export interface CurrentUserPlaylist {
  id: string;
  name: string;
  images: IImage[];
  ownerName: string;
  type: string;
}
interface CurrentUserPlaylistsState {
  isReady: boolean;
  total: number;
  playlists: CurrentUserPlaylist[];
}

const initialState: CurrentUserPlaylistsState = {
  isReady: false,
  total: 0,
  playlists: [],
};

const load = createAction<{ playlists: CurrentUserPlaylist[]; total: number }>(
  "current-user-playlists/load"
);
const unload = createAction<CurrentUserPlaylist[]>(
  "current-user-playlists/unload"
);
const updateList = createAction<CurrentUserPlaylist[]>(
  "current-user-playlists/update-list"
);

const reducer = createReducer<CurrentUserPlaylistsState>(
  initialState,
  (build) => {
    build.addCase(load, (state, action) => {
      const { playlists, total } = action.payload;
      return Object.assign(
        state,
        {},
        {
          isReady: true,
          playlists: playlists,
          total: total,
        }
      );
    });
    build.addCase(updateList, (state, action) => {
      return Object.assign(
        state,
        {},
        {
          playlists: action.payload,
        }
      );
    });
    build.addCase(unload, () => initialState);
  }
);

export const currentUserPlaylistsAction = {
  load,
  unload,
  updateList,
};

export default reducer;
