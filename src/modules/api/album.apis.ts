import { AxiosResponse } from "axios";
import { apis } from ".";

export interface NewReleaseResponse {
  albums: AlbumPayload;
}

export interface AlbumPayload {
  href?: string;
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
  items: ReleaseItem[];
}
export interface ReleaseItem {
  id: string;
  images: IImage[];
  name: string;
}

export interface IImage {
  url: string;
  height: string;
  width: string;
}

export interface AvailableGenresResponse {
  genres: string[];
}

export interface TrendingAlbumResponse {
  tracks: {
    album: {
      id: string;
      name: string;
      images: IImage[];
      artists: {
        id: string;
        name: string;
      }[];
    };
    artists: {
      id: string;
      name: string;
      images: IImage[];
    }[];
  }[];
}

/**
 *
 */
export async function fetchNewRelease(limit = 20): Promise<NewReleaseResponse> {
  const response = await apis.callApi({
    url: `v1/browse/new-releases?limit=${limit}`,
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
}

/**
 *
 * @param limit
 * @returns
 */
export async function fetchRecommendedGenres(limit = 5): Promise<string[]> {
  const response = await apis.callApi({
    url: `v1/recommendations/available-genre-seeds`,
    method: "get",
  });

  if (response.status === 200 && response.data) {
    const { genres } = response.data as AvailableGenresResponse;
    if (genres && genres.length > 0) {
      return genres.slice(0, 3);
    } else {
      return Promise.reject({
        code: null,
        data: { message: "no genres available" },
      });
    }
  } else {
    return Promise.reject({
      code: response.status,
      data: response.data,
    });
  }
}

/**
 *
 * @param limit
 * @param genres
 * @returns
 */
export async function fetchTrendingAlbums(
  limit = 50,
  genres: string[]
): Promise<TrendingAlbumResponse> {
  const seedGenres = genres.join(",");

  try {
    const response = await apis.callApi({
      url: `v1/recommendations?seed_genres=${seedGenres}&limit=${limit}`,
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
  } catch (err: unknown) {
    const error = err as AxiosResponse;
    return Promise.reject({
      code: error.status,
      data: error.data,
    });
  }
}
