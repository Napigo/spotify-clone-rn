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
  Home: SubNavigator<HomeStackParamList>;
  Search: undefined;
  Library: SubNavigator<HomeStackParamList>;
};

export type HomeStackParamList = {
  Root: undefined;
  LikedSongs: undefined;
};

export type LibraryStackParamList = {
  Root: undefined;
  LikedSongs: undefined;
};
/**
 *
 */
export type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: { screen: K; params?: T[K]; initial?: boolean };
}[keyof T];
