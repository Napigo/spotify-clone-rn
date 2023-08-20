import React, { useMemo, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  ViewStyle,
} from "react-native";

interface UIPressableProps extends PressableProps {
  onFocusStyle?: ViewStyle;
  stopProgateEventToParent?: boolean;
  clickableOnScrolling?: boolean;
}
/**
 *
 * @param param0
 * @returns
 */
export const UIPressable: React.FC<UIPressableProps> = ({
  onPress,
  children,
  style,
  onFocusStyle,
  clickableOnScrolling = true,
  stopProgateEventToParent = true,
  ...rest
}) => {
  const [pressed, setOnPressed] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const pressableProperties = useMemo(() => {
    if (clickableOnScrolling) {
      return {
        onTouchStart: () => {
          setOnPressed(true);
          setFocused(true);
        },
        onTouchMove: () => {
          setOnPressed(false);
        },
        onTouchEnd: (e: GestureResponderEvent) => {
          if (stopProgateEventToParent) {
            e.stopPropagation();
          }
          setFocused(false);
          if (pressed) {
            onPress?.(e);
          }
        },
      };
    } else {
      return {
        onPress: (e: GestureResponderEvent) => {
          onPress?.(e);
        },
        onTouchStart: () => {},
        onTouchEnd: () => {},
      };
    }
  }, [clickableOnScrolling, setFocused, setOnPressed, onPress]);

  return (
    <Pressable
      style={[style as ViewStyle, focused && onFocusStyle]}
      {...pressableProperties}
      {...rest}
    >
      {children}
    </Pressable>
  );
};
