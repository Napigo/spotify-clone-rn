import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { uniqueId } from "lodash";
import {
  BOTTOM_TABBAR_HEIGHT,
  SCREEN_EDGE_SPACING,
} from "../../../theme/constants";
import { ListHeader } from "./ListHeader";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-store";
import { CurrentUserPlaylist } from "../../../redux/stores/user-playlists.store";
import { PlaylistListItem } from "./PlaylistListItem";

type RenderItemProps = {
  item: CurrentUserPlaylist;
};

export const YourLibraryContent: React.FC = () => {
  const styles = useStyles();

  const { playlists } = useSelector(
    (state: AppState) => state.CurrentUserPlaylistsStore
  );

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({ item }: RenderItemProps) => (
          <PlaylistListItem {...item} />
        )}
        data={playlists}
        initialNumToRender={30}
        maxToRenderPerBatch={30}
        keyExtractor={(item) => `${item.id} - ${uniqueId()}`}
        contentContainerStyle={{
          paddingHorizontal: SCREEN_EDGE_SPACING,
          paddingBottom: BOTTOM_TABBAR_HEIGHT + 50,
        }}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
        ListHeaderComponent={() => <ListHeader />}
      />
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      backgroundColor: scheme.systemBackground,
    },
    seperator: {
      height: 18,
    },
  });
};
