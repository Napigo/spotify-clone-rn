import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { UIText } from "../../common/UIText";
import { UIPressable } from "../../common/UIPressable";
import { Ionicons } from "@expo/vector-icons";
import {
  SCREEN_EDGE_SPACING,
  STANDARD_TOPBAR_HEIGHT,
  TOP_BAR_ICON_SIZE,
} from "../../../theme/constants";
import { useAuth } from "../../../containers/Auth";
import { useDynamicPlayer } from "../../DynamicPlayer";

export const HomeHeader: React.FC = () => {
  const styles = useStyles();

  const { logout } = useAuth();

  const { minimize, openFull } = useDynamicPlayer();

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
            size={TOP_BAR_ICON_SIZE}
            color={styles.icon.color}
          />
        </UIPressable>
        <UIPressable onPress={minimize}>
          <Ionicons
            name="timer-outline"
            size={TOP_BAR_ICON_SIZE}
            color={styles.icon.color}
          />
        </UIPressable>
        <UIPressable>
          <Ionicons
            name="settings-outline"
            size={TOP_BAR_ICON_SIZE}
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
      paddingHorizontal: SCREEN_EDGE_SPACING,
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
