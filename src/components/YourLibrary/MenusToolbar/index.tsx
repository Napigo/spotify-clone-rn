import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { UIChip } from "../../common/UIChip";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";

export const MenusToolbar: React.FC = () => {
  const styles = useStyles();
  return (
    <ScrollView
      horizontal
      style={{ flex: 1 }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollingContainer}
    >
      <UIChip>Playlist</UIChip>
      <UIChip>Podcasts & Shows</UIChip>
      <UIChip>Albums</UIChip>
      <UIChip>Artists</UIChip>
      <UIChip>Downloaded</UIChip>
    </ScrollView>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    scrollingContainer: {
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: SCREEN_EDGE_SPACING,
    },
  });
};
