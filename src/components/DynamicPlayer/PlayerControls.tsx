import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { STANDARD_TOPBAR_HEIGHT } from "../../theme/constants";
import { UIPressable } from "../common/UIPressable";
import { AntDesign, Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/app-store";
import { playerAction } from "../../redux/stores/player.store";

export const PlayerControls: React.FC = () => {
  const styles = useStyles();
  const { isPlaying } = useSelector((state: AppState) => state.PlayerStore);
  const dispatch = useDispatch();

  const togglePlay = useCallback(() => {
    dispatch(playerAction.isPlaying(!isPlaying));
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <UIPressable style={styles.controlButton}>
        <Entypo name="shuffle" size={24} color="white" />
      </UIPressable>
      <UIPressable style={styles.controlButton}>
        <AntDesign name="stepbackward" size={26} color="white" />
      </UIPressable>
      <UIPressable style={styles.playButton} onPress={togglePlay}>
        {!isPlaying ? (
          <FontAwesome name="play" size={36} color="white" />
        ) : (
          <FontAwesome name="pause" size={32} color="white" />
        )}
      </UIPressable>
      <UIPressable style={styles.controlButton}>
        <AntDesign name="stepforward" size={26} color="white" />
      </UIPressable>
      <UIPressable style={styles.controlButton}>
        <Feather name="repeat" size={24} color="white" />
      </UIPressable>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      height: STANDARD_TOPBAR_HEIGHT,
      alignItems: "center",
      justifyContent: "space-between",
    },
    controlButton: {
      height: "100%",
      aspectRatio: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    playButton: {
      marginHorizontal: 20,
    },
  });
};
