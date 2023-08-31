import React from "react";
import { StyleSheet } from "react-native";
import { useThemeColors } from "../../theme/ThemeProvider";
import {
  BOTTOM_TABBAR_HEIGHT,
  DYNAMIC_BOTTOM_PLAYER_HEIGHT,
  FULL_BOTTOM_BAR_HEIGHT,
  SCREEN_HEIGHT,
} from "../../theme/constants";
import { UIPressable } from "../common/UIPressable";
import { Ionicons } from "@expo/vector-icons";
import { useDynamicPlayer } from ".";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

/**
 *
 * @returns
 */
export const PlayerControllerView: React.FC = () => {
  const styles = useStyles();

  const { close: closePlayer } = useDynamicPlayer();

  const { animatedIndex, animatedPosition } = useBottomSheet();

  const bottomBarAnimated = useAnimatedStyle(() => {
    const index0Height = SCREEN_HEIGHT - FULL_BOTTOM_BAR_HEIGHT;

    const index1Height = index0Height - DYNAMIC_BOTTOM_PLAYER_HEIGHT;

    return {
      opacity: interpolate(animatedIndex.value, [0, 1, 2], [1, 1, 0]),
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, index1Height, index0Height],
            [index1Height + 50, 0, -DYNAMIC_BOTTOM_PLAYER_HEIGHT]
          ),
        },
      ],
    };
  });

  return (
    <>
      <UIPressable
        onPress={() => {
          closePlayer();
        }}
      >
        <Ionicons name="close" size={23} color="white" />
      </UIPressable>

      <Animated.View
        style={[styles.bottomBar, bottomBarAnimated]}
      ></Animated.View>
    </>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      paddingTop: BOTTOM_TABBAR_HEIGHT * 0.45,
      justifyContent: "flex-end",
      paddingRight: 10,
    },
    bottomBar: {
      position: "absolute",
      top: DYNAMIC_BOTTOM_PLAYER_HEIGHT,
      height: FULL_BOTTOM_BAR_HEIGHT,
      backgroundColor: "hotpink",
      width: "100%",
    },
  });
};
