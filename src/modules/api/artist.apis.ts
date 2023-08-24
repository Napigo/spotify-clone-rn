import { AxiosError } from "axios";
import { apis } from ".";
import { IImage } from "./album.apis";

interface ArtistsResponse {
  artists: {
    id: string;
    name: string;
    images: IImage[];
  }[];
}

/**
 *
 * list of artist
 * @param limit
 * @param ids
 */
export async function fetchArtists(
  artists: string[]
): Promise<ArtistsResponse> {
  try {
    const response = await apis.callApi({
      url: `v1/artists?ids=${artists.join(",")}`,
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
