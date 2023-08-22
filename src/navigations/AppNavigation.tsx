import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./types";
import { useThemeColors } from "../theme/ThemeProvider";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { LoginView } from "../views/Login";
import { SpotifyWebAuthview } from "../views/Login/SpotifyWebAuth";
import { SessionLoaderView } from "../views/Login/SessionLoader";
import { CoreNavigation } from "./CoreNavigation";

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigation: React.FC = () => {
  const { scheme } = useThemeColors();

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

  return (
    <NavigationContainer theme={appTheme}>
      <AppStack.Navigator
        initialRouteName="Auth"
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
