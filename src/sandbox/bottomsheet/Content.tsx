import React from "react";
import { useThemeColors } from "../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import {
  BOTTOM_TABBAR_HEIGHT,
  DYNAMIC_BOTTOM_PLAYER_HEIGHT,
  FULL_BOTTOM_BAR_HEIGHT,
} from "../../theme/constants";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SCREEN_HEIGHT, useBottomSheet } from "@gorhom/bottom-sheet";
import { UIPressable } from "../../components/common/UIPressable";
import { Ionicons } from "@expo/vector-icons";
import { UIText } from "../../components/common/UIText";

export const BottomSheetContent: React.FC = () => {
  const styles = useStyles();

  const { animatedIndex, animatedPosition, snapToIndex } = useBottomSheet();
  //   console.log(animatedIndex.value);

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
        style={styles.container}
        onPress={(e) => {
          snapToIndex(2);
        }}
      >
        <UIPressable
          onPress={() => {
            snapToIndex(0);
          }}
        >
          <Ionicons name="close" size={23} color="white" />
        </UIPressable>
      </UIPressable>
      <Animated.View style={[styles.bottomBar, bottomBarAnimated]}>
        <UIPressable
          onPress={() => {
            console.log("TEST ");
          }}
        >
          <UIText>Hello</UIText>
        </UIPressable>
      </Animated.View>
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
