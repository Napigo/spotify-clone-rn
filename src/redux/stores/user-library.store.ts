import { createAction, createReducer } from "@reduxjs/toolkit";
import { IImage } from "../../modules/api/album.apis";

export enum LibraryItemType {
  PLAYLIST = "playlist",
  ALBUM = "album",
  ARTIST = "artist",
}

export interface LibraryItem {
  type: LibraryItemType;
  data: LibraryPlaylist | LibraryAlbum | LibraryArtist;
}

export type LibraryPlaylist = {
  id: string;
  name: string;
  images: IImage[];
  ownerName: string;
  type: string;
};
export type LibraryAlbum = {
  id: string;
  name: string;
  artistName: string;
  coverPhoto: string;
};

export type LibraryArtist = {
  id: string;
  name: string;
  photoCover: string;
};

interface UserLibraryState {
  isReady: boolean;
  items: LibraryItem[];
}

const initialState: UserLibraryState = {
  isReady: false,
  items: [],
};

const load = createAction<LibraryItem[]>("user-library/load");
const unload = createAction<LibraryItem[]>("user-library/unload");

const reducer = createReducer<UserLibraryState>(initialState, (build) => {
  build.addCase(load, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        isReady: true,
        items: action.payload,
      }
    );
  });
  build.addCase(unload, () => initialState);
});

export const userLibraryAction = {
  load,
  unload,
};
export default reducer;
