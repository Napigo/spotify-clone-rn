import React from "react";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useThemeColors } from "../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { STANDARD_TOPBAR_HEIGHT } from "../../theme/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UIText } from "../common/UIText";

const SHARE_COLOR = "#046951";

type LikedSongsTopbarProps = {
  _scrollY: SharedValue<number>;
};
export const LikedSongsTopbar: React.FC<LikedSongsTopbarProps> = ({
  _scrollY,
}) => {
  const styles = useStyles();
  const offset = useSafeAreaInsets();

  const animatedStyles = useAnimatedStyle(() => {
    const totalHeaderHeight = offset.bottom + STANDARD_TOPBAR_HEIGHT;
    const threshold = totalHeaderHeight * 1;
    return {
      display: _scrollY.value >= totalHeaderHeight ? "flex" : "none",
      opacity: interpolate(_scrollY.value, [threshold, threshold + 30], [0, 1]),
    };
  });

  const titleAnimationStyles = useAnimatedStyle(() => {
    const threshold = offset.bottom + STANDARD_TOPBAR_HEIGHT;
    return {
      transform: [
        {
          translateY: interpolate(
            _scrollY.value,
            [threshold, threshold + 40, threshold + 41],
            [16, 0, 0]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: STANDARD_TOPBAR_HEIGHT + offset.bottom,
          paddingTop: STANDARD_TOPBAR_HEIGHT,
        },
        animatedStyles,
      ]}
    >
      <Animated.View style={[titleAnimationStyles]}>
        <UIText level="body" style={styles.title}>
          Liked Songs
        </UIText>
      </Animated.View>
    </Animated.View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      width: "100%",
      backgroundColor: SHARE_COLOR,
      zIndex: 1000,
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    title: {
      fontWeight: "600",
    },
  });
};
