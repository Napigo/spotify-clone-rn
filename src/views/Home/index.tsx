import React from "react";
import { ScrollView, View } from "react-native";
import { SCREEN_HEIGHT } from "../../theme/constants";
import { UIText } from "../../components/common/UIText";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { UIButton } from "../../components/common/UIButton";
import { useAuth } from "../../containers/App";

export const HomeView: React.FC = () => {
  const height = useBottomTabBarHeight();

  const { logout } = useAuth();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: height,
      }}
      scrollEventThrottle={30}
      style={{ backgroundColor: "D", height: SCREEN_HEIGHT, flex: 1 }}
    >
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <UIButton text="logout" onPress={() => logout()} />
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
    </ScrollView>
  );
};
