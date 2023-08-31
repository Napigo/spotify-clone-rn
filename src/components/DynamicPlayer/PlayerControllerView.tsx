import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../theme/ThemeProvider";
import {
  DYNAMIC_BOTTOM_PLAYER_HEIGHT,
  FULL_BOTTOM_BAR_HEIGHT,
  SCREEN_EDGE_SPACING,
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

type PlayerControllerViewProps = {
  tabbar: React.ReactElement;
};
/**
 *
 * @returns
 */
export const PlayerControllerView: React.FC<PlayerControllerViewProps> = ({
  tabbar,
}) => {
  const styles = useStyles();

  const { close: closePlayer, openFull } = useDynamicPlayer();

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
      <View style={styles.container}>
        <UIPressable style={styles.playContainer} onPress={openFull}>
          <UIPressable
            onPress={() => {
              closePlayer();
            }}
          >
            <Ionicons name="close" size={23} color="white" />
          </UIPressable>
        </UIPressable>
      </View>

      <Animated.View style={[styles.bottomBarContainer, bottomBarAnimated]}>
        {tabbar}
      </Animated.View>
    </>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: scheme.systemBackground,
    },
    playContainer: {
      height: DYNAMIC_BOTTOM_PLAYER_HEIGHT,
      width: "100%",
      flexDirection: "row",
      paddingHorizontal: SCREEN_EDGE_SPACING,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    bottomBarContainer: {
      position: "absolute",
      top: DYNAMIC_BOTTOM_PLAYER_HEIGHT,
      height: FULL_BOTTOM_BAR_HEIGHT,
      backgroundColor: "hotpink",
      width: "100%",
      borderTopWidth: 0.5,
      borderTopColor: scheme.secondaryBackground,
    },
  });
};
