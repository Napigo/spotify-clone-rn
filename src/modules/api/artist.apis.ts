import { AxiosError } from "axios";
import { apis } from ".";
import { TrendingAlbumResponse } from "./album.apis";

/**
 *
 * @deprecated - to reuse the same recommendation api seeds from genres to get
 * list of artist
 * @param limit
 * @param ids
 */
export async function fetchRecommendedArtist(
  limit = 20,
  artists: string[]
): Promise<TrendingAlbumResponse> {
  try {
    const response = await apis.callApi({
      url: `v1/recommendations?limit=${limit}&artists=${artists.join(",")}`,
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
