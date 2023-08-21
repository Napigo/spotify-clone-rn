import React, { useState } from "react";
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

export const SpotifyWebAuthview: React.FC = () => {
  const styles = useStyles();
  const { navigate, goBack } =
    useNavigation<NavigationProp<AppStackParamList>>();
  const [accessTokenTemp, setAccessTokenTemp] = useState<string>();

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
          /**
           * why storing this in temp useState, because onNavigationStateChange somehow execute the same callback uri
           * 2 times, we need to check weather have we gotten the token or not, if yes.. dont  bother
           * handling it again
           */
          if (isEmpty(accessTokenTemp)) {
            let result = await handleAuthRedirect(url);
            if (result) {
              console.log(result);
              setAccessTokenTemp(accessTokenTemp);
              save("access_token", result.access_token);
              save("expires_in", result.expires_in);
              navigate("SessionLoader");
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
