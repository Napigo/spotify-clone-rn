import queryString from "query-string";
import axios, { AxiosError } from "axios";
import { get } from "../secure-storage";

const Buffer = require("buffer").Buffer;

const authBaseURL = process.env.EXPO_PUBLIC_SPOTIFY_AUTH_BASEURL;
const tokenBaseURL = process.env.EXPO_PUBLIC_SPOTIFY_TOKEN_BASEURL;
const apiId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = "http://www.napigo.co";
var scope = "user-read-private user-read-email";

const authHeader = {
  Authorization:
    "Basic " +
    new Buffer.from(
      process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID +
        ":" +
        process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET
    ).toString("base64"),
};

export type AccessTokenResponse = {
  access_token: string;
  token_type: string;
  scope?: string;
  expires_in: number;
  refresh_token?: string;
};
/**
 *
 * @returns
 */
export function createAuthorizationURL() {
  return encodeURI(
    `${authBaseURL}?response_type=code&client_id=${apiId}&scope=${scope}&redirect_uri=${redirectUri}&show_dialog=true`
  );
}

/**
 *
 * @param url
 */
export async function handleAuthRedirect(
  url: string
): Promise<AccessTokenResponse | void> {
  return new Promise((resolve, reject) => {
    const parsedUrl = queryString.parseUrl(url);
    const query = parsedUrl.query;
    if ("code" in query) {
      const { code } = query;
      if (code) {
        const redirectUri = "http://www.napigo.co";
        axios({
          url: tokenBaseURL,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            ...authHeader,
          },
          data: {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri,
          },
        })
          .then((result) => {
            resolve(result.data as AccessTokenResponse);
          })
          .catch((err: AxiosError) => {
            reject(err.response?.data);
          });
      }
    }
  });
}

export async function refreshAccessToken(): Promise<{
  access_token: string;
  refresh_token: string;
} | null> {
  return new Promise((resolve) => {
    get("refresh_token").then((refreshToken) => {
      if (refreshToken) {
        axios({
          url: tokenBaseURL,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            ...authHeader,
          },
          data: {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          },
        }).then((result) => {
          const { data } = result;
          resolve({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          });
        });
      }
      // ignore this call // lets think about this here, why should we ignore when refresh_token is not available?
      // seems like this func is calling multiple times !!!!
      /**
       * @NOTED should not called multiple times, only onces per 401 error,
       * please investigate why refreshAccessToken is called more than once
       */
      resolve(null);
    });
  });
}
