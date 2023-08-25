import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-store";
import { FlatList, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";
import { FeaturedPlaylistItem } from "../../../redux/stores/featured-playlists.store";
import { PlaylistItem } from "./PlaylistItem";

type RenderItemProps = {
  item: FeaturedPlaylistItem;
};

export const FeaturedPlaylist: React.FC = () => {
  const styles = useStyles();

  const { isReady, playlists } = useSelector(
    (state: AppState) => state.FeaturedPlaylistsStore
  );

  const renderItem = useCallback(({ item }: RenderItemProps) => {
    return (
      <View style={styles.item}>
        <PlaylistItem {...item} />
      </View>
    );
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        horizontal
        data={playlists}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={30}
        maxToRenderPerBatch={30}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingHorizontal: SCREEN_EDGE_SPACING }}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
    </View>
  );
};

const ITEM_WIDTH = 170;
const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      backgroundColor: scheme.systemBackground,
    },
    item: {
      height: ITEM_WIDTH + 50,
      width: ITEM_WIDTH,
    },
    seperator: {
      width: 18,
    },
  });
};
