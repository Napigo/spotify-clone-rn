import queryString from "query-string";
import axios, { AxiosError } from "axios";
import base64 from "react-native-base64";

const Buffer = require("buffer").Buffer;

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
  const baseURL = process.env.EXPO_PUBLIC_SPOTIFY_AUTH_BASEURL;
  const apiId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = "http://www.napigo.co";
  var scope = "user-read-private user-read-email";

  return encodeURI(
    `${baseURL}?response_type=code&client_id=${apiId}&scope=${scope}&redirect_uri=${redirectUri}&show_dialog=true`
  );
}

export function isRedirectCallback(url: string) {
  if (url.includes("napigo.co?code")) {
  }
}

/**
 * Example URI
 * http://www.napigo.co/?code=AQAXWmg_D6rwC30BVMaUTv7LN61VfjNISkz861RLhF0e8lYm01BkIUjjUpNpI9r0alj0bAEYdJt5iDMDJ-KsNwjwnOJ7Zu7wyL5OBu2sTPYvYY8oeF2tq0Inso5gOd09uYiHFCnnkVc7Rz5uCQORwniQ1y_pXBzXEOrQ3kcAAWoJNo9fP5ZvHNca8GQR-TJPQn0DQxlbTizmtWVN
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
        const authHeader = {
          Authorization:
            "Basic " +
            new Buffer.from(
              process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID +
                ":" +
                process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        };
        const redirectUri = "http://www.napigo.co";
        axios({
          url: "https://accounts.spotify.com/api/token",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            ...authHeader,
          },
          data: {
            grant_type: "client_credentials",
            code: code as string,
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

export async function exchangeForAccessToken() {}

export function isRefreshNeeded() {}
