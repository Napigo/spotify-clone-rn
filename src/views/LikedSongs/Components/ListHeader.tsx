import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { UISchemeColor } from "../../../theme/colors";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { LIKED_SONGS_VIEW_HEADER_HEIGHT } from "../../../theme/constants";

type ListHeaderProps = {
  _scrollY: SharedValue<number>;
};
export const ListHeader: React.FC<ListHeaderProps> = ({ _scrollY }) => {
  const { scheme } = useThemeColors();

  const styles = useStyles(scheme);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            _scrollY.value,
            [-1, 0, LIKED_SONGS_VIEW_HEADER_HEIGHT],
            [0, 0, -LIKED_SONGS_VIEW_HEADER_HEIGHT]
          ),
        },
      ],
    };
  }, [_scrollY]);

  console.log("list");

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <LinearGradient
        style={{
          flex: 1,
          height: 270,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[COLOR, scheme.systemBackground]}
      />
    </Animated.View>
  );
};

const COLOR = "#3F60FA";

const useStyles = (scheme: UISchemeColor) => {
  return StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height: LIKED_SONGS_VIEW_HEADER_HEIGHT,
      width: "100%",

      //   backgroundColor: COLOR,
    },
  });
};
