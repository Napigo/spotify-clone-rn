import React, { useMemo } from "react";
import { useThemeColors } from "../theme/ThemeProvider";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { CoreNavigation } from "./CoreNavigation";
import { AuthNavigation } from "./AuthNavigation";
import { useAuth } from "../containers/Auth";
import { AppContainer } from "../containers/App";
import { View } from "react-native";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";

export const AppNavigation: React.FC = () => {
  const { scheme } = useThemeColors();

  const { isAuthenticated } = useAuth();

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
      {isAuthenticated ? (
        <AppContainer>
          <CoreNavigation />
        </AppContainer>
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};
