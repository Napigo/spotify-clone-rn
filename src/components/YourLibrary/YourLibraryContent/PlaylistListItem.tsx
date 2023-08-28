import React from "react";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { CurrentUserPlaylist } from "../../../redux/stores/user-playlists.store";

type PlaylistListItemProps = CurrentUserPlaylist;
export const PlaylistListItem: React.FC<PlaylistListItemProps> = ({
  name,
  images,
  ownerName,
  type,
}) => {
  const styles = useStyles();
  return <View style={styles.container}></View>;
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      height: "100%",
      width: "100%",
      backgroundColor: scheme.primary,
    },
  });
};
