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
import { LibraryItem } from "../../../redux/stores/user-library.store";
import { LibraryItemCard } from "./LibraryItemCard";

type RenderItemProps = {
  item: LibraryItem;
};

export const YourLibraryContent: React.FC = () => {
  const styles = useStyles();

  const { items } = useSelector((state: AppState) => state.UserLibraryStore);

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({ item }: RenderItemProps) => (
          <LibraryItemCard {...item} />
        )}
        data={items}
        initialNumToRender={30}
        maxToRenderPerBatch={30}
        keyExtractor={(item) => `${item.data.id} - ${uniqueId()}`}
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
