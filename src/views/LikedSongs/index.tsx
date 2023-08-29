import React from "react";
import { useThemeColors } from "../../theme/ThemeProvider";
import { FlatList, StyleSheet, View } from "react-native";
import { uniqueId } from "lodash";
import { LinearGradient } from "expo-linear-gradient";
import { ListHeader } from "./Components/ListHeader";
import {
  LIKED_SONGS_VIEW_HEADER_HEIGHT,
  SCREEN_EDGE_SPACING,
  SCREEN_HEIGHT,
} from "../../theme/constants";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { ListHeaderV2 } from "./Components/ListHeaderV2";

export const LikedSongsView: React.FC = () => {
  const styles = useStyles();
  const { scheme } = useThemeColors();

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [-1, 0, LIKED_SONGS_VIEW_HEADER_HEIGHT],
            [0, 0, -LIKED_SONGS_VIEW_HEADER_HEIGHT]
          ),
        },
      ],
      height: interpolate(
        translationY.value,
        [-LIKED_SONGS_VIEW_HEADER_HEIGHT, 0, 1],
        [
          LIKED_SONGS_VIEW_HEADER_HEIGHT * 2,
          LIKED_SONGS_VIEW_HEADER_HEIGHT,
          LIKED_SONGS_VIEW_HEADER_HEIGHT,
        ]
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        bounces={true}
        data={Array(50)
          .fill(0)
          .map(() => {
            id: uniqueId();
          })}
        renderItem={() => <View style={styles.cell}></View>}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        contentContainerStyle={styles.flatlistStyle}
      />
      <Animated.View style={[styles.header, animatedStyles]}>
        <ListHeaderV2 />
      </Animated.View>
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    cell: {
      // backgroundColor: scheme.secondaryBackground,
      // borderWidth: 1,
      // borderColor: "grey",
      height: 60,
      width: "100%",
      borderRadius: 10,
      zIndex: 100,
    },
    seperator: {
      height: 10,
    },
    flatlistStyle: {
      paddingTop: LIKED_SONGS_VIEW_HEADER_HEIGHT,
      paddingBottom: 100,
      backgroundColor: scheme.systemBackground,
    },
    header: {
      position: "absolute",
      flex: 1,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height: LIKED_SONGS_VIEW_HEADER_HEIGHT,
      width: "100%",
    },
  });
};
