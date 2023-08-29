import { AxiosError } from "axios";
import { IImage } from "./album.apis";
import { apis } from ".";

export interface MyLikesSongsResponse {
  href: string;
  limit: 20;
  next: string;
  previous: null;
  total: number;
  items: SavedTrackItem[];
}

export interface SavedTrackItem {
  track: {
    album: SavedAlbumObject;
    artists: SavedTrackArtistObject[];
    disc_number: number;
    duration_ms: number;
    href: string;
    id: string;
    is_playable: string;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  };
}

export interface SavedAlbumObject {
  album_type: string;
  total_tracks: number;
  id: string;
  images: IImage[];
  name: string;
  type: string;
  genres: string[];
  label: string;
  popularity: number;
  artists: SavedAlbumArtistObject[];
}

export interface SavedAlbumArtistObject {
  id: string;
  name: string;
}

export interface SavedTrackArtistObject {
  id: string;
  name: string;
  images: IImage[];
}

/**
 * Pagination required
 */
export async function fetchMyLikesSongs(
  limit: number = 20,
  offset: number = 0
): Promise<MyLikesSongsResponse> {
  try {
    const response = await apis.callApi({
      url: `v1/me/tracks?offset=${offset}&limit=${limit}`,
      method: "get",
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      return Promise.reject({
        code: response.status,
        data: response.data,
      });
    }
  } catch (err) {
    const error = err as AxiosError;
    return Promise.reject({
      code: error.code,
      data: error.response?.data,
    });
  }
}
