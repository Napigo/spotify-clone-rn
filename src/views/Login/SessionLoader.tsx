import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useThemeColors } from "../../theme/ThemeProvider";
import { get } from "../../modules/secure-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../navigations/types";

export const SessionLoaderView: React.FC = () => {
  const styles = useStyles();

  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  useEffect(() => {
    get("access_token").then((result) => {
      setTimeout(() => {
        navigate("Core", { screen: "Tab" });
      }, 0);
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
