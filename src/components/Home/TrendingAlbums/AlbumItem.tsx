import React from "react";
import { TrendingAlbum } from "../../../redux/stores/trending-albums.store";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { UIText } from "../../common/UIText";
import { Image } from "expo-image";

export const AlbumItem: React.FC<TrendingAlbum> = ({
  albumName,
  coverImage,
  artistName,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Image source={{ uri: coverImage }} style={styles.image} />
      <View style={styles.textContent}>
        <UIText level="caption" numberOfLines={1} style={styles.albumName}>
          {albumName}
        </UIText>
        <UIText level="caption" style={styles.artistName} numberOfLines={1}>
          by - {artistName}
        </UIText>
      </View>
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      flexDirection: "column",
      height: "100%",
      width: "100%",
    },
    image: {
      width: "100%",
      aspectRatio: 1,
    },
    textContent: {
      flexDirection: "column",
      gap: 0,
      marginTop: 10,
    },
    albumName: {
      fontWeight: "500",
    },
    artistName: {
      color: scheme.systemGray,
    },
  });
};
