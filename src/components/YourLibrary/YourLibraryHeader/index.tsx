import React from "react";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import {
  SCREEN_EDGE_SPACING,
  STANDARD_TOPBAR_HEIGHT,
  TOP_BAR_ICON_SIZE,
} from "../../../theme/constants";
import { UIText } from "../../common/UIText";
import { UIPressable } from "../../common/UIPressable";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const YourLibraryHeader: React.FC = () => {
  const styles = useStyles();

  const a = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          marginTop: a.top,
        },
      ]}
    >
      <UIText level="title2" style={styles.title}>
        Your Library
      </UIText>
      <View style={styles.controls}>
        <UIPressable>
          <Feather
            name="search"
            size={TOP_BAR_ICON_SIZE}
            color={styles.icon.color}
          />
        </UIPressable>
        <UIPressable>
          <Feather
            name="plus"
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
      height: STANDARD_TOPBAR_HEIGHT,
      width: "100%",
      flexDirection: "row",
      alignItems: "flex-end",
      paddingHorizontal: SCREEN_EDGE_SPACING,
      justifyContent: "space-between",
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
