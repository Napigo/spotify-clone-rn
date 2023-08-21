import { ParamListBase } from "@react-navigation/native";

export type AppStackParamList = {
  Auth: undefined;
  SpotifyWebAuth: undefined;
  Core: undefined;
};

/**
 *
 */
export type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: { screen: K; params?: T[K]; initial?: boolean };
}[keyof T];
