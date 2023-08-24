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
