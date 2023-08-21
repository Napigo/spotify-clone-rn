import React from "react";
import { StyleSheet, View } from "react-native";
import { UIButton } from "../../components/common/UIButton";
import { WhiteLogo } from "../../components/svgs/WhiteLogo";
import { UIText } from "../../components/common/UIText";
import { SCREEN_HEIGHT } from "../../theme/constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../navigations/types";

export const LoginView: React.FC = () => {
  const styles = useStyles();

  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        gap: 50,
        paddingBottom: SCREEN_HEIGHT * 0.2,
      }}
    >
      <WhiteLogo />
      <UIText level="title1" style={styles.title}>
        Millions of Songs. Free on Spotify.
      </UIText>
      <UIButton
        text="Login Spotify"
        onPress={() => {
          navigate("SpotifyWebAuth");
        }}
      />
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    title: {
      textAlign: "center",
      fontWeight: "700",
      paddingHorizontal: 50,
    },
  });
};
