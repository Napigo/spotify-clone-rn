import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { useThemeColors } from "../../theme/ThemeProvider";
import MDIcons from "@expo/vector-icons/MaterialIcons";
import { UIPressable } from "../../components/common/UIPressable";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createAuthorizationURL, handleAuthRedirect } from "../../modules/auth";
import { AuthStackParamList } from "../../navigations/types";
import { useAuth } from "../../containers/App/AuthContainer";

export const SpotifyWebAuthview: React.FC = () => {
  const styles = useStyles();
  const { setupSession } = useAuth();

  let redirectCall = 1;

  const { goBack } = useNavigation<NavigationProp<AuthStackParamList>>();

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
            var result = await handleAuthRedirect(url);
            if (result) {
              goBack();

              setTimeout(
                (result) => {
                  setupSession(
                    result.access_token,
                    result.refresh_token as string,
                    result.expires_in
                  );
                },
                500,
                result
              );

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
