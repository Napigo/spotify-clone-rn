import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-store";
import { UICollection } from "../../common/UICollection";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";

export const TrendingAlbums: React.FC = () => {
  const styles = useStyles();

  const { isReady, albums } = useSelector(
    (state: AppState) => state.TrendingAlbumsStore
  );

  if (!isReady) {
    return null;
  }

  return (
    <UICollection>
      <View style={styles.container}></View>
    </UICollection>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      height: 160,
      backgroundColor: "hotpink",
    },
  });
};
