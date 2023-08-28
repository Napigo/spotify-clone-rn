import React from "react";
import { StyleSheet, View } from "react-native";
import { UIText } from "../../common/UIText";
import { Image } from "expo-image";
import { FeaturedPlaylistItem } from "../../../redux/stores/featured-playlists.store";

export const PlaylistItem: React.FC<FeaturedPlaylistItem> = ({
  photoCover,
  description,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Image source={{ uri: photoCover ?? "" }} style={styles.image} />
      <View style={styles.textContent}>
        <UIText level="caption" numberOfLines={2} style={styles.desc}>
          {description}
        </UIText>
      </View>
    </View>
  );
};

const ITEM_WIDTH = 170;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: "column",
      height: ITEM_WIDTH + 50,
      width: ITEM_WIDTH,
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
    desc: {
      fontWeight: "500",
    },
  });
};
