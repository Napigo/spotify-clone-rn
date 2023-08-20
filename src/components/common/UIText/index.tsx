import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import {
  Font,
  Weight,
  fontColors,
  fontSizes,
  fontWeights,
} from "../../../theme/fonts";

const useStyles = () => {
  return StyleSheet.create({
    base: {
      color: "black",
    },
    largetitle: {
      fontWeight: "600",
    },
  });
};
interface UITextProps extends TextProps {
  level?: keyof Font<number | Weight>;
}
export const UIText: React.FC<UITextProps> = ({
  level = "body",
  children,
  style,
  ...props
}) => {
  const styles = useStyles();

  return (
    <Text
      {...props}
      style={[
        styles.base,
        {
          fontSize: fontSizes[level],
          fontWeight: fontWeights[level],
          color: fontColors[level],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
