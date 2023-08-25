import React from "react";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";
import { UIPressable } from "../../common/UIPressable";
import { borderRadius } from "../../../theme/radius";
import { Ionicons } from "@expo/vector-icons";
import { UIText } from "../../common/UIText";

export const SearchBar: React.FC = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <UIPressable style={styles.inputContainer}>
        <Ionicons name="search" size={24} style={styles.icon} />
        <UIText level="body" style={styles.placeholder}>
          What do you want to listen to?
        </UIText>
      </UIPressable>
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      height: "100%",
      //   backgroundColor: scheme.primary,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: SCREEN_EDGE_SPACING,
      paddingVertical: 10,
      gap: 10,
    },
    inputContainer: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: "white",
      borderRadius: borderRadius.sm,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      gap: 10,
    },
    icon: {
      color: scheme.systemBackground,
    },
    placeholder: {
      color: scheme.systemBackground,
      fontWeight: "500",
    },
  });
};
