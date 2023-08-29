import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { UIPressable } from "../../common/UIPressable";
import { UIText } from "../../common/UIText";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export const ListHeader: React.FC = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <UIPressable style={styles.sortButton}>
        <FontAwesome name="sort" color={styles.icon.color} />
        <UIText>Recents</UIText>
      </UIPressable>
      <UIPressable>
        <MaterialCommunityIcons
          name="view-dashboard-outline"
          size={24}
          color={styles.icon.color}
        />
      </UIPressable>
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      height: 50,
      width: "100%",
      backgroundColor: scheme.systemBackground,
      flexDirection: "row",
      alignItems: "flex-start",
      paddingTop: 10,
      justifyContent: "space-between",
    },
    sortButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    icon: {
      color: scheme.systemTint,
    },
  });
};
