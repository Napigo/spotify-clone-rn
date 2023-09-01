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

const Component: React.FC<SavedTrack> = (props) => {
  const styles = useStyles();

  const source = useSelector((state: AppState) => state.PlayerStore.source);
  const dispatch = useDispatch();
  const { minimize } = useDynamicPlayer();

  const onTrackPress = useCallback(() => {
    dispatch(
      playerAction.loadSource({
        id: props.id,
        title: props.name,
        label: props.artistName,
        uri: props.uri,
        coverPhoto: props.images[0].url ?? "",
      })
    );
    dispatch(playerAction.setActive(true));
    dispatch(playerAction.isPlaying(true)); // auto play when pressed
    minimize();
  }, [props, dispatch]);

  const isTrackPlaying = useMemo(() => {
    return source && source.id === props.id;
  }, [source, props.id]);

  return (
    <UIPressable style={styles.container} onPress={onTrackPress}>
      <View style={styles.rightContent}>
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
  });
};
