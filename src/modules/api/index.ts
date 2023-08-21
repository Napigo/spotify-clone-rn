import axios, { AxiosInstance, AxiosError } from "axios";

class ApiCaller {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_SPOTIFY_BASE_URL ?? "",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Accept: "",
      },
    });
  }

  /**
   * Interceptors
   */
  async onError(error: AxiosError): Promise<AxiosError> {
    /**
     * We going to handle some middleware action when api error occurs here
     */
    return Promise.reject(error);
  }

  /**
   * @TODO
   * @returns
   */
  withAuthHeader() {
    return {};
  }

  async call({
    url = "",
    method = "get",
    params = {},
    body = {},
    withAuth = false,
  }) {
    return await this.axiosInstance({
      url,
      method: method,
      params: params,
      headers: withAuth ? this.withAuthHeader() : {},
      data: { ...body },
    });
  }
}

export const apis = new ApiCaller();
