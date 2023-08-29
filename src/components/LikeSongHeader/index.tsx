import React from "react";
import { useThemeColors } from "../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  LIKED_SONGS_VIEW_HEADER_HEIGHT,
  SCREEN_EDGE_SPACING,
} from "../../theme/constants";
import { LinearGradient } from "expo-linear-gradient";
import { UIText } from "../common/UIText";
import { UIPressable } from "../common/UIPressable";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { borderRadius } from "../../theme/radius";

const SHARE_COLOR = "#046951";

type LikedSongHeaderProps = {
  _scrollY: SharedValue<number>;
};
export const LikeSongHeader: React.FC<LikedSongHeaderProps> = ({
  _scrollY,
}) => {
  const styles = useStyles();
  const { scheme } = useThemeColors();

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
      height: interpolate(
        _scrollY.value,
        [-LIKED_SONGS_VIEW_HEADER_HEIGHT, 0, 1],
        [
          LIKED_SONGS_VIEW_HEADER_HEIGHT * 2,
          LIKED_SONGS_VIEW_HEADER_HEIGHT,
          LIKED_SONGS_VIEW_HEADER_HEIGHT,
        ]
      ),
    };
  });

  return (
    <Animated.View
      entering={FadeIn.delay(100).duration(300)}
      style={[styles.container, animatedStyles]}
    >
      <LinearGradient
        style={styles.overlay}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[SHARE_COLOR, scheme.systemBackground]}
      />

      <View style={styles.contentBox}>
        <UIText level="title2" style={styles.mainTitle}>
          Liked Songs
        </UIText>
        <UIText level="subhead" style={styles.metadata}>
          1,256 songs
        </UIText>
        <View style={styles.controls}>
          <UIPressable>
            <MaterialCommunityIcons
              name="download-circle-outline"
              size={28}
              color={styles.iconTint.color}
            />
          </UIPressable>
          <View style={styles.rightControls}>
            <UIPressable>
              <Ionicons
                name="ios-shuffle"
                size={34}
                color={styles.iconTint.color}
              />
            </UIPressable>
            <UIPressable style={styles.playButton}>
              <FontAwesome name="play" size={20} color="black" />
            </UIPressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      position: "absolute",
      flex: 1,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height: LIKED_SONGS_VIEW_HEADER_HEIGHT,
      width: "100%",
    },
    overlay: {
      flex: 1,
      height: 270,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    contentBox: {
      position: "absolute",
      left: 0,
      bottom: 10,
      right: 0,
      width: "100%",
      borderWidth: 0,
      borderColor: "pink",
      flexDirection: "column",
      paddingHorizontal: SCREEN_EDGE_SPACING,
      gap: 6,
    },
    mainTitle: {
      fontWeight: "700",
    },
    metadata: {
      fontWeight: "500",
      color: scheme.systemGray3,
    },
    controls: {
      width: "100%",
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    iconTint: {
      color: scheme.systemGray3,
    },
    rightControls: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    playButton: {
      height: 50,
      aspectRatio: 1,
      borderRadius: borderRadius.full,
      backgroundColor: scheme.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 3,
    },
  });
};
