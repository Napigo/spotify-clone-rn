import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { borderRadius } from "../../../theme/radius";
import { UIText } from "../../common/UIText";

type ArtistItemProps = {
  id: string;
  name: string;
  photoCover: string | null;
};
export const ArtistItem: React.FC<ArtistItemProps> = ({
  id,
  name,
  photoCover,
}) => {
  const styles = useStyles();

  const [assets] = useAssets([
    require("../../../../assets/images/artist-coverphoto-placeholder.png"),
  ]);

  const imageSource = useMemo(() => {
    if (photoCover === null) {
      if (assets) {
        return assets[0].uri;
      }
      return "";
    } else {
      return photoCover;
    }
  }, [photoCover, assets]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={imageSource} />
      <UIText level="caption" style={styles.text} numberOfLines={2}>
        {name}
      </UIText>
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
      //   justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    image: {
      width: "100%",
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: scheme.secondaryBackground,
      borderRadius: borderRadius.full,
    },
    text: {
      textAlign: "center",
    },
  });
};
