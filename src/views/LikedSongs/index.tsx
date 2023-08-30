import React, { useCallback } from "react";
import { useThemeColors } from "../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import {
  LIKED_SONGS_VIEW_HEADER_HEIGHT,
  SCREEN_EDGE_SPACING,
  STANDARD_TOPBAR_HEIGHT,
} from "../../theme/constants";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { LikeSongHeader } from "../../components/LikedSongPlaylist/Header";
import { LikedSongsTopbar } from "../../components/LikedSongPlaylist/Header/TopBar";
import { UIPressable } from "../../components/common/UIPressable";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../navigations/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { borderRadius } from "../../theme/radius";
import { SavedTrack } from "../../redux/stores/savedtracks.store";
import { TrackListItem } from "../../components/LikedSongPlaylist/TrackListItem";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/app-store";

type RenderPropsType = {
  item: SavedTrack;
};

export const LikedSongsView: React.FC = () => {
  const styles = useStyles();

  const { tracks, total } = useSelector(
    (state: AppState) => state.SavedTracksStore
  );

  const translationY = useSharedValue(0);

  const offset = useSafeAreaInsets();

  const { goBack } = useNavigation<NavigationProp<HomeStackParamList>>();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const buttonPlayAnimationStyle = useAnimatedStyle(() => {
    const threshold = offset.bottom + STANDARD_TOPBAR_HEIGHT;
    const fixedPosition = threshold + 50;
    const sticky = translationY.value >= fixedPosition;

    return {
      transform: [
        {
          translateY: sticky ? -fixedPosition : -translationY.value,
        },
      ],
    };
  });

  const renderItem = useCallback(({ item }: RenderPropsType) => {
    return <TrackListItem {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        bounces={true}
        data={tracks}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        contentContainerStyle={styles.flatlistStyle}
      />
      <UIPressable
        style={[
          styles.backButton,
          { top: STANDARD_TOPBAR_HEIGHT - offset.bottom * 0.1 },
        ]}
        onPress={goBack}
      >
        <Ionicons name="chevron-back" size={23} color={"white"} />
      </UIPressable>
      <Animated.View
        style={[buttonPlayAnimationStyle, styles.buttonPlayContainer]}
      >
        <UIPressable style={styles.playButton}>
          <FontAwesome name="play" size={20} color="black" />
        </UIPressable>
      </Animated.View>
      <LikedSongsTopbar _scrollY={translationY} />
      <LikeSongHeader _scrollY={translationY} totalSongs={total} />
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    cell: {
      backgroundColor: scheme.systemBackground,
      height: 60,
      width: "100%",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: scheme.secondaryBackground,
    },
    seperator: {
      height: 18,
    },
    flatlistStyle: {
      paddingTop: LIKED_SONGS_VIEW_HEADER_HEIGHT + 30,
      paddingBottom: 100,
      backgroundColor: scheme.systemBackground,
    },
    backButton: {
      position: "absolute",
      left: SCREEN_EDGE_SPACING,
      zIndex: 2000,
    },
    buttonPlayContainer: {
      position: "absolute",
      top: LIKED_SONGS_VIEW_HEADER_HEIGHT - 60,
      right: SCREEN_EDGE_SPACING,
      zIndex: 2000,
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
