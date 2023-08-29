import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { UISchemeColor } from "../../../theme/colors";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { LIKED_SONGS_VIEW_HEADER_HEIGHT } from "../../../theme/constants";

export const ListHeaderV2: React.FC = () => {
  const { scheme } = useThemeColors();

  const styles = useStyles(scheme);

  return (
    <LinearGradient
      style={{
        flex: 1,
        height: 270,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      locations={[0, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[COLOR, scheme.systemBackground]}
    />
  );
};

const COLOR = "#3F60FA";

const useStyles = (scheme: UISchemeColor) => {
  return StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height: LIKED_SONGS_VIEW_HEADER_HEIGHT,
      width: "100%",

      //   backgroundColor: COLOR,
    },
  });
};
