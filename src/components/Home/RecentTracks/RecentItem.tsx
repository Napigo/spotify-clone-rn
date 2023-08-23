import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { borderRadius } from "../../../theme/radius";
import { Image } from "expo-image";
import { UIText } from "../../common/UIText";

type RecentItemProps = {
  coverImage: string;
  label: string;
  onPress: () => void;
};
export const RecentItem: React.FC<RecentItemProps> = ({
  coverImage,
  label,
  onPress,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Image source={coverImage} style={styles.image} />
      <UIText level="subhead" style={styles.label}>
        {label}
      </UIText>
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      flex: 1,
      backgroundColor: scheme.secondaryBackground,
      borderRadius: borderRadius.sm,
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    image: {
      height: "100%",
      aspectRatio: 1,
    },
    label: {
      fontWeight: "700",
    },
  });
};
