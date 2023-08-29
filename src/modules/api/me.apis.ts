import { AxiosError } from "axios";
import { IImage } from "./album.apis";
import { apis } from ".";

export interface UserProfileResponse {
  country: string;
  display_name: string;
  id: string;
  images: IImage[];
  product: string;
  type: string;
  uri: string;
}

export async function getUserProfile(): Promise<UserProfileResponse> {
  try {
    const response = await apis.callApi({
      url: `v1/me`,
      method: "get",
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      return Promise.reject({
        code: 500,
        data: { message: "No Data available" },
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
