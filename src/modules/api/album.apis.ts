import axios from "axios";
import { get } from "../secure-storage";
import { apis } from ".";

export interface NewReleaseResponse extends AlbumMetadata {
  items: ReleaseItem[];
}

export interface AlbumMetadata {
  href?: string;
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
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
export async function fetchNewRelease(): Promise<NewReleaseResponse> {
  const response = await apis.callApi({
    url: "v1/browse/new-releases",
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
