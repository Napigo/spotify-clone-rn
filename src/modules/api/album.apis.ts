import axios from "axios";
import { get } from "../secure-storage";
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
