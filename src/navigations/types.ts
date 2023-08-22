import { ParamListBase } from "@react-navigation/native";

export type AuthStackParamList = {
  Auth: undefined;
  SpotifyWebAuth: undefined;
};

export type CoreStackParamList = {
  Tab: SubNavigator<TabStackParamList>;
  Setting: undefined;
  Profile: undefined;
};

export type TabStackParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
};

/**
 *
 */
export type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: { screen: K; params?: T[K]; initial?: boolean };
}[keyof T];
