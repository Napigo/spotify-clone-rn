import React, { useMemo } from "react";
import { LibraryPlaylist } from "../../../../redux/stores/user-library.store";
import { useThemeColors } from "../../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { UIText } from "../../../common/UIText";
import { capitalize } from "lodash";

const Component: React.FC<LibraryPlaylist> = ({
  type,
  name,
  ownerName,
  images,
}) => {
  const styles = useStyles();

  const [assets] = useAssets([
    require("../../../../../assets/images/playlist-cover.png"),
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
    <>
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
    </>
  );
};

export const PlaylistCell = React.memo(Component);

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
