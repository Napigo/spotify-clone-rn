import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../theme/ThemeProvider";
import {
  DYNAMIC_BOTTOM_PLAYER_HEIGHT,
  FULL_BOTTOM_BAR_HEIGHT,
  SCREEN_EDGE_SPACING,
  SCREEN_HEIGHT,
} from "../../theme/constants";
import { UIPressable } from "../common/UIPressable";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useDynamicPlayer } from ".";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { darkenColor } from "../../utils/utils";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { UIText } from "../common/UIText";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/app-store";
import { playerAction } from "../../redux/stores/player.store";

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
  const { scheme } = useThemeColors();

  const {
    source,
    isPlaying: trackPlaying,
    dominantColor,
  } = useSelector((state: AppState) => state.PlayerStore);

  const { close: closePlayer, openFull } = useDynamicPlayer();

  const { animatedIndex, animatedPosition } = useBottomSheet();

  const dispatch = useDispatch();

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

  const trackDominantColor = darkenColor(dominantColor ?? "#292929", 0.5);
  const backgroundAnimated = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedIndex.value,
        [0, 1, 2],
        [scheme.systemBackground, scheme.systemBackground, trackDominantColor]
      ),
    };
  });

  const [assets] = useAssets([
    require("../../../assets/images/playlist-cover.png"),
  ]);

  const togglePlayback = useCallback(() => {
    dispatch(playerAction.isPlaying(!trackPlaying));
  }, [trackPlaying]);

  return (
    <>
      <Animated.View style={[styles.playerContainer, backgroundAnimated]}>
        <UIPressable style={styles.minimizeContainer} onPress={openFull}>
          <View style={styles.songDataBox}>
            {assets && (
              <View style={styles.songImage}>
                <Image
                  source={source?.coverPhoto ?? assets[0].uri}
                  contentFit="cover"
                  style={{ flex: 1 }}
                />
              </View>
            )}
            <View style={styles.textualBox}>
              <UIText level="subhead" style={styles.songTitle}>
                {source?.title}
              </UIText>
              <UIText level="caption" style={styles.artistName}>
                {source?.label}
              </UIText>
            </View>
          </View>
          <View style={styles.controlBox}>
            <UIPressable style={styles.controlButton} onPress={closePlayer}>
              <MaterialIcons
                name="speaker-group"
                size={23}
                color={scheme.systemTint}
              />
            </UIPressable>
            <UIPressable style={styles.controlButton} onPress={togglePlayback}>
              {trackPlaying ? (
                <Ionicons name="pause" size={23} color={scheme.primary} />
              ) : (
                <Ionicons name="play" size={23} color={scheme.systemTint} />
              )}
            </UIPressable>
          </View>
        </UIPressable>
      </Animated.View>

      <Animated.View style={[styles.bottomBarContainer, bottomBarAnimated]}>
        {tabbar}
      </Animated.View>
    </>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    playerContainer: {
      flex: 1,
      backgroundColor: scheme.systemBackground,
    },
    minimizeContainer: {
      height: DYNAMIC_BOTTOM_PLAYER_HEIGHT,
      width: "100%",
      flexDirection: "row",
      // paddingHorizontal: SCREEN_EDGE_SPACING,
      alignItems: "center",
      justifyContent: "space-between",
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
    songImage: {
      height: DYNAMIC_BOTTOM_PLAYER_HEIGHT - 20,
      aspectRatio: 1,
    },
    songDataBox: {
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: SCREEN_EDGE_SPACING,
    },
    controlBox: {
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 0,
    },
    textualBox: {
      flexDirection: "column",
      justifyContent: "center",
      gap: 1,
      height: "100%",
    },
    songTitle: {
      fontWeight: "700",
    },
    artistName: {
      fontWeight: "500",
      color: scheme.systemGray2,
    },
    controlButton: {
      // backgroundColor: "blue",
      height: "100%",
      aspectRatio: 0.8,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
