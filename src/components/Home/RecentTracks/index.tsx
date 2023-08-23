import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { RecentItem } from "./RecentItem";
import { useAssets } from "expo-asset";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-store";
import { ReleaseItem } from "../../../modules/api/album.apis";
import { chunk, uniqueId } from "lodash";

const Component: React.FC = () => {
  const styles = useStyles();

  const { isReady, data } = useSelector(
    (state: AppState) => state.RecentTracksStore
  );

  const [assets] = useAssets([
    require("../../../../assets/images/like-songs.png"),
  ]);

  const viewModels: ReleaseItem[] = useMemo(() => {
    return isReady && data.length > 0
      ? [
          {
            id: uniqueId(),
            name: "Liked Songs",
            images: [{ url: assets?.[0].uri ?? "", height: "", width: "" }],
          },
          ...data,
        ]
      : [];
  }, [isReady, data]);

  return (
    <View style={styles.container}>
      {viewModels.length > 0 &&
        chunk(viewModels, 2).map((row: ReleaseItem[]) => (
          <View style={styles.row} key={uniqueId()}>
            {row.map((item: ReleaseItem) => (
              <View style={styles.col} key={uniqueId()}>
                <RecentItem
                  coverImage={item.images[0].url}
                  label={item.name}
                  onPress={() => {}}
                />
              </View>
            ))}
          </View>
        ))}
    </View>
  );
};

const GUTTER = 10;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: "column",
      height: "auto",
      width: "100%",
      gap: GUTTER,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    row: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      gap: GUTTER,
    },
    col: {
      flex: 1,
      width: "50%",
      height: 55,
    },
  });
};

export const RecentTracks = React.memo(Component);
