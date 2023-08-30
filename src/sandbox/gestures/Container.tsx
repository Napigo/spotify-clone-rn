import React from "react";
import { StyleSheet } from "react-native";
import { useThemeColors } from "../../theme/ThemeProvider";
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export const GesturesContainer: React.FC = () => {
  const styles = useStyles();

  const offset = useSharedValue(0);

  const onGestureEvent = (
    event: GestureEvent<PanGestureHandlerEventPayload>
  ) => {
    offset.value = event.nativeEvent.y;
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  return (
    <Animated.View style={[styles.container]}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.subject, animatedStyles]}></Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      height: "100%",
      width: "100%",
      position: "relative",
      backgroundColor: scheme.systemBackground,
    },
    subject: {
      position: "absolute",
      bottom: 50,
      width: "90%",
      height: 50,
      alignSelf: "center",
      backgroundColor: "hotpink",
    },
  });
};
