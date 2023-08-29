import React, { useCallback } from "react";
import {
  LibraryItem,
  LibraryItemType,
  LibraryAlbum,
  LibraryArtist,
  LibraryPlaylist,
} from "../../../../redux/stores/user-library.store";
import { useThemeColors } from "../../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { PlaylistCell } from "./PlaylistCell";
import { AlbumCell } from "./AlbumCell";
import { ArtistCell } from "./ArtistsCell";

export const LibraryItemCard: React.FC<LibraryItem> = ({ type, data }) => {
  const styles = useStyles();

  const renderItem = useCallback(() => {
    switch (type) {
      case LibraryItemType.PLAYLIST:
        return <PlaylistCell {...(data as LibraryPlaylist)} />;
      case LibraryItemType.ALBUM:
        return <AlbumCell {...(data as LibraryAlbum)} />;
      case LibraryItemType.ARTIST:
        return <ArtistCell {...(data as LibraryArtist)} />;
      default:
        return <></>;
    }
  }, [type, data]);

  return <View style={styles.container}>{renderItem()}</View>;
};

const ITEM_HEIGHT = 70;

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      height: ITEM_HEIGHT,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
  });
};
