import React from "react";
import { useThemeColors } from "../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { uniqueId } from "lodash";
import {
  LIKED_SONGS_VIEW_HEADER_HEIGHT,
  SCREEN_EDGE_SPACING,
  STANDARD_TOPBAR_HEIGHT,
} from "../../theme/constants";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { LikeSongHeader } from "../../components/LikeSongHeader";
import { LikedSongsTopbar } from "../../components/LikeSongHeader/TopBar";
import { UIPressable } from "../../components/common/UIPressable";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../navigations/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const LikedSongsView: React.FC = () => {
  const styles = useStyles();

  const translationY = useSharedValue(0);

  const offset = useSafeAreaInsets();

  const { goBack } = useNavigation<NavigationProp<HomeStackParamList>>();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
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
      <UIPressable
        style={[
          styles.backButton,
          { top: STANDARD_TOPBAR_HEIGHT - offset.bottom * 0.1 },
        ]}
        onPress={goBack}
      >
        <Ionicons name="chevron-back" size={23} color={"white"} />
      </UIPressable>
      <LikedSongsTopbar _scrollY={translationY} />
      <LikeSongHeader _scrollY={translationY} />
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
      backgroundColor: scheme.systemBackground,
      height: 60,
      width: "100%",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: scheme.secondaryBackground,
    },
    seperator: {
      height: 10,
    },
    flatlistStyle: {
      paddingTop: LIKED_SONGS_VIEW_HEADER_HEIGHT + 30,
      paddingBottom: 100,
      backgroundColor: scheme.systemBackground,
    },
    backButton: {
      position: "absolute",
      left: SCREEN_EDGE_SPACING,
      zIndex: 2000,
    },
  });
};
