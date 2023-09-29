import React from "react";
import Slider from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";
import { STANDARD_TOPBAR_HEIGHT } from "../../theme/constants";
import { useThemeColors } from "../../theme/ThemeProvider";

export const PlayerTrackSlider: React.FC = () => {
  const styles = useStyles();
  const { scheme } = useThemeColors();
  return (
    <View style={styles.container}>
      <Slider
        style={{ width: "100%", height: 20 }}
        minimumValue={0}
        maximumValue={100}
        value={50}
        minimumTrackTintColor={scheme.systemTint}
        maximumTrackTintColor={scheme.secondaryBackground}
      />
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      height: STANDARD_TOPBAR_HEIGHT,
      width: "100%",
      //   backgroundColor: "pink",
      alignItems: "center",
    },
  });
};
