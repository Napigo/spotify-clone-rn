import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-store";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { FlatList, StyleSheet, View } from "react-native";
import { RecommendedArtist } from "../../../redux/stores/recommended-artists.store";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";
import { ArtistItem } from "./ArtistItem";
import { usePopulateArtistPhotos } from "./usePopulateArtistPhotos";

type RenderItemProps = {
  item: RecommendedArtist;
};

export const RecommendedArtists: React.FC = () => {
  const styles = useStyles();

  const { isReady, artists } = useSelector(
    (state: AppState) => state.RecommendedArtistsStore
  );

  usePopulateArtistPhotos(artists.map((item) => item.id));

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({ item }: RenderItemProps) => <ArtistItem {...item} />}
        horizontal
        data={artists}
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

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      flex: 1,
      height: "auto",
      backgroundColor: scheme.systemBackground,
    },
    seperator: {
      width: 18,
    },
  });
};
