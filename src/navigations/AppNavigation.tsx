import React, { useEffect, useMemo, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./types";
import { useThemeColors } from "../theme/ThemeProvider";
import {
  NavigationContainer,
  NavigationProp,
  Theme,
  useNavigation,
} from "@react-navigation/native";
import { LoginView } from "../views/Login";
import { SpotifyWebAuthview } from "../views/Login/SpotifyWebAuth";
import { SessionLoaderView } from "../views/Login/SessionLoader";
import { CoreNavigation } from "./CoreNavigation";
import { get } from "../modules/secure-storage";

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigation: React.FC = () => {
  const { scheme } = useThemeColors();

  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const appTheme = useMemo(() => {
    const themes: Theme = {
      dark: true,
      colors: {
        primary: scheme.primary[500],
        background: scheme.systemBackground,
        card: scheme.systemBackground,
        text: scheme.systemTint,
        border: scheme.systemGray,
        notification: scheme.systemGray,
      },
    };
    return themes;
  }, [scheme]);

  useEffect(() => {
    get("access_token").then((result) => {
      console.log(result);
      if (result) {
        setAuthenticated(true);
      }
    });
  }, []);

  return (
    <NavigationContainer theme={appTheme}>
      <AppStack.Navigator
        initialRouteName={"Core"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="Auth" component={LoginView} />
        <AppStack.Screen
          name="SpotifyWebAuth"
          component={SpotifyWebAuthview}
          options={{ animation: "slide_from_bottom" }}
        />
        <AppStack.Screen name="SessionLoader" component={SessionLoaderView} />
        <AppStack.Screen name="Core" component={CoreNavigation} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
