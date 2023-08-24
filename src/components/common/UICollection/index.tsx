import React, { PropsWithChildren } from "react";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { UIText } from "../UIText";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";

interface UICollectionProps extends PropsWithChildren {
  title?: string;
  rightControls?: React.ReactElement;
}

export const UICollection: React.FC<UICollectionProps> = ({
  title = "Trending albums for you",
  children,
  rightControls,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UIText level="title2" style={styles.title}>
          {title}
        </UIText>
      </View>
      {children}
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      flex: 1,
      //   backgroundColor: "blue",
      flexDirection: "column",
      width: "100%",
    },
    header: {
      height: 60,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: SCREEN_EDGE_SPACING,
    },
    title: {
      fontWeight: "700",
    },
  });
};
