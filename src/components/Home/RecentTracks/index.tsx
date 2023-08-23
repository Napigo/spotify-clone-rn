import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { RecentItem } from "./RecentItem";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";

// const likeSongIMage = require("../../../../assets/images/like-songs.png");

export const RecentTracks: React.FC = () => {
  const styles = useStyles();

  const [assets] = useAssets([
    require("../../../../assets/images/like-songs.png"),
  ]);

  const imageSource = useMemo(() => {
    if (assets) {
      return assets[0] as { uri: string };
    }
    return { uri: null };
  }, [, assets]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          <RecentItem
            coverImage={assets ? assets[0].uri : ""}
            label="Liked Songs"
            onPress={() => {}}
          />
        </View>
        <View style={styles.col}>
          <RecentItem
            coverImage={assets ? assets[0].uri : ""}
            label=""
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <RecentItem
            coverImage={assets ? assets[0].uri : ""}
            label=""
            onPress={() => {}}
          />
        </View>
        <View style={styles.col}>
          <RecentItem
            coverImage={assets ? assets[0].uri : ""}
            label=""
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <RecentItem
            coverImage={assets ? assets[0].uri : ""}
            label=""
            onPress={() => {}}
          />
        </View>
        <View style={styles.col}>
          <RecentItem
            coverImage={assets ? assets[0].uri : ""}
            label=""
            onPress={() => {}}
          />
        </View>
      </View>
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
      height: 50,
    },
  });
};
