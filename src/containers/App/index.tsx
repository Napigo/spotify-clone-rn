import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { get, remove, save } from "../../modules/secure-storage";
import { useThemeColors } from "../../theme/ThemeProvider";
import { useFetchInitialData } from "./usePrefetchData";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

type AuthContextProps = {
  isAuthenticated: boolean;
  setupSession: (
    access_token: string,
    refresh_token: string,
    expires_in: number
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  logout: () => {},
  setupSession: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  /**
   * Indicate if the app have loaded all assest, and only after we have check for user auth (done)
   * will turn true means the app will start render the main content
   */
  const [appIsReady, setIsReady] = useState<boolean>(false);

  const { isDone: isInitialDataFetchDone } = useFetchInitialData();

  const { scheme } = useThemeColors();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && isInitialDataFetchDone) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 0);
    }
  }, [appIsReady, isInitialDataFetchDone]);

  const logout = useCallback(async () => {
    /**
     * Clear all the cache tokens and session from secure storage
     */
    try {
      await remove("access_token");
      await remove("refresh_token");
      await remove("expires_in");

      setAuthenticated(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const setupSession = useCallback(
    async (access_token: string, refresh_token: string, expires_in: number) => {
      await save("access_token", access_token);
      await save("refresh_token", refresh_token);
      await save("expires_in", expires_in);
      setAuthenticated(true);
    },
    []
  );

  useEffect(() => {
    checkSession().then((result) => {
      if (result) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setIsReady(true);
    });
  }, []);

  const checkSession = async () => {
    const accessToken = await get("access_token");
    const refreshToken = await get("refresh_token");

    if (accessToken && refreshToken) {
      return true;
    }
    return false;
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setupSession: setupSession,
        logout: logout,
      }}
    >
      <View
        style={{ flex: 1, backgroundColor: scheme.systemBackground }}
        onLayout={onLayoutRootView}
      >
        {children}
      </View>
    </AuthContext.Provider>
  );
};
