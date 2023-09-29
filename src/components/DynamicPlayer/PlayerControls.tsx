import React from "react";
import { StyleSheet, View } from "react-native";
import { STANDARD_TOPBAR_HEIGHT } from "../../theme/constants";
import { UIPressable } from "../common/UIPressable";
import { AntDesign, Entypo, Feather, FontAwesome } from "@expo/vector-icons";

export const PlayerControls: React.FC = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <UIPressable style={styles.controlButton}>
        <Entypo name="shuffle" size={24} color="white" />
      </UIPressable>
      <UIPressable style={styles.controlButton}>
        <AntDesign name="stepbackward" size={26} color="white" />
      </UIPressable>
      <UIPressable style={styles.playButton}>
        <FontAwesome name="play" size={36} color="white" />
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
