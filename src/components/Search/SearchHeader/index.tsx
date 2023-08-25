import React from "react";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import {
  SCREEN_EDGE_SPACING,
  STANDARD_TOPBAR_HEIGHT,
} from "../../../theme/constants";
import { UIText } from "../../common/UIText";
import { Ionicons } from "@expo/vector-icons";
import { UIPressable } from "../../common/UIPressable";

export const SearchHeader: React.FC = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <UIText level="title2" style={styles.title}>
        Search
      </UIText>
      <UIPressable>
        <Ionicons name="camera-outline" size={28} style={styles.icon} />
      </UIPressable>
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
