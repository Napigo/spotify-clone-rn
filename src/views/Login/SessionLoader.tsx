import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useThemeColors } from "../../theme/ThemeProvider";
import { get } from "../../modules/secure-storage";

export const SessionLoaderView: React.FC = () => {
  const styles = useStyles();

  useEffect(() => {
    get("access_token").then((result) => {
      console.log(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={styles.spinner.color} size="large" />
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    spinner: {
      color: scheme.systemTint,
    },
  });
};
