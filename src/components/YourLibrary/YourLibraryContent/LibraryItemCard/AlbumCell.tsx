import React from "react";
import { LibraryAlbum } from "../../../../redux/stores/user-library.store";
import { useThemeColors } from "../../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { UIText } from "../../../common/UIText";

const Component: React.FC<LibraryAlbum> = ({
  id,
  coverPhoto,
  name,
  artistName,
}) => {
  const styles = useStyles();
  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={coverPhoto} style={{ flex: 1 }} />
      </View>

      <View style={styles.textContainer}>
        <UIText level="body" style={styles.playlistName}>
          {name}
        </UIText>
        <UIText level="caption" style={styles.label}>
          Album . {artistName}
        </UIText>
      </View>
    </>
  );
};

export const AlbumCell = React.memo(Component);

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    imageContainer: {
      height: "100%",
      aspectRatio: 1,
      overflow: "hidden",
    },
    textContainer: {
      flexDirection: "column",
      gap: 5,
    },
    playlistName: {
      fontWeight: "500",
    },
    label: {
      color: scheme.systemGray,
      fontWeight: "500",
    },
  });
};
