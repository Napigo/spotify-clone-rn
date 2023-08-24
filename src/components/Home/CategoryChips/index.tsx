import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { UIChip } from "../../common/UIChip";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";

export const CategoryChips: React.FC = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <UIChip>Music</UIChip>
      <UIChip>Podcast & Shows</UIChip>
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: scheme.systemBackground,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: SCREEN_EDGE_SPACING,
      gap: 10,
    },
  });
};
