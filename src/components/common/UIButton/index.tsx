import React, { useMemo } from "react";
import { PressableProps, StyleSheet } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { spacings } from "../../../theme/spacing";
import { borderRadius } from "../../../theme/radius";
import { fontSizes, fontWeights } from "../../../theme/fonts";
import { UIPressable } from "../UIPressable";
import { UIText } from "../UIText";
import { upperCase } from "lodash";

type ButtonSize = "lg" | "md" | "sm" | "xs";

type ButtonVariant = "primary" | "base-outlined";

interface UIButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text: string;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  textColor?: string;
  block?: boolean;
}

export const UIButton: React.FC<UIButtonProps> = ({
  variant = "primary",
  size = "md",
  block = true,
  text,
  iconRight,
  iconLeft,
  textColor,
  disabled,
  ...pressableProps
}) => {
  const styles = useStyles();

  const buttonStyles = useMemo(() => {
    switch (variant) {
      case "primary":
        return {
          base: styles.primary,
          text: styles.primary_text,
          focused: styles.primary_focused,
        };
      case "base-outlined":
        return {
          base: styles.base,
          text: styles.base_text,
          focused: styles.base_focused,
        };
      default:
        return {
          base: styles.primary,
          text: styles.primary_text,
          focused: styles.primary_focused,
        };
    }
  }, [variant]);

  return (
    <UIPressable
      {...pressableProps}
      disabled={disabled}
      onFocusStyle={buttonStyles.focused}
      style={[
        styles.container,
        buttonStyles.base,
        styles[size],
        block && styles.block,
      ]}
    >
      <UIText style={[styles.text, buttonStyles.text]}>{text}</UIText>
    </UIPressable>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacings.l,
      borderRadius: borderRadius.full,
      alignSelf: "center",
    },
    block: {
      width: "100%",
    },
    text: {
      fontSize: fontSizes.body,
      fontWeight: "600",
    },
    primary: {
      backgroundColor: scheme.primary,
    },
    primary_text: {
      color: scheme.systemBackground,
    },
    primary_focused: {
      opacity: 0.8,
    },
    base: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: scheme.line,
    },
    base_text: {
      color: scheme.systemTint,
    },
    base_focused: {
      opacity: 0.8,
    },
    lg: {
      height: 60,
    },
    md: {
      height: 44,
    },
    sm: {
      height: 38,
    },
    xs: {
      height: 30,
    },
  });
};
