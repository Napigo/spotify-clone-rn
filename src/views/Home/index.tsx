import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { SCREEN_HEIGHT, STANDARD_TOPBAR_HEIGHT } from "../../theme/constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { HomeHeader } from "../../components/Home/HomeHeader";
import { CategoryChips } from "../../components/Home/CategoryChips";
import { useThemeColors } from "../../theme/ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { UIText } from "../../components/common/UIText";

export const HomeView: React.FC = () => {
  const height = useBottomTabBarHeight();

  const a = useSafeAreaInsets();

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
          <View style={{ paddingHorizontal: 20 }}>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
            <UIText level="title3">Hello</UIText>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    sticky: {
      // position: "absolute",
      // top: 0,
      // left: 0,
      height: 60,
      backgroundColor: "",
    },
    stick_active: {
      backgroundColor: "blue",
    },
  });
};
