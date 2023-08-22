import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { useThemeColors } from "../../theme/ThemeProvider";
import MDIcons from "@expo/vector-icons/MaterialIcons";
import { UIPressable } from "../../components/common/UIPressable";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createAuthorizationURL, handleAuthRedirect } from "../../modules/auth";
import { isEmpty } from "lodash";
import { save } from "../../modules/secure-storage";
import { AppStackParamList } from "../../navigations/types";

let redirectCall = 1;

export const SpotifyWebAuthview: React.FC = () => {
  const styles = useStyles();
  const { navigate, goBack } =
    useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <UIPressable style={styles.closeButton} onPress={goBack}>
          <MDIcons name="close" size={26} style={styles.close} />
        </UIPressable>
      </View>
      <WebView
        source={{ uri: createAuthorizationURL() }}
        onNavigationStateChange={async ({ url, loading }) => {
          /**
           * Why use redirectCall count??, due to that the onNavigationStateChange is calling multipel times, for
           * some unknown reason, meaning, handleAuthRedirect will invoke double, even after token is returned,
           * so to prevent from double calling, we check on counter, to make sure, the logic only run once...
           */
          if (
            redirectCall > 0 &&
            !loading &&
            url.includes("http://www.napigo.co/?code")
          ) {
            let result = await handleAuthRedirect(url);
            if (result) {
              save("access_token", result.access_token);
              save("expires_in", result.expires_in);
              save("refresh_token", result.refresh_token);
              navigate("SessionLoader");
              redirectCall = 0;
            }
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
