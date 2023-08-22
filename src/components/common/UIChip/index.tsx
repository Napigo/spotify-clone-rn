import React from "react";
import { PressableProps, StyleSheet } from "react-native";
import { UIPressable } from "../UIPressable";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { borderRadius } from "../../../theme/radius";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { UIText } from "../UIText";

interface UIChipProps extends PressableProps {}
export const UIChip: React.FC<UIChipProps> = ({ children, ...props }) => {
  const styles = useStyles();
  const touched = useSharedValue(false);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(touched.value ? 0.93 : 1, { duration: 100 }) },
      ],
    };
  });

  return (
    <Animated.View style={[stylez]}>
      <UIPressable
        style={styles.container}
        onTouchStart={() => {
          touched.value = true;
        }}
        onTouchEnd={() => {
          touched.value = false;
        }}
      >
        <UIText level="caption">{children as string}</UIText>
      </UIPressable>
    </Animated.View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: borderRadius.full,
      backgroundColor: scheme.secondaryBackground,
      paddingHorizontal: 20,
      height: 36,
    },
  });
};
