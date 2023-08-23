import React from "react";
import { StyleSheet, View } from "react-native";
import { RecentItem } from "./RecentItem";
import { useAssets } from "expo-asset";

export const RecentTracks: React.FC = () => {
  const styles = useStyles();

  const [assets] = useAssets([
    require("../../../../assets/images/like-songs.png"),
  ]);

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
