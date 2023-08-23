import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { get, save } from "../secure-storage";
import { refreshAccessToken } from "../auth";

let isRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

class ApiCaller {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_SPOTIFY_BASE_URL ?? "",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
    });

    this.configureInterceptors();
  }

  configureInterceptors() {
    this.axiosInstance.interceptors.request.use(this.handleApiRequest);
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      this.onError
    );
  }

  async handleApiRequest(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    const accessToken = await get("access_token");
    config.headers.set("Authorization", `Bearer ${accessToken}`);
    return config;
  }

  /**
   * Interceptors
   */
  async onError(
    error: AxiosError
  ): Promise<AxiosError | InternalAxiosRequestConfig> {
    /**
     * We going to handle some middleware action when api error occurs here
     */
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status === 401) {
      if (isRefreshing) {
        // during refreshing we register this failing calls into the queue,
        // all in the queue are request objects which are waiting for the same new fresh token to be available
        // once new token is refreshed and rehydrated, will iterate thru this refreshSubscribers list and
        // run each callbacks registered
        return new Promise((resolve) => {
          refreshSubscribers.push((accessToken) => {
            originalRequest?.headers.set(
              "Authorization",
              `Bearer ${accessToken}`
            );
            resolve(this.axiosInstance(originalRequest));
          });
        });
      }
      // console.log(isRefreshing);

      try {
        // console.log("Trying to refresh access token");
        // console.log(originalRequest);
        isRefreshing = true;
        // console.log(isRefreshing);
        const result = await refreshAccessToken();
        // console.log(result);
        if (result) {
          const { access_token, refresh_token } = result;
          //updating the new token into secure storage
          save("access_token", access_token);
          save("refresh_token", refresh_token);

          // retry all the original requests calling here
          refreshSubscribers.forEach((subscriber) => subscriber(access_token));
          refreshSubscribers = [];

          // also retry for the current request
          originalRequest.headers.set(
            "Authorization",
            `Bearer ${access_token}`
          );
        }
        return this.axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }

  async callApi({ url = "", method = "get", params = {}, body = {} }) {
    return await this.axiosInstance({
      url: url,
      method: method,
      params: params,
      data: method === "get" ? undefined : { ...body },
    });
  }
}

export const apis = new ApiCaller();
