import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { useThemeColors } from "../../theme/ThemeProvider";
import MDIcons from "@expo/vector-icons/MaterialIcons";
import { UIPressable } from "../../components/common/UIPressable";
import { useNavigation } from "@react-navigation/native";
import { createAuthorizationURL, handleAuthRedirect } from "../../modules/auth";

export const SpotifyWebAuthview: React.FC = () => {
  const styles = useStyles();
  const { goBack } = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <UIPressable style={styles.closeButton} onPress={goBack}>
          <MDIcons name="close" size={26} style={styles.close} />
        </UIPressable>
      </View>
      <WebView
        source={{ uri: createAuthorizationURL() }}
        onNavigationStateChange={async ({ url }) => {
          let result = await handleAuthRedirect(url);
          console.log(result);
          if (result) {
            console.log(result);
            goBack();
          }
        }}
      />
    </SafeAreaView>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      height: 30,
      width: "100%",
      backgroundColor: scheme.systemBackground,
    },
    closeButton: {
      height: 50,
      width: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    close: {
      color: scheme.systemTint,
    },
  });
};
