import React, { useMemo } from "react";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { CurrentUserPlaylist } from "../../../redux/stores/user-playlists.store";
import { Image } from "expo-image";
import { useAssets } from "expo-asset";
import { UIText } from "../../common/UIText";
import { capitalize } from "lodash";

type PlaylistListItemProps = CurrentUserPlaylist;
export const PlaylistListItem: React.FC<PlaylistListItemProps> = ({
  name,
  images,
  ownerName,
  type,
}) => {
  const styles = useStyles();

  const [assets] = useAssets([
    require("../../../../assets/images/playlist-cover.png"),
  ]);

  const imageUrl = useMemo(() => {
    if (assets) {
      if (images.length > 0) {
        return images[0].url ?? assets[0].uri;
      }
      return assets[0].uri;
    }
  }, [images, assets]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={{ flex: 1 }} />
      </View>
      <View style={styles.textContainer}>
        <UIText level="body" style={styles.playlistName}>
          {name}
        </UIText>
        <UIText level="caption" style={styles.label}>
          {capitalize(type)} . {ownerName}
        </UIText>
      </View>
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      height: "100%",
      width: "100%",
      //   backgroundColor: scheme.primary,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    imageContainer: {
      height: "100%",
      aspectRatio: 1,
      backgroundColor: "blue",
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
