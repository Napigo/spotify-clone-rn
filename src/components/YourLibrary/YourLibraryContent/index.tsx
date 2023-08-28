import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { uniqueId } from "lodash";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";
import { ListHeader } from "./ListHeader";

type RenderItemProps = {
  item: Record<string, any>;
};

export const YourLibraryContent: React.FC = () => {
  const styles = useStyles();

  const renderItem = useCallback(({ item }: RenderItemProps) => {
    return <View style={styles.item}></View>;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={Array(20)
          .fill(0)
          .map((_, index) => ({
            id: uniqueId(),
            name: `Item No. ${index + 1}`,
          }))}
        initialNumToRender={30}
        maxToRenderPerBatch={30}
        keyExtractor={(item) => `${item.id} - ${uniqueId()}`}
        contentContainerStyle={{ paddingHorizontal: SCREEN_EDGE_SPACING }}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
        ListHeaderComponent={() => <ListHeader />}
      />
    </View>
  );
};

const ITEM_HEIGHT = 60;

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      backgroundColor: scheme.systemBackground,
    },
    item: {
      height: ITEM_HEIGHT,
      width: "100%",
      backgroundColor: scheme.primary,
    },
    seperator: {
      height: 18,
    },
  });
};
