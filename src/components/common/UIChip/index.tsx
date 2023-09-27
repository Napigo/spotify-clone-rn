import React from "react";
import { PressableProps, StyleSheet, ViewStyle } from "react-native";
import { UIPressable } from "../UIPressable";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { borderRadius } from "../../../theme/radius";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { UIText } from "../UIText";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";

interface UIChipProps extends PressableProps {
  buttonStyle?: ViewStyle;
  icon?: React.ReactElement;
  iconOnly?: boolean;
}
export const UIChip: React.FC<UIChipProps> = ({
  children,
  buttonStyle,
  icon,
  iconOnly = false,
  ...props
}) => {
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
        style={[styles.container, buttonStyle, { gap: iconOnly ? 0 : 5 }]}
        onTouchStart={() => {
          touched.value = true;
        }}
        onTouchEnd={() => {
          touched.value = false;
        }}
        {...props}
      >
        {icon}
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
      paddingHorizontal: SCREEN_EDGE_SPACING,
      height: 36,
      flexDirection: "row",
    },
  });
};
