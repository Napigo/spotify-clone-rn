import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { UIPressable } from "../../common/UIPressable";
import { SavedTrack } from "../../../redux/stores/savedtracks.store";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";
import { Image } from "expo-image";
import { UIText } from "../../common/UIText";
import { Ionicons } from "@expo/vector-icons";
import { truncate } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { playerAction } from "../../../redux/stores/player.store";
import { useDynamicPlayer } from "../../DynamicPlayer";
import { AppState } from "../../../redux/app-store";
import LottieView from "lottie-react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { generateDominantColor } from "../../../utils/utils";

const Component: React.FC<SavedTrack> = (props) => {
  const styles = useStyles();

  const { source, isPlaying } = useSelector(
    (state: AppState) => state.PlayerStore
  );

  const dispatch = useDispatch();
  const { minimize } = useDynamicPlayer();

  const onTrackPress = useCallback(async () => {
    dispatch(
      playerAction.loadSource({
        id: props.id,
        title: props.name,
        label: props.artistName,
        uri: props.uri,
        coverPhoto: props.images[0].url ?? "",
        duration_ms: props.duration_ms,
      })
    );
    dispatch(playerAction.setActive(true));
    dispatch(playerAction.isPlaying(true)); // auto play when pressed

    /**
     * generate the prominant color background from the
     * cover image and set into the redux store
     */
    const imageUrl = props.images[0].url;
    const dominantColor = await generateDominantColor(imageUrl);
    dispatch(playerAction.setDominantColor(dominantColor));

    /**
     * Finally display the bottom sheet (player) on minimize state
     */
    minimize();
  }, [props, dispatch]);

  const isTrackPlaying = useMemo(() => {
    return source && source.id === props.id && isPlaying;
  }, [source, props.id, isPlaying]);

  const _showPlaying = useDerivedValue(() => {
    return isTrackPlaying ? 1 : 0;
  }, [isTrackPlaying]);

  const showPlayingAnimation = useAnimatedStyle(() => {
    return {
      width: withTiming(_showPlaying.value === 1 ? 30 : 0),
    };
  });

  return (
    <UIPressable style={styles.container} onPress={onTrackPress}>
      <View style={styles.rightContent}>
        <Animated.View style={[styles.lottieBox, showPlayingAnimation]}>
          {isTrackPlaying && (
            <Animated.View
              style={[styles.lottieContent]}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <LottieView
                autoPlay
                style={{ height: 40, width: "auto" }}
                source={require("../../../../assets/lottie/1ObMBFDYgb.json")}
              />
            </Animated.View>
          )}
        </Animated.View>
        <View style={styles.imageContainer}>
          <Image source={props.images[0].url} style={{ flex: 1 }} />
        </View>
        <View style={styles.textContainer}>
          <UIText
            level="body"
            style={[styles.name, isTrackPlaying && styles.nameActive]}
          >
            {props.name}
          </UIText>
          <UIText level="caption" style={styles.metadata}>
            {truncate(`${props.artistName} . ${props.albumName}`, {
              length: 40,
            })}
          </UIText>
        </View>
      </View>
      <UIPressable>
        <Ionicons
          name="ellipsis-horizontal"
          size={24}
          color={styles.iconTint.color}
        />
      </UIPressable>
    </UIPressable>
  );
};

export const TrackListItem = React.memo(Component);

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      backgroundColor: scheme.systemBackground,
      height: 60,
      width: "100%",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: SCREEN_EDGE_SPACING,
    },
    rightContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    imageContainer: {
      height: "100%",
      aspectRatio: 1,
    },
    textContainer: {
      flexDirection: "column",
      gap: 5,
    },
    name: {
      fontWeight: "600",
      fontSize: 16,
    },
    nameActive: {
      color: scheme.primary,
    },
    metadata: {
      color: scheme.systemGray2,
    },
    iconTint: {
      color: scheme.systemGray2,
    },
    lottieBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      width: 0,
      marginRight: -10,
    },
    lottieContent: {
      position: "absolute",
      left: -10,
      flexDirection: "row",
      alignItems: "center",
      width: "auto",
      height: 60,
    },
  });
};
