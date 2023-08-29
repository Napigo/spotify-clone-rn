import { AxiosError } from "axios";
import { apis } from ".";
import { IImage } from "./album.apis";

export interface FeaturedPlaylistResponse {
  playlists: {
    items: {
      id: string;
      description: string;
      images: IImage[];
      name: string;
    }[];
  };
}

/**
 *
 * @param limit
 */
export async function fetchFeaturedPlaylist(
  limit = 20
): Promise<FeaturedPlaylistResponse> {
  try {
    const response = await apis.callApi({
      url: `v1/browse/featured-playlists?limit=${limit}&country=SG`,
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

export interface CategoryPlaylistResponse {
  playlists: {
    items: {
      images: IImage[];
    }[];
  };
}
export async function fetchCategoryPlaylist(
  id: string
): Promise<CategoryPlaylistResponse> {
  try {
    const response = await apis.callApi({
      url: `v1/browse/categories/${id}/playlists`,
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

export interface CurrentUserPlaylistsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: UserPlaylistObject[];
}

export interface UserPlaylistObject {
  description: string;
  href: string;
  id: string;
  images: IImage[];
  name: string;
  owner: {
    id: string;
    display_name: string;
  };
  public: boolean;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

export async function fetchCurrentUserPlaylists(
  limit = 20,
  offset = 0
): Promise<CurrentUserPlaylistsResponse> {
  try {
    const response = await apis.callApi({
      url: `v1/me/playlists?offset=${offset}&limit=${limit}`,
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
