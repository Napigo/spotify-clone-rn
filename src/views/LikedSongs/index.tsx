import React from "react";
import { useThemeColors } from "../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";

export const LikedSongsView: React.FC = () => {
  const styles = useStyles();
  return <View style={styles.container}></View>;
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: scheme.systemBackground,
    },
  });
};
