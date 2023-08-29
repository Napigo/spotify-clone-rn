import React, { useMemo } from "react";
import { LibraryArtist } from "../../../../redux/stores/user-library.store";
import { useThemeColors } from "../../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { borderRadius } from "../../../../theme/radius";
import { UIText } from "../../../common/UIText";
import { isEmpty } from "lodash";

const Component: React.FC<LibraryArtist> = ({ id, name, photoCover }) => {
  const styles = useStyles();

  const [assets] = useAssets([
    require("../../../../../assets/images/default-artist-cover.png"),
  ]);

  const imageUrl = useMemo(() => {
    if (assets) {
      if (!isEmpty(photoCover)) {
        return photoCover;
      }
      return assets[0].uri;
    }
  }, [photoCover, assets]);

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
          Artist
        </UIText>
      </View>
    </>
  );
};

export const ArtistCell = React.memo(Component);

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    imageContainer: {
      height: "100%",
      aspectRatio: 1,
      overflow: "hidden",
      borderRadius: borderRadius.full,
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
