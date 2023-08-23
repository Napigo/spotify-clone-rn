import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { get, save } from "../secure-storage";
import { refreshAccessToken } from "../auth";

let refreshSubscribers: ((accessToken: string) => void)[] = [];

class ApiCaller {
  axiosInstance: AxiosInstance;
  private isRefreshing: boolean = false;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_SPOTIFY_BASE_URL ?? "",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
    });
    this.onError = this.onError.bind(this);
    this.handleApiRequest = this.handleApiRequest.bind(this);
    this.cancelAll = this.cancelAll.bind(this);
    this.configureInterceptors();
  }

  configureInterceptors() {
    this.axiosInstance.interceptors.request.use(this.handleApiRequest);
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      this.onError
    );
  }

  cancelAll() {}

  async handleApiRequest(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    const accessToken = await get("access_token");
    config.headers.set("Authorization", `Bearer ${accessToken}`);
    return config;
  }

  async onError(
    error: AxiosError
  ): Promise<AxiosError | InternalAxiosRequestConfig> {
    return new Promise((resolve, reject) => {
      if (error.response?.status === 401) {
        const originalRequest = error.config as InternalAxiosRequestConfig;

        console.log(
          `REQUEST FAILED FOR ${originalRequest.url} with token of ${originalRequest.headers.Authorization}`
        );

        // Likely due to token expired
        if (this.isRefreshing) {
          console.log(
            "REFRESHING IN PROGRESS : pushing this failed request to queue"
          );

          refreshSubscribers.push((accessToken) => {
            originalRequest?.headers.set(
              "Authorization",
              `Bearer ${accessToken}`
            );
            resolve(this.axiosInstance(originalRequest));
          });
        } else {
          this.isRefreshing = true;

          console.log("PROCEEDING TO FETCH NEW TOKEN");
          refreshAccessToken()
            .then(async (accessToken) => {
              console.log("NEW TOKEN", accessToken);

              await save("access_token", accessToken);

              console.log("SUCCESSFULLY RETRIEVE NEW TOKEN");

              // retry all the previous failed request

              refreshSubscribers.forEach((subscriber) =>
                subscriber(accessToken)
              );
              refreshSubscribers = [];

              originalRequest.headers.set(
                "Authorization",
                `Bearer ${accessToken}`
              );
              this.isRefreshing = false;
              console.log("RETRYING ORIGINAL REQUEST");
              resolve(this.axiosInstance(originalRequest));
            })
            .catch((err) => {
              this.isRefreshing = false;
              reject(err);
            });
        }
      }
    });
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

// /**
//  * Interceptors
//  */
// async onError(
//   error: AxiosError
// ): Promise<AxiosError | InternalAxiosRequestConfig> {
//   console.log("isRefreshing:", this.isRefreshing);
//   /**
//    * We going to handle some middleware action when api error occurs here
//    */
//   const originalRequest = error.config as InternalAxiosRequestConfig;

//   if (error.response?.status === 401) {
//     if (this.isRefreshing) {
//       console.log("OPS WE ARE REFRESHING");
//       // during refreshing we register this failing calls into the queue,
//       // all in the queue are request objects which are waiting for the same new fresh token to be available
//       // once new token is refreshed and rehydrated, will iterate thru this refreshSubscribers list and
//       // run each callbacks registered
//       return new Promise((resolve) => {
//         refreshSubscribers.push((accessToken) => {
//           originalRequest?.headers.set(
//             "Authorization",
//             `Bearer ${accessToken}`
//           );
//           resolve(this.axiosInstance(originalRequest)); // this is a retry
//         });
//       });
//     }
//     // console.log(isRefreshing);

//     try {
//       // console.log(originalRequest);
//       this.isRefreshing = true;
//       console.log("(Point A) isRefreshing set to ", this.isRefreshing);

//       console.log("new  refresh token");
//       const { access_token, refresh_token } = await refreshAccessToken();
//       // console.log(result);
//       //updating the new token into secure storage
//       await save("access_token", access_token);
//       await save("refresh_token", refresh_token);

//       // retry all the original requests calling here

//       console.log("Executing the old failed request : ", refreshSubscribers);
//       refreshSubscribers.forEach((subscriber) => subscriber(access_token));
//       refreshSubscribers = [];

//       // also retry for the current request
//       originalRequest.headers.set("Authorization", `Bearer ${access_token}`);
//       console.log("retrying api call");
//       this.isRefreshing = false;
//       return this.axiosInstance(originalRequest);
//     } catch (refreshError) {
//       this.isRefreshing = false;
//       return Promise.reject(refreshError);
//     }
//   }
//   return Promise.reject(error);
// }
