import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../theme/ThemeProvider";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SearchHeader } from "../../components/Search/SearchHeader";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SCREEN_HEIGHT, STANDARD_TOPBAR_HEIGHT } from "../../theme/constants";
import { SearchBar } from "../../components/Search/SearchBar";

export const SearchView: React.FC = () => {
  const styles = useStyles();

  const height = useBottomTabBarHeight();
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const stickyStyle = useAnimatedStyle(() => {
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
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.ScrollView
        contentContainerStyle={{
          paddingBottom: height,
        }}
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        style={{ backgroundColor: "D", height: SCREEN_HEIGHT, flex: 1 }}
      >
        <SearchHeader />

        <Animated.View style={[styles.sticky, stickyStyle]}>
          <SearchBar />
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: scheme.systemBackground,
    },
    sticky: {
      height: 60,
    },
  });
};
