import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { UIText } from "../../common/UIText";
import { UIPressable } from "../../common/UIPressable";
import { Ionicons } from "@expo/vector-icons";
import { STANDARD_TOPBAR_HEIGHT } from "../../../theme/constants";
import { useAuth } from "../../../containers/App/AuthContainer";

const ICON_SIZE = 26;

export const HomeHeader: React.FC = () => {
  const styles = useStyles();

  const { logout } = useAuth();

  const greeting = useMemo(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  }, []);

  return (
    <View style={styles.container}>
      <UIText level="title2" style={styles.title}>
        Good {greeting}
      </UIText>
      <View style={styles.controls}>
        <UIPressable onPress={() => logout()}>
          <Ionicons
            name="notifications-outline"
            size={ICON_SIZE}
            color={styles.icon.color}
          />
        </UIPressable>
        <UIPressable>
          <Ionicons
            name="timer-outline"
            size={ICON_SIZE}
            color={styles.icon.color}
          />
        </UIPressable>
        <UIPressable>
          <Ionicons
            name="settings-outline"
            size={ICON_SIZE}
            color={styles.icon.color}
          />
        </UIPressable>
      </View>
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      height: STANDARD_TOPBAR_HEIGHT,
      width: "100%",
      backgroundColor: scheme.systemBackground,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    title: {
      fontWeight: "700",
    },
    controls: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 20,
    },
    icon: {
      color: scheme.systemTint,
    },
  });
};
