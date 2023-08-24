import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SCREEN_HEIGHT, STANDARD_TOPBAR_HEIGHT } from "../../theme/constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { HomeHeader } from "../../components/Home/HomeHeader";
import { CategoryChips } from "../../components/Home/CategoryChips";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { RecentTracks } from "../../components/Home/RecentTracks";
import { TrendingAlbums } from "../../components/Home/TrendingAlbums";
import { UICollection } from "../../components/common/UICollection";
import { RecommendedArtists } from "../../components/Home/RecommendedArtists";

export const HomeView: React.FC = () => {
  const height = useBottomTabBarHeight();

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const styles = useStyles();

  const stylez = useAnimatedStyle(() => {
    const sticky = translationY.value >= STANDARD_TOPBAR_HEIGHT;
    return {
      transform: [
        {
          translateY: sticky ? translationY.value - STANDARD_TOPBAR_HEIGHT : 0,
        },
      ],
      zIndex: sticky ? 100 : 0,
    };
  });

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.ScrollView
          contentContainerStyle={{
            paddingBottom: height,
          }}
          scrollEventThrottle={1}
          onScroll={scrollHandler}
          style={{ backgroundColor: "D", height: SCREEN_HEIGHT, flex: 1 }}
        >
          <HomeHeader />
          <Animated.View style={[styles.sticky, stylez]}>
            <CategoryChips />
          </Animated.View>
          <RecentTracks />
          <UICollection title="Trending Albums For You">
            <TrendingAlbums />
          </UICollection>
          <UICollection title="Recommended Artists">
            <RecommendedArtists />
          </UICollection>
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    sticky: {
      height: 60,
      backgroundColor: "",
    },
    stick_active: {
      backgroundColor: "blue",
    },
  });
};
