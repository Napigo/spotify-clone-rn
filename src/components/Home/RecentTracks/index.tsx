import React from "react";
import { StyleSheet, View } from "react-native";
import { RecentItem } from "./RecentItem";
import { useAssets } from "expo-asset";
import { useQuery } from "@tanstack/react-query";
import {
  NewReleaseResponse,
  fetchNewRelease,
} from "../../../modules/api/album.apis";

const Component: React.FC = () => {
  const styles = useStyles();

  const {
    data: response,
    status,
    isLoading,
    error,
  } = useQuery<NewReleaseResponse>(["new-releases"], {
    queryFn: () => fetchNewRelease(),
    staleTime: 60000,
    cacheTime: 60000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: true,
  });

  console.log("DATA IS READY :", response);
  const [assets] = useAssets([
    require("../../../../assets/images/like-songs.png"),
  ]);

  // const isReady = Boolean(!isLoading && assets && assets.length > 0);

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

export const RecentTracks = React.memo(Component);
